import { ForecastCurrentWeather } from "@/interface/forecast-weather.entity";

function scoreWeather(climate: ForecastCurrentWeather): number {
  let score = 0;

  if (climate.temp_c >= 15 && climate.temp_c <= 25) {
    score += 2;
  } else if ((climate.temp_c >= 10 && climate.temp_c < 15) || (climate.temp_c > 25 && climate.temp_c <= 30)) {
    score += 1;
  }

  if (climate.wind_kph <= 5) {
    score += 2;
  } else if (climate.wind_kph >= 6 && climate.wind_kph <= 40) {
    score += 1;
  }

  if (climate.precip_mm === 0) {
    score += 2;
  } else if (climate.precip_mm <= 5) {
    score += 1;
  }

  if (climate.humidity >= 40 && climate.humidity <= 60) {
    score += 2;
  } else if ((climate.humidity >= 30 && climate.humidity < 40) || (climate.humidity > 60 && climate.humidity <= 70)) {
    score += 1;
  }

  if (climate.vis_km >= 10) {
    score += 2;
  } else if (climate.vis_km > 5 && climate.vis_km <= 10) {
    score += 1;
  }

  if (climate.uv <= 2) {
    score += 2;
  } else if (climate.uv > 2 && climate.uv <= 5) {
    score += 1;
  }

  return score;
}

export function compareWeatherScores(climate1: ForecastCurrentWeather, climate2: ForecastCurrentWeather): ForecastCurrentWeather {
  const score1 = scoreWeather(climate1);
  const score2 = scoreWeather(climate2);

  return score1 > score2 ? climate1 : climate2;
}
