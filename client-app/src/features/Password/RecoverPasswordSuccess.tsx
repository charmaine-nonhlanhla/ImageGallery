import { Link } from "react-router-dom";
import RecoverPasswordSuccessImage from "../../assets/Background Image.jpg";
import "./RecoverPasswordSuccess.css";

const RecoverPasswordSuccess = () => {
  return (
    <div className="done-container">
      <h1 className="done">Done!</h1>
      <div className="message-div">
        <p className="paragraph">
          <strong>Success!</strong> If the provided email is registered with us,
          instructions will be sent to reset your password.
        </p>
      </div>
      <Link className="back-to-login-success" to="/login">
        <button className="button-text">Back to login</button>
      </Link>
      <img
        src={RecoverPasswordSuccessImage}
        alt="Recover Password Success"
        className="success-image"
      />
    </div>
  );
};

export default RecoverPasswordSuccess;
