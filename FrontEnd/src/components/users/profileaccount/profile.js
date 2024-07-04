import React from "react";
import SidebarProfile from "./sidebarprofile";
import OrderProfile from "./orderprofile";
// Optional: For additional profile-specific styling
import "./profile.css";

function Profile() {
  return (
    <div className="profile">
      <SidebarProfile />
      <OrderProfile />
    </div>
  );
}

export default Profile;
