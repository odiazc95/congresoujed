import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Evento from "../components/cardCongreso";

import "../assets/css/home.css";
import { useCongreso } from "../context/congresoContext";
import { useAuth } from "../context/authContext";

function Home() {
  const urlImagen = 'https://i.imgur.com/gJdID6Q.jpg';
  const { getCongresos, congresos } = useCongreso();
  const { user } = useAuth();

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getCongresos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = () => {
    setCurrentPage((prevPage) =>
      prevPage < Math.ceil(congresos.length / itemsPerPage) ? prevPage + 1 : 1
    );
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) =>
      prevPage > 1 ? prevPage - 1 : Math.ceil(congresos.length / itemsPerPage)
    );
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div>
      <NavBar />
      <div className="containerHome">
        <div className="homeArriba">
          <section className="sectionHome">
            <img className="imgHome" src={urlImagen} alt="Logo" />
            <h1 className="tituloHome">Eventos y congreso</h1>
          </section>
          <section className="sectionHome">
            {user ? (
              <>
                <h3 style={{ textAlign: 'center' }} className="subtituloHome">
                  ¡Bienvenido a la página de congresos UJED! <br /> {user.name}
                </h3>
              </>
            ) : (
              <>
                <h3 className="subtituloHome">Unete a la comunidad UJED Eventos</h3>
                <Link to="/ingresar">
                  <button className="buttonHome">Registrate</button>
                </Link>
              </>
            )}
          </section>
        </div>
        <section>
          <h1>Proximos congreso</h1>
          <section className="sectEventos">
            <div className="buttonContainer">
              <button className="smallButton" onClick={handlePrev}>
                &lt; Anterior
              </button>
              <button className="smallButton" onClick={handleNext}>
                Siguiente &gt;
              </button>
              <div className="cardsContainer">
                {congresos.slice(startIndex, endIndex).map((u) => (
                  <Evento key={u._id} {...u} />
                ))}
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}

export default Home;
