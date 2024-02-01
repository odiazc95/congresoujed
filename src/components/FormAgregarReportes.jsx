// ../api/reporte.js
// AddReporte.jsx
import { FaRegWindowClose } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { createReporteRequest } from '../api/reporte';
import Swal from "sweetalert2";
const AddReporte = ({ closeModalReportes }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addReporte = async (reporte) => {
    try {
      const formData = new FormData();

      Object.keys(reporte).forEach((key) => {
        if (key === 'archivo') {
          formData.append('archivo', reporte[key][0]);
        } else {
          formData.append(key, reporte[key]);
        }
      });

      console.log(formData);
      await createReporteRequest(formData);
      Swal.fire({
        title: "Reporte enviado",
        text: "El reporte se envio a revision",
        icon: "success",
        confirmButtonColor: "green",
        confirmButtonText: "OK"
    });

      closeModalReportes(); 
    } catch (error) {
      console.log('Error al agregar el reporte:', error);
    
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    addReporte(values);
  });

  return (
    <div className="modal_overlay">
      <div className="modal_content">
        <FaRegWindowClose/>
        <form className="formulario_inputs_dashboard" onSubmit={onSubmit}>
          <label>Titulo</label>
          <input
            required
            maxLength="100"
            className="inputs_datos_dashboard"
            name="titulo"
            type="text"
            {...register('titulo', { required: true })}
          />
          {errors.titulo && (
            <p className="error-message">El título es requerido</p>
          )}
          <br />
          <label>Descripción</label>
          <input
            required
            maxLength="500"
            className="inputs_datos_dashboard"
            name="descripcion"
            type="text"
            {...register('descripcion', { required: true })}
          />
          {errors.descripcion && (
            <p className="error-message">La descripción es requerida</p>
          )}

          <br />
          <label>Documento</label>
          <input
            type="file"
            name="archivo"
            {...register('archivo', { required: true })}
          />
          {errors.archivo && (
            <p className="error-message">El archivo es requerido</p>
          )}

          <button type="submit">Añadir</button>
        </form>
      </div>
    </div>
  );
};

AddReporte.propTypes = {
  closeModalReportes: PropTypes.func.isRequired,
};

export default AddReporte;
