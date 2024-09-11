import { Link } from "react-router-dom";
import PasswordChangedImage from "../../assets/Background Image.jpg";
import './RecoverPasswordSuccess.css'
import { CiCircleCheck } from "react-icons/ci";
import './PasswordChanged.css'

const PasswordChanged = () => {
  return (
    <div className="change-container">
        <CiCircleCheck className="check-circle" />
      <h1 className="change">Password Changed!</h1>
      <div className="change-paragraph-div">   
        <p className="change-paragraph">
          Your password has been changed successfully!
        </p>
      </div>
      <Link className="password-change" to="/login">
        <button className="change-password-button">Back to login</button>
      </Link>
      <img
        src={PasswordChangedImage}
        alt="Password Changed Successfully"
        className="change-image"
        />
    </div>
  );
};

export default PasswordChanged;
