import NavBar from "../components/NavBar";
import { useState } from "react";
import { updateFolioRequest } from "../api/folio";

function Asistencia() {

    const [codigo, setCodigo] = useState('');
    const [response, setResponse] = useState(false);

    const handleCodigoChange = (event) => {
        setCodigo(event.target.value);
    };

    const fetchFolios = async () => {
        const folio = {
            asistencia: 'true'
        }
        const res = await updateFolioRequest(codigo, folio);

        if (res) {
            setResponse(true)
        }
    }

    return (
        <>
            <NavBar />
            <section className="ContenedorAsistencia">
                <input placeholder="Ingresa el codigo" className="input_Asistencia" type="text" value={codigo} onChange={handleCodigoChange} />
                <button onClick={fetchFolios} className="btn_Asistencia">Asistencia</button>
            </section>

            {response === true ? (
                <p className="TextAsistencia">Asistencia confirmada</p>
            ) : (
                null
            )}
        </>
    )
}

export default Asistencia;