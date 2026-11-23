import { describe, it, expect } from 'vitest';
import {
  PROTECTIVE_PRODUCTS,
  getRecommendedProductsForAqi,
} from '@/lib/protective-products';

describe('Protective Products & Gear Engine', () => {
  it('exports a non-empty catalogue of certified protective equipment', () => {
    expect(PROTECTIVE_PRODUCTS.length).toBeGreaterThan(5);
  });

  it('validates integrity of all protective product entries', () => {
    PROTECTIVE_PRODUCTS.forEach((product) => {
      expect(product.id).toBeDefined();
      expect(typeof product.id).toBe('string');
      expect(product.name).toBeTruthy();
      expect(product.nameHi).toBeTruthy();
      expect(product.category).toMatch(/^(mask|home-sealing|air-purifier|health-barrier|monitor)$/);
      expect(product.minAqi).toBeGreaterThanOrEqual(0);
      expect(product.maxAqi).toBeLessThanOrEqual(1000);
      expect(product.instructions.length).toBeGreaterThan(0);
      expect(product.instructionsHi.length).toBeGreaterThan(0);
      expect(product.maintenanceOrSealCheck).toBeTruthy();
      expect(product.estimatedCost).toBeTruthy();
    });
  });

  describe('AQI Tiered Filtering (getRecommendedProductsForAqi)', () => {
    it('Tier 1: AQI <= 100 (Good to Satisfactory) returns base protective gear', () => {
      const products = getRecommendedProductsForAqi(100);
      expect(products.length).toBeGreaterThan(0);
      products.forEach((p) => {
        expect(p.minAqi).toBeLessThanOrEqual(100);
      });
      // Should not recommend N99 heavy-duty respirator at AQI 100
      const hasN99 = products.some((p) => p.id === 'n99-ffp3-respirator');
      expect(hasN99).toBe(false);
    });

    it('Tier 2: AQI 101–200 (Moderate to Poor) activates N95 respirator & door sweeps', () => {
      const products = getRecommendedProductsForAqi(160);
      const hasN95 = products.some((p) => p.id === 'n95-headband-mask');
      const hasDoorSweep = products.some((p) => p.id === 'silicone-door-bottom-sweep');
      const hasN99 = products.some((p) => p.id === 'n99-ffp3-respirator');

      expect(hasN95).toBe(true);
      expect(hasDoorSweep).toBe(true);
      expect(hasN99).toBe(false); // minAqi 300
    });

    it('Tier 3: AQI 201–300 (Very Poor) activates protective goggles & eye drops', () => {
      const products = getRecommendedProductsForAqi(260);
      const hasGoggles = products.some((p) => p.id === 'wraparound-commuter-goggles');
      const hasEyeDrops = products.some((p) => p.id === 'carboxy-eye-drops');
      const hasN99 = products.some((p) => p.id === 'n99-ffp3-respirator');

      expect(hasGoggles).toBe(true);
      expect(hasEyeDrops).toBe(true);
      expect(hasN99).toBe(false); // N99 is for 300+
    });

    it('Tier 4: AQI 301–500+ (Severe / Hazardous Emergency) activates N99 & Safe Room protocols', () => {
      const products = getRecommendedProductsForAqi(450);
      const hasN99 = products.some((p) => p.id === 'n99-ffp3-respirator');
      const hasHepa = products.some((p) => p.id === 'true-hepa-h13-purifier');
      const hasN95 = products.some((p) => p.id === 'n95-headband-mask');

      expect(hasN99).toBe(true);
      expect(hasHepa).toBe(true);
      expect(hasN95).toBe(true);

      // In severe tier, all products whose minAqi <= 450 must be included
      expect(products.length).toBe(PROTECTIVE_PRODUCTS.length);
    });
  });

  describe('Verification of 15-second Fit Check & Health Protocols', () => {
    it('verifies N95 respirator contains the strict 15-second negative-pressure seal check', () => {
      const n95 = PROTECTIVE_PRODUCTS.find((p) => p.id === 'n95-headband-mask');
      expect(n95).toBeDefined();
      expect(n95?.maintenanceOrSealCheck).toContain('FIT CHECK PROTOCOL');
      expect(n95?.maintenanceOrSealCheck).toContain('Inhale sharply');
      expect(n95?.maintenanceOrSealCheck).toContain('Exhale sharply');
    });

    it('verifies N99 respirator emphasizes clean-shaven airtight perimeter seal', () => {
      const n99 = PROTECTIVE_PRODUCTS.find((p) => p.id === 'n99-ffp3-respirator');
      expect(n99).toBeDefined();
      expect(n99?.instructions.some((inst) => inst.toLowerCase().includes('clean-shaven'))).toBe(true);
    });
  });
});
