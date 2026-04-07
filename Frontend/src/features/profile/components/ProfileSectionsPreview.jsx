import React from "react";

import ProfileShell from "./ProfileShell";
import ProfileTabsCard from "./ProfileTabsCard";
import { profileSections } from "./profileData";

const ProfileSectionsPreview = () => {
  return (
    <ProfileShell>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Profile Information
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
            This screen focuses on the tabbed personal information, learning
            preferences, and achievements views.
          </p>
        </div>

        <ProfileTabsCard sections={profileSections} />
      </div>
    </ProfileShell>
  );
};

export default ProfileSectionsPreview;
