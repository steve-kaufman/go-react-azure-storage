package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	generator "github.com/steve-kaufman/go-azure-sas-generator"
)

func signature(w http.ResponseWriter, r *http.Request) {
	keys, ok := r.URL.Query()["bloburi"]
	if !ok || len(keys[0]) < 1 {
		log.Println("'bloburi' is missing")
		return
	}

	bloburi := string(keys[0])

	sasKey := os.Getenv("SAS_PASSWORD")

	options := generator.TokenOptions{
		SignedPermissions:     "w",
		SignedExpiry:          generator.GenerateSignedExpiry(10),
		CanonicalizedResource: generator.GenerateCanonicalizedResource(bloburi, os.Getenv("SAS_SERVICE")),
		SignedProtocol:        "https",
		SignedVersion:         "2019-10-10",
		SignedResource:        "b",
	}

	token := generator.GenerateToken(&options, sasKey)

	response := bloburi + "?" + token

	log.Println("SAS URI: " + response)

	w.Header().Add("Access-Control-Allow-Origin", "*")
	w.Header().Add("Access-Control-Allow-Headers", "*")

	fmt.Fprint(w, response)
}

func main() {
	// Load .env
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Couldn't load .env")
	}

	// Get location of react app to serve
	reactDir := os.Getenv("REACT_DIR")

	// Serve '/signature' route and statically serve react app on '/'
	http.HandleFunc("/signature", signature)
	http.Handle("/", http.FileServer(http.Dir(reactDir)))

	// Start server
	fmt.Println("Listening on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
