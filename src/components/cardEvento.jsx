import "../assets/css/cardEvent.css";

const Evento = (evento) => {
  return (
    <div className="cardEvent">
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
        <p className="descCardEvent">{evento.descripcion}</p>
      </section>
    </div>
  );
};

export default Evento;
