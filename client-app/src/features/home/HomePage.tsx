import { useState } from 'react';
import { Container, Segment, MenuItem, Image, Dropdown, DropdownItem, DropdownMenu, Menu, GridColumn, GridRow, Grid, Input } from 'semantic-ui-react';
import '../home/HomePage.css';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { TbCameraPlus } from "react-icons/tb";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import styled from 'styled-components';
import { Pictures } from '../images/Pictures';

type ActiveElement = 'home' | 'image-upload' | 'logout' | '';

const FilterButton = styled.button`
  
`;

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
          {/* <Segment className="logo-container"> */}
            {/* <img src="/assets/Image-Logo.jpg" alt="Logo" className="logo-image" /> */}
            <span className="logo-text">Logo</span>
          {/* </Segment> */}
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
            <FiLogOut className="logout-icon" />
            <span className="logout-text">Logout</span>            
          </div>
        </Container>
      </div>        
          <Grid>
            <GridRow>
              <GridColumn>
              <Input                 
                placeholder='Search for...' 
                className='search-bar' 
                icon={<IoSearchOutline className='search-icon'/>} 
                />
              </GridColumn>
              <GridColumn>
                <FilterButton
                  className='filter-button' >
                    {<IoFilterSharp className='search-icon'/>} 
                    Filters
                </FilterButton>
              </GridColumn>
            </GridRow>
          </Grid>
          <Pictures />
        <Segment className='profile-container'> 
      <Container fluid className="content">
        <Menu secondary className="top-menu">
          <Menu.Item>
            <span className='home2'>Home</span>
            <IoIosArrowForward className='arrow-forward' />
          </Menu.Item>
          <Menu.Menu position='right'>
            <MenuItem position='right'>
              <Image 
                src={user?.image || '/assets/user.png'} 
                avatar 
                spaced='right' 
                style={{ width: '40px', height: '40px' }}
                />
              <Dropdown                  
                text={user?.fullName} className='displayname' icon={<IoIosArrowDown className='arrow-down'/>} >
                <DropdownMenu>
                  <DropdownItem as={Link} to={`profiles/${user?.fullName}`} text='My Profile' icon='user' />
                </DropdownMenu>
              </Dropdown>
            </MenuItem>
          </Menu.Menu>
        </Menu>
        </Container>
        </Segment>
    </div>
  );
});