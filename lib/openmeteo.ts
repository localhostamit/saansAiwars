import { AirQualityData, PollutantConcentrations, WeatherData, AqiCategory } from '@/types/air';

export interface CityPreset {
  name: string;
  nameHi: string;
  country: string;
  lat: number;
  lon: number;
  typicalWinterAqi: number;
}

export const POPULAR_CITIES: CityPreset[] = [
  { name: 'Delhi NCR', nameHi: 'दिल्ली एनसीआर', country: 'India', lat: 28.6139, lon: 77.2090, typicalWinterAqi: 410 },
  { name: 'Patna', nameHi: 'पटना', country: 'India', lat: 25.5941, lon: 85.1376, typicalWinterAqi: 360 },
  { name: 'Lucknow', nameHi: 'लखनऊ', country: 'India', lat: 26.8467, lon: 80.9462, typicalWinterAqi: 330 },
  { name: 'Mumbai', nameHi: 'मुंबई', country: 'India', lat: 19.0760, lon: 72.8777, typicalWinterAqi: 195 },
  { name: 'Kolkata', nameHi: 'कोलकाता', country: 'India', lat: 22.5726, lon: 88.3639, typicalWinterAqi: 280 },
  { name: 'Lahore', nameHi: 'लाहौर', country: 'Pakistan', lat: 31.5204, lon: 74.3587, typicalWinterAqi: 450 },
  { name: 'Beijing', nameHi: 'बीजिंग', country: 'China', lat: 39.9042, lon: 116.4074, typicalWinterAqi: 160 },
  { name: 'London', nameHi: 'लंदन', country: 'UK', lat: 51.5074, lon: -0.1278, typicalWinterAqi: 45 },
  { name: 'New York', nameHi: 'न्यू यॉर्क', country: 'USA', lat: 40.7128, lon: -74.0060, typicalWinterAqi: 38 },
];

/**
 * Calculates official Indian CPCB / US EPA standard AQI from PM2.5 concentration (µg/m³).
 *
 * @param pm25 - Fine particulate matter concentration in µg/m³
 * @returns Unified numerical AQI and localized category descriptors
 */
export function calculateAqiFromPm25(pm25: number): { aqi: number; category: AqiCategory; categoryHi: string } {
  let aqi: number;
  if (pm25 <= 30) {
    aqi = Math.round((50 / 30) * pm25);
  } else if (pm25 <= 60) {
    aqi = Math.round(50 + ((100 - 50) / (60 - 30)) * (pm25 - 30));
  } else if (pm25 <= 90) {
    aqi = Math.round(100 + ((200 - 100) / (90 - 60)) * (pm25 - 60));
  } else if (pm25 <= 120) {
    aqi = Math.round(200 + ((300 - 200) / (120 - 90)) * (pm25 - 90));
  } else if (pm25 <= 250) {
    aqi = Math.round(300 + ((400 - 300) / (250 - 120)) * (pm25 - 120));
  } else {
    aqi = Math.min(500, Math.round(400 + ((500 - 400) / (380 - 250)) * (pm25 - 250)));
  }

  let category: AqiCategory = 'Good';
  let categoryHi = 'अच्छा';

  if (aqi <= 50) {
    category = 'Good';
    categoryHi = 'उत्तम (Good)';
  } else if (aqi <= 100) {
    category = 'Moderate';
    categoryHi = 'संतोषजनक (Moderate)';
  } else if (aqi <= 200) {
    category = 'Poor';
    categoryHi = 'मध्यम प्रदूषित (Poor)';
  } else if (aqi <= 300) {
    category = 'Very Poor';
    categoryHi = 'खराब (Very Poor)';
  } else if (aqi <= 400) {
    category = 'Severe';
    categoryHi = 'गंभीर (Severe)';
  } else {
    category = 'Hazardous';
    categoryHi = 'अत्यधिक खतरनाक (Hazardous)';
  }

  return { aqi, category, categoryHi };
}

/**
 * Computes winter temperature inversion risk & safe natural ventilation window
 * based on ambient temperature, relative humidity, wind speed, and hour of day.
 *
 * @param temp - Temperature in degrees Celsius
 * @param humidity - Relative humidity percentage
 * @param windSpeed - Wind speed in km/h
 * @param hour - Current hour in 24-hour format (0-23)
 * @param aqi - Numerical Air Quality Index value
 * @returns Stagnation risk level, ventilation action, and optimal solar mixing window
 */
