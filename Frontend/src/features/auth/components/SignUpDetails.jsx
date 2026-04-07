import { useNavigate } from "react-router-dom";
import Button from "../../../shared/ui/Button";
import Image from "../../../shared/ui/Image";
import Logo from "../../../shared/ui/Logo";
import TextBox from "../../../shared/ui/TextBox";
import SignUpForm from "./SignUpForm";

function SignUpDetails() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full px-22 py-20 max-[1100px]:px-14 max-[936px]:px-10 max-[794px]:py-25 max-[700px]:py-10 max-[400px]:px-6 max-[320px]:px-2">
      <div className="max-[700px]:flex max-[700px]:flex-col max-[700px]:items-center">
        <Logo />
        <h1 className="text-4xl text-primary-color font-extrabold leading-8.5 max-[1000px]:text-3xl max-[700px]:text-2xl">
          Create your account
        </h1>

        <p className="text-[16px] text-gray-500 font-semibold mt-3">
          Get started with Talent Flow for free
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
            <p>Sign Up with Google</p>
          </span>
        </Button>

        <div className="flex items-center justify-between mt-4">
          <hr className="w-40 text-gray-500 max-[500px]:w-25" />
          <p className="text-gray-500 text-[14px] font-semibold text-center leading-4 py-3">
            Or Use Email
          </p>
          <hr className="w-40 text-gray-500  max-[500px]:w-25" />
        </div>
      </div>

      <SignUpForm />

      <TextBox
        className="text-center text-[15px] leading-4 mt-4 font-bold"
        textColor="text-gray-900"
      >
        Have an account?{" "}
        <Button onClick={() => navigate("/")} textColor="text-primary-color">
          Log In
        </Button>
      </TextBox>
    </div>
  );
}

export default SignUpDetails;
