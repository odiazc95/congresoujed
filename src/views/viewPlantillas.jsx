import CardPlantilla from "../components/CardPlantilla";
import NavBar from "../components/NavBar";
import "../assets/css/view_plantillas.css";

function ViewPlantillas() {
  return (
    <>
      <NavBar />
      <div className="Titulo_plantillas">
        <h2>Plantillas</h2>
      </div>

      <div className="cards_plantillas">
        <CardPlantilla />
      
      </div>
    </>
  );
}

export default ViewPlantillas;
