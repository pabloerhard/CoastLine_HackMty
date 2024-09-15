"use client";

import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState, ChangeEvent } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/client";
import { cn } from "@/lib/utils";
import { BotMessageSquare, Copy, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface Message {
  sender: "user" | "ai";
  text: string;
}

const chartConfig = {
  expenses: {
    label: "Expenses",
  },
  Fuel: {
    label: "Fuel",
    color: "hsl(var(--chart-1))",
  },
  Gasoline: {
    label: "Gasoline",
    color: "hsl(var(--chart-2))",
  },
  Electricity: {
    label: "Electricity",
    color: "hsl(var(--chart-3))",
  },
  "Natural Gas": {
    label: "Natural Gas",
    color: "hsl(var(--chart-4))",
  },
  "Public Transportation": {
    label: "Public Transportation",
    color: "hsl(var(--chart-5))",
  },
  Flights: {
    label: "Fuel",
    color: "hsl(var(--chart-6))",
  },
  "Groceries (Meat/Dairy)": {
    label: "Groceries (Meat/Dairy)",
    color: "hsl(var(--chart-7))",
  },
  "Groceries (Plant-based)": {
    label: "Groceries (Plant-based)",
    color: "hsl(var(--chart-8))",
  },
  Clothing: {
    label: "Clothing",
    color: "hsl(var(--chart-9))",
  },
  Electronics: {
    label: "Electronics",
    color: "hsl(var(--chart-10))",
  },
  Appliances: {
    label: "Appliances",
    color: "hsl(var(--chart-11))",
  },
  Furniture: {
    label: "Furniture",
    color: "hsl(var(--chart-12))",
  },
  "Home Repairs": {
    label: "Home Repairs",
    color: "hsl(var(--chart-13))",
  },
  "Construction Materials": {
    label: "Construction Materials",
    color: "hsl(var(--chart-14))",
  },
  "Waste Disposal": {
    label: "Waste Disposal",
    color: "hsl(var(--chart-15))",
  },
  "Recycling Services": {
    label: "Recycling Services",
    color: "hsl(var(--chart-16))",
  },
  "Water Usage": {
    label: "Water Usage",
    color: "hsl(var(--chart-17))",
  },
  "Rent/Mortgage": {
    label: "Rent/Mortgage",
    color: "hsl(var(--chart-18))",
  },
  "Dining Out (Meat-heavy meals)": {
    label: "Dining Out (Meat-heavy meals)",
    color: "hsl(var(--chart-19))",
  },
  "Dining Out (Plant-based meals)": {
    label: "Dining Out (Plant-based meals)",
    color: "hsl(var(--chart-20))",
  },
  "Entertainment (Movies/Streaming)": {
    label: "Entertainment (Movies/Streaming)",
    color: "hsl(var(--chart-22))",
  },
  "Hotel Stays/Travel": {
    label: "Hotel Stays/Travel",
    color: "hsl(var(--chart-23))",
  },
  Entertainment: {
    label: "Entertainment",
    color: "hsl(var(--chart-24))",
  },
  "Loan Payments": {
    label: "Loan Payments",
    color: "hsl(var(--chart-25))",
  },
} satisfies ChartConfig;

export default function Dashboard() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [expenses, setExpenses] = useState<
    { id: string; category: string; date: string; amount: number }[]
  >([]);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [totalToShow, setTotalToShow] = useState(0);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [graphData, setGraphData] = useState<null | {
    [key: string]: {
      amount: number;
      percent: number;
      label: string;
      category: string;
    };
  }>(null);
  const [section, setSection] = useState("expenses");
  const [addExpense, setAddExpense] = useState({ category: "", amount: 0 });
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState<string>("");

  const handleSubmit = async () => {
    if (!userMessage.trim()) return;

    // Add user's message to the chat
    const newMessages: Message[] = [
      ...messages,
      { sender: "user", text: userMessage },
    ];
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
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: data.response },
      ]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: "Error: Unable to get response from AI" },
      ]);
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

  useEffect(() => {
    const fetchExpenses = async () => {
      console.log(user?.uid);
      if (!user) return;
      try {
        const response = await fetch(
          "http://10.22.157.83:3000/expenses/listActiveExpenses",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2",
              startDate: "2024-09-01",
              endDate: "2024-09-30",
            }),
          }
        ).then((res) => res.json());
        let total = 0;
        const graphData: {
          [key: string]: {
            amount: number;
            percent: number;
            label: string;
            category: string;
          };
        } = {};
        response.forEach((expense: { category: string; amount: number }) => {
          console.log(expense);
          total = total + expense.amount;
          if (graphData[expense.category]) {
            graphData[expense.category] = {
              amount: graphData[expense.category].amount + expense.amount,
              percent: 0,
              label: expense.category,
              category: expense.category,
            };
          } else {
            graphData[expense.category] = {
              amount: expense.amount,
              percent: 0,
              label: expense.category,
              category: expense.category,
            };
          }
        });
        for (const [key, value] of Object.entries(graphData)) {
          const percent = (value.amount / total) * 100;
          value.percent = Number((Math.round(percent * 100) / 100).toFixed(1));
        }
        setGraphData(graphData);
        setExpenseTotal(total);
        setTotalToShow(total);
        setExpenses(response);
      } catch (error) {
        console.log(error);
      }
    };

    if (!loading && user) {
      fetchExpenses();
    }
  }, [loading]);

  const handleAddExpense = async (expense: {
    category: string;
    amount: number;
  }) => {
    try {
      const response = await fetch("http://10.22.157.83:3000/expenses/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2",
          category: expense.category,
          amount: expense.amount,
          payDate: new Date().toISOString(),
          dueDate: new Date().toISOString(),
        }),
      }).then((res) => res.text());

      const newExpenses = [
        ...expenses,
        {
          id: response,
          category: expense.category,
          date: new Date().toISOString(),
          amount: expense.amount,
        },
      ];
      setExpenses(newExpenses);
      setExpenseTotal((prev) => prev + expense.amount);
      setTotalToShow(expenseTotal + expense.amount);
      let total = 0;
      const graphData: {
        [key: string]: {
          amount: number;
          percent: number;
          label: string;
          category: string;
        };
      } = {};
      newExpenses.forEach((expense: { category: string; amount: number }) => {
        total = total + expense.amount;
        if (graphData[expense.category]) {
          graphData[expense.category] = {
            amount: graphData[expense.category].amount + expense.amount,
            percent: 0,
            label: expense.category,
            category: expense.category,
          };
        } else {
          graphData[expense.category] = {
            amount: expense.amount,
            percent: 0,
            label: expense.category,
            category: expense.category,
          };
        }
      });
      for (const [key, value] of Object.entries(graphData)) {
        const percent = (value.amount / total) * 100;
        value.percent = Number((Math.round(percent * 100) / 100).toFixed(1));
      }
      setGraphData(graphData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="py-5 px-3.5 flex justify-center">
      <Drawer>
        <div className="flex flex-col items-center justify-center w-full gap-4 lg:w-[1000px] relative">
          <header className="w-full flex flex-col items-center justify-center gap-3">
            <div className="flex flex-col items-center justify-center">
              <h3 className="font-bold text-xl leading-none">${totalToShow}</h3>
              <p className="text-sm text-gray-500">Total</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <div className="inline-flex bg-gray-200 rounded-full">
                <button
                  className={cn(
                    "px-6 py-1.5 rounded-full",
                    section === "expenses" ? "bg-black text-white" : ""
                  )}
                  onClick={() => setSection("expenses")}
                >
                  Expenses
                </button>
                <button
                  className={cn(
                    "px-6 py-1.5 rounded-full",
                    section === "income" ? "bg-black text-white" : ""
                  )}
                  onClick={() => setSection("income")}
                >
                  Income
                </button>
              </div>
              <h2 className="font-semibold px-6 py-1.5 bg-gray-200 rounded-full">
                Sept
              </h2>
            </div>
          </header>
          <section className="w-full flex items-center justify-center">
            {graphData && (
              <ChartContainer
                config={chartConfig}
                className="w-full lg:w-[1200px]"
              >
                <BarChart accessibilityLayer data={Object.values(graphData)}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    className="text-xs"
                    tickFormatter={(value) => {
                      return value;
                    }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        className="bg-white rounded-lg"
                        hideLabel
                      />
                    }
                  />
                  <Bar
                    dataKey="percent"
                    strokeWidth={2}
                    radius={8}
                    activeIndex={2}
                    activeBar={({ ...props }) => {
                      return (
                        <Rectangle
                          {...props}
                          fillOpacity={0.8}
                          stroke={props.payload.fill}
                          strokeDasharray={4}
                          strokeDashoffset={4}
                        />
                      );
                    }}
                  />
                </BarChart>
              </ChartContainer>
            )}
          </section>
          <section className="w-full">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Expenses</h3>
              {/* <button className="text-sm text-gray-500">View all</button> */}
            </div>
            <div className="flex flex-col gap-3">
              {graphData &&
                Object.values(graphData).map((expense) => {
                  return (
                    <div
                      key={expense.category}
                      className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`bg-gray-500 h-10 w-10 rounded-full`}
                        ></div>
                        <div>
                          <p className="font-semibold">{expense.category}</p>
                          <p className="text-sm text-gray-500">
                            {expense.category}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold">${expense.amount}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>
          <div className="fixed bottom-0 right-0 mb-4 mr-4">
            {!openMenu ? (
              <button
                onClick={() => setOpenMenu(true)}
                className="bg-gray-200 rounded-full z-40 p-2.5 text-black"
              >
                <Plus color="black" size={30} />
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <Dialog>
                  <DialogTrigger className="bg-gray-200 rounded-full z-40 p-2.5 text-black">
                    <Plus color="black" size={30} />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-white">
                    <DialogHeader>
                      <DialogTitle>Add an expense</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                          Expense
                        </Label>
                        <Input
                          id="link"
                          type="number"
                          defaultValue="https://ui.shadcn.com/docs/installation"
                          placeholder="Amount"
                          value={addExpense.amount}
                          onChange={(e) => {
                            setAddExpense((prev) => ({
                              ...prev,
                              amount: Number(e.target.value),
                            }));
                          }}
                        />
                        <Label htmlFor="link" className="sr-only">
                          Category
                        </Label>
                        <Input
                          id="link"
                          type="text"
                          defaultValue="https://ui.shadcn.com/docs/installation"
                          placeholder="Category"
                          value={addExpense.category}
                          onChange={(e) => {
                            setAddExpense((prev) => ({
                              ...prev,
                              category: e.target.value,
                            }));
                          }}
                        />
                      </div>
                    </div>
                    <DialogFooter className="sm:justify-start">
                      <Button
                        onClick={() => handleAddExpense(addExpense)}
                        type="button"
                      >
                        Add Expense
                      </Button>
                      <DialogClose asChild>
                        <Button
                          onClick={() => setOpenAddExpenseModal(false)}
                          type="button"
                          variant="secondary"
                        >
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <DrawerTrigger asChild onClick={() => setOpenMenu(false)}>
                  <button className="bg-gray-200 rounded-full z-40 p-2.5 text-black">
                    <BotMessageSquare color="black" size={30} />
                  </button>
                </DrawerTrigger>
                <button
                  onClick={() => setOpenMenu(false)}
                  className="bg-gray-200 rounded-full z-40 p-2.5 text-black"
                >
                  <X color="black" size={30} />
                </button>
              </div>
            )}
          </div>
        </div>
        <DrawerContent className="bg-white">
          <div className="mx-auto w-full max-w-sm bg-white">
            <DrawerHeader>
              <DrawerTitle>AI Financial Advisor</DrawerTitle>
              <DrawerDescription>
                Chat with your AI Financial Advisor.
              </DrawerDescription>
            </DrawerHeader>

            <div className="flex flex-col justify-center p-4 h-[400px] overflow-y-auto bg-gray-200 text-black">
              {/* Chat Messages */}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    message.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <span
                    className={`p-2 rounded-md inline-block text-white ${
                      message.sender === "user" ? "bg-blue-500" : "bg-gray-700"
                    }`}
                  >
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
    </div>
  );
}
