"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/elements/Button";
import InputField from "@/app/components/elements/InputField";
import { loginService } from "@/app/lib/apiServices";
import { useAuth } from "@/app/context/AuthContext";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  // Navigate only after React has committed the isAuthenticated state update
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      toast.error("Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      const data = await loginService(form.email, form.password);

      const user = data.user || data.data || {};

      // Unverified account — store email and go to OTP page
      if (user.isVerified === false) {
        sessionStorage.setItem("pending_email", user.email || form.email);
        sessionStorage.setItem("otp_purpose", "REGISTER");
        toast.info("Please verify your account. OTP sent to your email.");
        router.push("/otp");
        return;
      }

      const token =
        data.token ||
        data.access_token ||
        data.accessToken ||
        data.jwt ||
        data.data?.token ||
        data.data?.access_token ||
        data.data?.accessToken;

      if (!token) {
        toast.error("Login failed: no token received from server.");
        return;
      }

      login(token, user);
      toast.success("Logged in successfully!");
    } catch (err) {
      const raw = err.response?.data?.message || err.message || "Login failed. Please try again.";
      if (Array.isArray(raw)) {
        raw.forEach((msg) => toast.error(msg));
      } else {
        toast.error(raw);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[#1f1919] text-white">
      <div className="h-full grid grid-cols-1 lg:grid-cols-2">

        {/* Left side */}
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10 overflow-y-auto">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
                Login to your account
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-white/70">
                Enter your email and password to continue.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <InputField
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange("email")}
              />

              <InputField
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange("password")}
              />

              <div className="pt-2">
                <Button
                  type="button"
                  className="inline-flex w-full justify-center"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? "Logging in…" : "Login"}
                </Button>
              </div>
            </div>

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

            <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <p className="text-xs sm:text-sm text-white/70">
                Don&apos;t have an account?
              </p>
              <Button
                type="button"
                className="inline-flex justify-center px-5 py-2"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="hidden lg:block relative overflow-hidden">
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
