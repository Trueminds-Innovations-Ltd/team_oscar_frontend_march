import AuthBgLogin from "../components/AuthBgLogin";
import AuthPages from "../components/AuthPages";
import LoginDetails from "../components/LoginDetails";

function Login() {
  return (
    <div>
      <AuthPages>
        <AuthBgLogin />
        <LoginDetails />
      </AuthPages>
    </div>
  );
}

export default Login;
