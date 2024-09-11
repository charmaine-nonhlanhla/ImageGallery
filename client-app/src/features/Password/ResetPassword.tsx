import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store"
import styled from "styled-components";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import './ResetPassword.css'
import { useNavigate } from "react-router-dom";
import ValidationErrors from "../Errors/ValidationErrors";
import MyTextInput from "../../app/common/form/MyTextInput";
import ResetPasswordImage from "../../assets/Background Image.jpg";


const ResetButton = styled.button`

`;

const ResetPassword = () => {
    const { userStore } = useStore();
    const navigate = useNavigate();

    return (
        <div className="reset-background">
        <div className="form-picture-container">
          <div className="header-container">
            <h1 className="reset-header">Reset Password</h1>
          </div>

          <Formik
          initialValues={{ password: "", confirmPassword: "", error: "" }}
          validationSchema={Yup.object({
            password: Yup.string().required("Password is required"),
            confirmPassword: Yup.string().required('Password confirmation is required').oneOf([Yup.ref('password')], 'Passwords must match'),
          })}
          onSubmit={(values, { setErrors }) =>
            userStore
              .resetPassword(values)
              .then(() => navigate("/recover-success"))
              .catch((error) => setErrors({ error }))
          }
        >
          {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
            <Form className="error" onSubmit={handleSubmit} autoComplete="off">
                    <div className="password-field">
                    <label className="reset-input">Password</label>
                    <MyTextInput
                      className="input-field"
                      placeholder="New Password"
                      name="password"
                      type="password"
                      />
                    </div>

                    <div className="confirmpassword-field">
                    <label className="reset-input">Confirm Password</label>
                    <MyTextInput
                      className="input-field"
                      placeholder="Enter Password"
                      name="confirmPassword"
                      type="password"
                      />
                      </div>
   
                {errors.error && (
                  <ErrorMessage
                    name="error"
                    render={() => (
                      <ValidationErrors errors={errors.error as unknown as string[]} />
                    )}
                  />
                )}

                <ResetButton
                  className="reset-button"
                  type="submit"
                  disabled={!isValid || !dirty || isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Reset Password"}
                </ResetButton>
         
            </Form>
          )}
        </Formik>
      </div>
      <img
        src={ResetPasswordImage}
        alt="Recover Password"
        className="resetpassword-image"
      />
    </div>

    );
};

export default observer(ResetPassword);