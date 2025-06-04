import './global.css';
import { FaUserCircle, FaCog, FaFileUpload, FaUser, FaRobot, FaPaperPlane } from 'react-icons/fa';
import { useState } from 'react';

function Chat(){
  const [showSettings, setShowSettings] = useState(false);
  const [messages, setMessages] = useState([
    { sender:'ai', text: 'Hola, soy tu asistente virtual.' },
    { sender:'user', text: 'hola chamo ayudame con mi proyecto de tesis xfa q ana huaman me lo devuelve siempre imaginate q ladilla cn ella' },
    { sender:'ai', text: 'Claro, sube tus archivos y dime qué necesitas.' },
        { sender: 'user', text: 'ok amor voy' }
  ]);

  const [input, setInput]=useState('');

  const handleSend=()=>{
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');
  };

  return(
    <div className="chat-container">
      <div className="top-bar">
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
      </div>

      <div className="main-content">
        <div className="sidebar">
          <h2>Chats</h2>
          <ul className="chat-list">
            <li>1. yailin y anuel volverán?</li>
            <li>2. quien es mas migajero, francisco javier o haley bieber</li>
            <li>3. ayudame hacer mi tesis 700 paginas full referencias</li>
            <li>4. stranger things es la mejor serie</li>
          </ul>
        </div>

        <div className="chat-section">
          <h2>Modo elegido: Chat libre</h2>
          <div className="messages">
            {messages.map((msg, index)=>(
              <div key={index} className={`message ${msg.sender}`}>
                {msg.sender==='ai'?<FaRobot className="msg-icon"/>:<FaUser className="msg-icon"/>}
                {msg.text}
              </div>
            ))}
          </div>

          <div className="input-bar">
            <FaFileUpload className="upload-icon" title="Subir archivo"/>
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              value={input}
              onChange={(e)=>setInput(e.target.value)}
              onKeyDown={(e)=>e.key==='Enter'&&handleSend()}
            />
            <button className="send-btn" onClick={handleSend}>
              <FaPaperPlane />
            </button>
          </div>
        </div>

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
      </div>
    </div>
  );
}

export default Chat;