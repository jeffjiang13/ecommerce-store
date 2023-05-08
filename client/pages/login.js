// src/pages/login.js
import Login from "../components/Login";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

const LoginPage = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Login />
    </div>
  );
};

export default LoginPage;
