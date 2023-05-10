import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { registerUser, clearAuthMessage } from "../actions/authActions";
import { setToken } from "../store/authSlice";
import { loginUser } from "../actions/authActions";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const message = useSelector((state) => state.auth.message);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear the previous error message
    dispatch(clearAuthMessage());

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      const response = await dispatch(registerUser(username, email, password));

      if (response && response.user && response.jwt) {
        // Dispatch loginUser action instead of using context
        dispatch(setToken(response.jwt));
        dispatch(loginUser({ identifier: email, password }));
        router.push("/");
      } else {
        // Instead of setting a hardcoded error message, use the setMessage from your actions
        if (message) {
          console.log(message);
          setErrorMessage(message);
        } else {
          setErrorMessage("Register failed. Please check your credentials.");
        }
      }
    }
  };



  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl mb-6">Register</h2>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
          <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            className="bg-black hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
      <br />
      {errorMessage && errorMessage !== "" && (
        <p className="text-red-500 mb-4 text-center">{errorMessage}</p>
      )}
      Already have an account? Log in{" "}
      <p
        className="text-black hover:text-gray-500 text-sm font-bold cursor-pointer"
        onClick={() => router.push("/login")}
      >
        here.
      </p>
    </div>
  );
};

export default Register;
