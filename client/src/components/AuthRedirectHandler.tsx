import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}


const AuthRedirectHandler: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      // Store JWT in localStorage
      localStorage.setItem("authToken", token);

      // Clean URL (remove ?token)
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  return children;
};

export default AuthRedirectHandler;
