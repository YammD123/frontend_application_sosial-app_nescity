"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  HomeIcon,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  UserRound,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/navigations/nav-main";
import { NavProjects } from "@/components/navigations/nav-projects";
import { NavUser } from "@/components/navigations/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/common/shadcn/sidebar";
import { Notification } from "./nav-notification";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Beranda",
      icon: HomeIcon,
      isActive: true,
      items: [
        {
          title: "Home",
          url: "/content/beranda/home",
        },
        {
          title: "Profile",
          url: "/content/beranda/profile",
        },
      ],
    },
    {
      title: "Kait",
      icon: Users,
      items: [
        {
          title: "Explore",
          url: "/content/kait/explore",
        },
        {
          title: "Friend-Requests",
          url: "/content/kait/requests",
        },
        {
          title: "Followers",
          url: "/user/follower",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function NavAppSidebar({
  user,
  ...props
}: { user: { email: string } } & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Notification  />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
