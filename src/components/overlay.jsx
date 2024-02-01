
import "../assets/css/overlay.css";
import { useNavigate } from "react-router-dom";

const Overlay = () => {
  const urlImagen = 'https://i.imgur.com/gJdID6Q.jpg';
  const navigate = useNavigate();

  return (
    <div className="overlay-container">
      <div className="overlay">
        <div className="overlay-panel overlay-left">
          <img className="img_logo" src={urlImagen} />
          <h1>Congresos UJED</h1>
          <a onClick={() => navigate('/')}>Omitir</a>
        </div>
        <div className="overlay-panel overlay-right">
          <img className="img_logo" src={urlImagen} />
          <h1>Congresos UJED</h1>
          <p>
            <a onClick={() => navigate('/')}>Omitir</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
