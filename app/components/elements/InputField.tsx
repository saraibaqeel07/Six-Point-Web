"use client";
import React from "react";

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
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${baseClasses} ${
            error ? "border-red-500" : "border-white/30"
          }`}
          {...props}
        />
      )}

      {error && (
        <span className="text-xs text-red-500">{error}</span>
      )}

    </div>
  );
}