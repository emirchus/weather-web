"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "../ui/card";
import Image from "next/image";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

interface Props {
  conditionIcon: string;
  conditionText: string;
  dateText: string;
  date: string;
  mainTemp: number;
  subTemp: number;
  format: "c" | "f";
  isActive: boolean;
}

export const WeatherCard = ({ conditionIcon, conditionText, date, dateText, mainTemp, subTemp, format, isActive }: Props) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleNavigate = useCallback(() => {
    const searchParams = new URLSearchParams(params);
    searchParams.set("date", date);

    router.replace(`/?${searchParams.toString()}`);
  }, [date, params, router]);

  return (
    <Card
      className={cn("h-full w-full cursor-pointer ring-primary/20 hover:ring transition-all duration-300 ease-in-out", {
        "ring ring-primary": isActive
      })}
      onClick={handleNavigate}
    >
      <CardHeader className="relative">
        <Image
          alt="Weather icon"
          height={100}
          src={`/weather-icons/day/${conditionIcon}.svg`}
          width={100}
          placeholder="empty"
          className="mx-auto inline-flex w-[50px]"
        />
        <CardDescription className="text-center">{conditionText}</CardDescription>
        <CardDescription className="text-center capitalize">{dateText}</CardDescription>
      </CardHeader>
      <CardContent className="">
        <div className="flex flex-row items-center justify-evenly">
          <div className="flex flex-row items-start justify-center">
            <CardTitle className="text-center">{mainTemp}</CardTitle>
            <span className="-leading-3 text-sm">{format === "c" ? "°C" : "°F"}</span>
          </div>
          <div className="flex flex-row items-start justify-center text-muted-foreground">
            <CardTitle className="text-center">{subTemp}</CardTitle>
            <span className="-leading-3 text-sm">{format === "c" ? "°C" : "°F"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
