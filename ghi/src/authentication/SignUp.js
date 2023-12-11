import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logocolor from "./logocolor.png";
import CustomAlert from "../alerts/signupalert";

function SignUp() {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const noAvatarImage = "https://ionicframework.com/docs/img/demos/avatar.svg";
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleUserNameChange = async (event) => {
    const { value } = event.target;
    setUsername(value);
  };
  const handleEmailChange = async (event) => {
    const { value } = event.target;
    setEmail(value);
  };
  const handlePasswordChange = async (event) => {
    const { value } = event.target;
    setPassword(value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.username = userName;
    data.email = email;
    data.password = password;
    data.profile_picture = noAvatarImage;

    const url = `${process.env.REACT_APP_API_HOST}/users/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        setUsername("");
        setEmail("");
        setPassword("");
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error("Signup failed", errorData);
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleCloseAlert = () => {
    setError("test");
  };
  const LogoIcon = () => <img src={logocolor} alt="Level Up Reviews Logo" />;

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8  h-screen w-full bg-white dark:bg-gray-800 text-black dark:text-white">
      {error && <CustomAlert message={error} onClose={handleCloseAlert} />}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <LogoIcon />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
          Sign up for your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          action="#"
          method="POST"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="username"
                required
                value={userName}
                onChange={handleUserNameChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={handleEmailChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between ">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={handlePasswordChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-customPurple px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-fuchsia-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SignUp;
