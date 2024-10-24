import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import MyTextInput from "../../app/common/MyTextInput";
import ValidationErrors from "../Errors/ValidationErrors";
import { Link, useNavigate } from "react-router-dom";
import RecoverPasswordImage from "../../assets/Background Image.jpg";
import { useStore } from "../../app/stores/store";
import "./RecoverPassword.css";
import styled from "styled-components";

const RecoverButton = styled.button``;

const RecoverPassword = () => {
  const { userStore } = useStore();
  const navigate = useNavigate();

  return (
    <div className="recovery-background">
      <div className="form-photo-container">
        <div className="heading-container">
          <h1 className="heading">Recover Password</h1>
        </div>

        <Formik
          initialValues={{ email: "", error: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
          })}
          onSubmit={(values, { setErrors }) =>
            userStore
              .forgotPassword(values)
              .then(() => navigate("/recover-success"))
              .catch((error) => setErrors({ error }))
          }
        >
          {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
            <Form className="error" onSubmit={handleSubmit} autoComplete="off">
              <div className="email-field">
                <label className="label-input">Email Address</label>
                <MyTextInput
                  className="text-input"
                  placeholder="Enter Email"
                  name="email"
                />
              </div>

              <Link to="/login" className="back-to-login">
                Back to login
              </Link>

              {errors.error && (
                <ErrorMessage
                  name="error"
                  render={() => (
                    <ValidationErrors
                      errors={errors.error as unknown as string[]}
                    />
                  )}
                />
              )}

              <RecoverButton
                className="button-styled"
                type="submit"
                disabled={!isValid || !dirty || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Recover Password"}
              </RecoverButton>
            </Form>
          )}
        </Formik>
      </div>
      <img
        src={RecoverPasswordImage}
        alt="Recover Password"
        className="recoverpassword-image"
      />
    </div>
  );
};

export default observer(RecoverPassword);
