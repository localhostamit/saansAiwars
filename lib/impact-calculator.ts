import { RoutineItem, ImpactSummary } from '@/types/air';

/**
 * Standard inhalation rates according to US EPA / WHO Exposure Factors Handbook:
 * - Adult resting / sedentary: 0.008 m³/min (0.48 m³/hr)
 * - Adult light activity / office: 0.012 m³/min (0.72 m³/hr)
 * - Moderate activity / fast walk: 0.025 m³/min (1.5 m³/hr)
 * - Heavy exertion / cycling / running: 0.040 m³/min (2.4 m³/hr)
 * - Child respiration rate per body weight is ~2x higher than adult.
 *
 * Inhaled PM2.5 Dose (µg) = Concentration (µg/m³) * Ventilation Rate (m³/hr) * Time (hours) * (1 - Mask/Filter Efficiency)
 */

export function calculateInhaledDose(
  pm25Concentration: number, // µg/m³
  durationHours: number,
  activityLevel: 'rest' | 'light' | 'moderate' | 'heavy' = 'light',
  protectionType: 'none' | 'cloth-mask' | 'n95' | 'hepa-room' = 'none'
): number {
  const ventilationRates: Record<string, number> = {
    rest: 0.48,
    light: 0.72,
    moderate: 1.5,
    heavy: 2.4,
  };

  const filterEfficiencies: Record<string, number> = {
    none: 0.0,
    'cloth-mask': 0.25,
    n95: 0.95,
    'hepa-room': 0.90,
  };

  const rate = ventilationRates[activityLevel] || 0.72;
  const efficiency = filterEfficiencies[protectionType] || 0.0;

  const dose = pm25Concentration * rate * durationHours * (1 - efficiency);
  return Math.round(dose);
}

/**
 * Berkeley Earth Rule of Thumb:
 * Inhaling 22 µg/m³ of PM2.5 over 24 hours is approximately equivalent to smoking 1 cigarette.
 * Formula: Cigarettes Equivalent = PM2.5 / 22
 */
export function calculateCigarettesEquivalent(pm25Concentration: number): number {
  if (pm25Concentration <= 0) return 0;
  return Math.round((pm25Concentration / 22) * 10) / 10;
}

/**
 * Dose averted to cigarette equivalents (using standard 24h adult minute ventilation)
 * Daily dose / 250 µg ≈ 1 cigarette avoided
 */
export function convertDoseToCigarettes(pm25AvoidedUg: number): number {
  if (pm25AvoidedUg <= 0) return 0;
  return Math.round((pm25AvoidedUg / 250) * 10) / 10;
}

/**
 * Computes emissions prevented by switching from private combustion transport:
 * - Solo Petrol/Diesel Car: ~140g CO2/km, 0.05g PM2.5/km, 0.4g NOx/km
 * - Metro / Electric Bus: ~25g CO2/passenger-km
 * - Shifting a typical 20 km round-trip commute saves ~2.3 kg CO2 and 1g tailpipe soot.
 */
export function calculateCommuteEmissionsSaved(distanceKm: number = 20): {
  co2SavedKg: number;
  pmSavedGrams: number;
} {
  const co2PerKm = 0.115; // kg CO2 saved per passenger-km
  const pmPerKm = 0.05;   // grams PM saved per passenger-km

  return {
    co2SavedKg: Math.round(distanceKm * co2PerKm * 10) / 10,
    pmSavedGrams: Math.round(distanceKm * pmPerKm * 10) / 10,
  };
}

/**
 * Aggregates cumulative health and emissions mitigation impact across all scheduled routine activities.
 *
 * @param routines - List of active, optimized daily routines
 * @param currentPm25 - Ambient PM2.5 level in µg/m³
 * @returns Comprehensive ImpactSummary object with inhaled dose avoided and CO2 offsets
 */
export function computeTotalImpact(routines: RoutineItem[], currentPm25: number): ImpactSummary {
  let dailyPm25DoseAvoidedUg = 0;
  let co2SavedKg = 0;

  routines.forEach((r) => {
    // Assume average duration of 1 hour per scheduled routine slot
    const unmitigatedDose = calculateInhaledDose(currentPm25, 1, 'moderate', 'none');
    const mitigatedDose = unmitigatedDose * (1 - r.pm25ReductionPercent / 100);
    dailyPm25DoseAvoidedUg += Math.max(0, unmitigatedDose - mitigatedDose);
    co2SavedKg += r.emissionsSavedKgCo2;
  });

  const cigaretteEquivalentsAvoided = convertDoseToCigarettes(dailyPm25DoseAvoidedUg);
  const activeMitigationScore = Math.min(98, Math.round(35 + (dailyPm25DoseAvoidedUg / 150) * 10));
  const ambientCigarettesToday = calculateCigarettesEquivalent(currentPm25);

  return {
    dailyPm25DoseAvoidedUg: Math.round(dailyPm25DoseAvoidedUg),
    cigaretteEquivalentsAvoided,
    co2SavedKg: Math.round(co2SavedKg * 10) / 10,
    activeMitigationScore,
    ambientCigarettesToday,
  };
}
