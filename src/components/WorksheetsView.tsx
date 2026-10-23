import React, { useState } from 'react';
import { WorksheetExercise, RPHData } from '../types';
import { Printer, Sparkles, FileText, CheckCircle2, Smile } from 'lucide-react';

interface WorksheetsViewProps {
  worksheets: WorksheetExercise[];
  rph: RPHData;
}

export const WorksheetsView: React.FC<WorksheetsViewProps> = ({ worksheets, rph }) => {
  const [showAnswers, setShowAnswers] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const safeWorksheets = worksheets || [];
  const safeRph = rph || { tahun: 'Tahun 1', tajuk: 'Bahasa Arab' };

  return (
    <div className="space-y-6">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-pink-200 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-800 text-xs font-black px-3.5 py-1.5 rounded-full mb-2 shadow-xs">
            <Smile className="w-4 h-4 text-pink-600 animate-bounce" />
            <span>Lembaran Kerja Murid Paling Ceria</span>
          </div>
          <h2 className="text-2xl font-black text-purple-950 tracking-tight">
            🎨 Lembaran Kerja & Latihan Pengukuhan Murid
          </h2>
          <p className="text-slate-600 text-sm mt-1 font-medium">
            Bahan latihan bertulis yang direka ceria dan warna-warni mengikut tahap murid Tahun 1 hingga 3.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className="flex items-center gap-2 bg-purple-100 hover:bg-purple-200 text-purple-900 border-2 border-purple-300 px-5 py-3 rounded-2xl font-black text-sm transition-all shadow-sm cursor-pointer hover:scale-105"
          >
            <CheckCircle2 className="w-4 h-4 text-purple-600" />
            <span>{showAnswers ? 'Sembunyikan Skema' : 'Papar Skema Jawapan 👀'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6 py-3.5 rounded-2xl font-black text-sm transition-all shadow-lg hover:scale-105 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-yellow-300" />
            <span>Cetak Lembaran Kerja 🖨️</span>
          </button>
        </div>
      </div>

      {/* Printable Worksheet Document */}
      <div className="bg-white rounded-3xl shadow-2xl border-4 border-purple-300 p-8 sm:p-12 space-y-8 print:shadow-none print:border-none print:p-0 print:space-y-6">
        {/* Worksheet Header Header */}
        <div className="border-b-3 border-purple-900 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 bg-purple-50/50 p-6 rounded-3xl">
          <div>
            <div className="text-xs font-black text-pink-700 uppercase tracking-wider mb-1">
              🌟 LEMBARAN KERJA BAHASA ARAB • {(safeRph.tahun || 'Tahun 1').toUpperCase()} 🌟
            </div>
            <h1 className="text-2xl font-black text-purple-950">{safeRph.tajuk || 'Bahasa Arab'}</h1>
          </div>
          <div className="w-full sm:w-72 border-2 border-purple-300 rounded-2xl p-4 text-xs space-y-2 bg-white shadow-sm print:bg-white">
            <div className="flex justify-between border-b border-purple-200 pb-1.5 font-bold">
              <span>Nama:</span>
              <span className="text-slate-400">................................................</span>
            </div>
            <div className="flex justify-between border-b border-purple-200 pb-1.5 font-bold">
              <span>Kelas:</span>
              <span className="text-slate-400">................................................</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Tarikh:</span>
              <span className="text-slate-400">................................................</span>
            </div>
          </div>
        </div>

        {/* Exercises list */}
        <div className="space-y-8">
          {safeWorksheets.map((ws, index) => (
            <div key={ws.id || index} className="border-3 border-pink-200 rounded-3xl p-6 sm:p-8 space-y-5 bg-gradient-to-br from-pink-50/30 to-purple-50/30 print:bg-white print:border-slate-400 shadow-md">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black px-3.5 py-1.5 rounded-full inline-block mb-2 shadow-xs">
                    Bahagian {index + 1} 🎯
                  </span>
                  <h3 className="font-black text-slate-900 text-lg">{ws.instructionMalay}</h3>
                  <p className="font-arabic text-purple-950 text-xl mt-1 font-bold" dir="rtl">{ws.instructionArabic}</p>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                {(ws.items || []).map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border-2 border-purple-200 shadow-sm print:border-slate-300">
                    <div className="flex items-center gap-3.5">
                      <span className="w-7 h-7 rounded-full bg-pink-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                        {i + 1}
                      </span>
                      <span className="font-black text-xl text-purple-950 font-arabic px-2" dir="rtl">{item.prompt}</span>
                      {item.target && <span className="text-slate-700 text-sm font-bold bg-pink-50 px-3 py-1 rounded-xl">({item.target})</span>}
                    </div>

                    <div className="flex items-center gap-3">
                      {item.options && (
                        <div className="flex items-center gap-2 flex-wrap">
                          {item.options.map((opt, optIdx) => (
                            <span key={optIdx} className="bg-purple-100 border border-purple-300 text-purple-950 px-3.5 py-1.5 rounded-xl text-xs font-black shadow-xs">
                              {opt}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="border-b-3 border-dashed border-purple-400 min-w-[140px] px-3 py-1.5 text-right text-pink-700 font-black text-base">
                        {showAnswers ? item.answer : '....................'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer encouragement */}
        <div className="text-center pt-6 border-t-2 border-purple-100 text-xs font-bold text-purple-800 italic">
          🌟 Usaha Tangga Kejayaan • Belajar Bahasa Arab dengan Ceria & Kreatif! 🌟
        </div>
      </div>
    </div>
  );
};
