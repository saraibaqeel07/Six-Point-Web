"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/elements/Button";
import InputField from "@/app/components/elements/InputField";
import { signupService } from "@/app/lib/apiServices";
import { toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    role: "CLIENT",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await signupService(form);
      toast.success("Account created! Please log in.");
      router.push("/login");
    } catch (err) {
      const raw = err.response?.data?.message || err.message || "Signup failed. Please try again.";
      if (Array.isArray(raw)) {
        raw.forEach((msg) => toast.error(msg));
        setError(raw.join(", "));
      } else {
        toast.error(raw);
        setError(raw);
      }
    } finally {
      setLoading(false);
    }
  };

  const selectClasses =
    "w-full bg-transparent border border-white/30 py-4 px-4 text-xs sm:text-sm focus:outline-none text-white";

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

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="First Name"
                  placeholder="John"
                  value={form.firstName}
                  onChange={handleChange("firstName")}
                  required
                />
                <InputField
                  label="Last Name"
                  placeholder="Doe"
                  value={form.lastName}
                  onChange={handleChange("lastName")}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm mb-2">Gender</label>
                <select
                  value={form.gender}
                  onChange={handleChange("gender")}
                  required
                  className={selectClasses}
                  style={{ backgroundColor: "#1f1919" }}
                >
                  <option value="" disabled>Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <InputField
                label="Email"
                type="email"
                placeholder="john.doe@example.com"
                value={form.email}
                onChange={handleChange("email")}
                required
              />

              <InputField
                label="Password"
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange("password")}
                required
              />

              <InputField
                label="Confirm Password"
                type="password"
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={handleChange("confirmPassword")}
                required
              />

              {error && (
                <p className="text-xs text-red-400">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full justify-center"
                disabled={loading}
              >
                {loading ? "Creating account…" : "Sign Up"}
              </Button>
            </form>

            {/* <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs sm:text-sm text-white/60">or continue with</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <SocialButton icon="/assets/facebook.png" label="Facebook" />
              <SocialButton icon="/assets/google.png" label="Google" />
              <SocialButton icon="/assets/instagram.png" label="Instagram" />
            </div> */}

            <div className="mt-6 flex items-center justify-between border border-white/10 bg-white/5 px-4 py-4 rounded-xl">
              <p className="text-xs sm:text-sm text-white/70">
                Already have an account?
              </p>
              <Button
                type="button"
                className="px-5 py-2"
                onClick={() => router.push("/login")}
              >
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
