// import { ErrorMessage, Form, Formik } from "formik";
// import  MyTextInput from "../../src/app/common/form/MyTextInput";
// import { Button, Label } from "semantic-ui-react";
// import { useStore } from "../app/stores/store"
// import { observer } from "mobx-react-lite";
// import '../styles/Login.css'

// export default observer(function LoginForm() {
//     const {userStore} = useStore();
//     return (
        
//         <Formik 
//         initialValues={{email: '', password: '', error: null}}
//         onSubmit={(values, {setErrors}) => userStore.login(values).catch(error => 
//             setErrors({error: 'Invalid email or password'}))}
//         >
//             {({handleSubmit, isSubmitting, errors}) => (
//                 <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
//                     <MyTextInput placeholder="Email" name='email' />
//                     <MyTextInput placeholder="Password" name='password' type='password' />
//                     <ErrorMessage
//                         name='error' render={() => <Label style={{marginBottom: 10}} basic color='red' content={errors.error}/>}
//                         />
//                     <Button loading={isSubmitting} positive content='Login' type="submit" fluid />
//                 </Form>
//             )}
//             </Formik>
            
//     )
// })



import { Container, Segment, Grid, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { ErrorMessage, Form, Formik } from 'formik';
import MyTextInput from '../app/common/form/MyTextInput';
import { Label } from 'semantic-ui-react';
import { useStore } from '../app/stores/store';
import { observer } from 'mobx-react-lite';
import '../styles/Login.css'


export default observer(function LoginForm() {
  const { userStore } = useStore();

  return (
    <div className="background">
      <Container>
        <Segment className="login-frame">
          <Grid verticalAlign="middle" centered>
            <Grid.Row>
              <Grid.Column width={16}>
                <div>
                  <h1 className="header">Image Gallery App</h1>
                  <h1 className="header-2">Log in</h1>
                </div>
              </Grid.Column>
            </Grid.Row>

            <Formik
              initialValues={{ email: '', password: '', error: null }}
              onSubmit={(values, { setErrors }) =>
                userStore
                  .login(values)
                  .catch((error) =>
                    setErrors({ error: 'Invalid email or password' })
                  )
              }
            >
              {({ handleSubmit, isSubmitting, errors }) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                  <Grid.Row>
                    <Grid.Column>
                      <div className="credentials-input">
                        <label className="input-label">Username</label>
                        <div className="input-box">
                          <div className="input-icon">
                            <i className="user icon"></i>
                          </div>
                          <MyTextInput className="user-input" name="email" placeholder="Enter Username" />
                        </div>
                      </div>
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column>
                      <div className="credentials-input">
                        <label className="input-label">Password</label>
                        <div className="input-box">
                          <div className="input-icon">
                            <i className="lock icon"></i>
                          </div>
                          <MyTextInput type="password" className="user-input" name="password" placeholder="Enter Password" />
                        </div>
                      </div>
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column>
                      <Link to="" className="forgot-password">
                        Forgot Password?
                      </Link>
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column >
                      <Button loading={isSubmitting} content="Login" type="submit" fluid className="login-button" />
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column width={16} textAlign="center">
                      <p className="register-link">New to this platform? <Link to="/register">Register Here</Link></p>
                    </Grid.Column>
                  </Grid.Row>

                  <ErrorMessage
                    name="error"
                    render={() => <Label style={{ marginBottom: 10 }} basic color="red" content={errors.error} />}
                  />
                </Form>
              )}
            </Formik>
          </Grid>
        </Segment>
      </Container>
    </div>
  );
})
