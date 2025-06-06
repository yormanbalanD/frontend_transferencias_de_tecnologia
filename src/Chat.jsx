import "./global.css";
import "react-toastify/ReactToastify.css";
import "./styles/Chat.css";
import { useEffect, useState } from "react";
import PromptInput from "./components/PromptInput";
import Message from "./components/Message";
import AsideLeft from "./components/AsideLeft";
import AsideRight from "./components/AsideRight";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

function Chat() {
  // const [showSettings, setShowSettings] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [message, setMessage] = useState([]);
  const [files, setFiles] = useState([]);

  const handleSend = async (prompt) => {
    try {
      if (files.length == 0) {
        toast.error("No has cargado ningún archivo");
        return;
      }

      setSendingMessage(true);
      const formBody = new FormData();
      formBody.append("prompt", prompt);
      formBody.append("file", files[0]);

      const temp1 = [...message, { response: prompt, sender: "user" }];

      setMessage(temp1);

      const request = await fetch("http://localhost:8080/chat/prompt/file", {
        method: "POST",
        body: formBody,
      });

      if (request.status === 200) {
        const response = await request.json();
        response.sender = "ai";

        setMessage([...temp1, response]);
        setSendingMessage(false);
      } else {
        toast.error("Error al enviar el mensaje");
        setSendingMessage(false);
      }
    } catch (error) {
      console.log(error);
      setSendingMessage(false);
    }
  };

  const appendFiles = (files) => {
    setFiles([...files]);
  };

  const removeFile = (file) => {
    setFiles(files.filter((f) => f !== file));
  };

  return (
    <div className="chat-container">
      {/* <div className="top-bar">
        <div className="app-title">FREEFIRE</div>
        <div className="user-info">
          <FaUserCircle className="user-icon" />
          <span className="username">xxadreww</span>
          <div className="settings-dropdown">
            <FaCog className="settings-icon"onClick={()=>setShowSettings(!showSettings)} />
            {showSettings&&(<div className="settings-menu"><button className="logout-button">Cerrar sesión</button>
              </div> )}
          </div>
        </div>
      </div> */}

      <div className="main-content">
        <AsideLeft />

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flex: 2,
          }}
        >
          <div className="chat-section">
            <h2>Chat libre</h2>
            <div className="messages">
              {message &&
                message.map((msg, index) => (
                  <Message
                    key={index}
                    sender={msg.sender}
                    message={msg.response}
                  />
                ))}
              {sendingMessage && (
                <div
                  style={{
                    width: "350px",
                  }}
                >
                  <Message sender="ia" loading={true} />
                </div>
              )}
            </div>

            <PromptInput handleSend={handleSend} appendFiles={appendFiles} />
          </div>
        </div>

        <AsideRight files={files} removeFile={removeFile} />
      </div>
    </div>
  );
}

export default Chat;
