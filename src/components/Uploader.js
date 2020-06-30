import React, { useContext, useCallback } from "react"
import "./Uploader.sass"
import { UploaderContext } from "../context/UploaderContext"
import { useDropzone } from "react-dropzone"

export const Uploader = () => {
  const uploader = useContext(UploaderContext)

  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log(uploader)
      uploader.methods.addFiles(acceptedFiles)
    },
    [uploader]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div
      id="uploader"
      {...getRootProps()}
      className={isDragActive ? "drag" : null}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop here</p>
      ) : (
        <p>
          Drag n' Drop here or click to{" "}
          <span className="dummy-link">select files</span>
        </p>
      )}
    </div>
  )
}
