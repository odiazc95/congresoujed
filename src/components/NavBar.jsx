import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faCaretDown,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import MenuDesplegable from "../components/MenuDesplegable";
import "../assets/css/NavBar.css";
import ModalUser from "./ModalUser";
import { useAuth } from "../context/authContext";

function NavBar() {
  const urlImagen = 'https://i.imgur.com/gJdID6Q.jpg';
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [click, setClick] = useState(false);
  const [menuDesplegable, setMenuDesplegable] = useState(false);

  const cerrarMenu = () => {
    setClick(false);
    setMenuDesplegable(false);
  };

  const handleMenuClick = () => {
    setClick(!click);
  };

  const handleArchivosClick = (e) => {
    e.stopPropagation();
    setMenuDesplegable(!menuDesplegable);
  };

  const handleUsuarioClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".menu-desplegable")) {
      setMenuDesplegable(false);
    }
  });

  return (
    <div className="div_rojo_abajo">
      <nav className="navbar_container">
        <Link to="/" className="logo_nav" onClick={cerrarMenu}>
          <img className="img_nav" src={urlImagen} alt="Logo" width="500px" />
        </Link>
        <div onClick={handleMenuClick} className="menu_icono">
          <FontAwesomeIcon icon={click ? faXmark : faBars} />
        </div>
        <ul className={click ? "menu_nav active" : "menu-nav"}>
          <li className="opciones-nav" onClick={handleArchivosClick}>
            <span className="nav-links">
              Archivos <FontAwesomeIcon icon={faCaretDown} />
            </span>
            {menuDesplegable && <MenuDesplegable />}
          </li>
          <li className="opciones-nav">
            <Link className="nav-links" to="/constancias" onClick={cerrarMenu}>
              Constancias
            </Link>
          </li>
          <li className="opciones-nav">
            <Link className="nav-links" to="/asistencia" onClick={cerrarMenu}>
              Asistencia
            </Link>
          </li>
          {isAuthenticated && user.role === "admin" ? (
            <li className="opciones-nav">
              <Link className="nav-links" to="/admin_usuarios" onClick={cerrarMenu}>
                Administrador
              </Link>
            </li>
          ) : null}
          {isAuthenticated ? (
            <>
              <div onClick={handleUsuarioClick} className="usuario">
                <FontAwesomeIcon icon={faUser} />
                <span>{user.name + " " + user.lastName}</span>
              </div>
              <ModalUser
                show={showModal}
                onClose={closeModal}
                userName={user.name}
                userLastName={user.lastName}
                userEmail={user.email}
              />
            </>
          ) : (
            <>
              <div onClick={() => navigate(`/ingresar`)} className="usuario">
                <FontAwesomeIcon icon={faUser} />
                <span>Ingresar</span>
              </div>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
