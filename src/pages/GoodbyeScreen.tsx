import React from 'react';
import { Home, Compass } from 'lucide-react';
import { AVATARS } from '../data/gameData';
import { PageView, PlayerProgress } from '../types/game';
import { KupangCoinIcon, PixelImage } from '../components/PixelIcons';
import { retroAudio } from '../utils/audio';

interface GoodbyeScreenProps {
  progress: PlayerProgress;
  onNavigate: (page: PageView) => void;
}

export const GoodbyeScreen: React.FC<GoodbyeScreenProps> = ({ progress, onNavigate }) => {
  const avatar = AVATARS.find((a) => a.id === progress.currentAvatar) ?? AVATARS[0];

  return (
    <main className="min-h-[calc(100vh-64px)] py-10 px-4 flex items-center justify-center">
      <section className="pixel-box bg-[#FDF6E3] max-w-lg w-full p-6 sm:p-8 text-center space-y-5">
        <div className="w-28 h-28 mx-auto border-4 border-[#2B1D14] bg-[#F5EBD1] overflow-hidden animate-pixel-bob">
          <PixelImage
            src={avatar.imageUrl}
            alt={avatar.name}
            className="w-full h-full object-cover"
            fallbackLabel={avatar.name}
          />
        </div>

        <div>
          <h1 className="font-pixel text-2xl text-[#2B1D14] mb-2">
            BEREHAT DI KAMPUNG
          </h1>
          <p className="text-sm sm:text-base font-medium text-[#5D4037]">
            Terima kasih kerana bermain <strong>Misi Jelajah Budaya</strong>, {progress.playerName}!
            Semua kupang dan kemajuan anda telah disimpan secara automatik.
          </p>
        </div>

        <div className="bg-[#F5EBD1] border-2 border-[#2B1D14] p-3 flex items-center justify-center gap-4 text-sm font-bold">
          <span className="flex items-center gap-1.5 text-[#B45309]">
            <KupangCoinIcon className="w-5 h-5" />
            <span className="font-mono-num">{progress.kupang} Kupang</span>
          </span>
          <span aria-hidden="true">·</span>
          <span className="text-[#15803D]">
            <span className="font-mono-num">{progress.completedStages.length}/3</span> Tahap Selesai
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => {
              retroAudio.playClick();
              onNavigate('MENU');
            }}
            className="pixel-btn flex-1 bg-[#0284C7] hover:bg-[#0369A1] text-white py-3 px-4 text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>KEMBALI KE MENU</span>
          </button>
          <button
            type="button"
            onClick={() => {
              retroAudio.playClick();
              onNavigate('WORLD_MAP');
            }}
            className="pixel-btn flex-1 bg-[#16A34A] hover:bg-[#15803D] text-white py-3 px-4 text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>SAMBUNG MISI</span>
          </button>
        </div>
      </section>
    </main>
  );
};
