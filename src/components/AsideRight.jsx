import React from "react";

export default function AsideRight() {
  return (
    <div className="file-panel">
      <h2>Archivos cargados</h2>
      <div className="file-box pdf">
        <strong>PDF</strong>
        <span>hola.pdf</span>
      </div>
      <div className="file-box word">
        <strong>WORD</strong>
        <span>hoja.docx</span>
      </div>
      <div className="file-box pdf">
        <strong>PDF</strong>
        <span>kede.pdf</span>
      </div>
      <div className="file-box pdf">
        <strong>PDF</strong>
        <span>colitacola.pdf</span>
      </div>
    </div>
  );
}
