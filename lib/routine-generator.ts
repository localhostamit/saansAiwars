import { RoutineItem, FamilyProfile } from '@/types/air';

export const DEFAULT_FAMILY_PROFILE: FamilyProfile = {
  id: 'family-1',
  name: 'Our Family',
  hasInfants: true,
  hasElderly: true,
  hasAsthma: false,
  isPregnant: false,
  commuteType: 'two-wheeler',
};

export function generateDailyRoutine(
  currentAqi: number,
  profile: FamilyProfile = DEFAULT_FAMILY_PROFILE
): RoutineItem[] {
  const isSevere = currentAqi >= 300;
  const isPoor = currentAqi >= 150;

  return [
    {
      id: 'routine-morning-exercise',
      timeRange: '06:00 AM – 07:30 AM',
      title: 'Morning Fitness & Movement',
      titleHi: 'सुबह का व्यायाम और सैर',
      exposureRisk: isSevere ? 'Critical' : isPoor ? 'High' : 'Moderate',
      traditionalHabit: 'Outdoor jogging or park brisk walk during early morning chill',
      traditionalHabitHi: 'सुबह की ठंड में पार्क में दौड़ना या खुली हवा में तेज टहलना',
      optimizedAlternative: isSevere
        ? 'Strictly indoor stretching, yoga, or stationary cycling in a sealed room with air purifier running'
        : 'Indoor core workout; postpone outdoor walk until after 1:00 PM when atmospheric inversion disperses',
      optimizedAlternativeHi: isSevere
        ? 'कमरे को सील कर एयर प्यूरीफायर चालू करके अंदर ही योग या स्ट्रेचिंग करें; सुबह बाहर बिल्कुल न जाएं'
        : 'घर के अंदर व्यायाम करें; बाहर टहलने के लिए दोपहर 1:00 बजे के बाद का समय चुनें जब धूप खिलती है',
      rationale: 'During early morning, nighttime thermal inversion traps all ground-level vehicle exhaust and industrial smoke under a cold atmospheric lid.',
      rationaleHi: 'सुबह के समय ठंडी हवा जमीन के पास भारी होकर बैठ जाती है जिससे धुआं और धूल जमीन पर ही फंस जाते हैं। गहरी सांस लेने से यह जहर सीधे फेफड़ों में जाता है।',
      pm25ReductionPercent: isSevere ? 75 : 50,
      emissionsSavedKgCo2: 0,
      category: 'exercise',
    },
    {
      id: 'routine-morning-commute',
      timeRange: '08:00 AM – 09:30 AM',
      title: 'School & Work Commute',
      titleHi: 'स्कूल और ऑफिस की यात्रा (कम्यूट)',
      exposureRisk: isSevere ? 'Critical' : 'High',
      traditionalHabit: profile.commuteType === 'two-wheeler' 
        ? 'Open bike/scooter ride with normal cloth handkerchief over face'
        : 'Car travel in stop-and-go bumper traffic with AC drawing fresh outside air',
      traditionalHabitHi: profile.commuteType === 'two-wheeler'
        ? 'बाइक या स्कूटर पर केवल रुमाल या साधारण कपड़े का मास्क बांधकर निकलना'
        : 'गाड़ी में बैठना लेकिन एसी में फ्रेश एयर मोड ऑन रखना जिससे बाहर का धुआं अंदर आता है',
      optimizedAlternative: profile.commuteType === 'two-wheeler'
        ? 'Wear certified NIOSH N95 dual-headband mask + wraparound goggles; or switch to Delhi Metro / AC EV feeder bus'
        : 'Set car ventilation to STRICT RECIRCULATION (Internal Cabin Air); check cabin HEPA filter; shift commute departure by 30 mins to avoid gridlock idling',
      optimizedAlternativeHi: profile.commuteType === 'two-wheeler'
        ? 'प्रमाणित N95 मास्क और सुरक्षा चश्मा पहनें, या खुले दोपहिया के बजाय मेट्रो या बंद बस का उपयोग करें'
        : 'कार एसी को केवल इंटरनल रीसर्कुलेशन (Internal Recirculation) पर चलाएं और जाम से बचने के लिए समय 30 मिनट पहले या बाद रखें',
      rationale: 'Bumper-to-bumper morning traffic produces intense localized micro-plumes of NOx and black carbon. Recirculation reduces cabin PM2.5 by 80%.',
      rationaleHi: 'ट्रैफिक जाम में गाड़ियों के साइलेंसर से निकलने वाला धुआं सबसे खतरनाक होता है। कार को रीसर्कुलेशन मोड पर रखने से केबिन के अंदर प्रदूषण 80% घट जाता है।',
      pm25ReductionPercent: 65,
      emissionsSavedKgCo2: 2.4,
      category: 'commute',
    },
    {
      id: 'routine-afternoon-ventilation',
      timeRange: '01:00 PM – 03:00 PM',
      title: 'Home Ventilation & Sunlight Window',
      titleHi: 'घर का वेंटिलेशन और धूप की खिड़की',
      exposureRisk: isSevere ? 'Moderate' : 'Low',
      traditionalHabit: 'Keeping windows shut 24/7 causing indoor CO2 buildup, or opening windows randomly at 7 AM',
      traditionalHabitHi: 'दिनभर खिड़कियां बंद रखना जिससे कमरे में CO2 और भारीपन बढ़ जाता है, या सुबह 7 बजे खिड़की खोल देना',
      optimizedAlternative: isSevere
        ? 'Crack open one sheltered courtyard window for 20 minutes only, then re-seal and run purifier on turbo'
        : 'Open opposite windows for 45 minutes of cross-ventilation to flush out indoor radon and cooking VOCs during solar peak',
      optimizedAlternativeHi: isSevere
        ? 'केवल 20 मिनट के लिए किसी छायादार खिड़की को हल्का खोलें, फिर तुरंत बंद करके प्यूरीफायर तेज चलाएं'
        : 'दोपहर 1 से 3 बजे के बीच दोनों तरफ की खिड़कियां 45 मिनट के लिए खोलें ताकि धूप के कारण हवा हल्की होने पर कमरे की बासी हवा निकल जाए',
      rationale: 'Solar radiation warms the ground, expanding the planetary boundary layer from 200m to 1200m and diluting particulate concentration significantly.',
      rationaleHi: 'दोपहर में धूप से जमीन गर्म होती है और प्रदूषित हवा ऊपर उठती है, जिससे जमीन के पास प्रदूषण दिन के सबसे निचले स्तर पर होता है।',
      pm25ReductionPercent: 40,
      emissionsSavedKgCo2: 0,
      category: 'ventilation',
    },
    {
      id: 'routine-evening-cooking',
      timeRange: '06:30 PM – 08:30 PM',
      title: 'Kitchen & Dinner Preparation',
      titleHi: 'रसोई और रात्रि भोजन की तैयारी',
      exposureRisk: 'High',
      traditionalHabit: 'Deep frying or tadka in open pan without exhaust, dry-sweeping kitchen floor afterwards',
      traditionalHabitHi: 'बिना एग्जॉस्ट चलाए तेज आंच पर तड़का लगाना या तलना, और फिर सूखे झाड़ू से फर्श साफ करना',
      optimizedAlternative: 'Turn exhaust fan ON 3 mins before igniting stove. Use lids on pans, steam/pressure-cook instead of smoking oils. Wet mop kitchen floor only.',
      optimizedAlternativeHi: 'गैस जलाने से 3 मिनट पहले एग्जॉस्ट फैन चलाएं। कढ़ाई को ढंककर पकाएं। झाड़ू के बजाय गीले पोछे से फर्श साफ करें ताकि धूल न उड़े।',
      rationale: 'High-heat oil frying generates ultrafine PM2.5 spikes up to 800 µg/m³ indoors. Dry sweeping resuspends settled toxic particulates into breathing air.',
      rationaleHi: 'तेल के धुएं से घर के अंदर PM2.5 अचानक 800 तक पहुंच जाता है। सूखा झाड़ू लगाने से जमीन पर बैठी हुई जहरीली धूल फिर से सांस में घुल जाती है।',
      pm25ReductionPercent: 55,
      emissionsSavedKgCo2: 0.8,
      category: 'cooking',
    },
    {
      id: 'routine-night-safe-room',
      timeRange: '09:30 PM – 06:00 AM',
      title: 'Safe Room Sleep Protocol',
      titleHi: 'सुरक्षित कमरा (Safe Room) और नींद प्रोटोकॉल',
      exposureRisk: isSevere ? 'Critical' : 'Moderate',
      traditionalHabit: 'Sleeping with unsealed window drafts, ceiling fan stirring settled dust, no nasal clearing',
      traditionalHabitHi: 'खिड़की की दरारों से आती ठंडी हवा में सोना, तेज पंखा चलाकर धूल उड़ाना, बिना नाक साफ किए सो जाना',
      optimizedAlternative: 'Seal bedroom draft with under-door strip. Do a saline nasal rinse before bed. Run HEPA purifier at lowest silent speed at headboard level.',
      optimizedAlternativeHi: 'दरवाजे के नीचे ड्राफ्ट सील लगाएं। सोने से पहले सलाइन स्प्रे से नाक साफ करें। बेड के पास धीमी आवाज में एयर प्यूरीफायर चालू रखकर सोएं।',
      rationale: 'During 8 hours of sleep, shallow resting respiration without protective nasal clearing leads to deep alveolar deposition of smog heavy metals.',
      rationaleHi: 'रात को सोते समय 8 घंटे तक हम गहरी सांसें लेते हैं। यदि हवा साफ न हो तो जहरीले कण सीधे फेफड़ों की गहराई तक पहुंच जाते हैं।',
      pm25ReductionPercent: 85,
      emissionsSavedKgCo2: 0,
      category: 'indoor-care',
    },
  ];
}
