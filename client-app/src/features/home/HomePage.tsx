// // import { Link } from "react-router-dom";
// // import { Button, Container } from "semantic-ui-react";
// // export default function HomePage() {
// //     return (
// //         <Container style={{marginTop: '7em'}}>
// //            <h1>Home page</h1> 
// //         <Button as={Link} to='/login' size='huge' inverted>
// //             Square
// //             </Button>
// //         </Container>
// //     )
// // }


// import React from 'react';
// import { Link } from "react-router-dom";
// import { Container, Menu, Segment, Image, Grid, Input, Card, Icon, Pagination, Button } from "semantic-ui-react";
// import '../home/HomePage.css';

// export default function HomePage() {
//     const imageSrc = "/path/to/your/image.jpg"; // Update with your image path

//     return (
//         <div className="home-page">
//             <div className="left-column">
//                 <Menu vertical className="sidebar">
//                     <Menu.Item>
//                         <Image src="/path/to/logo.png" size='small' /> {/* Update with your logo path */}
//                     </Menu.Item>
//                     <Menu.Item as={Link} to='/home'>
//                         <Icon name='home' />
//                         Home
//                     </Menu.Item>
//                     <Menu.Item as={Link} to='/upload'>
//                         <Icon name='camera' />
//                         Image Upload
//                     </Menu.Item>
//                     <Menu.Item as={Link} to='/logout'>
//                         <Icon name='sign-out' />
//                         Logout
//                     </Menu.Item>
//                 </Menu>
//             </div>
//             <Container fluid className="content">
//                 <Menu secondary className="top-menu">
//                     <Menu.Item>
//                         <span>Home</span>
//                     </Menu.Item>
//                     <Menu.Menu position='right'>
//                         <Menu.Item>
//                             <Image src="/path/to/user-avatar.jpg" avatar /> {/* Update with your user avatar path */}
//                             Charmaine Mogotlane
//                         </Menu.Item>
//                         <Menu.Item>
//                             <Icon name='dropdown' />
//                         </Menu.Item>
//                     </Menu.Menu>
//                 </Menu>
//                 <Container className="main-content">
//                     <Input icon='search' placeholder='Search for...' className="search-input" />
//                     <Button icon labelPosition='left' className="filter-button">
//                         <Icon name='filter' />
//                         Filters
//                     </Button>
//                     <Grid>
//                         <Grid.Row columns={4}>
//                             {Array.from({ length: 4 }).map((_, index) => (
//                                 <Grid.Column key={index}>
//                                     <Card>
//                                         <Image src={imageSrc} wrapped ui={false} />
//                                         <Card.Content>
//                                             <Card.Header>Butterfly</Card.Header>
//                                             <Card.Description>
//                                                 Butterflies have taste receptors on their feet to help them find their host plants and locate food. A female butterfly lands on different plants, drumming the leaves with her feet until the plant releases its juices.
//                                             </Card.Description>
//                                         </Card.Content>
//                                     </Card>
//                                 </Grid.Column>
//                             ))}
//                         </Grid.Row>
//                     </Grid>
//                 </Container>
//             </Container>
//         </div>
//     );
// }
import { useState } from 'react';
import { Container, Segment, Icon, MenuItem, Image, Dropdown, DropdownItem, DropdownMenu } from 'semantic-ui-react';
import '../home/HomePage.css';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { TbCameraPlus } from "react-icons/tb";


type ActiveElement = 'home' | 'image-upload' | '';

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
            <span className="logo">Logo</span>
          </Segment>
          <div
            className={`home-element ${activeElement === 'home' ? 'active' : ''}`}
            onClick={() => handleElementClick('home')}
          >
            <GoHome className="home-icon"/>
            <span className="home-text">Home</span>
          </div>
          <div
            className={`image-upload ${activeElement === 'image-upload' ? 'active' : ''}`}
            onClick={() => handleElementClick('image-upload')}
          >
            
            <TbCameraPlus  className="home-icon"/>
            <span className="home-text">Image Upload</span>
          </div>
          <div className="logout-element">
            <Icon name="sign-out" className="logout-icon" />
            <span className="logout-text">Logout</span>
          </div>
        </Container>
      </div>
      <div className="right-menu">
        <MenuItem position='right'>
          <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
          <Dropdown pointing='top left' text={user?.displayName}>
            <DropdownMenu>
              <DropdownItem as={Link} to={`profile/${user?.username}`} text='My Profile' icon='user' />
              <DropdownItem onClick={logout} text='Logout' icon='power' />
            </DropdownMenu>
          </Dropdown>
        </MenuItem>
      </div>
    </div>
  );
})






