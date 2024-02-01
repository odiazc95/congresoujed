import "../assets/css/NavBar.css";

import { useRef, useEffect } from "react";
import { useAuth } from "../context/authContext";

// eslint-disable-next-line react/prop-types
function ModalUser({ show, onClose }) {
  const modalRef = useRef(null);

  const { logout, user } = useAuth()

  // esto detecta los click que hay fuera del modal y lo cierra
  const handleCloseModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
      handleCloseModal();
    }
  };

  const Logout = () => {
    logout();
    onClose();
  }

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleCloseModal);
    } else {
      document.removeEventListener("mousedown", handleCloseModal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="modal_overlay">
      <div className="modal_content" ref={modalRef}>
        <span className="modal_close" onClick={onClose}>
          &times;
        </span>
        <h3>{user.name + " " + user.lastName}</h3>
        <p>{user.email}</p>
        <button onClick={Logout}>Cerrar sesion</button>
      </div>
    </div>
  );
}

export default ModalUser;
