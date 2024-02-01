import { createContext, useContext, useState } from "react";
import {
  createCongresoRequest,
  getCongresosRequest,
  getCongresoRequest,
} from "../api/congreso.js";
import Swal from "sweetalert2";

const CongresoContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCongreso = () => {
  const context = useContext(CongresoContext);
  if (!context) {
    throw new Error("useCongreso must be used within a CongresoProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export function CongresoProvider({ children }) {
  const [errors, setErrors] = useState([]);
  const [congresos, setCongresos] = useState([]);
  const [congreso, setCongreso] = useState([]);

  const getCongresos = async () => {
    try {
      const res = await getCongresosRequest();
      setCongresos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCongreso = async (id) => {
    try {
      const res = await getCongresoRequest(id);
      setCongreso(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addCongreso = async (congreso, fetchApi) => {
    try {

      const formData = new FormData();

      Object.keys(congreso).forEach((key) => {
        if (key === "img") {
          formData.append("img", congreso[key][0]);
        } else {
          formData.append(key, congreso[key]);
        }
      });

      await createCongresoRequest(formData);
      setCongreso(congreso);

      // Muestra la alerta de éxito
      Swal.fire({
        title: "Congreso añadido",
        icon: "success",
        confirmButtonColor: "green",
        confirmButtonText: "OK",
      }); fetchApi();
    } catch (error) {
      setErrors(error.response.data);
      // Muestra la alerta de error
      Swal.fire({
        title: "Error",
        text: "Error al añadir el congreso: " + error,
        icon: "error",
        confirmButtonColor: "green",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <CongresoContext.Provider
      value={{
        addCongreso,
        congresos,
        getCongresos,
        congreso,
        getCongreso,
        errors,
      }}
    >
      {children}
    </CongresoContext.Provider>
  );
}
