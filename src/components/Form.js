import React, { useContext } from "react"
import "./Form.sass"
import { Icon } from "@iconify/react"
import uploadIcon from "@iconify/icons-mdi/upload"

import { UploaderContext } from "../context/UploaderContext"
import { useInput } from "../hooks/useInput"

export const Form = () => {
  const uploader = useContext(UploaderContext)

  const [fileVersion, setFileversion] = useInput()

  const onSubmit = (e) => {
    e.preventDefault()
    uploader.methods.setParams({ fileVersion })
    uploader.methods.uploadStoredFiles()
  }
  return (
    <form id="uploader-form" onSubmit={onSubmit}>
      <div className="input-group">
        <label htmlFor="file-version">File Version</label>
        <input
          name="file-version"
          value={fileVersion}
          onChange={setFileversion}
        />
      </div>
      <button type="submit">
        Upload <Icon icon={uploadIcon} />
      </button>
    </form>
  )
}
