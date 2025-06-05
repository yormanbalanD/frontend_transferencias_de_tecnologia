import "./global.css";
import "./styles/Chat.css";
import { useState } from "react";
import PromptInput from "./components/PromptInput";
import Message from "./components/Message";
import AsideLeft from "./components/AsideLeft";
import AsideRight from "./components/AsideRight";

function Chat() {
  const [showSettings, setShowSettings] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hola, soy tu asistente virtual." },
    {
      sender: "user",
      text: "hola chamo ayudame con mi proyecto de tesis xfa q ana huaman me lo devuelve siempre imaginate q ladilla cn ella loremTempor ut anim nulla commodo occaecat exercitation adipisicing aute culpa eiusmod voluptate fugiat voluptate. Reprehenderit mollit dolor dolore culpa aute velit adipisicing in sit quis enim labore quis incididunt. Elit nostrud aliquip eiusmod quis deserunt. Reprehenderit laboris eiusmod adipisicing et in in Lorem in commodo aliquip do ipsum sit. Minim ea cupidatat nostrud labore dolore nulla occaecat magna pari",
    },
    {
      sender: "ai",
      text: "Claro, sube tus archivos y dime qué necesitas. Aliqua quis sint ad non pariatur ad commodo laborum ea ad. Fugiat culpa sit id do et. Consectetur id eu exercitation tempor.",
    },
    { sender: "user", text: "ok amor voy" },
    {
      sender: "ai",
      text: "Hola, soy tu asistente virtual. Amet ex aute Lorem irure elit dolore dolore ut dolore cillum minim.Commodo dolor adipisicing veniam exercitation ex irure.",
    },
  ]);

  const handleSend = () => {
    // if (!input.trim()) return;
    // setMessages([...messages, { sender: "user", text: input }]);
    // setInput("");
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
              {messages.map((msg, index) => (
                <Message key={index} sender={msg.sender} message={msg.text} />
              ))}
            </div>

            <PromptInput handleSend={handleSend} />
          </div>
        </div>

        <AsideRight />
      </div>
    </div>
  );
}

export default Chat;
