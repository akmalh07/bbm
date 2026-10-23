import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { HelpCircle, Sparkles, CheckCircle2, XCircle, RotateCcw, Trophy, Smile } from 'lucide-react';

interface QuizViewProps {
  quiz: QuizQuestion[];
}

export const QuizView: React.FC<QuizViewProps> = ({ quiz }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const safeQuiz = quiz || [];

  if (safeQuiz.length === 0) {
    return <div className="p-8 text-center text-slate-500">Tiada kuiz dijumpai.</div>;
  }

  const currentQ = safeQuiz[currentIndex] || safeQuiz[0];

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQ.correctAnswerIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < safeQuiz.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsAnswered(false);
    setIsQuizCompleted(false);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-pink-200 p-6 sm:p-8 text-center">
        <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-800 text-xs font-black px-3.5 py-1.5 rounded-full mb-2 shadow-xs">
          <Smile className="w-4 h-4 text-pink-600 animate-bounce" />
          <span>Kuiz Interaktif Paling Seronok</span>
        </div>
        <h2 className="text-2xl font-black text-purple-950 tracking-tight">
          🎮 Permainan Kuiz Bahasa Arab Bilik Darjah
        </h2>
        <p className="text-slate-600 text-sm mt-1 font-medium">
          Jawab soalan bersama murid secara interaktif dan ceria!
        </p>
      </div>

      {!isQuizCompleted ? (
        <div className="bg-white rounded-3xl shadow-2xl border-4 border-purple-300 p-6 sm:p-10 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b-2 border-purple-100 text-xs font-black text-purple-900 uppercase tracking-wider">
            <span>Soalan {currentIndex + 1} daripada {safeQuiz.length} 🎯</span>
            <span className="bg-pink-100 text-pink-800 px-4 py-1.5 rounded-full shadow-xs">
              Skor Semasa: {score} ⭐
            </span>
          </div>

          <div className="text-center space-y-4 py-4">
            {currentQ.arabicPrompt && (
              <div className="text-5xl sm:text-6xl font-black text-pink-600 font-arabic py-2 drop-shadow-sm" dir="rtl">
                {currentQ.arabicPrompt}
              </div>
            )}
            <h3 className="text-xl sm:text-2xl font-black text-purple-950">{currentQ.question}</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(currentQ.options || []).map((option, idx) => {
              let btnStyle = "bg-purple-50 hover:bg-pink-50 border-purple-200 text-purple-950 hover:border-pink-400";
              if (isAnswered) {
                if (idx === currentQ.correctAnswerIndex) {
                  btnStyle = "bg-emerald-600 border-emerald-600 text-white shadow-xl scale-105";
                } else if (idx === selectedOption) {
                  btnStyle = "bg-rose-500 border-rose-500 text-white shadow-xl";
                } else {
                  btnStyle = "bg-slate-100 border-slate-200 text-slate-400 opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  disabled={isAnswered}
                  className={`p-5 rounded-3xl border-3 font-black text-base transition-all flex items-center justify-between cursor-pointer shadow-md hover:scale-105 ${btnStyle}`}
                >
                  <span>{option}</span>
                  {isAnswered && idx === currentQ.correctAnswerIndex && (
                    <CheckCircle2 className="w-6 h-6 text-white animate-bounce" />
                  )}
                  {isAnswered && idx === selectedOption && idx !== currentQ.correctAnswerIndex && (
                    <XCircle className="w-6 h-6 text-white" />
                  )}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 border-3 border-pink-300 rounded-3xl p-6 space-y-3 animate-fade-in shadow-md">
              <div className="flex items-center gap-2 font-black text-purple-950 text-base">
                <CheckCircle2 className="w-6 h-6 text-pink-600" />
                <span>Penerangan Jawapan:</span>
              </div>
              <p className="text-slate-800 text-sm font-medium">{currentQ.explanation}</p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-black px-8 py-3 rounded-2xl shadow-lg transition-all cursor-pointer hover:scale-105"
                >
                  {currentIndex < safeQuiz.length - 1 ? 'Soalan Seterusnya ➔' : 'Lihat Keputusan Akhir 🏆'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-2xl border-4 border-amber-300 p-8 sm:p-12 text-center space-y-6">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-300 to-orange-400 text-white rounded-full flex items-center justify-center mx-auto shadow-xl animate-bounce">
            <Trophy className="w-12 h-12" />
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-purple-950">Tahniah! Kuiz Ceria Selesai! 🎉</h3>
            <p className="text-slate-700 text-lg font-bold">
              Anda berjaya menjawab <span className="text-pink-600 font-black text-xl">{score}</span> daripada <span className="font-bold">{safeQuiz.length}</span> soalan dengan cemerlang!
            </p>
          </div>
          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-black px-9 py-4 rounded-3xl shadow-xl transition-all cursor-pointer hover:scale-105"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Cuba Semula Kuiz 🔄</span>
          </button>
        </div>
      )}
    </div>
  );
};
