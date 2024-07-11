import { Button, Container, Grid, Segment } from 'semantic-ui-react';
import '../styles/Register.css';
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <Container style={{marginTop: '7em'}}>
           <h1>Home page</h1> 
        <Button as={Link} to='/login' size='huge' inverted>
            Square
            </Button>
        </Container>
  );
}