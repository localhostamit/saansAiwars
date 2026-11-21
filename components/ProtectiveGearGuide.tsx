'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Glasses, 
  Wind, 
  Maximize2, 
  SquareCode, 
  Sparkles, 
  HeartPulse, 
  Gauge, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Tag, 
  Layers, 
  Award, 
  FileCheck 
} from 'lucide-react';
import { ProtectiveProduct, SupportedLanguage } from '@/types/air';
import { PROTECTIVE_PRODUCTS } from '@/lib/protective-products';
import { translations } from '@/lib/translations';

interface ProtectiveGearGuideProps {
  currentAqi: number;
  language: SupportedLanguage;
}

export const ProtectiveGearGuide: React.FC<ProtectiveGearGuideProps> = ({ currentAqi, language }) => {
  const t = translations[language];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedCardId, setExpandedCardId] = useState<string | null>('n95-headband-mask');
  const [filterByCurrentAqiOnly, setFilterByCurrentAqiOnly] = useState<boolean>(true);

  // Filter products
  const products = PROTECTIVE_PRODUCTS.filter((prod) => {
    if (filterByCurrentAqiOnly && currentAqi < prod.minAqi) {
      return false;
    }
    if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-rose-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      case 'Glasses': return <Glasses className="w-6 h-6 text-cyan-400" />;
      case 'Wind': return <Wind className="w-6 h-6 text-teal-400" />;
      case 'Maximize2': return <Maximize2 className="w-6 h-6 text-amber-400" />;
      case 'SquareCode': return <SquareCode className="w-6 h-6 text-purple-400" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-indigo-400" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-pink-400" />;
      default: return <Gauge className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <section className="w-full space-y-6">
      {/* Header with Trust Badge & Category Filters */}
      <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'वैज्ञानिक सुरक्षा उत्पाद' : 'Certified Protection Protocols'}</span>
              </span>

              {/* Strict Rules Engine Trust Badge */}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-blue-950/80 text-blue-300 border border-blue-500/40">
                <Award className="w-3.5 h-3.5 text-blue-400" />
                <span>{t.trustBadge}</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.gearGuideTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {t.gearGuideSubtitle}
            </p>
          </div>

          {/* Toggle for Current AQI Filtering */}
          <div className="flex items-center gap-3 bg-black/40 p-2.5 rounded-2xl border border-white/10 self-start md:self-auto">
            <span className="text-xs font-semibold text-slate-300">
              {language === 'hi' ? `वर्तमान AQI (${currentAqi}) अनुसार फ़िल्टर:` : `Match Live AQI (${currentAqi}):`}
            </span>
            <button
              onClick={() => setFilterByCurrentAqiOnly(!filterByCurrentAqiOnly)}
              aria-label="Toggle Current AQI Product Filter"
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                filterByCurrentAqiOnly ? 'bg-emerald-600' : 'bg-slate-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  filterByCurrentAqiOnly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-6">
          {[
            { id: 'all', label: language === 'hi' ? 'सभी उत्पाद' : 'All Products' },
            { id: 'mask', label: language === 'hi' ? 'मास्क एवं चश्मा' : 'Respirators & Eyewear' },
            { id: 'home-sealing', label: language === 'hi' ? 'दरवाजे/खिड़की सीलिंग' : 'Home Sealing' },
            { id: 'air-purifier', label: language === 'hi' ? 'प्यूरीफायर (HEPA)' : 'True HEPA Purifiers' },
            { id: 'health-barrier', label: language === 'hi' ? 'नाक व आंख सुरक्षा' : 'Nasal & Eye Barrier' },
            { id: 'monitor', label: language === 'hi' ? 'लेजर मॉनिटर' : 'Laser Monitors' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              aria-label={`Filter by category ${cat.label}`}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-900/50'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Master Card: Certified Mask Fit & Leakage Test Guide (Critical Education) */}
      <div className="bg-gradient-to-r from-emerald-950/90 via-teal-950/80 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-500/30 relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'जीवन रक्षक तकनीक: 15-सेकंड सील टेस्ट' : 'Life-Saving Fit Check Protocol'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {language === 'hi' 
                ? 'मास्क का कोई फायदा नहीं यदि किनारों से हवा लीक हो रही हो!' 
                : 'A Mask Is Useless If Air Leaks Around Your Cheeks!'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              {language === 'hi'
                ? 'साधारण कपड़े का मास्क या रुमाल PM2.5 को नहीं रोक सकता। N95 या FFP2 मास्क पहनते समय इन 2 चरणों से सील चेक करें:'
                : 'Sub-micron soot takes the path of least resistance. Cloth masks and handkerchiefs do not filter fine particulates. Follow this 15-second certified fit check whenever donning an N95:'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs font-medium">
              <div className="bg-black/40 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
                <strong className="block text-emerald-400 text-sm mb-1">
                  1. {language === 'hi' ? 'नेगेटिव प्रेशर टेस्ट (Inhale)' : 'Negative Pressure Inhale Test'}
                </strong>
                {language === 'hi'
                  ? 'मास्क को दोनों हाथों से छुए बिना ढंकें और तेजी से सांस अंदर खींचें। मास्क थोड़ा अंदर पिचकना चाहिए।'
                  : 'Cup both hands over mask and inhale sharply. The respirator should cup slightly inward with zero air leaking at perimeter.'}
              </div>
              <div className="bg-black/40 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
                <strong className="block text-emerald-400 text-sm mb-1">
                  2. {language === 'hi' ? 'पॉजिटिव प्रेशर टेस्ट (Exhale)' : 'Positive Pressure Exhale Test'}
                </strong>
                {language === 'hi'
                  ? 'सांस जोर से बाहर छोड़ें। यदि आंखों पर हवा लगे, तो नाक की धातु की पिन को दोनों हाथों की उंगलियों से नाक पर और कसें।'
                  : 'Blow out forcefully. If you feel warm air hitting your eyes or fogging glasses, re-shape the aluminum nose wire with two fingers.'}
              </div>
            </div>
          </div>

          <div className="bg-black/50 backdrop-blur-md p-5 rounded-2xl border border-emerald-500/30 text-center min-w-[200px] shrink-0">
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-300 block">
              {language === 'hi' ? 'कम्यूट सुरक्षा' : 'Commuter Defense'}
            </span>
            <span className="text-3xl font-black text-white block my-1">
              -95%
            </span>
            <span className="text-xs text-slate-300">
              {language === 'hi' ? 'फेफड़ों में जाने वाले PM2.5 में कमी' : 'Reduction in lung soot deposition'}
            </span>
          </div>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => {
          const isExpanded = expandedCardId === product.id;
          const isUrgentForCurrentAqi = currentAqi >= product.minAqi;

          return (
            <div
              key={product.id}
              className={`rounded-3xl border transition-all duration-200 overflow-hidden bg-slate-900/80 backdrop-blur-xl shadow-lg hover:shadow-2xl ${
                isUrgentForCurrentAqi
                  ? 'border-emerald-500/50 shadow-emerald-950/40'
                  : 'border-white/10'
              }`}
            >
              <div className="p-6">
                {/* Product Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                      {getIcon(product.iconName)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                          {language === 'hi' ? product.categoryHi : product.category}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-400">
                          {product.badge}
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-white mt-1">
                        {language === 'hi' ? product.nameHi : product.name}
                      </h3>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-white block">
                      {product.estimatedCost}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      AQI {product.minAqi}+
                    </span>
                  </div>
                </div>

                {/* Tagline & Description */}
                <p className="text-xs font-semibold text-emerald-400 mt-3">
                  {language === 'hi' ? product.taglineHi : product.tagline}
                </p>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {language === 'hi' ? product.descriptionHi : product.description}
                </p>

                {/* Expand / Collapse Toggle for Detailed Instructions */}
                <button
                  onClick={() => setExpandedCardId(isExpanded ? null : product.id)}
                  aria-label="Expand product usage instructions"
                  className="mt-4 w-full flex items-center justify-between text-xs font-bold text-slate-300 hover:text-emerald-400 py-2 border-t border-white/10 transition"
                >
                  <span>
                    {isExpanded 
                      ? (language === 'hi' ? 'निर्देश और सील-चेक छुपाएं' : 'Hide Instructions & Protocols')
                      : (language === 'hi' ? 'उपयोग निर्देश और सील-चेक गाइड देखें' : 'View Exact Usage & Maintenance Instructions')}
                  </span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {/* Collapsible Usage & Maintenance Section */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-dashed border-white/15 space-y-3.5 text-xs animate-in fade-in duration-200">
                    <div>
                      <h4 className="font-bold text-white mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {language === 'hi' ? 'सही उपयोग के चरण (Step-by-Step Instructions):' : 'Step-by-Step Usage Instructions:'}
                      </h4>
                      <ol className="list-decimal list-inside space-y-1.5 text-slate-300 pl-1 leading-relaxed">
                        {(language === 'hi' ? product.instructionsHi : product.instructions).map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </div>

                    <div className="bg-amber-950/40 p-3.5 rounded-2xl border border-amber-500/40">
                      <div className="font-bold text-amber-300 text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                        {language === 'hi' ? 'सील-चेक एवं रखरखाव प्रोटोकॉल' : 'Seal Check & Maintenance Rule'}
                      </div>
                      <p className="text-amber-200 text-xs leading-relaxed">
                        {language === 'hi' ? product.maintenanceOrSealCheckHi : product.maintenanceOrSealCheck}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Non-Medical Disclaimer Banner */}
      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center text-[11px] text-slate-400">
        ⚖️ {t.disclaimer}
      </div>
    </section>
  );
};
