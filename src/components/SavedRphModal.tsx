import React from 'react';
import { RPHData } from '../types';
import { X, FolderArchive, Trash2, ArrowRight, BookOpen, Calendar, Clock } from 'lucide-react';

interface SavedRphModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedList: { id: string; timestamp: string; rph: RPHData }[];
  onLoadRph: (rph: RPHData) => void;
  onDeleteRph: (id: string) => void;
}

export const SavedRphModal: React.FC<SavedRphModalProps> = ({
  isOpen,
  onClose,
  savedList,
  onLoadRph,
  onDeleteRph,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-fade-in">
        <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <FolderArchive className="w-6 h-6 text-amber-300" />
            <h3 className="text-lg font-bold">Arkib RPH & BBM Tersimpan</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {savedList.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-slate-500 font-medium">Tiada RPH yang tersimpan dalam arkib lagi.</p>
              <p className="text-xs text-slate-400">Klik butang "Simpan RPH" pada paparan RPH untuk menyimpannya di sini.</p>
            </div>
          ) : (
            savedList.map((item) => (
              <div
                key={item.id}
                className="border border-slate-200 hover:border-emerald-400 rounded-2xl p-5 bg-slate-50/50 hover:bg-emerald-50/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {item.rph.tahun}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {item.timestamp}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">{item.rph.tajuk}</h4>
                  <p className="text-xs text-slate-600 line-clamp-1">
                    Objektif: {item.rph.objektifPembelajaran[0]}
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => {
                      onLoadRph(item.rph);
                      onClose();
                    }}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl font-bold text-xs transition-all shadow-xs cursor-pointer"
                  >
                    <span>Buka RPH</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteRph(item.id)}
                    className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-all cursor-pointer"
                    title="Padam"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
