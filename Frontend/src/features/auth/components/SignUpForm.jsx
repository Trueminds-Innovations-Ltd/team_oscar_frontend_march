import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { eyeOffOutline } from "ionicons/icons";
import { eyeOutline } from "ionicons/icons";
import { mailOutline } from "ionicons/icons";
import { lockClosedOutline } from "ionicons/icons";
import { personOutline } from "ionicons/icons";
import Input from "./Input";
import Button from "../../../shared/ui/Button";
import LMSContext from "../../../contexts/LMSContext";

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { signup } = useContext(LMSContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters!");
      return;
    }

    setLoading(true);

    try {
      await signup(name, email, password, role);
      setSuccess("Account created! Please check your email to confirm your account.");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4" onSubmit={handleSignUp}>
      <form>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <div>
          <label className="text-gray-900 text-[14px] leading-5 font-medium pb-1.5">
            Full Name
          </label>
          <div className="bg-white flex items-center gap-2 border border-gray-500 py-4 pl-4 rounded-2xl mt-2">
            <IonIcon icon={personOutline} className="text-gray-500 text-xl" />
            <Input
              type="text"
              placeholder="E.G Kayode Chinedu"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="text-gray-900 text-[14px] leading-5 font-medium pb-1.5">
            Email
          </label>
          <div className="bg-white flex items-center gap-2 border border-gray-500 py-4 pl-4 rounded-2xl mt-2">
            <IonIcon icon={mailOutline} className="text-gray-500 text-xl" />
            <Input
              type="email"
              placeholder="Johndoe@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="text-gray-900 text-[14px] leading-5 font-medium pb-1.5">
            I am a:
          </label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value={1}
                checked={role === 1}
                onChange={(e) => setRole(1)}
                className="w-4 h-4"
              />
              <span>Student</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value={2}
                checked={role === 2}
                onChange={(e) => setRole(2)}
                className="w-4 h-4"
              />
              <span>Tutor</span>
            </label>
          </div>
        </div>

        <div className="mt-4">
          <label className="text-gray-900 text-[14px] leading-5 font-medium pb-1.5">
            Password
          </label>
          <div className="bg-white flex items-center justify-between border border-gray-500 py-4 pl-4 pr-4 rounded-2xl mt-2 max-[320px]:pr-5">
            <div className="flex items-center gap-2">
              <IonIcon icon={lockClosedOutline} className="text-gray-500 text-xl" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
        </div>

        <div className="mt-4">
          <label className="text-gray-900 text-[14px] leading-5 font-medium pb-1.5">
            Confirm Password
          </label>
          <div className="bg-white flex items-center justify-between border border-gray-500 py-4 pl-4 pr-4 rounded-2xl mt-2 max-[320px]:pr-5">
            <div className="flex items-center gap-2">
              <IonIcon icon={lockClosedOutline} className="text-gray-500 text-xl" />
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-Enter Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button
              className="flex cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              type="button"
            >
              {showConfirmPassword ? (
                <IonIcon icon={eyeOutline} className="text-gray-500 text-xl" />
              ) : (
                <IonIcon icon={eyeOffOutline} className="text-gray-500 text-xl" />
              )}
            </Button>
          </div>
        </div>

        <Button
          className="w-full font-semibold text-[16px] py-4.75 rounded-2xl mt-10 cursor-pointer"
          bgColor="bg-primary-color"
          textColor="text-white"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </div>
  );
}

export default SignUpForm;
