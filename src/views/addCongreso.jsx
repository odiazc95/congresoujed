import { useForm } from "react-hook-form";
import { useCongreso } from "../context/congresoContext";
import "../assets/css/register.css";

const AddCongreso = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { addCongreso } = useCongreso();

  const onSubmit = handleSubmit(async (values) => {
    addCongreso(values);
  });

  return (
    <div>
      <form
        className="Form_registro"
        onSubmit={onSubmit}
        encType="multipart/form-data"
      >
        <div className="formContent">
          <h1 className="title_iniciar">Añadir congreso</h1>

          <input
            className="formButton"
            type="text"
            {...register("nombre", { required: true })}
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
            type="text"
            {...register("ubicacion", { required: true })}
            placeholder="Ubicacion"
          />
          {errors.ubicacion && (
            <p className="error-message">El email es requerido</p>
          )}

          <input
            className="formButton"
            type="text"
            {...register("dia", { required: true })}
            placeholder="dias"
          />
          {errors.dia && <p className="error-message">El email es requerido</p>}

          <input
            className="formButton"
            type="text"
            {...register("mes", { required: true })}
            placeholder="mes"
          />
          {errors.mes && <p className="error-message">El email es requerido</p>}

          <input
            className="formButton"
            type="text"
            {...register("year", { required: true })}
            placeholder="año"
          />
          {errors.año && <p className="error-message">El email es requerido</p>}

          <input
            className="formButton"
            type="text"
            {...register("hora_inicio", { required: true })}
            placeholder="Hora de inicio"
          />
          {errors.hora_inicio && (
            <p className="error-message">La hora de inicio es requerida</p>
          )}

          <input
            className="formButton"
            type="text"
            {...register("hora_fin", { required: true })}
            placeholder="Hora de finalizacion"
          />
          {errors.hora_fin && (
            <p className="error-message">
              La hora de finalizacion es requerida
            </p>
          )}

          <input
            className="formButton"
            type="file"
            name="img"
            {...register("img", { required: true })}
            placeholder="Img"
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

export default AddCongreso;
