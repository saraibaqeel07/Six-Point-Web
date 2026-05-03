"use client";

import React, { useState } from "react";
import Button from "@/app/components/elements/Button";
import InputField from "@/app/components/elements/InputField";

export default function ForgetPasswordPage() {
  const [form, setForm] = useState({
    username: "",
  });

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Signup form submitted:", form);
  };

  return (
    <div className="min-h-screen bg-[#1f1919] text-white">
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT */}
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
          <div className="w-full max-w-md">

            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
               Forget Password
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-white/70">
                  Kindy enter your email address and we’ll send you a password reset instructions.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">


              <InputField
                label="Email Address"
                placeholder="Enter your email"
                value={form.username}
                onChange={handleChange("username")}
              />


              <Button className="w-full justify-center">
              Forget Password
              </Button>
            </form>


          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden lg:block">
          <img
            src="/assets/forget-password.png"
            alt="Signup"
            className="h-full w-full object-cover"
          />
        </div>

      </div>
    </div>
  );
}
