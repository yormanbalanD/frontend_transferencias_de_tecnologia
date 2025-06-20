import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Modo from './Modo';
import Chat from './Chat';
import './styles/PromptInput.css'
import Pasos from './Pasos';
import Profesional from './Profesional';

function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main/modo" element={<Modo />} />
        <Route path="/main/chat" element={<Chat />} />
        <Route path="/main/pasos" element={<Pasos />} />
        <Route path="/main/profesional" element={<Profesional />} />

      </Routes>
    </Router>
  );
}

export default App;