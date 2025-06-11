"use client";

import { CalendarDays, Edit, MapPin, MapPinned, Map } from "lucide-react";
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
import React, { useRef } from "react";

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
  };
}

type Wilayah = { id: string; name: string };

export default function InfoProfile({ profile }: Props) {
  const [provinsi, setProvinsi] = React.useState<Wilayah[]>([]);
  const [kota, setKota] = React.useState<Wilayah[]>([]);
  const [kecamatan, setKecamatan] = React.useState<Wilayah[]>([]);

  const [selectedProvinsi, setSelectedProvinsi] =
    React.useState<Wilayah | null>(null);
  const [selectedKota, setSelectedKota] = React.useState<Wilayah | null>(null);
  const [selectedKecamatan, setSelectedKecamatan] =
    React.useState<Wilayah | null>(null);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [date, setDate] = React.useState<Date | undefined>(new Date());

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

  return (
    <Card className="w-full px-1 py-3">
      <div className="flex justify-between px-3">
        <h1 className="text-xl font-semibold">Info</h1>
        <Dialog>
          <DialogTrigger>
            <Edit size={20} />
          </DialogTrigger>
          <DialogContent className="w-full">
            <DialogTitle>Update Profile Info</DialogTitle>
            <Separator className="my-2" />

            {/* Select Provinsi */}
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
            <form className="mt-4 flex flex-col gap-2">
              <input
                value={`${selectedProvinsi?.name}, ${selectedKota?.name}, ${selectedKecamatan?.name}`}
                readOnly
                type="text"
                className="hidden"
              />
              <textarea
                ref={textAreaRef}
                onInput={handleInput}
                placeholder="Tulis bio mu..."
                className="w-full border focus:outline-none p-2 rounded-lg"
              ></textarea>
              <input type="text" value={date?.toDateString() ?? ""} readOnly />
              <Input type="text" name="" placeholder="gender" readOnly />
              <Input type="text" name="" placeholder="pendidikan" readOnly />
              <Input type="text" name="" placeholder="pekerjaan" readOnly />
              <Button className="mt-2 w-full" type="submit">
                Simpan
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Separator className="mt-2" />
    </Card>
  );
}
