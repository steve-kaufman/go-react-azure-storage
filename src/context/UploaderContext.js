import React, { createContext } from "react"
import FineUploaderAzure from "fine-uploader-wrappers/azure"

export const UploaderContext = createContext()

export const UploaderProvider = ({ children }) => {
  const service = process.env.REACT_APP_SAS_SERVICE
  const container = process.env.REACT_APP_SAS_CONTAINER
  const uploader = new FineUploaderAzure({
    options: {
      request: {
        endpoint: `https://${service}.blob.core.windows.net/${container}`,
      },
      signature: {
        endpoint: `http://${window.location.hostname}:8080/signature`,
      },
      retry: {
        enableAuto: true,
      },
      deleteFile: {
        enabled: false,
      },
      autoUpload: false,
    },
  })

  return (
    <UploaderContext.Provider value={uploader}>
      {children}
    </UploaderContext.Provider>
  )
}
