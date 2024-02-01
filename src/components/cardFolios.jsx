import { useEffect, useState } from "react";
import { getFoliosRequest } from "../api/folio";
import { useAuth } from "../context/authContext";
import QRCode from "react-qr-code";
import "../assets/css/cardFolios.css"
import { Link } from "react-router-dom";

const CardFolios = (props) => {

    const [congreso, setCongreso] = useState([])
    const { user } = useAuth();

    const definedCongresos = async () => {
        const res = await getFoliosRequest();
        const folio = res.data.find((id) => id._id === props._id);

        if (folio) {
            folio.congreso.map((u) => {
                setCongreso(u)
            })
        }

    }

    useEffect(() => {
        definedCongresos()
    }, [])


    return (
        <>
            {congreso.nombre ? (
                props.asistencia == 'false' ? (<section className="cardFolioData">
                    <div className="topCardDesingFolio"></div>
                    <h1 className="titleCardDesingFolio">{congreso.nombre}</h1>
                    <QRCode value={props.keyUnique} />
                    <p>{props.keyUnique}</p>
                    <p>{props.asistencia}</p>
                    {
                        user.role == 'admin' ? (
                            <Link className="link" to={congreso._id}>
                                <button className="botonCardDesingFolio">
                                    <b className="separacion">Registrar asistencia</b>
                                </button>
                            </Link>
                        ) : (
                            null
                        )
                    }
                </section>) : (
                    <section className="cardFolioData">
                        <div className="topCardDesingFolioConfirmada"></div>
                        <h1 className="titleCardDesingFolio">{congreso.nombre}</h1>
                        <p className="TextAsistencia">Asistencia confirmada</p>
                    </section>
                )
            ) : (
                <section className="cardFolioData">
                    <div className="topCardDesingFolioEliminada"></div>
                    <h1 className="titleCardDesingFolio">Congreso eliminado</h1>
                </section>
            )}
        </>
    )
}

export default CardFolios;