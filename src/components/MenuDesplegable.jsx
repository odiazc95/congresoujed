import "../assets/css/NavBar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Menuopciones = [
  {
    titulo: "Plantillas de reportes",
    path: "/plantillas",
    cName: "menudesplegable.opcion",
  },
  {
    titulo: "Reportes (eventos y congresos)",
    path: "/Reportes",
    cName: "menudesplegable.opcion",
  },
];

function MenuDesplegable() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <li
        onClick={handleClick}
        className={
          click ? "menudesplegable-menu clicked" : "MenuDesplegable-menu"
        }
      >
        {Menuopciones.map((opcion, index) => {
          return (
            <li key={index}>
              <Link to={opcion.path} onClick={() => setClick(false)}>
                {opcion.titulo}
              </Link>
            </li>
          );
        })}
      </li>
    </>
  );
}

export default MenuDesplegable;
