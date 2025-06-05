import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import "../styles/AsideLeft.css";

const lastChats = [
  {
    id: 1,
    title: "yailin y anuel volverán?",
    date: "2023-03-01",
  },
  {
    id: 2,
    title: "quien es mas migajero, francisco javier o haley bieber",
    date: "2023-03-02",
  },
  {
    id: 3,
    title: "ayudame hacer mi tesis 700 paginas full referencias",
    date: "2023-03-03",
  },
];

export default function AsideLeft() {
  const [open, setOpen] = React.useState(false);

  const handleClickBurger = () => {
    setOpen(!open);
  };

  return (
    <div className={`aside-left ${open ? "open" : ""}`}>
      <div style={{
        marginBottom: "40px"
      }}>
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
        <div className="nuevo-chat">
          <FaEdit  size={23}/>
          Nuevo Chat
        </div>
        <ul className="chat-list">
          <h2>Recientes</h2>
          {lastChats.map((chat, index) => (
            <li key={index}>
              <span
                style={{
                  width: 500,
                  display: "block",
                }}
              >
                {chat.title.length > 30
                  ? chat.title.substring(0, 30) + "..."
                  : chat.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
