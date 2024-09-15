"use client";

import { useEffect, useState } from "react";
import {
  addMonths,
  differenceInCalendarMonths,
  differenceInMonths,
  differenceInDays,
} from "date-fns";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/client";

type Expense = {
  id: string;
  payDate: string;
  category: string;
  alerted: boolean;
  amount: number;
  dueDate: string;
  userId: string;
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

export default function Timeline() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [user, loading, error] = useAuthState(auth);
  const [width, setWidth] = useState(20);
  const [startDate, setStartDate] = useState<Date | null>(new Date(2024, 8));
  const [endDate, setEndDate] = useState<Date | null>(new Date(2024, 11, 0));

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
        setExpenses(response);
      } catch (error) {
        console.log(error);
      }
    };

    if (!loading && user) {
      fetchExpenses();
    }
  }, [loading]);

  let months = [];
  let borders = [];
  let index = 1;
  if (startDate && endDate) {
    let tempStart = startDate;
    while (tempStart <= endDate) {
      months.push(
        <div
          key={tempStart.toISOString()}
          className="bg-black"
          style={{ width: `${width}rem` }}
        >
          <p className="py-3 flex justify-center text-lg font-semibold">
            {tempStart.toLocaleString("default", { month: "short" })}
          </p>
        </div>
      );
      borders.push(
        <div
          style={{ left: `${index * width}rem` }}
          className="absolute h-full w-0.5 z-10 bg-white"
        ></div>
      );
      index++;
      tempStart = addMonths(tempStart, 1);
    }
  }

  return (
    <div className="h-60 w-full overflow-auto space-y-3 relative">
      {startDate && endDate ? (
        <>
          <div
            style={{
              width: `${
                (differenceInCalendarMonths(endDate, startDate) + 1) * width
              }rem`,
            }}
            className="flex justify-center sticky top-0 z-30 bg-black"
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
                  className="z-20 rounded-md absolute top-1/2 -translate-y-1/2 flex items-center h-10 bg-white text-black"
                  style={{
                    width: `${
                      getLengthOfExpense(
                        new Date(expense.payDate),
                        new Date(expense.dueDate),
                        startDate,
                        endDate
                      ) * width
                    }rem`,
                    left: `${
                      getLeftOfExpense(new Date(expense.payDate), startDate) *
                      width
                    }rem`,
                  }}
                >
                  <p className="">{expense.category}</p>
                </div>
              </div>
            );
          })}
        </>
      ) : null}
    </div>
  );
}
