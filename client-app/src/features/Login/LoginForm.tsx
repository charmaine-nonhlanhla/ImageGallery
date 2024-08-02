import { Container, Segment, Grid, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { ErrorMessage, Form, Formik } from 'formik';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { FaUser, FaLock } from 'react-icons/fa';
import '../../features/Login/Login.css';

const CustomButton = styled.button`
  background-color: #2187AB;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;

  &:hover {
    background-color: #1b6d87;
  }
`;

export default observer(function LoginForm() {
    const { userStore } = useStore();

    return (
        <div className="login-background">
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
                                    .catch(() =>
                                        setErrors({ error: 'Invalid email or password' })
                                    )
                            }
                        >
                            {({ handleSubmit, isSubmitting, errors }) => (
                                <Form className="" onSubmit={handleSubmit} autoComplete="off">
                                    <Grid.Row>
                                        <Grid.Column>
                                            <div className="">
                                                <label className="input-label">Username</label>
                                                <div className="">
                                                    <MyTextInput
                                                        name="email"
                                                        placeholder="Enter Username"
                                                        icon={FaUser}
                                                    />
                                                </div>
                                            </div>
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column>
                                            <div className="">
                                                <label className="input-label">Password</label>
                                                <div className="">
                                                    <MyTextInput
                                                        type="password"
                                                        name="password"
                                                        placeholder="Enter Password"
                                                        icon={FaLock}
                                                    />
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

                                    <Grid.Row className="button-row">
                                        <Grid.Column >
                                            <CustomButton type="submit" disabled={isSubmitting}>
                                                {isSubmitting ? 'Logging in...' : 'Login'}
                                            </CustomButton>
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
});
