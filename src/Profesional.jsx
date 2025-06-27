import "./global.css";
import "react-toastify/ReactToastify.css";
import "./styles/Chat.css";
import { useState } from "react";
import PromptInput from "./components/PromptInput";
import Message from "./components/Message";
import AsideLeft from "./components/AsideLeft";
import AsideRight from "./components/AsideRight";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

const subtitulosPorCapitulo = [
    "Capítulo 1: Planteamiento del problema",
    "Capítulo 2: Marco Teórico",
    "Capítulo 3: Marco Metodológico",
    "Capítulo 4: Resultados",
    "Capítulo 5: Discusión",
];

const idsDeChatPorCapitulo = [2, 3, 4, 5, 6, 
];

function Profesional() {
    const [sendingMessage, setSendingMessage] = useState(false);
    const [message, setMessage] = useState([]);
    const [files, setFiles] = useState([]);
    const [capituloActual, setCapituloActual] = useState(1);
    const totalCapitulos = 5;

    const [cookies] = useCookies(['user']);

    const handleSend = async (prompt) => {
        const userId = cookies.user?.id;

        const chatId = idsDeChatPorCapitulo[capituloActual - 1];

        if (!userId) {
            toast.error("Error de autenticación. Por favor, inicia sesión.");
            return;
        }

        const temp1 = [...message, { response: prompt, sender: "user" }];
        setMessage(temp1);
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

    const appendFiles = (newFiles) => { setFiles([...newFiles]); };
    const removeFile = (fileToRemove) => { setFiles(files.filter((f) => f !== fileToRemove)); };
    const handleSiguiente = () => { setCapituloActual(prev => Math.min(prev + 1, totalCapitulos)); };
    const handleAnterior = () => { setCapituloActual(prev => Math.max(prev - 1, 1)); };

    return (
        <div className="chat-container">
            <div className="main-content">
                <AsideLeft />
                <div style={{ width: "100%", display: "flex", justifyContent: "center", flex: 2 }}>
                    <div className="chat-section">
                        <div className="chat-header">
                            <div className="chat-titles">
                                <h2>Chat Ruta Profesional</h2>
                                <h3>{subtitulosPorCapitulo[capituloActual - 1]}</h3>
                            </div>
                            <div className="chat-navigation">
                                <button className="nav-button" onClick={handleAnterior} disabled={capituloActual === 1}>Anterior</button>
                                <button className="nav-button" onClick={handleSiguiente} disabled={capituloActual === totalCapitulos}>Siguiente</button>
                            </div>
                        </div>
                        <div className="messages">
                            {message.map((msg, index) => (
                                <Message key={index} sender={msg.sender} message={msg.response} />
                            ))}
                            {sendingMessage && <Message sender="ia" loading={true} />}
                        </div>
                        <PromptInput handleSend={handleSend} appendFiles={appendFiles} />
                    </div>
                </div>
                <AsideRight files={files} removeFile={removeFile} />
            </div>
        </div>
    );
}


export default Profesional;