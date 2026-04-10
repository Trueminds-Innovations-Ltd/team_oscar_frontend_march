import { useNavigate } from "react-router-dom";
import Button from "../../../shared/ui/Button";
import Logo from "../../../shared/ui/Logo";
import TextBox from "../../../shared/ui/TextBox";

function EmailVerifiedSuccess() {
  const navigate = useNavigate();

  return (
    /* Matches the 55% width and layout of LoginDetails */
    <div className="w-full h-screen overflow-y-auto px-6 py-12 md:px-10 lg:px-20 xl:px-24 flex flex-col items-center max-[700px]:w-full">
      <div className="w-full max-w-120 flex flex-col items-center text-center">
        {/* Logo at the top */}
        <div className="mb-16">
          <Logo />
        </div>

        {/* Success Illustration (Green Checkmark) */}
        <div className="relative mb-10">
          <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center shadow-sm">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-inner">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
        </div>

        {/* Text Header */}
        <h1 className="text-4xl text-primary-color font-extrabold leading-tight tracking-tight max-[700px]:text-3xl">
          Email Verified!
        </h1>

        <p className="text-[18px] text-gray-500 font-semibold mt-4 px-4 leading-relaxed">
          Your email has been successfully confirmed. <br />
          You can now proceed to your dashboard.
        </p>

        {/* Primary Action Button: Proceed to Login */}
        <div className="w-full mt-12">
          <Button
            onClick={() => navigate("/")} // Navigate to Login
            type="button"
            className="w-full font-bold text-[17px] py-4 rounded-2xl bg-primary-color hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-3"
            textColor="text-white"
          >
            Proceed to Login
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Button>
        </div>

        {/* Support Footer */}
        <TextBox
          className="text-center text-[15px] leading-4 mt-20 pb-12 font-bold"
          textColor="text-gray-400"
        >
          Having trouble?{" "}
          <Button
            onClick={() => navigate("/support")}
            textColor="text-primary-color"
            className="hover:underline font-extrabold"
          >
            Contact Support
          </Button>
        </TextBox>
      </div>
    </div>
  );
}

export default EmailVerifiedSuccess;
