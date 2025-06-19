"use client";

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/common/shadcn/sidebar";
import { Input } from "@/common/shadcn/input";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import UserListSidebar from "./user-list-sidebar";
import { followLoaderGetFollowers } from "@/loaders/follow-loader";

export function UserSidebar() {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [followers, setFollowers] = useState<{
    total_followers: number;
    total_data: number;
    page: number;
    data: {
      id: string;
      follower: {
        id: string;
        profile: {
          name: string;
          avatar_image: string;
          user_name: string;
        };
      };
    }[];
  } | null>(null);
  React.useEffect(() => {
    const getData = async () => {
      const newData = await followLoaderGetFollowers();
      setFollowers(newData);
    };
    getData();
  }, []);
  const filteredData = followers?.data.filter((item) =>item.follower.profile.name?.toLowerCase().includes(search.trim().toLowerCase())) || [];
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Cari di sini</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="relative">
              <Input
                className="w-full focus-visible:ring-0"
                placeholder="Search..."
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute right-2 top-1/2 -translate-y-1/2" />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Follower List</SidebarGroupLabel>
          <SidebarGroupContent>
            {followers && (
              <UserListSidebar
                followers={{
                  data: filteredData,
                }}
              />
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
