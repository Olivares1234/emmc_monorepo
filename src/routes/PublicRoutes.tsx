import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "apps/portal/auth";

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default PublicRoutes;
