import React from 'react';
import { FlashcardItem, VocabularyItem } from '../types';
import { Printer, Sparkles, Layers, BookOpen, Volume2, Smile } from 'lucide-react';

interface FlashcardsViewProps {
  flashcards: FlashcardItem[];
  vocabularies: VocabularyItem[];
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({ flashcards, vocabularies }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      window.speechSynthesis.speak(utterance);
    }
  };

  const safeVocabs = vocabularies || [];
  const safeCards = flashcards || [];

  return (
    <div className="space-y-6">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-pink-200 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-800 text-xs font-black px-3.5 py-1.5 rounded-full mb-2 shadow-xs">
            <Smile className="w-4 h-4 text-pink-600 animate-bounce" />
            <span>BBM Paling Ceria & Warnawarni</span>
          </div>
          <h2 className="text-2xl font-black text-purple-950 tracking-tight">
            🎨 Kad Imbasan & Senarai Kosa Kata Interaktif
          </h2>
          <p className="text-slate-600 text-sm mt-1 font-medium">
            Sesuai dicetak untuk murid Tahap 1. Klik ikon pembesar suara untuk mendengar sebutan penutur Arab sebenar!
          </p>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6 py-3.5 rounded-2xl font-black text-sm transition-all shadow-lg hover:scale-105 cursor-pointer"
        >
          <Printer className="w-4 h-4 text-yellow-300" />
          <span>Cetak Kad Imbasan 🖨️</span>
        </button>
      </div>

      {/* Vocabulary Quick List Table */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-purple-200 p-6 sm:p-8">
        <h3 className="text-lg font-black text-purple-950 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-600" />
          <span>📚 Senarai Kosa Kata Utama (Mufradat)</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-purple-100 text-purple-950 text-xs font-black uppercase tracking-wider">
                <th className="p-3.5 rounded-l-2xl">Ikon / Visual</th>
                <th className="p-3.5">Bahasa Arab</th>
                <th className="p-3.5">Jawi</th>
                <th className="p-3.5">Maksud (BM)</th>
                <th className="p-3.5">Contoh Ayat</th>
                <th className="p-3.5 rounded-r-2xl text-center">Sebutan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100 font-medium">
              {safeVocabs.map((vocab) => (
                <tr key={vocab.id} className="hover:bg-purple-50/50 transition-colors">
                  <td className="p-3.5 text-3xl">{vocab.iconOrEmoji}</td>
                  <td className="p-3.5 font-black text-2xl text-pink-700 font-arabic" dir="rtl">{vocab.arabic}</td>
                  <td className="p-3.5 font-bold text-purple-800 text-base">{vocab.jawi}</td>
                  <td className="p-3.5 font-extrabold text-slate-900">{vocab.meaningMalay}</td>
                  <td className="p-3.5 text-slate-600 text-xs">
                    <span className="font-arabic text-base block font-bold text-purple-900" dir="rtl">{vocab.exampleSentenceArabic}</span>
                    <span className="font-medium">{vocab.exampleSentenceMalay}</span>
                  </td>
                  <td className="p-3.5 text-center">
                    <button
                      onClick={() => handleSpeak(vocab.arabic)}
                      className="p-2.5 rounded-2xl bg-pink-100 hover:bg-pink-200 text-pink-800 transition-all inline-flex items-center justify-center cursor-pointer hover:scale-110 shadow-xs"
                      title="Dengar Sebutan"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Flashcards Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-purple-950 flex items-center gap-2">
          <Layers className="w-5 h-5 text-pink-600" />
          <span>✨ Kad Imbasan Visual (Sesuai Cetak & Potong)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 print:grid-cols-2">
          {safeCards.map((card, idx) => {
            const cardColors = [
              "bg-gradient-to-br from-pink-50 to-rose-100 border-pink-300 text-rose-950",
              "bg-gradient-to-br from-sky-50 to-blue-100 border-sky-300 text-blue-950",
              "bg-gradient-to-br from-amber-50 to-yellow-100 border-amber-300 text-amber-950",
              "bg-gradient-to-br from-purple-50 to-indigo-100 border-purple-300 text-indigo-950"
            ];
            const chosenColor = cardColors[idx % cardColors.length];

            return (
              <div
                key={card.id || idx}
                className={`rounded-3xl border-4 ${chosenColor} p-6 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between aspect-[4/5] relative overflow-hidden print:break-inside-avoid hover:scale-105`}
              >
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-black shadow-sm text-purple-900">
                  Kad #{idx + 1} 🌟
                </div>

                <div className="my-auto text-center space-y-4">
                  <div className="text-6xl font-black font-arabic tracking-wide drop-shadow-sm" dir="rtl">
                    {card.frontArabic}
                  </div>
                  <div className="text-2xl font-black text-purple-900">
                    {card.frontJawi}
                  </div>
                  <div className="text-sm font-extrabold text-slate-800 bg-white/80 py-1.5 px-4 rounded-full inline-block shadow-xs border border-white">
                    {card.backMalay}
                  </div>
                </div>

                <div className="pt-4 border-t border-black/10 text-center space-y-2.5">
                  <p className="text-xs font-bold text-slate-700 italic">
                    💡 {card.hint}
                  </p>
                  <button
                    onClick={() => handleSpeak(card.frontArabic)}
                    className="w-full bg-white/90 hover:bg-white text-purple-950 text-xs font-black py-2.5 rounded-2xl border-2 border-purple-200 flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer hover:scale-105"
                  >
                    <Volume2 className="w-4 h-4 text-pink-600" />
                    <span>Dengar Sebutan 🔊</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
