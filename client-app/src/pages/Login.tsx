import { Container, Segment, Header, Grid, Button } from 'semantic-ui-react';
import '../Login.css'
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="background">
      <Container>
        <Segment className="login-frame">
          <Grid verticalAlign="middle" centered>
            <Grid.Row>
              <Grid.Column width={16} textAlign="center" className=''>
                <div className='login-header'>

                <h1 className='header'>Image Gallery App</h1>
            <h1 className='header header-2'>Log in</h1>
                </div>
                
              </Grid.Column>
            </Grid.Row>
           
            <Grid.Row>
              <Grid.Column width={10} >
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
              <Grid.Column width={10} >
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
           
                {/* <Link to=''> */}
                <a className='forgot-password' href='https://chatgpt.com/c/5a6438af-7f79-4700-ba25-1b62ba701158'>
                  Forgot Password?
                </a>
                {/* </Link> */}
             
            <Grid.Row>
              <Grid.Column width={10} textAlign="center">
                <button   className="login-button">
                  Login
                </button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid.Row>
              <Grid.Column width={16} textAlign="center">
                <p className="register-link">New to this platform? <a href="#">Register Here</a></p>
              </Grid.Column>
            </Grid.Row>
        </Segment>
      </Container>
    </div>
  );
}

export default Login;