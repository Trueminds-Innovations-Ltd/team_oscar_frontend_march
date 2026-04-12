import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeOff, IoEye, IoMail, IoLockClosed, IoPerson, IoCall, IoLocation } from "react-icons/io5";
import Input from "./Input";
import Button from "../../../shared/ui/Button";
import LMSContext from "../../../contexts/LMSContext";

function SignUpDetails() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
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
      const userData = {
        name,
        email,
        phone,
        country,
        state,
        city,
      };

      await signup(name, email, password, role, userData);

      setSuccess("Account created! Redirecting to setup...");
      setTimeout(() => {
        navigate("/verify");
      }, 1500);
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSignUp}>
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
            <IoPerson className="text-gray-500 text-xl" />
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
            Phone
          </label>
          <div className="bg-white flex items-center gap-2 border border-gray-500 py-4 pl-4 rounded-2xl mt-2">
            <IoCall className="text-gray-500 text-xl" />
            <Input
              type="tel"
              placeholder="+2348162345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-900 text-[14px] leading-5 font-medium pb-1.5">
              Country
            </label>
            <div className="bg-white flex items-center gap-2 border border-gray-500 py-4 pl-4 rounded-2xl mt-2">
              <IoLocation
                className="text-gray-500 text-xl"
              />
              <Input
                type="text"
                placeholder="Nigeria"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="text-gray-900 text-[14px] leading-5 font-medium pb-1.5">
              State
            </label>
            <div className="bg-white flex items-center gap-2 border border-gray-500 py-4 pl-4 rounded-2xl mt-2">
              <Input
                type="text"
                placeholder="Lagos"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="text-gray-900 text-[14px] leading-5 font-medium pb-1.5">
            City
          </label>
          <div className="bg-white flex items-center gap-2 border border-gray-500 py-4 pl-4 rounded-2xl mt-2">
            <IoLocation className="text-gray-500 text-xl" />
            <Input
              type="text"
              placeholder="Ajah"
              value={city}
              onChange={(e) => setCity(e.target.value)}
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
                onChange={() => setRole(1)}
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
                onChange={() => setRole(2)}
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
                <IoEyeOff
                  className="text-gray-500 text-xl"
                />
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
              <IoLockClosed className="text-gray-500 text-xl" />
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
                <IoEye className="text-gray-500 text-xl" />
              ) : (
                <IoEyeOff
                  className="text-gray-500 text-xl"
                />
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

export default SignUpDetails;
