import NavBar from "../components/NavBar";
import "../assets/css/asistencia.css";
import { useAuth } from "../context/authContext";
import { updateFolioRequest } from "../api/folio";
import CardFolios from "../components/cardFolios"
import { useEffect, useState } from "react";

function viewAsistencia() {

  const { user } = useAuth();
  const [folios, setFolios] = useState();

  const fetchFolios = () => {
    user.folios.map((u) => {
      setFolios(u)
    })
  }

  useEffect(() => {
    fetchFolios()
  }, [])

  return (
    <>
      <NavBar />
      <div className="containerCardFoliosAsistencias" >
        {
          user.folios.map((u) => (
            <CardFolios key={u._id} {...u} />
          ))
        }
      </div>
    </>
  )
}

export default viewAsistencia
