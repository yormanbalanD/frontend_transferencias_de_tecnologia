import './global.css';

function Login() {
  return (
    <div className="login-container">
      <div className="left-section">
        <div className="image-placeholder">
          <span>imagen we</span>
        </div>
        <p className="left-text">
          free fire es la mejor app del mundo
        </p>
      </div>

      <div className="right-section">
        <h2 className="greeting">Hola!<br /><strong>¿En qué te ayudo hoy?</strong></h2>
        <div className="login-box">
          <h3>Iniciar Sesión</h3>

          <div className="form-group">
            <label htmlFor="correo">Correo</label>
            <input id="correo" type="email" placeholder="user@example.com" />
          </div>

          <div className="form-group">
            <label htmlFor="clave">Contraseña</label>
            <input id="clave" type="password" placeholder="••••••••" />
          </div>

          <button>INICIAR SESIÓN</button>
          <a href="/register">Crea una Cuenta!</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
