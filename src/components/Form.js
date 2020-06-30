import React, { useContext } from "react"
import { Icon } from "@iconify/react"
import uploadIcon from "@iconify/icons-mdi/upload"
import { UploaderContext } from "../context/UploaderContext"
import "./Form.sass"

export const Form = () => {
  const uploader = useContext(UploaderContext)

  const onSubmit = (e) => {
    e.preventDefault()
    uploader.methods.uploadStoredFiles()
  }
  return (
    <form id="uploader-form" onSubmit={onSubmit}>
      <button type="submit">
        Upload <Icon icon={uploadIcon} />
      </button>
    </form>
  )
}
