import React, { useState, useEffect } from 'react';
import { RPHData, GenerateRequest } from './types';
import { Header } from './components/Header';
import { GeneratorForm } from './components/GeneratorForm';
import { RphView } from './components/RphView';
import { FlashcardsView } from './components/FlashcardsView';
import { WorksheetsView } from './components/WorksheetsView';
import { SlidesView } from './components/SlidesView';
import { QuizView } from './components/QuizView';
import { SavedRphModal } from './components/SavedRphModal';
import { FileText, Layers, FileSpreadsheet, Presentation, HelpCircle, CheckCircle2, Sparkles } from 'lucide-react';

export default function App() {
  const [currentRph, setCurrentRph] = useState<RPHData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'rph' | 'flashcards' | 'worksheets' | 'slides' | 'quiz'>('rph');
  const [savedList, setSavedList] = useState<{ id: string; timestamp: string; rph: RPHData }[]>([]);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load initial demo RPH or saved items on mount
  useEffect(() => {
    const loadedSaved = localStorage.getItem('arabic_rph_saved_list');
    if (loadedSaved) {
      try {
        setSavedList(JSON.parse(loadedSaved));
      } catch (e) {
        console.error(e);
      }
    }

    // Generate initial default RPH on first load so user sees full app immediately
    const defaultReq: GenerateRequest = {
      topic: "Al-Huruuf al-Hijaiyah (أحرف الهجائية)",
      tahun: "Tahun 1",
      duration: "60 Minit",
      customNotes: "Fokus sebutan makhraj huruf dan baris fathah, kasrah, dammah."
    };
    handleGenerate(defaultReq);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleGenerate = async (req: GenerateRequest) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-rph-bbm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req)
      });
      const contentType = response.headers.get("content-type");
      if (!response.ok || !contentType || !contentType.includes("application/json")) {
        throw new Error('Server error or non-JSON response');
      }
      const data = await response.json();
      setCurrentRph(data);
      setActiveTab('rph');
      showToast('✨ RPH & BBM Ceria Berjaya Dijana!');
    } catch (error) {
      console.error(error);
      showToast('Ralat menyambung ke server. Menggunakan data tempatan.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportRph = async (rphText: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/import-rph', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rphText })
      });
      const contentType = response.headers.get("content-type");
      if (!response.ok || !contentType || !contentType.includes("application/json")) {
        throw new Error('Server error or non-JSON response');
      }
      const data = await response.json();
      setCurrentRph(data);
      setActiveTab('rph');
      showToast('🌟 RPH Minggu 6 Berjaya Diimport & Dibina!');
    } catch (error) {
      console.error(error);
      showToast('Ralat mengimport RPH.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveRph = () => {
    if (!currentRph) return;
    const newItem = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' }),
      rph: currentRph
    };
    const updated = [newItem, ...savedList];
    setSavedList(updated);
    localStorage.setItem('arabic_rph_saved_list', JSON.stringify(updated));
    showToast('💾 RPH Berjaya Disimpan ke Arkib!');
  };

  const handleDeleteSaved = (id: string) => {
    const updated = savedList.filter(item => item.id !== id);
    setSavedList(updated);
    localStorage.setItem('arabic_rph_saved_list', JSON.stringify(updated));
    showToast('🗑️ RPH dipadam daripada arkib.');
  };

  const isCurrentSaved = currentRph
    ? savedList.some(item => item.rph.tajuk === currentRph.tajuk && item.rph.tahun === currentRph.tahun)
    : false;

  const handlePrintAll = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-amber-100 text-slate-900 pb-20 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-purple-950 text-white px-6 py-3.5 rounded-2xl shadow-2xl border-2 border-pink-400 flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-yellow-300" />
          <span className="text-sm font-black">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        onOpenSaved={() => setIsSavedModalOpen(true)}
        onPrintAll={handlePrintAll}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Generator & Importer Form */}
        <GeneratorForm
          onGenerate={handleGenerate}
          onImportRph={handleImportRph}
          isLoading={isLoading}
        />

        {currentRph && (
          <div className="space-y-6">
            {/* Navigation Tabs */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-3 shadow-xl border-4 border-purple-200 flex items-center gap-2.5 overflow-x-auto print:hidden">
              <button
                onClick={() => setActiveTab('rph')}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black text-sm transition-all whitespace-nowrap cursor-pointer hover:scale-105 ${
                  activeTab === 'rph'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-purple-950 hover:bg-purple-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>1. Dokumen RPH 📄</span>
              </button>

              <button
                onClick={() => setActiveTab('flashcards')}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black text-sm transition-all whitespace-nowrap cursor-pointer hover:scale-105 ${
                  activeTab === 'flashcards'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-purple-950 hover:bg-purple-100'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>2. Kad Imbasan 🎴</span>
              </button>

              <button
                onClick={() => setActiveTab('worksheets')}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black text-sm transition-all whitespace-nowrap cursor-pointer hover:scale-105 ${
                  activeTab === 'worksheets'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-purple-950 hover:bg-purple-100'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>3. Lembaran Kerja 📝</span>
              </button>

              <button
                onClick={() => setActiveTab('slides')}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black text-sm transition-all whitespace-nowrap cursor-pointer hover:scale-105 ${
                  activeTab === 'slides'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-purple-950 hover:bg-purple-100'
                }`}
              >
                <Presentation className="w-4 h-4" />
                <span>4. Slaid PdP 🖥️</span>
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black text-sm transition-all whitespace-nowrap cursor-pointer hover:scale-105 ${
                  activeTab === 'quiz'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-purple-950 hover:bg-purple-100'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>5. Kuiz Ceria 🎮</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="transition-all duration-300">
              {activeTab === 'rph' && (
                <RphView rph={currentRph} onSave={handleSaveRph} isSaved={isCurrentSaved} />
              )}
              {activeTab === 'flashcards' && (
                <FlashcardsView
                  flashcards={currentRph.flashcards}
                  vocabularies={currentRph.vocabularies}
                />
              )}
              {activeTab === 'worksheets' && (
                <WorksheetsView worksheets={currentRph.worksheets} rph={currentRph} />
              )}
              {activeTab === 'slides' && (
                <SlidesView slides={currentRph.slides} rph={currentRph} />
              )}
              {activeTab === 'quiz' && (
                <QuizView quiz={currentRph.quiz} />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Saved RPH Modal */}
      <SavedRphModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedList={savedList}
        onLoadRph={(rph) => {
          setCurrentRph(rph);
          setActiveTab('rph');
          showToast('📂 RPH dimuatkan dari arkib.');
        }}
        onDeleteRph={handleDeleteSaved}
      />
    </div>
  );
}
