import React from 'react';
import { Container } from 'semantic-ui-react';
import '../styles/Register.css';

const Register: React.FC = () => {
  return (
    <Container style={{ marginTop: '7em' }}>
      <div className="register-container">
        <div className="frame-12">
          <h2 className="text">Lorem ipsum dolor sit amet consectetur sit amet consectetur.</h2>
          <form className="register-form">
            <div className="register-comps">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" name="fullName" placeholder="Enter your full name" />
            </div>
            <div className="register-comps">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" placeholder="Enter your email address" />
            </div>
            <div className="register-comps">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" placeholder="Enter your password" />
            </div>
            <div className="register-comps">
              <label htmlFor="confPassword">Confirm Password</label>
              <input type="password" id="confPassword" name="confPassword" placeholder="Confirm your password" />
            </div>
            <button type="submit" className="sign-up">Sign Up</button>
          </form>
          <p className="or">or</p>
          <button className="google">Sign Up with Google</button>
          <button className="facebook">Sign Up with Facebook</button>
        </div>
      </div>
    </Container>
  );
}

export default Register;
