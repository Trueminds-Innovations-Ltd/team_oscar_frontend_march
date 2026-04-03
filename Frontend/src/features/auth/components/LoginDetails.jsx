import { useNavigate } from "react-router-dom";
import Button from "../../../shared/ui/Button";
import Image from "../../../shared/ui/Image";
import Logo from "../../../shared/ui/Logo";
import TextBox from "../../../shared/ui/TextBox";
import LoginForm from "./LoginForm";

function LoginDetails() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full px-22 py-30 max-[1022px]:px-14 max-[936px]:px-10 max-[794px]:py-25 max-[700px]:py-10 max-[400px]:px-6 max-[320px]:px-2">
      <div className="max-[700px]:flex max-[700px]:flex-col max-[700px]:items-center">
        <Logo />
        <h1 className="text-4xl text-primary-color font-bold leading-8.5 max-[1000px]:text-3xl max-[700px]:text-2xl">
          Welcome back, Oscar
        </h1>

        <p className="text-[16px] text-gray-500 font-semibold mt-3">
          Log in to continue your learning journey
        </p>
      </div>

      <div>
        <Button
          type="button"
          className="w-full font-bold text-[16px] py-3 rounded-2xl mt-7 border-gray-500 bg-white cursor-pointer"
          textColor="text-gray-900"
          border="border"
        >
          <span className="flex items-center justify-center gap-2.5">
            <Image src="./images/googlelogin.png" alt="google logo" />
            <p>Continue with Google</p>
          </span>
        </Button>

        <div className="flex items-center justify-between mt-4">
          <hr className="w-40 text-gray-500 max-[500px]:w-25" />
          <p className="text-gray-500 text-[14px] font-semibold text-center leading-4 py-3">
            Or Continue With Email
          </p>
          <hr className="w-40 text-gray-500  max-[500px]:w-25" />
        </div>
      </div>

      <LoginForm />

      <TextBox
        className="text-center text-[15px] leading-4 mt-4 font-bold"
        textColor="text-gray-900"
      >
        Don't have an account?{" "}
        <Button
          onClick={() => navigate("/sign-up")}
          textColor="text-primary-color"
        >
          Sign up
        </Button>
      </TextBox>
    </div>
  );
}

export default LoginDetails;
