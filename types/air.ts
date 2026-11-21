export type AqiCategory = 
  | 'Good' 
  | 'Moderate' 
  | 'Poor' 
  | 'Very Poor' 
  | 'Severe' 
  | 'Hazardous';

export type SupportedLanguage = 'en' | 'hi' | 'hinglish' | 'pa' | 'bn' | 'mr';

export interface PollutantConcentrations {
  pm2_5: number; // µg/m³
  pm10: number;  // µg/m³
  no2: number;   // µg/m³
  so2: number;   // µg/m³
  co: number;    // mg/m³ or µg/m³
  o3: number;    // µg/m³
}

export interface WeatherData {
  temperature: number; // °C
  humidity: number;    // %
  windSpeed: number;   // km/h
  windDirection: number; // degrees
  pressure: number;    // hPa
  isDaytime: boolean;
  inversionRisk: 'Low' | 'Moderate' | 'High' | 'Critical';
  ventilationStatus: 'VENTILATE_NOW' | 'MODERATE' | 'SEAL_ROOMS';
  bestVentilationWindow?: string;
}

export interface AirQualityData {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  aqi: number;
  category: AqiCategory;
  categoryHi: string;
  dominantPollutant: 'PM2.5' | 'PM10' | 'NO2' | 'O3' | 'CO' | 'SO2';
  pollutants: PollutantConcentrations;
  weather: WeatherData;
  timestamp: string;
  source: 'OpenWeather' | 'Open-Meteo Fallback' | 'Simulated' | 'Demo Emergency 458+';
  isSimulatedDemo?: boolean;
  hourlyForecast?: Array<{
    time: string;
    aqi: number;
    pm2_5: number;
    category: AqiCategory;
  }>;
}

export interface ProtectiveProduct {
  id: string;
  name: string;
  nameHi: string;
  category: 'mask' | 'home-sealing' | 'air-purifier' | 'health-barrier' | 'monitor';
  categoryHi: string;
  minAqi: number;
  maxAqi: number;
  importance: 'Essential' | 'Highly Recommended' | 'Good to Have';
  tagline: string;
  taglineHi: string;
  description: string;
  descriptionHi: string;
  instructions: string[];
  instructionsHi: string[];
  maintenanceOrSealCheck: string;
  maintenanceOrSealCheckHi: string;
  iconName: string;
  badge: string;
  estimatedCost: string;
}

export interface FamilyProfile {
  id: string;
  name: string;
  hasInfants: boolean;
  hasElderly: boolean;
  hasAsthma: boolean;
  isPregnant: boolean;
  commuteType: 'two-wheeler' | 'metro-walk' | 'car-ac' | 'bus' | 'wfh';
}

export interface RoutineItem {
  id: string;
  timeRange: string;
  title: string;
  titleHi: string;
  exposureRisk: 'Low' | 'Moderate' | 'High' | 'Critical';
  traditionalHabit: string;
  traditionalHabitHi: string;
  optimizedAlternative: string;
  optimizedAlternativeHi: string;
  rationale: string;
  rationaleHi: string;
  pm25ReductionPercent: number;
  emissionsSavedKgCo2: number;
  category: 'commute' | 'exercise' | 'ventilation' | 'cooking' | 'indoor-care';
}

export interface IaqHack {
  id: string;
  title: string;
  titleHi: string;
  type: 'diy-purifier' | 'ventilation' | 'dust-management' | 'cooking' | 'plants';
  cadrEstimate?: string;
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  reductionPercent: number;
  description: string;
  descriptionHi: string;
  materials: string[];
  materialsHi: string[];
  steps: string[];
  stepsHi: string[];
  proTip: string;
  proTipHi: string;
  warning?: string;
  warningHi?: string;
}

export interface ImpactSummary {
  dailyPm25DoseAvoidedUg: number;
  cigaretteEquivalentsAvoided: number;
  co2SavedKg: number;
  activeMitigationScore: number; // 0-100
  ambientCigarettesToday: number; // Berkeley Earth equivalent of ambient air
}
