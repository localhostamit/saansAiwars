'use client';

import React from 'react';
import { 
  Flame, 
  Heart, 
  TrendingDown, 
  Award, 
  Leaf, 
  ShieldCheck, 
  Share2, 
  Info, 
  Cigarette, 
  CheckCircle2 
} from 'lucide-react';
import { ImpactSummary, SupportedLanguage } from '@/types/air';
import { translations } from '@/lib/translations';

interface ImpactLedgerProps {
  impact: ImpactSummary;
  language: SupportedLanguage;
}

export const ImpactLedger: React.FC<ImpactLedgerProps> = ({ impact, language }) => {
  const t = translations[language];

  return (
    <section className="w-full space-y-6">
      {/* Header with CPCB/WHO Rules Engine Trust Badge */}
      <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                <Award className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'प्रत्यक्ष स्वास्थ्य एवं पर्यावरण खाता' : 'Direct Health & Carbon Ledger'}</span>
              </span>

              {/* Strict Rules Engine Trust Badge */}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-blue-950/80 text-blue-300 border border-blue-500/40">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>{t.trustBadge}</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.impactTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {t.impactSubtitle}
            </p>
          </div>

          <div className="bg-black/40 p-4 rounded-2xl border border-white/10 flex items-center gap-3.5 self-start md:self-auto">
            <div className="text-right">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                {language === 'hi' ? 'सक्रिय सुरक्षा स्कोर' : 'Protection Score'}
              </span>
              <span className="text-2xl font-black text-emerald-400">
                {impact.activeMitigationScore}/100
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-lg">
              ✓
            </div>
          </div>
        </div>

        {/* Quantified Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
          {/* PM2.5 Micrograms Avoided */}
          <div className="bg-gradient-to-br from-emerald-950/60 to-teal-950/40 p-6 rounded-3xl border border-emerald-500/30 relative overflow-hidden">
            <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 w-fit mb-4">
              <TrendingDown className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              {language === 'hi' ? 'फेफड़ों में जाने से रोका गया जहर' : 'Toxic PM2.5 Inhalation Avoided'}
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white mt-1">
              {impact.dailyPm25DoseAvoidedUg.toLocaleString()} <span className="text-sm font-normal text-slate-400">µg</span>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {language === 'hi'
                ? 'N95 मास्क, सीलबंद कमरा और रूटीन री-सीक्वेंसिंग से फेफड़ों में जाने से बचाए गए सूक्ष्म कण।'
                : 'Micrograms of heavy-metal soot kept out of deep lung alveoli through timed exposure.'}
            </p>
          </div>

          {/* Cigarette Equivalents Averted */}
          <div className="bg-gradient-to-br from-amber-950/60 to-rose-950/40 p-6 rounded-3xl border border-amber-500/30 relative overflow-hidden">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40 w-fit mb-4">
              <Cigarette className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              {language === 'hi' ? 'सिगरेट के बराबर नुकसान से बचाव' : 'Cigarette Equivalents Avoided'}
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white mt-1">
              ~{impact.cigaretteEquivalentsAvoided} <span className="text-sm font-normal text-slate-400">{language === 'hi' ? 'सिगरेट / दिन' : 'Cigs / day'}</span>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {language === 'hi'
                ? 'बर्कले अर्थ मानक (22 µg/m³ = 1 सिगरेट) अनुसार दिनभर में बचाए गए सिगरेट समतुल्य।'
                : 'Based on the Berkeley Earth scientific equivalence of inhaled particulate soot.'}
            </p>
          </div>

          {/* Community Carbon & Soot Mitigated */}
          <div className="bg-gradient-to-br from-teal-950/60 to-cyan-950/40 p-6 rounded-3xl border border-teal-500/30 relative overflow-hidden">
            <div className="p-3 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/40 w-fit mb-4">
              <Leaf className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
              {language === 'hi' ? 'सामुदायिक कार्बन एवं टेलपाइप बचत' : 'Community Emissions Averted'}
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white mt-1">
              {impact.co2SavedKg} <span className="text-sm font-normal text-slate-400">kg CO₂</span>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {language === 'hi'
                ? 'अकेले कार या बाइक के बजाय मेट्रो / साझा इलेक्ट्रिक वाहन से रोकी गई जहरीली गैसें।'
                : 'Direct greenhouse emissions and NOx prevented by switching from private combustion transport.'}
            </p>
          </div>
        </div>

        {/* Community Action Card */}
        <div className="mt-8 p-6 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-bold text-sm sm:text-base text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>{language === 'hi' ? 'पड़ोस में खुला कूड़ा जलाने पर तुरंत रिपोर्ट करें' : 'Spot & Report Open Biomass / Garbage Burning'}</span>
            </h4>
            <p className="text-xs text-slate-300 max-w-xl">
              {language === 'hi'
                ? 'सर्दियों में एक जगह कचरा जलने से पूरे मोहल्ले का AQI 300 पॉइंट बढ़ जाता है। म्युनिसिपल ऐप (Sameer/311) पर फोटो अपलोड करें।'
                : 'Local garbage burning creates immediate micro-spikes of toxic dioxins. Report via CPCB Sameer App or municipal helpline.'}
            </p>
          </div>

          <a
            href="https://app.cpcbccr.com/AQI_India/"
            target="_blank"
            rel="noreferrer"
            aria-label="Open CPCB Sameer Portal to report violations"
            className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-lg shrink-0"
          >
            CPCB Sameer Portal ↗
          </a>
        </div>
      </div>

      {/* Non-Medical Disclaimer Banner */}
      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center text-[11px] text-slate-400">
        ⚖️ {t.disclaimer}
      </div>
    </section>
  );
};
