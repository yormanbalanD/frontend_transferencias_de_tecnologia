import './global.css';
import { FaBriefcase, FaFeatherAlt, FaRoute } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Modo() {
  return (
    <div className="modo-wrapper">
      <h1 className="modo-title">Selecciona un modo de trabajo</h1>

      <div className="modo-card-grid">
        <div className="modo-card">
          <FaBriefcase className="modo-icon" />
          <h2>Modo Profesional</h2>
          <p>El modo profesional se basa en examinar el trabajo por sus respectivos capítulos.</p>
          <Link to="/main/profesional" className="modo-card-button">Elegir</Link>
        </div>

        <div className="modo-card">
          <FaFeatherAlt className="modo-icon" />
          <h2>Modo Libre</h2>
          <p>El modo libre se basa en texto y consultas de forma libre sin ninguna interferencia específica.</p>
          <Link to="/main/chat" className="modo-card-button">Elegir</Link>
        </div>

        <div className="modo-card">
          <FaRoute className="modo-icon" />
          <h2>Ruta 10 Pasos</h2>
          <p>La ruta de 10 pasos se basa en los 10 pasos de los objetivos específicos/generales de un trabajo.</p>
          <Link to="/main/pasos" className="modo-card-button">Elegir</Link>
        </div>
      </div>
    </div>
  );
}

export default Modo;