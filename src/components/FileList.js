import React, { useContext, useState, useEffect } from "react"
import "./FileList.sass"
import { UploaderContext } from "../context/UploaderContext"
import { File } from "./File"

export const FileList = () => {
  const uploader = useContext(UploaderContext)
  const [uploads, setUploads] = useState([])
  const [uploadProgress, setUploadProgress] = useState(new Map())

  useEffect(() => {
    uploader.on("statusChange", () => {
      setUploads(
        uploader.methods.getUploads()
        // .filter((upload) => upload.status !== uploader.qq.status.CANCELED)
      )
    })

    uploader.on("progress", (id, name, progress, total) => {
      setUploadProgress(
        (prevUploadProgress) =>
          new Map(prevUploadProgress.set(id, progress / total))
      )
    })
  }, [uploader])

  const deleteFile = (id) => {
    uploader.methods.cancel(id)
  }

  return (
    <ul id="file-list">
      {uploads.map(({ id, name, status }) => (
        <File
          key={id}
          id={id}
          name={name}
          progress={uploadProgress.get(id)}
          status={status}
          deleteFile={deleteFile}
        />
      ))}
    </ul>
  )
}
