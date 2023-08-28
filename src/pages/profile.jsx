import React from "react";
import styles from "../styles/Profile.module.scss";
import CustomModal from "@/components/Modal";

const user = {
  fullName: "John Doe",
  email: "john@example.com",
  phoneNumber: "123-456-7890",
};

const Profile = () => {
  return (
    <>
      <CustomModal />
      <div className={styles.profileContainer}>
        <h1>Profile Page</h1>
        <div className={styles.gridContainer}>
          <div className={styles.gridItem}>
            <strong>Full Name:</strong>
            <p>{user.fullName}</p>
          </div>
          <div className={styles.gridItem}>
            <strong>Email:</strong>
            <p>{user.email}</p>
          </div>
          <div className={styles.gridItem}>
            <strong>Phone Number:</strong>
            <p>{user.phoneNumber}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
