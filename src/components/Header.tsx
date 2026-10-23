import React from 'react';
import { BookOpen, Sparkles, FolderArchive, Printer, Star } from 'lucide-react';

interface HeaderProps {
  onOpenSaved: () => void;
  onPrintAll: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSaved, onPrintAll }) => {
  return (
    <header className="bg-gradient-to-r from-violet-600 via-pink-600 to-amber-500 text-white shadow-xl sticky top-0 z-50 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-3 rounded-3xl backdrop-blur-md border border-white/30 shadow-lg animate-bounce">
            <BookOpen className="w-8 h-8 text-yellow-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight drop-shadow-sm">
                🌟 RPH & BBM Bahasa Arab Ceria!
              </h1>
              <span className="bg-yellow-300 text-purple-950 text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Tahap 1 (Tahun 1-3)
              </span>
            </div>
            <p className="text-pink-100 text-xs sm:text-sm font-medium">
              Penjana Bahan Bantu Mengajar (BBM) & RPH Paling Ceria, Warnawarni & Interaktif!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
          <button
            onClick={onOpenSaved}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2.5 rounded-2xl text-sm font-bold transition-all border border-white/30 shadow-md backdrop-blur-sm cursor-pointer hover:scale-105"
          >
            <FolderArchive className="w-4 h-4 text-yellow-300" />
            <span>Arkib RPH Saya</span>
          </button>

          <button
            onClick={onPrintAll}
            className="flex items-center gap-2 bg-yellow-300 hover:bg-yellow-400 text-purple-950 px-5 py-2.5 rounded-2xl text-sm font-black transition-all shadow-lg hover:shadow-xl cursor-pointer hover:scale-105"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Keseluruhan 🖨️</span>
          </button>
        </div>
      </div>
    </header>
  );
};
