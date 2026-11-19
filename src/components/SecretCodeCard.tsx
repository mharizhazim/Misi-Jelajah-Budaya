import React, { useState } from 'react';
import { KeyRound, Copy, Check, CheckCircle2, Lock, ShoppingBag, Compass } from 'lucide-react';
import { MEDAN_PENDEKAR_SECRET_CODE } from '../data/gameData';
import { PageView, PlayerProgress } from '../types/game';
import { retroAudio } from '../utils/audio';

interface SecretCodeCardProps {
  progress: PlayerProgress;
  onNavigate?: (page: PageView) => void;
}

export const SecretCodeCard: React.FC<SecretCodeCardProps> = ({ progress, onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const hasFinishedAllStages = progress.completedStages.length === 3;
  const hasRajaMustafar = progress.ownedAvatars.includes('raja_mustafar');
  const isUnlocked = hasFinishedAllStages && hasRajaMustafar;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(MEDAN_PENDEKAR_SECRET_CODE);
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = MEDAN_PENDEKAR_SECRET_CODE;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand('copy');
      } finally {
        document.body.removeChild(textarea);
      }
    }
    retroAudio.playCoin();
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  };

  if (isUnlocked) {
    return (
      <section
        aria-label="Kod Rahsia Medan Pendekar Bahasa"
        className="pixel-box bg-[#FEF3C7] border-[#B45309] p-5 sm:p-6 text-left space-y-4"
      >
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 bg-[#B91C1C] border-3 border-[#2B1D14] flex items-center justify-center text-[#FEF08A] shrink-0">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <p className="font-pixel text-xs text-[#B91C1C]">
              GANJARAN MUKTAMAD TERBUKA
            </p>
            <h2 className="font-pixel text-base sm:text-xl text-[#2B1D14]">
              KOD MEDAN PENDEKAR BAHASA
            </h2>
          </div>
        </div>

        <p className="text-sm sm:text-base font-bold text-[#2B1D14] leading-relaxed">
          Syabas! Anda telah menamatkan permainan ini dan memiliki avatar{' '}
          <span className="text-[#B45309]">Raja Mustafar</span>. Sila ingat dan salin kod
          di bawah untuk meneruskan cabaran ke permainan seterusnya:{' '}
          <strong className="text-[#B91C1C]">MEDAN PENDEKAR BAHASA</strong>.
        </p>

        <div className="bg-[#2B1D14] border-4 border-[#B45309] p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <code className="font-mono-num text-lg sm:text-2xl font-bold tracking-wider text-[#FEF08A] select-all text-center sm:text-left">
            {MEDAN_PENDEKAR_SECRET_CODE}
          </code>

          <button
            type="button"
            onClick={handleCopy}
            className={`pixel-btn px-5 py-2.5 text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0 w-full sm:w-auto ${
              copied
                ? 'bg-[#16A34A] text-white'
                : 'bg-[#FACC15] hover:bg-[#EAB308] text-[#2B1D14]'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 shrink-0" />
                <span>Disalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 shrink-0" />
                <span>Salin</span>
              </>
            )}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label="Syarat Kod Rahsia Medan Pendekar Bahasa"
      className="pixel-box-sm bg-[#F5EBD1] p-4 sm:p-5 text-left space-y-3"
    >
      <div className="flex items-center gap-2">
        <Lock className="w-5 h-5 text-[#92400E] shrink-0" />
        <h2 className="font-pixel text-sm sm:text-base text-[#2B1D14]">
          KOD KE GAME: MEDAN PENDEKAR BAHASA
        </h2>
      </div>
      <p className="text-xs sm:text-sm font-semibold text-[#5D4037]">
        Lengkapkan kedua-dua syarat berikut untuk membuka kod rahsia ke permainan seterusnya:
      </p>

      <ul className="space-y-2 text-xs sm:text-sm font-bold">
        <li
          className={`flex items-center gap-2 ${
            hasFinishedAllStages ? 'text-[#15803D]' : 'text-[#5D4037]'
          }`}
        >
          {hasFinishedAllStages ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#15803D]" />
          ) : (
            <Lock className="w-4 h-4 shrink-0 text-[#78716C]" />
          )}
          <span>Tamatkan kesemua 3 kawasan permainan ({progress.completedStages.length}/3)</span>
        </li>
        <li
          className={`flex items-center gap-2 ${
            hasRajaMustafar ? 'text-[#15803D]' : 'text-[#5D4037]'
          }`}
        >
          {hasRajaMustafar ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#15803D]" />
          ) : (
            <Lock className="w-4 h-4 shrink-0 text-[#78716C]" />
          )}
          <span>Miliki avatar Raja Mustafar (300 Kupang di Kedai Avatar)</span>
        </li>
      </ul>

      {onNavigate && (
        <div className="flex flex-wrap gap-2 pt-1">
          {!hasRajaMustafar && (
            <button
              type="button"
              onClick={() => {
                retroAudio.playClick();
                onNavigate('AVATAR_SHOP');
              }}
              className="pixel-btn bg-[#EA580C] hover:bg-[#C2410C] text-white px-4 py-2 text-xs sm:text-sm font-extrabold flex items-center gap-1.5 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>PERGI KE KEDAI AVATAR</span>
            </button>
          )}
          {!hasFinishedAllStages && (
            <button
              type="button"
              onClick={() => {
                retroAudio.playClick();
                onNavigate('WORLD_MAP');
              }}
              className="pixel-btn bg-[#16A34A] hover:bg-[#15803D] text-white px-4 py-2 text-xs sm:text-sm font-extrabold flex items-center gap-1.5 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>TERUSKAN PENGEMBARAAN</span>
            </button>
          )}
        </div>
      )}
    </section>
  );
};
