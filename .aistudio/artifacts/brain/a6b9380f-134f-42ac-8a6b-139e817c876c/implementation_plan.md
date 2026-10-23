# Implementation Plan - RPH & BBM Bahasa Arab IPG Generator

A comprehensive web application designed for IPG Arabic language trainee teachers and primary school educators (Tahun 1 - 3 focus) to instantly generate complete Rancangan Pengajaran Harian (RPH) following IPG standard format and automatically create rich, colorful, printable Teaching Aids (Bahan Bantu Mengajar - BBM) including flashcards, worksheets, slide decks, interactive quizzes, and vocabulary cards.

## User Requirements & Preferences Addressed
- **Target Level:** Tahun 1 hingga Tahun 3 (Primary Tahap 1)
- **BBM Types:** Kad Imbasan (Flashcards), Lembaran Kerja (Worksheets), Slaid PdP (Slides), and Interactive Quizzes.
- **RPH Format:** Standard IPG Format (Butiran PdP, Standard Kandungan, Standard Pembelajaran, Objektif, Kriteria Kejayaan, Set Induksi, Langkah 1, Langkah 2, Langkah 3, Penutup, Refleksi, and BBM checklist).

## Architecture & Key Features

### 1. Backend API (`server.ts`)
- `/api/generate-rph-bbm`: Express endpoint using `@google/genai` (Gemini 2.5/2.5-flash) to generate structured JSON containing:
  - Complete RPH details (Tajuk, Standard Kandungan/Pembelajaran, Objektif, Langkah demi langkah Set Induksi hingga Penutup).
  - Vocabulary list with Arabic script (Tashkeel), Jawi, Malay translation, and example sentences.
  - Kad Imbasan (Flashcard) items with visual image prompts or emoji/icon representations and color themes.
  - Lembaran Kerja (Worksheet) exercises (matching, fill-in-the-blanks, coloring/tracing, structured questions).
  - Slaid PdP outline (Slide 1 to Slide 8) with titles, bullet points, and teacher notes.
  - Kuiz Interaktif / Permainan Bahasa (Interactive Quiz questions with options).

### 2. Frontend UI (`src/App.tsx` & components)
- **Dashboard / Generator Form:**
  - Topic selector (e.g., Al-Huruuf al-Hijaiyah, Anggota Badan, Keluarga Saya, Makanan & Minuman, Nombor & Bilangan, Haiwan, Hari-hari dalam Seminggu).
  - Custom topic input (e.g. "Huruf Ba' berbaris atas", "Ahli Keluarga").
  - Tahun selector (Tahun 1, Tahun 2, Tahun 3).
  - Masa / Tempoh (e.g. 30 minit / 60 minit).
  - Theme/Tone selector and "Jana RPH & BBM Pintar" button with loading state.
- **Interactive Workspace Tabs:**
  - **Tab 1: RPH (Rancangan Pengajaran Harian IPG):** Professional view resembling official IPG lesson plan forms, editable inline or copyable/printable.
  - **Tab 2: Kad Imbasan (Flashcards):** Beautiful printable flashcards grid with Arabic font styling, Jawi, Malay, and visual illustrations. Includes print-friendly layout.
  - **Tab 3: Lembaran Kerja (Worksheets):** Printable activity sheets with exercises, instructions in BM & Arabic, answer keys for teachers.
  - **Tab 4: Slaid PdP (Presentation Slides):** Slide-by-slide visual preview deck with teacher scripts and visuals.
  - **Tab 5: Kuiz & Permainan (Interactive Quiz):** Engaging gamified quiz preview for classroom use.
- **Export & Print Features:**
  - "Cetak RPH Sahaja" (Print RPH) & "Cetak Semua BBM & Kad Imbasan" (Print-friendly CSS `@media print`).
  - Save to My RPH Library (LocalStorage) so teachers can store and revisit past RPHs.

## File Structure Plan
- `server.ts`: Express backend handling AI generation via Gemini API.
- `src/types.ts`: TypeScript interfaces for RPH, BBM items, flashcards, worksheets, quizzes.
- `src/components/Header.tsx`: App branding and quick navigation.
- `src/components/GeneratorForm.tsx`: Input form for topic, year, duration.
- `src/components/RphView.tsx`: Formatted IPG RPH display with print styling.
- `src/components/FlashcardsView.tsx`: Interactive & printable flashcards.
- `src/components/WorksheetsView.tsx`: Printable student worksheets.
- `src/components/SlidesView.tsx`: Slide deck generator & preview.
- `src/components/QuizView.tsx`: Interactive classroom quiz.
- `src/components/SavedRphModal.tsx`: Saved RPH history modal.
- `src/index.css`: Tailwind configuration and print styles.
