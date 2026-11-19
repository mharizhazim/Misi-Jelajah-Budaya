import React from 'react';
import { BookOpen, Compass, ArrowRight } from 'lucide-react';
import { ADJECTIVE_CATEGORIES } from '../data/gameData';
import { PageView } from '../types/game';
import { retroAudio } from '../utils/audio';

interface GuidePageProps {
  onNavigate: (page: PageView) => void;
}

const GAME_STEPS = [
  'Pemain perlu memilih avatar sebagai watak pengembara (bermula dengan Orang Kampung).',
  'Pemain perlu meneroka tiga kawasan: Tapak Warisan, Lebuh Nusantara dan Puncak Karyawan.',
  'Setiap kawasan mempunyai cabaran kata adjektif yang berbeza daripada tahap mudah hingga sukar.',
  'Pemain perlu menjawab soalan dengan tepat untuk mengumpulkan syiling emas Kupang.',
  'Kupang digunakan di Kedai Avatar untuk membeli avatar baharu yang lebih hebat.',
  'Semua tiga tahap perlu diselesaikan untuk menamatkan pengembaraan dan meraih gelaran Wira Budaya.',
];

export const GuidePage: React.FC<GuidePageProps> = ({ onNavigate }) => {
  return (
    <main className="min-h-[calc(100vh-64px)] py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="pixel-box bg-[#FDF6E3] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-[#B45309] mb-1 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              KITAB ILMU BAHASA & WARISAN
            </p>
            <h1 className="font-pixel text-2xl sm:text-3xl text-[#2B1D14]">
              PANDUAN PERMAINAN
            </h1>
            <p className="text-sm font-medium text-[#5D4037] mt-1">
              Fahami langkah bermain dan ulang kaji sembilan jenis kata adjektif sebelum memulakan misi.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              retroAudio.playClick();
              onNavigate('WORLD_MAP');
            }}
            className="pixel-btn bg-[#16A34A] hover:bg-[#15803D] text-white px-5 py-2.5 text-sm font-extrabold flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Compass className="w-4 h-4" />
            <span>MULA PENGEMBARAAN</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* How to Play */}
        <section className="pixel-box bg-[#FDF6E3] p-5 sm:p-6">
          <h2 className="font-pixel text-lg sm:text-xl text-[#2B1D14] mb-4">
            CARA BERMAIN MISI JELAJAH BUDAYA
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {GAME_STEPS.map((step, index) => (
              <li
                key={step}
                className="bg-[#F5EBD1] border-2 border-[#2B1D14] p-3.5 flex items-start gap-3"
              >
                <span className="font-pixel text-sm bg-[#2B1D14] text-[#FACC15] w-7 h-7 flex items-center justify-center shrink-0">
                  {index + 1}
                </span>
                <p className="text-sm font-semibold text-[#2B1D14] leading-snug">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 9 Jenis Kata Adjektif */}
        <section className="pixel-box bg-[#FDF6E3] p-5 sm:p-6">
          <h2 className="font-pixel text-lg sm:text-xl text-[#2B1D14] mb-1">
            SEMBILAN JENIS KATA ADJEKTIF
          </h2>
          <p className="text-sm font-medium text-[#5D4037] mb-5">
            Kata adjektif ialah perkataan yang menerangkan sifat atau keadaan sesuatu kata nama.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADJECTIVE_CATEGORIES.map((cat, idx) => (
              <article
                key={cat.id}
                className="bg-[#FFFBEB] border-3 border-[#2B1D14] p-4 flex flex-col justify-between"
              >
                <div>
                  <p className="font-pixel text-xs text-[#B45309] mb-1">0{idx + 1}. {cat.shortName.toUpperCase()}</p>
                  <h3 className="font-extrabold text-base text-[#2B1D14] mb-1.5">{cat.name}</h3>
                  <p className="text-sm text-[#5D4037] leading-snug mb-3">{cat.definition}</p>
                </div>
                <div className="pt-2 border-t border-[#2B1D14]/15 text-xs font-bold text-[#15803D]">
                  Contoh: {cat.examples.join(' · ')}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
