import Link from "next/link";
import { useState } from "react";

// import logo from "../assets/images/logo.svg";

export default function Navbar() {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <nav className="navbar flex flex-wrap bg-base-200 shadow-lg mb-2 py-10 px-4">
        <Link href="/">
          <a className="inline-flex items-center px-2 mx-4 ">
            <span className="text-xl font-bold">Ascend</span>
          </a>
        </Link>
        <button
          className=" inline-flex p-3 rounded lg:hidden ml-auto outline-none"
          onClick={handleClick}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
        <div className={`${active ? "" : "hidden"} w-full lg:inline-flex lg:flex-grow lg:w-auto`}>
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-stretch flex flex-col lg:h-auto">
            <Link href="/">
              <a className="btn btn-ghost btn-sm rounded-btn">Home</a>
            </Link>
            <Link href="/about">
              <a className="btn btn-ghost btn-sm rounded-btn">About</a>
            </Link>
            <Link href="/portfolio">
              <a className="btn btn-ghost btn-sm rounded-btn">Portfolio</a>
            </Link>
            <Link href="/blog">
              <a className="btn btn-ghost btn-sm rounded-btn">Blog</a>
            </Link>
            <Link href="/gallery">
              <a className="btn btn-ghost btn-sm rounded-btn">Gallery</a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
