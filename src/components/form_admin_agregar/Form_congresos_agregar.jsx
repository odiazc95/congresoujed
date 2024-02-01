import "../../assets/css/modales_dashboard.css";
import { useCongreso } from "../../context/congresoContext.jsx";
import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";

// eslint-disable-next-line react/prop-types
function Form_congresos_agregar({ show, onClose }) {
  const modalRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // esto detecta los click que hay fuera del modal y lo cierra
  const ParaModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", ParaModal);
    } else {
      document.removeEventListener("mousedown", ParaModal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, onClose]);

  const { addCongreso } = useCongreso();

  const onSubmit = handleSubmit(async (values) => {
   
    addCongreso(values);
  });

  if (!show) return null;

  return (
    <div className="modal_overlay">
      <div className="modal_content" ref={modalRef}>
        <form className="formulario_inputs_dashboard" onSubmit={onSubmit}>
          <label>Nombre</label>
          <input
            maxLength="40"
            className="inputs_datos_dashboard"
            type="text"
            {...register("nombre", { required: true })}
            placeholder="Nombre"
          />
          {errors.nombre && (
            <p className="error-message">El nombre es requerido</p>
          )}

          <label>Descripcion</label>
          <input
            maxLength="500"
            className="inputs_datos_dashboard"
            type="text"
            {...register("descripcion", { required: true })}
            placeholder="Descripcion"
          />
          {errors.descripcion && (
            <p className="error-message">La descripcion es requerida</p>
          )}

          <label>ubicacion</label>
          <input
            maxLength="255"
            className="inputs_datos_dashboard"
            type="text"
            {...register("ubicacion", { required: true })}
            placeholder="Ubicacion"
          />
          {errors.ubicacion && (
            <p className="error-message">La ubicacion es requerida</p>
          )}

          <label htmlFor="dia">Día</label>
          <select
            className="inputs_datos_dashboard"
            id="dia"
            {...register("dia", { required: true })}
            placeholder="dias"
          >
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

          <label htmlFor="mes">Mes</label>
          <select
            className="inputs_datos_dashboard"
            id="mes"
            {...register("mes", { required: true })}
            placeholder="mes"
          >
            {[
              "Enero",
              "Febrero",
              "Marzo",
              "Abril",
              "Mayo",
              "Junio",
              "Julio",
              "Agosto",
              "Septiembre",
              "Octubre",
              "Noviembre",
              "Diciembre",
            ].map((month, index) => (
              <option key={index + 1} value={month}>
                {month}
              </option>
            ))}
          </select>

          <label htmlFor="year">Año</label>
          <select
            className="inputs_datos_dashboard"
            id="year"
            {...register("year", { required: true })}
            placeholder="año"
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

          <label>hora_inicio</label>
          <input
            className="inputs_datos_dashboard"
            name="hora_inicio"
            type="time"
            {...register("hora_inicio", { required: true })}
            placeholder="Hora de inicio"
          />
          {errors.hora_inicio && (
            <p className="error-message">La hora de inicio es requerida</p>
          )}

          <label>hora_fin</label>
          <input
            className="inputs_datos_dashboard"
            name="hora_fin"
            type="time"
            {...register("hora_fin", { required: true })}
            placeholder="Hora de finalizacion"
          />
          {errors.hora_fin && (
            <p className="error-message">
              La hora de finalizacion es requerida
            </p>
          )}

          <label>img</label>
          <input
            className="inputs_datos_dashboard"
            name="img"
            type="file"
            {...register("img", { required: false })}
            placeholder="Img"
          />
          {errors.img && (
            <p className="error-message">La imagen es requerida</p>
          )}
          <button type="submit" ref={modalRef} >Añadir</button>
        </form>
      </div>
    </div>
  );
}
export default Form_congresos_agregar;
