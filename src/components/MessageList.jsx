import React from "react";
import Message from "./Message";
import IconoLibro from "../assets/libros.png"

export default function MessageList(message) {
  if (message && message.length > 0) {
    return message.map((msg, index) => (
      <Message key={index} sender={msg.sender} message={msg.response} />
    ));
  } else {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 30,
            width: "100%",
            height: "100%",
            fontSize: 30,
            fontWeight: 700,
        }}>
          <img src={IconoLibro} width={150} alt="" /> No hay mensajes
        </div>
    );
  }
}
