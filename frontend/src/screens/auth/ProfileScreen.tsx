import React, { useState } from "react";
import { Avatar, Button, Chip, Tab, Tabs } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import Handyman from "@mui/icons-material/Handyman"
import Navbar from "../../components/Global/Navbar";
import "../../styles/profileScreen.css";
import { useAppSelector } from "../../redux/hooks";
import CustomModal from "../../components/Global/CustomModal";
import BecomeProForm from "../../components/Profile/BecomeProForm";
import EditProfileForm from "../../components/Profile/EditProfileForm";


function ProfileScreen(): React.JSX.Element {
  const { user } = useAppSelector((state) => state.auth);

  const [becomeProModal, setBecomeProModal] = useState<boolean>(false);
  const [editProfileModal, setEditProfileModal] = useState<boolean>(false);

  const fullName = `${user?.firstName} ${user?.lastName ?? ""}`.trim();
  const location = [user?.city, user?.zip].filter(Boolean).join(", ") || "Not provided";

  return (
    <div className="profile">
      <Navbar position="static" />

      <main className="profile__main">
        {/* ---------- Hero ---------- */}
        <section className="profile__card profile__hero">
          <div className="profile__banner" aria-hidden="true" />

          <div className="profile__hero-body">
            <Avatar
              className="profile__avatar"
              src={user?.profilePicturePath || undefined}
              alt={fullName}
            >
              {user?.firstName.charAt(0)}
            </Avatar>

            <div className="profile__identity">
              <div className="profile__name-row">
                <h1 className="profile__name">{fullName}</h1>
                <Chip
                  className="profile__chip"
                  label={user?.status}
                  color={user?.status === "active" ? "success" : "default"}
                  variant="outlined"
                  size="small"
                />
              </div>

              <p className="profile__username">@{user?.username || "username"}</p>

              <ul className="profile__meta">
                <li className="profile__meta-item">
                  <LocationOnIcon className="profile__meta-icon" />
                  {location}
                </li>
              </ul>
            </div>

            <div className="profile__hero-actions">
              <Button
                className="profile__edit"
                variant="contained"
                startIcon={<Handyman />}
                onClick={() => setBecomeProModal(true)}
              >
                Register as Pro
              </Button>

              <Button
                className="profile__edit"
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setEditProfileModal(true)}
              >
                Edit profile
              </Button>
            </div>
          </div>
        </section>

        {/* ---------- Body ---------- */}
        <div className="profile__grid">
          {/* Main column */}
          <section className="profile__card profile__content">
            {user?.role === "professional" && (
              <div className="profile__tabs-header">
                <Tabs value={0} aria-label="Professional profile sections">
                  <Tab className="profile__tab" label="About" />
                  <Tab className="profile__tab" label="Past Jobs" />
                </Tabs>
              </div>
            )}

            <div className="profile__section">
              <h2 className="profile__section-title">About</h2>
              <p className="profile__bio">
                {user?.bio || "No bio has been added yet."}
              </p>
            </div>


          </section>

          {/* Sidebar */}
          <aside className="profile__card profile__side">
            <div>
              <h2 className="profile__side-title">Contact</h2>
              <ul className="profile__contact">
                <li className="profile__contact-item">
                  <span className="profile__contact-icon">
                    <EmailIcon fontSize="small" />
                  </span>
                  <span className="profile__contact-text">
                    <span className="profile__label">Email address</span>
                    <span className="profile__value">{user?.email}</span>
                  </span>
                </li>

                <li className="profile__contact-item">
                  <span className="profile__contact-icon">
                    <LocationOnIcon fontSize="small" />
                  </span>
                  <span className="profile__contact-text">
                    <span className="profile__label">Location</span>
                    <span className="profile__value">{location}</span>
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="profile__side-title">Account details</h2>
              <dl className="profile__facts">
                <div className="profile__fact">
                  <dt>First name</dt>
                  <dd>{user?.firstName}</dd>
                </div>
                <div className="profile__fact">
                  <dt>Last name</dt>
                  <dd>{user?.lastName || "Not provided"}</dd>
                </div>
                <div className="profile__fact">
                  <dt>Username</dt>
                  <dd>{user?.username || "Not provided"}</dd>
                </div>
                <div className="profile__fact">
                  <dt>Account type</dt>
                  <dd className="profile__capitalize">{user?.role}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </main>

      <CustomModal
        open={becomeProModal}
        onClose={() => setBecomeProModal(false)}
        children={<BecomeProForm />}
        label="modal-become-pro-form"
      />

      <CustomModal
        open={editProfileModal}
        onClose={() => setEditProfileModal(false)}
        children={<EditProfileForm setModal={setEditProfileModal}/>}
        label="modal-edit-profile-form"
      />
    </div>
  );
}

export default ProfileScreen;