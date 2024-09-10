import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from 'yup';
import { observer } from "mobx-react-lite";
import { Grid, Message } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import ValidationErrors from "../Errors/ValidationErrors";
import { Link } from "react-router-dom";
import RecoverPasswordImage from '../../assets/Background Image.jpg';
import { useState } from "react";
import { useStore } from "../../app/stores/store";
import './RecoverPassword.css'
import styled from "styled-components";

const RecoverButton = styled.button`
`;

const RecoverPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const { userStore } = useStore();

  return (
    <div className="recovery-background">
      <div className="form-photo-container">
        <div className="heading-container">
          <h1 className="heading">Recover Password</h1>
        </div>

        {!emailSent ? (
          <Formik
            initialValues={{ email: '', error: '' }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            })}
            onSubmit={(values, { setErrors }) =>
              userStore.forgotPassword(values)
                .then(() => setEmailSent(true))
                .catch(error => setErrors({ error }))
            }
          >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
              <Form className="error" onSubmit={handleSubmit} autoComplete="off">
                <Grid className="container-input">
                  <Grid.Row className="input-row">
                    <Grid.Column className="input-column">
                      <label className="label-input">Email Address</label>
                      <MyTextInput className="text-input" placeholder="Enter Email" name="email" />
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row className="login-redirect-row">
                    <Grid.Column className="login-redirect">
                      <Link to="/login" className="">
                        Back to login
                      </Link>
                    </Grid.Column>
                  </Grid.Row>

                  {errors.error && (
                    <ErrorMessage
                      name="error"
                      render={() => <ValidationErrors errors={errors.error as unknown as string[]} />}
                    />
                  )}
                  <RecoverButton
                    className="button-styled"
                    type="submit"
                    disabled={!isValid || !dirty || isSubmitting}>
                    {isSubmitting ? 'Submitting...' : ' Recover Password'}   
                    </RecoverButton>
                </Grid>
              </Form>
            )}
          </Formik>
        ) : (
            <div className="">
            <h1>Done!</h1>
          <Message positive>
            <p>Success! If the provided email is registered with us, instructions will be sent to reset your password.</p>
          </Message>
            </div>
        )}
      </div>
      <img src={RecoverPasswordImage} alt="Recover Password" className="registration-image" />
    </div>
  );
};

export default observer(RecoverPassword);
