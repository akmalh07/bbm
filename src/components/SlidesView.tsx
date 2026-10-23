import React, { useState } from 'react';
import { SlideItem, RPHData } from '../types';
import { Presentation, ChevronLeft, ChevronRight, Sparkles, Volume2, MonitorPlay, Smile, Printer, Maximize2 } from 'lucide-react';

interface SlidesViewProps {
  slides: SlideItem[];
  rph: RPHData;
}

export const SlidesView: React.FC<SlidesViewProps> = ({ slides, rph }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const safeSlides = slides || [];
  const safeRph = rph || { mataPelajaran: 'Bahasa Arab', tahun: 'Tahun 1', tajuk: 'Bahasa Arab Ceria' };

  if (safeSlides.length === 0) {
    return <div className="p-8 text-center text-slate-500">Tiada maklumat slaid dijumpai.</div>;
  }

  const currentSlide = safeSlides[currentSlideIndex] || safeSlides[0];

  const handleNext = () => {
    if (currentSlideIndex < safeSlides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-pink-200 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-800 text-xs font-black px-3.5 py-1.5 rounded-full mb-2 shadow-xs">
            <Sparkles className="w-4 h-4 text-pink-600 animate-spin" />
            <span>Slaid Gaya Canva Profesional & Ceria</span>
          </div>
          <h2 className="text-2xl font-black text-purple-950 tracking-tight">
            🎨 Slaid Pembentangan PdP Interaktif
          </h2>
          <p className="text-slate-600 text-sm mt-1 font-medium">
            Reka bentuk slaid moden dengan skrip guru dan butang sebutan audio Arab.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-5 py-3 rounded-2xl font-black text-sm transition-all shadow-lg hover:scale-105 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-yellow-300" />
            <span>Cetak Slaid 🖨️</span>
          </button>

          <div className="flex items-center gap-2 bg-purple-50 p-2 rounded-2xl border-2 border-purple-200">
            <button
              onClick={handlePrev}
              disabled={currentSlideIndex === 0}
              className="p-2.5 rounded-xl bg-white hover:bg-purple-100 text-purple-950 disabled:opacity-40 transition-all cursor-pointer shadow-xs"
            >
              <ChevronLeft className="w-5 h-5 font-black" />
            </button>
            <span className="text-sm font-black text-purple-900 px-3">
              {currentSlideIndex + 1} / {safeSlides.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentSlideIndex === safeSlides.length - 1}
              className="p-2.5 rounded-xl bg-white hover:bg-purple-100 text-purple-950 disabled:opacity-40 transition-all cursor-pointer shadow-xs"
            >
              <ChevronRight className="w-5 h-5 font-black" />
            </button>
          </div>
        </div>
      </div>

      {/* Canva-style Slide Presentation Canvas */}
      <div className={`bg-white rounded-3xl shadow-2xl border-4 border-purple-300 overflow-hidden transition-all ${isFullscreen ? 'fixed inset-4 z-50 max-w-none m-0' : ''}`}>
        <div className={`bg-gradient-to-br ${currentSlide.backgroundColor || 'from-violet-600 via-pink-600 to-amber-500 text-white'} p-8 sm:p-16 min-h-[480px] flex flex-col justify-between relative shadow-2xl overflow-hidden`}>
          {/* Decorative Canva-style background blobs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/10 rounded-full blur-2xl pointer-events-none" />

          {/* Slide Top Header */}
          <div className="flex justify-between items-center text-white/90 text-xs font-black uppercase tracking-wider relative z-10">
            <div className="bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/30 shadow-sm">
              📚 {safeRph.mataPelajaran} • {safeRph.tahun}
            </div>
            <div className="bg-yellow-300 text-purple-950 px-4 py-1.5 rounded-full font-black shadow-md">
              Slaid #{currentSlide.slideNumber || (currentSlideIndex + 1)} ✨
            </div>
          </div>

          {/* Slide Center Content */}
          <div className="my-auto text-center space-y-6 py-8 relative z-10">
            <div className="inline-block bg-white/20 backdrop-blur-md px-6 py-2 rounded-2xl border border-white/30 text-yellow-200 text-sm font-black shadow-lg">
              {safeRph.tajuk}
            </div>

            <h2 className="text-5xl sm:text-6xl font-black font-arabic tracking-wide drop-shadow-lg text-white" dir="rtl">
              {currentSlide.titleArabic}
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-yellow-200 drop-shadow-md">
              {currentSlide.titleMalay}
            </h3>

            <div className="max-w-2xl mx-auto space-y-3 pt-4">
              {(currentSlide.bulletPoints || []).map((point, idx) => (
                <div key={idx} className="bg-white/15 backdrop-blur-md px-6 py-3.5 rounded-2xl text-base sm:text-lg font-extrabold border-2 border-white/30 shadow-xl flex items-center justify-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-yellow-300 shrink-0 shadow-xs" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Bottom Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-bold text-white/90 pt-4 border-t-2 border-white/20 relative z-10">
            <span className="bg-black/20 px-4 py-2 rounded-xl backdrop-blur-sm">
              🎨 Cadangan Visual: {currentSlide.visualSuggestion}
            </span>
            <button
              onClick={() => handleSpeak(currentSlide.titleArabic)}
              className="bg-yellow-300 hover:bg-yellow-400 text-purple-950 px-5 py-2.5 rounded-2xl font-black flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:scale-105"
            >
              <Volume2 className="w-4 h-4" />
              <span>Sebut Tajuk 🔊</span>
            </button>
          </div>
        </div>

        {/* Teacher Notes & Script Bar */}
        <div className="p-6 bg-purple-50/80 border-t-2 border-purple-200 space-y-2">
          <div className="flex items-center gap-2 text-xs font-black text-purple-950 uppercase tracking-wider">
            <MonitorPlay className="w-4 h-4 text-pink-600" />
            <span>Skrip & Panduan Guru (Speaker Notes):</span>
          </div>
          <p className="text-slate-800 text-sm bg-white p-4 rounded-2xl border-2 border-purple-200 shadow-sm font-medium">
            {currentSlide.teacherScript}
          </p>
        </div>
      </div>
    </div>
  );
};
