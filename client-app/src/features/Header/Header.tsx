import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Container, MenuItem, Image, Dropdown, DropdownItem, DropdownMenu, Menu } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import './Header.css';

interface HeaderProps {
  activeElement: 'home' | 'image-upload' | 'my-library' | 'logout' | '';
}

export const Header = ({ activeElement }: HeaderProps) => {
  const { userStore: { user } } = useStore();

  const displayText = activeElement.charAt(0).toUpperCase() + activeElement.slice(1).replace('-', ' ') || 'Home'; // Capitalize and replace dash with space

  return (
    <div className='profile-container'> 
      <Container fluid className="content">
        <Menu secondary className="top-menu">
          <Menu.Item>
            <span className='home2'>{displayText}</span> {/* Display capitalized text */}
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
                text={user?.fullName} 
                className='displayname' 
                icon={<IoIosArrowDown className='arrow-down' />}
              >
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
}
