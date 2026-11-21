'use client';

import React from 'react';
import { 
  AlertCircle, 
  Wind, 
  Thermometer, 
  Droplets, 
  Compass, 
  Gauge, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  DoorClosed, 
  Sun, 
  Share2, 
  Cigarette, 
  Sparkles, 
  AlertTriangle 
} from 'lucide-react';
import { AirQualityData, SupportedLanguage } from '@/types/air';
import { translations } from '@/lib/translations';
import { calculateCigarettesEquivalent } from '@/lib/impact-calculator';

interface AqiOverviewCardProps {
  data: AirQualityData;
  language: SupportedLanguage;
}

export const AqiOverviewCard: React.FC<AqiOverviewCardProps> = ({ data, language }) => {
  const t = translations[language];
  const { aqi, category, pollutants, weather } = data;

  // Berkeley Earth Cigarettes Equivalent: PM2.5 / 22
  const cigarettesToday = calculateCigarettesEquivalent(pollutants.pm2_5);

  // Dynamic Severity Accenting
  const getSeverityStyle = (val: number) => {
    if (val <= 100) {
      return {
        gradient: 'from-emerald-950/70 via-teal-950/30 to-slate-950/90',
        glow: 'shadow-emerald-900/30 border-emerald-500/30',
        badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        dialBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
        accentText: 'text-emerald-400',
      };
    }
    if (val <= 200) {
      return {
        gradient: 'from-amber-950/70 via-yellow-950/30 to-slate-950/90',
        glow: 'shadow-amber-900/30 border-amber-500/30',
        badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        dialBg: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
        accentText: 'text-amber-400',
      };
    }
    if (val <= 300) {
      return {
        gradient: 'from-orange-950/70 via-red-950/30 to-slate-950/90',
        glow: 'shadow-orange-900/30 border-orange-500/30',
        badge: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
        dialBg: 'bg-orange-500/15 border-orange-500/30 text-orange-300',
        accentText: 'text-orange-400',
      };
    }
    // 301+ Crimson Emergency
    return {
      gradient: 'from-rose-950/85 via-red-950/60 to-slate-950',
      glow: 'shadow-rose-900/40 border-rose-500/40 shadow-2xl',
      badge: 'bg-rose-500/25 text-rose-200 border-rose-500/50 animate-pulse',
      dialBg: 'bg-rose-500/20 border-rose-500/40 text-rose-200',
      accentText: 'text-rose-400',
    };
  };

  const style = getSeverityStyle(aqi);

  // Recommended mask text for WhatsApp card
  const recommendedMask = aqi >= 300 
    ? "NIOSH N99 / FFP3 Respirator (Strict Airtight Seal)" 
    : aqi >= 150 
    ? "NIOSH N95 Dual-Headband Respirator" 
    : "Comfort Mask for Dusty Road Transit";

  // Build WhatsApp share URL
  const whatsAppMessage = t.whatsAppCard.template(
    data.city,
    aqi,
    data.category,
    cigarettesToday,
    weather.bestVentilationWindow || '1:00 PM – 3:30 PM',
    recommendedMask
  );
  const whatsAppUrl = `https://wa.me/?text=${encodeURIComponent(whatsAppMessage)}`;

  return (
    <div className={`w-full rounded-3xl backdrop-blur-xl bg-gradient-to-br ${style.gradient} border ${style.glow} p-6 sm:p-8 space-y-6 transition-all duration-300`}>
      {/* Top Row: Dial, Severity, City & Cigarettes Equivalent */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left: AQI Dial + City Info */}
        <div className="flex items-center gap-5 sm:gap-6">
          <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-3xl ${style.dialBg} border flex flex-col items-center justify-center p-3 shadow-inner shrink-0 relative overflow-hidden backdrop-blur-md`}>
            <span className="text-4xl sm:text-5xl font-black tracking-tighter leading-none text-white drop-shadow-md">
              {aqi}
            </span>
            <span className="text-[10px] uppercase tracking-widest font-bold mt-1 text-slate-300">
              AQI
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-semibold">
              {data.dominantPollutant}
            </span>
          </div>

          <div>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${style.badge} mb-2`}>
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? data.categoryHi : category}</span>
              {data.isSimulatedDemo && (
                <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded bg-rose-500/40 text-white uppercase font-extrabold">
                  Demo
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {language === 'hi' ? (data.city === 'Delhi NCR' ? 'दिल्ली एनसीआर' : data.city) : data.city}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-md mt-1 leading-snug">
              {aqi > 300 
                ? (language === 'hi' 
                    ? 'गंभीर स्मॉग आपातकाल: जहरीला धुआं फंसा है। बाहर निकलना रोकें, N95/N99 अनिवार्य है।' 
                    : 'Hazardous Smog Inversion: Ground-level inversion trapping toxic combustion soot. Seal all drafts.')
                : aqi > 150
                ? (language === 'hi'
                    ? 'अस्वस्थ हवा: संवेदनशील लोग घर के अंदर रहें और N95 मास्क का प्रयोग करें।'
                    : 'Unhealthy for sensitive groups. Restrict outdoor workouts to late afternoon.')
                : (language === 'hi' ? 'हवा संतोषजनक है।' : 'Moderate air quality. Safe for normal commute.')}
            </p>
          </div>
        </div>

        {/* Right: Cigarettes Equivalent Visualizer Card */}
        <div className="w-full lg:w-auto bg-black/40 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-3 min-w-[280px]">
          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
              <Cigarette className="w-4 h-4 text-rose-400" />
              <span>{t.cigsVisualizer.title}</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              Berkeley Earth
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-rose-400 drop-shadow">
              ~{cigarettesToday}
            </span>
            <span className="text-xs font-bold text-slate-200">
              {t.cigsVisualizer.perDay}
            </span>
          </div>

          {/* Visual Cigarette Counter Bar */}
          <div className="flex items-center gap-1 overflow-hidden" title={`${cigarettesToday} cigarettes per day equivalent`}>
            {Array.from({ length: Math.min(12, Math.ceil(cigarettesToday)) }).map((_, i) => (
              <span
                key={i}
                className="w-2.5 h-6 rounded-sm bg-gradient-to-t from-amber-600 via-amber-200 to-rose-500 shadow-sm inline-block"
              />
            ))}
            {cigarettesToday > 12 && (
              <span className="text-[11px] font-extrabold text-rose-300 pl-1">
                +{Math.round(cigarettesToday - 12)}
              </span>
            )}
          </div>

          <p className="text-[10px] text-slate-400 leading-tight">
            {t.cigsVisualizer.berkeleyNote}
          </p>
        </div>
      </div>

      {/* Middle Banner: High-Visibility Ventilation Window Banner */}
      <div className={`p-4 rounded-2xl border backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        weather.ventilationStatus === 'VENTILATE_NOW'
          ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-100'
          : 'bg-rose-950/60 border-rose-500/40 text-rose-100'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${
            weather.ventilationStatus === 'VENTILATE_NOW'
              ? 'bg-emerald-500/20 text-emerald-300'
              : 'bg-rose-500/20 text-rose-300 animate-pulse'
          }`}>
            {weather.ventilationStatus === 'VENTILATE_NOW' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <DoorClosed className="w-5 h-5" />
            )}
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider">
              {weather.ventilationStatus === 'VENTILATE_NOW' ? t.ventilateNow : t.sealRooms}
            </div>
            <div className="text-xs text-slate-300 font-mono mt-0.5">
              {t.ventilationWindow}: <strong>{weather.bestVentilationWindow || '1:00 PM – 3:30 PM (Solar Peak)'}</strong>
            </div>
          </div>
        </div>

        {/* Inversion Stagnation Badge */}
        <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-xl border border-white/10 text-xs text-slate-300">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>
            {t.inversionAlert}: <strong className="text-white">{weather.inversionRisk}</strong>
          </span>
        </div>
      </div>

      {/* Atmospheric Pollutant Breakdown Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] text-slate-400 uppercase tracking-wider font-bold">
          <span>{language === 'hi' ? 'प्रदूषक सघनता (µg/m³)' : 'Real-time Pollutant Concentrations (µg/m³)'}</span>
          <span className="font-mono text-slate-500">Source: {data.source}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {/* PM2.5 */}
          <div className="bg-black/30 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <span className="text-[11px] text-slate-400 font-bold block">PM2.5 (Soot)</span>
            <div className="text-lg font-black text-white mt-0.5">
              {pollutants.pm2_5} <span className="text-[10px] text-slate-400">µg</span>
            </div>
            <span className="text-[10px] text-rose-400 font-bold">
              {Math.round(pollutants.pm2_5 / 15)}x WHO Limit
            </span>
          </div>

          {/* PM10 */}
          <div className="bg-black/30 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <span className="text-[11px] text-slate-400 font-bold block">PM10 (Dust)</span>
            <div className="text-lg font-black text-white mt-0.5">
              {pollutants.pm10} <span className="text-[10px] text-slate-400">µg</span>
            </div>
            <span className="text-[10px] text-amber-400 font-bold">
              Road Resuspension
            </span>
          </div>

          {/* NO2 */}
          <div className="bg-black/30 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <span className="text-[11px] text-slate-400 font-bold block">NO₂ (Exhaust)</span>
            <div className="text-lg font-black text-white mt-0.5">
              {pollutants.no2} <span className="text-[10px] text-slate-400">µg</span>
            </div>
            <span className="text-[10px] text-slate-400">
              Vehicular Plumes
            </span>
          </div>

          {/* SO2 */}
          <div className="bg-black/30 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <span className="text-[11px] text-slate-400 font-bold block">SO₂ (Industrial)</span>
            <div className="text-lg font-black text-white mt-0.5">
              {pollutants.so2} <span className="text-[10px] text-slate-400">µg</span>
            </div>
            <span className="text-[10px] text-slate-400">
              Coal/Combustion
            </span>
          </div>

          {/* CO */}
          <div className="bg-black/30 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <span className="text-[11px] text-slate-400 font-bold block">CO (Incomplete)</span>
            <div className="text-lg font-black text-white mt-0.5">
              {pollutants.co} <span className="text-[10px] text-slate-400">mg</span>
            </div>
            <span className="text-[10px] text-slate-400">
              Low-heat Burning
            </span>
          </div>

          {/* O3 */}
          <div className="bg-black/30 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <span className="text-[11px] text-slate-400 font-bold block">O₃ (Smog Ozone)</span>
            <div className="text-lg font-black text-white mt-0.5">
              {pollutants.o3} <span className="text-[10px] text-slate-400">µg</span>
            </div>
            <span className="text-[10px] text-slate-400">
              Photochemical
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Action: Full-Width One-Tap WhatsApp "Family Smog Card" */}
      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share Family Smog Advisory Card on WhatsApp"
        className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-950/60 border border-emerald-400/30 transition transform active:scale-98"
      >
        <Share2 className="w-5 h-5" />
        <span>{t.whatsAppCard.buttonText}</span>
      </a>
    </div>
  );
};
