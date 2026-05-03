"use client";

import React, { useState } from "react";
import Button from "@/app/components/elements/Button";
import InputField from "@/app/components/elements/InputField";

export default function SignupPage() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
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
                Create your account
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-white/70">
                Fill in the details below to get started.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              <InputField
                label="Full Name"
                placeholder="John Doe"
                value={form.fullName}
                onChange={handleChange("fullName")}
              />

              <InputField
                label="Username / Email"
                placeholder="Enter your email"
                value={form.username}
                onChange={handleChange("username")}
              />

              <InputField
                label="Password"
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange("password")}
              />

              <InputField
                label="Confirm Password"
                type="password"
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={handleChange("confirmPassword")}
              />

              <Button className="w-full justify-center">
                Sign Up
              </Button>
            </form>

            {/* Divider */}
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs sm:text-sm text-white/60">
                or continue with
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Social */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              <SocialButton icon="/assets/facebook.png" label="Facebook" />
              <SocialButton icon="/assets/google.png" label="Google" />
              <SocialButton icon="/assets/instagram.png" label="Instagram" />
            </div>

            {/* Login CTA */}
            <div className="mt-6 flex items-center justify-between border border-white/10 bg-white/5 px-4 py-4 rounded-xl">
              <p className="text-xs sm:text-sm text-white/70">
                Already have an account?
              </p>
              <Button className="px-5 py-2">
                Login
              </Button>
            </div>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden lg:block">
          <img
            src="/assets/signup.png"
            alt="Signup"
            className="h-full w-full object-cover"
          />
        </div>

      </div>
    </div>
  );
}

function SocialButton({ icon, label }) {
  return (
    <button
      type="button"
      className="flex h-12 items-center justify-center rounded-xl border border-white/10 bg-[#2d2525] hover:bg-[#3a3030] transition"
      aria-label={label}
    >
      <img src={icon} alt={label} className="h-5 w-5 object-contain" />
    </button>
  );
}