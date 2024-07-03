import { Button, Container, Menu } from "semantic-ui-react";
export default function NavBar() {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}} />
                    Image Gallery
                </Menu.Item>
                <Menu.Item name='Images' />
                <Menu.Item>
                    <Button positive content='Create Image' />
                </Menu.Item>
            </Container>
            </Menu>
    );
}