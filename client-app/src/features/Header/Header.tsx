import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom';
import { Container, MenuItem, Image, Dropdown, DropdownItem, DropdownMenu, Menu } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import './Header.css'

export const Header = () => {
const { userStore: { user } } = useStore();
  return (
    
    <div className='profile-container'> 
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
      </div>
      
  )
}
