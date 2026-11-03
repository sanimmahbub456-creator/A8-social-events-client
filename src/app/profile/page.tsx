"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiArrowLeft, FiUser, FiImage, FiMail, FiSave } from "react-icons/fi";
import PrivateRoute from "@/components/PrivateRoute";
import { useAuth } from "@/hooks/useAuth";
import { updateUser } from "@/lib/auth-client";

function ProfileForm() {
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);

  // Pre-fill once the session's user data is available.
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name can't be empty");
      return;
    }

    setSaving(true);
    try {
      await updateUser({ name: name.trim(), image: image.trim() || undefined });
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Could not update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-10 py-14">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-base-content/60 hover:text-primary transition-colors mb-6">
        <FiArrowLeft size={14} /> Back to Home
      </Link>

      <span className="badge badge-ghost gap-1 mb-3">
        <FiUser size={12} /> Account Settings
      </span>
      <h1 className="text-3xl font-heading font-bold">My Profile</h1>
      <p className="text-base-content/60 mt-1">
        Update how your name and photo appear across HandsTogether.
      </p>

      <div className="divider mt-6 mb-10" />

      <div className="flex flex-col items-center gap-3 mb-10">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <Image
              src={image || "/avatar-placeholder.svg"}
              alt={name || "Profile"}
              width={96}
              height={96}
            />
          </div>
        </div>
        <p className="text-xs text-base-content/50">Live preview of your profile picture</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="form-control">
          <label className="label py-1">
            <span className="label-text font-medium">Display Name *</span>
          </label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full pl-10 rounded-xl"
              placeholder="Your name"
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label py-1">
            <span className="label-text font-medium">Photo URL</span>
          </label>
          <div className="relative">
            <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="input input-bordered w-full pl-10 rounded-xl"
              placeholder="https://example.com/your-photo.jpg"
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label py-1">
            <span className="label-text font-medium">Email</span>
          </label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
            <input
              value={user?.email || ""}
              disabled
              className="input input-bordered w-full pl-10 rounded-xl bg-base-200 text-base-content/50"
            />
          </div>
          <label className="label py-1">
            <span className="label-text-alt text-base-content/50">Email can&apos;t be changed</span>
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-full rounded-xl gap-2" disabled={saving}>
          {saving ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <>
              <FiSave /> Save Changes
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <PrivateRoute>
      <ProfileForm />
    </PrivateRoute>
  );
}