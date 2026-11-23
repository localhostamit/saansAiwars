import { describe, it, expect } from 'vitest';
import {
  calculateInhaledDose,
  calculateCigarettesEquivalent,
  convertDoseToCigarettes,
  calculateCommuteEmissionsSaved,
  computeTotalImpact,
} from '@/lib/impact-calculator';
import { RoutineItem } from '@/types/air';

describe('Impact Calculator Module (Deterministic CPCB/WHO/Berkeley Earth Formulas)', () => {
  describe('calculateInhaledDose', () => {
    it('calculates unmitigated dose correctly for light activity', () => {
      // 100 µg/m³ * 0.72 m³/hr * 2 hrs * (1 - 0) = 144 µg
      const dose = calculateInhaledDose(100, 2, 'light', 'none');
      expect(dose).toBe(144);
    });

    it('applies N95 filtration efficiency (95%) correctly', () => {
      // 100 µg/m³ * 0.72 m³/hr * 2 hrs * (1 - 0.95) = 7.2 -> 7 µg
      const dose = calculateInhaledDose(100, 2, 'light', 'n95');
      expect(dose).toBe(7);
    });

    it('applies cloth mask efficiency (25%) correctly', () => {
      // 100 * 0.72 * 2 * 0.75 = 108 µg
      const dose = calculateInhaledDose(100, 2, 'light', 'cloth-mask');
      expect(dose).toBe(108);
    });

    it('applies HEPA room efficiency (90%) correctly', () => {
      // 100 * 0.72 * 2 * 0.10 = 14.4 -> 14 µg
      const dose = calculateInhaledDose(100, 2, 'light', 'hepa-room');
      expect(dose).toBe(14);
    });

    it('handles different physical activity ventilation rates', () => {
      const rest = calculateInhaledDose(100, 1, 'rest', 'none'); // 0.48 m³/hr -> 48
      const moderate = calculateInhaledDose(100, 1, 'moderate', 'none'); // 1.5 m³/hr -> 150
      const heavy = calculateInhaledDose(100, 1, 'heavy', 'none'); // 2.4 m³/hr -> 240

      expect(rest).toBe(48);
      expect(moderate).toBe(150);
      expect(heavy).toBe(240);
    });

    it('handles boundary and edge cases: zero concentration or duration', () => {
      expect(calculateInhaledDose(0, 5, 'moderate', 'none')).toBe(0);
      expect(calculateInhaledDose(200, 0, 'moderate', 'none')).toBe(0);
    });

    it('computes accurately during severe smog emergency (AQI 500+ / PM2.5 350+)', () => {
      // 350 µg/m³ * 1.5 m³/hr * 3 hrs * (1 - 0) = 1575 µg
      const severeUnmitigated = calculateInhaledDose(350, 3, 'moderate', 'none');
      // With N95: 1575 * 0.05 = 78.75 -> 79 µg
      const severeN95 = calculateInhaledDose(350, 3, 'moderate', 'n95');

      expect(severeUnmitigated).toBe(1575);
      expect(severeN95).toBe(79);
    });
  });

  describe('calculateCigarettesEquivalent (Berkeley Earth Heuristic PM2.5 / 22)', () => {
    it('returns zero for zero or negative values', () => {
      expect(calculateCigarettesEquivalent(0)).toBe(0);
      expect(calculateCigarettesEquivalent(-15)).toBe(0);
    });

    it('calculates 1 cigarette for 22 µg/m³', () => {
      expect(calculateCigarettesEquivalent(22)).toBe(1);
    });

    it('calculates proportional cigarette equivalence with 1 decimal precision', () => {
      expect(calculateCigarettesEquivalent(110)).toBe(5);
      expect(calculateCigarettesEquivalent(320)).toBe(14.5); // 320 / 22 = 14.545 -> 14.5
      expect(calculateCigarettesEquivalent(458)).toBe(20.8);
    });
  });

  describe('convertDoseToCigarettes', () => {
    it('returns zero for non-positive dose values', () => {
      expect(convertDoseToCigarettes(0)).toBe(0);
      expect(convertDoseToCigarettes(-50)).toBe(0);
    });

    it('converts PM2.5 dose averted to cigarette equivalents (250 µg ≈ 1 cigarette)', () => {
      expect(convertDoseToCigarettes(250)).toBe(1);
      expect(convertDoseToCigarettes(500)).toBe(2);
      expect(convertDoseToCigarettes(1250)).toBe(5);
    });
  });

  describe('calculateCommuteEmissionsSaved', () => {
    it('computes 20km standard commute offsets correctly', () => {
      const result = calculateCommuteEmissionsSaved(20);
      expect(result.co2SavedKg).toBe(2.3);
      expect(result.pmSavedGrams).toBe(1.0);
    });

    it('computes custom distance commute offsets', () => {
      const result = calculateCommuteEmissionsSaved(50);
      expect(result.co2SavedKg).toBe(5.8);
      expect(result.pmSavedGrams).toBe(2.5);
    });

    it('handles zero distance', () => {
      const result = calculateCommuteEmissionsSaved(0);
      expect(result.co2SavedKg).toBe(0);
      expect(result.pmSavedGrams).toBe(0);
    });
  });

  describe('computeTotalImpact', () => {
    it('returns baseline impact summary when routines list is empty', () => {
      const impact = computeTotalImpact([], 220);
      expect(impact.dailyPm25DoseAvoidedUg).toBe(0);
      expect(impact.co2SavedKg).toBe(0);
      expect(impact.cigaretteEquivalentsAvoided).toBe(0);
      expect(impact.ambientCigarettesToday).toBe(10); // 220 / 22 = 10
      expect(impact.activeMitigationScore).toBe(35); // Base score 35
    });

    it('accurately aggregates routine dose reductions and emission savings', () => {
      const mockRoutines: RoutineItem[] = [
        {
          id: 'routine-1',
          timeRange: '07:00 AM - 08:30 AM',
          title: 'Indoor Yoga & Breathwork',
          titleHi: 'योग',
          exposureRisk: 'Critical',
          traditionalHabit: 'Outdoor morning run in fog',
          traditionalHabitHi: 'सुबह बाहर दौड़ना',
          optimizedAlternative: 'Exercise indoors with purifier',
          optimizedAlternativeHi: 'कमरे में योग करें',
          rationale: 'Thermal inversion traps PM2.5 at sunrise',
          rationaleHi: 'कारण',
          pm25ReductionPercent: 85,
          emissionsSavedKgCo2: 1.2,
          category: 'exercise',
        },
        {
          id: 'routine-2',
          timeRange: '08:30 AM - 09:30 AM',
          title: 'Metro Commute over Solo Car',
          titleHi: 'मेट्रो यात्रा',
          exposureRisk: 'High',
          traditionalHabit: 'Solo petrol car commute',
          traditionalHabitHi: 'कार से यात्रा',
          optimizedAlternative: 'Electric Metro rail',
          optimizedAlternativeHi: 'मेट्रो का उपयोग करें',
          rationale: 'Reduces road congestion and direct exhaust inhalation',
          rationaleHi: 'कारण',
          pm25ReductionPercent: 60,
          emissionsSavedKgCo2: 2.3,
          category: 'commute',
        },
      ];

      const impact = computeTotalImpact(mockRoutines, 200);

      expect(impact.dailyPm25DoseAvoidedUg).toBeGreaterThan(0);
      expect(impact.co2SavedKg).toBe(3.5); // 1.2 + 2.3
      expect(impact.cigaretteEquivalentsAvoided).toBeGreaterThan(0);
      expect(impact.activeMitigationScore).toBeGreaterThanOrEqual(35);
      expect(impact.activeMitigationScore).toBeLessThanOrEqual(98);
      expect(impact.ambientCigarettesToday).toBe(9.1); // 200 / 22 ≈ 9.09 -> 9.1
    });
  });
});
