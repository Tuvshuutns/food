"use client";
import { useState } from "react";
import { LeftIcon } from "@/app/icons/leftIcon";
import Link from "next/link";
import { useAuth } from "@/app/_context/authContext";

export const CreateAcount = ({ nextStep }) => {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({ email: "" });
  const { setEmail } = useAuth();

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setEmail(formData.email);
      nextStep();
      console.log("Create Acount success", formData);
    }
  };
  return (
    <div className="flex flex-col justify-between gap-6 w-104">
      <Link href={"/logIn"}>
        <button className="border border-[#d1d1d1] rounded flex items-center justify-center h-9 w-9 cursor-pointer">
          <LeftIcon />
        </button>
      </Link>

      <div>
        <p className="text-2xl font-semibold">Create your account</p>
        <p className="text-[#71717A]">
          Sign up to explore your favorite dishes.
        </p>
      </div>

      <input
        className="h-9 border border-[#d1d1d1] rounded-md px-3 text-sm w-full"
        placeholder="Enter your email address"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />
      {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

      <button
        onClick={handleSubmit}
        className="bg-[#18181B] opacity-20 rounded h-9 text-white hover:opacity-90"
      >
        Let's Go
      </button>

      <p className="text-[#71717A] text-center">
        Already have an account?
        <Link href={"/logIn"} className="text-[#2563EB] cursor-pointer">
          Log in
        </Link>
      </p>
    </div>
  );
};
