import { Navigate, Route, Routes } from "react-router-dom";
import { Homepage } from "apps/portal";
import { useGetAccessRoutes } from "apps/portal/homepage/hooks";
import { Logout } from "common/logging-out";
import NotFound from "common/not-found/NotFound";

function PrivateRoutes() {
  const accessRoutes = useGetAccessRoutes();

  return (
    <Routes>
      {accessRoutes}
      <Route index path="/" element={<Homepage />} />
      <Route path="/login" element={<Navigate to="/" />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default PrivateRoutes;
