import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/register.css";

// eslint-disable-next-line react/prop-types, no-unused-vars
const Register = ({ swapPanel, setSwapPanelfalse }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="form-container sign-up-container">
      <form className="Form_registro" onSubmit={onSubmit}>
        <div className="formContent">
          <h1 className="title_iniciar">Registrarse</h1>
          {registerErrors.map((error, i) => (
            <p className="error-message" key={i}>
              {error}
            </p>
          ))}
          <input
            className="formButton"
            type="text"
            {...register("name", { required: true })}
            placeholder="Nombre"
          />
          {errors.name && (
            <p className="error-message">El nombre es requerido</p>
          )}

          <input
            className="formButton"
            type="text"
            {...register("lastName", { required: true })}
            placeholder="Apellido"
          />
          {errors.lastName && (
            <p className="error-message">El apellido es requerido</p>
          )}

          <input
            className="formButton"
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
          />
          {errors.email && (
            <p className="error-message">El email es requerido</p>
          )}

          <input
            className="formButton"
            type="password"
            {...register("password", { required: true })}
            placeholder="Contraseña"
          />
          {errors.password && (
            <p className="error-message">La contraseña es requerida</p>
          )}

          <input
            className="formButton"
            type="password"
            {...register("conPassword", { required: true })}
            placeholder="Confirmar contraseña"
          />
          {errors.conPassword && (
            <p className="error-message">La contraseña es requerida</p>
          )}
          <div className="buttonsRegister">
            <button type="submit" className="botonRegister">
              Registrarte
            </button>
            <button className="botonRegisterGoogle">Continuar con</button>
          </div>
          <p>
            ¿Ya estas registrado?
            <a onClick={() => setSwapPanelfalse(false)}>Iniciar sesion</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
