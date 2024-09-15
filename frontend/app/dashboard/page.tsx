"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const expenseData = [
  { month: "Casa", desktop: 305, mobile: 200 },
  { month: "Escuela", desktop: 237, mobile: 120 },
  { month: "Carro", desktop: 186, mobile: 80 },
];

const incomeData = [
  { month: "Trabajo", desktop: 305, mobile: 200 },
  { month: "Uber", desktop: 290, mobile: 80 },
  { month: "Niñero", desktop: 100, mobile: 120 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export default function Dashboard() {
  const [isExpense, setIsExpense] = useState(true);

  const toggleChart = () => {
    setIsExpense((prev) => !prev);
  };

  return (
    <div>
      {/* Financial Status */}
      <section className="flex flex-row justify-between gap-2">
        <div className="w-[100%] flex flex-col">
          <Button
            className={`flex ${isExpense ? "bg-[#27272b]" : "bg-black"}`}
            onClick={toggleChart}
          >
            <h1 className="text-xl text-center font-bold">Expenses</h1>
          </Button>
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="text-red-200">$4,857.00</CardTitle>
              <CardDescription>MXN</CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="w-[100%] flex flex-col">
          <Button
            className={`flex ${!isExpense ? "bg-[#27272b]" : "bg-black"}`}
            onClick={toggleChart}
          >
            <h1 className="text-xl text-center font-bold">Income</h1>
          </Button>
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="text-green-200">$6,785.00</CardTitle>
              <CardDescription>MXN</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Note on current situation */}
      <h2 className="flex justify-center p-4 text-white font-bold text-2xl">
        You are covered.
      </h2>

      {/* Chart Section */}
      <section>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={isExpense ? expenseData : incomeData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="desktop" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="desktop" layout="vertical" fill="#FFF" radius={4}>
              <LabelList
                dataKey="month"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="desktop"
                position="right"
                offset={8}
                className="fill-white"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </section>
    </div>
  );
}
