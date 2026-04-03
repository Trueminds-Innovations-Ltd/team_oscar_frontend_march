import AuthBgSignUp from "../components/AuthBgSignUp";
import AuthPages from "../components/AuthPages";
import SignUpDetails from "../components/SignUpDetails";

function SignUp() {
  return (
    <div>
      <AuthPages>
        <AuthBgSignUp />
        <SignUpDetails />
      </AuthPages>
    </div>
  );
}

export default SignUp;
