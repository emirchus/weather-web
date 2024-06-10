import React from "react";
import { HourGraph } from "../hour-graph";
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "../ui/card";
import { ForecastCurrentWeather, Forecastday } from "@/interface/forecast-weather.entity";
import Image from "next/image";

interface Props {
  forecast: Forecastday;
  forecastHour: ForecastCurrentWeather;
}

export const ForecastGrid = ({ forecast, forecastHour }: Props) => {
  return (
    <div className="grid h-full w-full gap-2 p-5 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 lg:*:h-[240px]">
      <Card className="h-full w-full shadow-rg md:col-span-2">
        <CardHeader>
          <CardDescription>Estadistica</CardDescription>
        </CardHeader>
        <CardContent className="w-full flex-1 p-0">
          <HourGraph
            data={forecast.hour.map(hour => ({
              name: hour.time!.split(" ")[1],
              indiceUV: hour.uv,
              presion: hour.wind_kph,
              temperatura: hour.temp_c
            }))}
          />
        </CardContent>
      </Card>
      <Card className="h-full w-full shadow-rg">
        <CardHeader>
          <CardDescription>Indice UV</CardDescription>
        </CardHeader>
        <CardContent className="h-full flex-1 p-0 px-5">
          <GaugeChart value={forecast.day.uv} max={12} min={0} />
        </CardContent>
      </Card>
      <Card className="h-full w-full shadow-rg contain-inline-size">
        <CardHeader>
          <CardDescription>Viento</CardDescription>
          <CardTitle className="text-[clamp(1.25rem,3cqi,3rem)]">
            <Image
              alt="Wind icon"
              height={100}
              src={`/weather-icons/wind.svg`}
              width={100}
              placeholder="empty"
              className="mx-auto inline-flex w-[50px]"
            />{" "}
            {forecastHour.wind_kph} km/h
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardTitle>
            <Image
              alt="Wind icon"
              height={100}
              src={`/weather-icons/compass.svg`}
              width={100}
              placeholder="empty"
              className="mx-auto inline-flex w-[50px]"
            />{" "}
            {forecastHour!.wind_degree}° {forecastHour!.wind_dir}
          </CardTitle>
        </CardContent>
      </Card>
      <Card className="h-full w-full shadow-rg">
        <CardHeader>
          <CardDescription>Amancer & Atardecer</CardDescription>
        </CardHeader>
        <CardContent>
          <CardTitle>
            <Image
              alt="Wind icon"
              height={100}
              src={`/weather-icons/sunrise.svg`}
              width={100}
              placeholder="empty"
              className="mx-auto inline-flex w-[50px]"
            />{" "}
            {forecast.astro.sunrise}
          </CardTitle>{" "}
          <CardTitle>
            <Image
              alt="Wind icon"
              height={100}
              src={`/weather-icons/sunset.svg`}
              width={100}
              placeholder="empty"
              className="mx-auto inline-flex w-[50px]"
            />{" "}
            {forecast.astro.sunset}
          </CardTitle>
        </CardContent>
      </Card>
      <Card className="h-full w-full shadow-rg">
        <CardHeader>
          <CardDescription>Precipitaciones</CardDescription>
        </CardHeader>
        <CardContent>
          <CardTitle>
            <Image
              alt="Wind icon"
              height={100}
              src={`/weather-icons/humidity.svg`}
              width={100}
              placeholder="empty"
              className="mx-auto inline-flex w-[50px]"
            />{" "}
            Lluvia - {forecastHour!.chance_of_rain}%
          </CardTitle>
          <CardTitle>
            <Image
              alt="Wind icon"
              height={100}
              src={`/weather-icons/snowflake.svg`}
              width={100}
              placeholder="empty"
              className="mx-auto inline-flex w-[50px]"
            />{" "}
            Nieve - {forecastHour!.chance_of_snow}%
          </CardTitle>
          <CardTitle>
            <Image
              alt="Wind icon"
              height={100}
              src={`/weather-icons/overcast.svg`}
              width={100}
              placeholder="empty"
              className="mx-auto inline-flex w-[50px]"
            />{" "}
            Visibilidad - {forecastHour!.vis_km}km
          </CardTitle>
        </CardContent>
      </Card>
    </div>
  );
};

const GaugeChart = ({ value, min, max }: { value: number; min: number; max: number }) => {
  const newMax = max - min,
    newVal = value - min;
  const percentage = (100 * newVal) / newMax;

  const gaugeSpanAngle = 180;

  const angle = (percentage * gaugeSpanAngle) / 100;

  const getCartesian = (cx: number, cy: number, radius: number, angle: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: Math.round((cx + radius * Math.cos(rad)) * 1000) / 1000,
      y: Math.round((cy + radius * Math.sin(rad)) * 1000) / 1000
    };
  };

  const getDialCoords = (radius: number, startAngle: number, endAngle: number) => {
    const cx = 50,
      cy = 60;
    return {
      end: getCartesian(cx, cy, radius, endAngle),
      start: getCartesian(cx, cy, radius, startAngle)
    };
  };

  const pathString = (radius: number, startAngle: number, endAngle: number, largeArc?: number | undefined) => {
    const coords = getDialCoords(radius, startAngle, endAngle),
      start = coords.start,
      end = coords.end,
      largeArcFlag = typeof largeArc === "undefined" ? 1 : largeArc;

    return ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y].join(" ");
  };

  const getCoordinatesForValue = (val: number) => {
    const valRadians = ((val - min) / (max - min)) * Math.PI;
    const x = 50 + 47 * Math.cos(valRadians - Math.PI);
    const y = 60 + 47 * Math.sin(valRadians - Math.PI);
    return { x, y };
  };

  const numbers = [];
  for (let i = min; i <= max; i += 3) {
    const coords = getCoordinatesForValue(i);
    numbers.push(
      <text key={i} x={coords.x} y={coords.y} textAnchor="middle" fontSize="7" fill="hsl(var(--card-foreground) / .5)">
        {i === 0 ? 1 : i}
      </text>
    );
  }

  return (
    <svg width="100%" height={150} preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" className="mx-auto h-full w-full">
      <path fill="none" stroke="hsl(var(--muted))" strokeWidth="3" d={pathString(40, 180, 0)} strokeLinecap="round" />
      <path
        fill="none"
        stroke="hsl(var(--secondary))"
        strokeWidth="2.5"
        d={pathString(40, 180, angle + 180, angle <= 180 ? 0 : 1)}
        strokeLinecap="round"
      />
      <text x={50} y={50} fontSize={"100%"} textAnchor="middle" alignmentBaseline="middle" dominantBaseline="central" fill="hsl(var(--foreground))">
        {value}
      </text>
      {numbers}
    </svg>
  );
};
