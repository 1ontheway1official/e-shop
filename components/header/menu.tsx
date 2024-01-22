"use client";

import useCartService from "@/libs/hooks/useCartStore";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Menu() {
  const { items } = useCartService();
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  const signOutHandler = () => {
    signOut({ callbackUrl: "/signin" });
  };

  return (
    <div>
      <ul className="flex items-stretch">
        <li>
          <Link href={"/cart"} className="btn btn-ghost rounded-btn">
            Cart
            {mounted && items.length !== 0 && (
              <div className="badge badge-secondary">
                {items.reduce((a, c) => a + c.qty, 0)}
              </div>
            )}
          </Link>
        </li>
        {session && session.user ? (
          <>
            <li>
              <div className="dropdown dropdown-bottom dropdown-end">
                <label className="btn btn-ghost rounded-btn" tabIndex={0}>
                  {session.user.name}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-[1] p-2 shadow bg-base-300 rounded-box w-52 "
                >
                  {/* {session.user.isAdmin && (
                    <li onClick={handleClick}>
                      <Link href="/admin/dashboard">Admin Dashboard</Link>
                    </li>
                  )}

                  <li onClick={handleClick}>
                    <Link href="/order-history">Order history </Link>
                  </li>
                  <li onClick={handleClick}>
                    <Link href="/profile">Profile</Link>
                  </li> */}
                  <li>
                    <button type="button" onClick={signOutHandler}>
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          </>
        ) : (
          <li>
            <button
              className="btn btn-ghost rounded-btn"
              type="button"
              onClick={() => signIn()}
            >
              Sign in
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
