import React from "react";
import "../styles/AsideRight.css";
import { FaFilePdf } from "react-icons/fa6";
import { GrDocumentTxt } from "react-icons/gr";
import { AiFillFileMarkdown } from "react-icons/ai";
import { FaFileWord } from "react-icons/fa";
import { FaFileExcel } from "react-icons/fa6";
import { BiSolidFilePng } from "react-icons/bi";
import { BiSolidFileJpg } from "react-icons/bi";
import { FaFilePowerpoint } from "react-icons/fa6";

function SeleccionarIcono({ type }) {
  if (type == "application/pdf") {
    return <FaFilePdf size={60} className="file-icon" />;
  } else if (type == "text/plain") {
    return <GrDocumentTxt size={60} className="file-icon" />;
  } else if (type == "text/markdown") {
    return <AiFillFileMarkdown size={60} className="file-icon" />;
  } else if (type == "image/png") {
    return <BiSolidFilePng size={60} className="file-icon" />;
  } else if (type == "image/jpeg") {
    return <BiSolidFileJpg size={60} className="file-icon" />;
  } else if (
    type == "application/msword" ||
    type ==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return <FaFileWord size={60} className="file-icon" />;
  } else if (
    type == "application/vnd.ms-excel" ||
    type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    return <FaFileExcel size={60} className="file-icon" />;
  } else if (
    type == "application/vnd.ms-powerpoint" ||
    type ==
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  ) {
    return <FaFilePowerpoint size={60} className="file-icon" />;
  } else {
    <div></div>;
  }
}

export default function AsideRight({ files, removeFile }) {
  if (files && files.length > 0) {
    return (
      <div className="file-panel">
        <h2>Archivos cargados</h2>
        {files && files.length === 0 && <p>No has cargado ningún archivo</p>}
        {files &&
          files.map((file, index) => (
            <div className="file-box" key={index}>
              <div>
                <SeleccionarIcono type={file.type} />
              </div>
              <span
                style={{
                  marginBottom: 10,
                  marginTop: 0,
                  fontWeight: 600,
                  fontStyle: "italic",
                }}
              >
                {file.name}
              </span>
              <button
                className="button-delete"
                onClick={() => removeFile(file)}
              >
                Eliminar
              </button>
            </div>
          ))}
      </div>
    );
  }
}
