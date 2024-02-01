import Navbar_dashboard from "../../components/NavBar";
import Sidebar_dashboard from "../../components/sidebar_dashboard";
import { getReportesRequest } from "../../api/reporte";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import "../../assets/css/dashboards.css";
import { useState, useEffect } from "react";
import axios from "axios";

function DashboardReportes() {
  const url = "http://localhost:4000/api/reporte";
  const [list, setList] = useState([]);

  const fetchApi = async () => {
    try {
      const response = await getReportesRequest();

      if (response.status === 200) {
        const responseJSON = await response.data;
        setList(responseJSON);
      } else {
        Swal.fire({
          title: "Error!",
          text: "Error con los datos" + response.status,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Error con los datos" + error,
        icon: "error",
      });
    }
  };

  const handleDelete = async (_id) => {
    Swal.fire({
      title: "Eliminar",
      text: "Deseas eliminar el dato",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "green",
      confirmButtonText: "Eliminar dato",
      cancelButtonText: "No eliminar dato",
    }).then((result) => {
      if (result.isConfirmed) {
        deletedato(_id);
      }
    });
  };

  const CambiarRevision = async (reporteId, revisado) => {
    try {
      const response = await axios.put(`${url}/${reporteId}`, { revisado });

      if (response.status === 200) {
        Swal.fire("El reporte se actualizo");
        fetchApi();
      } else {
        Swal.fire({
          title: "Error!",
          text: "Error al actualizar el estado" + response.status,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Error al actualizar el estado" + error,
        icon: "error",
      });
    }
  };

  const deletedato = async (_id) => {
    try {
      const response = await axios.delete(`${url}/${_id}`);
      if (response.status === 200) {
        Swal.fire("El dato esta eliminado");
        fetchApi();
      } else {
        Swal.fire({
          title: "Error!",
          text: "Error no se borro" + response.status,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Error no se borro" + error,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      <Navbar_dashboard />
      <Sidebar_dashboard />
      <h1 style={{ textAlign: "center", marginLeft: "14%" }}>Reportes</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "35px",
        }}
      ></div>
      <section className="ContenedorTabla">
        <table id="dataTable" className="table">
          <thead className="estilos_th">
            <tr className="estilo-tr">
              <th className="table-header">ID</th>
              <th className="table-header">Titulo</th>
              <th className="table-header">descripcion</th>
              <th className="table-header">Revision</th>
              <th className="table-header">Archivos</th>
              <th className="table-header">acciones</th>
            </tr>
          </thead>
          <tbody className="estilos_tbody">
            {Array.isArray(list) ? (
              list
              .map((lista, index) => (
                <tr key={index}>
                  <td className="style-td">{lista._id}</td>
                  <td className="style-td">{lista.titulo}</td>
                  <td className="style-td">{lista.descripcion}</td>
                  <td className="style-td">
                    <select
                      value={lista.revisado}
                      onChange={(e) =>
                        CambiarRevision(lista._id, e.target.value)
                      }
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="Aceptado">Aceptado</option>
                      <option value="No aceptado">No aceptado</option>
                    </select>
                  </td>
                  <td className="style-td">{lista.archivo}</td>
                  <td className="style-td">
                    <div className="align_icon">
                      <button
                        className="delete"
                        onClick={() => handleDelete(lista._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Cargando...</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default DashboardReportes;
