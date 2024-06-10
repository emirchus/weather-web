"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";

interface Props {
  period: "today" | "week";
  isActive: boolean;
}

export const PeriodTab = ({ period, isActive }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const onChangePeriod = (period: "today" | "week") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("period", period);
    if(period === "today") {
      params.delete("date");
    }else{
      const now = dayjs().format("YYYY-MM-DD");
      params.set("date", now);
    }
    router.replace(`/?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <button
      data-state={isActive ? "active" : "inactive"}
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  data-[state=active]:text-foreground relative"
      onClick={() => onChangePeriod(period)}
    >
      {isActive && (
        <motion.span
          layoutId="bubble"
          className="absolute inset-0 z-0 bg-primary/20 rounded-md shadow"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className="relative">{period === "today" ? "Hoy" : "Semana"}</span>
    </button>
  );
};
