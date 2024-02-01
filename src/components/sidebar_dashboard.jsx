import '../assets/css/sidebar_dashboard.css';
import { FaUsers, FaHotel, FaFileLines } from "react-icons/fa6";
import { Link } from "react-router-dom";
function sidebar_dashboard() {
  const MenuOpciones = [
    { icon: <FaUsers />, text: 'Usuarios', link: '/admin_usuarios'},
    { icon: <FaHotel />, text: 'Congresos', link: '/admin_congresos' },
    { icon: <FaFileLines />, text: 'Reportes', link: '/admin_reportes' },
  ];

  return (
    <div className="lat-bar">
      <div className="nav_principal">
        {MenuOpciones.map((Opciones, index) => (
          <div className="nav" key={index}>
            <Link className="link" to={Opciones.link}>
              {Opciones.icon}
              <span>
                <b className="separacion">{Opciones.text}</b>
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default sidebar_dashboard;