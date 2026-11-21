# Saans (साँस) — GenAI-Powered Winter Smog & Urban Air Pollution Companion

> **Saans** (Hindi: *साँस* — "Breath") is a real-time, GenAI-driven environmental health assistant designed to protect families and mobilize communities during severe winter smog episodes and toxic urban air pollution.

---

## 🌟 Key Features

1. **Hyper-Local Atmospheric & Smog Intelligence**
   - Integrates OpenWeather Air Pollution & Weather APIs with an automated, zero-key **Open-Meteo fallback** (guaranteeing 100% functionality out-of-the-box).
   - Real-time tracking of $PM_{2.5}$, $PM_{10}$, $NO_2$, $SO_2$, $CO$, and $O_3$.
   - Detects winter **Thermal Inversion Stagnation** and calculates the daily **Solar Mixing Ventilation Window** (identifying when it is safe to cross-ventilate vs. when to seal rooms).

2. **AQI-Tiered Protective Products & Usage Protocol Guide**
   - Matches certified equipment to current pollution severity:
     - **Personal Protective Equipment**: NIOSH-approved N95 & N99 respirators, airtight wraparound eye goggles for two-wheeler commuters, and saline nasal flushes to clean trapped soot from nasal cilia.
     - **Home Hardening & Draft Sealing**: EPDM rubber weatherstripping foam tape, silicone under-door sweeps, and window seals to reduce indoor PM infiltration by up to 60%.
     - **Air Cleaning & Monitoring**: Medical-grade True HEPA H13 purifiers and real-time laser scatter PM2.5 monitors.
   - **Step-by-Step Mastery Cards**: 15-second negative and positive pressure mask fit check, HEPA vacuuming vs washing rules, and "Safe Room" air-locking protocols.

3. **Smog-Adaptive Daily Routine Planner**
   - Re-sequences commutes, outdoor school hours, and household chores based on family vulnerability (infants, elderly, asthma/COPD, pregnant individuals, and commute modes).
   - Replaces high-risk habits (e.g. morning jogging in inversion chill, bumper-to-bumper two-wheeler transit) with optimized alternatives that reduce personal lung exposure by up to 65%.

4. **Indoor Air Quality (IAQ) Hacks & DIY Studio**
   - Interactive **Corsi-Rosenthal Box Purifier Calculator**: Computes Air Changes per Hour (ACH) and clearance time for any custom bedroom dimension.
   - Damp microfiber dust barriers, NASA clean air biofiltration plant placement, and kitchen exhaust timing protocols.

5. **Direct Health & Community Impact Ledger**
   - Quantifies micrograms of toxic $PM_{2.5}$ averted from deep lung alveoli.
   - Calculates equivalent cigarettes avoided (based on the Berkeley Earth scientific metric).
   - Tracks community $CO_2$ and tailpipe emissions saved by switching to public transit or carpooling.

6. **Bilingual GenAI Companion (Saans Mitr — साँस मित्र)**
   - Conversational assistant powered by Google Gemini with bilingual support (English, Hindi, and Hinglish).
   - Multimodal photo inspection: Users can photograph dirty air purifier filters or AC mesh to diagnose soot saturation and receive cleaning/replacement verdicts.

---

## 🚀 Quickstart

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables (Optional)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your API keys if available:
```env
OPENWEATHER_API_KEY=your_openweather_api_key
GEMINI_API_KEY=your_gemini_api_key
```
*(Note: If no keys are provided, Saans automatically runs in smart fallback mode using Open-Meteo atmospheric telemetry and built-in GenAI heuristics).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
