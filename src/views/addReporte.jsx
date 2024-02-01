import { useForm } from "react-hook-form";
import "../assets/css/register.css";
import { createReporteRequest } from "../api/reporte";

const AddReporte = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addReporte = async (reporte) => {
    const formData = new FormData();

    Object.keys(reporte).forEach((key) => {
      if (key === "archivo") {
        formData.append("archivo", reporte[key][0]);
      } else {
        formData.append(key, reporte[key]);
      }
    });

    try {
      console.log(formData);
      await createReporteRequest(formData);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    addReporte(values);
  });

  return (
    <div>
      <form
        className="Form_registro"
        onSubmit={onSubmit}
        encType="multipart/form-data"
      >
        <div className="formContent">
          <h1 className="title_iniciar">Añadir reporte</h1>

          <input
            className="formButton"
            type="text"
            {...register("titulo", { required: true })}
            placeholder="Nombre"
          />
          {errors.nombre && (
            <p className="error-message">El nombre es requerido</p>
          )}

          <input
            className="formButton"
            type="text"
            {...register("descripcion", { required: true })}
            placeholder="Descripcion"
          />
          {errors.descripcion && (
            <p className="error-message">Descripcion es requerida</p>
          )}

          <input
            className="formButton"
            type="file"
            {...register("archivo", { required: true })}
            placeholder="archivo"
          />
          {errors.img && (
            <p className="error-message">La imagen es requerida</p>
          )}

          <div className="buttonsRegister">
            <button type="submit" className="botonRegister">
              guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddReporte;
