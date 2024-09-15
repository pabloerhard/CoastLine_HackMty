import Add from "@/components/add/Add";
import Dashboardico from "@/components/dashboardico/Dashboardico";
import Chatico from "@/components/chatico/Chatico";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import React, { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import Timeline from "@/components/timeline/Timeline";

async function Layout({ children }: { children: ReactNode }) {
  return <div className="flex flex-col min-h-dvh">{children}</div>;
}

export default Layout;
