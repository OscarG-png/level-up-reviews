import React, { useEffect, useState } from "react";
import useToken  from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../alerts/loginalert";
import logocolor from "./logocolor.png"

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, token } = useToken();
  const navigate = useNavigate();
  const [error, setError] = useState("");



  const handleUserNameChange = async (e) => {
    const { value } = e.target;
    setUsername(value);
  }
  const handlePasswordChange = async (e) => {
    const { value } = e.target;
    setPassword(value);
  }
  const navigateToSignup = () => {
    navigate("/signup");
  }

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await login(username, password);
    if (!token) {
      setError(true);
    }
  } catch (error) {
    setError("Invalid username or password");
  }
};

useEffect(() => {
  if (token) {
    navigate("/");
  }
}, [token, navigate]);


  const handleCloseAlert = () => {
    setError("Invalid username or password");
  };
  const LogoIcon = () => (
    <img src={logocolor} alt="Level Up Reviews Logo"/>
  );


  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-screen bg-white dark:bg-gray-800 text-black dark:text-white">
       {error && <CustomAlert message={error} onClose={handleCloseAlert} />}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <LogoIcon />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight dark:text-white">
          Login to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          action="#"
          method="POST"
        >
          <div>
            <label
              htmlFor="username"
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
                value={username}
                onChange={handleUserNameChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
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
              className=" flex w-full justify-center rounded-md bg-customPurple px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-fuchsia-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500 dark:text-white">
          Not a member?{" "}
          <button
            onClick={navigateToSignup}
          className="font-semibold leading-6 text-customPurple hover:text-fuchsia-700"
          >
          BECOME ONE
        </button>
        </p>
      </div>
    </div>
  );
  }
export default LoginForm;
