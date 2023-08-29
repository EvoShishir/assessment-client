import { Button, Modal } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import styles from "@/styles/Modal.module.scss";
import { useDispatch } from "react-redux";
import { LOGOUT_USER } from "@/Redux/Typings/reducerTypings";

const CustomModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const handleOk = () => {
    setModalOpen(false);
  };

  const handleLogOut = () => {
    try {
      dispatch({ type: LOGOUT_USER });
      localStorage.removeItem("accessToken");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button type="primary" onClick={() => setModalOpen(true)}>
        Links Modal using Ant-Design
      </Button>
      <Modal
        title="Visit other links"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Okay
          </Button>,
        ]}
      >
        <h3>
          <Link href="/login">Go to Login Page</Link>
        </h3>
        <h3>
          <Link href="/sign-up">Go to Signup Page</Link>
        </h3>
        <h3>
          <Link href="/profile">
            Go to Profile Page(Authentication Required)
          </Link>
        </h3>
        <h3>
          <Link href="/">Go home</Link>
        </h3>
        <button className={styles.button} onClick={handleLogOut}>
          Logout
        </button>
      </Modal>
    </div>
  );
};

export default CustomModal;
