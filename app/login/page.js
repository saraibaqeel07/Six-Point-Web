"use client";

import React, { useState } from "react";
import Button from "@/app/components/elements/Button";
import InputField from "@/app/components/elements/InputField";

export default function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

const handleChange = (field) => (e) => {
  setForm({ ...form, [field]: e.target.value });
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Login form submitted:", form);
};

  return (
    <div className="min-h-screen bg-[#1f1919] text-white">
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left side */}
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
                Login to your account
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-white/70">
                Enter your username and password to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <InputField
                label="Username"
                placeholder="Enter your username"
                value={form.username}
                onChange={handleChange("username")}
              />

              <InputField
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange("password")}
              />

              <div className="pt-2">
                <Button className="inline-flex w-full justify-center">
                  Login
                </Button>
              </div>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs sm:text-sm text-white/60">
                or continue with
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <SocialButton icon="/assets/facebook.png" label="Facebook" />
              <SocialButton icon="/assets/google.png" label="Google" />
              <SocialButton icon="/assets/instagram.png" label="Instagram" />
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <p className="text-xs sm:text-sm text-white/70">
                Don’t have an account?
              </p>
              <Button className="inline-flex justify-center px-5 py-2">
                Sign Up
              </Button>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="relative min-h-[320px] lg:min-h-screen overflow-hidden">
          <img
            src="/assets/login.png"
            alt="Login"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
        </div>
      </div>
    </div>
  );
}

function SocialButton({ icon, label }) {
  return (
    <button
      type="button"
      className="flex h-10 items-center justify-center rounded-xl border border-white/10 bg-[#2d2525] transition-colors hover:bg-[#3a3030]"
      aria-label={label}
    >
      <img src={icon} alt={label} className="h-10 w-6 object-contain" />
    </button>
  );
}