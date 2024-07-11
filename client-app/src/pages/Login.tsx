import { Container, Segment, Grid } from 'semantic-ui-react';
import '../styles/Login.css';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="background">
      <Container>
        <Segment className="login-frame">
          <Grid verticalAlign="middle" centered>
            <Grid.Row>
              <Grid.Column >
                <div >
                  <h1 className='header'>Image Gallery App</h1>
                  <h1 className='header-2'>Log in</h1>
                </div>
              </Grid.Column>
            </Grid.Row>
            
            <Grid.Row>
              <Grid.Column >
                <div className="credentials-input">
                  <label className="input-label">Username</label>
                  <div className="input-box">
                    <div className="input-icon">
                      <i className="user icon"></i>
                    </div>
                    <input className='user-input' type="text" placeholder="Enter Username" />
                  </div>
                </div> 
              </Grid.Column>
            </Grid.Row>
            
            <Grid.Row>
              <Grid.Column >
                <div className="credentials-input">
                  <label className="input-label">Password</label>
                  <div className="input-box">
                    <div className="input-icon">
                      <i className="lock icon"></i>
                    </div>
                    <input type="password" className='user-input' placeholder="Enter Password" />
                  </div>
                </div>
              </Grid.Column>
            </Grid.Row>
            
            <Grid.Row>
              <Grid.Column >
                <Link to='' className='forgot-password'>
                  Forgot Password?
                </Link>
              </Grid.Column>
            </Grid.Row>
            
            <Grid.Row>
              <Grid.Column width={10} textAlign="center">
                <button className="login-button">
                  Login
                </button>
              </Grid.Column>
            </Grid.Row>
            
            <Grid.Row>
              <Grid.Column width={16} textAlign="center">
                <p className="register-link">New to this platform? <a href="#">Register Here</a></p>
              </Grid.Column>
            </Grid.Row>
          
          </Grid>
        </Segment>
      </Container>
    </div>
  );
}

export default (Login);
