import { CurrentWeather } from "@/interface/current-weather.entity";
import { apiKey, vercel_url } from "./config";
import { SearchWeather } from "@/interface/search-weather.entity";
import { GetForecastWeather } from "@/interface/forecast-weather.entity";

export async function getCurrentWeather(location: string): Promise<CurrentWeather> {
  const data: CurrentWeather = await (await fetch(`${vercel_url}/api/current.json?q=${location}&lang=es&key=${apiKey}`)).json();

  return data;
}

export async function searchLocation(
  search: string,
  {
    signal
  }: {
    signal?: AbortSignal;
  } = {}
): Promise<SearchWeather[]> {
  const data = await (
    await fetch(`${vercel_url}/api/search.json?q=${search}&lang=es&key=${apiKey}`, {
      signal
    })
  ).json();

  return data;
}

export async function getWeatherForecast(location: string, days: number): Promise<GetForecastWeather> {
  const data = await fetch(`${vercel_url}/api/forecast.json?q=${location}&lang=es&days=${days}&key=${apiKey}`, {
    cache: "force-cache"
  });

  return data.json();
}
