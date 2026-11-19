import React from 'react';
import { Compass, Users, ShoppingBag, BookOpen, LogOut, UserCheck, KeyRound, CheckCircle2, Lock } from 'lucide-react';
import { AVATARS, SCENE_IMAGES } from '../data/gameData';
import { PageView, PlayerProgress } from '../types/game';
import { PixelHibiscus, PixelImage } from '../components/PixelIcons';
import { AmbientBackdrop } from '../components/AmbientBackdrop';
import { retroAudio } from '../utils/audio';

interface MainMenuProps {
  progress: PlayerProgress;
  onNavigate: (page: PageView) => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ progress, onNavigate }) => {
  const awangKenit = AVATARS.find((a) => a.id === 'awang_kenit') ?? AVATARS[1];
  const currentAvatar = AVATARS.find((a) => a.id === progress.currentAvatar) ?? AVATARS[0];
  const completedCount = progress.completedStages.length;

  const handleNav = (page: PageView) => {
    retroAudio.unlockAndStartMusic(progress.musicEnabled);
    retroAudio.playClick();
    onNavigate(page);
  };

  return (
    <main className="relative min-h-[calc(100vh-64px)] w-full overflow-hidden flex flex-col justify-center">
      {/* Pixel Art Tropical Kampung Backdrop */}
      <div className="absolute inset-0 z-0">
        <PixelImage
          src={SCENE_IMAGES.tropicalBackdrop}
          alt="Pemandangan hutan tropika, air terjun, sungai dan perkampungan Melayu Pixel Art"
          className="w-full h-full object-cover"
          fallbackLabel="Lanskap Tropika Nusantara"
        />
        {/* Subtle sky-to-earth scrim for crisp text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C4A6E]/55 via-[#14532D]/35 to-[#1B100A]/80" />
      </div>

      {/* Animated Clouds, Flying Birds & Walking Villagers */}
      <AmbientBackdrop className="absolute inset-0 z-10" showWalkers />

      {/* Subtle River Shimmer Overlay */}
      <div
        className="pointer-events-none absolute bottom-10 left-1/4 w-48 h-4 bg-sky-200/25 blur-[1px] animate-river-shimmer z-10"
        aria-hidden="true"
      />

      {/* Main Content Container */}
      <div className="relative z-20 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left/Center Hero Title & 5 Primary Menu Buttons */}
        <section className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="flex items-center gap-2 mb-3 bg-[#2B1D14]/90 border-2 border-[#FACC15] px-3 py-1.5 text-[#FEF08A] text-xs sm:text-sm font-bold">
            <PixelHibiscus className="w-5 h-5 animate-leaf-sway" />
            <span>Pengembaraan Bahasa Melayu Sekolah Rendah</span>
          </div>

          <h1
            className="font-pixel text-3xl sm:text-5xl lg:text-6xl text-[#FEF08A] leading-tight tracking-wide drop-shadow-[4px_4px_0px_#2B1D14] mb-3"
            style={{ textWrap: 'balance' }}
          >
            MISI JELAJAH BUDAYA
          </h1>

          <p className="text-lg sm:text-2xl font-extrabold text-white drop-shadow-[2px_2px_0px_#1E130D] mb-6">
            "Terokai Warisan, Kuasai Bahasa!"
          </p>

          {/* 5 Core Game Menu Buttons */}
          <nav
            aria-label="Menu Utama Permainan"
            className="w-full max-w-md flex flex-col gap-3"
          >
            <button
              type="button"
              onClick={() => handleNav('WORLD_MAP')}
              className="pixel-btn w-full bg-[#16A34A] hover:bg-[#15803D] text-white px-6 py-3.5 text-base sm:text-lg font-extrabold flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-3">
                <Compass className="w-6 h-6 shrink-0" />
                <span>MULA PENGEMBARAAN</span>
              </span>
              <span className="font-pixel text-xs bg-[#2B1D14]/30 px-2 py-1">MAIN</span>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleNav('AVATAR_SELECT')}
                className="pixel-btn bg-[#0284C7] hover:bg-[#0369A1] text-white px-4 py-3 text-sm sm:text-base font-bold flex items-center gap-2.5 cursor-pointer"
              >
                <Users className="w-5 h-5 shrink-0" />
                <span>PILIH AVATAR</span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('AVATAR_SHOP')}
                className="pixel-btn bg-[#EA580C] hover:bg-[#C2410C] text-white px-4 py-3 text-sm sm:text-base font-bold flex items-center gap-2.5 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 shrink-0" />
                <span>KEDAI AVATAR</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleNav('GUIDE')}
                className="pixel-btn bg-[#FACC15] hover:bg-[#EAB308] text-[#2B1D14] px-4 py-3 text-sm sm:text-base font-extrabold flex items-center gap-2.5 cursor-pointer"
              >
                <BookOpen className="w-5 h-5 shrink-0" />
                <span>PANDUAN PERMAINAN</span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('GOODBYE')}
                className="pixel-btn bg-[#B91C1C] hover:bg-[#991B1B] text-white px-4 py-3 text-sm sm:text-base font-bold flex items-center gap-2.5 cursor-pointer"
              >
                <LogOut className="w-5 h-5 shrink-0" />
                <span>KELUAR</span>
              </button>
            </div>
          </nav>
        </section>

        {/* Right: Awang Kenit Welcome Card & Current Player Status */}
        <aside className="lg:col-span-5 flex flex-col gap-4">
          <div className="pixel-box bg-[#FDF6E3] p-5 text-[#2B1D14]">
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 border-4 border-[#2B1D14] bg-amber-100 overflow-hidden animate-pixel-bob">
                <PixelImage
                  src={awangKenit.imageUrl}
                  alt="Awang Kenit menyambut pengembara"
                  className="w-full h-full object-cover"
                  fallbackLabel="Awang Kenit"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-pixel text-xs text-[#B91C1C] mb-1">AWANG KENIT MENYAPA:</p>
                <p className="text-sm sm:text-base font-bold leading-snug text-[#2B1D14]">
                  "Selamat datang, {progress.playerName}! Ayuh kita jelajah tiga kawasan warisan dan kuasai sembilan jenis kata adjektif bersama-sama!"
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t-2 border-[#2B1D14]/20 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs sm:text-sm font-semibold text-[#5D4037]">
                <span>Avatar Aktif: </span>
                <strong className="text-[#2B1D14]">{currentAvatar.name}</strong>
                <span className="mx-1.5" aria-hidden="true">·</span>
                <span>Tahap: <strong className="font-mono-num">{completedCount}/3</strong></span>
              </div>
              <button
                type="button"
                onClick={() => handleNav('PROFILE')}
                className="pixel-btn bg-[#5D4037] hover:bg-[#4E342E] text-[#FEF08A] px-3 py-1.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>PROFIL PEMAIN</span>
              </button>
            </div>
          </div>

          {/* Syarat Kod Rahsia Medan Pendekar Bahasa */}
          <div className="pixel-box bg-[#FEF3C7] p-4 sm:p-5 text-[#2B1D14] space-y-2.5">
            <div className="flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-[#B91C1C] shrink-0" />
              <h2 className="font-pixel text-xs sm:text-sm text-[#B91C1C]">
                MISI KOD: MEDAN PENDEKAR BAHASA
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-bold text-[#2B1D14] leading-snug">
              Syarat untuk mendapatkan kod rahsia ke permainan{' '}
              <span className="text-[#B91C1C]">MEDAN PENDEKAR BAHASA</span>:
            </p>
            <ul className="space-y-1.5 text-xs font-bold">
              <li
                className={`flex items-center gap-2 ${
                  completedCount === 3 ? 'text-[#15803D]' : 'text-[#5D4037]'
                }`}
              >
                {completedCount === 3 ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-[#15803D]" />
                ) : (
                  <Lock className="w-4 h-4 shrink-0 text-[#92400E]" />
                )}
                <span>Habiskan kesemua 3 kawasan misi ({completedCount}/3)</span>
              </li>
              <li
                className={`flex items-center gap-2 ${
                  progress.ownedAvatars.includes('raja_mustafar')
                    ? 'text-[#15803D]'
                    : 'text-[#5D4037]'
                }`}
              >
                {progress.ownedAvatars.includes('raja_mustafar') ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-[#15803D]" />
                ) : (
                  <Lock className="w-4 h-4 shrink-0 text-[#92400E]" />
                )}
                <span>Dapatkan avatar Raja Mustafar di Kedai Avatar (300 Kupang)</span>
              </li>
            </ul>
            {completedCount === 3 && progress.ownedAvatars.includes('raja_mustafar') && (
              <button
                type="button"
                onClick={() => handleNav('VICTORY')}
                className="pixel-btn w-full bg-[#16A34A] hover:bg-[#15803D] text-white py-2 px-3 text-xs font-extrabold cursor-pointer mt-1"
              >
                LIHAT & SALIN KOD MEDAN PENDEKAR BAHASA
              </button>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
};
