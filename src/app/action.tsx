"use server";

import { SearchItem } from "@/components/search-location";
import { SearchWeather } from "@/interface/search-weather.entity";
import { searchLocation } from "@/lib/api";
import { ReactNode } from "react";

export const searchLocations = async (value: string): Promise<ReactNode[]> => {
  const data = await searchLocation(value);

  const results: Record<string, SearchWeather[]> = {};

  data.forEach(location => {
    results[location.country] ??= [];

    // if (!results[location.country].find(item => item.name === location.name && item.region === location.region))
      results[location.country].push(location);
  });

  return Object.entries(results).map(([country, locations]) => <SearchItem key={country} heading={country} results={locations} />);
};
