import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../../shared/ui/Button";
import Logo from "../../../shared/ui/Logo";
import TextBox from "../../../shared/ui/TextBox";

function EmailVerifiedSuccess() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [errorMessage, setErrorMessage] = useState("");

  const token = params.get("token");

  useEffect(() => {
    const confirmEmail = async () => {
      if (!token) {
        setStatus("error");
        setErrorMessage("No verification token found");
        return;
      }

      try {
        // Replace with your actual backend URL
        const API_URL =
          "https://team-oscar-backend-march-8and.onrender.com/api";

        const res = await fetch(`${API_URL}auth/confirm/${token}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Verification failed");

        setStatus("success");
      } catch (err) {
        console.error("Email verification error:", err);
        setStatus("error");
        setErrorMessage(err.message || "Invalid or expired confirmation link");
      }
    };

    confirmEmail();
  }, [token]);

  // Loading/Verifying State
  if (status === "verifying") {
    return (
      <div className="w-full h-screen overflow-y-auto px-6 py-12 md:px-10 lg:px-20 xl:px-24 flex flex-col items-center max-[700px]:w-full">
        <div className="w-full max-w-120 flex flex-col items-center text-center">
          <div className="mb-16">
            <Logo />
          </div>

          <div className="relative mb-10">
            <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center shadow-inner animate-pulse">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-spin"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-4xl text-primary-color font-extrabold leading-tight tracking-tight max-[700px]:text-3xl">
            Verifying Your Email
          </h1>

          <p className="text-[18px] text-gray-500 font-semibold mt-4 px-4 leading-relaxed">
            Please wait while we confirm your email address...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (status === "error") {
    return (
      <div className="w-full h-screen overflow-y-auto px-6 py-12 md:px-10 lg:px-20 xl:px-24 flex flex-col items-center max-[700px]:w-full">
        <div className="w-full max-w-120 flex flex-col items-center text-center">
          <div className="mb-16">
            <Logo />
          </div>

          <div className="relative mb-10">
            <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center shadow-sm">
              <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center shadow-inner">
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
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-4xl text-red-600 font-extrabold leading-tight tracking-tight max-[700px]:text-3xl">
            Verification Failed
          </h1>

          <p className="text-[18px] text-gray-500 font-semibold mt-4 px-4 leading-relaxed">
            {errorMessage || "Unable to verify your email address."}
          </p>

          <div className="w-full mt-12 space-y-4">
            <Button
              onClick={() => navigate("/sign-up")}
              type="button"
              className="w-full font-bold text-[17px] py-4 rounded-2xl bg-primary-color hover:opacity-95 transition-all shadow-md"
              textColor="text-white"
            >
              Sign Up Again
            </Button>

            <Button
              onClick={() => navigate("/")}
              type="button"
              className="w-full font-bold text-[17px] py-4 rounded-2xl border-2 border-primary-color bg-white hover:bg-gray-50 transition-all"
              textColor="text-primary-color"
            >
              Go to Login
            </Button>
          </div>

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

  // Success State - Your original UI with manual navigation
  return (
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
