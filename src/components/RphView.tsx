import React from 'react';
import { RPHData } from '../types';
import { Printer, BookmarkCheck, Calendar, Clock, BookOpen, Award, CheckCircle, Sparkles } from 'lucide-react';

interface RphViewProps {
  rph: RPHData;
  onSave: () => void;
  isSaved: boolean;
}

export const RphView: React.FC<RphViewProps> = ({ rph, onSave, isSaved }) => {
  const handlePrint = () => {
    window.print();
  };

  if (!rph) return null;

  const objektifList = rph.objektifPembelajaran || ["Murid dapat menguasai kemahiran yang dipelajari."];
  const kriteriaList = rph.kriteriaKejayaan || ["Dapat menyiapkan tugasan dengan baik."];
  const bbmList = rph.bahanBantuMengajar || ["Slaid PdP", "Kad Imbasan"];
  const emkList = rph.elemenMerentasKurikulum || ["Nilai Murni"];

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-purple-200 p-6 sm:p-10 print:shadow-none print:border-none print:p-0">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b-2 border-purple-100 print:hidden">
        <div>
          <span className="bg-pink-100 text-pink-800 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-xs">
            ✨ Format Rasmi IPG & KSSR Semakan
          </span>
          <h2 className="text-2xl font-black text-purple-950 mt-1">Dokumen Rancangan Pengajaran Harian (RPH)</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onSave}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all border-2 cursor-pointer hover:scale-105 ${
              isSaved
                ? 'bg-emerald-50 text-emerald-800 border-emerald-400'
                : 'bg-white hover:bg-purple-50 text-purple-900 border-purple-300 shadow-md'
            }`}
          >
            <BookmarkCheck className={`w-4 h-4 ${isSaved ? 'text-emerald-600' : 'text-purple-600'}`} />
            <span>{isSaved ? 'Tersimpan dalam Arkib' : 'Simpan RPH'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-black text-sm transition-all shadow-lg hover:scale-105 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-yellow-300" />
            <span>Cetak RPH 🖨️</span>
          </button>
        </div>
      </div>

      {/* RPH Printable Document Container */}
      <div className="space-y-6 text-slate-800 text-sm leading-relaxed print:text-black">
        {/* Header Metadata Box */}
        <div className="border-3 border-purple-400 rounded-3xl overflow-hidden shadow-md">
          <div className="bg-gradient-to-r from-purple-700 via-pink-600 to-amber-500 text-white px-6 py-4 font-black text-base flex justify-between items-center print:bg-slate-200 print:text-slate-900">
            <span>RANCANGAN PENGAJARAN HARIAN (RPH) BAHASA ARAB</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-black backdrop-blur-sm print:text-slate-800">
              {rph.tahun || 'Tahun 1'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x-2 divide-purple-100 bg-purple-50/30">
            <div className="p-5 space-y-2.5">
              <div className="flex justify-between">
                <span className="font-bold text-purple-900">Mata Pelajaran:</span>
                <span className="font-black text-slate-900">{rph.mataPelajaran || 'Bahasa Arab'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-purple-900">Kelas / Tahun:</span>
                <span className="font-black text-slate-900">{rph.tahun || 'Tahun 1'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-purple-900">Masa / Tempoh:</span>
                <span className="font-black text-slate-900">{rph.masa || '60 Minit'}</span>
              </div>
            </div>

            <div className="p-5 space-y-2.5">
              <div className="flex justify-between">
                <span className="font-bold text-purple-900">Tarikh:</span>
                <span className="font-black text-slate-900">{rph.tarikh || new Date().toISOString().split('T')[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-purple-900">Tajuk Utama:</span>
                <span className="font-black text-pink-700 text-right">{rph.tajuk || 'Bahasa Arab'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Kurikulum Standards */}
        <div className="border-2 border-pink-200 rounded-3xl p-6 space-y-4 bg-gradient-to-br from-pink-50/50 to-purple-50/50 shadow-md">
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-purple-800 mb-1">Standard Kandungan:</h3>
            <p className="font-bold text-slate-900 text-base">{rph.standardKandungan || 'Standard Kandungan Bahasa Arab'}</p>
          </div>
          <div className="pt-3 border-t border-pink-200/60">
            <h3 className="text-xs font-black uppercase tracking-wider text-purple-800 mb-1">Standard Pembelajaran:</h3>
            <p className="font-bold text-slate-900 text-base">{rph.standardPembelajaran || 'Standard Pembelajaran Bahasa Arab'}</p>
          </div>
        </div>

        {/* Objektif & Kriteria Kejayaan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="border-3 border-pink-300 bg-pink-50/70 rounded-3xl p-6 shadow-md">
            <h3 className="font-black text-pink-950 flex items-center gap-2 mb-3 text-base">
              <Award className="w-5 h-5 text-pink-600" />
              <span>Objektif Pembelajaran</span>
            </h3>
            <ul className="space-y-2.5">
              {objektifList.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-slate-800 font-medium">
                  <span className="bg-pink-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-black shadow-xs">
                    {idx + 1}
                  </span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-3 border-sky-300 bg-sky-50/70 rounded-3xl p-6 shadow-md">
            <h3 className="font-black text-sky-950 flex items-center gap-2 mb-3 text-base">
              <CheckCircle className="w-5 h-5 text-sky-600" />
              <span>Kriteria Kejayaan</span>
            </h3>
            <ul className="space-y-2.5">
              {kriteriaList.map((krit, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-slate-800 font-medium">
                  <span className="bg-sky-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-black shadow-xs">
                    {idx + 1}
                  </span>
                  <span>{krit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sokongan Pedagogi & BBM */}
        <div className="border-2 border-purple-200 rounded-3xl p-6 bg-purple-50/40 space-y-4 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <span className="block text-xs font-black text-purple-900 uppercase tracking-wider mb-1">Pengetahuan Sedia Ada:</span>
              <p className="font-semibold text-slate-800">{rph.pengetahuanSediaAda || 'Murid pernah mendengar perkataan asas.'}</p>
            </div>
            <div>
              <span className="block text-xs font-black text-purple-900 uppercase tracking-wider mb-1">Bahan Bantu Mengajar (BBM):</span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {bbmList.map((bbm, idx) => (
                  <span key={idx} className="bg-white px-3 py-1.5 rounded-xl border border-purple-200 text-xs font-bold text-purple-900 shadow-xs">
                    {bbm}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="block text-xs font-black text-purple-900 uppercase tracking-wider mb-1">Elemen Merentas Kurikulum (EMK):</span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {emkList.map((emk, idx) => (
                  <span key={idx} className="bg-white px-3 py-1.5 rounded-xl border border-pink-200 text-xs font-bold text-pink-900 shadow-xs">
                    {emk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Langkah-langkah Pengajaran */}
        <div className="space-y-5">
          <h3 className="text-xl font-black text-purple-950 border-b-2 border-purple-100 pb-2">
            🎈 Langkah Pelaksanaan PdP (Format Standard IPG)
          </h3>

          {/* Set Induksi */}
          {rph.setInduksi && (
            <div className="border-3 border-emerald-300 rounded-3xl overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-3 font-black flex justify-between items-center text-sm">
                <span>SET INDUKSI</span>
                <span className="bg-yellow-300 text-emerald-950 px-3 py-1 rounded-full text-xs font-black shadow-sm">
                  {rph.setInduksi.masa || '5 Minit'}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x-2 divide-emerald-100 p-5 bg-white">
                <div className="space-y-1.5 md:pr-4">
                  <span className="text-xs font-black text-emerald-800 uppercase">Aktiviti Guru:</span>
                  <p className="text-slate-800 font-medium">{rph.setInduksi.aktivitiGuru}</p>
                </div>
                <div className="space-y-1.5 md:pl-4 pt-4 md:pt-0">
                  <span className="text-xs font-black text-emerald-800 uppercase">Aktiviti Murid:</span>
                  <p className="text-slate-800 font-medium">{rph.setInduksi.aktivitiMurid}</p>
                  <div className="mt-3 text-xs font-bold text-emerald-900 bg-emerald-50 p-2.5 rounded-2xl inline-block border border-emerald-200">
                    🎨 Catatan BBM: {rph.setInduksi.catatanBBM}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Langkah 1 */}
          {rph.langkah1 && (
            <div className="border-3 border-sky-300 rounded-3xl overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-sky-600 to-blue-600 text-white px-5 py-3 font-black flex justify-between items-center text-sm">
                <span>LANGKAH 1 ({rph.langkah1.fokus || 'Fokus 1'})</span>
                <span className="bg-yellow-300 text-sky-950 px-3 py-1 rounded-full text-xs font-black shadow-sm">
                  {rph.langkah1.masa || '15 Minit'}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x-2 divide-sky-100 p-5 bg-white">
                <div className="space-y-1.5 md:pr-4">
                  <span className="text-xs font-black text-sky-800 uppercase">Aktiviti Guru:</span>
                  <p className="text-slate-800 font-medium">{rph.langkah1.aktivitiGuru}</p>
                </div>
                <div className="space-y-1.5 md:pl-4 pt-4 md:pt-0">
                  <span className="text-xs font-black text-sky-800 uppercase">Aktiviti Murid:</span>
                  <p className="text-slate-800 font-medium">{rph.langkah1.aktivitiMurid}</p>
                  <div className="mt-3 text-xs font-bold text-sky-900 bg-sky-50 p-2.5 rounded-2xl inline-block border border-sky-200">
                    🎨 Catatan BBM: {rph.langkah1.catatanBBM}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Langkah 2 */}
          {rph.langkah2 && (
            <div className="border-3 border-purple-300 rounded-3xl overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-3 font-black flex justify-between items-center text-sm">
                <span>LANGKAH 2 ({rph.langkah2.fokus || 'Fokus 2'})</span>
                <span className="bg-yellow-300 text-purple-950 px-3 py-1 rounded-full text-xs font-black shadow-sm">
                  {rph.langkah2.masa || '15 Minit'}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x-2 divide-purple-100 p-5 bg-white">
                <div className="space-y-1.5 md:pr-4">
                  <span className="text-xs font-black text-purple-800 uppercase">Aktiviti Guru:</span>
                  <p className="text-slate-800 font-medium">{rph.langkah2.aktivitiGuru}</p>
                </div>
                <div className="space-y-1.5 md:pl-4 pt-4 md:pt-0">
                  <span className="text-xs font-black text-purple-800 uppercase">Aktiviti Murid:</span>
                  <p className="text-slate-800 font-medium">{rph.langkah2.aktivitiMurid}</p>
                  <div className="mt-3 text-xs font-bold text-purple-900 bg-purple-50 p-2.5 rounded-2xl inline-block border border-purple-200">
                    🎨 Catatan BBM: {rph.langkah2.catatanBBM}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Langkah 3 */}
          {rph.langkah3 && (
            <div className="border-3 border-pink-300 rounded-3xl overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-5 py-3 font-black flex justify-between items-center text-sm">
                <span>LANGKAH 3 ({rph.langkah3.fokus || 'Fokus 3'})</span>
                <span className="bg-yellow-300 text-pink-950 px-3 py-1 rounded-full text-xs font-black shadow-sm">
                  {rph.langkah3.masa || '15 Minit'}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x-2 divide-pink-100 p-5 bg-white">
                <div className="space-y-1.5 md:pr-4">
                  <span className="text-xs font-black text-pink-800 uppercase">Aktiviti Guru:</span>
                  <p className="text-slate-800 font-medium">{rph.langkah3.aktivitiGuru}</p>
                </div>
                <div className="space-y-1.5 md:pl-4 pt-4 md:pt-0">
                  <span className="text-xs font-black text-pink-800 uppercase">Aktiviti Murid:</span>
                  <p className="text-slate-800 font-medium">{rph.langkah3.aktivitiMurid}</p>
                  <div className="mt-3 text-xs font-bold text-pink-900 bg-pink-50 p-2.5 rounded-2xl inline-block border border-pink-200">
                    🎨 Catatan BBM: {rph.langkah3.catatanBBM}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Penutup */}
          {rph.penutup && (
            <div className="border-3 border-amber-300 rounded-3xl overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-5 py-3 font-black flex justify-between items-center text-sm">
                <span>PENUTUP (Kognitif & Sosial)</span>
                <span className="bg-yellow-300 text-amber-950 px-3 py-1 rounded-full text-xs font-black shadow-sm">
                  {rph.penutup.masa || '5 Minit'}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x-2 divide-amber-100 p-5 bg-white">
                <div className="space-y-1.5 md:pr-4">
                  <span className="text-xs font-black text-amber-800 uppercase">Aktiviti Guru:</span>
                  <p className="text-slate-800 font-medium">{rph.penutup.aktivitiGuru}</p>
                </div>
                <div className="space-y-1.5 md:pl-4 pt-4 md:pt-0">
                  <span className="text-xs font-black text-amber-800 uppercase">Aktiviti Murid:</span>
                  <p className="text-slate-800 font-medium">{rph.penutup.aktivitiMurid}</p>
                  <div className="mt-3 text-xs font-bold text-amber-900 bg-amber-50 p-2.5 rounded-2xl inline-block border border-amber-200">
                    🎨 Catatan BBM: {rph.penutup.catatanBBM}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Refleksi */}
        <div className="border-3 border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-6 shadow-md">
          <h3 className="font-black text-amber-950 mb-2 flex items-center gap-2 text-base">
            <span>🌟 Refleksi / Impak Pengajaran</span>
          </h3>
          <p className="text-slate-900 font-semibold italic bg-white p-4 rounded-2xl border-2 border-amber-200 shadow-inner">
            "{rph.refleksi || 'Murid menguasai objektif pembelajaran dengan baik.'}"
          </p>
        </div>
      </div>
    </div>
  );
};
