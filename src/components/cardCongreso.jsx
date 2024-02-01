import { useNavigate } from "react-router-dom";
import "../assets/css/cardEvent.css";

const Evento = (evento) => {
  const navigate = useNavigate();
  return (
    <div
      className="cardEvent"
      onClick={() => navigate(`eventos/${evento._id}`)}
    >
      <section className="containerInfoCardEvent">
        <div className="imgCardEvent">
          <div className="fechaCardEvent">
            <p className="mesCardEvent">{evento.mes}</p>
            <p className="diaCardEvent">{evento.dia}</p>
          </div>
          <p className="nombreCardEvent">{evento.nombre}</p>
        </div>
      </section>
      <section>
        <p className="descCardEvent">Descripcion: {evento.descripcion}</p>
      </section>
      <section>
        <p className="ubiCardEvent">Ubicacion: {evento.ubicacion}</p>
      </section>
    </div>
  );
};

export default Evento;
