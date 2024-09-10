import { ErrorMessage, Form, Formik } from 'formik';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Button, GridColumn, GridRow } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store'
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup';
import ValidationErrors from "../Errors/ValidationErrors";
import registrationImage from '../../assets/Background Image.jpg';
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import '../Register/Register.css';
import FacebookLogin, { FailResponse, SuccessResponse } from '@greatsumini/react-facebook-login';

const RegisterForm = () => {
  const { userStore } = useStore();

  return (
    <div className="register-background">
      <div className="form-image-container">
        <div className="form-container">
          <div className="title-container">
            <h1 className="title">Register Profile</h1>
            <p className="subtitle">Lorem ipsum dolor sit amet consectetur sit amet consectetur.</p>
          </div>
          <Formik
  initialValues={{ fullName: '', email: '', password: '', confirmPassword: '', userName: '', error: '', }}
  onSubmit={(values, { setErrors }) =>
    userStore
      .register(values)
      .catch((error) => setErrors({ error }))
  }
  validationSchema={Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password')], 'Passwords must match'),
    userName: Yup.string().required('Username is required'),
  })}
>
  {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
    <Form className="error" onSubmit={handleSubmit} autoComplete="off">
      <GridRow>
        <GridColumn>
          <label className="input-label">Full Name</label>
          <MyTextInput placeholder="Full Name" name="fullName" />
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <label className="input-label">Email</label>
          <MyTextInput placeholder="Email" name="email" />
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <label className="input-label">Username</label>
          <MyTextInput placeholder="Username" name="userName" />
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <label className="input-label">Password</label>
          <MyTextInput placeholder="Enter Password" name="password" type="password" />
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <label className="input-label">Confirm Password</label>
          <MyTextInput placeholder="Confirm Password" name="confirmPassword" type="password" />
        </GridColumn>
      </GridRow>
      <ErrorMessage
        name="error"
        render={() => <ValidationErrors errors={errors.error as unknown as string[]} />}
      />
      <Button
        disabled={!isValid || !dirty || isSubmitting}
        loading={isSubmitting}
        positive
        content="Register"
        type="submit"
        fluid
        className="styled-button"
      />
      {/* <div className="or-text">or</div>
      <div className="buttons">
        <Button className="social-button">
          <FcGoogle className='google-icon' /> Sign in with Google
        </Button>
        <Button className="social-button">
          <SiFacebook className='facebook-icon' /> Sign in with Facebook
        </Button>
        <FacebookLogin
          appId='756613573093924'
          onSuccess={(response: SuccessResponse) => {
            userStore.facebookLogin(response.accessToken);
            console.log('Login Success!', response)
          }}
          onFail={(response: FailResponse) => {
            console.log('Login Failed!', response)
          }}
          className={ui button facebook huge inverted ${userStore.fbLoading && 'loading'}}
        />
      </div> */}
    </Form>
  )}
</Formik>


        </div>
        <img src={registrationImage} alt="Registration" className="registration-image" />
      </div>
    </div>
  );
};

export default observer(RegisterForm);

