import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import "../styles/AsideLeft.css";
import { FaLockOpen } from "react-icons/fa";
import { IoMdBriefcase } from "react-icons/io";
import { IoFootstepsSharp } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { useCookies } from "react-cookie";

export default function AsideLeft() {
  const [open, setOpen] = React.useState(false);
  const [_, setCookie] = useCookies(["user"]);

  const handleClickBurger = () => {
    setOpen(!open);
  };

  return (
    <div className={`aside-left ${open ? "open" : ""}`}>
      <div
        style={{
          marginBottom: "40px",
        }}
      >
        <GiHamburgerMenu
          style={{
            cursor: "pointer",
          }}
          onClick={handleClickBurger}
          size={30}
          title="Menú lateral"
        />
      </div>
      <div>
        <ul className="chat-list">
          <li>
            <span
              style={{
                width: 500,
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <FaLockOpen size={25} className="lock-icon" />
              Chat Libre
            </span>
          </li>
          <li>
            <span
              style={{
                width: 500,
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <IoMdBriefcase size={25} className="briefcase-icon" />
              Chat Profesional
            </span>
          </li>
          <li>
            <span
              style={{
                width: 500,
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <IoFootstepsSharp size={25} className="steps-icon" />
              Chat por Pasos
            </span>
          </li>
        </ul>

        <hr className="barra-separador" />

        <button
          className="cerrar-sesion-button"
          onClick={() => {
            setCookie("user", null);
            alert("Sesión cerrada");
            window.location.replace("/login");
          }}
        >
          <FaUserAlt size={18} className="user-icon" />
          Cerrar Sesion
        </button>
      </div>
    </div>
  );
}
