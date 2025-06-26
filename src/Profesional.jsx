import "./global.css";
import "react-toastify/ReactToastify.css";
import "./styles/Chat.css";
import { useState } from "react"; // Eliminado useEffect y useCookies si no se usan aquí
import PromptInput from "./components/PromptInput";
import Message from "./components/Message";
import AsideLeft from "./components/AsideLeft";
import AsideRight from "./components/AsideRight";
import { toast } from "react-toastify";

const subtitulosPorCapitulo = [
    "Capítulo 1: Planteamiento del problema",
    "Capítulo 2: Marco Teórico",
    "Capítulo 3: Marco Metologíco",
    "Capítulo 4: Resultados",
    "Capítulo 5: Discución",
    "Capítulo 6: Conclusiones"
];

function Profesional() {
    const [sendingMessage, setSendingMessage] = useState(false);
    const [message, setMessage] = useState([]);
    const [files, setFiles] = useState([]);

    const [CapituloActual, setCapituloActual] = useState(1);
    const totalCapitulos = 6; 

    const handleSend = async (prompt) => {
        try {
            if (files.length === 0) {
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
            } else {
                toast.error("Error al enviar el mensaje");
            }
        } catch (error) {
            console.log(error);
            toast.error("Ocurrió un error inesperado.");
        } finally {
            setSendingMessage(false);
        }
    };

    const appendFiles = (newFiles) => {
        setFiles([...newFiles]);
    };

    const removeFile = (fileToRemove) => {
        setFiles(files.filter((f) => f !== fileToRemove));
    };

    const handleSiguiente = () => {
        setCapituloActual(prevCapitulo => Math.min(prevCapitulo + 1, totalCapitulos));
    };

    const handleAnterior = () => {
        setCapituloActual(prevCapitulo => Math.max(prevCapitulo - 1, 1));
    };

    return (
        <div className="chat-container">
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
                        <div className="chat-header">
                            <div className="chat-titles">
                                <h2>Chat Ruta Profesional</h2>
                                <h3>{subtitulosPorCapitulo[CapituloActual - 1]}</h3>
                            </div>
                            
                            <div className="chat-navigation">
                                <button 
                                    className="nav-button" 
                                    onClick={handleAnterior}
                                    disabled={CapituloActual === 1} 
                                >
                                    Anterior
                                </button>
                                <button 
                                    className="nav-button" 
                                    onClick={handleSiguiente}
                                    disabled={CapituloActual === totalCapitulos} 
                                >
                                    Siguiente
                                </button>
                            </div>
                        </div>

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

export default Profesional;