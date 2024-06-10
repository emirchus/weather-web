import dynamic from "next/dynamic";
import React from "react";
import { Loading } from "../loading";
import { getWeatherForecast } from "@/lib/api";

interface Props {
  location: string;
  format: "c" | "f";
  period: "today" | "week";
  date?: string;
}

const DynamicTodayWeather = dynamic(() => import("@/components/today-weather").then(mod => mod.TodayWeather), {
  loading: () => (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Loading />
    </div>
  )
});

const DynamicWeekWeather = dynamic(() => import("@/components/week-weather").then(mod => mod.WeekWeather), {
  loading: () => (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Loading />
    </div>
  )
});

export const Dashboard = async ({ format, location, period, date }: Props) => {
  const { forecast } = await getWeatherForecast(location, 7);
  return {
    today: <DynamicTodayWeather forecast={forecast} format={format} />,
    week: <DynamicWeekWeather forecast={forecast} format={format} date={date} />
  }[period || "today"];
};
