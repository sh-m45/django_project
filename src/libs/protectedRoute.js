import { Navigate } from "react-router-dom";
function protectedRoute(Component) {
  return () => {
    if (!localStorage.getItem("userToken")) {
      return <Navigate to="/login" />;
    } else {
      return <Component />;
    }
  };
}

export default protectedRoute;
