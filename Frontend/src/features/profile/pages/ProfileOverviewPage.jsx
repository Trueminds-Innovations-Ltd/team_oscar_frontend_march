import React from "react";

import ProfileHeroCard from "../components/ProfileHeroCard";
import ProfileShell from "../components/ProfileShell";
import ProfileTabsCard from "../components/ProfileTabsCard";
import { profileSections, profileUser } from "../data/profileData";

const ProfileOverviewPage = () => {
  return (
    <ProfileShell>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl mb-8">
        Profile
      </h1>
      <div className="space-y-6 lg:space-y-8">
        <ProfileHeroCard user={profileUser} />
        <ProfileTabsCard sections={profileSections} showEditButton />
      </div>
    </ProfileShell>
  );
};

export default ProfileOverviewPage;
