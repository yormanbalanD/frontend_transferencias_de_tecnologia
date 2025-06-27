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
import MessageList from "./components/MessageList";

function Chat() {
  const [sendingMessage, setSendingMessage] = useState(false);
  const [message, setMessage] = useState([]);
  const [files, setFiles] = useState([]);

  const [cookies] = useCookies(['user']);

  const handleSend = async (prompt) => {
    const userId = cookies.user?.id; 
    const chatId = 1; 

    if (!userId) {
      toast.error("Error de autenticación: No se pudo obtener el ID del usuario desde la cookie. Por favor, inicia sesión.");
      return;
    }

    const temp1 = [...message, { response: prompt, sender: "user" }];

    setMessage(() => temp1);
    setSendingMessage(true);

    try {
      const url = `http://localhost:8080/chat/prompt/${chatId}/${userId}/file`;
      const formBody = new FormData();
      formBody.append("prompt", prompt);

      if (files.length > 0) {
        formBody.append("file", files[0]);
      }

      const options = { method: "POST", body: formBody };
      const request = await fetch(url, options);
      const responseData = await request.json();


      if (request.ok) {
        responseData.sender = "ai";
        setMessage([...temp1, responseData]);
      } else {
        toast.error(responseData.error || "Error al enviar el mensaje");
        setMessage(currentMessages => currentMessages.slice(0, -1));
      }
    } catch (error) {
      console.log(error);
      toast.error("Error de red o al conectar con el servidor.");
      setMessage(currentMessages => currentMessages.slice(0, -1));
    } finally {
      setSendingMessage(false);
    }
  };

  const appendFiles = (files) => {
    setFiles([...files]);
  };

  const removeFile = (file) => {
    setFiles(files.filter((f) => f !== file));
  };

  const getHistory = async () => {
    const response = await fetch("http://localhost:8080/chat/history/" + "1" + "/" + cookies.user?.id);
    
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      const temp = []

      data.forEach((msg) => {
        temp.push({
          response: msg.prompt,
          sender: "user"
        })

        temp.push({
          response: msg.response,
          sender: "ai"
        })
      })

      setMessage(temp);
    } else {
      toast.error("Error al obtener el historial del chat");
    }
  };

  useEffect(()=>{
    getHistory();
  }, [])

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
              <MessageList messages={message} />
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
