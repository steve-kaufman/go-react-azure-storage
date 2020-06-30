import React from "react"
import { Header, Page, Uploader, FileList, Form } from "./components"

import { UploaderProvider } from "./context/UploaderContext"

function App() {
  return (
    <div className="App">
      <Header />
      <UploaderProvider>
        <Page>
          <Uploader />
          <FileList />
          <Form />
        </Page>
      </UploaderProvider>
    </div>
  )
}

export default App
