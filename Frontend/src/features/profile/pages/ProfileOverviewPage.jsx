import React from "react";

import ProfileHeroCard from "../components/ProfileHeroCard";
import ProfileShell from "../components/ProfileShell";
import ProfileTabsCard from "../components/ProfileTabsCard";
import { profileSections, profileUser } from "../data/profileData";

const ProfileOverviewPage = () => {
  return (
    <ProfileShell>
      <div className="space-y-6 lg:space-y-8">
        <ProfileHeroCard user={profileUser} />
        <ProfileTabsCard sections={profileSections} showEditButton />
      </div>
    </ProfileShell>
  );
};

export default ProfileOverviewPage;
