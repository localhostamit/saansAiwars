'use client';

import React, { useState } from 'react';
import { 
  Clock, 
  Bike, 
  Car, 
  Train, 
  Baby, 
  Users, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle 
} from 'lucide-react';
import { FamilyProfile, RoutineItem, SupportedLanguage } from '@/types/air';
import { generateDailyRoutine, DEFAULT_FAMILY_PROFILE } from '@/lib/routine-generator';
import { translations } from '@/lib/translations';

interface DailyRoutinePlannerProps {
  currentAqi: number;
  language: SupportedLanguage;
}

export const DailyRoutinePlanner: React.FC<DailyRoutinePlannerProps> = ({ currentAqi, language }) => {
  const t = translations[language];
  const [profile, setProfile] = useState<FamilyProfile>(DEFAULT_FAMILY_PROFILE);

  const routines: RoutineItem[] = generateDailyRoutine(currentAqi, profile);

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'Critical':
        return 'bg-rose-950/80 text-rose-300 border-rose-500/50 animate-pulse';
      case 'High':
        return 'bg-orange-950/80 text-orange-300 border-orange-500/50';
      case 'Moderate':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/50';
      default:
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50';
    }
  };

  return (
    <section className="w-full space-y-6">
      {/* Profile Customizer Header */}
      <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-950/80 text-teal-300 border border-teal-500/30 mb-2">
              <Clock className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'कम्यूट और रूटीन ऑप्टिमाइज़र' : 'Exposure Timing Engine'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.routineTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {t.routineSubtitle}
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="bg-emerald-950/60 border border-emerald-500/40 p-4 rounded-2xl shrink-0 self-start md:self-auto">
            <span className="text-[11px] font-extrabold text-emerald-300 uppercase tracking-wider block">
              {language === 'hi' ? 'अनुमानित फेफड़ों की सुरक्षा' : 'Inhaled Dose Avoided'}
            </span>
            <div className="text-2xl font-black text-emerald-400 mt-0.5">
              Up to 65% Less PM2.5
            </div>
          </div>
        </div>

        {/* Family & Commute Persona Customizer */}
        <div className="pt-6 space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            {language === 'hi' ? 'अपने परिवार की विशेषताएं चुनें (Tailor to Lifestyle):' : 'Customize to Your Family & Commute:'}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Infants / Toddlers */}
            <button
              onClick={() => setProfile({ ...profile, hasInfants: !profile.hasInfants })}
              aria-label="Toggle infant in family"
              className={`p-3.5 rounded-2xl border text-left transition flex items-center gap-3 ${
                profile.hasInfants
                  ? 'border-emerald-500 bg-emerald-950/50 text-white shadow-md'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              <div className={`p-2 rounded-xl ${profile.hasInfants ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                <Baby className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold block text-white">{language === 'hi' ? 'छोटे बच्चे (Infants)' : 'Infants / Kids'}</span>
                <span className="text-[10px] opacity-75">{language === 'hi' ? 'श्वसन दर 2x अधिक' : '2x higher respiration'}</span>
              </div>
            </button>

            {/* Elderly */}
            <button
              onClick={() => setProfile({ ...profile, hasElderly: !profile.hasElderly })}
              aria-label="Toggle senior in family"
              className={`p-3.5 rounded-2xl border text-left transition flex items-center gap-3 ${
                profile.hasElderly
                  ? 'border-emerald-500 bg-emerald-950/50 text-white shadow-md'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              <div className={`p-2 rounded-xl ${profile.hasElderly ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold block text-white">{language === 'hi' ? 'बुजुर्ग (Elderly)' : 'Seniors / Elderly'}</span>
                <span className="text-[10px] opacity-75">{language === 'hi' ? 'हृदय व फेफड़े संवेदनशील' : 'Vascular sensitivity'}</span>
              </div>
            </button>

            {/* Asthma / Respiratory */}
            <button
              onClick={() => setProfile({ ...profile, hasAsthma: !profile.hasAsthma })}
              aria-label="Toggle asthma vulnerability"
              className={`p-3.5 rounded-2xl border text-left transition flex items-center gap-3 ${
                profile.hasAsthma
                  ? 'border-emerald-500 bg-emerald-950/50 text-white shadow-md'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              <div className={`p-2 rounded-xl ${profile.hasAsthma ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold block text-white">{language === 'hi' ? 'अस्थमा / ब्रोंकाइटिस' : 'Asthma / COPD'}</span>
                <span className="text-[10px] opacity-75">{language === 'hi' ? 'स्पैज़्म व खांसी जोखिम' : 'Bronchospasm risk'}</span>
              </div>
            </button>

            {/* Commute Mode Selector */}
            <div className="relative">
              <select
                value={profile.commuteType}
                onChange={(e: any) => setProfile({ ...profile, commuteType: e.target.value })}
                className="w-full h-full p-3 text-xs font-bold rounded-2xl border border-white/10 bg-slate-900 text-white focus:ring-2 focus:ring-emerald-500"
                aria-label="Commute Type"
              >
                <option value="two-wheeler">{language === 'hi' ? '🛵 दोपहिया (Bike/Scooter)' : '🛵 Two-Wheeler / Bike'}</option>
                <option value="car-ac">{language === 'hi' ? '🚗 कार (Car / Cab)' : '🚗 Car / Cab'}</option>
                <option value="metro-walk">{language === 'hi' ? '🚇 मेट्रो / रेल (Metro)' : '🚇 Metro / Train'}</option>
                <option value="wfh">{language === 'hi' ? '🏠 वर्क फ्रॉम होम (WFH)' : '🏠 Work From Home'}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Routine Timeline Cards */}
      <div className="space-y-4">
        {routines.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-white/10 shadow-lg hover:border-emerald-500/40 transition flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
          >
            {/* Left: Time and Title */}
            <div className="space-y-2 lg:max-w-md">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/10 text-slate-200">
                  {item.timeRange}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getRiskBadge(item.exposureRisk)}`}>
                  {item.exposureRisk} Smog Risk
                </span>
              </div>

              <h4 className="text-lg font-black text-white">
                {language === 'hi' ? item.titleHi : item.title}
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'hi' ? item.rationaleHi : item.rationale}
              </p>
            </div>

            {/* Middle: Shift from Traditional -> Optimized */}
            <div className="w-full lg:max-w-lg bg-black/40 rounded-2xl p-4 border border-white/10 space-y-2.5 text-xs">
              <div className="flex items-start gap-2 text-rose-300">
                <span className="font-bold uppercase tracking-wider text-[10px] bg-rose-950/80 border border-rose-500/40 px-2 py-0.5 rounded shrink-0">
                  {language === 'hi' ? 'पारंपरिक आदत' : 'High-Risk Habit'}
                </span>
                <span className="line-through opacity-80 leading-tight">
                  {language === 'hi' ? item.traditionalHabitHi : item.traditionalHabit}
                </span>
              </div>

              <div className="flex items-start gap-2 text-emerald-300">
                <span className="font-bold uppercase tracking-wider text-[10px] bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded shrink-0">
                  {language === 'hi' ? 'साँस स्मार्ट विकल्प' : 'Saans Shield'}
                </span>
                <span className="font-semibold leading-tight">
                  {language === 'hi' ? item.optimizedAlternativeHi : item.optimizedAlternative}
                </span>
              </div>
            </div>

            {/* Right: Quantified Benefit */}
            <div className="flex lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto shrink-0 gap-2">
              <div className="text-right">
                <div className="text-2xl font-black text-emerald-400">
                  -{item.pm25ReductionPercent}%
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {language === 'hi' ? 'कम जहरीला धुआं' : 'Less Exposure'}
                </div>
              </div>

              {item.emissionsSavedKgCo2 > 0 && (
                <div className="px-2.5 py-1 rounded-xl bg-teal-950/80 text-teal-300 text-[11px] font-semibold border border-teal-500/40">
                  🌱 -{item.emissionsSavedKgCo2} kg CO₂
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
