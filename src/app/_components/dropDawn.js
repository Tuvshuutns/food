"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProfileIcon } from "../icons/profileIcon";
import Link from "next/link";
import { useAuth } from "../_context/authContext";

export function Dropdownq() {
  const { user } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="bg-red-500 rounded-full h-9 w-9 flex items-center justify-center">
          <ProfileIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <div className="h-26 bg-white rounded-lg p-4 flex flex-col justify-between items-center">
          <p className="text-xl font-semibold">
            {user ? user.email : "Test@gmail.com"}
          </p>
          <Link
            className="px-3 py-2 flex items-center justify-center bg-[#F4F4F5] rounded-full cursor-pointer"
            href={"/logIn"}
          >
            {user ? "Log out" : "Log In"}
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
