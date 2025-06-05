import React from "react";
import { FaUser, FaRobot } from "react-icons/fa";

export default function Message({ sender, message }) {
  if (sender === "ai") {
    return (
      <div className={`message ai`}>
        <div>
          <FaRobot size={20} className="msg-icon" />
        </div>
        {message}
      </div>
    );
  } else {
    return (
      <div className={`message user`}>
        <div>
          <FaUser size={20} className="msg-icon" />
        </div>
        {message}
      </div>
    );
  }
}
