import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import "../styles/AsideLeft.css";

export default function AsideLeft() {
  const [open, setOpen] = React.useState(false);

  const handleClickBurger = () => {
    setOpen(!open);
  };

  return (
    <div className={`aside-left ${open ? "open" : ""}`}>
      <div
        style={{
          cursor: "pointer",
        }}
        onClick={handleClickBurger}
      >
        <GiHamburgerMenu size={30} title="Menú lateral" />
      </div>
      {/* <h2>Chats</h2> */}
      {/* <ul className="chat-list">
        <li>1. yailin y anuel volverán?</li>
        <li>2. quien es mas migajero, francisco javier o haley bieber</li>
        <li>3. ayudame hacer mi tesis 700 paginas full referencias</li>
        <li>4. stranger things es la mejor serie</li>
      </ul> */}
    </div>
  );
}
