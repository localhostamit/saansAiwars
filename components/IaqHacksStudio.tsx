'use client';

import React, { useState } from 'react';
import { 
  Wrench, 
  Wind, 
  Layers, 
  Droplets, 
  Leaf, 
  Flame, 
  AlertTriangle, 
  CheckCircle2, 
  Calculator, 
  HelpCircle 
} from 'lucide-react';
import { IAQ_HACKS } from '@/lib/iaq-hacks';
import { translations } from '@/lib/translations';
import { SupportedLanguage } from '@/types/air';

interface IaqHacksStudioProps {
  language: SupportedLanguage;
}

export const IaqHacksStudio: React.FC<IaqHacksStudioProps> = ({ language }) => {
  const t = translations[language];

  // DIY Corsi-Rosenthal Box Interactive CADR Calculator state
  const [roomLengthFt, setRoomLengthFt] = useState<number>(15);
  const [roomWidthFt, setRoomWidthFt] = useState<number>(12);
  const [ceilingHeightFt, setCeilingHeightFt] = useState<number>(10);
  const [fanSpeed, setFanSpeed] = useState<'low' | 'med' | 'high'>('high');

  // Volume in cubic feet
  const roomVolumeCuFt = roomLengthFt * roomWidthFt * ceilingHeightFt;
  // Box fan estimated CFM: low=180, med=240, high=320
  const fanCfm = fanSpeed === 'high' ? 320 : fanSpeed === 'med' ? 240 : 180;
  // Air changes per hour (ACH) = (CFM * 60) / Volume
  const calculatedAch = Math.round(((fanCfm * 60) / roomVolumeCuFt) * 10) / 10;
  // Estimated minutes to drop PM2.5 by 80% (approx 3 to 4 air exchanges)
  const minutesToClean = Math.round((4 / calculatedAch) * 60);

  return (
    <section className="w-full space-y-8">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 mb-2">
              <Wrench className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'कम लागत वाले घरेलू नुस्खे' : 'Frugal Science Lab'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.iaqTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {t.iaqSubtitle}
            </p>
          </div>

          <div className="bg-indigo-950/60 border border-indigo-500/40 p-4 rounded-2xl shrink-0 self-start md:self-auto">
            <span className="text-[11px] font-extrabold text-indigo-300 uppercase tracking-wider block">
              {language === 'hi' ? 'लागत में बचत' : 'Cost Savings'}
            </span>
            <div className="text-2xl font-black text-indigo-400 mt-0.5">
              Save ₹15,000+
            </div>
          </div>
        </div>

        {/* Interactive Corsi-Rosenthal Box Purifier Calculator */}
        <div className="mt-6 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-indigo-500/30">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-indigo-300 text-xs font-extrabold uppercase tracking-wider">
                <Calculator className="w-4 h-4" />
                <span>{language === 'hi' ? 'कमरे अनुसार DIY प्यूरीफायर क्षमता कैलकुलेटर' : 'Corsi-Rosenthal Room CADR Calculator'}</span>
              </div>
              <h3 className="text-xl font-bold mt-1 text-white">
                {language === 'hi' ? 'अपने कमरे का आकार डालें और देखें हवा कितनी देर में साफ होगी' : 'Calculate Air Changes & Clean Time For Your Bedroom'}
              </h3>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-white/10 text-xs font-mono text-slate-300">
              Volume: {roomVolumeCuFt.toLocaleString()} ft³
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">
                {language === 'hi' ? 'कमरे की लंबाई (Feet)' : 'Room Length (ft)'}
              </label>
              <input
                type="number"
                min={8}
                max={40}
                value={roomLengthFt}
                onChange={(e) => setRoomLengthFt(Number(e.target.value) || 10)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">
                {language === 'hi' ? 'कमरे की चौड़ाई (Feet)' : 'Room Width (ft)'}
              </label>
              <input
                type="number"
                min={8}
                max={40}
                value={roomWidthFt}
                onChange={(e) => setRoomWidthFt(Number(e.target.value) || 10)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">
                {language === 'hi' ? 'छत की ऊंचाई (Feet)' : 'Ceiling Height (ft)'}
              </label>
              <input
                type="number"
                min={8}
                max={15}
                value={ceilingHeightFt}
                onChange={(e) => setCeilingHeightFt(Number(e.target.value) || 10)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">
                {language === 'hi' ? 'पंखे की गति (Speed)' : 'Fan Speed'}
              </label>
              <select
                value={fanSpeed}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFanSpeed(e.target.value as 'low' | 'med' | 'high')}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="high">{language === 'hi' ? 'तेज (High - 320 CFM)' : 'High (320 CFM)'}</option>
                <option value="med">{language === 'hi' ? 'मध्यम (Medium - 240 CFM)' : 'Medium (240 CFM)'}</option>
                <option value="low">{language === 'hi' ? 'धीमी (Low - 180 CFM)' : 'Low (180 CFM)'}</option>
              </select>
            </div>
          </div>

          {/* Calculator Output Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
            <div className="bg-black/40 p-4 rounded-xl border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-indigo-300 font-extrabold uppercase tracking-wider block">
                  {language === 'hi' ? 'हवा बदलने की दर (ACH)' : 'Air Changes Per Hour (ACH)'}
                </span>
                <span className="text-2xl font-black text-white mt-0.5 block">
                  {calculatedAch} ACH
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold">
                  {calculatedAch >= 5 ? '✓ Exceeds Hospital Grade Standards (5+ ACH)' : '✓ Good for residential clean room'}
                </span>
              </div>
            </div>

            <div className="bg-black/40 p-4 rounded-xl border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-indigo-300 font-extrabold uppercase tracking-wider block">
                  {language === 'hi' ? '80% प्रदूषण घटाने में लगा समय' : 'Time to 80% PM2.5 Clearance'}
                </span>
                <span className="text-2xl font-black text-emerald-400 mt-0.5 block">
                  ~{minutesToClean} Minutes
                </span>
                <span className="text-[11px] text-slate-300">
                  {language === 'hi' ? 'कमरे के दरवाजे व खिड़कियां बंद रहने पर' : 'With doors and drafts properly sealed'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* IAQ Hacks Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {IAQ_HACKS.map((hack) => (
          <div
            key={hack.id}
            className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-white/10 shadow-lg hover:border-indigo-500/40 transition space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                    {hack.type}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-400">
                    -{hack.reductionPercent}% PM2.5
                  </span>
                </div>
                <h3 className="text-lg font-black text-white mt-1.5">
                  {language === 'hi' ? hack.titleHi : hack.title}
                </h3>
              </div>

              {hack.cadrEstimate && (
                <div className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300 shrink-0">
                  {hack.cadrEstimate}
                </div>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'hi' ? hack.descriptionHi : hack.description}
            </p>

            {/* Materials List */}
            <div className="bg-black/40 p-3.5 rounded-2xl border border-white/10 text-xs space-y-1.5">
              <span className="font-extrabold text-white block text-[11px] uppercase tracking-wider">
                {language === 'hi' ? 'आवश्यक सामग्री (Materials):' : 'Required Materials:'}
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
                {(language === 'hi' ? hack.materialsHi : hack.materials).map((mat, i) => (
                  <li key={i}>{mat}</li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div className="text-xs space-y-2">
              <span className="font-extrabold text-white block text-[11px] uppercase tracking-wider">
                {language === 'hi' ? 'बनाने व उपयोग करने के चरण:' : 'Step-by-Step Instructions:'}
              </span>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-300 pl-1 leading-relaxed">
                {(language === 'hi' ? hack.stepsHi : hack.steps).map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>

            {/* Pro Tip */}
            <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-xs text-emerald-200 leading-snug">
              <strong>💡 {language === 'hi' ? 'विशेष सलाह:' : 'Pro-Tip:'}</strong>{' '}
              {language === 'hi' ? hack.proTipHi : hack.proTip}
            </div>

            {hack.warning && (
              <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/30 text-xs text-rose-200 leading-snug">
                <strong>⚠️ {language === 'hi' ? 'सावधानी:' : 'Caution:'}</strong>{' '}
                {language === 'hi' ? hack.warningHi : hack.warning}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
