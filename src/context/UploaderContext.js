import React, { createContext, useEffect, useState } from "react"
import FineUploaderAzure from "fine-uploader-wrappers/azure"

export const UploaderContext = createContext()

const api = process.env.REACT_APP_API || ''

export const UploaderProvider = ({ children }) => {
  const [uploader] = useState(new FineUploaderAzure({
    options: {
      request: {
        endpoint: "",
      },
      signature: {
        endpoint: `${api}/signature`,
      },
      retry: {
        enableAuto: true,
      },
      deleteFile: {
        enabled: false,
      },
      autoUpload: false,
    },
  }))

  useEffect(() => {
    fetch(`${api}/azure-endpoint`)
      .then(res => res.text())
      .then(azureEndpoint => {
        uploader.methods.setEndpoint(azureEndpoint)
      })
  }, [uploader])

  return (
    <UploaderContext.Provider value={uploader}>
      {children}
    </UploaderContext.Provider>
  )
}
