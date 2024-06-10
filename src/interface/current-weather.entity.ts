export interface CurrentWeather {
  location: WeatherLocation;
  current: Current;
}

export interface Current {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

export type WeatherLabel =
  | "Sunny"
  | "Partly cloudy"
  | "Cloudy"
  | "Overcast"
  | "Mist"
  | "Patchy rain possible"
  | "Patchy snow possible"
  | "Patchy sleet possible"
  | "Patchy freezing drizzle possible"
  | "Thundery outbreaks possible"
  | "Blowing snow"
  | "Blizzard"
  | "Fog"
  | "Freezing fog"
  | "Patchy light drizzle"
  | "Light drizzle"
  | "Freezing drizzle"
  | "Heavy freezing drizzle"
  | "Patchy light rain"
  | "Light rain"
  | "Moderate rain at times"
  | "Moderate rain"
  | "Heavy rain at times"
  | "Heavy rain"
  | "Light freezing rain"
  | "Moderate or heavy freezing rain"
  | "Light sleet"
  | "Moderate or heavy sleet"
  | "Patchy light snow"
  | "Light snow"
  | "Patchy moderate snow"
  | "Moderate snow"
  | "Patchy heavy snow"
  | "Heavy snow"
  | "Ice pellets"
  | "Light rain shower"
  | "Moderate or heavy rain shower"
  | "Torrential rain shower"
  | "Light sleet showers"
  | "Moderate or heavy sleet showers"
  | "Light snow showers"
  | "Moderate or heavy snow showers"
  | "Light showers of ice pellets"
  | "Moderate or heavy showers of ice pellets"
  | "Patchy light rain with thunder"
  | "Moderate or heavy rain with thunder"
  | "Patchy light snow with thunder"
  | "Moderate or heavy snow with thunder";

export interface Condition {
  text: WeatherLabel;
  icon: string;
  code: number;
}

export interface WeatherLocation {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}
