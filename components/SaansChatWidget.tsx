'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  X, 
  Upload, 
  Camera, 
  AlertCircle, 
  CheckCircle2, 
  User, 
  Bot, 
  Maximize2, 
  Minimize2, 
  Loader2, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX 
} from 'lucide-react';
import { AirQualityData, SupportedLanguage } from '@/types/air';
import { translations } from '@/lib/translations';

interface SaansChatWidgetProps {
  currentData: AirQualityData;
  language: SupportedLanguage;
}

interface Message {
  id: string;
  sender: 'user' | 'model';
  text: string;
  timestamp: string;
  imagePreview?: string;
  visionVerdict?: {
    saturationScore: number;
    status: string;
    advice: string;
    adviceLocalized: string;
  };
}

interface SpeechRecognitionResultItem {
  transcript: string;
}

interface SpeechRecognitionResultList {
  length: number;
  [index: number]: {
    [index: number]: SpeechRecognitionResultItem;
  };
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

interface ISpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

type SpeechRecognitionConstructor = new () => ISpeechRecognitionInstance;

export const SaansChatWidget: React.FC<SaansChatWidgetProps> = ({ currentData, language }) => {
  const t = translations[language];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<ISpeechRecognitionInstance | null>(null);

  // Map language to Web Speech locale
  const getSpeechLocale = (lang: SupportedLanguage): string => {
    switch (lang) {
      case 'hi': return 'hi-IN';
      case 'hinglish': return 'hi-IN';
      case 'pa': return 'pa-IN';
      case 'bn': return 'bn-IN';
      case 'mr': return 'mr-IN';
      default: return 'en-IN';
    }
  };

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const windowWithSpeech = window as unknown as {
        SpeechRecognition?: SpeechRecognitionConstructor;
        webkitSpeechRecognition?: SpeechRecognitionConstructor;
      };
      const SpeechRecognitionClass = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;
      if (SpeechRecognitionClass) {
        setSpeechSupported(true);
        const recognition = new SpeechRecognitionClass();
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          const resultsArr = Array.from({ length: event.results.length }, (_, i) => event.results[i]);
          const transcript = resultsArr
            .map((res) => res?.[0]?.transcript || '')
            .join('');
          setInput(transcript);
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.warn('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleVoiceInput = () => {
    if (!speechSupported || !recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.lang = getSpeechLocale(language);
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
        setIsListening(false);
      }
    }
  };

  // Text to Speech
  const toggleSpeechSynthesis = (textToSpeak: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak.replace(/[*_#`]/g, ''));
      utterance.lang = getSpeechLocale(language);
      utterance.rate = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const initialGreeting = language === 'hi'
    ? `नमस्ते! मैं **साँस मित्र (Saans Mitr)** हूँ। ${currentData.city} में AQI **${currentData.aqi} (${currentData.categoryHi})** है। आप मुझसे बोलकर (माइक) या लिखकर मास्क सील-चेक, बच्चों की सुरक्षा, कम लागत वाले DIY प्यूरीफायर, या फिल्टर का फोटो भेजकर जांचने के बारे में पूछ सकते हैं।`
    : `Hello! I am **Saans Mitr**, your smog protection companion. In ${currentData.city}, AQI is currently **${currentData.aqi} (${currentData.category})**. Ask me via voice or text about certified mask seal tests, child exposure routines, DIY Corsi-Rosenthal boxes, or upload a photo of your purifier filter to inspect soot saturation!`;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-init',
      sender: 'model',
      text: initialGreeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() && !selectedImage) return;

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      imagePreview: selectedImage || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // If user uploaded an image of a filter
      if (selectedImage) {
        const visionRes = await fetch('/api/vision', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: selectedImage, language }),
        });

        const visionData = await visionRes.json();
        setSelectedImage(null);

        const modelReplyText = language === 'hi'
          ? `🔍 **फिल्टर फोटो विश्लेषण परिणाम:**\n- **स्थिति:** ${visionData.status}\n- **धूल सघनता:** ${visionData.saturationScore}%\n\n${visionData.adviceLocalized || visionData.advice}`
          : `🔍 **Filter Saturation Analysis:**\n- **Status:** ${visionData.status}\n- **Soot Load:** ${visionData.saturationScore}%\n\n${visionData.adviceLocalized || visionData.advice}`;

        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now() + 1}`,
            sender: 'model',
            text: modelReplyText,
            visionVerdict: visionData,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else {
        // Standard conversational query with context
        const historyPayload = messages.slice(-5).map((m) => ({
          role: m.sender,
          parts: [{ text: m.text }],
        }));

        historyPayload.push({
          role: 'user',
          parts: [{ text: textToSend }],
        });

        const chatRes = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            history: historyPayload,
            currentContext: {
              city: currentData.city,
              aqi: currentData.aqi,
              category: currentData.category,
              pm25: currentData.pollutants.pm2_5,
              inversionRisk: currentData.weather.inversionRisk,
              language,
            },
          }),
        });

        const chatData = await chatRes.json();

        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now() + 1}`,
            sender: 'model',
            text: chatData.response || 'I am keeping watch on ambient pollution.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'model',
          text: language === 'hi' 
            ? 'सॉरी, नेटवर्क में थोड़ी समस्या आई। कृपया N95 मास्क पहने रखें और खिड़कियां बंद रखें।' 
            : 'Communication experienced a momentary issue. Please keep room doors sealed and wear an N95 outdoors.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Saans AI Companion Drawer"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-extrabold text-sm shadow-2xl shadow-emerald-950/80 border border-emerald-400/40 transition-all transform hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-5 h-5 animate-pulse text-emerald-200" />
          <span>{t.tabs.aiCompanion}</span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping" />
        </button>
      )}

      {/* Responsive Slide-Over Drawer on Desktop & Bottom Sheet on Mobile */}
      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 sm:inset-x-auto sm:right-6 sm:bottom-6 z-50 w-full sm:w-[440px] h-[85vh] sm:h-[620px] max-h-[90vh] bg-slate-950/95 backdrop-blur-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl shadow-black/80 border border-white/10 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-200">
          {/* Mobile Drag Handle */}
          <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto my-2 sm:hidden shrink-0" />

          {/* Chat Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-950/90 via-teal-950/80 to-slate-900 border-b border-white/10 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-300">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm flex items-center gap-1.5 text-white">
                  Saans Mitr <span className="font-serif font-normal text-xs text-emerald-400">साँस मित्र</span>
                </h3>
                <span className="text-[11px] text-slate-300 block">
                  {currentData.city} AQI: <strong className="text-emerald-400">{currentData.aqi}</strong>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Read Aloud Button */}
              {messages.length > 0 && (
                <button
                  onClick={() => toggleSpeechSynthesis(messages[messages.length - 1].text)}
                  title={isSpeaking ? t.voiceMode.stopReading : t.voiceMode.readAloud}
                  aria-label={isSpeaking ? t.voiceMode.stopReading : t.voiceMode.readAloud}
                  className={`p-2 rounded-xl transition ${
                    isSpeaking 
                      ? 'bg-rose-500/30 text-rose-300 animate-pulse border border-rose-500/40' 
                      : 'hover:bg-white/10 text-slate-300'
                  }`}
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              )}

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition"
                aria-label="Close Chat Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="p-2.5 bg-black/40 border-b border-white/10 flex gap-1.5 overflow-x-auto text-[11px] font-semibold text-slate-300 no-scrollbar shrink-0">
            {[
              language === 'hi' ? 'N95 मास्क सील टेस्ट' : 'N95 Fit Check',
              language === 'hi' ? 'DIY प्यूरीफायर कैसे बनाएं?' : 'Corsi Box DIY Plan',
              language === 'hi' ? 'बच्चों की सुरक्षा रूटीन' : 'Child Exposure Safety',
              language === 'hi' ? 'खिड़की खोलने का सही समय?' : 'Ventilation Window',
            ].map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-emerald-500 hover:text-emerald-300 transition"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'model' && (
                  <div className="w-7 h-7 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none shadow-md'
                      : 'bg-white/5 text-slate-200 rounded-bl-none border border-white/10 shadow-md backdrop-blur-md'
                  }`}
                >
                  {msg.imagePreview && (
                    <div className="mb-2 rounded-lg overflow-hidden border border-white/20">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={msg.imagePreview} alt="Uploaded filter" className="max-h-36 w-full object-cover" />
                    </div>
                  )}

                  {msg.text}

                  <div className={`text-[9px] mt-1 text-right ${msg.sender === 'user' ? 'text-white/70' : 'text-slate-400'}`}>
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs py-2">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                <span>{language === 'hi' ? 'साँस मित्र सोच रहा है...' : 'Saans Mitr is reasoning...'}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Image Selected Preview */}
          {selectedImage && (
            <div className="px-4 py-2 bg-slate-900 border-t border-white/10 flex items-center justify-between shrink-0">
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                {t.uploadFilterPhoto}
              </span>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-xs text-rose-400 hover:underline"
              >
                {language === 'hi' ? 'हटाएं' : 'Remove'}
              </button>
            </div>
          )}

          {/* Voice Listening Status Banner */}
          {isListening && (
            <div className="px-4 py-2 bg-rose-950/80 border-t border-rose-500/40 text-rose-200 text-xs flex items-center justify-between animate-pulse shrink-0">
              <span className="flex items-center gap-2 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-ping" />
                {t.voiceMode.listening}
              </span>
              <button onClick={toggleVoiceInput} className="text-xs underline text-rose-300">
                Cancel
              </button>
            </div>
          )}

          {/* Chat Input Bar: [ 📷 Filter Check ] [ Text Input... ] [ 🎤 Voice ] [ ➤ Send ] */}
          <div className="p-3 bg-slate-950 border-t border-white/10 flex items-center gap-2 shrink-0">
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            {/* Camera / Filter Check Upload Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              aria-label="Upload photo of air filter or mask for soot inspection"
              title="Upload photo of air filter or mask for soot inspection"
              className="p-2.5 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-white/5 transition border border-white/10 shrink-0"
            >
              <Camera className="w-4 h-4" />
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isListening ? t.voiceMode.listening : t.aiAssistantPlaceholder}
              className="flex-1 py-2 px-3 text-xs bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-slate-500"
            />

            {/* Hands-Free Voice Mode Mic Button */}
            {speechSupported && (
              <button
                onClick={toggleVoiceInput}
                aria-label={isListening ? 'Stop listening' : 'Start voice input'}
                title={isListening ? 'Stop listening' : 'Speak your question'}
                className={`p-2.5 rounded-xl transition border shrink-0 ${
                  isListening
                    ? 'bg-rose-500/30 text-rose-300 border-rose-500/60 ring-2 ring-rose-500/50 animate-pulse'
                    : 'text-slate-400 hover:text-emerald-400 hover:bg-white/5 border-white/10'
                }`}
              >
                {isListening ? <Mic className="w-4 h-4 text-rose-400" /> : <Mic className="w-4 h-4" />}
              </button>
            )}

            {/* Send Button */}
            <button
              onClick={() => handleSend()}
              disabled={isLoading || (!input.trim() && !selectedImage)}
              aria-label="Send message"
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 text-white transition shadow-md shadow-emerald-950/60 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
