import React, { useState, useEffect, useContext } from "react"
import "./File.sass"
import { Icon } from "@iconify/react"
import cancelIcon from "@iconify/icons-mdi/trash-can-outline"
import { UploaderContext } from "../context/UploaderContext"

export const File = ({ id, name, status, progress, deleteFile }) => {
  const [progressPercent, setProgressPercent] = useState(null)
  const uploader = useContext(UploaderContext)

  useEffect(() => {
    if (!progress) return

    setProgressPercent(Math.floor(progress * 100) + "%")
  }, [progress])

  let statusClass, cancelBtn

  switch (status) {
    case uploader.qq.status.UPLOAD_SUCCESSFUL:
      statusClass = "success"
      break
    default:
      statusClass = ""
  }

  const { UPLOAD_SUCCESSFUL, CANCELED } = uploader.qq.status

  if (status === UPLOAD_SUCCESSFUL || status === CANCELED) {
    statusClass = "success"
    cancelBtn = null
  } else {
    statusClass = ""
    cancelBtn = (
      <button className="cancel-btn" onClick={() => deleteFile(id)}>
        <Icon icon={cancelIcon} />
      </button>
    )
  }

  return (
    <div className={`selected-file ${statusClass}`} key={id}>
      <div className="file-controls">
        <p>
          {name} <span className="percentage-done">{progressPercent}</span>
        </p>
        {cancelBtn}
      </div>
      <div className="progress" style={{ width: progressPercent || "0" }}></div>
    </div>
  )
}
