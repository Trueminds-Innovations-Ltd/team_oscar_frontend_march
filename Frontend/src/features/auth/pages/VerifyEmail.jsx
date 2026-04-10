import AuthBgSignUp from "../components/AuthBgSignUp";
import AuthPages from "../components/AuthPages";
import EmailVerification from "../components/EmailVerification";

function VerifyEmail() {
  return (
    <div>
      <AuthPages>
        <AuthBgSignUp />
        <EmailVerification />
      </AuthPages>
    </div>
  );
}

export default VerifyEmail;
