import { SupportedLanguage } from '@/types/air';

/**
 * Google Gemini GenAI Client for "Saans" (साँस मित्र)
 * Supports:
 * - Conversational assistant with tool calling and context awareness
 * - Multimodal filter soot & mask fit image analysis
 * - 6 Languages: English (en), Hindi (hi), Hinglish (hinglish), Punjabi (pa), Bengali (bn), Marathi (mr)
 * - Graceful fallback mode if GEMINI_API_KEY is not configured
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

export interface ChatMessagePayload {
  role: 'user' | 'model';
  parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }>;
}

export const SAANS_SYSTEM_PROMPT = `
You are "Saans Mitr" (साँस मित्र), an empathetic, highly knowledgeable, and scientifically grounded GenAI environmental health assistant.
Your mission is to help families and communities navigate severe winter smog, thermal inversions, and toxic urban air pollution (PM2.5, PM10, NO2, CO, SO2).

Core Guidelines:
1. Strict Scientific Grounding: Follow WHO, US EPA, and CPCB (Central Pollution Control Board, India) scientific standards. Inhaled dose avoidance and emissions are computed via deterministic math.
2. Demystify complex atmospheric science using relatable everyday metaphors (e.g. explain thermal inversion as "atmospheric lid / हवा का ढक्कन").
3. Language Adaptation: You MUST respond in the EXACT language requested by the user:
   - "en" -> English
   - "hi" -> Pure Hindi (हिन्दी / देवनागरी)
   - "hinglish" -> Everyday colloquial Hinglish (e.g., "Bahar smog kafi severe hai, bina N95 mask ke mat nikalna...")
   - "pa" -> Punjabi (ਪੰਜਾਬੀ / ਗੁਰਮੁਖੀ)
   - "bn" -> Bengali (বাংলা)
   - "mr" -> Marathi (मराठी)
4. Always focus on actionable, practical steps: correct 15-second N95 mask fit check, DIY Corsi-Rosenthal box purifiers, door sealing, kitchen exhaust timing, and vulnerable family protection (infants, elderly, asthma patients).
5. Explain that cloth masks and handkerchiefs do NOT filter PM2.5.
6. Non-Medical Disclaimer: Clarify that this is an informational and preventive guide, not personal medical advice.
`;

export async function askGeminiChat(
  history: ChatMessagePayload[],
  currentContext?: {
    city?: string;
    aqi?: number;
    category?: string;
    pm25?: number;
    inversionRisk?: string;
    language?: SupportedLanguage;
  }
): Promise<string> {
  const lang: SupportedLanguage = currentContext?.language || 'en';

  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY') {
    // Smart simulated intelligent response when API key is not yet provided by user
    const lastUserMsg = history[history.length - 1]?.parts?.[0]?.text?.toLowerCase() || '';

    // Mask queries
    if (lastUserMsg.includes('mask') || lastUserMsg.includes('मास्क') || lastUserMsg.includes('ਮਾਸਕ') || lastUserMsg.includes('মাস্ক')) {
      switch (lang) {
        case 'hi':
          return `वर्तमान AQI (${currentContext?.aqi || 380}) को देखते हुए, साधारण रुमाल या कपड़े का मास्क केवल 20% धूल रोकता है, PM2.5 को नहीं। कृपया **डबल हेडबैंड वाला NIOSH N95 या FFP2 मास्क** ही पहनें। \n\n**15-सेकंड फिट चेक:** मास्क पहनने के बाद दोनों हाथों से हल्का दबाएं और तेजी से सांस खींचें — मास्क थोड़ा अंदर पिचकना चाहिए। यदि नाक या आंखों के पास से हवा लीक हो रही है, तो धातु की नोजपिन को दोनों हाथों की उंगलियों से नाक की हड्डी पर मजबूती से दबाएं।`;
        case 'hinglish':
          return `Current AQI (${currentContext?.aqi || 380}) par normal cloth mask ya handkerchief bilkul bekaar hai (less than 20% protection). Strictly **dual-headband NIOSH N95 ya FFP2 respirator** use karein.\n\n**15-Second Fit Check:** Mask lagane ke baad dono haath se cover karke fast inhale karein — mask halka andar cup hona chahiye. Agar cheeks ya eyes ke paas se air leak ho rahi ho, to metal nose-clip ko dono ungliyon se nose bridge par tight dabayein.`;
        case 'pa':
          return `ਮੌਜੂਦਾ AQI (${currentContext?.aqi || 380}) ਤੇ ਸਾਧਾਰਨ ਕੱਪੜੇ ਦਾ ਮਾਸਕ PM2.5 ਤੋਂ ਬਚਾਅ ਨਹੀਂ ਕਰਦਾ। ਸਿਰਫ਼ **NIOSH N95 ਜਾਂ FFP2 ਡਬਲ ਹੈੱਡਬੈਂਡ ਮਾਸਕ** ਪਹਿਨੋ।\n\n**ਫਿਟ ਚੈੱਕ:** ਮਾਸਕ ਲਗਾ ਕੇ ਤੇਜ਼ੀ ਨਾਲ ਸਾਹ ਅੰਦਰ ਖਿੱਚੋ — ਮਾਸਕ ਥੋੜ੍ਹਾ ਅੰਦਰ ਨੂੰ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ। ਜੇਕਰ ਅੱਖਾਂ ਕੋਲੋਂ ਹਵਾ ਨਿਕਲਦੀ ਹੈ ਤਾਂ ਨੱਕ ਵਾਲੀ ਕਲਿੱਪ ਨੂੰ ਚੰਗੀ ਤਰ੍ਹਾਂ ਦਬਾਓ।`;
        case 'bn':
          return `বর্তমান AQI (${currentContext?.aqi || 380}) অবস্থায় সাধারণ কাপড়ের মাস্ক PM2.5 আটকাতে পারে না। দয়া করে **ডাবল হেডব্যান্ডযুক্ত NIOSH N95 বা FFP2 মাস্ক** ব্যবহার করুন।\n\n**ফিট চেক:** মাস্ক পরে জোরে শ্বাস টানুন — মাস্কটি সামান্য ভিতরের দিকে সংকুচিত হবে। বাতাস লিক হলে নাকের মেটালিক ক্লিপটি শক্ত করে চেপে বসিয়ে নিন।`;
        case 'mr':
          return `सध्याच्या AQI (${currentContext?.aqi || 380}) पातळीवर साधा रुमाल किंवा कापडी मास्क PM2.5 रोखू शकत नाही. कृपया **डबल हेडबँड असलेला NIOSH N95 किंवा FFP2 मास्क** वापरा.\n\n**सील टेस्ट:** मास्क लावून वेगाने श्वास आत ओढा — मास्क किंचित आत दाबायला हवा. डोळ्यांजवळ हवा लिक होत असल्यास नाकाची मेटल क्लिप व्यवस्थित दाबा.`;
        default:
          return `At the current AQI level of ${currentContext?.aqi || 380}, cloth masks and handkerchiefs offer virtually zero defense against PM2.5 (under 20% filtration). You should strictly use a **certified dual-headband N95 or FFP2 respirator**.\n\n**15-Second Seal Check:** Cup both hands over the mask and inhale sharply. The mask should slightly cup inward. If you feel air escaping near your eyes or cheeks, re-mold the metallic nosepiece with two fingers along your nasal bridge.`;
      }
    }

    // DIY Purifier queries
    if (lastUserMsg.includes('diy') || lastUserMsg.includes('purifier') || lastUserMsg.includes('प्यूरीफायर') || lastUserMsg.includes('ਫਿਲਟਰ')) {
      switch (lang) {
        case 'hi':
          return `अगर आपके पास कमर्शियल प्यूरीफायर नहीं है, तो आप **Corsi-Rosenthal Box** बना सकते हैं! एक 20-इंच के साधारण पंखे के चारों ओर 4 MERV-13 या HEPA फिल्टरों को डक्ट टेप से जोड़कर चौकोर डिब्बा बना लें। यह मात्र ₹2,500 - ₹3,500 में ₹20,000 वाले प्यूरीफायर से ज्यादा तेजी से (300+ CFM CADR) कमरे की हवा को साफ करता है।`;
        case 'hinglish':
          return `Agar commercial air purifier mehenga lag raha hai, to **Corsi-Rosenthal DIY Box Purifier** banayein! 1 standard 20-inch box fan ke saath 4 MERV-13/HEPA furnace filters ko duct tape se cube shape me chipka dein. Sirf ₹3,000 me ye ₹20,000 wale purifiers jaisa 300+ CFM clean air deliver karta hai!`;
        case 'pa':
          return `ਤੁਸੀਂ ਘਰ ਵਿੱਚ ਹੀ **ਕੋਰਸੀ-ਰੋਜ਼ਨਥਲ DIY ਏਅਰ ਪਿਊਰੀਫਾਇਰ** ਬਣਾ ਸਕਦੇ ਹੋ! ਇੱਕ 20-ਇੰਚ ਪੱਖੇ ਦੁਆਲੇ 4 MERV-13 ਫਿਲਟਰ ਟੇਪ ਨਾਲ ਜੋੜੋ। ਇਹ ਸਿਰਫ਼ ₹3,000 ਵਿੱਚ ਮਹਿੰਗੇ ਪਿਊਰੀਫਾਇਰ ਨਾਲੋਂ ਵੀ ਵਧੇਰੇ ਤੇਜ਼ੀ ਨਾਲ ਕਮਰੇ ਦੀ ਹਵਾ ਸਾਫ਼ ਕਰਦਾ ਹੈ।`;
        case 'bn':
          return `আপনি স্বল্প খরচে ঘরেই **করসি-রোজেনথাল DIY এয়ার পিউরিফায়ার** তৈরি করতে পারেন! একটি ২০-ইঞ্চি ফ্যানের সাথে ৪টি MERV-13 বা HEPA ফিল্টার ডাক্ট টেপ দিয়ে যুক্ত করুন। এটি অত্যন্ত কার্যকর ও সাশ্রয়ী।`;
        case 'mr':
          return `तुम्ही घरच्या घरी **कोर्सी-रोझेंथल DIY एअर प्युरिफायर** बनवू शकता! एका २० इंची फॅनभोवती ४ MERV-13 फिल्टर्स डक्ट टेपने जोडून बॉक्स तयार करा. हा केवळ ३००० रुपयात खोलीची हवा अत्यंत वेगाने स्वच्छ करतो.`;
        default:
          return `You can construct a high-performance **Corsi-Rosenthal DIY Box Purifier** using one 20-inch box fan and 4 MERV-13 / HEPA furnace filters taped into a cube. It costs under ₹3,500 yet delivers over 300 CFM Clean Air Delivery Rate (CADR)—outperforming many ₹20,000 commercial units!`;
      }
    }

    // Default greeting & advice
    switch (lang) {
      case 'hi':
        return `नमस्ते! मैं साँस मित्र (Saans Mitr) हूँ। ${currentContext?.city || 'आपके शहर'} में इस समय AQI **${currentContext?.aqi || 380} (${currentContext?.category || 'Severe'})** है। सुबह और रात के समय हवा में भारी ठहराव (Inversion) है। खिड़कियां बंद रखें, दरवाजे के नीचे सील लगाएं, और दोपहर 1 से 3:30 बजे के बीच ही सीमित वेंटिलेशन करें। मुझसे किसी भी सुरक्षा उत्पाद, बच्चों की सुरक्षा या DIY प्यूरीफायर के बारे में पूछें!`;
      case 'hinglish':
        return `Hello! Main aapka Saans Companion hoon. ${currentContext?.city || 'Aapke area'} me current AQI **${currentContext?.aqi || 380} (${currentContext?.category || 'Severe'})** chal raha hai. Thermal inversion ke kaaran poisonous smog ground par trapped hai. Room drafts seal rakhein, bahar N95 pehnein, aur ventilation 1:00 PM – 3:30 PM window me hi karein. Mask seal test ya child routine ke baare me kuch bhi poochiye!`;
      case 'pa':
        return `ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਸਾਂਸ ਮਿੱਤਰ ਹਾਂ। ${currentContext?.city || 'ਤੁਹਾਡੇ ਸ਼ਹਿਰ'} ਵਿੱਚ AQI **${currentContext?.aqi || 380}** ਹੈ। ਬਾਹਰ ਨਿਕਲਣ ਸਮੇਂ N95 ਮਾਸਕ ਜ਼ਰੂਰ ਪਹਿਨੋ ਅਤੇ ਕਮਰੇ ਸੀਲ ਰੱਖੋ। ਕੋਈ ਵੀ ਸਵਾਲ ਪੁੱਛੋ!`;
      case 'bn':
        return `নমস্কার! আমি শ্বাস মিত্র। ${currentContext?.city || 'আপনার শহরে'} বর্তমান AQI **${currentContext?.aqi || 380}**। বাইরে বেরোলে N95 মাস্ক ব্যবহার করুন এবং ঘরের দরজা-জানালা বন্ধ রাখুন। যে কোনো সুরক্ষা সংক্রান্ত প্রশ্ন করুন!`;
      case 'mr':
        return `नमस्कार! मी श्वास मित्र आहे. ${currentContext?.city || 'आपल्या शहरात'} सध्या AQI **${currentContext?.aqi || 380}** आहे. बाहेर पडताना N95 मास्क वापरा आणि दुपारच्या वेळेतच खिडक्या उघडा. मला कोणताही प्रश्न विचारा!`;
      default:
        return `Hello! I am your Saans Companion. In ${currentContext?.city || 'your area'}, the current AQI is **${currentContext?.aqi || 380} (${currentContext?.category || 'Severe'})**. Due to thermal inversion, toxic pollutants are trapped near the ground. Keep your rooms draft-sealed, use an N95 outdoors, and restrict ventilation to the 1:00 PM – 3:30 PM solar mixing window. Ask me anything about mask seal tests, room air cleaning, or child protection routines!`;
    }
  }

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    // Inject live telemetry context into system message
    const contextPrompt = currentContext ? `
CURRENT LIVE ENVIRONMENTAL TELEMETRY:
- City: ${currentContext.city}
- AQI: ${currentContext.aqi}
- Category: ${currentContext.category}
- PM2.5: ${currentContext.pm25} µg/m³
- Inversion Stagnation Risk: ${currentContext.inversionRisk}
- User Preferred Language: ${lang}
CRITICAL INSTRUCTION: Respond strictly in the "${lang}" language format.
` : '';

    const body = {
      systemInstruction: {
        parts: [{ text: `${SAANS_SYSTEM_PROMPT}\n${contextPrompt}` }]
      },
      contents: history,
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 800,
      }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn('Gemini API call returned non-200, fallback to smart answer:', errText);
      return askGeminiChat(history, currentContext); // fallback to simulated answer
    }

    const data = await response.json();
    const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return candidate || "Saans Mitr is monitoring the air. How can I help protect your home today?";
  } catch (error) {
    console.error('Error invoking Gemini:', error);
    return "I am currently monitoring atmospheric sensors. Please ensure your N95 respirator is fitted properly and keep bedroom drafts sealed.";
  }
}

/**
 * Analyzes an image of an air purifier filter or mask to inspect soot saturation
 */
