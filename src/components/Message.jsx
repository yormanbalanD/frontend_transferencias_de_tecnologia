import React from "react";
import { FaUser, FaRobot } from "react-icons/fa";
import { PropagateLoader } from "react-spinners";

export default function Message({ sender, message, loading }) {
  if (loading) {
    return (
      <div className={`message ai`}>
        <div>
          <FaRobot size={20} className="msg-icon" />
        </div>
        <PropagateLoader style={{
          left: "100px",
          top: "5px",
          position: "relative",
        }} size={15} color="#65469B" loading={loading} />
      </div>
    );
  }

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
