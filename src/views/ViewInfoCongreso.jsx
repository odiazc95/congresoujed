import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faClock,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import NavBar from "../components/NavBar";

import "../assets/css/info_congreso.css";
import Mapa from "../components/Mapa.jsx";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCongreso } from "../context/congresoContext";
import Swal from "sweetalert2";
import { createFolioRequest } from "../api/folio.js";
import { useAuth } from "../context/authContext";

function ViewInfoCongreso() {
  const urlImagenRojo = 'https://i.imgur.com/TkphWx5.jpg';
  const urlImagen = 'https://i.imgur.com/gJdID6Q.jpg';
  const { getCongreso, congreso } = useCongreso();
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showInfoCongreso, setShowInfoCongreso] = useState(true);

  const handleMouseEnter = () => {
    setShowInfoCongreso(false);
  };

  const handleMouseLeave = (e) => {
    if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
      setShowInfoCongreso(true);
    }
  };

  useEffect(() => {
    getCongreso(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generarKey = () => {
    let b = Math.random().toString(30).substring(2);

    return b ;
  };

  const handleFolio = async () => {
    Swal.fire({
      title: "Participar",
      text: "Deseas participar en el congreso",
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonColor: "green",
      cancelButtonText: "No quiero",
      confirmButtonText: "Si quiero",
    }).then((result) => {
      const keyUnique = generarKey();

      const folioData = {
        keyUnique: keyUnique,
        congresoId: id,
        participanteId: user.id,
      };

      if (result.isConfirmed) {
        handleSubmit(folioData);
      }
    });
  };

  const handleSubmit = (folio) => {
    createFolioRequest(folio);
  };

  return (
    <>
      <NavBar />
      <div
        className="container_info_congreso"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showInfoCongreso ? (
          <div className="info_congreso">
            <img className="img_logo" src={urlImagen} alt="Logo" />
            <h2 className="Name_congreso">{congreso.nombre}</h2>
          </div>
        ) : (
          <div className="info_adicional">
            <div className="izq_imgCongreso">
              <img className="img_congreso" src={urlImagenRojo} />
            </div>
            <div className="der_info_congreso">
              <b>
                <h2 className="name_congreso">{congreso.nombre}</h2>
              </b>
              <div className="align_icon_text">
                <FontAwesomeIcon icon={faCalendarAlt} />{" "}
                <span className="fecha_congreso">{congreso.dia} {congreso.mes} {congreso.year}</span> <br />
                <FontAwesomeIcon icon={faClock} />{" "}
                <span className="fecha_congreso">
                  {congreso.hora_inicio} - {congreso.hora_fin}
                </span>
              </div>
              {user != null ? (
                <>
                  <button onClick={handleFolio} className="Participar_congreso">
                    Participar
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="Participar_congreso"
                    onClick={() => navigate(`/ingresar`)}
                  >
                    Ingresar
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="Descripcion_map">
        <div className="izq_descripcion">
          <h3>Descripcion</h3>
          <span>{congreso.descripcion}</span>
        </div>
        <div className="der_ubicacion">
          <h3>Ubicacion</h3>
          <FontAwesomeIcon icon={faLocationDot} />
          <span className="direccion">{congreso.ubicacion}</span>
          <Mapa />
        </div>
      </div>
    </>
  );
}

export default ViewInfoCongreso;
