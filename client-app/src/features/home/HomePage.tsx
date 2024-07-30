import { useState } from 'react';
import { Container, Segment, Icon, MenuItem, Image, Dropdown, DropdownItem, DropdownMenu, Menu } from 'semantic-ui-react';
import '../home/HomePage.css';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { TbCameraPlus } from "react-icons/tb";

type ActiveElement = 'home' | 'image-upload' | 'logout' | '';

export default observer(function HomePage() {
  const { userStore: { user, logout } } = useStore();
  const [activeElement, setActiveElement] = useState<ActiveElement>('');

  const handleElementClick = (element: ActiveElement) => {
    setActiveElement(element);
  };

  return (
    <div className="page-container">
      <div className="left-column">
        <Container>
          <Segment className="logo-container">
            <img src="/assets/Image-Logo.jpg" alt="Logo" className="logo-image" />
            <span className="logo-text">Image Gallery</span>
          </Segment>
          <div
            className={`home-element ${activeElement === 'home' ? 'active' : ''}`}
            onClick={() => handleElementClick('home')}
          >
            <GoHome className="home-icon"/>
            <span className="home-text">Home</span>
          </div>
          <div
            className={`imageupload-element ${activeElement === 'image-upload' ? 'active' : ''}`}
            onClick={() => handleElementClick('image-upload')}
          >
            <TbCameraPlus className="image-icon"/>
            <span className="image-text">Image Upload</span>
          </div>
          <div className={`logout-element ${activeElement === 'logout' ? 'active' : ''}`}
            onClick={() => { 
              handleElementClick('logout');
              logout();
            }} >
            <Icon name="sign-out" className="logout-icon" />
            <span className="logout-text">Logout</span>            
          </div>
        </Container>
      </div>
      <Container fluid className="content">
        <Menu secondary className="top-menu">
          <Menu.Item>
            <span>Home</span>
          </Menu.Item>
          <Menu.Menu position='right'>
            <MenuItem position='right'>
              <Image 
                src={user?.image || '/assets/user.png'} 
                avatar 
                spaced='right' 
                style={{ width: '50px', height: '50px' }} // Change the size here
              />
              <Dropdown                  
                text={user?.fullName} className='displayname'>
                <DropdownMenu>
                  <DropdownItem as={Link} to={`profiles/${user?.fullName}`} text='My Profile' icon='user' />
                </DropdownMenu>
              </Dropdown>
            </MenuItem>
          </Menu.Menu>
        </Menu>
        </Container>
    </div>
  );
});








