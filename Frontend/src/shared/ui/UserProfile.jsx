import { MdNotificationsActive } from "react-icons/md";

function UserProfile() {
  return (
    <section>
      <div className="flex gap-4 items-center">
        <div className="flex items-center justify-center border border-gray-300 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer">
          <MdNotificationsActive size={18} className="text-gray-600" />
        </div>

        <img src="avatar.png" alt="avater" className="w-9 h-9"/>

        <div>
          <p className="text-sm font-medium">Oscar Bob</p>
          <p className="text-sm text-gray-400">oscarbob@gmail.com</p>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
