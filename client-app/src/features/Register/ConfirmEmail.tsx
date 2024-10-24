import { useEffect, useState } from "react";
import useQuery from "../../app/utilities/hooks";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import {
  Button,
  Header,
  Icon,
  Segment,
  SegmentInline,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

export default function ConfirmEmail() {
  const navigate = useNavigate();
  const email = useQuery().get("email") as string;
  const token = useQuery().get("token") as string;

  const Status = {
    Verifying: "Verifying",
    Failed: "Failed",
    Success: "Success",
  };

  const [status, setStatus] = useState(Status.Verifying);

  function handleConfirmEmailResend() {
    agent.Account.resendEmailConfirm(email)
      .then(() => {
        toast.success("Verification email resent - please check your email");
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    agent.Account.verifyEmail(token, email)
      .then(() => {
        setStatus(Status.Success);
      })
      .catch(() => {
        setStatus(Status.Failed);
      });
  }, [token, email]);

  function getBody() {
    switch (status) {
      case Status.Verifying:
        return <p>Verifying...</p>;
      case Status.Failed:
        return (
          <div>
            <p>
              Verification failed. You can try resending the verify link to your
              email
            </p>
            <Button
              primary
              onClick={handleConfirmEmailResend}
              size="huge"
              content="Resend email"
            />
          </div>
        );
      case Status.Success:
        return (
          <div>
            <p>Email has been verified - you can now login</p>
            <Button
              primary
              onClick={() => navigate("/login")}
              size="huge"
              content="Login"
            />
          </div>
        );
    }
  }

  return (
    <Segment placeholder textAlign="center">
      <Header icon>
        <Icon name="envelope" />
        Email verification
      </Header>
      <SegmentInline>{getBody()}</SegmentInline>
    </Segment>
  );
}
