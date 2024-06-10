import { CurrentWeather } from "@/interface/current-weather.entity";
import Image from "next/image";
import React from "react";
import { Separator } from "../ui/separator";
import { getCurrentWeather } from "@/lib/api";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { sleep } from "@/lib/config";
import dayjs from "dayjs";
interface Props {
  location: string;
  format: "c" | "f";
}

export const Weather = async ({ location: locationSearch, format }: Props) => {
  const { current, location }: CurrentWeather = await getCurrentWeather(locationSearch);

  await sleep(1000);

  return (
    <div className="mt-8 flex h-full w-full flex-col items-start justify-start contain-inline-size">
      <div className="relative flex w-full items-start justify-start">
        <Image
          alt="Weather icon"
          height={200}
          src={`/weather-icons/${current.is_day === 1 ? "day" : "night"}/${current.condition.icon.split("/").pop()?.split(".")[0]}.svg`}
          width={200}
          placeholder="empty"
          className="absolute left-1/2 top-1/2 -z-10 mx-auto inline-flex w-[70%] -translate-x-1/2 -translate-y-1/2 transform blur-[10px]"
        />
        <Image
          alt="Weather icon"
          height={200}
          src={`/weather-icons/${current.is_day === 1 ? "day" : "night"}/${current.condition.icon.split("/").pop()?.split(".")[0]}.svg`}
          width={200}
          placeholder="empty"
          className="mx-auto inline-flex w-[70%]"
        />
      </div>
      <div className="flex w-full flex-row items-start justify-start font-thin">
        <h3 className="text-left text-[max(2em,_1.25em_+_5cqi)]">{format === "c" ? current.feelslike_c : current.feelslike_f}</h3>
        <span className="mt-[1cqi] text-[max(0.8em,_0.25em_+_2cqi)]">{format === "c" ? "℃" : "℉"}</span>
      </div>
      <div>
        <h4 className="capitalize">
          {Intl.DateTimeFormat("es-ES", {
            weekday: "long",
            day: "numeric",
            month: "long"
          }).format(dayjs(location.localtime).toDate())}
          {","}
          <span className="ml-2 font-thin">
            {Intl.DateTimeFormat("es-ES", {
              hour: "2-digit",
              minute: "2-digit"
            }).format(dayjs(location.localtime).toDate())}
          </span>
        </h4>
      </div>
      <Separator className="my-4" />
      <div className="mb-4 flex flex-row items-center">
        <Image
          alt="now"
          height={200}
          src={`/weather-icons/${current.is_day === 1 ? "day" : "night"}.svg`}
          width={200}
          className="mx-auto inline-flex w-[50px]"
        />
        <h4 className="capitalize">{current.condition.text}</h4>
      </div>
      <div className="mb-4 flex flex-row items-center">
        <Image
          alt="Rain icon"
          height={200}
          src={`/weather-icons/${current.cloud > 0 ? "rain" : "cloudy"}.svg`}
          width={200}
          className="mx-auto inline-flex w-[50px]"
        />
        <h4 className="capitalize">Lluvia - {current.cloud}%</h4>
      </div>
      <div className="mb-4 flex flex-row items-center">
        <Image alt="Humidity icon" height={200} src={`/weather-icons/humidity.svg`} width={200} className="mx-auto inline-flex w-[50px]" />
        <h4 className="capitalize">Humedad - {current.humidity}%</h4>
      </div>
      <div className="mb-4 flex flex-row items-center">
        <Image alt="Vi icon" height={200} src={`/weather-icons/windsock.svg`} width={200} className="mx-auto inline-flex w-[50px]" />
        <h4 className="capitalize">Viento - {current.wind_kph}km/h</h4>
      </div>
      <div className="mb-4 flex flex-row items-center">
        <Image alt="location icon" height={200} src={`/weather-icons/compass.svg`} width={200} className="mx-auto inline-flex w-[50px]" />
        <a
          href={`https://www.google.com/maps/search/${location.name},${location.region}`}
          target="_blank"
          referrerPolicy="no-referrer"
          className="capitalize hover:underline"
        >
          {location.name}, {location.region} <ExternalLinkIcon className="inline-block h-4 w-4" />
        </a>
      </div>
    </div>
  );
};
