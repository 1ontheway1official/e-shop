import Link from "next/link";
import React from "react";
import Menu from "./menu";

const Header = () => {
  return (
    <header className="">
      <nav>
        <div className="navbar justify-between bg-base-300">
          <Link href={"/"} className="btn btn-ghost text-lg">
            On The Way
          </Link>

          <Menu />
        </div>
      </nav>
    </header>
  );
};

export default Header;
