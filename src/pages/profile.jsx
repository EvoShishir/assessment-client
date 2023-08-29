import React, { useState } from "react";
import styles from "../styles/Profile.module.scss";
import "react-toastify/dist/ReactToastify.css";
import CustomModal from "@/components/Modal";
import { useDispatch, useSelector } from "react-redux";
import client from "@/client/client";
import { STORE_USER } from "@/Redux/Typings/reducerTypings";
import { ToastContainer, toast } from "react-toastify";

const Profile = () => {
  const [otp, setOtp] = useState();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(otp);

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    try {
      if (otp == user.otp) {
        const { data } = await client.post("/users/confirm-email", {
          emailConfirmed: true,
        });
        const user = data.user;
        dispatch({
          type: STORE_USER,
          payload: {
            name: user.name,
            phone: user.phone,
            email: user.email,
            emailConfirmed: user.emailConfirmed,
            otp: user.otp,
          },
        });
        return toast.success("OTP verification successful!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        return toast.error("OTP does not match", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <CustomModal />
      <div className={styles.profileContainer}>
        {user ? (
          <>
            <h1>Profile Page</h1>
            <div className={styles.gridContainer}>
              <div className={styles.gridItem}>
                <strong>Full Name:</strong>
                <p>{user.name}</p>
              </div>
              <div className={styles.gridItem}>
                <strong>Email:</strong>
                <p>{user.email}</p>
              </div>
              <div className={styles.gridItem}>
                <strong>Phone Number:</strong>
                <p>{user.phone}</p>
              </div>
            </div>
            <br />
            <div>
              {user?.emailConfirmed ? (
                <h4>Your email is confirmed</h4>
              ) : (
                <>
                  <h4>
                    It appears that your email is not confirmed. To confirm your
                    email, please enter the 6 digit otp sent to your email
                    address.
                  </h4>
                  <form onSubmit={handleOtpVerification} action="">
                    <input
                      className={styles.input}
                      onChange={(e) => setOtp(e.target.value)}
                      type="number"
                    />
                    <button
                      className={styles.button}
                      onClick={handleOtpVerification}
                    >
                      Submit
                    </button>
                  </form>
                </>
              )}
            </div>
          </>
        ) : (
          <div>
            <h3>
              You do not have authorization for this page. You are not logged
              in!
            </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
