import { Container } from 'semantic-ui-react';
import { GoHome } from "react-icons/go";
import { TbCameraPlus } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { useStore } from '../../app/stores/store';
import './Taskbar.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';

type ActiveElement = 'home' | 'image-upload' | 'logout' | '';

export const Taskbar = () => {
    const { userStore: { logout } } = useStore();
    const [activeElement, setActiveElement] = useState<ActiveElement>('');
  
    const handleElementClick = (element: ActiveElement) => {
      setActiveElement(element);
    };
  return (
    <div className="left-column">
    <Container>
      {/* <Segment className="logo-container"> */}
        {/* <img src="/assets/Image-Logo.jpg" alt="Logo" className="logo-image" /> */}
        <span className="logo-text">Logo</span>
      {/* </Segment> */}
      <Link to='/home'>
      <div
        className={`home-element ${activeElement === 'home' ? 'active' : ''}`}
        onClick={() => handleElementClick('home')}
      >
        <GoHome className="home-icon"/>
        <span className="home-text">Home</span>
      </div>
        </Link>
        <Link to='/upload'>
      <div
        className={`imageupload-element ${activeElement === 'image-upload' ? 'active' : ''}`}
        onClick={() => handleElementClick('image-upload')}
      >
        <TbCameraPlus className="image-icon"/>
        <span className="image-text">Image Upload</span>
      </div>
        </Link>
      <div className={`logout-element ${activeElement === 'logout' ? 'active' : ''}`}
        onClick={() => { 
          handleElementClick('logout');
          logout();
        }} >
        <FiLogOut className="logout-icon" />
        <span className="logout-text">Logout</span>            
      </div>
    </Container>
  </div>        
  )
}
