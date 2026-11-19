import React from 'react';
import { Volume2, VolumeX, Music, Home, Map, User } from 'lucide-react';
import { AVATARS } from '../data/gameData';
import { PageView, PlayerProgress } from '../types/game';
import { KupangCoinIcon, PixelImage } from './PixelIcons';
import { retroAudio } from '../utils/audio';

interface TopHudProps {
  progress: PlayerProgress;
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onToggleMusic: () => void;
  onToggleSfx: () => void;
}

export const TopHud: React.FC<TopHudProps> = ({
  progress,
  currentPage,
  onNavigate,
  onToggleMusic,
  onToggleSfx,
}) => {
  const avatar = AVATARS.find((a) => a.id === progress.currentAvatar) ?? AVATARS[0];
  const isStage = currentPage === 'STAGE_1' || currentPage === 'STAGE_2' || currentPage === 'STAGE_3';

  return (
    <header className="sticky top-0 z-40 w-full bg-[#3E2723] text-[#FDF6E3] border-b-4 border-[#1B100A] shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Navigation & Game Brand */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {currentPage !== 'MENU' && (
            <button
              type="button"
              onClick={() => {
                retroAudio.playClick();
                onNavigate('MENU');
              }}
              className="pixel-btn bg-[#8D6E63] hover:bg-[#A1887F] text-[#FFF8E1] px-2.5 py-1.5 text-xs sm:text-sm font-bold flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
              aria-label="Kembali ke Menu Utama"
            >
              <Home className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Menu Utama</span>
            </button>
          )}
          {isStage && (
            <button
              type="button"
              onClick={() => {
                retroAudio.playClick();
                onNavigate('WORLD_MAP');
              }}
              className="pixel-btn bg-[#15803D] hover:bg-[#16A34A] text-white px-2.5 py-1.5 text-xs sm:text-sm font-bold flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
              aria-label="Kembali ke Peta Dunia"
            >
              <Map className="w-4 h-4 shrink-0" />
              <span className="hidden md:inline">Layar Warisan</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              retroAudio.playClick();
              onNavigate('MENU');
            }}
            className="text-left truncate cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-400"
          >
            <span className="font-pixel text-xs sm:text-base text-[#FACC15] tracking-wide whitespace-nowrap">
              MISI JELAJAH BUDAYA
            </span>
          </button>
        </div>

        {/* Right: Audio Toggles, Kupang Counter, Active Avatar & Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleMusic}
            title={progress.musicEnabled ? 'Matikan Muzik' : 'Hidupkan Muzik'}
            aria-label={progress.musicEnabled ? 'Matikan Muzik' : 'Hidupkan Muzik'}
            className={`pixel-btn px-2 py-1.5 text-xs font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0 ${
              progress.musicEnabled
                ? 'bg-[#0284C7] text-white'
                : 'bg-[#5D4037] text-amber-200/70'
            }`}
          >
            <Music className="w-4 h-4 shrink-0" />
            <span className="hidden lg:inline">{progress.musicEnabled ? 'Muzik: Hidup' : 'Muzik: Mati'}</span>
          </button>

          <button
            type="button"
            onClick={onToggleSfx}
            title={progress.sfxEnabled ? 'Matikan Bunyi Kesan' : 'Hidupkan Bunyi Kesan'}
            aria-label={progress.sfxEnabled ? 'Matikan Bunyi Kesan' : 'Hidupkan Bunyi Kesan'}
            className={`pixel-btn px-2 py-1.5 text-xs font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0 ${
              progress.sfxEnabled
                ? 'bg-[#EA580C] text-white'
                : 'bg-[#5D4037] text-amber-200/70'
            }`}
          >
            {progress.sfxEnabled ? (
              <Volume2 className="w-4 h-4 shrink-0" />
            ) : (
              <VolumeX className="w-4 h-4 shrink-0" />
            )}
            <span className="hidden lg:inline">{progress.sfxEnabled ? 'Bunyi: Hidup' : 'Bunyi: Mati'}</span>
          </button>

          {/* Kupang Display */}
          <div
            className="flex items-center gap-1.5 bg-[#2B1D14] border-2 border-[#FACC15] px-2.5 py-1"
            aria-label={`Jumlah Kupang: ${progress.kupang}`}
          >
            <KupangCoinIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="font-mono-num font-bold text-sm sm:text-base text-[#FEF08A] whitespace-nowrap">
              {progress.kupang} <span className="hidden sm:inline text-xs text-[#FACC15]">KUPANG</span>
            </span>
          </div>

          {/* Current Avatar & Profile Link */}
          <button
            type="button"
            onClick={() => {
              retroAudio.playClick();
              onNavigate('PROFILE');
            }}
            className="pixel-btn bg-[#FDF6E3] hover:bg-[#FEF3C7] text-[#2B1D14] pl-1.5 pr-2.5 py-1 flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
            aria-label={`Profil Pemain: ${progress.playerName}, Avatar ${avatar.name}`}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-[#2B1D14] overflow-hidden bg-amber-100 shrink-0">
              <PixelImage
                src={avatar.imageUrl}
                alt={avatar.name}
                className="w-full h-full object-cover"
                fallbackLabel={avatar.name}
              />
            </div>
            <span className="hidden md:flex items-center gap-1 text-xs font-bold">
              <User className="w-3.5 h-3.5" />
              Profil
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
