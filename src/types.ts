export interface VocabularyItem {
  id: string;
  arabic: string;
  jawi: string;
  meaningMalay: string;
  transliteration: string;
  exampleSentenceArabic?: string;
  exampleSentenceMalay?: string;
  iconOrEmoji: string;
  colorTheme: string;
}

export interface FlashcardItem {
  id: string;
  frontArabic: string;
  frontJawi: string;
  backMalay: string;
  imagePrompt: string;
  hint: string;
  colorClass: string;
}

export interface WorksheetExercise {
  id: string;
  type: 'matching' | 'fill_blank' | 'coloring' | 'sorting' | 'structured';
  instructionMalay: string;
  instructionArabic: string;
  items: {
    prompt: string;
    target?: string;
    options?: string[];
    answer: string;
  }[];
}

export interface SlideItem {
  slideNumber: number;
  titleMalay: string;
  titleArabic: string;
  bulletPoints: string[];
  teacherScript: string;
  visualSuggestion: string;
  backgroundColor: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  arabicPrompt?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface RPHData {
  mataPelajaran: string;
  tahun: string;
  tajuk: string;
  standardKandungan: string;
  standardPembelajaran: string;
  objektifPembelajaran: string[];
  kriteriaKejayaan: string[];
  masa: string;
  tarikh: string;
  pengetahuanSediaAda: string;
  bahanBantuMengajar: string[];
  elemenMerentasKurikulum: string[];
  
  // Langkah PdP (IPG Standard Format)
  setInduksi: {
    masa: string;
    aktivitiGuru: string;
    aktivitiMurid: string;
    catatanBBM: string;
  };
  langkah1: {
    masa: string;
    fokus: string;
    aktivitiGuru: string;
    aktivitiMurid: string;
    catatanBBM: string;
  };
  langkah2: {
    masa: string;
    fokus: string;
    aktivitiGuru: string;
    aktivitiMurid: string;
    catatanBBM: string;
  };
  langkah3: {
    masa: string;
    fokus: string;
    aktivitiGuru: string;
    aktivitiMurid: string;
    catatanBBM: string;
  };
  penutup: {
    masa: string;
    aktivitiGuru: string;
    aktivitiMurid: string;
    catatanBBM: string;
  };
  refleksi: string;

  // Generated BBM items
  vocabularies: VocabularyItem[];
  flashcards: FlashcardItem[];
  worksheets: WorksheetExercise[];
  slides: SlideItem[];
  quiz: QuizQuestion[];
}

export interface GenerateRequest {
  topic: string;
  tahun: string;
  duration: string;
  customNotes?: string;
}
