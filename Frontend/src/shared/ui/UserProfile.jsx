import { MdNotificationsActive } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();
  return (
    <section>
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex items-center justify-center border border-gray-300 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer">
          <MdNotificationsActive size={18} className="text-gray-600" />
        </div>

        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            navigate("/profile");
          }}
        >
          <img
            src="avatar.png"
            alt="avatar"
            className="h-9 w-9 rounded-full object-cover"
          />

          <div className="hidden sm:block min-w-0">
            <p className="truncate text-sm font-medium">Oscar Bob</p>
            <p className="truncate text-sm text-gray-400">oscarbob@gmail.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
