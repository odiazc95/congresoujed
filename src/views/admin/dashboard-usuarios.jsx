import FormUserAdd from "../../components/form_admin_agregar/Form_user_agregar";
import Navbar_dashboard from "../../components/NavBar";
import Sidebar_dashboard from "../../components/sidebar_dashboard";
import "../../assets/css/dashboards.css";
import { FaTrash } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function DashboardUsuarios() {
  const [showModal, setShowModal] = useState(false);

  const handleUsuarioClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const url = "http://localhost:4000/api/users";
  const [list, setList] = useState([]);
  const fetchApi = async () => {
    try {
      const response = await axios.get(url);
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

      <h1 style={{ textAlign: "center", marginLeft: "14%" }}>Usuarios</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "35px",
        }}
      >
        <button className="form_add_datos" onClick={handleUsuarioClick}>
          Agregar
        </button>
      </div>
      <FormUserAdd show={showModal} onClose={closeModal} fetchApi={fetchApi} />

      <section className="ContenedorTabla">
        <table id="dataTable" className="table">
          <thead className="estilos_th">
            <tr className="estilo-tr">
              <th className="table-header">ID</th>
              <th className="table-header">Nombre</th>
              <th className="table-header">Apellido</th>
              <th className="table-header">Correo</th>
              <th className="table-header">Contraseña</th>
              <th className="table-header">Rol</th>
              <th className="table-header">Acciones</th>
            </tr>
          </thead>
          <tbody className="estilos_tbody">
            {Array.isArray(list) ? (
              list.map((lista, index) => (
                <tr key={index}>
                  <td className="style-td">{lista._id}</td>
                  <td className="style-td">{lista.name}</td>
                  <td className="style-td">{lista.lastName}</td>
                  <td className="style-td">{lista.email}</td>
                  <td className="style-td">{lista.password}</td>
                  <td className="style-td">{lista.role}</td>
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

export default DashboardUsuarios;
