"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type InputFieldProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
  rows?: number;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  rows = 5,
  ...props
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  const baseClasses =
    "w-full bg-transparent border py-4 px-4 text-xs sm:text-sm focus:outline-none";

  return (
    <div className="flex flex-col gap-1">

      {label && (
        <label className="text-sm mb-2">{label}</label>
      )}

      {type === "textarea" ? (
        <textarea
          placeholder={placeholder}
          rows={rows}
          value={value}
          onChange={onChange}
          className={`${baseClasses} ${
            error ? "border-red-500" : "border-white/30"
          }`}
          {...props}
        />
      ) : (
        <div className="relative">
          <input
            type={resolvedType}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${baseClasses} ${
              error ? "border-red-500" : "border-white/30"
            } ${isPassword ? "pr-11" : ""}`}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/90 transition-colors"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>
      )}

      {error && (
        <span className="text-xs text-red-500">{error}</span>
      )}

    </div>
  );
}