"use client";
import { useState } from "react";
import { LeftIcon } from "@/app/icons/leftIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_context/authContext";

export const CreatePassword = ({ nextStep }) => {
  const [formData, setFormData] = useState({
    confirmpassword: "",
    password: "",
  });

  const [errors, setErrors] = useState({ email: "" });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { email } = useAuth();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must include letters and numbers.";
    }
    if (!formData.confirmpassword) {
      newErrors.confirmpassword = "Confirm Password is required.";
    } else if (formData.password !== formData.confirmpassword) {
      newErrors.confirmpassword = "Passwords do not match. Please try again.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateAccuont = async () => {
    if (!validateForm()) return;
    try {
      const res = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        accept: "application/json",
        body: JSON.stringify({ email: email, password: formData.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Create accountfailed");
        return;
      }
      localStorage.setItem("token", data.token);
      router.push("/");
      console.log(formData, "password");
    } catch (err) {
      console.log(err, "Fetch failed ❌");
    }
  };

  return (
    <div className="flex flex-col justify-between gap-6 w-104">
      <button
        className="border border-[#d1d1d1] rounded flex items-center justify-center h-9 w-9 cursor-pointer"
        onClick={nextStep}
      >
        <LeftIcon />
      </button>
      <div>
        <p className="text-2xl font-semibold">Create a strong password</p>
        <p className="text-[#71717A]">
          Create a strong password with letters, numbers.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <input
          className="h-9 border border-[#d1d1d1] rounded-md px-3 text-sm w-full"
          placeholder="Password"
          value={formData.password}
          type={showPassword ? "text" : "password"}
          onChange={(e) => handleChange("password", e.target.value)}
        />
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <input
          className="h-9 border border-[#d1d1d1] rounded-md px-3 text-sm w-full"
          placeholder="Confirm password"
          value={formData.confirmpassword}
          type={showPassword ? "text" : "password"}
          onChange={(e) => handleChange("confirmpassword", e.target.value)}
        />
        {errors.confirmpassword && (
          <p className="text-red-500 text-xs">{errors.confirmpassword}</p>
        )}
      </div>
      <div className="flex gap-2 text-[#71717A] items-center">
        <input
          type="checkbox"
          className="h-4 w-4"
          onChange={(e) => setShowPassword(e.target.checked)}
        />
        <p>Show password</p>
      </div>
      <button
        onClick={handleCreateAccuont}
        className="bg-[#18181B] opacity-20 rounded h-9 text-white hover:opacity-90"
      >
        Let's Go
      </button>

      <p className="text-[#71717A] text-center">
        Already have an account?
        <Link href={"/logIn"} className="text-[#2563EB]">
          Log in
        </Link>
      </p>
    </div>
  );
};
