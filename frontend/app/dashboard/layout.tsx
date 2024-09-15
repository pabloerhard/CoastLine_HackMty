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

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <header className="bg-[#27272b] text-white p-2">
        <nav className="flex items-center justify-end gap-2">
          <p>Hola, Samuel</p>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </nav>
      </header>

      {/* Main Content (children) */}
      <main className="flex-grow p-4">{children}</main>

      {/* Bottom Navbar */}
      <footer className="bg-[#27272b] text-white p-4">
        <nav className="flex justify-between items-center">
          {/* Dashboard button */}
          <Link href="/">
            <Dashboardico size={35} />
          </Link>

          {/* Add expense/income */}
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost">
                <Add size={35} />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm bg-black">
                <DrawerHeader>
                  <DrawerTitle>Add Expense</DrawerTitle>
                  <DrawerDescription>
                    Add a new expense to your list.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="flex justify-center p-4">
                  <Input
                    type="number"
                    placeholder="Expense"
                    className="w-[75%]"
                  />
                </div>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>

          {/* Chatbot Button */}
          <Chatico size={35} />
        </nav>
      </footer>
    </div>
  );
}

export default Layout;
