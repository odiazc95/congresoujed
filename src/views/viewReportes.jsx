import NavBar from "../components/NavBar";
import '../assets/css/reportes.css';
import AddReporte from "../components/FormAgregarReportes";
import React, { useState, useEffect } from 'react';
import { getReporteRequest } from "../api/reporte";
import Swal from "sweetalert2";

const Reportes = () => {
  const [modalReportes, setmodalReportes] = useState(false);
  const [list, setList] = useState([]);

  const fetchAprobados = async () => {
    try {
      const response = await getReporteRequest();

      if (response.status === 200) {
        const responseJSON = response.data;
        setList(responseJSON);
      } else {
        Swal.fire({
          title: "Error!",
          text: "Error con los datos" + response.status,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Error con los datos" + error,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    fetchAprobados();
  }, []);

  return (
    <>
      <NavBar />
      <div className="Titulo_reportes">
        <h2>Reportes de congresos</h2>
      </div>
      <div className="pub_reporte">
        <button
          className="btn-pub_reporte"
          onClick={() => setmodalReportes(true)}
        >
          Publicar Reporte
        </button>
      </div>

      <section className="contenedo_reportes_congresos">
        {list.some((reporte) => reporte.revisado === "Aceptado") ? (
          list
            .filter((reporte) => reporte.revisado === "Aceptado")
            .map((reporte, index) => (
              <React.Fragment key={index}>
                <h3>{reporte.titulo}</h3>
                <hr style={{ height: "3px", backgroundColor: "grey" }} />
                <div className="info_reporte">
                  <img src="/src/assets/img/icono_ujed.png" className="img_reporte" />
                  <div>
                    <a
                      className="Titulo_archivo"
                      href={`http://localhost:4000${reporte.archivo}`}
                      download
                    >
                      <b>{reporte.archivo}</b>
                    </a>
                    <br />
                    <p className="Descripcion_archivo">{reporte.descripcion}</p>
                  </div>
                </div>
              </React.Fragment>
            ))
        ) : (
          <p>No hay reportes aprobados</p>
        )}
        {modalReportes && <AddReporte closeModalReportes={() => setmodalReportes(false)} />}
      </section>
    </>
  );
};

export default Reportes;
