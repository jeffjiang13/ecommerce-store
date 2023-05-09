import React, { useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import Login from "./Login";
import Register from "./Register";
import Logout from "./Logout";
import Link from "next/link";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
import { FaUserCircle } from "react-icons/fa";

import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { fetchDataFromApi } from "@/utils/api";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [categories, setCategories] = useState(null);
  const router = useRouter();
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);
  const [dropdownTimer, setDropdownTimer] = useState(null);

  const { cartItems } = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await fetchDataFromApi("/api/categories?populate=*");
    setCategories(data);
  };

  const toggleAccountDropdown = () => {
    setShowAccountDropdown((prevState) => !prevState);
  };

  return (
    <header
      className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <Wrapper className="h-[60px] flex justify-between items-center mt-8">
        <Link href="/">
          <img src="/logo.svg" className="w-[40px] md:w-[60px]" />
        </Link>

        <Menu
          showCatMenu={showCatMenu}
          setShowCatMenu={setShowCatMenu}
          categories={categories}
        />

        {mobileMenu && (
          <MenuMobile
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
            categories={categories}
            isLoggedIn={isLoggedIn}
          />
        )}

        <div className="hidden md:flex items-center text-black absolute top-0 right-40">
          {isLoggedIn ? (
            <div
              className="relative inline-block text-left"
              onMouseEnter={() => {
                clearTimeout(dropdownTimer);
                setShowAccountDropdown(true);
              }}
              onMouseLeave={() => {
                const timer = setTimeout(() => {
                  setShowAccountDropdown(false);
                }, 300);
                setDropdownTimer(timer);
              }}
            >
              <div
                className="flex items-center cursor-pointer group-hover:text-gray-500 mr-3"
                onClick={toggleAccountDropdown}
              >
                <span className="mr-1">
                  Hi,{" "}
                  {currentUser && currentUser.username
                    ? currentUser.username
                    : "Account"}
                </span>
                <svg
                  aria-hidden="true"
                  className="pre-nav-design-icon"
                  focusable="false"
                  viewBox="0 0 24 24"
                  role="img"
                  width="24px"
                  height="24px"
                  fill="none"
                  data-var="glyph"
                  style={{ display: "inline-block" }}
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M3.75 21v-3a3.75 3.75 0 013.75-3.75h9A3.75 3.75 0 0120.25 18v3"
                  ></path>
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div
                className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-opacity duration-300 ${
                  showAccountDropdown ? "opacity-100" : "opacity-0 invisible"
                }`}
              >
                <h2 className="font-bold ml-2">Account</h2>
                <div className="py-1">
                  <Link href="/order-history">
                    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                      Orders
                    </div>
                  </Link>
                  <Link href="/profile">
                    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                      Profile
                    </div>
                  </Link>
                  <Link href="/favorites">
                    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                      Favorites
                    </div>
                  </Link>
                  <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                    <Logout />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={() => router.push("/login")}
                className="bg-white text-black hover:text-gray-500 py-2 px-4"
              >
                Sign In
              </button>
              {/* <button
              onClick={() => router.push("/register")}
              className="bg-white text-black font-bold py-2 px-4 rounded"
            >
              Register
            </button> */}
            </>
          )}
        </div>
        <div className="flex items-center gap-2 text-black">
          {/* Icon start */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
            <IoMdHeartEmpty className="text-[19px] md:text-[24px]" />
            <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
              51
            </div>
          </div>
          {/* Icon end */}
          {/* Icon start */}
          <Link href="/cart">
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
              <BsCart className="text-[15px] md:text-[20px]" />
              {cartItems.length > 0 && (
                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                  {cartItems.length}
                </div>
              )}
            </div>
          </Link>
          {/* Icon end */}
          {/* Mobile icon start */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
            {mobileMenu ? (
              <VscChromeClose
                className="text-[16px]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                className="text-[20px]"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>{" "}
          {/* Mobile icon end */}
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
