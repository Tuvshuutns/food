"use client";
import { useState } from "react";
import Image from "next/image";
import { LeftIcon } from "@/app/icons/leftIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../_context/authContext";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const { setToken, setUser, setEmail } = useAuth();
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Za-z._\-0-9]+@[A-Za-z]+\.[a-z]{2,4}$/.test(formData.email)
    ) {
      newErrors.email = "Please provide a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must include letters and numbers.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      const res = await fetch("http://localhost:8000/users/logIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        accept: "application/json",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      setEmail(data.user?.email || "");
      router.push("/");
    } catch (err) {
      console.log("❌ Login failed:", err);
    }
  };

  return (
    <div className="w-full flex pl-70 py-7 pr-7 justify-between items-center h-screen">
      <div className="flex flex-col justify-between h-[376px] w-104">
        <Link
          className="border border-[#d1d1d1] rounded flex items-center justify-center h-9 w-9 cursor-pointer"
          href={"/"}
        >
          <LeftIcon />
        </Link>

        <div>
          <p className="text-2xl font-semibold">Log in</p>
          <p className="text-[#71717A]">
            Log in to enjoy your favorite dishes.
          </p>
        </div>

        <div className="flex flex-col justify-between gap-4">
          <input
            className="h-9 border border-[#d1d1d1] rounded-md px-3 text-sm w-full"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}

          <input
            className="h-9 border border-[#d1d1d1] rounded-md px-3 text-sm w-full"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}

          <p className="underline">Forgot password?</p>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="bg-[#18181B] opacity-20 rounded h-9 text-white flex justify-center items-center cursor-pointer"
        >
          Lets Go
        </button>

        <p>
          Dont have an account?
          <Link
            className="text-[#2563EB] cursor-pointer hover:underline"
            href={"/signup"}
          >
            Sign up
          </Link>
        </p>
      </div>
      <div className="w-250 h-full">
        <Image
          src="/admin/delivery.png"
          alt="Delivery service illustration"
          className="object-cover h-full w-full rounded-2xl"
          fill
        />
      </div>
    </div>
  );
}
