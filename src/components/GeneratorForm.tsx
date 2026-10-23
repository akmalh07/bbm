import React, { useState } from 'react';
import { Sparkles, Wand2, BookOpen, Clock, Calendar, CheckCircle2, Layers, Upload, FileText, Smile } from 'lucide-react';
import { GenerateRequest } from '../types';

interface GeneratorFormProps {
  onGenerate: (req: GenerateRequest) => void;
  onImportRph: (rphText: string) => void;
  isLoading: boolean;
}

const PRESET_TOPICS = [
  {
    title: "Al-Huruuf al-Hijaiyah (أحرف الهجائية)",
    tahun: "Tahun 1",
    duration: "60 Minit",
    notes: "Fokus sebutan baris fathah, kasrah, dan dammah dengan betul.",
    color: "from-pink-500 to-rose-500"
  },
  {
    title: "Anggota Badan (أَعْضَاءُ الْجِسْمِ)",
    tahun: "Tahun 1",
    duration: "60 Minit",
    notes: "Mengenal nama anggota badan asas seperti kepala, tangan, kaki, mata.",
    color: "from-purple-500 to-indigo-500"
  },
  {
    title: "Keluarga Saya (أُسْرَتِي)",
    tahun: "Tahun 2",
    duration: "60 Minit",
    notes: "Ahli keluarga (bapa, ibu, abang, kakak, adik) dengan struktur هَذَا / هَذِهِ.",
    color: "from-sky-500 to-blue-500"
  },
  {
    title: "Makanan & Minuman (الطَّعَامُ وَالشَّرَابُ)",
    tahun: "Tahun 2",
    duration: "60 Minit",
    notes: "Makanan dan minuman kegemaran dengan ungkapan أُحِبُّ.",
    color: "from-amber-500 to-orange-500"
  },
  {
    title: "Hari & Nombor (الأَيَّامُ وَالْأَرْقَامُ)",
    tahun: "Tahun 3",
    duration: "60 Minit",
    notes: "Hari dalam seminggu dan nombor 1 hingga 10 dalam Bahasa Arab.",
    color: "from-emerald-500 to-teal-500"
  }
];