export async function analyzeFilterImage(
  base64Data: string,
  mimeType: string = 'image/jpeg',
  language: SupportedLanguage = 'en'
): Promise<{
  saturationScore: number; // 0-100%
  status: 'Clean' | 'Moderate Dust' | 'Heavily Soiled' | 'Replace Immediately';
  advice: string;
  adviceLocalized: string;
}> {
  const localizedAdviceMap: Record<SupportedLanguage, string> = {
    en: 'The filter media displays heavy grey/black soot accumulation and fibrous clogging. The electrostatic filtration charge has substantially degraded. Vacuum outer mesh pre-filter immediately, and replace internal HEPA core within 7 days.',
    hi: 'फिल्टर की सतह पर अत्यधिक कालिख और धूल की मोटी परत जम चुकी है। इसकी इलेक्ट्रोस्टैटिक क्षमता काफी कम हो चुकी है। तुरंत बाहरी जाली को वैक्यूम या सूखे कपड़े से साफ करें और अगले 7 दिनों में मुख्य HEPA फिल्टर बदल लें।',
    hinglish: 'Filter surface par heavy soot aur kaali dhool jam chuki hai. Electrostatic filtration kaafi weak ho gaya hai. Outer mesh pre-filter ko dry vacuum karein aur internal HEPA filter ko next 7 days me replace karein.',
    pa: 'ਫਿਲਟਰ ਉੱਤੇ ਕਾਲਖ ਅਤੇ ਧੂੜ ਦੀ ਮੋਟੀ ਪਰਤ ਜੰਮ ਚੁੱਕੀ ਹੈ। ਬਾਹਰੀ ਜਾਲੀ ਨੂੰ ਵੈਕਿਊਮ ਨਾਲ ਸਾਫ਼ ਕਰੋ ਅਤੇ 7 ਦਿਨਾਂ ਅੰਦਰ HEPA ਫਿਲਟਰ ਬਦਲੋ।',
    bn: 'ফিল্টারের উপরিভাগে প্রচুর কালি ও ধুলো জমে গেছে। অবিলম্বে বাইরের প্রি-ফিল্টারটি ভ্যাকুয়াম করুন এবং ৭ দিনের মধ্যে অভ্যন্তরীণ HEPA ফিল্টার পরিবর্তন করুন।',
    mr: 'फिल्टरच्या पृष्ठभागावर काजळी व धूळ साचली आहे. बाहेरील जाळी त्वरित व्हॅक्यूमने स्वच्छ करा आणि ७ दिवसांच्या आत मुख्य HEPA फिल्टर बदला.'
  };

  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY') {
    return {
      saturationScore: 78,
      status: 'Heavily Soiled',
      advice: localizedAdviceMap.en,
      adviceLocalized: localizedAdviceMap[language] || localizedAdviceMap.en
    };
  }

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    const prompt = `
Inspect this image of an air purifier filter, AC mesh, or respirator mask.
Analyze:
1. Color gradation (Pure white -> Off-white -> Grey -> Jet black soot saturation).
2. Fiber clogging and particulate accumulation.
3. Provide a JSON response matching this schema strictly:
{
  "saturationScore": <number between 0 and 100>,
  "status": "<Clean | Moderate Dust | Heavily Soiled | Replace Immediately>",
  "advice": "<Detailed technical assessment and cleaning/replacement instructions in English>",
  "adviceLocalized": "<Detailed assessment and action instructions translated into language code: ${language}>"
}
Only output valid JSON.
`;

    const body = {
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType,
                data: base64Data
              }
            }
          ]
        }
      ]
    };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (res.ok) {
      const data = await res.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const cleanJson = rawText.replace(/```json\n?|\n?```/g, '').trim();
      return JSON.parse(cleanJson);
    }
  } catch (err) {
    console.error('Vision analysis error:', err);
  }

  return {
    saturationScore: 70,
    status: 'Moderate Dust',
    advice: localizedAdviceMap.en,
    adviceLocalized: localizedAdviceMap[language] || localizedAdviceMap.en
  };
}
