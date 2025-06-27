import "./global.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { userLoginSchema } from "../schemas/user.schemas";

function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const handleEmailChange=(e)=>{setEmail(e.target.value);};
  const handlePasswordChange=(e)=>{setPassword(e.target.value);};
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setErrorMessageEmail("");
    setErrorMessagePassword("");
    const parse=userLoginSchema.safeParse({
      correo: email,
      contraseña: password,
    });

    if(parse.success){
      try{
        const response=await fetch("http://localhost:8080/users/login",{
          method:"POST",
          headers:{"Content-Type": "application/json",},
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        if(!response.ok){
          const data = await response.json();
          alert(data.error||"Error al iniciar sesión");
          return;
        }
        window.location.href = "/main/modo";
      }catch(error){console.error("Error al hacer login:", error);alert("Error del servidor");}
    }else{
      setErrorMessageEmail(parse.error.issues.find((issue)=>issue.path[0]==="correo")?.message||"");
      setErrorMessagePassword(parse.error.issues.find((issue)=>issue.path[0]==="contraseña")?.message||"");
    }
  };

  return(
    <div className="login-container">
      <div className="left-section">
        <div className="image-placeholder">
            <img src="/ImagenLateral.png"  alt="Ilustración de un asistente IA"  className="placeholder-img"  />
        </div>
        <div className="left-text-container">
          <p className="hero-title">Con TutorIA todo es más fácil</p>
          <p className="hero-subtitle">Comienza tu tesis hoy</p>
        </div>
      </div>

      <div className="right-section">
        <h2 className="greeting">
          Hola!
          <br />
          <strong>¿En qué te ayudo hoy?</strong>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="login-box">
            <h3>Iniciar Sesión</h3>

            <div className="form-group">
              <label htmlFor="correo">Correo</label>
              <input
                id="correo"
                value={email}
                onChange={handleEmailChange}
                type="text"
                placeholder="user@example.com"
              />
              {errorMessageEmail.length>0&&(
                <p style={{ color:"red"}}>{errorMessageEmail}</p>
              )}
            </div>

            <div className="form-group" style={{ position: "relative"}}>
              <label htmlFor="clave">Contraseña</label>
              <input
                id="clave"
                value={password}
                onChange={handlePasswordChange}
                type={showPassword?"text" : "password"}
                placeholder="*********"
              />
              <span onClick={()=>setShowPassword(!showPassword)}
              style={{
                  position: "absolute",
                  right: 20,
                  top: "45px",
                  cursor: "pointer",
                  userSelect: "none",
                  color: "#666"
                }}
                aria-label={showPassword?"Ocultar contraseña":"Mostrar contraseña"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errorMessagePassword.length>0&&(
                <p style={{ color:"red"}}>{errorMessagePassword}</p>
              )}
            </div>

            <button type="submit">INICIAR SESIÓN</button>
            <a href="/register">Crea una Cuenta!</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;