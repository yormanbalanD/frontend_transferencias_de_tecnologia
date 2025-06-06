import React from "react";
import "../styles/AsideRight.css";

export default function AsideRight({ files, removeFile }) {
  return (
    <div className="file-panel">
      <h2>Archivos cargados</h2>
      {files && files.length === 0 && <p>No has cargado ningún archivo</p>}
      {files && files.map((file, index) => (
        <div className="file-box" key={index}>
          <strong>{file.type}</strong>
          <span>{file.name}</span>
          <button onClick={() => removeFile(file)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}
