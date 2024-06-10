import { ForecastWeather } from "@/interface/forecast-weather.entity";
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../ui/carousel";
import dayjs from "dayjs";
import { ForecastGrid } from "../forecast-grid";
import { WeatherCard } from "../weather-card";
interface Props {
  forecast: ForecastWeather;
  format: "c" | "f";
  date?: string;
}
export const WeekWeather = ({ forecast, format, date }: Props) => {
  const selectedForecast = forecast.forecastday.find(forecast => {
    return forecast.date && forecast.date === (date ?? dayjs().format("YYYY-MM-DD"));
  })!;
  return (
    <>
      <Carousel className="group relative md:w-full">
        <CarouselContent className="py-2 md:first:ml-4 md:last:mr-10">
          {forecast.forecastday.map(({ day, date_epoch, date }) => {
            return (
              <CarouselItem key={date_epoch} className="basis-1/2 md:basis-1/4">
                <WeatherCard
                  isActive={date === selectedForecast.date}
                  conditionIcon={day.condition.icon.split("/").pop()?.split(".")[0] || "113"}
                  conditionText={day.condition.text}
                  date={date}
                  dateText={Intl.DateTimeFormat("es-ES", {
                    weekday: "long",
                    day: "numeric",
                    month: "long"
                  }).format(dayjs(date).toDate())}
                  mainTemp={format === "c" ? day.avgtemp_c : day.avgtemp_f}
                  subTemp={format === "c" ? day.mintemp_c : day.mintemp_f}
                  format={format}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="invisible left-2 group-hover:visible" />
        <CarouselNext className="invisible right-2 group-hover:visible" />
      </Carousel>
      {
        // TODO!: Usar fecha seleccioanda para mostrar el mejor día
      }
      <h3 className="ml-5 mt-5 text-2xl text-[clamp(1.25rem,1.5cqi,3rem)] font-bold">
        Lo mejor del{" "}
        {Intl.DateTimeFormat("es-ES", {
          weekday: "long",
          day: "numeric",
          month: "long"
        }).format(dayjs(date).toDate())}
      </h3>
      <ForecastGrid forecast={selectedForecast} forecastHour={selectedForecast.hour[12]} />
    </>
  );
};