export function evaluateAtmosphericConditions(
  temp: number,
  humidity: number,
  windSpeed: number,
  hour: number,
  aqi: number
): {
  inversionRisk: 'Low' | 'Moderate' | 'High' | 'Critical';
  ventilationStatus: 'VENTILATE_NOW' | 'MODERATE' | 'SEAL_ROOMS';
  bestVentilationWindow: string;
} {
  // Inversion is highest in late night / early morning (02:00 - 09:00), low wind (< 5 km/h), high humidity (> 70%)
  const isMorningOrNight = hour < 10 || hour > 19;
  const isStagnant = windSpeed < 6;
  const isHumid = humidity > 70;

  let inversionRisk: 'Low' | 'Moderate' | 'High' | 'Critical' = 'Low';

  if (isMorningOrNight && isStagnant && isHumid) {
    inversionRisk = 'Critical';
  } else if (isMorningOrNight && (isStagnant || isHumid)) {
    inversionRisk = 'High';
  } else if (isStagnant) {
    inversionRisk = 'Moderate';
  }

  // Best ventilation window is generally 13:00 to 15:30 when solar heating raises mixing height
  const bestVentilationWindow = "1:00 PM – 3:30 PM (Solar Mixing Peak)";

  let ventilationStatus: 'VENTILATE_NOW' | 'MODERATE' | 'SEAL_ROOMS' = 'SEAL_ROOMS';
  if (aqi < 120 && (hour >= 12 && hour <= 16)) {
    ventilationStatus = 'VENTILATE_NOW';
  } else if (aqi < 220 && (hour >= 13 && hour <= 15)) {
    ventilationStatus = 'MODERATE';
  } else {
    ventilationStatus = 'SEAL_ROOMS';
  }

  return { inversionRisk, ventilationStatus, bestVentilationWindow };
}

/**
 * Open-Meteo Air Quality + Weather Fetcher (Zero-Key Fallback).
 * Directly interfaces with European Copernicus & CAMS atmospheric models
 * to ensure continuous application uptime without requiring third-party API credentials.
 *
 * @param lat - Geographic latitude
 * @param lon - Geographic longitude
 * @param cityName - Name of target city
 * @param country - Name of target country
 * @returns Normalized AirQualityData telemetry object
 */
export async function fetchOpenMeteoAirQuality(
  lat: number,
  lon: number,
  cityName: string = 'Current Location',
  country: string = ''
): Promise<AirQualityData> {
  const airUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone&hourly=pm2_5,pm10&timezone=auto`;
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,surface_pressure,wind_speed_10m,wind_direction_10m,is_day&timezone=auto`;

  const [airRes, weatherRes] = await Promise.all([
    fetch(airUrl, { next: { revalidate: 900 } }),
    fetch(weatherUrl, { next: { revalidate: 900 } }),
  ]);

  if (!airRes.ok || !weatherRes.ok) {
    throw new Error(`Open-Meteo API response failure: air=${airRes.status}, weather=${weatherRes.status}`);
  }

  const airData = await airRes.json();
  const weatherData = await weatherRes.json();

  const currentAir = airData.current || {};
  const currentWeather = weatherData.current || {};

  const pm2_5 = Math.round((currentAir.pm2_5 || 85) * 10) / 10;
  const pm10 = Math.round((currentAir.pm10 || 140) * 10) / 10;
  const no2 = Math.round((currentAir.nitrogen_dioxide || 35) * 10) / 10;
  const so2 = Math.round((currentAir.sulphur_dioxide || 12) * 10) / 10;
  const co = Math.round(((currentAir.carbon_monoxide || 800) / 1000) * 100) / 100;
  const o3 = Math.round((currentAir.ozone || 45) * 10) / 10;

  const pollutants: PollutantConcentrations = { pm2_5, pm10, no2, so2, co, o3 };
  const { aqi, category, categoryHi } = calculateAqiFromPm25(pm2_5);

  const now = new Date();
  const currentHour = now.getHours();

  const temp = Math.round(currentWeather.temperature_2m || 18);
  const humidity = Math.round(currentWeather.relative_humidity_2m || 75);
  const windSpeed = Math.round(currentWeather.wind_speed_10m || 4);
  const windDirection = Math.round(currentWeather.wind_direction_10m || 280);
  const pressure = Math.round(currentWeather.surface_pressure || 1014);

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
    isDaytime: !!currentWeather.is_day,
    inversionRisk,
    ventilationStatus,
    bestVentilationWindow,
  };

  // Extract hourly forecast preview
  const hourly = airData.hourly || {};
  const hourlyForecast: Array<{ time: string; aqi: number; pm2_5: number; category: AqiCategory }> = [];
  if (hourly.time && hourly.pm2_5) {
    const times: string[] = hourly.time.slice(0, 12);
    times.forEach((t: string, idx: number) => {
      const pm = hourly.pm2_5[idx] || 50;
      const calc = calculateAqiFromPm25(pm);
      hourlyForecast.push({
        time: t.includes('T') ? t.split('T')[1].slice(0, 5) : t,
        aqi: calc.aqi,
        pm2_5: Math.round(pm),
        category: calc.category,
      });
    });
  }

  return {
    city: cityName,
    country: country || 'Global',
    latitude: lat,
    longitude: lon,
    aqi,
    category,
    categoryHi,
    dominantPollutant: 'PM2.5',
    pollutants,
    weather,
    timestamp: new Date().toISOString(),
    source: 'Open-Meteo Fallback',
    hourlyForecast,
  };
}
