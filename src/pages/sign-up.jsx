import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/login.module.scss";
import { useForm } from "react-hook-form";
import Link from "next/link";
import client from "@/client/client";
import { ToastContainer, toast } from "react-toastify";
import CustomModal from "@/components/Modal";
import { useDispatch } from "react-redux";
import { STORE_USER } from "@/Redux/Typings/reducerTypings";

const LoginPage = () => {
  const dispatch = useDispatch();
  const validationSchema = yup
    .object({
      name: yup.string().required(),
      phone: yup.number().required(),
      email: yup.string().required(),
      password: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleRegister = async (registerData) => {
    if (registerData.password !== registerData.confirmPassword) {
      return toast.error("Passwords don't match", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    try {
      const { data } = await client.post("/users/register", registerData);
      localStorage.setItem("accessToken", JSON.stringify(data.token));
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
      return toast.success("Account Created successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const signupFields = [
    {
      name: "name",
      placeholder: "Your Name",
      type: "name",
      label: "Name:",
      required: true,
    },
    {
      name: "phone",
      placeholder: "Your Phone",
      type: "phone",
      label: "Phone Number:",
      required: true,
    },
    {
      name: "email",
      placeholder: "Your Email Address",
      type: "email",
      label: "Email:",
      required: true,
    },
    {
      name: "password",
      placeholder: "Enter Password",
      type: "password",
      label: "Password:",
      required: true,
    },
    {
      name: "confirmPassword",
      placeholder: "Confirm Password",
      type: "password",
      label: "Confirm Password:",
      required: true,
    },
  ];

  return (
    <>
      <ToastContainer />
      <CustomModal />
      <div className={styles.login_container}>
        <h1>Login</h1>
        <form className="form" onSubmit={handleSubmit(handleRegister)}>
          {signupFields.map((field, key) => {
            return (
              <div key={key}>
                <h3>
                  {field.label}{" "}
                  {field.required ? (
                    <span style={{ color: "red" }}>*</span>
                  ) : (
                    ""
                  )}
                </h3>
                <input
                  {...register(field.name)}
                  key={key}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                />
                <br />
                <small style={{ color: "red" }}>
                  {errors[field.name]?.message}
                </small>
              </div>
            );
          })}
          <br />
          <button onClick={handleSubmit(handleRegister)}>Create account</button>
          <br />
          <h4>
            Already have an account? <Link href="/login">Login</Link>
          </h4>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
