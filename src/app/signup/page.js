"use client";
import { CreatePassword } from "./_components/createPassword";
import { CreateAcount } from "./_components/createAccount";
import { useState } from "react";

export default function SignUp() {
  const [step, setStep] = useState("account");

  return (
    <div className="w-full flex pl-70 py-7 pr-7 justify-between items-center h-screen">
      {step === "account" && (
        <CreateAcount nextStep={() => setStep("password")} />
      )}
      {step === "password" && (
        <CreatePassword nextStep={() => setStep("account")} />
      )}
      <div className="w-250 h-full">
        <img
          src="delivery.png"
          className="object-cover h-full w-full rounded-2xl"
        />
      </div>
    </div>
  );
}
