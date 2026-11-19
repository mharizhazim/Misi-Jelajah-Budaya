import React, { useState, useEffect, useMemo } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Hand,
} from 'lucide-react';
import { ADJECTIVE_CATEGORIES, STAGE_1_WORD_SETS } from '../data/gameData';
import { AdjectiveCategoryId, PageView, Stage1Word } from '../types/game';
import { KupangCoinIcon } from '../components/PixelIcons';
import { retroAudio } from '../utils/audio';

interface Stage1TapakWarisanProps {
  attemptCount: number;
  onAddKupang: (amount: number, countCorrect?: boolean) => void;
  onCompleteStage: (stageId: 1, bonus: number, timeSec?: number) => { bonusGranted: number };
  onNavigate: (page: PageView) => void;
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export const Stage1TapakWarisan: React.FC<Stage1TapakWarisanProps> = ({
  attemptCount,
  onAddKupang,
  onCompleteStage,
  onNavigate,
}) => {
  const [setIndex, setSetIndex] = useState(() => attemptCount % STAGE_1_WORD_SETS.length);
  const [runKey, setRunKey] = useState(0);
  const activeWordSet = STAGE_1_WORD_SETS[setIndex];
  const shuffledWords = useMemo(() => shuffleArray(activeWordSet), [activeWordSet, runKey]);

  const [placedByCategory, setPlacedByCategory] = useState<
    Record<AdjectiveCategoryId, Stage1Word[]>
  >({
    sifat: [],
    warna: [],
    ukuran: [],
    bentuk: [],
    waktu: [],
    jarak: [],
    cara: [],
    perasaan: [],
    pancaindera: [],
  });

  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);
  const [draggingWordId, setDraggingWordId] = useState<string | null>(null);
  const [flashCategory, setFlashCategory] = useState<{
    id: AdjectiveCategoryId;
    status: 'correct' | 'wrong';
  } | null>(null);
  const [feedback, setFeedback] = useState<{
    ok: boolean;
    title: string;
    detail: string;
  } | null>(null);
  const [coinPop, setCoinPop] = useState<number | null>(null);
  const [sessionKupang, setSessionKupang] = useState(0);
  const [bonusEarned, setBonusEarned] = useState(0);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [completed, setCompleted] = useState(false);

  const placedIds = useMemo(() => {
    const ids = new Set<string>();
    Object.values(placedByCategory).forEach((list) =>
      list.forEach((w) => ids.add(w.id))
    );
    return ids;
  }, [placedByCategory]);

  const remainingWords = useMemo(
    () => shuffledWords.filter((w) => !placedIds.has(w.id)),
    [shuffledWords, placedIds]
  );

