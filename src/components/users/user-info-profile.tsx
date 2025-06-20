"use client";

import {
  CalendarDays,
  Edit,
  MapPin,
  MapPinned,
  Map,
  Info,
  MapPinCheckInsideIcon,
  Notebook,
  BookOpenText,
  Cake,
  Loader2,
} from "lucide-react";
import { Button } from "@/common/shadcn/button";
import { Calendar } from "@/common/shadcn/calendar";
import { Card } from "@/common/shadcn/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/common/shadcn/dialog";
import { Input } from "@/common/shadcn/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/shadcn/select";
import { Separator } from "@/common/shadcn/separator";
import React, { useActionState, useRef } from "react";
import { profileActionUpdate } from "@/actions/profile-action";
import { stat } from "fs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  profile: {
    name: string;
    user_name: string;
    avatar_image: string;
    cover_image: string;
    pendidikan: string;
    pekerjaan: string;
    alamat: string;
    bio: string;
    website: string;
    tanggal_lahir: string;
    gender: string;
  };
}

type Wilayah = { id: string; name: string };

export default function UserInfoProfile({ profile }: Props) {
  const [provinsi, setProvinsi] = React.useState<Wilayah[]>([]);
  const [kota, setKota] = React.useState<Wilayah[]>([]);
  const [kecamatan, setKecamatan] = React.useState<Wilayah[]>([]);

  const [selectedProvinsi, setSelectedProvinsi] = React.useState<Wilayah | null>(null);
  const [selectedKota, setSelectedKota] = React.useState<Wilayah | null>(null);
  const [selectedKecamatan, setSelectedKecamatan] = React.useState<Wilayah | null>(null);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [open, setOpen] = React.useState(false);
  const [state, formData,isPending] = useActionState(profileActionUpdate, {
    message: "",
    success: false,
  });
  const router = useRouter();



  const handleInput = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  };


  React.useEffect(() => {
    fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((res) => res.json())
      .then((res) => setProvinsi(res));
  }, []);

  React.useEffect(() => {
    if (selectedProvinsi) {
      fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvinsi.id}.json`
      )
        .then((res) => res.json())
        .then((res) => setKota(res));
    } else {
      setKota([]);
      setSelectedKota(null);
    }
  }, [selectedProvinsi]);

  React.useEffect(() => {
    if (selectedKota) {
      fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedKota.id}.json`
      )
        .then((res) => res.json())
        .then((res) => setKecamatan(res));
    } else {
      setKecamatan([]);
      setSelectedKecamatan(null);
    }
  }, [selectedKota]);

  React.useEffect(() => {
    if (profile?.tanggal_lahir) {
      setDate(new Date(profile.tanggal_lahir));
    }
  }, [profile?.tanggal_lahir]);

  React.useEffect(() => {
    if(state?.message){
      setOpen(false)
      toast.success(state.message)
      router.refresh()
    }
  },[state])
  return (
    <Card className="w-full px-1 py-3">
      <div className="flex justify-between px-3">
        <h1 className="text-xl font-semibold">Info</h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger onClick={() => setOpen(true)}>
            <Edit size={20} />
          </DialogTrigger>
          <DialogContent className="w-full">
            <DialogTitle>Update Profile Info</DialogTitle>
            <Separator className="my-2" />

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <Select
                onValueChange={(val) => {
                  const prov = provinsi.find((p) => p.id === val);
                  setSelectedProvinsi(prov || null);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Provinsi" />
                </SelectTrigger>
                <SelectContent>
                  {provinsi.map((prov) => (
                    <SelectItem key={prov.id} value={prov.id}>
                      {prov.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Select Kota */}
            {selectedProvinsi && (
              <div className="flex items-center gap-2">
                <Map size={16} />
                <Select
                  onValueChange={(val) => {
                    const k = kota.find((item) => item.id === val);
                    setSelectedKota(k || null);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kota" />
                  </SelectTrigger>
                  <SelectContent>
                    {kota.map((k) => (
                      <SelectItem key={k.id} value={k.id}>
                        {k.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Select Kecamatan */}
            {selectedKota && (
              <div className="flex items-center gap-2">
                <MapPinned size={16} />
                <Select
                  onValueChange={(val) => {
                    const k = kecamatan.find((item) => item.id === val);
                    setSelectedKecamatan(k || null);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kecamatan" />
                  </SelectTrigger>
                  <SelectContent>
                    {kecamatan.map((k) => (
                      <SelectItem key={k.id} value={k.id}>
                        {k.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Calendar as Trigger */}
            <div className="mt-4">
              <label className="text-sm font-medium flex items-center gap-2 mb-2">
                <CalendarDays size={16} /> Tanggal Lahir
              </label>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                  >
                    {date ? date.toDateString() : "Pilih tanggal"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-fit p-4">
                  <DialogTitle>Tanggal Lahir</DialogTitle>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    captionLayout="dropdown"
                    className="rounded-md border"
                  />
                </DialogContent>
              </Dialog>
            </div>

            {/* Textarea dan Submit */}
            <form   action={formData} className="mt-4 flex flex-col gap-2">
              <input
                value={
                  selectedProvinsi && selectedKota && selectedKecamatan
                    ? `${selectedProvinsi.name}, ${selectedKota.name}, ${selectedKecamatan.name}`
                    : profile?.alamat ?? ""
                }
                readOnly
                type="text"
                className="hidden"
                name="alamat"
              />
              <textarea
                ref={textAreaRef}
                onInput={handleInput}
                defaultValue={profile?.bio}
                name="bio"
                placeholder="Tulis bio mu..."
                className="w-full border focus:outline-none p-2 rounded-lg"
              ></textarea>
              <input
                type="text"
                value={date?.toISOString().split("T")[0] ?? ""}
                name="tanggal_lahir"
                readOnly
              />
              <Input
                defaultValue={profile?.gender}
                type="text"
                name="gender"
                placeholder="gender"
              />
              <Input
                defaultValue={profile?.pendidikan}
                type="text"
                name="pendidikan"
                placeholder="pendidikan"
              />
              <Input
                defaultValue={profile?.pekerjaan}
                type="text"
                name="pekerjaan"
                placeholder="pekerjaan"
              />
              <Input
                defaultValue={profile?.website}
                type="text"
                name="website"
                placeholder="website"
              />
              <Button
                className="mt-2 w-full"
                type="submit"
                disabled={isPending}
              >
                {isPending && <Loader2 className="mr-2 animate-spin" />}
                Simpan
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Separator className="mt-2" />

      <div className="flex flex-col items-start gap-4 ">
        <div>
          <div className="flex items-center gap-2">
            <MapPinCheckInsideIcon size={20} />
            Alamat
          </div>
          <p className="text-muted-foreground text-sm">
            {profile?.alamat?(
              profile?.alamat.toLowerCase()
            ):(
              "-"
            )}
          </p>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Notebook size={20} />
            Pekerjaan
          </div>
          <p className="text-muted-foreground text-sm">
            {profile?.pekerjaan ?? "-"}
          </p>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <BookOpenText size={20} />
            Pendidikan
          </div>
          <p className="text-muted-foreground text-sm">
            {profile?.pendidikan ?? "-"}
          </p>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Cake size={20} />
            Ulang Tahun
          </div>
          <p className="text-muted-foreground text-sm">
            {profile?.tanggal_lahir ?? "-"}
          </p>
        </div>
      </div>
    </Card>
  );
}
