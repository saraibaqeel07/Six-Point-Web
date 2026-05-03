"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import PageHeader from "@/app/components/dashboard/pageHeader";
import Button from "@/app/components/elements/Button";
import InputField from "@/app/components/elements/InputField";
import { useAuth } from "@/app/context/AuthContext";
import { updateUserService } from "@/app/lib/apiServices";
import { toast } from "sonner";

const profileSchema = z
  .object({
    fullName:        z.string().min(2, "Full name is required"),
    email:           z.string().email("Enter a valid email"),
    contactNumber:   z.string().optional(),
    gender:          z.string().optional(),
    password:        z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => !data.password || data.password === data.confirmPassword,
    { message: "Passwords do not match", path: ["confirmPassword"] }
  );

export default function ProfilePage() {
  const { user, login } = useAuth();
  const [openSection, setOpenSection] = useState("");
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName:        "",
      email:           "",
      contactNumber:   "",
      gender:          "",
      password:        "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        fullName:      user.fullName || `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        email:         user.email || "",
        contactNumber: user.contactNumber || user.phoneNumber || "",
        gender:        user.gender || "",
        password:      "",
        confirmPassword: "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (values) => {
    if (!user?._id) return;
    setSaving(true);
    try {
      const payload = {
        fullName:      values.fullName,
        email:         values.email,
        contactNumber: values.contactNumber || undefined,
        gender:        values.gender || undefined,
      };
      if (values.password) payload.password = values.password;

      const res = await updateUserService(user._id, payload);
      toast.success("Profile updated successfully!");

      // refresh auth user if response contains updated user
      const updatedUser = res?.data || res?.user || res;
      if (updatedUser?._id) {
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
        if (token) login(token, updatedUser);
      }

      reset({ ...values, password: "", confirmPassword: "" });
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Update failed.";
      toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
    } finally {
      setSaving(false);
    }
  };

  const displayName =
    user?.fullName ||
    (user?.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : null) ||
    user?.email ||
    "Member";

  const membership = user?.membership?.name || user?.currentPlan?.name || user?.membershipId?.name || null;
  const status     = user?.isActive === false ? "Inactive" : "Active";

  return (
    <>
      <PageHeader title="My Profile" />

      {/* Profile banner */}
      <section className="bg-[#2d2525] p-5 lg:p-6 border border-white/10">
        <div className="flex items-start gap-4">
          <Image src="/assets/profile-img.png" alt="Profile" width={80} height={80} className="object-contain" />
          <div>
            <h4 className="text-white text-lg font-semibold mb-1">Name: {displayName}</h4>
            {membership && (
              <div className="text-white/60 text-sm mt-1">Membership: {membership}</div>
            )}
            <div className="text-white/60 text-sm mt-1">Status: {status}</div>
          </div>
        </div>
      </section>

      {/* Edit Profile accordion */}
      <section className="bg-[#2d2525] border border-white/10 mt-5 overflow-hidden">
        <button
          type="button"
          onClick={() => setOpenSection(openSection === "profile" ? "" : "profile")}
          className="w-full flex items-center justify-between p-5 lg:p-6 text-left"
        >
          <h2 className="text-lg font-medium text-white">Edit Profile</h2>
          <ChevronDown
            className={`text-white/70 transition-transform ${openSection === "profile" ? "rotate-180" : ""}`}
            size={20}
          />
        </button>

        {openSection === "profile" && (
          <div className="px-5 lg:px-6 pb-5 lg:pb-6">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">

              <div>
                <InputField
                  label="Full Name"
                  placeholder="John Doe"
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-400">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <InputField
                  label="Email"
                  type="email"
                  placeholder="john@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div>
                <InputField
                  label="Contact Number"
                  type="tel"
                  placeholder="+1234567890"
                  {...register("contactNumber")}
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-1">Gender</label>
                <select
                  {...register("gender")}
                  className="w-full border border-white/10 bg-[#1f1919] px-4 py-3 text-sm text-white outline-none"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <InputField
                  label="New Password"
                  type="password"
                  placeholder="Leave blank to keep current"
                  {...register("password")}
                />
              </div>

              <div>
                <InputField
                  label="Confirm Password"
                  type="password"
                  placeholder="Repeat new password"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-400">{errors.confirmPassword.message}</p>
                )}
              </div>

              <div className="flex justify-end">
                <Button className="inline-flex" disabled={saving}>
                  {saving ? "Saving…" : "Save"}
                </Button>
              </div>

            </form>
          </div>
        )}
      </section>
    </>
  );
}
