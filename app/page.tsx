'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Wind, 
  ShieldCheck, 
  Clock, 
  Wrench, 
  TrendingDown, 
  Sparkles, 
  AlertCircle, 
  RefreshCw, 
  AlertOctagon,
  LucideIcon 
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { AqiOverviewCard } from '@/components/AqiOverviewCard';
import { ProtectiveGearGuide } from '@/components/ProtectiveGearGuide';
import { DailyRoutinePlanner } from '@/components/DailyRoutinePlanner';
import { IaqHacksStudio } from '@/components/IaqHacksStudio';
import { ImpactLedger } from '@/components/ImpactLedger';
import { SaansChatWidget } from '@/components/SaansChatWidget';
import { POPULAR_CITIES, CityPreset } from '@/lib/openmeteo';
import { AirQualityData, ImpactSummary, SupportedLanguage } from '@/types/air';
import { computeTotalImpact } from '@/lib/impact-calculator';
import { generateDailyRoutine } from '@/lib/routine-generator';
import { translations } from '@/lib/translations';

type ActiveWorkspaceTab = 'protect' | 'routine' | 'hacks' | 'impact';

export default function HomePage() {
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [currentCity, setCurrentCity] = useState<CityPreset>(POPULAR_CITIES[0]); // Delhi NCR default
  const [activeTab, setActiveTab] = useState<ActiveWorkspaceTab>('protect');
  const [liveAirData, setLiveAirData] = useState<AirQualityData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);

  const t = translations[language];

  // Fetch real-time air quality & weather for selected city
  const loadCityData = async (city: CityPreset) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/air-quality?lat=${city.lat}&lon=${city.lon}&city=${encodeURIComponent(city.name)}&country=${encodeURIComponent(city.country)}`
      );
      if (res.ok) {
        const json = await res.json();
        setLiveAirData(json);
      }
    } catch (e) {
      console.error('Failed to load air data', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCityData(currentCity);
  }, [currentCity]);

  // Construct Simulated Smog Emergency Payload (AQI 458)
  const demoEmergencyData: AirQualityData = useMemo(() => {
    return {
      city: `${currentCity.name}`,
      country: currentCity.country,
      latitude: currentCity.lat,
      longitude: currentCity.lon,
      aqi: 458,
      category: 'Hazardous',
      categoryHi: 'अत्यधिक खतरनाक (Hazardous)',
      dominantPollutant: 'PM2.5',
      pollutants: {
        pm2_5: 320.0,
        pm10: 480.0,
        no2: 165.0,
        so2: 110.0,
        co: 5.8,
        o3: 35.0,
      },
      weather: {
        temperature: 13,
        humidity: 84,
        windSpeed: 1.1,
        windDirection: 290,
        pressure: 1018,
        isDaytime: true,
        inversionRisk: 'Critical',
        ventilationStatus: 'SEAL_ROOMS',
        bestVentilationWindow: 'No Safe Window (Heavy Inversion Lid)',
      },
      timestamp: new Date().toISOString(),
      source: 'Demo Emergency 458+',
      isSimulatedDemo: true,
    };
  }, [currentCity]);

  // Active air quality telemetry (Live vs Demo)
  const airData: AirQualityData | null = isDemoMode ? demoEmergencyData : liveAirData;

  // Compute live impact summary deterministically
  const currentAqi = airData?.aqi || 380;
  const currentPm25 = airData?.pollutants?.pm2_5 || 185;
  const currentRoutines = useMemo(() => generateDailyRoutine(currentAqi), [currentAqi]);
  const impactSummary: ImpactSummary = useMemo(
    () => computeTotalImpact(currentRoutines, currentPm25),
    [currentRoutines, currentPm25]
  );

  // Dynamic ambient background glow based on real-time AQI
  const ambientGlowClass = useMemo(() => {
    if (currentAqi <= 100) return 'from-emerald-950/20 via-teal-950/10 to-slate-950';
    if (currentAqi <= 200) return 'from-amber-950/20 via-yellow-950/10 to-slate-950';
    if (currentAqi <= 300) return 'from-orange-950/25 via-red-950/10 to-slate-950';
    return 'from-rose-950/35 via-red-950/20 to-slate-950';
  }, [currentAqi]);

  const workspaceTabs: Array<{ id: ActiveWorkspaceTab; label: string; icon: LucideIcon }> = [
    { id: 'protect', label: t.tabs.protect, icon: ShieldCheck },
    { id: 'routine', label: t.tabs.routine, icon: Clock },
    { id: 'hacks', label: t.tabs.hacks, icon: Wrench },
    { id: 'impact', label: t.tabs.impact, icon: TrendingDown },
  ];

  return (
    <div className={`min-h-screen flex flex-col bg-slate-950 bg-gradient-to-b ${ambientGlowClass} text-slate-100 antialiased selection:bg-emerald-500 selection:text-white transition-colors duration-500 pb-20 md:pb-8`}>
      {/* Zone 1 — Sticky Glassmorphic Navbar */}
      <Navbar
        currentCity={currentCity}
        onSelectCity={(city) => setCurrentCity(city)}
        language={language}
        onChangeLanguage={(lang) => setLanguage(lang)}
        isDemoMode={isDemoMode}
        onToggleDemoMode={() => setIsDemoMode(!isDemoMode)}
        aqi={airData?.aqi}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 sm:space-y-8">
        {/* Loading Spinner or Content */}
        {isLoading && !liveAirData && !isDemoMode ? (
          <div className="py-28 flex flex-col items-center justify-center gap-3 text-slate-400">
            <RefreshCw className="w-8 h-8 animate-spin text-emerald-400" />
            <p className="text-sm font-semibold">
              {language === 'hi' ? 'वायुमंडलीय डेटा लोड हो रहा है...' : 'Retrieving telemetry from OpenWeather & Open-Meteo...'}
            </p>
          </div>
        ) : airData ? (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
            {/* Zone 2 — Hero Command Card */}
            <AqiOverviewCard data={airData} language={language} />

            {/* Zone 3 — Segmented 4-Tab Workspace (Desktop / Tablet switcher) */}
            <div className="hidden md:flex items-center gap-2 p-1.5 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg">
              {workspaceTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    aria-label={`Switch to tab ${tab.label}`}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold tracking-wide transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-lg shadow-emerald-950/60 border border-emerald-400/30'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-200' : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Workspace View (Eliminates vertical scroll overload) */}
            <div className="transition-all duration-200">
              {activeTab === 'protect' && (
                <ProtectiveGearGuide currentAqi={currentAqi} language={language} />
              )}

              {activeTab === 'routine' && (
                <DailyRoutinePlanner currentAqi={currentAqi} language={language} />
              )}

              {activeTab === 'hacks' && (
                <IaqHacksStudio language={language} />
              )}

              {activeTab === 'impact' && (
                <ImpactLedger impact={impactSummary} language={language} />
              )}
            </div>
          </div>
        ) : (
          <div className="py-16 text-center text-slate-400">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 text-rose-500" />
            <p>{language === 'hi' ? 'डेटा प्राप्त नहीं किया जा सका।' : 'Unable to connect to weather sensors.'}</p>
          </div>
        )}
      </main>

      {/* Floating Saans AI Companion Drawer / Bottom Sheet */}
      {airData && (
        <SaansChatWidget currentData={airData} language={language} />
      )}

      {/* Mobile-First Pinned Thumb-Friendly Bottom Navigation Bar (Zone 3 Mobile) */}
      <nav aria-label="Mobile Bottom Navigation" className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-2xl border-t border-white/10 px-2 py-2 flex items-center justify-around shadow-2xl shadow-black">
        {workspaceTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              aria-label={tab.label}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${
                isActive 
                  ? 'text-emerald-400 font-extrabold' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400 scale-110' : ''}`} />
              <span className="text-[10px] tracking-tight">{tab.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>

      {/* Desktop Footer with Non-Medical Disclaimer */}
      <footer className="hidden md:block border-t border-white/10 bg-black/40 backdrop-blur-md py-6 text-center text-xs text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            <strong>Saans (साँस)</strong> — Hack2Skill PromptWars Challenge 6 Platform
          </span>
          <span className="text-[11px] text-slate-500">
            {t.trustBadge} • {t.disclaimer}
          </span>
        </div>
      </footer>
    </div>
  );
}
