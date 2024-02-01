import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import LoginRegister from "../../views/viewRegisterLogin.jsx";
import { AuthProvider } from "../../context/authContext.jsx";
import { CongresoProvider } from "../../context/congresoContext.jsx";

import Home from "../../views/viewHome.jsx";
import Plantillas from "../../views/viewPlantillas.jsx";
import Congreso from "../../views/ViewInfoCongreso.jsx";
import Reportes from "../../views/viewReportes.jsx";
import DashboardUsuarios from "../../views/admin/dashboard-usuarios.jsx";
import DashboardCongresos from "../../views/admin/dashboard-congresos.jsx";
import DashboardReportes from "../../views/admin/dashboard-reportes.jsx";
import ProtectedRoute from "../../routes/client/protectedRoutes.jsx";
import AdminRoutes from "../../routes/client/adminRoutes.jsx";
import AddCongreso from "../../views/addCongreso.jsx";
import AddReporte from "../../views/addReporte.jsx";
import Folio from "../../views/viewFolio.jsx";
import Asistencia from "../../views/viewAsistencia.jsx";
import Constancia from "../../views/viewConstancia.jsx";
import EditCongreso from "../../components/form_admin_editar/Form_congreso_editar.jsx"; // Agregamos la importación para la página de edición

const clientRoutes = () => {
  return (
    <AuthProvider>
      <CongresoProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ingresar" element={<LoginRegister />} />
            <Route path="/eventos/:id" element={<Congreso />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/Reportes" element={<Reportes />} />
              <Route path="/plantillas" element={<Plantillas />} />
              <Route path="/constancias" element={<Constancia />} />
              <Route path="/asistencia" element={<Folio />} />
              <Route path="/asistencia/:id" element={<Asistencia />} />
              <Route element={<AdminRoutes />}>
                <Route path="/addCongreso" element={<AddCongreso />} />
                <Route path="/addReporte" element={<AddReporte />} />
                <Route path="/admin_usuarios" element={<DashboardUsuarios />} />
                <Route
                  path="/admin_congresos"
                  element={<DashboardCongresos />}
                />
                <Route path="/admin_reportes" element={<DashboardReportes />} />
                <Route path="/editar_congreso/:id" element={<EditCongreso />} />
              </Route>
            </Route>
          </Routes>
        </HashRouter>
      </CongresoProvider>
    </AuthProvider>
  );
};

export default clientRoutes;
