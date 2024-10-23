import { Container } from "semantic-ui-react";
import { GoHome } from "react-icons/go";
import { TbCameraPlus } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { useStore } from "../../app/stores/store";
import "./Taskbar.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/GalleryLogo.png";

type ActiveElement = "home" | "image-upload" | "my-library" | "logout" | "";

interface TaskbarProps {
  setActiveElement: (element: ActiveElement) => void;
  activeElement: ActiveElement;
}

export const Taskbar = ({ setActiveElement, activeElement }: TaskbarProps) => {
  const {
    userStore: { logout },
  } = useStore();
  const navigate = useNavigate();

  const handleElementClick = (element: ActiveElement) => {
    setActiveElement(element);
  };

  const handleLogoutClick = () => {
    handleElementClick("logout");
    logout();
    navigate("/logout");
  };

  return (
    <div className="left-column">
      <Container>
        <div className="logo-container">
          <img src={Logo} alt="Logo" className="logo-image" />
        </div>
        <Link to="/">
          <div
            className={`home-element ${
              activeElement === "home" ? "active" : ""
            }`}
            onClick={() => handleElementClick("home")}
          >
            <GoHome className="home-icon" />
            <span className="home-text">Home</span>
          </div>
        </Link>
        <Link to="/upload">
          <div
            className={`imageupload-element ${
              activeElement === "image-upload" ? "active" : ""
            }`}
            onClick={() => handleElementClick("image-upload")}
          >
            <TbCameraPlus className="image-icon" />
            <span className="image-text">Image Upload</span>
          </div>
        </Link>
        <Link to="/library">
          <div
            className={`library-element ${
              activeElement === "my-library" ? "active" : ""
            }`}
            onClick={() => handleElementClick("my-library")}
          >
            <MdOutlinePhotoLibrary className="library-icon" />
            <span className="library-text">My Library</span>
          </div>
        </Link>
        <div
          className={`logout-element ${
            activeElement === "logout" ? "active" : ""
          }`}
          onClick={handleLogoutClick}
        >
          <FiLogOut className="logout-icon" />
          <span className="logout-text">Logout</span>
        </div>
      </Container>
    </div>
  );
};
