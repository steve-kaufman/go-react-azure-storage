import React from "react"
import { Header } from "./components/Header"
import { UploaderProvider } from "./context/UploaderContext"
import { Uploader } from "./components/Uploader"
import { Page } from "./components/Page"
import { Form } from "./components/Form"

function App() {
  return (
    <div className="App">
      <Header />
      <UploaderProvider>
        <Page>
          <Uploader />
          <Form />
        </Page>
      </UploaderProvider>
    </div>
  )
}

export default App
