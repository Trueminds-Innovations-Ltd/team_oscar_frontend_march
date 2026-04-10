import { useNavigate } from "react-router-dom";
import Button from "../../../shared/ui/Button";
import Image from "../../../shared/ui/Image";
import Logo from "../../../shared/ui/Logo";
import TextBox from "../../../shared/ui/TextBox";
import SignUpForm from "./SignUpForm";

function SignUpDetails() {
  const navigate = useNavigate();

  return (
    <div className="w-[55%] h-screen overflow-y-auto px-6 py-12 md:px-10 lg:px-20 xl:px-24 flex flex-col items-center max-[700px]:w-full">
      <div className="w-full max-w-120">
        <div className="flex flex-col max-[700px]:items-center">
          <Logo />
          <h1 className="text-4xl text-primary-color font-extrabold leading-tight mt-8 max-[1100px]:text-3xl max-[700px]:text-2xl tracking-tight">
            Create your account
          </h1>

          <p className="text-[16px] text-gray-500 font-semibold mt-2">
            Get started with Talent Flow for free
          </p>
        </div>

        <div>
          <Button
            type="button"
            className="w-full font-bold text-[16px] py-3.5 rounded-2xl mt-8 border-gray-300 bg-white cursor-pointer hover:bg-gray-50 transition-all shadow-sm"
            textColor="text-gray-900"
            border="border"
          >
            <span className="flex items-center justify-center gap-2.5">
              <Image
                src="./images/googlelogin.png"
                alt="google logo"
                className="w-5 h-5"
              />
              <p>Sign Up with Google</p>
            </span>
          </Button>

          <div className="flex items-center justify-between mt-8">
            <hr className="flex-1 border-gray-200" />
            <p className="text-gray-400 text-[11px] uppercase tracking-widest font-bold px-4">
              Or Use Email
            </p>
            <hr className="flex-1 border-gray-200" />
          </div>
        </div>

        <div className="mt-4">
          <SignUpForm />
        </div>

        <TextBox
          className="text-center text-[15px] leading-4 mt-10 pb-12 font-bold"
          textColor="text-gray-900"
        >
          Have an account?{" "}
          <Button
            onClick={() => navigate("/")}
            textColor="text-primary-color"
            className="hover:underline font-extrabold"
          >
            Log In
          </Button>
        </TextBox>
      </div>
    </div>
  );
}

export default SignUpDetails;
