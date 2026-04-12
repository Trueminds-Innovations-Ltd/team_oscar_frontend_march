import { useNavigate } from "react-router-dom";
import Button from "../../../shared/ui/Button";
import Image from "../../../shared/ui/Image";
import Logo from "../../../shared/ui/Logo";
import TextBox from "../../../shared/ui/TextBox";
import { Mail, RotateCcw, PencilLine } from "lucide-react"; // Standard icons

function EmailVerification() {
  const navigate = useNavigate();

  return (
    <div className="w-[55%] h-screen overflow-y-auto px-6 py-12 md:px-10 lg:px-20 xl:px-24 flex flex-col items-center max-[700px]:w-full">
      <div className="w-full max-w-120 flex flex-col items-center text-center">
        <div className="mb-12">
          <Logo />
        </div>

        <div className="relative mb-8">
          <div className="w-32 h-32 bg-[#4D63A3] rounded-full flex items-center justify-center shadow-lg">
            <Mail size={60} color="white" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-4xl text-[#1D3573] font-extrabold tracking-tight mb-3">
          Check your email
        </h1>
        <p className="text-[16px] text-gray-500 font-medium mb-10 max-w-xs">
          We've sent a verification email to{" "}
          <span className="text-[#1D3573] font-bold">Jo*****@gmail.com</span>
        </p>

        <Button
          type="button"
          className="w-full font-bold text-[16px] py-4 rounded-2xl bg-[#1D3573] hover:bg-[#162a5c] transition-all shadow-md flex items-center justify-center gap-3"
          textColor="text-white"
        >
          <Mail size={20} />
          Open Email App
        </Button>

        <div className="flex gap-4 w-full mt-6">
          <Button
            className="flex-1 font-bold py-3.5 rounded-2xl border-gray-300 bg-white hover:bg-gray-50 transition-all"
            border="border"
            textColor="text-[#4D63A3]"
          >
            <span className="flex items-center justify-center gap-2">
              <RotateCcw size={18} />
              Resend Link
            </span>
          </Button>

          <Button
            className="flex-1 font-bold py-3.5 rounded-2xl border-gray-300 bg-white hover:bg-gray-50 transition-all"
            border="border"
            textColor="text-[#4D63A3]"
          >
            <span className="flex items-center justify-center gap-2">
              <PencilLine size={18} />
              Edit Email
            </span>
          </Button>
        </div>

        <p className="text-gray-500 font-semibold mt-8 text-sm">
          This link will expire in{" "}
          <span className="text-gray-700">10 minutes</span>
        </p>

        <TextBox
          className="text-center text-[15px] leading-4 mt-16 pb-12 font-bold"
          textColor="text-gray-900"
        >
          Need help?{" "}
          <Button
            onClick={() => navigate("/login")}
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

export default EmailVerification;
