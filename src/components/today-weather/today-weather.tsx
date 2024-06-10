import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { ForecastCurrentWeather, ForecastWeather } from "@/interface/forecast-weather.entity";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { compareWeatherScores } from "@/lib/weather-score";
import { ForecastGrid } from "../forecast-grid";

interface Props {
  forecast: ForecastWeather;
  format: "c" | "f";
}

export const TodayWeather = ({ format, forecast }: Props) => {
  let bestHour: ForecastCurrentWeather;

  forecast.forecastday[0].hour.forEach(hour => {
    bestHour ??= hour;

    bestHour = compareWeatherScores(bestHour, hour);
  });

  return (
    <>
      <Carousel className="group relative md:w-full">
        <CarouselContent className="md:first:ml-4 md:last:mr-10">
          {forecast.forecastday[0].hour.map(hour => {
            return (
              <CarouselItem key={hour.time} className="basis-1/2 md:basis-1/4">
                <Card key={hour.time_epoch} className="h-full w-full">
                  <CardHeader className="relative">
                    <Image
                      alt="Weather icon"
                      height={100}
                      src={`/weather-icons/${hour.is_day === 1 ? "day" : "night"}/${hour.condition.icon.split("/").pop()?.split(".")[0]}.svg`}
                      width={100}
                      placeholder="empty"
                      className="mx-auto inline-flex w-[50px]"
                    />
                    <CardDescription className="text-center">{hour.condition.text}</CardDescription>
                    <CardDescription className="text-center">{hour.time?.split(" ")[1]}</CardDescription>
                  </CardHeader>
                  <CardContent className="">
                    <div className="flex flex-row items-center justify-evenly">
                      <div className="flex flex-row items-start justify-center">
                        <CardTitle className="text-center">{format === "c" ? hour.temp_c : hour.temp_f}</CardTitle>
                        <span className="-leading-3 text-sm">{format === "c" ? "°C" : "°F"}</span>
                      </div>
                      <div className="flex flex-row items-start justify-center text-muted-foreground">
                        <p className="text-center">{hour.humidity}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="invisible left-2 group-hover:visible" />
        <CarouselNext className="invisible right-2 group-hover:visible" />
      </Carousel>
      <h3 className="ml-5 mt-5 text-2xl text-[clamp(1.25rem,1.5cqi,3rem)] font-bold">
        Lo más destacado de hoy:{" "}
        <span className="font-medium underline">
          {Intl.DateTimeFormat("es-Es", {
            hour: "2-digit",
            minute: "2-digit"
          }).format(new Date(bestHour!.time!))}
        </span>
      </h3>
      <ForecastGrid forecast={forecast.forecastday[0]} forecastHour={bestHour!} />
    </>
  );
};
