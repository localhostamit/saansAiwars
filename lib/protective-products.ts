import { ProtectiveProduct } from '@/types/air';

export const PROTECTIVE_PRODUCTS: ProtectiveProduct[] = [
  // --- MASKS & PPE ---
  {
    id: 'n95-headband-mask',
    name: 'NIOSH-Approved N95 Respirator (Dual Headband)',
    nameHi: 'NIOSH-प्रमाणित N95 मास्क (डबल हेडबैंड)',
    category: 'mask',
    categoryHi: 'मास्क एवं सुरक्षा गियर',
    minAqi: 150,
    maxAqi: 1000,
    importance: 'Essential',
    badge: 'Gold Standard',
    tagline: 'Filters 95%+ of PM2.5 and microscopic soot particles',
    taglineHi: '95% से अधिक PM2.5 और कालिख के सूक्ष्म कणों को रोकता है',
    description: 'Electrostatic melt-blown filter media engineered to trap fine combustion particulates. Dual headbands provide significantly superior seal over ear-loop masks.',
    descriptionHi: 'इलेक्ट्रोस्टैटिक मेल्ट-ब्लोन फिल्टर जो महीन धुएं और सूक्ष्म धूल को रोकता है। कान के छल्ले वाले मास्क की तुलना में सिर के पीछे बंधने वाला डबल हेडबैंड मास्क चेहरे पर बिना किसी लीकेज के सही सील बनाता है।',
    instructions: [
      'Cup the respirator in your hand with the nosepiece at your fingertips, allowing headbands to hang freely.',
      'Position the respirator under your chin with the nosepiece up.',
      'Pull the top strap over your head, resting it high at the top back of your head.',
      'Pull the bottom strap over your head and position it around your neck below your ears.',
      'Place fingertips of both hands on the metal nosepiece and mold it firmly to the shape of your nose bridge (do not pinch with one hand).'
    ],
    instructionsHi: [
      'मास्क को हथेली में रखें ताकि नोजपिन उंगलियों की तरफ हो और पट्टियां नीचे लटक रही हों।',
      'मास्क को अपनी ठुड्डी पर लगाएं और नाक की तरफ ऊपर उठाएं।',
      'ऊपरी पट्टी को सिर के पीछे ऊपर की तरफ रखें।',
      'निचली पट्टी को सिर के ऊपर से ले जाकर गर्दन के पीछे कानों के नीचे सेट करें।',
      'दोनों हाथों की उंगलियों से धातु की नोजपिन को नाक की बनावट के अनुसार अच्छी तरह दबाकर सेट करें।'
    ],
    maintenanceOrSealCheck: 'FIT CHECK PROTOCOL: Cup both hands over mask without shifting position. Inhale sharply: the respirator should collapse slightly inward. Exhale sharply: no air should leak around eyes, cheeks, or chin. If air leaks at nose, readjust clip. Discard after 40 hours of use or if breathing becomes labored.',
    maintenanceOrSealCheckHi: 'सील-चेक टेस्ट: दोनों हाथों से मास्क को छुए बिना ढंकें। तेजी से सांस अंदर खींचें: मास्क थोड़ा अंदर पिचकना चाहिए। सांस छोड़ें: आंखों या गालों के पास से बिल्कुल हवा बाहर नहीं निकलनी चाहिए। 40 घंटे उपयोग के बाद या सांस लेने में भारीपन महसूस होने पर मास्क बदल दें।',
    iconName: 'ShieldAlert',
    estimatedCost: '₹50 - ₹150 / pc'
  },
  {
    id: 'n99-ffp3-respirator',
    name: 'N99 / FFP3 Heavy-Duty Respirator (Non-Valved)',
    nameHi: 'N99 / FFP3 हाई-ग्रेड रेस्पिरेटर',
    category: 'mask',
    categoryHi: 'मास्क एवं सुरक्षा गियर',
    minAqi: 300,
    maxAqi: 1000,
    importance: 'Essential',
    badge: 'Severe Smog Shield',
    tagline: '99% filtration efficiency for hazardous industrial smog & toxic winter inversions',
    taglineHi: 'खतरनाक स्मॉग और अत्यधिक जहरीली हवा में 99% तक सूक्ष्म कणों से सुरक्षा',
    description: 'High-density multi-layer filtration with activated carbon layer that adsorbs both toxic gaseous fumes (NO2/SO2) and ultrafine combustion soot.',
    descriptionHi: 'सक्रिय कार्बन (एक्टिवेटेड चारकोल) परत वाला बहुस्तरीय फिल्टर जो PM2.5 के साथ-साथ जहरीली गैसों (NO2, SO2) और दुर्गंध को भी सोखता है।',
    instructions: [
      'Mandatory for outdoor transit when AQI exceeds 300.',
      'Ensure a clean-shaven face where the respirator gasket contacts skin for a 100% airtight seal.',
      'Do not touch the front outer filter surface when removing.'
    ],
    instructionsHi: [
      'जब AQI 300 के पार हो तो घर से बाहर निकलते समय यह अनिवार्य है।',
      'मास्क के किनारों पर दाढ़ी के बाल न हों ताकि 100% एयरटाइट सील बन सके।',
      'मास्क उतारते समय सामने की गंदी सतह को हाथ न लगाएं, केवल पट्टियों से उतारें।'
    ],
    maintenanceOrSealCheck: 'Store in a clean, breathable paper envelope between uses. Never wash with water, alcohol, or soap as liquids permanently destroy the electrostatic charge.',
    maintenanceOrSealCheckHi: 'इस्तेमाल के बाद साफ कागज़ के लिफाफे में रखें। इसे कभी भी पानी, साबुन या सैनिटाइज़र से न धोएं, इससे इसका इलेक्ट्रोस्टैटिक चार्ज नष्ट हो जाता है।',
    iconName: 'ShieldCheck',
    estimatedCost: '₹180 - ₹350 / pc'
  },
  {
    id: 'wraparound-commuter-goggles',
    name: 'Airtight Wraparound Eye Protection Goggles',
    nameHi: 'एयरटाइट सुरक्षात्मक चश्मा (दोपहिया वाहन चालकों हेतु)',
    category: 'mask',
    categoryHi: 'मास्क एवं सुरक्षा गियर',
    minAqi: 250,
    maxAqi: 1000,
    importance: 'Highly Recommended',
    badge: 'Commuter Shield',
    tagline: 'Prevents toxic smog keratoconjunctivitis, burning, and corneal dryness',
    taglineHi: 'आंखों में जलन, लाली, सूखापन और स्मॉग से होने वाले संक्रमण से बचाव',
    description: 'Polycarbonate wraparound lenses with silicone perimeter gasket that seals completely around the eye sockets, shielding eyes from windborne soot.',
    descriptionHi: 'सिलिकॉन सील वाला सुरक्षा चश्मा जो आंखों के चारों ओर चिपक जाता है। बाइक, स्कूटर या ऑटो में यात्रा करते समय आंखों में धुआं और धूल जाने से पूरी तरह रोकता है।',
    instructions: [
      'Wear comfortably over prescription glasses or directly on skin.',
      'Adjust elastic strap behind the head so silicone rests flush against orbital bone without gaps.',
      'Combine with an N95 mask for complete two-wheeler facial defense.'
    ],
    instructionsHi: [
      'इसे सामान्य चश्मे के ऊपर या सीधे चेहरे पर पहनें।',
      'पीछे की पट्टी को कसें ताकि आंखों के कोनों से हवा अंदर न जा सके।',
      'N95 मास्क के साथ इसका उपयोग बाइक या स्कूटर यात्रा के दौरान सर्वोत्तम सुरक्षा देता है।'
    ],
    maintenanceOrSealCheck: 'Rinse with clean tap water and wipe with microfiber cloth. Anti-fog coating prevents fogging when breathing heavily into a mask.',
    maintenanceOrSealCheckHi: 'धूल जमने पर सादे पानी से धोएं और माइक्रोफाइबर कपड़े से पोंछें।',
    iconName: 'Glasses',
    estimatedCost: '₹199 - ₹499'
  },

  // --- HOME SEALING & HARDENING ---
  {
    id: 'epdm-weatherstrip-tape',
    name: 'Self-Adhesive EPDM Foam Window & Door Weatherstripping Tape',
    nameHi: 'विंडो और डोर वेदरस्ट्रिपिंग सीलिंग टेप',
    category: 'home-sealing',
    categoryHi: 'घर की सुरक्षा एवं सीलिंग',
    minAqi: 100,
    maxAqi: 1000,
    importance: 'Essential',
    badge: 'Cut Indoor PM by 50%',
    tagline: 'Seals microscopic perimeter gaps where outdoor toxic smog infiltrates rooms',
    taglineHi: 'खिड़कियों और दरवाजों की दरारों को बंद कर बाहर के प्रदूषण को अंदर आने से रोके',
    description: 'High-density closed-cell EPDM rubber with strong adhesive backing. Fills 2mm-6mm draft cracks around window frames and door jambs.',
    descriptionHi: 'मजबूत चिपकने वाला रबर फोम टेप जो खिड़कियों और दरवाजों की बारीक दरारों को सील करता है, जिससे बाहर का स्मॉग घर में दाखिल नहीं हो पाता।',
    instructions: [
      'Wipe down window/door frame tracks with rubbing alcohol or clean water to remove dust and dry completely.',
      'Measure window perimeter and cut weatherstripping tape to exact length.',
      'Peel protective paper tape gradually and press firmly along the edge where the sash meets the frame.',
      'Close window to test compression; there should be resistance, indicating an airtight seal.'
    ],
    instructionsHi: [
      'खिड़की या दरवाजे के फ्रेम को साफ कपड़े से पोंछकर धूल हटा लें।',
      'फ्रेम की लंबाई मापकर टेप को काटें।',
      'पीछे का स्टिकर हटाते हुए टेप को फ्रेम के किनारों पर मजबूती से दबाएं।',
      'खिड़की बंद करके देखें; बंद होते समय हल्का दबाव महसूस होना चाहिए जो सही सील का संकेत है।'
    ],
    maintenanceOrSealCheck: 'INSPECTION: On a windy or smoky day, hold an incense stick or light candle near window perimeter. If smoke wavers, add an extra layer of tape on that segment.',
    maintenanceOrSealCheckHi: 'जांच: खिड़की के पास अगरबत्ती या मोमबत्ती ले जाएं। यदि उसका धुआं हिलता है, तो उस जगह थोड़ा और सीलिंग टेप लगाएं।',
    iconName: 'Maximize2',
    estimatedCost: '₹149 - ₹299 (5-10 meters)'
  },
  {
    id: 'silicone-door-bottom-sweep',
    name: 'Multi-Fin Silicone Under-Door Draft Sweep',
    nameHi: 'दरवाजे के नीचे लगाने वाला सिलिकॉन ड्राफ्ट स्टॉपर',
    category: 'home-sealing',
    categoryHi: 'घर की सुरक्षा एवं सीलिंग',
    minAqi: 150,
    maxAqi: 1000,
    importance: 'Essential',
    badge: 'Draft Block',
    tagline: 'Eliminates the 1-2 inch bottom gap under entry doors where cold, dense smog flows inside',
    taglineHi: 'दरवाजे के नीचे की खाली जगह को पूरी तरह बंद कर ठंडी प्रदूषित हवा को रोकता है',
    description: 'Heavy-duty 3-layer silicone fin that sweeps across floor without scratching while blocking floor-level dense particulate ingress and road dust.',
    descriptionHi: 'तीन परतों वाला लचीला सिलिकॉन गार्ड जो फर्श को खरोंचे बिना दरवाजे के नीचे के 1 से 2 इंच के बड़े गैप को ब्लॉक कर देता है।',
    instructions: [
      'Close main door. Measure the width of door bottom.',
      'Cut sweep with kitchen shears to match door width.',
      'Clean bottom 2 inches of door with dry cloth.',
      'Peel adhesive, position sweep so bottom silicone fin lightly touches floor, and press firmly for 30 seconds.'
    ],
    instructionsHi: [
      'मुख्य दरवाजा बंद करें और नीचे की चौड़ाई मापें।',
      'कैंची से सिलिकॉन स्ट्रिप को दरवाजे की चौड़ाई अनुसार काटें।',
      'दरवाजे के निचले हिस्से को साफ कपड़े से पोंछें।',
      'स्टिकर हटाकर इस तरह चिपकाएं कि नीचे की परत फर्श को हल्का छू रही हो। 30 सेकंड तक दबाकर रखें।'
    ],
    maintenanceOrSealCheck: 'Ensure the bottom fin does not drag too hard or peel. Keeps room insulated and reduces purifier energy consumption by 35%.',
    maintenanceOrSealCheckHi: 'यह कमरे को सील रखता है जिससे कमरे का एयर प्यूरीफायर 35% कम बिजली में कमरे को पूरी तरह साफ कर देता है।',
    iconName: 'SquareCode',
    estimatedCost: '₹199 - ₹399'
  },

  // --- AIR PURIFIERS & MONITORING ---
  {
    id: 'true-hepa-h13-purifier',
    name: 'Certified True HEPA (H13) Air Purifier',
    nameHi: 'सर्टिफाइड ट्रू हेपा (H13) एयर प्यूरीफायर',
    category: 'air-purifier',
    categoryHi: 'एयर प्यूरीफायर एवं तकनीक',
    minAqi: 150,
    maxAqi: 1000,
    importance: 'Essential',
    badge: 'Safe Room Core',
    tagline: 'Captures 99.97% of particles down to 0.1 microns in an enclosed room',
    taglineHi: 'कमरे में 0.1 माइक्रोन तक के 99.97% हानिकारक कणों और धुएं का खात्मा',
    description: 'Medical-grade H13 mechanical filter combined with granular activated carbon for VOC and toxic gas adsorption. Crucial for bedrooms during sleep hours.',
    descriptionHi: 'हॉस्पिटल ग्रेड H13 मैकेनिकल फिल्टर और एक्टिवेटेड चारकोल जो जहरीले धुएं, परागकण और गैसों को सोखकर रात को सोते समय फेफड़ों को शुद्ध हवा देता है।',
    instructions: [
      'Place in the room where your family spends the most time (typically bedroom).',
      'Position at least 1.5 to 2 feet away from all walls and curtains to maximize 360-degree intake.',
      'Elevate slightly (on a nightstand or low stool) rather than floor corner for better breathing-zone air delivery.',
      'Keep all doors and windows strictly closed while running.',
      'Run at highest fan speed for first 30 minutes to rapidly drop PM2.5, then switch to medium/auto.'
    ],
    instructionsHi: [
      'इसे उस कमरे में रखें जहाँ परिवार सबसे ज्यादा समय बिताता है (जैसे बेडरूम)।',
      'दीवारों और पर्दों से कम से कम 1.5 से 2 फीट दूर रखें ताकि हवा का प्रवाह बाधित न हो।',
      'कोशिश करें कि यह फर्श के कोने में रखने के बजाय बेड की ऊंचाई वाली स्टूल या मेज पर हो।',
      'प्यूरीफायर चलते समय कमरे के दरवाजे और खिड़कियां पूरी तरह बंद रखें।',
      'शुरुआत के 30 मिनट फुल स्पीड पर चलाएं ताकि प्रदूषण तुरंत कम हो, फिर ऑटो या मध्यम मोड पर कर दें।'
    ],
    maintenanceOrSealCheck: 'MAINTENANCE PROTOCOL: 1) Open front cover every 14 days and vacuum the outer mesh pre-filter. 2) NEVER wash the HEPA filter with water (water collapses microscopic pores). 3) Replace main HEPA core every 4-6 months during heavy winter smog.',
    maintenanceOrSealCheckHi: 'रखरखाव: 1) हर 14 दिन में बाहरी जाली (प्री-फिल्टर) को सूखे कपड़े या वैक्यूम से साफ करें। 2) मुख्य HEPA फिल्टर को पानी से कभी न धोएं। 3) सर्दियों के भारी स्मॉग में 4 से 6 महीने में मुख्य फिल्टर बदलें।',
    iconName: 'Wind',
    estimatedCost: '₹6,000 - ₹18,000'
  },
  {
    id: 'laser-pm25-monitor',
    name: 'High-Precision Laser Scatter PM2.5 / PM10 Monitor',
    nameHi: 'सटीक लेजर सेंसर PM2.5 / PM10 एयर मॉनिटर',
    category: 'monitor',
    categoryHi: 'एयर प्यूरीफायर एवं तकनीक',
    minAqi: 50,
    maxAqi: 1000,
    importance: 'Highly Recommended',
    badge: 'Real-time Truth',
    tagline: 'Reveals true microgram/m³ pollution levels inside rooms vs outside',
    taglineHi: 'घर के अंदर और बाहर वास्तविक प्रदूषण (माइक्रोग्राम/घन मीटर) की सटीक जांच',
    description: 'Uses optical laser scattering to count particulate density in real-time, verifying whether your room sealing and purifiers are actually working.',
    descriptionHi: 'लेजर तकनीक से हवा में तैरते बारीक कणों को गिनकर तुरंत बताता है कि आपके घर की सीलिंग और प्यूरीफायर कितना काम कर रहे हैं।',
    instructions: [
      'Take reading inside bedroom with doors closed, then take reading near entrance or balcony for baseline.',
      'Target indoor PM2.5 below 25 µg/m³ (WHO safe threshold).',
      'Use readings to know precisely when to change purifier fan speed or replace worn filters.'
    ],
    instructionsHi: [
      'कमरा बंद करके अंदर की रीडिंग लें, फिर बालकनी में ले जाकर बाहर की रीडिंग से तुलना करें।',
      'लक्ष्य: घर के अंदर PM2.5 स्तर 25 µg/m³ से कम रहना चाहिए (WHO सुरक्षित मानक)।',
      'इसकी रीडिंग देखकर ही तय करें कि प्यूरीफायर की स्पीड बढ़ानी है या फिल्टर बदलना है।'
    ],
    maintenanceOrSealCheck: 'Calibrate in clean outdoor air once a month. Avoid blowing tobacco smoke directly into sensor inlet.',
    maintenanceOrSealCheckHi: 'महीने में एक बार साफ हवा में 5 मिनट रखकर री-कैलिब्रेट करें। सीधे सेंसर के मुंह में सिगरेट या अगरबत्ती का गाढ़ा धुआं न डालें।',
    iconName: 'Gauge',
    estimatedCost: '₹2,500 - ₹5,500'
  },

  // --- HEALTH & MUCOSAL BARRIER ---
  {
    id: 'isotonic-saline-nasal-rinse',
    name: 'Isotonic Sterile Saline Nasal Spray & Rinse Kit',
    nameHi: 'आइसोटोनिक सलाइन नेज़ल स्प्रे एवं जल नेति किट',
    category: 'health-barrier',
    categoryHi: 'स्वास्थ्य एवं प्राकृतिक सुरक्षा',
    minAqi: 150,
    maxAqi: 1000,
    importance: 'Essential',
    badge: 'Lung Cilia Defense',
    tagline: 'Flushes trapped heavy-metal soot and PM2.5 out of nasal passages and sinuses',
    taglineHi: 'नाक की श्लेष्मा झिल्ली और साइनस में फंसे जहरीले धुएं और धूल को धोकर साफ करें',
    description: 'Buffered 0.9% sterile sodium chloride solution that hydrates mucus membranes, prevents nosebleeds from dry winter smog, and removes trapped particulates before they reach lungs.',
    descriptionHi: 'हल्का नमकीन स्टेराइल घोल जो नाक की सुरक्षात्मक झिल्ली को नम रखता है, खून आने से रोकता है और सांस नली में फंसे जहरीले कणों को फेफड़ों तक पहुंचने से पहले धो देता है।',
    instructions: [
      'Use immediately upon returning home from commute or school.',
      'Tilt head forward over sink, insert nozzle into nostril, and spray 2-3 pumps while breathing gently through mouth.',
      'Blow nose gently into a clean tissue to expel discolored mucus and trapped soot.',
      'Repeat on opposite nostril. Safe for daily use across children and elderly.'
    ],
    instructionsHi: [
      'सड़क, ऑफिस या स्कूल से घर लौटने के तुरंत बाद इसका उपयोग करें।',
      'वॉशबेसिन के ऊपर सिर को आगे झुकाएं, नोज़ल को नाक में लगाएं और मुंह से सांस लेते हुए 2-3 बार स्प्रे करें।',
      'नाक को धीरे से साफ करें ताकि जमा हुआ काला धुआं और बलगम बाहर निकल जाए।',
      'दूसरी नासिका में भी दोहराएं। यह बच्चों और बुजुर्गों के लिए पूरी तरह सुरक्षित है।'
    ],
    maintenanceOrSealCheck: 'Never use unboiled tap water for nasal irrigation. Keep nozzle tip sterile by wiping with alcohol pad after each use.',
    maintenanceOrSealCheckHi: 'नाक धोने के लिए कभी भी कच्चा नल का पानी इस्तेमाल न करें। इस्तेमाल के बाद नोज़ल को साफ कपड़े से पोंछकर ढक्कन लगाएं।',
    iconName: 'Sparkles',
    estimatedCost: '₹120 - ₹250'
  },
  {
    id: 'carboxy-eye-drops',
    name: 'Carboxymethylcellulose Lubricating Protective Eye Drops',
    nameHi: 'सुरक्षात्मक लुब्रिकेटिंग आई ड्रॉप्स (आंखों की सुरक्षा)',
    category: 'health-barrier',
    categoryHi: 'स्वास्थ्य एवं प्राकृतिक सुरक्षा',
    minAqi: 200,
    maxAqi: 1000,
    importance: 'Highly Recommended',
    badge: 'Smog Burn Relief',
    tagline: 'Creates a protective tears barrier against photochemical oxidants and acidic smog fumes',
    taglineHi: 'एसिडिक स्मॉग और ओजोन से आंखों में होने वाली जलन और चुभन से सुरक्षा कवच',
    description: 'Preservative-free artificial tear drops that restore the ocular tear film broken down by sulfur dioxide, nitrogen oxides, and fine soot.',
    descriptionHi: 'आर्टिफिशियल टीयर्स जो स्मॉग में मौजूद सल्फर डाइऑक्साइड और नाइट्रोजन ऑक्साइड द्वारा आंखों की प्राकृतिक नमी को सुखाए जाने से बचाते हैं।',
    instructions: [
      'Instill 1 to 2 drops in each eye before heading out on daily commute, and repeat after returning.',
      'Do not rub burning eyes with dirty hands, as soot particles will scratch the cornea.',
      'Wash face and splash cool filtered water on closed eyes before instilling drops.'
    ],
    instructionsHi: [
      'घर से बाहर निकलने से पहले और लौटने के बाद दोनों आंखों में 1-2 बूंद डालें।',
      'जलन होने पर आंखों को हाथों से न रगड़ें, इससे कालिख के कण कॉर्निया को खरोंच सकते हैं।',
      'ड्रॉप डालने से पहले साफ ठंडे पानी से चेहरे को धो लें।'
    ],
    maintenanceOrSealCheck: 'Discard bottle 30 days after opening to prevent microbial contamination.',
    maintenanceOrSealCheckHi: 'बोतल खोलने के 30 दिन बाद नई बोतल लें ताकि बैक्टीरिया का खतरा न रहे।',
    iconName: 'HeartPulse',
    estimatedCost: '₹90 - ₹220'
  }
];

/**
 * Retrieves certified protective equipment and environmental intervention products
 * recommended for a specific Air Quality Index threshold.
 *
 * @param aqi - Real-time Air Quality Index value
 * @returns Filtered array of applicable protective products
 */
export function getRecommendedProductsForAqi(aqi: number): ProtectiveProduct[] {
  return PROTECTIVE_PRODUCTS.filter(p => aqi >= p.minAqi);
}
