import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'; // Importa useHistory
import { getCongresoRequest, updateCongreso } from '../../api/congreso';
import "../../assets/css/modales_dashboard.css"
import Swal from "sweetalert2";

function EditCongreso() {
  const { id: idCongreso } = useParams();// Inicializa useHistory
  const [congresoData, setCongresoData] = useState(null);
  const [formData, setFormData] = useState({ 
    nombre: "",
    descripcion: "",
    ubicacion: "",
    dia: "",
    mes: "",
    selectedYear: "", 
    horaInicio: "",
    horaFin: "",
    img: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCongresoRequest(idCongreso);

        if (response.status === 200) {
          const congreso = response.data;
          setCongresoData(congreso);
          // Inicializa el estado del formulario con los datos del congreso
          setFormData({ 
            nombre: congreso.nombre,
            descripcion: congreso.descripcion,
            ubicacion: congreso.ubicacion,
            dia: congreso.dia,
            mes: congreso.mes,
            selectedYear: congreso.año,
            horaInicio: congreso.horaInicio,
            horaFin: congreso.horaFin,
            img: congreso.img
          });
        } else {
          console.error("Error al obtener los datos del congreso");
        }
      } catch (error) {
        console.error("Error al obtener los datos del congreso", error);
      }
    };

    fetchData();
  }, [idCongreso]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateCongreso(idCongreso, formData);

      if (response.status === 200) {
        Swal.fire({
          title: "Congreso actualizado correctamente",
          icon: "success",
          confirmButtonColor: "green",
          confirmButtonText: "OK",
        }).then(() => {
          // Redirige al dashboard después de que el usuario haya hecho clic en OK
          window.location.href = '/admin_congresos';
        });
      } else {
        console.error("Error al actualizar el congreso");
      }
    } catch (error) {
      console.error("Error al actualizar el congreso", error);
    }
  };

  if (!congresoData) {
    return <div>Cargando...</div>;
  }


  return (
    <div className="modal_overlay">
      <div className="modal_content">
        <span className="modal_close">&times;</span>
        <h2>Editar Congreso - ID: {idCongreso}</h2>
        <form className="formulario_inputs_dashboard" onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input style={{display:"flex", width:"auto"}}
            maxLength="40"
            className="inputs_datos_dashboard"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Nombre"
          />
          <label>Descripción:</label>
          <input style={{display:"flex", width:"auto"}}
            maxLength="500"
            className="inputs_datos_dashboard"
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            placeholder="Descripción"
          />
          <label>Ubicación:</label>
          <input style={{display:"flex", width:"auto"}}
            maxLength="255"
            className="inputs_datos_dashboard"
            type="text"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleInputChange}
            placeholder="Ubicación"
          />
          <label>Día:</label>
          <select style={{display:"flex", width:"auto"}}
            className="inputs_datos_dashboard"
            name="dia"
            value={formData.dia}
            onChange={handleInputChange}
          >
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <label>Mes:</label>
          <select style={{display:"flex", width:"auto"}}
            className="inputs_datos_dashboard"
            name="mes"
            value={formData.mes}
            onChange={handleInputChange}
          >
            {[
              "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
              "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ].map((month, index) => (
              <option key={index + 1} value={month}>
                {month}
              </option>
            ))}
          </select>
          <label>Año:</label>
          <select style={{display:"flex", width:"auto"}}
            name="selectedYear" 
            className="inputs_datos_dashboard"
            value={formData.selectedYear} 
            onChange={handleInputChange}
          >
            {Array.from(
              { length: 15 },
              (_, i) => new Date().getFullYear() + i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <label>Hora Inicio:</label>
          <input style={{display:"flex", width:"auto"}}
            className="inputs_datos_dashboard"
            type="time"
            name="horaInicio"
            value={formData.horaInicio}
            onChange={handleInputChange}
          />
          <label>Hora Fin:</label>
          <input style={{display:"flex", width:"auto"}}
            className="inputs_datos_dashboard"
            type="time"
            name="horaFin"
            value={formData.horaFin}
            onChange={handleInputChange}
          />
          <label>Imagen:</label>
          <input style={{display:"flex", width:"auto"}}
            className="inputs_datos_dashboard"
            type="text"
            name="img"
            value={formData.img}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn btn-primary">Guardar cambios</button>
        </form>
      </div>
    </div>
  );
}

export default EditCongreso;
