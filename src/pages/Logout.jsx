import { useEffect } from "react";
import { useNavigate } from "react-router";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform the logout logic directly
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");

    // Redirect to login page after logout
    navigate("/login");
  }, [navigate]);

  return <p>Logging out...</p>;
}

export default Logout;
