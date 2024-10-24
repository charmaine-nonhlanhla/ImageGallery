import { observer } from "mobx-react-lite";
import "./Logout.css";
import { useNavigate } from "react-router-dom";
import { Taskbar } from "../Taskbar/Taskbar";
import { useState } from "react";

export default observer(function LogoutPage() {
  const navigate = useNavigate();
  const [activeElement, setActiveElement] = useState<
    "home" | "image-upload" | "my-library" | "logout" | ""
  >("");
  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <Taskbar
        setActiveElement={setActiveElement}
        activeElement={activeElement}
      />
      <div className="logout-page">
        <div className="logout-box">
          <div className="logo">Logo</div>
          <div className="logout-message">You have successfully logged out</div>
          <button className="login-button" onClick={navigateToLogin}>
            Back to Login
          </button>
        </div>
      </div>
    </>
  );
});
