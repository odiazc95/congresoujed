import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext.jsx";
import "../assets/css/login.css";

// eslint-disable-next-line react/prop-types, no-unused-vars
const Login = ({ swapPanel, setSwapPaneltrue }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { singin, errors: singinErrors } = useAuth();

  const onSubmit = handleSubmit((data) => {
    singin(data);
  });

  return (
    <div className="form-container sign-in-container">
      <form className="Form_inicioSesion" onSubmit={onSubmit}>
        <div className="formContent">
          <h1 className="title_iniciar">Iniciar sesion</h1>
          {singinErrors.map((error, i) => (
            <p className="error-message" key={i}>
              {error}
            </p>
          ))}
          <input
            className="formButton"
            type="email"
            {...register("email", { required: true })}
            placeholder="Correo electronico"
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
          <div className="buttonsRegister">
            <button type="submit" className="botonRegister">
              Iniciar sesion
            </button>
            <button className="botonRegisterGoogle">Continuar con</button>
          </div>
        </div>
        <p>
          ¿Aún no tienes cuenta?
          <a onClick={() => setSwapPaneltrue(true)}> Registrate</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