export const GeneratorForm: React.FC<GeneratorFormProps> = ({ onGenerate, onImportRph, isLoading }) => {
  const [topic, setTopic] = useState("Al-Huruuf al-Hijaiyah (أحرف الهجائية)");
  const [tahun, setTahun] = useState("Tahun 1");
  const [duration, setDuration] = useState("60 Minit");
  const [customNotes, setCustomNotes] = useState("");
  const [importText, setImportText] = useState("");
  const [showImportBox, setShowImportBox] = useState(false);

  const handlePresetSelect = (preset: typeof PRESET_TOPICS[0]) => {
    setTopic(preset.title);
    setTahun(preset.tahun);
    setDuration(preset.duration);
    setCustomNotes(preset.notes);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onGenerate({ topic, tahun, duration, customNotes });
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onImportRph(importText);
  };

  const handleLoadAttachedPdf = () => {
    onImportRph("Minggu 6 RPH Kemahiran Mendengar, Membaca dan Menulis Unit 4: أحافظ على الأدوات الدراسية / الحروف ف، ط، ق");
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-pink-200 p-6 sm:p-8 mb-8 print:hidden space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-2 border-pink-100">
        <div>
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-800 text-xs font-black px-3 py-1.5 rounded-full mb-2 shadow-xs">
            <Smile className="w-4 h-4 text-pink-600 animate-spin" />
            <span>Khas untuk Guru Pelatih IPG & Murid Ceria!</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-purple-950 tracking-tight flex items-center gap-2">
            🎨 Penjana RPH & BBM Paling Warna-Warni
          </h2>
          <p className="text-slate-600 text-sm mt-1 font-medium">
            Pilih topik KSSR Tahap 1 atau import RPH Word/PDF anda. Sistem akan menghasilkan kad imbasan, lembaran kerja, dan slaid ceria serta-merta!
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={handleLoadAttachedPdf}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 px-5 py-3 rounded-2xl font-black text-xs transition-all shadow-lg hover:scale-105 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>📥 Muat RPH Minggu 6 (Fail Lampiran)</span>
          </button>

          <button
            type="button"
            onClick={() => setShowImportBox(!showImportBox)}
            className="flex items-center gap-2 bg-purple-100 hover:bg-purple-200 text-purple-900 border-2 border-purple-300 px-5 py-3 rounded-2xl font-black text-xs transition-all cursor-pointer hover:scale-105"
          >
            <Upload className="w-4 h-4 text-purple-600" />
            <span>{showImportBox ? 'Tutup Import' : '📂 Import RPH Fail Sendiri'}</span>
          </button>
        </div>
      </div>

      {/* Import RPH Box */}
      {showImportBox && (
        <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 border-3 border-dashed border-purple-300 rounded-3xl p-6 space-y-4 animate-fade-in shadow-inner">
          <h3 className="font-black text-purple-950 text-base flex items-center gap-2">
            <Upload className="w-5 h-5 text-purple-600" />
            <span>Import Teks RPH daripada Fail Word / PDF</span>
          </h3>
          <p className="text-xs text-slate-700 font-medium">
            Tampal teks RPH anda di bawah. AI akan menganalisis dan membina BBM super ceria yang sepadan!
          </p>
          <form onSubmit={handleImportSubmit} className="space-y-3">
            <textarea
              rows={4}
              dir="auto"
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Tampal teks RPH anda di sini (Sokongan penuh Bahasa Melayu & العربية)..."
              className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 focus:ring-4 focus:ring-purple-400 bg-white text-slate-900 text-sm outline-none shadow-sm font-medium font-arabic"
              required
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black px-6 py-3 rounded-2xl text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-105"
              >
                <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
                <span>Jana BBM Ceria Daripada RPH</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Preset Quick Select */}
      <div>
        <label className="block text-xs font-black text-purple-900 uppercase tracking-wider mb-2.5">
          🌈 Pilih Topik KSSR Tahap 1 Paling Popular:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {PRESET_TOPICS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handlePresetSelect(preset)}
              className={`text-left p-4 rounded-3xl border-2 text-xs font-bold transition-all flex flex-col justify-between hover:scale-105 cursor-pointer shadow-md ${
                topic === preset.title
                  ? 'bg-gradient-to-br from-pink-500 to-purple-600 border-white text-white ring-4 ring-pink-300 shadow-xl'
                  : 'bg-white hover:bg-pink-50/60 border-pink-200 text-slate-800'
              }`}
            >
              <div className="font-black mb-2 line-clamp-2 text-sm">{preset.title}</div>
              <div className={`flex items-center justify-between text-[11px] mt-2 pt-2 border-t ${topic === preset.title ? 'border-white/30 text-white/90' : 'border-slate-100 text-slate-600'}`}>
                <span className={`px-2.5 py-0.5 rounded-full font-black ${topic === preset.title ? 'bg-white text-purple-900' : 'bg-pink-100 text-pink-800'}`}>
                  {preset.tahun}
                </span>
                <span>{preset.duration}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-black text-purple-950 mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-pink-600" />
              <span>Tajuk / Tema Pembelajaran</span>
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Contoh: Al-Huruuf al-Hijaiyah"
              className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 focus:ring-4 focus:ring-pink-300 focus:border-pink-500 text-slate-900 text-sm outline-none transition-all shadow-sm font-bold bg-pink-50/30"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-black text-purple-950 mb-1.5 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-pink-600" />
              <span>Tahun / Tahap</span>
            </label>
            <select
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 focus:ring-4 focus:ring-pink-300 focus:border-pink-500 text-slate-900 text-sm outline-none transition-all shadow-sm bg-pink-50/30 font-bold"
            >
              <option value="Tahun 1">Tahun 1 (Ceria)</option>
              <option value="Tahun 2">Tahun 2 (Ceria)</option>
              <option value="Tahun 3">Tahun 3 (Ceria)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-black text-purple-950 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-pink-600" />
              <span>Tempoh Masa PdP</span>
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 focus:ring-4 focus:ring-pink-300 focus:border-pink-500 text-slate-900 text-sm outline-none transition-all shadow-sm bg-pink-50/30 font-bold"
            >
              <option value="30 Minit">30 Minit (1 Waktu)</option>
              <option value="60 Minit">60 Minit (2 Waktu Standard IPG)</option>
              <option value="90 Minit">90 Minit (3 Waktu)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-black text-purple-950 mb-1.5">
              Nota Khas / Fokus Pedagogi (Pilihan)
            </label>
            <input
              type="text"
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="Contoh: Tekankan didik hibur & permainan bahasa"
              className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 focus:ring-4 focus:ring-pink-300 focus:border-pink-500 text-slate-900 text-sm outline-none transition-all shadow-sm bg-pink-50/30 font-medium"
            />
          </div>
        </div>

        <div className="pt-3 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-700 hover:to-indigo-700 text-white font-black px-10 py-4 rounded-3xl shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 text-base cursor-pointer hover:scale-105"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                <span>Sedang Menjana RPH & BBM Ceria...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5 text-yellow-300 animate-bounce" />
                <span>🚀 Jana RPH & BBM Warna-Warni Sekarang!</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
