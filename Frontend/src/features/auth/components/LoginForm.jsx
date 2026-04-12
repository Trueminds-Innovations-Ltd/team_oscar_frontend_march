import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeOff, IoEye, IoMail, IoLockClosed } from "react-icons/io5";
import Input from "./Input";
import Button from "../../../shared/ui/Button";
import LMSContext from "../../../contexts/LMSContext";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(LMSContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);
      const userData = result.user;

      // Check if user has completed onboarding:
      // - interests must be a non-empty array
      // - level must be a valid number (1, 2, or 3)
      const hasValidInterests =
        Array.isArray(userData?.interests) && userData.interests.length > 0;
      const hasValidLevel =
        typeof userData?.level === "number" &&
        [1, 2, 3].includes(userData.level);

      if (hasValidInterests && hasValidLevel) {
        navigate("/dashboard");
      } else {
        navigate("/onboarding");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-4" onSubmit={handleLogin}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div>
        <label className="text-gray-900 text-[14px] leading-5 font-medium pb-1.5">
          Email
        </label>
        <div className="bg-white flex items-center gap-2 border border-gray-500 py-4 pl-4 rounded-2xl mt-2">
          <IoMail className="text-gray-500 text-xl" />
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
          Password
        </label>
        <div className="bg-white flex items-center justify-between border border-gray-500 py-4 pl-4 pr-4 rounded-2xl mt-2 max-[320px]:pr-5">
          <div className="flex items-center gap-2">
            <IoLockClosed className="text-gray-500 text-xl" />
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
              <IoEye className="text-gray-500 text-xl" />
            ) : (
              <IoEyeOff className="text-gray-500 text-xl" />
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
        disabled={loading}
      >
        {loading ? "Logging in..." : "Log In"}
      </Button>
    </form>
  );
}

export default LoginForm;
