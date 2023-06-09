import React from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import Logout from "./Logout";
import { useRouter } from "next/router";
const data = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "Profile", url: "/profile" },
  { id: 3, name: "Favorites", url: "/favorites" },
  { id: 4, name: "Orders", url: "/order-history" },
  { id: 5, name: "Categories", subMenu: true },
  { id: 6, name: "Cart", url: "/cart" },
  { id: 7, name: "Contact", url: "/contact" },
  { id: 8, name: "About", url: "/about" },
];

const subMenuData = [
  { id: 1, name: "Jordan", doc_count: 11 },
  { id: 2, name: "Sneakers", doc_count: 8 },
  { id: 3, name: "Running shoes", doc_count: 64 },
  { id: 4, name: "Football shoes", doc_count: 107 },
];

const MenuMobile = ({
  showCatMenu,
  setShowCatMenu,
  setMobileMenu,
  categories,
  isLoggedIn,
}) => {
  const router = useRouter();

  return (
    <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black overflow-y-auto">
    {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {!!item?.subMenu ? (
              <li
                className="cursor-pointer py-4 px-5 border-b flex flex-col relative"
                onClick={() => setShowCatMenu(!showCatMenu)}
              >
                <div className="flex justify-between items-center">
                  {item.name}
                  <BsChevronDown size={14} />
                </div>

                {showCatMenu && (
                  <ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4">
                    {categories?.map(({ attributes: c, id }) => {
                      return (
                        <Link
                          key={id}
                          href={`/category/${c.slug}`}
                          onClick={() => {
                            setShowCatMenu(false);
                            setMobileMenu(false);
                          }}
                        >
                          <li className="py-4 px-8 border-t flex justify-between">
                            {c.name}
                            <span className="opacity-50 text-sm">
                              {`(${c.products.data.length})`}
                            </span>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              <li className="py-4 px-8 border-t flex justify-between">
                <Link href={item?.url} onClick={() => setMobileMenu(false)}>
                  {item.name}
                </Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
      <li className="py-4 px-5 border-b">
        {isLoggedIn ? (
          <Logout />
        ) : (
          <button
            onClick={() => {
              router.push("/login");
              setMobileMenu(false);
            }}
            className="text-black py-2 px-4 w-full text-left"
          >
            Sign In
          </button>
        )}
      </li>
    </ul>
  );
};

export default MenuMobile;
