import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, Crown } from 'lucide-react';
import { AVATARS, STAGE_3_QUESTION_SETS } from '../data/gameData';
import { PageView, PlayerProgress } from '../types/game';
import { KupangCoinIcon, PixelImage } from '../components/PixelIcons';
import { retroAudio } from '../utils/audio';

interface Stage3PuncakKaryawanProps {
  progress: PlayerProgress;
  attemptCount: number;
  onAddKupang: (amount: number, countCorrect?: boolean) => void;
  onCompleteStage: (stageId: 3, bonus: number) => { bonusGranted: number };
  onNavigate: (page: PageView) => void;
}

const OPTION_LETTERS = ['A', 'B', 'C'] as const;

export const Stage3PuncakKaryawan: React.FC<Stage3PuncakKaryawanProps> = ({
  progress,
  attemptCount,
  onAddKupang,
  onCompleteStage,
  onNavigate,
}) => {
  const [setIndex] = useState(() => attemptCount % STAGE_3_QUESTION_SETS.length);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [sessionKupang, setSessionKupang] = useState(0);
  const [coinPop, setCoinPop] = useState<number | null>(null);

  const activeQuestions = STAGE_3_QUESTION_SETS[setIndex];
  const currentQuestion = activeQuestions[questionIndex];
  const avatar = AVATARS.find((a) => a.id === progress.currentAvatar) ?? AVATARS[0];
  const hasAnswered = selectedIndex !== null;
  const isCorrect = hasAnswered && selectedIndex === currentQuestion.correctIndex;

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedIndex(idx);

    if (idx === currentQuestion.correctIndex) {
      retroAudio.playCorrect();
      retroAudio.playCoin();
      onAddKupang(15, true);
      setCorrectCount((c) => c + 1);
      setSessionKupang((k) => k + 15);
      setCoinPop(Date.now());
    } else {
      retroAudio.playWrong();
    }
  };

  const handleNext = () => {
    if (questionIndex < activeQuestions.length - 1) {
      retroAudio.playClick();
      setQuestionIndex((i) => i + 1);
      setSelectedIndex(null);
    } else {
      onCompleteStage(3, 30);
      retroAudio.playVictory();
      onNavigate('VICTORY');
    }
  };

  return (
    <main className="min-h-[calc(100vh-64px)] py-6 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-5">
        {/* Stage Header */}
        <div className="pixel-box bg-[#FDF6E3] p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold text-[#B91C1C] flex items-center gap-1.5">
              <Crown className="w-4 h-4" />
              KAWASAN 3 · TAHAP SUKAR · LENGKAPKAN AYAT BUDAYA · SET {setIndex + 1}
            </p>
            <h1 className="font-pixel text-xl sm:text-2xl text-[#2B1D14]">
              PUNCAK KARYAWAN
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
                <span>+15</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Istana Quiz Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Avatar Companion Panel */}
          <aside className="lg:col-span-4 pixel-box bg-[#F5EBD1] p-5 flex flex-row lg:flex-col items-center gap-4 text-left lg:text-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-[#2B1D14] bg-[#FDF6E3] overflow-hidden shrink-0 animate-pixel-bob">
              <PixelImage
                src={avatar.imageUrl}
                alt={avatar.name}
                className="w-full h-full object-cover"
                fallbackLabel={avatar.name}
              />
            </div>
            <div>
              <p className="font-pixel text-xs text-[#92400E] mb-1">WIRA ANDA</p>
              <h2 className="font-pixel text-base text-[#2B1D14]">{avatar.name}</h2>
              <p className="text-xs font-semibold text-[#5D4037] mt-1">
                Skor pusingan ini: <strong className="font-mono-num">{correctCount}/{questionIndex + (hasAnswered ? 1 : 0)}</strong>
              </p>
              <p className="text-xs font-bold text-[#B45309] mt-0.5">
                Kupang dikumpul: <span className="font-mono-num">+{sessionKupang}</span>
              </p>
            </div>
          </aside>

          {/* Question Scroll Card */}
          <section className="lg:col-span-8 pixel-box bg-[#FDF6E3] p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between gap-2 text-xs font-bold text-[#5D4037]">
              <span>{currentQuestion.title}</span>
              <span>+15 Kupang setiap jawapan betul</span>
            </div>

            <div className="bg-[#FFFBEB] border-4 border-[#B45309] p-5 sm:p-6">
              <p className="text-lg sm:text-2xl font-extrabold text-[#2B1D14] leading-relaxed">
                {hasAnswered
                  ? currentQuestion.sentence.replace(
                      '______',
                      `[ ${currentQuestion.options[currentQuestion.correctIndex]} ]`
                    )
                  : currentQuestion.sentence}
              </p>
            </div>

            {/* 3 Option Choices */}
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

            {hasAnswered && selectedIndex !== null && (
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
                  <div className="space-y-1.5">
                    <p className="font-extrabold text-sm sm:text-base">
                      {isCorrect
                        ? 'Syabas! Jawapan anda amat tepat! (+15 Kupang)'
                        : `Pilihan "${currentQuestion.options[selectedIndex]}" kurang sesuai.`}
                    </p>
                    {!isCorrect && (
                      <p className="text-xs sm:text-sm font-semibold">
                        <strong>Mengapa kurang sesuai:</strong>{' '}
                        {currentQuestion.optionReasons[selectedIndex]}
                      </p>
                    )}
                    <p className="text-xs sm:text-sm font-medium">
                      <strong>Jawapan Tepat ({currentQuestion.adjectiveType}):</strong>{' '}
                      {currentQuestion.explanationCorrect}
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
                        : 'TAMATKAN PENGEMBARAAN (+30 BONUS)'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};
