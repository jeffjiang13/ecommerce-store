// src/pages/register.js
import Register from "../components/Register";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

const RegisterPage = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Register />
    </div>
  );
};

export default RegisterPage;
