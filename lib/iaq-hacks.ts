import { IaqHack } from '@/types/air';

export const IAQ_HACKS: IaqHack[] = [
  {
    id: 'corsi-rosenthal-diy-box',
    title: 'The Corsi-Rosenthal DIY Air Purifier Box',
    titleHi: 'DIY कोर्सी-रोसेन्थल एयर प्यूरीफायर (कम लागत)',
    type: 'diy-purifier',
    cadrEstimate: '250 - 350 CFM (Equal to ₹20,000 commercial purifiers)',
    difficulty: 'Moderate',
    reductionPercent: 85,
    description: 'An open-source, scientifically validated DIY air cleaner built using one 20-inch standard box/exhaust fan and 4 MERV 13 / HEPA furnace filters taped into a cube.',
    descriptionHi: 'वैज्ञानिक रूप से प्रमाणित कम लागत वाला DIY एयर प्यूरीफायर। एक 20-इंच के साधारण पंखे और 4 उच्च-गुणवत्ता वाले MERV-13 या HEPA फिल्टरों को डक्ट टेप से जोड़कर बनाया जाता है।',
    materials: [
      '1x 20-inch box fan (or high-flow square fan)',
      '4x MERV 13 or HEPA furnace filters (20" x 20" x 1" or 2")',
      '1x Heavy-duty duct tape or masking tape roll',
      '1x Cardboard bottom piece (20" x 20")',
      '1x Cardboard fan shroud ring (cut with 15-inch circular opening to prevent airflow backdraft)'
    ],
    materialsHi: [
      '1x 20-इंच का बॉक्स फैन या स्क्वायर एग्जॉस्ट फैन',
      '4x MERV 13 या HEPA फिल्टर (20" x 20")',
      '1x मजबूत डक्ट टेप (Duct Tape)',
      '1x नीचे का कार्डबोर्ड बेस (20" x 20")',
      '1x कार्डबोर्ड की रिंग (पंखा पर आगे लगाने हेतु जिससे हवा पीछे न लौटे)'
    ],
    steps: [
      'Form an open box cube with the 4 filters: Ensure air-flow arrows on all 4 filters point INWARD toward the center of the box.',
      'Tape the filter corners together firmly using duct tape, ensuring zero gaps between edges.',
      'Tape the cardboard bottom piece to close the bottom of the cube completely.',
      'Place the 20-inch box fan on top of the cube, oriented so that the fan blows air UPWARDS into the room (drawing air through the 4 filters).',
      'Cut a cardboard circular donut shroud (15-inch inner diameter) and tape it to the front face of the fan to eliminate blade corner air backwash and increase airflow pressure by 40%.'
    ],
    stepsHi: [
      'चारों फिल्टरों को जोड़कर एक चौकोर बॉक्स बनाएं। ध्यान दें: फिल्टर पर तीर (Arrow) का निशान अंदर की ओर होना चाहिए।',
      'फिल्टर के सभी कोनों को डक्ट टेप से अच्छी तरह सील करें ताकि कहीं से भी लीकेज न हो।',
      'बॉक्स के नीचे कार्डबोर्ड का टुकड़ा लगाकर निचला हिस्सा पूरी तरह बंद कर दें।',
      'पंखे को ऊपर रखें ताकि पंखा हवा को कमरे में ऊपर की ओर फेंके (चारों फिल्टरों से हवा अंदर खींचकर)।',
      'पंखे के किनारों पर गोल कार्डबोर्ड रिंग लगाएं ताकि हवा बिना रुकावट के कमरे में फैले।'
    ],
    proTip: 'A single Corsi-Rosenthal cube delivers higher CADR than three entry-level commercial purifiers because the 4 large filters present 16 square feet of surface area with ultra-low air resistance.',
    proTipHi: 'इसकी फिल्टर सतह बहुत बड़ी (16 वर्ग फुट) होती है, इसलिए यह महंगे प्यूरीफायर से भी ज्यादा तेजी से बड़े कमरे की हवा साफ करता है।',
  },
  {
    id: 'wet-curtain-particulate-barrier',
    title: 'Damp Microfiber Curtain Dust Barrier',
    titleHi: 'नम माइक्रोफाइबर पर्दा धूल अवरोधक',
    type: 'dust-management',
    difficulty: 'Easy',
    reductionPercent: 45,
    description: 'Hanging a lightly misted or damp dense cotton/microfiber curtain across open window frames or balconies creates a capillary surface tension trap for coarse soot and dust.',
    descriptionHi: 'खिड़कियों या बालकनी के दरवाजे पर हल्का भीगा हुआ सूती या माइक्रोफाइबर पर्दा लगाने से बाहर से आने वाले धूल और कालिख के कण नमी से चिपककर अंदर आने से रुक जाते हैं।',
    materials: [
      'Clean dense weave cotton or microfiber curtain',
      'Clean water spray bottle',
      'Window curtain rod'
    ],
    materialsHi: [
      'घना बुना हुआ सूती या माइक्रोफाइबर पर्दा',
      'पानी की स्प्रे बोतल',
      'पर्दे की रॉड'
    ],
    steps: [
      'Hang curtain so it fully covers the window frame from top to bottom.',
      'Use a clean spray bottle with tap water to mist the outside-facing surface lightly until slightly damp (not dripping).',
      'When outdoor breeze passes through the damp fibers, microscopic soot adheres to the water film.'
    ],
    stepsHi: [
      'पर्दा इस प्रकार लगाएं कि खिड़की पूरी तरह ऊपर से नीचे तक ढंक जाए।',
      'स्प्रे बोतल से पर्दे की बाहरी सतह पर हल्का पानी छिड़कें ताकि वह नम हो जाए।',
      'जब बाहर की हवा अंदर आएगी तो धूल के कण गीले रेशों में फंस जाएंगे।'
    ],
    proTip: 'Wash the curtain in warm water every 3-4 days to wash away trapped toxic soot.',
    proTipHi: 'हर 3-4 दिन में इस पर्दे को गर्म पानी से धोएं ताकि जमा हुई कालिख साफ हो जाए।',
    warning: 'Do not over-soak or leave in unventilated dark corners to prevent mildew.',
    warningHi: 'पर्दे को बहुत ज्यादा गीला न करें ताकि फंगस या सीलन न लगे।'
  },
  {
    id: 'plant-biofiltration-protocol',
    title: 'NASA Clean Air Plant Bio-Filter Placement',
    titleHi: 'NASA द्वारा प्रमाणित वायु शोधक पौधों की सही व्यवस्था',
    type: 'plants',
    difficulty: 'Easy',
    reductionPercent: 25,
    description: 'Specific indoor plants optimized for subtropical winters that absorb indoor VOCs (formaldehyde, benzene) and release nighttime oxygen without attracting mold.',
    descriptionHi: 'स्नेक प्लांट (Snake Plant), एरेका पाम और मनी प्लांट जैसे पौधे जो रात में भी ऑक्सीजन छोड़ते हैं और पेंट तथा फर्नीचर से निकलने वाली जहरीली गैसों (VOCs) को सोखते हैं।',
    materials: [
      'Sansevieria (Snake Plant / Mother-in-law\'s Tongue) — 3-4 per bedroom',
      'Areca Palm (Chrysalidocarpus lutescens) — living room daylight corners',
      'Pothos (Money Plant) — water or clean cocopeat medium',
      'Microfiber wiping cloth for leaf care'
    ],
    materialsHi: [
      'स्नेक प्लांट (Sansevieria) — बेडरूम के लिए सर्वोत्तम (रात में O2 छोड़ता है)',
      'एरेका पाम (Areca Palm) — लिविंग रूम के लिए उत्तम प्राकृतिक ह्यूमिडिफायर',
      'मनी प्लांट (Money Plant) — हवा में नमी बनाए रखने हेतु',
      'पत्तियों को पोंछने के लिए गीला कपड़ा'
    ],
    steps: [
      'Place Snake Plants directly on bedroom nightstands; their Crassulacean Acid Metabolism (CAM) releases fresh oxygen during sleep hours.',
      'Keep Areca Palms in indirect daylight areas; they naturally humidify dry winter air without moldy humidifiers.',
      'CRUCIAL: Wipe plant leaves with a wet cloth every Sunday. Settled soot coats the leaf stomata and prevents air filtration.'
    ],
    stepsHi: [
      'स्नेक प्लांट को बेडरूम में सिरहाने के पास रखें क्योंकि यह रात में कार्बन डाइऑक्साइड सोखकर ऑक्सीजन देता है।',
      'एरेका पाम को लिविंग रूम में रखें, यह सर्दियों की सूखी हवा में नमी बनाए रखता है।',
      'अति महत्वपूर्ण: हर हफ्ते पौधे की पत्तियों को गीले कपड़े से साफ करें, क्योंकि धूल जमने से पौधे के छिद्र बंद हो जाते हैं।'
    ],
    proTip: 'Plants absorb VOCs and CO2, but they do NOT filter PM2.5 particulates efficiently. Always pair plants with mechanical HEPA or DIY filters for complete protection.',
    proTipHi: 'पौधे जहरीली गैसों को सोखते हैं लेकिन धूल और PM2.5 को पूरी तरह नहीं छान सकते। इसलिए पौधों के साथ HEPA या DIY फिल्टर जरूर रखें।',
  },
  {
    id: 'wet-mopping-resuspension-protocol',
    title: 'Wet Microfiber Mopping vs Dry Sweeping',
    titleHi: 'गीले पोछे का नियम बनाम सूखा झाड़ू प्रतिबंध',
    type: 'dust-management',
    difficulty: 'Easy',
    reductionPercent: 60,
    description: 'Banning traditional broom sweeping inside the house prevents fine settled heavy metals from being airborne into the family breathing zone.',
    descriptionHi: 'घर के अंदर सूखा झाड़ू लगाने पर पूरी तरह रोक लगाकर केवल गीले माइक्रोफाइबर पोछे का उपयोग करें, जिससे जमीन पर बैठी जहरीली धूल दोबारा हवा में न तैरे।',
    materials: [
      'Microfiber flat mop with removable washable pads',
      'Warm water with 1 capful of white vinegar or mild floor cleaner',
      'No traditional dry grass brooms'
    ],
    materialsHi: [
      'माइक्रोफाइबर मॉप (पोछा)',
      'गुनगुना पानी और हल्का फर्श क्लीनर',
      'सूखी झाड़ू का उपयोग बंद करें'
    ],
    steps: [
      'Never use traditional dry grass brooms inside on high AQI days; brooms act as dust catapults, causing indoor PM2.5 spikes of 300+ µg/m³ for 2 hours.',
      'Use a damp microfiber mop moving in an S-pattern from furthest room corner towards exit.',
      'Rinse mop head in bucket after every room segment to trap particles permanently.'
    ],
    stepsHi: [
      'स्मॉग वाले दिनों में घर में सूखी झाड़ू बिल्कुल न लगाएं; झाड़ू से धूल के कण हवा में 2 घंटे तक तैरते रहते हैं।',
      'हल्के गीले माइक्रोफाइबर पोछे से एक ही दिशा (S-पैटर्न) में पोंछा लगाएं।',
      'प्रत्येक कमरे के बाद पोछे को साफ पानी में धोएं ताकि धूल नाली में बह जाए।'
    ],
    proTip: 'Adding a splash of white vinegar cuts static charge on marble and tile floors, preventing soot from clinging stubbornly.',
    proTipHi: 'पोछे के पानी में थोड़ा सिरका डालने से फर्श से कालिख और चिकनाई तुरंत छूट जाती है।',
  }
];
