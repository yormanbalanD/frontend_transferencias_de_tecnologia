import { useState, useRef } from "react";
import { FaFileUpload, FaPaperPlane } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import TextareaAutosize from "react-textarea-autosize";
import { FiPaperclip } from "react-icons/fi";

export default function PromptInput({ handleSend, appendFiles }) {
  const [input, setInput] = useState("");
  const inputFileRef = useRef();

  const handleChangeInputChat = (e) => {
    setInput(e.target.value);
  };
  const handleChangeInputFile = (e) => {
    appendFiles(e.target.files);
  };

  const handleSendMessage = () => {
    setInput("");
    handleSend(input);
  }

  return (
    <div className="prompt-input">
      <div
        style={{
          width: "100%",
        }}
      >
        <TextareaAutosize
          className="input-chat"
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={handleChangeInputChat}
          minRows={2}
          maxRows={5}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <div
          className="upload-file"
          onClick={() => console.log(inputFileRef.current.click())}
        >
          <input
            ref={inputFileRef}
            type="file"
            multiple={true}
            style={{
              display: "none",
            }}
            onChange={handleChangeInputFile}
          />
          <FiPaperclip size={15} title="Subir archivo" />
          Subir Archivo
        </div>
        <button className="send-btn" onClick={handleSendMessage}>
          <FaArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
