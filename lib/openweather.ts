import { AirQualityData, PollutantConcentrations, WeatherData, AqiCategory } from '@/types/air';
import { fetchOpenMeteoAirQuality, calculateAqiFromPm25, evaluateAtmosphericConditions } from './openmeteo';

interface OpenWeatherForecastComponent {
  dt: number;
  components?: {
    pm2_5?: number;
  };
}

/**
 * Fetches real-time air pollution and weather metrics from OpenWeather API.
 * Automatically falls back to Open-Meteo European CAMS model if the API key
 * is absent, invalid, or rate-limited.
 *
 * @param lat - Latitude coordinate
 * @param lon - Longitude coordinate
 * @param cityName - Human-readable city name
 * @param country - Country name
 * @returns Unified AirQualityData telemetry object
 */
export async function getAirQualityData(
  lat: number,
  lon: number,
  cityName: string = 'Current Location',
  country: string = ''
): Promise<AirQualityData> {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey || apiKey === 'YOUR_OPENWEATHER_API_KEY') {
    // Zero-key fallback mode
    return fetchOpenMeteoAirQuality(lat, lon, cityName, country);
  }

  try {
    const airUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const [airRes, weatherRes] = await Promise.all([
      fetch(airUrl, { next: { revalidate: 900 } }),
      fetch(weatherUrl, { next: { revalidate: 900 } }),
    ]);

    if (!airRes.ok || !weatherRes.ok) {
      console.warn(`OpenWeather returned non-200 (${airRes.status}, ${weatherRes.status}). Falling back to Open-Meteo.`);
      return fetchOpenMeteoAirQuality(lat, lon, cityName, country);
    }

    const airJson = await airRes.json();
    const weatherJson = await weatherRes.json();

    const components = airJson.list?.[0]?.components || {};

    const pm2_5 = Math.round((components.pm2_5 || 75) * 10) / 10;
    const pm10 = Math.round((components.pm10 || 120) * 10) / 10;
    const no2 = Math.round((components.no2 || 40) * 10) / 10;
    const so2 = Math.round((components.so2 || 15) * 10) / 10;
    const co = Math.round(((components.co || 1000) / 1000) * 100) / 100;
    const o3 = Math.round((components.o3 || 50) * 10) / 10;

    const pollutants: PollutantConcentrations = { pm2_5, pm10, no2, so2, co, o3 };
    const { aqi, category, categoryHi } = calculateAqiFromPm25(pm2_5);

    const temp = Math.round(weatherJson.main?.temp || 20);
    const humidity = Math.round(weatherJson.main?.humidity || 65);
    const windSpeed = Math.round((weatherJson.wind?.speed || 2) * 3.6); // m/s to km/h
    const windDirection = Math.round(weatherJson.wind?.deg || 0);
    const pressure = Math.round(weatherJson.main?.pressure || 1013);

    const now = new Date();
    const currentHour = now.getHours();

    const { inversionRisk, ventilationStatus, bestVentilationWindow } = evaluateAtmosphericConditions(
      temp,
      humidity,
      windSpeed,
      currentHour,
      aqi
    );

    const weather: WeatherData = {
      temperature: temp,
      humidity,
      windSpeed,
      windDirection,
      pressure,
      isDaytime: currentHour >= 6 && currentHour <= 18,
      inversionRisk,
      ventilationStatus,
      bestVentilationWindow,
    };

    // Try optional forecast
    let hourlyForecast: Array<{ time: string; aqi: number; pm2_5: number; category: AqiCategory }> = [];
    try {
      const forecastRes = await fetch(forecastUrl, { next: { revalidate: 1800 } });
      if (forecastRes.ok) {
        const forecastJson = await forecastRes.json();
        const items: OpenWeatherForecastComponent[] = (forecastJson.list || []).slice(0, 10);
        hourlyForecast = items.map((item: OpenWeatherForecastComponent) => {
          const pm = item.components?.pm2_5 || 50;
          const calc = calculateAqiFromPm25(pm);
          const date = new Date(item.dt * 1000);
          return {
            time: `${date.getHours().toString().padStart(2, '0')}:00`,
            aqi: calc.aqi,
            pm2_5: Math.round(pm),
            category: calc.category,
          };
        });
      }
    } catch {
      // forecast optional
    }

    return {
      city: cityName || weatherJson.name || 'Current City',
      country: country || weatherJson.sys?.country || 'Global',
      latitude: lat,
      longitude: lon,
      aqi,
      category,
      categoryHi,
      dominantPollutant: 'PM2.5',
      pollutants,
      weather,
      timestamp: new Date().toISOString(),
      source: 'OpenWeather',
      hourlyForecast,
    };
  } catch (error) {
    console.error('Error in OpenWeather fetcher, using fallback:', error);
    return fetchOpenMeteoAirQuality(lat, lon, cityName, country);
  }
}
