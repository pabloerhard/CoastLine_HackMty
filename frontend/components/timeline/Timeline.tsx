"use client";

import { useState } from "react";
import {
  addMonths,
  differenceInCalendarMonths,
  differenceInMonths,
  differenceInDays,
} from "date-fns";

type Expense = {
  id: string;
  amount: number;
  date: Date;
  endDate: Date;
  description: string;
  category: string;
};

const getLengthOfExpense = (
  startDate: Date,
  endDate: Date,
  minDate: Date,
  maxDate: Date
) => {
  if (startDate > minDate && endDate < maxDate) {
    return differenceInDays(endDate, startDate) / 30;
  }

  if (startDate < minDate && endDate < maxDate) {
    return differenceInDays(endDate, minDate) / 30;
  }

  if (startDate < minDate && endDate > maxDate) {
    return differenceInDays(maxDate, minDate) / 30;
  }

  if (startDate > minDate && endDate > maxDate) {
    return differenceInDays(maxDate, startDate) / 30;
  }

  return differenceInDays(maxDate, minDate) / 30;
};

const getLeftOfExpense = (startDate: Date, minDate: Date) => {
  if (startDate > minDate) {
    const diff = differenceInDays(startDate, minDate) / 30;
    return diff;
  }

  if (startDate < minDate) {
    return 0;
  }
  const diff = differenceInDays(startDate, minDate) / 30;
  return diff;
};

export default function Timeline({ expenses }: { expenses: Expense[] }) {
  const [width, setWidth] = useState(20);
  const [startDate, setStartDate] = useState<Date | null>(new Date(2024, 8));
  const [endDate, setEndDate] = useState<Date | null>(new Date(2024, 11, 0));
  let months = [];
  if (startDate && endDate) {
    let tempStart = startDate;
    while (tempStart <= endDate) {
      months.push(
        <div key={tempStart.toISOString()} style={{ width: `${width}rem` }}>
          <p className="text-lg font-semibold border-r border-white">
            {tempStart.toLocaleString("default", { month: "short" })}
          </p>
        </div>
      );
      tempStart = addMonths(tempStart, 1);
    }
  }

  return (
    <div className="h-60 w-full overflow-auto p-5 space-y-3">
      {startDate && endDate ? (
        <>
          <div
            style={{
              width: `${
                (differenceInCalendarMonths(endDate, startDate) + 1) * width
              }rem`,
            }}
            className="flex justify-center"
          >
            {months}
          </div>
          {expenses.map((expense) => {
            return (
              <div
                key={expense.id}
                style={{
                  width: `${
                    (differenceInCalendarMonths(endDate, startDate) + 1) * width
                  }rem`,
                }}
                className="relative h-10"
              >
                <div
                  key={expense.id}
                  className="rounded-md absolute flex items-center h-10 bg-white text-black"
                  style={{
                    width: `${
                      getLengthOfExpense(
                        expense.date,
                        expense.endDate,
                        startDate,
                        endDate
                      ) * width
                    }rem`,
                    left: `${
                      getLeftOfExpense(expense.date, startDate) * width
                    }rem`,
                  }}
                >
                  <p className="">{expense.description}</p>
                </div>
              </div>
            );
          })}
        </>
      ) : null}
    </div>
  );
}
