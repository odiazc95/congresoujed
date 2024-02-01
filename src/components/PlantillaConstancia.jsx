
function PlantillaConstancia() {
  const urlImagen = 'https://i.imgur.com/TkphWx5.jpg';
  return (
    <>
      <section className="contenedor_constancia">
        <div className="contenido_constancia">
          <div style={{ width: "25%" }} className="">
            <img className="logo-Constancia_plantilla" src={urlImagen} />
          </div>
          <div style={{ width: "25%" }}></div>
          <div style={{ width: "25%" }}></div>
          <p
            style={{
              textAlign: "center",
              padding: "1px",
              margin: "3px",
              fontSize: "24px",
            }}
          >
            La Universidad Juárez del Estado de Durango{" "}
          </p>
          <p
            style={{
              textAlign: "center",
              padding: "1px",
              margin: "3px",
              fontSize: "17px",
            }}
          >
            Otorga la presente
          </p>
          <p
            style={{
              textAlign: "center",
              padding: "1px",
              margin: "0px",
              fontSize: "35px",
            }}
          >
            Constancia
          </p>
          <p
            style={{
              textAlign: "center",
              padding: "1px",
              margin: "0px",
              fontSize: "20px",
            }}
          >
            a:
          </p>
          <p style={{ textAlign: "center", margin: "0px", fontSize: "30px" }}>
            {" "}
            <b>Nombre del que recibio la constancia</b>
          </p>
          <p
            style={{
              textAlign: "center",
              padding: "1px",
              margin: "5px",
              fontSize: "20px",
            }}
          >
            Por su participacion en el evento:
          </p>
          <p
            style={{
              textAlign: "center",
              padding: "1px",
              margin: "5px",
              fontSize: "20px",
            }}
          >
            <b>NOMBRE DEL EVENTO</b>
          </p>
          <p
            style={{
              textAlign: "center",
              padding: "1px",
              margin: "5px",
              fontSize: "15px",
            }}
          >
            Impartido a los participantes la <b>Fecha</b>
          </p>
          <p
            style={{
              textAlign: "center",
              padding: "1px",
              margin: "5px",
              fontSize: "20px",
            }}
          >
            Victoria de Durango, Dgo., <b>Fecha de cuando se imprimio el pdf</b>
          </p>
          <div className="align-firma">
            <img
              className="img-firma"
              src="https://wiwink.com/images/electronic-signature-contract.png"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default PlantillaConstancia;