  useEffect(() => {
    if (completed) return;
    const timer = window.setInterval(() => {
      setElapsedSec((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [completed, runKey]);

  const attemptClassify = (wordId: string, targetCategory: AdjectiveCategoryId) => {
    if (completed) return;
    const wordObj = activeWordSet.find((w) => w.id === wordId);
    if (!wordObj || placedIds.has(wordId)) return;

    if (wordObj.categoryId === targetCategory) {
      retroAudio.playCorrect();
      retroAudio.playCoin();
      onAddKupang(5, true);
      setSessionKupang((prev) => prev + 5);
      setCoinPop(Date.now());

      const nextPlaced = {
        ...placedByCategory,
        [targetCategory]: [...placedByCategory[targetCategory], wordObj],
      };
      setPlacedByCategory(nextPlaced);
      setSelectedWordId(null);
      setFlashCategory({ id: targetCategory, status: 'correct' });
      setFeedback({
        ok: true,
        title: 'Hebat! Jawapan anda betul!',
        detail: `${wordObj.explanation} (+5 kupang)`,
      });

      window.setTimeout(() => setFlashCategory(null), 650);

      const newTotal = placedIds.size + 1;
      if (newTotal === activeWordSet.length) {
        const { bonusGranted } = onCompleteStage(1, 20, elapsedSec);
        setBonusEarned(bonusGranted);
        setSessionKupang((prev) => prev + bonusGranted);
        setCompleted(true);
        retroAudio.playVictory();
      }
    } else {
      retroAudio.playWrong();
      setFlashCategory({ id: targetCategory, status: 'wrong' });
      setFeedback({
        ok: false,
        title: 'Cuba lagi! Fikirkan kategori yang betul.',
        detail: `Perkataan "${wordObj.word}" bukan tergolong dalam kategori ini. Cuba perhatikan maksud perkataan tersebut.`,
      });
      window.setTimeout(() => setFlashCategory(null), 650);
    }
  };

  const handleRestart = () => {
    retroAudio.playClick();
    setPlacedByCategory({
      sifat: [],
      warna: [],
      ukuran: [],
      bentuk: [],
      waktu: [],
      jarak: [],
      cara: [],
      perasaan: [],
      pancaindera: [],
    });
    setSelectedWordId(null);
    setDraggingWordId(null);
    setFeedback(null);
    setSessionKupang(0);
    setBonusEarned(0);
    setElapsedSec(0);
    setCompleted(false);
    setSetIndex((idx) => (idx + 1) % STAGE_1_WORD_SETS.length);
    setRunKey((k) => k + 1);
  };

  if (completed) {
    return (
      <main className="min-h-[calc(100vh-64px)] py-8 px-4 sm:px-6 flex items-center justify-center">
        <section className="pixel-box bg-[#FDF6E3] max-w-xl w-full p-6 sm:p-8 text-center space-y-5">
          <div className="w-16 h-16 mx-auto bg-[#16A34A] border-4 border-[#2B1D14] flex items-center justify-center text-white">
            <Sparkles className="w-9 h-9" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#15803D] mb-1">TAHAP 1 SELESAI</p>
            <h1 className="font-pixel text-2xl sm:text-3xl text-[#2B1D14]">
              TAHNIAH, PENJELAJAH TAPAK WARISAN!
            </h1>
            <p className="text-sm sm:text-base font-medium text-[#5D4037] mt-2">
              Anda telah berjaya mengelaskan kesemua 18 kata adjektif ke dalam sembilan kategori dengan tepat!
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 bg-[#F5EBD1] border-3 border-[#2B1D14] p-4">
            <div>
              <p className="text-xs font-bold text-[#5D4037]">Jawapan Betul</p>
              <p className="font-mono-num text-xl font-extrabold text-[#15803D]">18 / 18</p>
            </div>
            <div>
              <p className="text-xs font-bold text-[#5D4037]">Kupang Diperoleh</p>
              <p className="font-mono-num text-xl font-extrabold text-[#B45309]">+{sessionKupang}</p>
              {bonusEarned > 0 && (
                <p className="text-[11px] font-bold text-[#15803D]">(Termasuk +{bonusEarned} bonus)</p>
              )}
            </div>
            <div>
              <p className="text-xs font-bold text-[#5D4037]">Masa Diambil</p>
              <p className="font-mono-num text-xl font-extrabold text-[#2B1D14]">
                {formatTime(elapsedSec)}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                retroAudio.playClick();
                onNavigate('STAGE_2');
              }}
              className="pixel-btn flex-1 bg-[#EA580C] hover:bg-[#C2410C] text-white py-3 px-4 text-sm sm:text-base font-extrabold flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>TERUSKAN KE LEBUH NUSANTARA</span>
              <ArrowRight className="w-5 h-5 shrink-0" />
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={handleRestart}
              className="pixel-btn bg-[#0284C7] hover:bg-[#0369A1] text-white py-2 px-4 text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Main Semula</span>
            </button>
            <button
              type="button"
              onClick={() => {
                retroAudio.playClick();
                onNavigate('WORLD_MAP');
              }}
              className="pixel-btn bg-[#8D6E63] hover:bg-[#6D4C41] text-white py-2 px-4 text-xs sm:text-sm font-bold cursor-pointer"
            >
              Kembali ke Layar Warisan
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-64px)] py-5 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-5">
        {/* Stage Header & Stats Bar */}
        <div className="pixel-box bg-[#FDF6E3] p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold text-[#15803D]">
              KAWASAN 1 · TAHAP MUDAH · KLASIFIKASI KATA ADJEKTIF · SET {setIndex + 1}
            </p>
            <h1 className="font-pixel text-xl sm:text-2xl text-[#2B1D14]">
              TAPAK WARISAN
            </h1>
            <p className="text-xs sm:text-sm font-medium text-[#5D4037] mt-1">
              Seret setiap kad perkataan ke dalam kotak kategori yang betul — atau ketik perkataan kemudian ketik kotak kategori!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="bg-[#DCFCE7] border-2 border-[#15803D] px-3 py-1.5 text-xs sm:text-sm font-bold text-[#14532D]">
              Jawapan Betul: <span className="font-mono-num">{placedIds.size}/18</span>
            </div>
            <div className="bg-[#FEF3C7] border-2 border-[#D97706] px-3 py-1.5 text-xs sm:text-sm font-bold text-[#92400E]">
              Baki Perkataan: <span className="font-mono-num">{remainingWords.length}</span>
            </div>
            <div className="bg-[#E0F2FE] border-2 border-[#0284C7] px-3 py-1.5 text-xs sm:text-sm font-bold text-[#0C4A6E] flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span className="font-mono-num">{formatTime(elapsedSec)}</span>
            </div>
            {coinPop && (
              <div
                key={coinPop}
                className="animate-coin-pop flex items-center gap-1 text-[#B45309] font-pixel text-xs"
              >
                <KupangCoinIcon className="w-5 h-5" />
                <span>+5</span>
              </div>
            )}
          </div>
        </div>

        {/* Live Pedagogical Feedback Strip */}
        {feedback && (
          <div
            role="status"
            aria-live="polite"
            className={`pixel-box-sm p-3.5 sm:p-4 flex items-start gap-3 ${
              feedback.ok
                ? 'bg-[#DCFCE7] text-[#14532D]'
                : 'bg-[#FEE2E2] text-[#7F1D1D]'
            }`}
          >
            {feedback.ok ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-[#15803D]" />
            ) : (
              <XCircle className="w-5 h-5 shrink-0 mt-0.5 text-[#B91C1C]" />
            )}
            <div>
              <p className="font-extrabold text-sm sm:text-base">{feedback.title}</p>
              <p className="text-xs sm:text-sm font-medium mt-0.5">{feedback.detail}</p>
            </div>
          </div>
        )}

        {/* Word Cards Tray */}
        <section
          aria-label="Kad Perkataan Kata Adjektif"
          className="pixel-box bg-[#F5EBD1] p-4 sm:p-5"
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <h2 className="font-pixel text-sm sm:text-base text-[#2B1D14] flex items-center gap-2">
              <Hand className="w-4 h-4 text-[#EA580C]" />
              <span>KAD PERKATAAN ({remainingWords.length} BAKI)</span>
            </h2>
            {selectedWordId && (
              <span className="text-xs font-extrabold text-[#B45309] bg-[#FEF3C7] border border-[#D97706] px-2.5 py-1">
                Perkataan dipilih! Sekarang ketik salah satu kotak kategori di bawah.
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2.5">
            {remainingWords.map((item) => {
              const isSelected = selectedWordId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  draggable
                  onDragStart={(e) => {
                    setDraggingWordId(item.id);
                    setSelectedWordId(item.id);
                    e.dataTransfer.setData('text/plain', item.id);
                  }}
                  onDragEnd={() => setDraggingWordId(null)}
                  onClick={() => {
                    retroAudio.playClick();
                    setSelectedWordId((prev) => (prev === item.id ? null : item.id));
                  }}
                  className={`pixel-btn px-4 py-2.5 text-sm sm:text-base font-extrabold cursor-grab active:cursor-grabbing select-none ${
                    isSelected
                      ? 'bg-[#FACC15] text-[#2B1D14] ring-4 ring-[#EA580C]'
                      : 'bg-white hover:bg-[#FEF9C3] text-[#2B1D14]'
                  }`}
                >
                  {item.word}
                </button>
              );
            })}
          </div>
        </section>

        {/* 9 Adjective Category Drop Zones */}
        <section
          aria-label="Sembilan Kategori Kata Adjektif"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {ADJECTIVE_CATEGORIES.map((cat) => {
            const placed = placedByCategory[cat.id];
            const isCompleteCat = placed.length === 2;
            const flash = flashCategory?.id === cat.id ? flashCategory.status : null;

            return (
              <div
                key={cat.id}
                role="button"
                tabIndex={0}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const wordId = e.dataTransfer.getData('text/plain') || draggingWordId;
                  if (wordId) {
                    attemptClassify(wordId, cat.id);
                  }
                }}
                onClick={() => {
                  if (selectedWordId) {
                    attemptClassify(selectedWordId, cat.id);
                  }
                }}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && selectedWordId) {
                    e.preventDefault();
                    attemptClassify(selectedWordId, cat.id);
                  }
                }}
                className={`pixel-box-sm p-4 transition-colors cursor-pointer min-h-[136px] flex flex-col justify-between ${
                  flash === 'correct'
                    ? 'bg-[#BBF7D0]'
                    : flash === 'wrong'
                    ? 'bg-[#FECACA]'
                    : isCompleteCat
                    ? 'bg-[#ECFDF5]'
                    : selectedWordId
                    ? 'bg-[#FFFBEB] hover:bg-[#FEF3C7]'
                    : 'bg-[#FDF6E3]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-pixel text-xs sm:text-sm text-[#2B1D14]">
                      {cat.name}
                    </h3>
                    <span
                      className={`font-mono-num text-xs font-extrabold ${
                        isCompleteCat ? 'text-[#15803D]' : 'text-[#5D4037]'
                      }`}
                    >
                      {placed.length}/2
                    </span>
                  </div>
                  <p className="text-xs text-[#5D4037] leading-snug mb-3">
                    {cat.definition}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 min-h-[38px] items-center bg-white/70 border-2 border-dashed border-[#2B1D14]/30 p-2">
                  {placed.length === 0 ? (
                    <span className="text-xs font-semibold text-[#78716C]">
                      {selectedWordId
                        ? 'Ketik kotak ini untuk meletakkan perkataan'
                        : 'Seret atau pilih perkataan ke sini'}
                    </span>
                  ) : (
                    placed.map((w) => (
                      <span
                        key={w.id}
                        className="bg-[#16A34A] text-white border-2 border-[#14532D] px-2.5 py-1 text-xs sm:text-sm font-extrabold flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {w.word}
                      </span>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
};
