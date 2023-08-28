import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "../styles/login.module.scss";
import { useForm } from "react-hook-form";
import Link from "next/link";

const LoginPage = () => {
  const validationSchema = yup
    .object({
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

  const loginFields = [
    {
      name: "email",
      placeholder: "Your Email Address",
      type: "text",
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
  ];

  const handleLogin = async (loginData) => {
    try {
      //   const { data } = await client.post("/users/login", loginData);
      //   localStorage.setItem("accessToken", JSON.stringify(data.token));
      //   const user = data.user;
      //   dispatch({
      //     type: "STORE_USER",
      //     payload: {
      //       name: user.name,
      //       email: user.email,
      //       role: user.role,
      //     },
      //   });
      //   return navigate(-1);
      console.log(loginData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.login_container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        {loginFields.map((field, key) => {
          return (
            <>
              <h3>
                {field.label}{" "}
                {field.required ? <span style={{ color: "red" }}>*</span> : ""}
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
            </>
          );
        })}
        <br />
        <button onClick={handleSubmit(handleLogin)}>Login</button>
        <br />
        <h4>
          Don&apos;t have an account? <Link href="/sign-up">Sign Up</Link>
        </h4>
      </form>
    </div>
  );
};

export default LoginPage;
