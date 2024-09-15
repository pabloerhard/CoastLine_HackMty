"use client";
import Add from "@/components/add/Add";
import Dashboardico from "@/components/dashboardico/Dashboardico";
import Chatico from "@/components/chatico/Chatico";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import React, { ChangeEvent, ReactNode, useState } from "react";
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

interface Message {
  sender: "user" | "ai";
  text: string;
}


function Layout({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState<string>("");

  // Handle message submission
  const handleSubmit = async () => {
    if (!userMessage.trim()) return;

    // Add user's message to the chat
    const newMessages: Message[] = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);
    setUserMessage("");

    try {
      // Send user's message to the backend API
      const response = await fetch("http://localhost:3000/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();

      // Add AI's response to the chat
      setMessages((prevMessages) => [...prevMessages, { sender: "ai", text: data.response }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prevMessages) => [...prevMessages, { sender: "ai", text: "Error: Unable to get response from AI" }]);
    }
    // // Simulate AI response (replace with your backend call)
    // setTimeout(() => {
    //   const aiResponse = "I'm here to help you with your finances!";
    //   setMessages((prevMessages) => [...prevMessages, { sender: "ai", text: aiResponse }]);
    // }, 1000); // Simulate a 1-second delay for AI response
  };

  // Handle user input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserMessage(e.target.value);
  };

  // Handle Enter key press to submit message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
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
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost">
                <Chatico size={35} />
              </Button>
            </DrawerTrigger>

            <DrawerContent>
              <div className="mx-auto w-full max-w-sm bg-black">
                <DrawerHeader>
                  <DrawerTitle>AI Financial Advisor</DrawerTitle>
                  <DrawerDescription>Chat with your AI Financial Advisor.</DrawerDescription>
                </DrawerHeader>

                <div className="flex flex-col justify-center p-4 h-[400px] overflow-y-auto bg-gray-900 text-white">
                  {/* Chat Messages */}
                  {messages.map((message, index) => (
                    <div key={index} className={`mb-2 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                      <span className={`p-2 rounded-md inline-block ${message.sender === "user" ? "bg-blue-500" : "bg-gray-700"}`}>
                        {message.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="flex justify-center p-4">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    className="w-[75%]"
                    value={userMessage}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                  />
                  <Button onClick={handleSubmit} className="ml-2">
                    Send
                  </Button>
                </div>

                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </nav>
      </footer>
    </div>
  );
}

export default Layout;
