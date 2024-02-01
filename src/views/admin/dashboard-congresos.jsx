import FormCongresosAdd from "../../components/form_admin_agregar/Form_congresos_agregar";
import FormCongresosEdit from "../../components/form_admin_editar/Form_congreso_editar";
import Navbar_dashboard from "../../components/NavBar";
import { useNavigate } from "react-router-dom";
import Sidebar_dashboard from "../../components/sidebar_dashboard";
import "../../assets/css/dashboards.css";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { getCongresosRequest, deleteCongreso } from '../../api/congreso';
import Swal from "sweetalert2";

function DashboardCongresos() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCongresoId, setSelectedCongresoId] = useState(null); 
  const navigate = useNavigate();

  const handleUsuarioClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleEdit = (congresoId) => {
    setSelectedCongresoId(congresoId);
    navigate(`/editar_congreso/${congresoId}`);
  };

  const [list, setList] = useState([]);
  const fetchApi = async () => {
    try {
      const response = await getCongresosRequest();

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
      confirmButtonText: "Eliminar dato ",
      cancelButtonText: "No eliminar dato",
    }).then((result) => {
      if (result.isConfirmed) {
        deletedato(_id);
      }
    });
  };

  const deletedato = async (_id) => {
    try {
      const response = await deleteCongreso(_id);
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
      <h1 style={{ textAlign: "center", marginLeft: "14%" }}>Congresos</h1>

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
      <FormCongresosAdd
        show={showModal}
        onClose={closeModal}
        fetchApi={fetchApi}
      />

      <section className="ContenedorTabla">
        <table id="dataTable" className="table">
          <thead className="estilos_th">
            <tr className="estilo-tr">
              <th className="table-header">ID</th>
              <th className="table-header">Nombre</th>
              <th className="table-header">descripcion</th>
              <th className="table-header">ubicacion</th>
              <th className="table-header">dia</th>
              <th className="table-header">mes</th>
              <th className="table-header">año</th>
              <th className="table-header">hora inicio</th>
              <th className="table-header">hora fin</th>
              <th className="table-header">imagen</th>
              <th className="table-header">acciones</th>
            </tr>
          </thead>
          <tbody className="estilos_tbody">
            {Array.isArray(list) ? (
              list.map((lista, index) => (
                <tr key={index}>
                  <td className="style-td">{lista._id}</td>
                  <td className="style-td">{lista.nombre}</td>
                  <td className="style-td">{lista.descripcion}</td>
                  <td className="style-td">{lista.ubicacion}</td>
                  <td className="style-td">{lista.dia}</td>
                  <td className="style-td">{lista.mes}</td>
                  <td className="style-td">{lista.year}</td>
                  <td className="style-td">{lista.hora_inicio}</td>
                  <td className="style-td">{lista.hora_fin}</td>
                  <td className="style-td">{lista.img}</td>
                  <td className="style-td">
                    <div className="align_icon">
                      <button
                        className="edit"
                        onClick={() => handleEdit(lista._id)}
                      >
                        <FaPenToSquare />
                      </button>
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
      {selectedCongresoId && (
        <FormCongresosEdit congresoId={selectedCongresoId} />
      )}
    </>
  );
}

export default DashboardCongresos;
