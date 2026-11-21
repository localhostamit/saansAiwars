'use client';

import React from 'react';
import { Wind, MapPin, Globe, Sparkles, AlertOctagon, Activity } from 'lucide-react';
import { POPULAR_CITIES, CityPreset } from '@/lib/openmeteo';
import { translations } from '@/lib/translations';
import { SupportedLanguage } from '@/types/air';

interface NavbarProps {
  currentCity: CityPreset;
  onSelectCity: (city: CityPreset) => void;
  language: SupportedLanguage;
  onChangeLanguage: (lang: SupportedLanguage) => void;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
  aqi?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCity,
  onSelectCity,
  language,
  onChangeLanguage,
  isDemoMode,
  onToggleDemoMode,
  aqi = 0,
}) => {
  const t = translations[language];

  const languageOptions: Array<{ code: SupportedLanguage; label: string; native: string }> = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'hinglish', label: 'Hinglish', native: 'Hinglish' },
    { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/85 border-b border-white/10 shadow-lg shadow-black/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Logo & City Selector */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25">
              <Wind className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl sm:text-2xl tracking-tight text-white">
                  Saans <span className="text-emerald-400 font-serif font-medium text-lg">साँस</span>
                </span>
                <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                  Challenge 6
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block truncate max-w-xs">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* City Selector Dropdown */}
          <div className="relative flex items-center">
            <MapPin className="absolute left-2.5 w-3.5 h-3.5 text-emerald-400 pointer-events-none" />
            <select
              value={currentCity.name}
              onChange={(e) => {
                const found = POPULAR_CITIES.find((c) => c.name === e.target.value);
                if (found) onSelectCity(found);
              }}
              aria-label={t.selectCity}
              className="pl-8 pr-7 py-1.5 text-xs font-semibold rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 backdrop-blur-md shadow-sm transition cursor-pointer"
            >
              {POPULAR_CITIES.map((c) => (
                <option key={c.name} value={c.name} className="bg-slate-900 text-slate-100">
                  {language === 'hi' ? c.nameHi : c.name} ({c.country})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right: 6-Language Dropdown + Demo Mode Pill */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 6-Language Selector Dropdown */}
          <div className="relative flex items-center">
            <Globe className="absolute left-2.5 w-3.5 h-3.5 text-emerald-400 pointer-events-none" />
            <select
              value={language}
              onChange={(e) => onChangeLanguage(e.target.value as SupportedLanguage)}
              aria-label="Language Selector"
              className="pl-8 pr-6 py-1.5 text-xs font-bold rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 backdrop-blur-md shadow-sm transition cursor-pointer"
            >
              {languageOptions.map((opt) => (
                <option key={opt.code} value={opt.code} className="bg-slate-900 text-slate-100">
                  {opt.native} ({opt.label})
                </option>
              ))}
            </select>
          </div>

          {/* Demo Mode Pill Switch */}
          <button
            onClick={onToggleDemoMode}
            aria-label="Toggle Simulated Smog Emergency 458+ Mode"
            title="Toggle simulated hazardous winter inversion (AQI 458) for Hack2Skill testing"
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-extrabold tracking-wide border transition-all duration-300 shadow-md ${
              isDemoMode
                ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white border-rose-400 shadow-rose-900/50 animate-pulse'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
            }`}
          >
            {isDemoMode ? (
              <AlertOctagon className="w-3.5 h-3.5 text-white animate-spin" />
            ) : (
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
            )}
            <span>{isDemoMode ? t.demoMode : t.liveMode}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
