package main

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"fmt"
	"net/url"
	"os"
	"text/template"
	"time"
)

// GetToken returns a token using the given resource URI and access key
func GetToken(resourceURI string, sasKey string) string {
	signedPermissions := "w"
  signedStart := ""
  signedExpiry := getSignedExpiry()
  canonicalizedResource := getCanonicalizeResource(resourceURI)
  signedIdentifier := ""
  signedIP := ""
  signedProtocol := "https"
  signedVersion := "2019-10-10"
  signedResource := "b"
  signedSnapshotTime := ""
  rscc := ""
  rscd := ""
  rsce := ""
  rscl := ""
  rsct := ""

  stringToSign := signedPermissions + "\n" +
                 signedStart + "\n" +
                 signedExpiry + "\n" +
                 canonicalizedResource + "\n" +
                 signedIdentifier + "\n" +
                 signedIP + "\n" +
                 signedProtocol + "\n" +
                 signedVersion + "\n" +
                 signedResource + "\n" +
                 signedSnapshotTime + "\n" +
                 rscc + "\n" +
                 rscd + "\n" +
                 rsce + "\n" +
                 rscl + "\n" +
                 rsct

  fmt.Println("String to sign: " + stringToSign)

	rawSig := getHmac256(stringToSign, sasKey)
	sig := template.URLQueryEscaper(rawSig)

	return fmt.Sprintf("sv=%s&sp=%s&sr=%s&spr=%s&se=%s&sig=%s",
    signedVersion,
    signedPermissions,
    signedResource,
    signedProtocol,
    signedExpiry,
    sig)
    // template.URLQueryEscaper(signedVersion),
    // template.URLQueryEscaper(signedPermissions),
    // template.URLQueryEscaper(signedResource),
    // template.URLQueryEscaper(signedProtocol),
    // template.URLQueryEscaper(signedExpiry),
    // template.URLQueryEscaper(sig))
}

func getSignedExpiry () string {
	// Format expire time
	expireTime := time.Now().Add(time.Duration(2) * time.Second)
	// Signed Expiry
  return expireTime.UTC().Format(time.RFC3339)
}

func getCanonicalizeResource (uri string) string {
  u, err := url.Parse(uri)

  if err != nil {
    panic(err)
  }

  return "/blob/" + os.Getenv("SAS_SERVICE") + u.Path
}

func getHmac256(str string, secret string) string {
	key := []byte(secret)
	h := hmac.New(sha256.New, key)
	h.Write([]byte(str))
	return base64.StdEncoding.EncodeToString(h.Sum(nil))
}

