import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '@/app/api/air-quality/route';
import { getAirQualityData } from '@/lib/openweather';
import { calculateAqiFromPm25 } from '@/lib/openmeteo';

describe('Air Quality API & Fallback Engine', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  describe('calculateAqiFromPm25 (CPCB Standard Breakpoints)', () => {
    it('classifies Good air quality correctly (PM2.5 <= 30)', () => {
      const res = calculateAqiFromPm25(15);
      expect(res.category).toBe('Good');
      expect(res.aqi).toBeLessThanOrEqual(50);
    });

    it('classifies Moderate air quality (PM2.5 31-60)', () => {
      const res = calculateAqiFromPm25(45);
      expect(res.category).toBe('Moderate');
      expect(res.aqi).toBeGreaterThan(50);
      expect(res.aqi).toBeLessThanOrEqual(100);
    });

    it('classifies Poor air quality (PM2.5 61-90)', () => {
      const res = calculateAqiFromPm25(75);
      expect(res.category).toBe('Poor');
      expect(res.aqi).toBeGreaterThan(100);
      expect(res.aqi).toBeLessThanOrEqual(200);
    });

    it('classifies Very Poor air quality (PM2.5 91-120)', () => {
      const res = calculateAqiFromPm25(105);
      expect(res.category).toBe('Very Poor');
      expect(res.aqi).toBeGreaterThan(200);
      expect(res.aqi).toBeLessThanOrEqual(300);
    });

    it('classifies Severe winter smog (PM2.5 121-250)', () => {
      const res = calculateAqiFromPm25(200);
      expect(res.category).toBe('Severe');
      expect(res.aqi).toBeGreaterThan(300);
      expect(res.aqi).toBeLessThanOrEqual(400);
    });

    it('caps hazardous emergency inversion at 500', () => {
      const res = calculateAqiFromPm25(400);
      expect(res.category).toBe('Hazardous');
      expect(res.aqi).toBe(500);
    });
  });

  describe('OpenWeather client with Open-Meteo fallback', () => {
    it('triggers Open-Meteo zero-key fallback when OPENWEATHER_API_KEY is not defined', async () => {
      delete process.env.OPENWEATHER_API_KEY;

      const mockOpenMeteoAir = {
        current: {
          pm2_5: 180,
          pm10: 260,
          nitrogen_dioxide: 65,
          sulphur_dioxide: 25,
          carbon_monoxide: 1500,
          ozone: 40,
        },
        hourly: {
          time: ['2026-11-23T00:00'],
          pm2_5: [180],
          pm10: [260],
        },
      };

      const mockOpenMeteoWeather = {
        current: {
          temperature_2m: 18,
          relative_humidity_2m: 75,
          wind_speed_10m: 5.5,
          wind_direction_10m: 290,
          surface_pressure: 1014,
          is_day: 1,
        },
      };

      const fetchMock = vi.fn().mockImplementation((url: string) => {
        if (url.includes('air-quality-api.open-meteo.com')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockOpenMeteoAir),
          });
        }
        if (url.includes('api.open-meteo.com')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockOpenMeteoWeather),
          });
        }
        return Promise.reject(new Error('Unknown URL: ' + url));
      });

      vi.stubGlobal('fetch', fetchMock);

      const data = await getAirQualityData(28.6139, 77.209, 'Delhi NCR', 'India');

      expect(data).toBeDefined();
      expect(data.city).toBe('Delhi NCR');
      expect(data.pollutants.pm2_5).toBe(180);
      expect(data.weather.temperature).toBe(18);
      expect(data.weather.humidity).toBe(75);
    });

    it('falls back cleanly to Open-Meteo when OpenWeather API returns HTTP 401/500 error', async () => {
      process.env.OPENWEATHER_API_KEY = 'invalid_or_expired_key';

      const fetchMock = vi.fn().mockImplementation((url: string) => {
        // OpenWeather fails
        if (url.includes('openweathermap.org')) {
          return Promise.resolve({
            ok: false,
            status: 401,
            text: () => Promise.resolve('Unauthorized'),
          });
        }
        // Open-Meteo succeeds
        if (url.includes('air-quality-api.open-meteo.com')) {
          return Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve({
                current: {
                  pm2_5: 140,
                  pm10: 200,
                  nitrogen_dioxide: 45,
                  sulphur_dioxide: 15,
                  carbon_monoxide: 900,
                  ozone: 50,
                },
              }),
          });
        }
        if (url.includes('api.open-meteo.com')) {
          return Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve({
                current: {
                  temperature_2m: 22,
                  relative_humidity_2m: 55,
                  wind_speed_10m: 8,
                  wind_direction_10m: 180,
                  surface_pressure: 1012,
                  is_day: 1,
                },
              }),
          });
        }
        return Promise.reject(new Error('Unexpected URL: ' + url));
      });

      vi.stubGlobal('fetch', fetchMock);

      const data = await getAirQualityData(28.6139, 77.209, 'Delhi NCR');
      expect(data).toBeDefined();
      expect(data.pollutants.pm2_5).toBe(140);
      expect(data.category).toBe('Severe');
    });
  });

  describe('Route Handler GET /api/air-quality', () => {
    it('returns 200 with structured air quality JSON', async () => {
      process.env.OPENWEATHER_API_KEY = 'valid_key';

      const mockAirPollution = {
        list: [
          {
            components: {
              pm2_5: 110,
              pm10: 160,
              no2: 45,
              so2: 12,
              co: 1200,
              o3: 35,
            },
          },
        ],
      };

      const mockWeather = {
        main: { temp: 21, humidity: 68, pressure: 1013 },
        wind: { speed: 2.5, deg: 120 },
      };

      const fetchMock = vi.fn().mockImplementation((url: string) => {
        if (url.includes('air_pollution/forecast')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ list: [] }),
          });
        }
        if (url.includes('air_pollution')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockAirPollution),
          });
        }
        if (url.includes('weather')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockWeather),
          });
        }
        return Promise.reject(new Error('Unhandled URL: ' + url));
      });

      vi.stubGlobal('fetch', fetchMock);

      const req = new NextRequest('http://localhost:3000/api/air-quality?lat=28.6139&lon=77.2090&city=Delhi%20NCR');
      const response = await GET(req);

      expect(response.status).toBe(200);
      const json = await response.json();
      expect(json.city).toBe('Delhi NCR');
      expect(json.pollutants.pm2_5).toBe(110);
      expect(json.weather.temperature).toBe(21);
    });
  });
});
