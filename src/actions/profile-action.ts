"use server";

import { BASE_URL } from "@/lib/base-url";
import { cookies } from "next/headers";

export const profileActionUpdateCover = async (prev: any,formData: FormData) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("token")?.value;
  if (!cookie) {
    return null;
  }

  const form = new FormData();
  form.append("banner", formData.get("banner")!);
  const res = await fetch(`${BASE_URL}/profile/banner`, {
    method: "PATCH",
    headers: {
      cookie: `token=${cookie}`,
    },
    body: form,
  });
  const data = await res.json();
  return {
    message: "berhasil mengganti cover",
    success: true,
  };
};

export const profileActionUpdateProfile = async (prev: any,formData: FormData) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("token")?.value;
  if (!cookie) {
    return null;
  }
}