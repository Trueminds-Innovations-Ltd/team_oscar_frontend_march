import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { eyeOffOutline } from "ionicons/icons";
import { eyeOutline } from "ionicons/icons";
import { mailOutline } from "ionicons/icons";
import { lockClosedOutline } from "ionicons/icons";
import Input from "./Input";
import Button from "../../../shared/ui/Button";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    navigate("/onboarding");
  };

  return (
    <form className="mt-4" onSubmit={handleLogin}>
      <div>
        <label className="text-gray-900 text-[14px] leading-5 font-medium pb-1.5">
          Email
        </label>
        <div className="bg-white flex items-center gap-2 border border-gray-500 py-4 pl-4 rounded-2xl mt-2">
          <IonIcon icon={mailOutline} className="text-gray-500 text-xl" />
          <Input
            type="email"
            placeholder="Johndoe@gmail.com"
            // onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="text-gray-900 text-[14px] leading-5 font-medium pb-1.5">
          Password
        </label>
        <div className="bg-white flex items-center justify-between border border-gray-500 py-4 pl-4 pr-4 rounded-2xl mt-2 max-[320px]:pr-5">
          <div className="flex items-center gap-2">
            <IonIcon
              icon={lockClosedOutline}
              className="text-gray-500 text-xl"
            />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              // onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            className="flex cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
          >
            {showPassword ? (
              <IonIcon icon={eyeOutline} className="text-gray-500 text-xl" />
            ) : (
              <IonIcon icon={eyeOffOutline} className="text-gray-500 text-xl" />
            )}
          </Button>
        </div>
        <p className="flex justify-end mt-2.5">
          <Button
            className="font-bold"
            textColor="text-primary-color"
            type="button"
          >
            Forgot Password?
          </Button>
        </p>
      </div>
      <Button
        className="w-full font-semibold text-[16px] py-4.75 rounded-2xl mt-10 cursor-pointer"
        bgColor="bg-primary-color"
        textColor="text-white"
        type="submit"
      >
        Log In
      </Button>
    </form>
  );
}

export default LoginForm;
