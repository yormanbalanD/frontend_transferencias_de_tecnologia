import "./global.css";
import "react-toastify/ReactToastify.css";
import "./styles/Chat.css";
import { useState } from "react"; // Eliminado useEffect y useCookies si no se usan aquí
import PromptInput from "./components/PromptInput";
import Message from "./components/Message";
import AsideLeft from "./components/AsideLeft";
import AsideRight from "./components/AsideRight";
import { toast } from "react-toastify";

const subtitulosPorPaso = [
    "Paso 1: Coordenada Espacio Temporal",
    "Paso 2: Temática",
    "Paso 3: Hechos",
    "Paso 4: Síntomas",
    "Paso 5: Causas",
    "Paso 6: Consecuencias",
    "Paso 7: Lo Investigable",
    "Paso 8: Referentes",
    "Paso 9: Bases Legales",
    "Paso 10: Titulo Tentativo",
];

function Pasos() {
    const [sendingMessage, setSendingMessage] = useState(false);
    const [message, setMessage] = useState([]);
    const [files, setFiles] = useState([]);

    const [pasoActual, setPasoActual] = useState(1);
    const totalPasos = 10; 

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
        setPasoActual(prevPaso => Math.min(prevPaso + 1, totalPasos));
    };

    const handleAnterior = () => {
        setPasoActual(prevPaso => Math.max(prevPaso - 1, 1));
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
                                <h2>Chat Ruta {totalPasos} Pasos</h2>
                                <h3>{subtitulosPorPaso[pasoActual - 1]}</h3>
                            </div>
                            
                            <div className="chat-navigation">
                                <button 
                                    className="nav-button" 
                                    onClick={handleAnterior}
                                    disabled={pasoActual === 1} 
                                >
                                    Anterior
                                </button>
                                <button 
                                    className="nav-button" 
                                    onClick={handleSiguiente}
                                    disabled={pasoActual === totalPasos} 
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

export default Pasos;