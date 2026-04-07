import React from "react";

import EditProfileForm from "./EditProfileForm";
import ProfileShell from "./ProfileShell";

const EditProfilePage = () => {
  return (
    <ProfileShell>
      <div className="space-y-6 lg:space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Edit Profile
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
            Update personal details, location, and account.
          </p>
        </div>

        <EditProfileForm />
      </div>
    </ProfileShell>
  );
};

export default EditProfilePage;
