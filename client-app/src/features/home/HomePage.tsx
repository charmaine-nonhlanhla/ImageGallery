import { Link } from "react-router-dom";
import { Button, Container } from "semantic-ui-react";
export default function HomePage() {
    return (
        <Container style={{marginTop: '7em'}}>
           <h1>Home page</h1> 
        <Button as={Link} to='/login' size='huge' inverted>
            Square
            </Button>
        </Container>
    )
}