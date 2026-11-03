"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FiCalendar,
  FiLogIn,
  FiLogOut,
  FiPlusCircle,
  FiSettings,
  FiCheckCircle,
  FiUser,
} from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/lib/auth-client";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    localStorage.removeItem("access-token");
    toast.success("Logged out successfully");
    setMenuOpen(false);
  };

  const navLinks = (
    <>
      <li>
        <Link href="/events" className="flex items-center gap-2">
          <FiCalendar /> Upcoming Events
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100/90 backdrop-blur border-b border-base-300 sticky top-0 z-50 px-4 md:px-10">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>

        {/* Stacked logo: circle "HT" mark, name immediately below, tagline under that */}
        <Link href="/" className="flex flex-col items-center leading-tight py-1">
          <span className="h-10 w-10 rounded-full bg-primary text-primary-content grid place-items-center text-sm font-bold">
            HT
          </span>
          <span className="text-lg font-heading font-bold text-primary mt-1">
            HandsTogether
          </span>
          <span className="text-[10px] text-base-content/50 -mt-0.5">
            Small acts, big change
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium">{navLinks}</ul>
      </div>

      <div className="navbar-end gap-2">
        <ThemeToggle />

        {loading ? (
          <span className="loading loading-spinner loading-sm" />
        ) : user ? (
          <div className="flex items-center gap-2">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar group relative">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <Image
                    src={user.image || "/avatar-placeholder.svg"}
                    alt={user.name || "Profile"}
                    width={40}
                    height={40}
                  />
                </div>
                <span className="pointer-events-none absolute -bottom-8 right-0 whitespace-nowrap rounded bg-neutral px-2 py-1 text-xs text-neutral-content opacity-0 transition-opacity group-hover:opacity-100 z-10">
                  {user.name}
                </span>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-56">
                <li className="menu-title px-3 pt-1">{user.name}</li>
                <li>
                  <Link href="/profile" className="flex items-center gap-2">
                    <FiUser /> My Profile
                  </Link>
                </li>
                <li>
                  <Link href="/create-event" className="flex items-center gap-2">
                    <FiPlusCircle /> Create Event
                  </Link>
                </li>
                <li>
                  <Link href="/manage-events" className="flex items-center gap-2">
                    <FiSettings /> Manage Events
                  </Link>
                </li>
                <li>
                  <Link href="/joined-events" className="flex items-center gap-2">
                    <FiCheckCircle /> Joined Events
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="flex items-center gap-2 text-error">
                    <FiLogOut /> Logout
                  </button>
                </li>
              </ul>
            </div>

            {/* Visible Logout button, shown directly alongside the profile picture */}
            <button onClick={handleLogout} className="btn btn-outline btn-error btn-sm gap-2">
              <FiLogOut /> Logout
            </button>
          </div>
        ) : (
          <Link href="/login" className="btn btn-primary gap-2">
            <FiLogIn /> Login
          </Link>
        )}
      </div>
    </div>
  );
}