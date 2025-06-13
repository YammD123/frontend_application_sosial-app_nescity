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

export const profileActionUpdateAvatar = async (prev: any,formData: FormData) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("token")?.value;
  if (!cookie) {
    return null;
  }

  const form = new FormData();
  form.append("avatar", formData.get("avatar")!);
  const res = await fetch(`${BASE_URL}/profile/avatar`, {
    method: "PATCH",
    headers: {
      cookie: `token=${cookie}`,
    },
    body: form,
  });
  const data = await res.json();
  return {
    message: "berhasil mengganti profile",
    success: true,
  };
}

export const profileActionUpdate = async (state:{message:string,success:boolean}|null,formData: FormData) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("token")?.value;
  if (!cookie) {
    return null;
  }

  const tanggal_lahir = formData.get('tanggal_lahir')
  const alamat = formData.get('alamat')
  const bio = formData.get('bio')
  const website = formData.get('website')
  const pendidikan = formData.get('pendidikan')
  const pekerjaan = formData.get('pekerjaan')
  const gender = formData.get('gender')

  const res = await fetch(`${BASE_URL}/profile`, {
    method: "PATCH",
    headers: {
      cookie: `token=${cookie}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ tanggal_lahir, alamat, bio, website, pendidikan, pekerjaan, gender }),
  })
  const data = await res.json()
  return {
    message: "berhasil mengganti profile",
    success: true,
  }
}