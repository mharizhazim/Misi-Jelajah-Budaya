import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { STAGE_2_QUESTION_SETS } from '../data/gameData';
import { PageView } from '../types/game';
import { KupangCoinIcon, PixelImage } from '../components/PixelIcons';
import { retroAudio } from '../utils/audio';

interface Stage2LebuhNusantaraProps {
  attemptCount: number;
  onAddKupang: (amount: number, countCorrect?: boolean) => void;
  onCompleteStage: (stageId: 2, bonus: number) => { bonusGranted: number };
  onNavigate: (page: PageView) => void;
}

const OPTION_LETTERS = ['A', 'B', 'C'] as const;

export const Stage2LebuhNusantara: React.FC<Stage2LebuhNusantaraProps> = ({
  attemptCount,
  onAddKupang,
  onCompleteStage,
  onNavigate,
}) => {
  const [setIndex, setSetIndex] = useState(() => attemptCount % STAGE_2_QUESTION_SETS.length);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [sessionKupang, setSessionKupang] = useState(0);
  const [bonusEarned, setBonusEarned] = useState(0);
  const [coinPop, setCoinPop] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  const activeQuestions = STAGE_2_QUESTION_SETS[setIndex];
  const currentQuestion = activeQuestions[questionIndex];
  const hasAnswered = selectedIndex !== null;
  const isCorrect = hasAnswered && selectedIndex === currentQuestion.correctIndex;

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedIndex(idx);

    if (idx === currentQuestion.correctIndex) {
      retroAudio.playCorrect();
      retroAudio.playCoin();
      onAddKupang(10, true);
      setCorrectCount((c) => c + 1);
      setSessionKupang((k) => k + 10);
      setCoinPop(Date.now());
    } else {
      retroAudio.playWrong();
    }
  };

  const handleNext = () => {
    retroAudio.playClick();
    if (questionIndex < activeQuestions.length - 1) {
      setQuestionIndex((i) => i + 1);
      setSelectedIndex(null);
    } else {
      const { bonusGranted } = onCompleteStage(2, 20);
      setBonusEarned(bonusGranted);
      setSessionKupang((k) => k + bonusGranted);
      setCompleted(true);
      retroAudio.playVictory();
    }
  };

  const handleRestart = () => {
    retroAudio.playClick();
    setSetIndex((idx) => (idx + 1) % STAGE_2_QUESTION_SETS.length);
    setQuestionIndex(0);
    setSelectedIndex(null);
    setCorrectCount(0);
    setSessionKupang(0);
    setBonusEarned(0);
    setCompleted(false);
  };

  if (completed) {
    return (
      <main className="min-h-[calc(100vh-64px)] py-8 px-4 sm:px-6 flex items-center justify-center">
        <section className="pixel-box bg-[#FDF6E3] max-w-xl w-full p-6 sm:p-8 text-center space-y-5">
          <div className="w-16 h-16 mx-auto bg-[#EA580C] border-4 border-[#2B1D14] flex items-center justify-center text-white">
            <Sparkles className="w-9 h-9" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#B45309] mb-1">TAHAP 2 SELESAI</p>
            <h1 className="font-pixel text-2xl sm:text-3xl text-[#2B1D14]">
              HEBAT DI LEBUH NUSANTARA!
            </h1>
            <p className="text-sm sm:text-base font-medium text-[#5D4037] mt-2">
              Laluan menuju ke istana diraja di Puncak Karyawan kini telah terbuka!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-[#F5EBD1] border-3 border-[#2B1D14] p-4">
            <div>
              <p className="text-xs font-bold text-[#5D4037]">Jawapan Tepat</p>
              <p className="font-mono-num text-2xl font-extrabold text-[#15803D]">
                {correctCount} / {activeQuestions.length}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-[#5D4037]">Kupang Diperoleh</p>
              <p className="font-mono-num text-2xl font-extrabold text-[#B45309]">
                +{sessionKupang}
              </p>
              {bonusEarned > 0 && (
                <p className="text-[11px] font-bold text-[#15803D]">
                  (Termasuk +{bonusEarned} bonus tamat tahap)
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              retroAudio.playClick();
              onNavigate('STAGE_3');
            }}
            className="pixel-btn w-full bg-[#B91C1C] hover:bg-[#991B1B] text-white py-3 px-4 text-sm sm:text-base font-extrabold flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>TERUSKAN KE PUNCAK KARYAWAN</span>
            <ArrowRight className="w-5 h-5" />
          </button>

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
    <main className="min-h-[calc(100vh-64px)] py-6 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-5">
        {/* Stage Top Header */}
        <div className="pixel-box bg-[#FDF6E3] p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold text-[#D97706]">
              KAWASAN 2 · TAHAP SEDERHANA · KATA ADJEKTIF BERGAMBAR · SET {setIndex + 1}
            </p>
            <h1 className="font-pixel text-xl sm:text-2xl text-[#2B1D14]">
              LEBUH NUSANTARA
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-[#2B1D14] text-[#FEF08A] px-3 py-1.5 font-mono-num text-sm font-bold border-2 border-[#FACC15]">
              Soalan {questionIndex + 1} / {activeQuestions.length}
            </span>
            {coinPop && (
              <div
                key={coinPop}
                className="animate-coin-pop flex items-center gap-1 text-[#B45309] font-pixel text-xs"
              >
                <KupangCoinIcon className="w-5 h-5" />
                <span>+10</span>
              </div>
            )}
          </div>
        </div>

        {/* Question Card */}
        <article className="pixel-box bg-[#FDF6E3] p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between gap-2 text-xs font-bold text-[#5D4037]">
            <span>{currentQuestion.title}</span>
            <span>+10 Kupang setiap jawapan betul</span>
          </div>

          {/* Top: Cultural Pixel Art Illustration */}
          <div className="w-full max-w-lg mx-auto aspect-[4/3] border-4 border-[#2B1D14] bg-[#F5EBD1] overflow-hidden">
            <PixelImage
              src={currentQuestion.imageUrl}
              alt={currentQuestion.imageAlt}
              className="w-full h-full object-cover"
              fallbackLabel={currentQuestion.title}
            />
          </div>

          {/* Middle: Sentence with blank */}
          <div className="bg-[#FFFBEB] border-3 border-[#2B1D14] p-4 sm:p-5 text-center">
            <p className="text-lg sm:text-2xl font-extrabold text-[#2B1D14] leading-relaxed">
              {hasAnswered
                ? currentQuestion.sentence.replace(
                    '______',
                    `[ ${currentQuestion.options[currentQuestion.correctIndex]} ]`
                  )
                : currentQuestion.sentence}
            </p>
          </div>

          {/* Bottom: 3 Option Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {currentQuestion.options.map((option, idx) => {
              const isThisSelected = selectedIndex === idx;
              const isThisCorrect = idx === currentQuestion.correctIndex;

              let btnStyle = 'bg-white hover:bg-[#FEF3C7] text-[#2B1D14]';
              if (hasAnswered) {
                if (isThisCorrect) {
                  btnStyle = 'bg-[#16A34A] text-white';
                } else if (isThisSelected && !isThisCorrect) {
                  btnStyle = 'bg-[#DC2626] text-white';
                } else {
                  btnStyle = 'bg-[#E5E7EB] text-[#6B7280] opacity-80';
                }
              }

              return (
                <button
                  key={option}
                  type="button"
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`pixel-btn py-3.5 px-4 text-base sm:text-lg font-extrabold flex items-center justify-center gap-2 cursor-pointer disabled:cursor-default ${btnStyle}`}
                >
                  <span className="font-pixel text-xs opacity-80">{OPTION_LETTERS[idx]}.</span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {/* Immediate Feedback & Next Question */}
          {hasAnswered && (
            <div
              role="status"
              className={`pixel-box-sm p-4 space-y-3 ${
                isCorrect ? 'bg-[#DCFCE7] text-[#14532D]' : 'bg-[#FEE2E2] text-[#7F1D1D]'
              }`}
            >
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 shrink-0 text-[#15803D] mt-0.5" />
                ) : (
                  <XCircle className="w-6 h-6 shrink-0 text-[#B91C1C] mt-0.5" />
                )}
                <div className="space-y-1">
                  <p className="font-extrabold text-sm sm:text-base">
                    {isCorrect
                      ? 'Tahniah! Anda berjaya mengenal pasti kata adjektif yang tepat! (+10 Kupang)'
                      : `Jawapan kurang tepat. Jawapan yang betul ialah "${currentQuestion.options[currentQuestion.correctIndex]}".`}
                  </p>
                  <p className="text-xs sm:text-sm font-medium">
                    <strong>Jenis:</strong> {currentQuestion.adjectiveType} —{' '}
                    {isCorrect
                      ? currentQuestion.explanationCorrect
                      : currentQuestion.explanationWrong}
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="pixel-btn bg-[#2B1D14] hover:bg-[#3E2723] text-[#FEF08A] px-5 py-2.5 text-sm font-extrabold flex items-center gap-2 cursor-pointer"
                >
                  <span>
                    {questionIndex < activeQuestions.length - 1
                      ? 'SOALAN SETERUSNYA'
                      : 'LIHAT KEPUTUSAN TAHAP'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </article>
      </div>
    </main>
  );
};
