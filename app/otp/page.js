"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/elements/Button";
import { sendOtpService, verifyOtpService } from "@/app/lib/apiServices";
import { useAuth } from "@/app/context/AuthContext";
import { toast } from "sonner";

export default function OtpPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState("REGISTER");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef([]);

  useEffect(() => {
    const pending = sessionStorage.getItem("pending_email");
    const storedPurpose = sessionStorage.getItem("otp_purpose") || "REGISTER";
    if (!pending) {
      router.replace("/login");
      return;
    }
    setEmail(pending);
    setPurpose(storedPurpose);
    triggerSendOtp(pending, storedPurpose);
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const triggerSendOtp = async (emailAddr, otpPurpose = purpose) => {
    try {
      await sendOtpService(emailAddr, otpPurpose);
      toast.success("OTP sent to your email.");
    } catch (err) {
      const raw = err.response?.data?.message || err.message || "Failed to send OTP.";
      toast.error(Array.isArray(raw) ? raw.join(", ") : raw);
    }
  };

  const handleResend = async () => {
    if (countdown > 0 || resending) return;
    setResending(true);
    await triggerSendOtp(email);
    setCountdown(60);
    setResending(false);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value.slice(-1);
    setOtp(updated);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const updated = pasted.split("").concat(Array(6).fill("")).slice(0, 6);
    setOtp(updated);
    const nextEmpty = updated.findIndex((d) => !d);
    inputRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) {
      toast.error("Please enter the complete 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      const data = await verifyOtpService(email, purpose, code);

      const token =
        data.token ||
        data.access_token ||
        data.accessToken ||
        data.jwt ||
        data.data?.token ||
        data.data?.accessToken;

      const user = data.user || data.data || {};

      if (token) {
        login(token, user);
        sessionStorage.removeItem("pending_email");
        toast.success("Email verified! Welcome.");
        // useEffect in login page handles redirect, here we push directly
        router.push("/dashboard");
      } else {
        sessionStorage.removeItem("pending_email");
        toast.success("Email verified! Please log in.");
        router.push("/login");
      }
    } catch (err) {
      const raw = err.response?.data?.message || err.message || "Invalid OTP. Please try again.";
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
    <div className="min-h-screen bg-[#1f1919] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold">Verify your email</h1>
          <p className="mt-2 text-xs sm:text-sm text-white/60">
            We sent a 6-digit code to{" "}
            <span className="text-white font-medium">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8">

          {/* OTP boxes */}
          <div className="flex gap-3" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-12 h-14 text-center text-xl font-semibold bg-transparent border border-white/30 rounded-xl focus:outline-none focus:border-white transition"
              />
            ))}
          </div>

          <Button
            type="submit"
            className="w-full justify-center"
            disabled={loading}
          >
            {loading ? "Verifying…" : "Verify OTP"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-white/60">
          {countdown > 0 ? (
            <p>Resend OTP in <span className="text-white font-medium">{countdown}s</span></p>
          ) : (
            <button
              onClick={handleResend}
              disabled={resending}
              className="text-white underline hover:text-white/80 transition"
            >
              {resending ? "Sending…" : "Resend OTP"}
            </button>
          )}
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => router.push("/login")}
            className="text-xs text-white/40 hover:text-white/70 transition"
          >
            Back to login
          </button>
        </div>

      </div>
    </div>
  );
}
