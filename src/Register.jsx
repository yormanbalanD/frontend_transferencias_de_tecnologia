import './global.css';

function Register() {
  return (
    <div className="login-container">
      <div className="left-section">
        <div className="image-placeholder">
          <span>imagen we</span>
        </div>
        <p className="left-text">
          Regístrate y únete a la mejor experiencia
        </p>
      </div>

      <div className="right-section">
        <h2 className="greeting">Bienvenido!<br /><strong>Crea tu cuenta</strong></h2>
        <div className="login-box">
          <h3>Registro</h3>

          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input id="nombre" type="text" placeholder="Victor Elias Almeida" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo</label>
            <input id="email" type="email" placeholder="correo@ejemplo.com" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input id="password" type="password" placeholder="••••••••" />
          </div>

          <button>CREAR CUENTA</button>
          <a href="/login">¿Ya tienes cuenta? Inicia sesión</a>
        </div>
      </div>
    </div>
  );
}

export default Register;