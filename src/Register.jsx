import { useState } from "react";
import "./global.css";
import { useCookies } from "react-cookie";
import Logo from "./assets/ImagenLateralRegistrate.png";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    try {
      const res = await fetch("http://localhost:8080/users/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      const data = await res.json();
      if (res.ok) {
        alert(
          "Tu usuario ha sido creado"
        );

        console.log(data);
        setCookie("user", { id: data.id });
        window.location.href = "/main/modo";
      } else {
        alert("Upsi, ha ocurrido un error: " + data.error);
      }
    } catch (err) {
      alert("Error en el servidor");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <img src={Logo} alt="Logo de Tutor IA" width="450px" />
        <p className="left-text">¿Listo para simplificar tu tesis? Crea una cuenta y desbloquea el poder de la inteligencia artificial en tu investigación</p>
      </div>

      <div className="right-section">
        <h2 className="greeting">
          Bienvenido!
          <br />
          <strong>Crea tu cuenta</strong>
        </h2>
        <form onSubmit={handleSubmit} className="login-box">
          <h3>Registro</h3>

          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              type="text"
              placeholder="Victor Elias Almeida"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo</label>
            <input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">CREAR CUENTA</button>
          <a href="/login">¿Ya tienes cuenta? Inicia sesión</a>
        </form>
      </div>
    </div>
  );
}

export default Register;
