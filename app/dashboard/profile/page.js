"use client";
import React, { useState } from "react";
import PageHeader from "@/app/components/dashboard/pageHeader";
import Button from "@/app/components/elements/Button";
import InputField from "@/app/components/elements/InputField";
import { ChevronDown } from "lucide-react";

export default function ProfilePage() {
  const [openSection, setOpenSection] = useState("");

  const [profileForm, setProfileForm] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [supportForm, setSupportForm] = useState({
    fullName: "",
    subject: "",
    message: "",
  });

  const handleProfileChange = (field) => (e) => {
    setProfileForm({ ...profileForm, [field]: e.target.value });
  };

  const handleSupportChange = (field) => (e) => {
    setSupportForm({ ...supportForm, [field]: e.target.value });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();

    if (profileForm.password !== profileForm.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Profile updated:", profileForm);
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    console.log("Support request:", supportForm);
  };

  return (
    <>
      <PageHeader title="My Profile" />

      <section className="bg-[#2d2525] p-5 lg:p-6 border border-white/10">
        <div className="flex items-start gap-4">
          <img
            src="/assets/profile-img.png"
            alt="Profile"
            className="w-20 h-20 object-contain"
          />

          <div>
            <h4 className="text-white text-lg font-semibold mb-1">
              Name: John Doe
            </h4>
            <div className="text-white/60 text-sm mt-1">
              Membership: Platinum
            </div>
            <div className="text-white/60 text-sm mt-1">
              Status: Active
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#2d2525] border border-white/10 mt-5 overflow-hidden">
        <button
          type="button"
          onClick={() => setOpenSection(openSection === "profile" ? "" : "profile")}
          className="w-full flex items-center justify-between p-5 lg:p-6 text-left"
        >
          <h2 className="text-lg font-medium text-white">Edit Profile</h2>
          <ChevronDown
            className={`text-white/70 transition-transform ${
              openSection === "profile" ? "rotate-180" : ""
            }`}
            size={20}
          />
        </button>

        {openSection === "profile" && (
          <div className="px-5 lg:px-6 pb-5 lg:pb-6">
            <form onSubmit={handleProfileSubmit} className="w-full flex flex-col gap-5">
              <InputField
                label="Full Name"
                value={profileForm.fullName}
                onChange={handleProfileChange("fullName")}
              />

              <InputField
                label="Username / Email"
                value={profileForm.username}
                onChange={handleProfileChange("username")}
              />

              <InputField
                label="Password"
                type="password"
                value={profileForm.password}
                onChange={handleProfileChange("password")}
              />

              <InputField
                label="Confirm Password"
                type="password"
                value={profileForm.confirmPassword}
                onChange={handleProfileChange("confirmPassword")}
              />

              <div className="flex justify-end">
                <Button className="inline-flex">Save</Button>
              </div>
            </form>
          </div>
        )}
      </section>

      <section className="bg-[#2d2525] border border-white/10 mt-5 overflow-hidden">
        <button
          type="button"
          onClick={() => setOpenSection(openSection === "support" ? "" : "support")}
          className="w-full flex items-center justify-between p-5 lg:p-6 text-left"
        >
          <h2 className="text-lg font-medium text-white">Support</h2>
          <ChevronDown
            className={`text-white/70 transition-transform ${
              openSection === "support" ? "rotate-180" : ""
            }`}
            size={20}
          />
        </button>

        {openSection === "support" && (
          <div className="px-5 lg:px-6 pb-5 lg:pb-6">
            <form onSubmit={handleSupportSubmit} className="w-full flex flex-col gap-5">
              <InputField
                label="Full Name"
                value={supportForm.fullName}
                onChange={handleSupportChange("fullName")}
              />

              <InputField
                label="Subject"
                value={supportForm.subject}
                onChange={handleSupportChange("subject")}
              />

              <InputField
                label="Write your Full Query"
                type="textarea"
                value={supportForm.message}
                onChange={handleSupportChange("message")}
              />

              <div className="flex justify-end">
                <Button className="inline-flex">Submit Enquiry</Button>
              </div>
            </form>
          </div>
        )}
      </section>
    </>
  );
}