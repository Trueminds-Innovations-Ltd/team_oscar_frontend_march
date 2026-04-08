import { FaCheck } from "react-icons/fa6";

function ToastMessage({ show, message }) {
  return (
    <div className={`toast ${show ? "show" : ""}`}>
      <div className="toast-icon">
        <FaCheck size={10} />
      </div>
      <span>{message}</span>
    </div>
  );
}

export default ToastMessage;
