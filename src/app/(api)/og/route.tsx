/* eslint-disable @next/next/no-img-element */
import { CurrentWeather } from "@/interface/current-weather.entity";
import { getCurrentWeather } from "@/lib/api";
import { vercel_url } from "@/lib/config";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { nextUrl } = request;
  const searchLocation = nextUrl.searchParams.get("location")!;

  const fontData = await fetch(`${vercel_url}/Inter-SemiBold.ttf`).then((res) =>
    res.arrayBuffer()
  );

  const { current, location }: CurrentWeather =
    await getCurrentWeather(searchLocation);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "column",
          flexWrap: "nowrap",
          backgroundColor: "white",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          padding: "0 20%",
          // fontFamily: '"Satoshi"',
        }}
      >
        <h2 tw="mb-4 font-bold" style={{
          fontSize: "2rem",
          paddingBottom: "4rem",
          paddingTop: "4rem",
        }}>Weather App</h2>
        <div
          tw="flex flex-row items-center justify-between w-full"
          style={{
            display: "flex",
          }}
        >
          <div
            tw="flex flex-col justify-start items-start"
            style={{
              display: "flex",
            }}
          >
            <img
              alt="Weather icon"
              src={`${vercel_url}/weather-icons/${current.is_day === 1 ? "day" : "night"}/${current.condition.icon.split("/").pop()?.split(".")[0]}.svg`}
              tw="w-[200px] h-[200px]"
            />
            <div
              tw="flex flex-row items-start justify-start font-thin"
              style={{
                display: "flex",
              }}
            >
              <h3 tw="text-2xl text-left">{current.feelslike_c}</h3>
              <span tw="text-sm mt-[20px]">C</span>
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              <h4 tw="capitalize">
                {Intl.DateTimeFormat("es-ES", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                }).format(new Date())}
                {","}
                <span tw="ml-2 font-thin">
                  {Intl.DateTimeFormat("es-ES", {
                    hour: "numeric",
                    minute: "numeric",
                  }).format(new Date())}
                </span>
              </h4>
            </div>
          </div>
          <div
            tw="flex flex-col justify-start items-end"
            style={{
              display: "flex",
            }}
          >
            <div
              tw="flex flex-row items-center"
              style={{
                display: "flex",
              }}
            >
              <img
                alt="now"
                src={`${vercel_url}/weather-icons/${current.is_day === 1 ? "day" : "night"}.svg`}
                tw=" mx-auto w-[50px]"
              />
              <h4 tw="capitalize">{current.condition.text}</h4>
            </div>
            <div
              tw="flex flex-row items-center"
              style={{
                display: "flex",
              }}
            >
              <img
                alt="Rain icon"
                src={`${vercel_url}/weather-icons/${current.cloud > 0 ? "rain" : "cloudy"}.svg`}
                tw=" mx-auto w-[50px] "
              />
              <h4 tw="capitalize">Lluvia - {current.cloud}%</h4>
            </div>
            <div
              tw="flex flex-row items-center"
              style={{
                display: "flex",
              }}
            >
              <img
                alt="Humidity icon"
                src={`${vercel_url}/weather-icons/humidity.svg`}
                tw=" mx-auto w-[50px] "
              />
              <h4 tw="capitalize">Humedad - {current.humidity}%</h4>
            </div>
            <div
              tw="flex flex-row items-center"
              style={{
                display: "flex",
              }}
            >
              <img
                alt="Vi icon"
                src={`${vercel_url}/weather-icons/windsock.svg`}
                tw=" mx-auto w-[50px] "
              />
              <h4 tw="capitalize">Viento - {current.wind_mph}mph</h4>
            </div>
            <div
              tw="flex flex-row items-center"
              style={{
                display: "flex",
              }}
            >
              <img
                alt="location icon"
                src={`${vercel_url}/weather-icons/compass.svg`}
                tw=" mx-auto w-[50px] "
              />
              <h4 tw="capitalize">
                {location.name}, {location.region}
              </h4>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
