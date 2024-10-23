import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import styled from "styled-components";
import { ErrorMessage, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import "./ResetPassword.css";
import { useNavigate, useLocation } from "react-router-dom";
import ValidationErrors from "../Errors/ValidationErrors";
import MyTextInput from "../../app/common/form/MyTextInput";
import ResetPasswordImage from "../../assets/Background Image.jpg";

const ResetButton = styled.button`
  /* Add custom styles for the reset button here */
`;

const ResetPassword = () => {
  const { userStore } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const email = queryParams.get("email");

  const initialValues = {
    email: email || "",
    password: "",
    confirmPassword: "",
    token: token || "",
    error: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .required("Password confirmation is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const handleSubmit = (
    values: { email: string; password: string; token: string },
    {
      setErrors,
    }: FormikHelpers<{
      email: string;
      password: string;
      confirmPassword: string;
      token: string;
      error: string;
    }>
  ) =>
    userStore
      .resetPassword(values)
      .then(() => navigate("/changepassword"))
      .catch((error) => setErrors({ error }));

  return (
    <div className="reset-background">
      <div className="form-picture-container">
        <div className="header-container">
          <h1 className="reset-header">Reset Password</h1>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
            <Form className="error" onSubmit={handleSubmit} autoComplete="off">
              <div className="password-field">
                <label className="reset-input">New Password</label>
                <MyTextInput
                  className="input-field"
                  placeholder="Enter New Password"
                  name="password"
                  type="password"
                />
              </div>

              <div className="confirmpassword-field">
                <label className="reset-input">Confirm Password</label>
                <MyTextInput
                  className="input-field"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  type="password"
                />
              </div>

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
