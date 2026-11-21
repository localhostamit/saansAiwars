import { SupportedLanguage } from '@/types/air';

export interface TranslationDictionary {
  appTitle: string;
  tagline: string;
  liveAqi: string;
  dominantPollutant: string;
  inversionAlert: string;
  ventilationWindow: string;
  sealRooms: string;
  ventilateNow: string;
  moderateVentilation: string;
  temperature: string;
  humidity: string;
  windSpeed: string;
  pressure: string;
  selectCity: string;
  customCity: string;
  demoMode: string;
  demoActive: string;
  liveMode: string;
  emergencyAlert: string;
  tabs: {
    protect: string;
    routine: string;
    hacks: string;
    impact: string;
    aiCompanion: string;
  };
  cigsVisualizer: {
    title: string;
    perDay: string;
    equivalent: string;
    berkeleyNote: string;
  };
  whatsAppCard: {
    buttonText: string;
    shareHeading: string;
    template: (city: string, aqi: number, category: string, cigs: number, window: string, mask: string) => string;
  };
  trustBadge: string;
  disclaimer: string;
  voiceMode: {
    listening: string;
    speakNow: string;
    unsupported: string;
    readAloud: string;
    stopReading: string;
  };
  gearGuideTitle: string;
  gearGuideSubtitle: string;
  filterByAqi: string;
  fitCheckTitle: string;
  routineTitle: string;
  routineSubtitle: string;
  iaqTitle: string;
  iaqSubtitle: string;
  impactTitle: string;
  impactSubtitle: string;
  aiAssistantTitle: string;
  aiAssistantPlaceholder: string;
  uploadFilterPhoto: string;
  analyzingImage: string;
  sourceNotice: string;
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    appTitle: "Saans",
    tagline: "Your Family's AI Shield Against Winter Smog & Urban Pollution",
    liveAqi: "Live Air Quality Index",
    dominantPollutant: "Dominant Pollutant",
    inversionAlert: "Thermal Inversion Stagnation",
    ventilationWindow: "Best Ventilation Window",
    sealRooms: "SEAL WINDOWS & DOORS NOW",
    ventilateNow: "SAFE TO CROSS-VENTILATE NOW",
    moderateVentilation: "SELECTIVE CRACK VENTILATION",
    temperature: "Temp",
    humidity: "Humidity",
    windSpeed: "Wind",
    pressure: "Pressure",
    selectCity: "Select City",
    customCity: "Search City or Coordinates",
    demoMode: "Demo 458+",
    demoActive: "Simulated Smog Emergency Active",
    liveMode: "Live",
    emergencyAlert: "HAZARDOUS WINTER INVERSION EMERGENCY",
    tabs: {
      protect: "Protect & Gear",
      routine: "Daily Routine",
      hacks: "Indoor Hacks",
      impact: "Health Impact",
      aiCompanion: "Saans AI"
    },
    cigsVisualizer: {
      title: "Daily Toxic Inhalation Equivalent",
      perDay: "cigs / day",
      equivalent: "Equivalent to smoking",
      berkeleyNote: "Based on Berkeley Earth PM2.5 epidemiological formula (22 µg/m³ ≈ 1 cigarette)"
    },
    whatsAppCard: {
      buttonText: "Share Family Smog Card on WhatsApp",
      shareHeading: "Family Smog Advisory",
      template: (city, aqi, category, cigs, window, mask) => 
`🚨 *SAANS SMOG ALERT: ${city.toUpperCase()}*
⚠️ *Current AQI:* ${aqi} (${category})
🚬 *Lung Toxicity:* Equivalent to *${cigs} cigarettes/day*
🪟 *Ventilation Window:* ${window}
🛡️ *Recommended Defense:* ${mask}
_Protect your family with Saans AI: http://localhost:3000_`
    },
    trustBadge: "CPCB/WHO Rules Engine • Explained by Gemini",
    disclaimer: "Informational & Preventive Guide — Not Medical Advice. Consult a physician for acute respiratory distress.",
    voiceMode: {
      listening: "Listening to your voice...",
      speakNow: "Tap mic and speak your question...",
      unsupported: "Voice input not supported on this browser",
      readAloud: "Read Aloud",
      stopReading: "Stop Voice"
    },
    gearGuideTitle: "AQI-Tiered Protection & Usage Protocols",
    gearGuideSubtitle: "Scientifically recommended equipment matched to current pollution severity with certified usage and seal-check guides.",
    filterByAqi: "Filter by Current AQI",
    fitCheckTitle: "Certified Seal & Maintenance Guide",
    routineTitle: "Smart Smog-Adaptive Daily Routine",
    routineSubtitle: "Re-sequencing your daily commute, exercise, and household schedule to cut lung exposure by up to 65%.",
    iaqTitle: "Indoor Air Quality Hacks & DIY Studio",
    iaqSubtitle: "Low-cost, physics-backed interventions to turn your home into a clean air sanctuary.",
    impactTitle: "Your Direct Health & Planet Impact",
    impactSubtitle: "Real-time quantification of toxic inhaled dose averted and community emissions prevented.",
    aiAssistantTitle: "Saans Mitr — GenAI Smog Assistant",
    aiAssistantPlaceholder: "Ask Saans about AQI, mask fit check, DIY filters, or child safety...",
    uploadFilterPhoto: "Analyze Purifier Filter Photo",
    analyzingImage: "Analyzing particulate saturation...",
    sourceNotice: "Atmospheric data processed from OpenWeather & Open-Meteo networks.",
  },

  hi: {
    appTitle: "साँस",
    tagline: "सर्दियों के स्मॉग और जहरीले प्रदूषण से आपके परिवार का AI सुरक्षा कवच",
    liveAqi: "लाइव वायु गुणवत्ता सूचकांक (AQI)",
    dominantPollutant: "प्रमुख प्रदूषक",
    inversionAlert: "थर्मल इन्वर्जन (हवा का ठहराव)",
    ventilationWindow: "खिड़कियां खोलने का सुरक्षित समय",
    sealRooms: "खिड़कियां और दरवाजे तुरंत सील करें",
    ventilateNow: "ताजा हवा के लिए खिड़कियां खोलें",
    moderateVentilation: "सीमित समय के लिए वेंटिलेशन",
    temperature: "तापमान",
    humidity: "नमी",
    windSpeed: "हवा की गति",
    pressure: "वायुदाब",
    selectCity: "शहर चुनें",
    customCity: "शहर खोजें या निर्देशांक दर्ज करें",
    demoMode: "डेमो 458+",
    demoActive: "स्मॉग आपातकाल सिमुलेशन सक्रिय",
    liveMode: "लाइव",
    emergencyAlert: "अत्यधिक गंभीर स्मॉग आपातकाल",
    tabs: {
      protect: "सुरक्षा एवं गियर",
      routine: "दैनिक दिनचर्या",
      hacks: "घरेलू नुस्खे",
      impact: "स्वास्थ्य प्रभाव",
      aiCompanion: "साँस मित्र AI"
    },
    cigsVisualizer: {
      title: "दैनिक जहरीली सांस का सिगरेट समतुल्य",
      perDay: "सिगरेट / दिन",
      equivalent: "सिगरेट पीने के बराबर जहर",
      berkeleyNote: "बर्कले अर्थ के वैज्ञानिक मानक अनुसार (22 µg/m³ PM2.5 = 1 सिगरेट)"
    },
    whatsAppCard: {
      buttonText: "व्हाट्सएप पर फैमिली स्मॉग कार्ड शेयर करें",
      shareHeading: "पारिवारिक स्मॉग चेतावनी",
      template: (city, aqi, category, cigs, window, mask) => 
`🚨 *साँस स्मॉग अलर्ट: ${city.toUpperCase()}*
⚠️ *वर्तमान AQI:* ${aqi} (${category})
🚬 *फेफड़ों पर असर:* प्रतिदिन *${cigs} सिगरेट* पीने के बराबर
🪟 *वेंटिलेशन समय:* ${window}
🛡️ *सुरक्षा निर्देश:* ${mask}
_अपने परिवार को सुरक्षित रखें - साँस AI: http://localhost:3000_`
    },
    trustBadge: "CPCB/WHO रूल्स इंजन • जेमिनी AI द्वारा विश्लेषित",
    disclaimer: "सूचनात्मक एवं बचाव गाइड — यह चिकित्सीय सलाह नहीं है। गंभीर लक्षण होने पर चिकित्सक से परामर्श लें।",
    voiceMode: {
      listening: "आपकी आवाज़ सुनी जा रही है...",
      speakNow: "माइक दबाकर अपना प्रश्न बोलें...",
      unsupported: "इस ब्राउज़र में वॉइस इनपुट उपलब्ध नहीं है",
      readAloud: "आवाज़ में सुनें",
      stopReading: "आवाज़ रोकें"
    },
    gearGuideTitle: "AQI अनुसार सुरक्षा उत्पाद और उपयोग निर्देश",
    gearGuideSubtitle: "वर्तमान प्रदूषण स्तर के अनुसार वैज्ञानिक रूप से अनुशंसित गियर, सही फिटिंग और सील-चेक निर्देश।",
    filterByAqi: "वर्तमान AQI अनुसार फ़िल्टर करें",
    fitCheckTitle: "प्रमाणित सील और रखरखाव गाइड",
    routineTitle: "स्मार्ट स्मॉग-अनुकूल दैनिक दिनचर्या",
    routineSubtitle: "कम्यूट, व्यायाम और घरेलू कार्यों के समय को बदलकर फेफड़ों में जाने वाले जहर को 65% तक कम करें।",
    iaqTitle: "घर की हवा शुद्ध करने के नुस्खे और DIY लैब",
    iaqSubtitle: "बिना महंगे प्यूरीफायर के भी घर की हवा को स्वच्छ रखने के आसान और वैज्ञानिक तरीके।",
    impactTitle: "आपका स्वास्थ्य और पर्यावरण प्रभाव खाता",
    impactSubtitle: "आपके निर्णयों से बचाए गए जहरीले कणों (PM2.5) और कार्बन उत्सर्जन का वास्तविक हिसाब।",
    aiAssistantTitle: "साँस मित्र — AI प्रदूषण परामर्शदाता",
    aiAssistantPlaceholder: "मास्क फिट टेस्ट, बच्चों की सुरक्षा, या DIY प्यूरीफायर के बारे में पूछें या बोलें...",
    uploadFilterPhoto: "फ़िल्टर या मास्क का फोटो जांचें",
    analyzingImage: "धूल और कालिख की सघनता जांची जा रही है...",
    sourceNotice: "ओपनवेदर और ओपन-मेटियो नेटवर्क से वायुमंडलीय डेटा प्राप्त।",
  },

  hinglish: {
    appTitle: "Saans",
    tagline: "Winter Smog & Toxic Air Se Family Ka AI Shield",
    liveAqi: "Live Air Quality Index",
    dominantPollutant: "Main Pollutant",
    inversionAlert: "Thermal Inversion (Hawa Ka Thehraav)",
    ventilationWindow: "Khidki Kholne Ka Safe Time",
    sealRooms: "KHIDKI & DOORS ABHI SEAL KAREIN",
    ventilateNow: "CROSS-VENTILATION KE LIYE SAFE HAI",
    moderateVentilation: "LIMITED TIME VENTILATION",
    temperature: "Temp",
    humidity: "Nami",
    windSpeed: "Hawa",
    pressure: "Pressure",
    selectCity: "City Select Karein",
    customCity: "City Search Karein",
    demoMode: "Demo 458+",
    demoActive: "Smog Emergency Simulation Active",
    liveMode: "Live",
    emergencyAlert: "HAZARDOUS WINTER SMOG EMERGENCY",
    tabs: {
      protect: "Protect & Gear",
      routine: "Daily Routine",
      hacks: "Indoor Hacks",
      impact: "Health Impact",
      aiCompanion: "Saans AI"
    },
    cigsVisualizer: {
      title: "Daily Toxic Air Cigarettes Barabar",
      perDay: "cigs / day",
      equivalent: "Smoking ke barabar intake",
      berkeleyNote: "Berkeley Earth scientific formula (22 µg/m³ PM2.5 = 1 cigarette)"
    },
    whatsAppCard: {
      buttonText: "WhatsApp Par Family Smog Card Share Karein",
      shareHeading: "Family Smog Advisory",
      template: (city, aqi, category, cigs, window, mask) => 
`🚨 *SAANS SMOG ALERT: ${city.toUpperCase()}*
⚠️ *Current AQI:* ${aqi} (${category})
🚬 *Lungs Par Asar:* Daily *${cigs} cigarettes* pine barabar!
🪟 *Ventilation Window:* ${window}
🛡️ *Recommended Mask:* ${mask}
_Apni family ko protect karein with Saans AI: http://localhost:3000_`
    },
    trustBadge: "CPCB/WHO Rules Engine • Explained by Gemini",
    disclaimer: "Informational & preventive guide — Medical advice nahi hai. Emergency me doctor se contact karein.",
    voiceMode: {
      listening: "Aapki voice suni ja rahi hai...",
      speakNow: "Mic tap karke question bolein...",
      unsupported: "Is browser me voice support nahi hai",
      readAloud: "Awaaz me sunein",
      stopReading: "Stop Awaaz"
    },
    gearGuideTitle: "AQI ke mutabiq Safety Products & Rules",
    gearGuideSubtitle: "Current pollution ke hisaab se certified masks, door seal tape and air cleaners.",
    filterByAqi: "Current AQI Se Filter Karein",
    fitCheckTitle: "Certified Mask Seal Check Guide",
    routineTitle: "Smart Smog-Adaptive Daily Routine",
    routineSubtitle: "Commute, workout aur routine optimize karke 65% exposure kam karein.",
    iaqTitle: "Ghar Ki Hawa Saaf Karne Ke DIY Hacks",
    iaqSubtitle: "Low-cost Corsi-Rosenthal box purifiers aur smart ventilation techniques.",
    impactTitle: "Aapka Health & Carbon Ledger",
    impactSubtitle: "Aapke smart choices se avoided PM2.5 soot aur carbon savings ka real math.",
    aiAssistantTitle: "Saans Mitr — AI Smog Companion",
    aiAssistantPlaceholder: "N95 mask fit, baby safety ya DIY purifiers ke bare me bolein ya type karein...",
    uploadFilterPhoto: "Filter Photo Check Karein",
    analyzingImage: "Dust aur soot saturation analyze ho raha hai...",
    sourceNotice: "OpenWeather aur Open-Meteo se telemetry data prapt.",
  },

  pa: {
    appTitle: "ਸਾਂਸ (Saans)",
    tagline: "ਸਰਦੀਆਂ ਦੇ ਸਮੋਗ ਅਤੇ ਪ੍ਰਦੂਸ਼ਣ ਤੋਂ ਪਰਿਵਾਰ ਦੀ ਏਆਈ ਢਾਲ",
    liveAqi: "ਲਾਈਵ ਏਅਰ ਕੁਆਲਿਟੀ ਇੰਡੈਕਸ (AQI)",
    dominantPollutant: "ਮੁੱਖ ਪ੍ਰਦੂਸ਼ਕ",
    inversionAlert: "ਥਰਮਲ ਇਨਵਰਜ਼ਨ (ਹਵਾ ਦਾ ਠਹਿਰਾਓ)",
    ventilationWindow: "ਤਾਜ਼ੀ ਹਵਾ ਲਈ ਸੁਰੱਖਿਅਤ ਸਮਾਂ",
    sealRooms: "ਬਾਰੀਆਂ ਅਤੇ ਦਰਵਾਜ਼ੇ ਤੁਰੰਤ ਬੰਦ ਰੱਖੋ",
    ventilateNow: "ਤਾਜ਼ੀ ਹਵਾ ਲਈ ਬਾਰੀਆਂ ਖੋਲ੍ਹਣ ਦਾ ਸਮਾਂ",
    moderateVentilation: "ਸੀਮਤ ਵੈਂਟੀਲੇਸ਼ਨ",
    temperature: "ਤਾਪਮਾਨ",
    humidity: "ਨਮੀ",
    windSpeed: "ਹਵਾ ਦੀ ਰਫ਼ਤਾਰ",
    pressure: "ਦਬਾਅ",
    selectCity: "ਸ਼ਹਿਰ ਚੁਣੋ",
    customCity: "ਸ਼ਹਿਰ ਖੋਜੋ",
    demoMode: "ਡੈਮੋ 458+",
    demoActive: "ਸਮੋਗ ਐਮਰਜੈਂਸੀ ਡੈਮੋ ਚਾਲੂ",
    liveMode: "ਲਾਈਵ",
    emergencyAlert: "ਗੰਭੀਰ ਸਮੋਗ ਐਮਰਜੈਂਸੀ ਅਲਰਟ",
    tabs: {
      protect: "ਸੁਰੱਖਿਆ ਗੀਅਰ",
      routine: "ਰੋਜ਼ਾਨਾ ਰੁਟੀਨ",
      hacks: "ਘਰੇਲੂ ਨੁਸਖੇ",
      impact: "ਸਿਹਤ ਅਸਰ",
      aiCompanion: "ਸਾਂਸ ਮਿੱਤਰ AI"
    },
    cigsVisualizer: {
      title: "ਰੋਜ਼ਾਨਾ ਪ੍ਰਦੂਸ਼ਣ ਦਾ ਸਿਗਰਟ ਬਰਾਬਰ ਅਸਰ",
      perDay: "ਸਿਗਰਟ / ਦਿਨ",
      equivalent: "ਸਿਗਰਟ ਪੀਣ ਦੇ ਬਰਾਬਰ ਜ਼ਹਿਰ",
      berkeleyNote: "ਬਰਕਲੇ ਅਰਥ ਫਾਰਮੂਲੇ ਅਨੁਸਾਰ (22 µg/m³ PM2.5 = 1 ਸਿਗਰਟ)"
    },
    whatsAppCard: {
      buttonText: "ਵ੍ਹਟਸਐਪ ਤੇ ਫੈਮਿਲੀ ਸਮੋਗ ਕਾਰਡ ਭੇਜੋ",
      shareHeading: "ਪਰਿਵਾਰਕ ਸਮੋਗ ਸਲਾਹ",
      template: (city, aqi, category, cigs, window, mask) => 
`🚨 *ਸਾਂਸ ਸਮੋਗ ਅਲਰਟ: ${city.toUpperCase()}*
⚠️ *ਮੌਜੂਦਾ AQI:* ${aqi} (${category})
🚬 *ਫੇਫੜਿਆਂ ਤੇ ਅਸਰ:* ਰੋਜ਼ਾਨਾ *${cigs} ਸਿਗਰਟਾਂ* ਦੇ ਬਰਾਬਰ
🪟 *ਬਾਰੀਆਂ ਖੋਲ੍ਹਣ ਦਾ ਸਮਾਂ:* ${window}
🛡️ *ਲੋੜੀਂਦਾ ਮਾਸਕ:* ${mask}
_ਸਾਂਸ AI ਨਾਲ ਪਰਿਵਾਰ ਨੂੰ ਬਚਾਓ: http://localhost:3000_`
    },
    trustBadge: "CPCB/WHO ਨਿਯਮ ਇੰਜਣ • ਜੈਮਿਨੀ ਏਆਈ ਵਿਸ਼ਲੇਸ਼ਣ",
    disclaimer: "ਜਾਣਕਾਰੀ ਅਤੇ ਬਚਾਅ ਗਾਈਡ — ਇਹ ਡਾਕਟਰੀ ਸਲਾਹ ਨਹੀਂ ਹੈ। ਗੰਭੀਰ ਤਕਲੀਫ਼ ਸਮੇਂ ਡਾਕਟਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।",
    voiceMode: {
      listening: "ਤੁਹਾਡੀ ਆਵਾਜ਼ ਸੁਣੀ ਜਾ ਰਹੀ ਹੈ...",
      speakNow: "ਮਾਈਕ ਦਬਾ ਕੇ ਸਵਾਲ ਬੋਲੋ...",
      unsupported: "ਇਸ ਬ੍ਰਾਊਜ਼ਰ ਤੇ ਵਾਇਸ ਇਨਪੁਟ ਉਪਲਬਧ ਨਹੀਂ ਹੈ",
      readAloud: "ਆਵਾਜ਼ ਵਿੱਚ ਸੁਣੋ",
      stopReading: "ਆਵਾਜ਼ ਰੋਕੋ"
    },
    gearGuideTitle: "AQI ਅਨੁਸਾਰ ਸੁਰੱਖਿਆ ਉਪਕਰਣ ਤੇ ਨਿਯਮ",
    gearGuideSubtitle: "ਮੌਜੂਦਾ ਪ੍ਰਦੂਸ਼ਣ ਅਨੁਸਾਰ N95 ਮਾਸਕ, ਸੀਲਿੰਗ ਟੇਪ ਅਤੇ ਪਿਊਰੀਫਾਇਰ ਦੀ ਸਹੀ ਵਰਤੋਂ।",
    filterByAqi: "ਮੌਜੂਦਾ AQI ਅਨੁਸਾਰ ਫਿਲਟਰ",
    fitCheckTitle: "ਮਾਸਕ ਫਿਟ ਚੈੱਕ ਗਾਈਡ",
    routineTitle: "ਸਮਾਰਟ ਸਮੋਗ-ਅਨੁਕੂਲ ਰੋਜ਼ਾਨਾ ਰੁਟੀਨ",
    routineSubtitle: "ਸਫ਼ਰ ਅਤੇ ਕੰਮ ਦੇ ਸਮੇਂ ਨੂੰ ਬਦਲ ਕੇ ਪ੍ਰਦੂਸ਼ਣ ਦੇ ਅਸਰ ਨੂੰ 65% ਘਟਾਓ।",
    iaqTitle: "ਘਰ ਦੀ ਹਵਾ ਸਾਫ਼ ਕਰਨ ਦੇ ਦੇਸੀ ਤਰੀਕੇ",
    iaqSubtitle: "ਘੱਟ ਖਰਚੇ ਵਿੱਚ ਕੋਰਸੀ-ਰੋਜ਼ਨਥਲ DIY ਪਿਊਰੀਫਾਇਰ ਅਤੇ ਵੈਂਟੀਲੇਸ਼ਨ ਨੁਸਖੇ।",
    impactTitle: "ਸਿਹਤ ਅਤੇ ਵਾਤਾਵਰਣ ਬੱਚਤ ਖਾਤਾ",
    impactSubtitle: "ਤੁਹਾਡੇ ਫ਼ੈਸਲਿਆਂ ਨਾਲ ਬਚਾਏ ਗਏ ਜ਼ਹਿਰੀਲੇ ਕਣਾਂ ਦਾ ਹਿਸਾਬ।",
    aiAssistantTitle: "ਸਾਂਸ ਮਿੱਤਰ — AI ਸਲਾਹਕਾਰ",
    aiAssistantPlaceholder: "ਮਾਸਕ, ਬੱਚਿਆਂ ਦੀ ਸੁਰੱਖਿਆ ਜਾਂ DIY ਫਿਲਟਰ ਬਾਰੇ ਪੁੱਛੋ...",
    uploadFilterPhoto: "ਫਿਲਟਰ ਦੀ ਫੋਟੋ ਜਾਂਚੋ",
    analyzingImage: "ਗੰਦਗੀ ਅਤੇ ਧੂੰਏਂ ਦੀ ਜਾਂਚ ਹੋ ਰਹੀ ਹੈ...",
    sourceNotice: "ਓਪਨਵੈਦਰ ਅਤੇ ਓਪਨ-ਮੇਟੀਓ ਤੋਂ ਮੌਸਮ ਡੇਟਾ।",
  },

  bn: {
    appTitle: "শ্বাস (Saans)",
    tagline: "শীতকালীন ধোঁয়াশা ও দূষণ থেকে আপনার পরিবারের এআই সুরক্ষা ঢাল",
    liveAqi: "লাইভ বায়ু মান সূচক (AQI)",
    dominantPollutant: "প্রধান দূষক",
    inversionAlert: "তাপীয় বিপর্যয় (বায়ুর স্থবিরতা)",
    ventilationWindow: "বাতাস চলাচলের নিরাপদ সময়",
    sealRooms: "ঘরের জানালা-দরজা এখনই বন্ধ রাখুন",
    ventilateNow: "জানালা খুলে বিশুদ্ধ বাতাস প্রবেশের সময়",
    moderateVentilation: "সীমিত বায়ু চলাচল",
    temperature: "তাপমাত্রা",
    humidity: "আর্দ্রতা",
    windSpeed: "বাতাসের গতি",
    pressure: "বায়ুচাপ",
    selectCity: "শহর নির্বাচন করুন",
    customCity: "শহর খুঁজুন",
    demoMode: "ডেমো 458+",
    demoActive: "স্মগ জরুরি অবস্থা ডেমো সক্রিয়",
    liveMode: "লাইভ",
    emergencyAlert: "মারাত্মক বায়ু দূষণ জরুরি অবস্থা",
    tabs: {
      protect: "সুরক্ষা ও গিয়ার",
      routine: "দৈনিক রুটিন",
      hacks: "ঘরোয়া উপায়",
      impact: "স্বাস্থ্য প্রভাব",
      aiCompanion: "শ্বাস মিত্র AI"
    },
    cigsVisualizer: {
      title: "দৈনিক বিষাক্ত নিঃশ্বাসের সিগারেট সমতুল্য",
      perDay: "সিগারেট / দিন",
      equivalent: "সিগারেট খাওয়ার সমান ক্ষতি",
      berkeleyNote: "বার্কলে আর্থ বৈজ্ঞানিক সূত্র অনুসারে (22 µg/m³ PM2.5 = ১টি সিগারেট)"
    },
    whatsAppCard: {
      buttonText: "হোয়াটসঅ্যাপে ফ্যামিলি স্মগ কার্ড শেয়ার করুন",
      shareHeading: "পারিবারিক ধোঁয়াশা সতর্কতা",
      template: (city, aqi, category, cigs, window, mask) => 
`🚨 *শ্বাস স্মগ অ্যালার্ট: ${city.toUpperCase()}*
⚠️ *বর্তমান AQI:* ${aqi} (${category})
🚬 *ফুসফুসে বিষক্রিয়া:* দৈনিক *${cigs}টি সিগারেট* খাওয়ার সমান!
🪟 *জানালা খোলার সময়:* ${window}
🛡️ *প্রস্তাবিত সুরক্ষা:* ${mask}
_শ্বাস এআই দিয়ে আপনার পরিবারকে সুরক্ষিত রাখুন: http://localhost:3000_`
    },
    trustBadge: "CPCB/WHO রুলস ইঞ্জিন • জেমিনি এআই বিশ্লেষিত",
    disclaimer: "তথ্য ও সুরক্ষামূলক নির্দেশিকা — এটি কোনো চিকিৎসকের পরামর্শ নয়। তীব্র উপসর্গে ডাক্তারের পরামর্শ নিন।",
    voiceMode: {
      listening: "আপনার কণ্ঠ শোনা হচ্ছে...",
      speakNow: "মাইক চেপে প্রশ্ন বলুন...",
      unsupported: "এই ব্রাউজারে ভয়েস ইনপুট সমর্থিত নয়",
      readAloud: "উচ্চস্বরে শুনুন",
      stopReading: "ভয়েস থামান"
    },
    gearGuideTitle: "AQI অনুযায়ী সুরক্ষামূলক সরঞ্জাম ও নির্দেশিকা",
    gearGuideSubtitle: "দূষণ মাত্রা অনুযায়ী N95 মাস্ক, ড্রাফট সিলিং এবং পিউরিফায়ারের সঠিক ব্যবহার।",
    filterByAqi: "বর্তমান AQI অনুযায়ী ফিল্টার",
    fitCheckTitle: "মাস্ক ফিটিং যাচাই গাইড",
    routineTitle: "স্মার্ট ধোঁয়াশা-অনুকূল দৈনিক রুটিন",
    routineSubtitle: "যাতায়াত ও দৈনন্দিন রুটিন পরিবর্তন করে ফুসফুসে দূষণ প্রবেশ ৬৫% হ্রাস করুন।",
    iaqTitle: "ঘরের বাতাস বিশুদ্ধ করার সহজ ঘরোয়া উপায়",
    iaqSubtitle: "স্বল্প খরচে করসি-রোজেনথাল ডিআইওয়াই পিউরিফায়ার ও সঠিক ভেন্টিলেশন পদ্ধতি।",
    impactTitle: "স্বাস্থ্য ও কার্বন সঞ্চয় হিসাব",
    impactSubtitle: "আপনার সচেতন সিদ্ধান্তের মাধ্যমে ফুসফুস রক্ষা ও কার্বন হ্রাসের সঠিক পরিসংখ্যান।",
    aiAssistantTitle: "শ্বাস মিত্র — এআই দূষণ সহকারী",
    aiAssistantPlaceholder: "মাস্কের ফিটিং, শিশুদের সুরক্ষা বা ডিআইওয়াই ফিল্টার সম্পর্কে জিজ্ঞাসা করুন...",
    uploadFilterPhoto: "ফিল্টারের ছবি পরীক্ষা করুন",
    analyzingImage: "ধুলো ও কালির ঘনত্ব বিশ্লেষণ করা হচ্ছে...",
    sourceNotice: "ওপেনওয়েদার এবং ওপেন-মেটিও নেটওয়ার্ক থেকে সংগৃহীত।",
  },

  mr: {
    appTitle: "श्वास (Saans)",
    tagline: "हिवाळ्यातील धूर आणि वायू प्रदूषणापासून कुटुंबाचे AI सुरक्षा कवच",
    liveAqi: "थेट हवा गुणवत्ता निर्देशांक (AQI)",
    dominantPollutant: "प्रमुख प्रदूषक",
    inversionAlert: "थर्मल इन्व्हर्जन (हवेचा अडथळा)",
    ventilationWindow: "खिडक्या उघडण्याची सुरक्षित वेळ",
    sealRooms: "खिडक्या आणि दारे त्वरित बंद ठेवा",
    ventilateNow: "हवेशीर करण्यासाठी खिडक्या उघडा",
    moderateVentilation: "मर्यादित वायुवीजन",
    temperature: "तापमान",
    humidity: "आर्द्रता",
    windSpeed: "वाऱ्याचा वेग",
    pressure: "हवेचा दाब",
    selectCity: "शहर निवडा",
    customCity: "शहर शोधा",
    demoMode: "डेमो 458+",
    demoActive: "स्मॉग आणीबाणी डेमो सक्रिय",
    liveMode: "थेट (Live)",
    emergencyAlert: "अतिगंभीर स्मॉग आणीबाणी इशारा",
    tabs: {
      protect: "सुरक्षा व गियर",
      routine: "दैनिक दिनचर्या",
      hacks: "घरगुती उपाय",
      impact: "आरोग्य परिणाम",
      aiCompanion: "श्वास मित्र AI"
    },
    cigsVisualizer: {
      title: "दैनिक प्रदूषित हवेचा सिगारेट समतुल्य",
      perDay: "सिगारेट / दिवस",
      equivalent: "सिगारेट ओढण्याइतके विषारी",
      berkeleyNote: "बर्कले अर्थ वैज्ञानिक सूत्रानुसार (22 µg/m³ PM2.5 = 1 सिगारेट)"
    },
    whatsAppCard: {
      buttonText: "व्हॉट्सॲपवर फॅमिली स्मॉग कार्ड शेअर करा",
      shareHeading: "कौटुंबिक स्मॉग सल्ला",
      template: (city, aqi, category, cigs, window, mask) => 
`🚨 *श्वास स्मॉग अलर्ट: ${city.toUpperCase()}*
⚠️ *सध्याचा AQI:* ${aqi} (${category})
🚬 *फुफ्फुसांवर परिणाम:* रोज *${cigs} सिगारेट* ओढण्याइतके नुकसान!
🪟 *खिडकी उघडण्याची वेळ:* ${window}
🛡️ *सुरक्षा सूचना:* ${mask}
_श्वास AI द्वारे आपल्या कुटुंबाचे रक्षण करा: http://localhost:3000_`
    },
    trustBadge: "CPCB/WHO नियम इंजिन • जेमिनी AI द्वारे विश्लेषित",
    disclaimer: "माहिती व प्रतिबंधात्मक मार्गदर्शक — हा वैद्यकीय सल्ला नाही. तीव्र त्रासात डॉक्टरांचा सल्ला घ्या.",
    voiceMode: {
      listening: "तुमचा आवाज ऐकला जात आहे...",
      speakNow: "माईक दाबून प्रश्न विचारा...",
      unsupported: "या ब्राउझरवर व्हॉइस इनपुट उपलब्ध नाही",
      readAloud: "मोठ्याने ऐका",
      stopReading: "आवाज थांबवा"
    },
    gearGuideTitle: "AQI नुसार सुरक्षा उत्पादने आणि नियम",
    gearGuideSubtitle: "प्रदूषण पातळीनुसार N95 मास्क, सीलिंग टेप आणि एअर प्युरिफायरचा योग्य वापर.",
    filterByAqi: "सध्याच्या AQI नुसार फिल्टर करा",
    fitCheckTitle: "मास्क फिटिंग तपासणी मार्गदर्शक",
    routineTitle: "स्मार्ट स्मॉग-अनुकूल दैनिक दिनचर्या",
    routineSubtitle: "प्रवास व कामाच्या वेळा बदलून फुफ्फुसात जाणारे प्रदूषण ६५% कमी करा.",
    iaqTitle: "घरातील हवा शुद्ध करण्याचे घरगुती उपाय",
    iaqSubtitle: "कमी खर्चात कोर्सी-रोझेंथल DIY प्युरिफायर आणि वायुवीजन तंत्र.",
    impactTitle: "आरोग्य व पर्यावरण बचत खाते",
    impactSubtitle: "तुमच्या स्मार्ट निर्णयांमुळे वाचलेले सूक्ष्म विषारी कण व कार्बन बचत.",
    aiAssistantTitle: "श्वास मित्र — AI प्रदूषण सल्लागार",
    aiAssistantPlaceholder: "मास्क फिट, लहान मुलांची सुरक्षा किंवा DIY फिल्टरबद्दल विचारा...",
    uploadFilterPhoto: "फिल्टरचा फोटो तपासा",
    analyzingImage: "धूळ आणि काजळीची घनता तपासली जात आहे...",
    sourceNotice: "ओपनवेदर आणि ओपन-मेटिओ नेटवर्कवरून डेटा प्राप्त.",
  }
};
