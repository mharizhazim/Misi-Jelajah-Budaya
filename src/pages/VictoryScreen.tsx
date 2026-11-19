import React from 'react';
import { Award, Home, RotateCcw, CheckCircle2 } from 'lucide-react';
import { AVATARS, STAGE_METADATA } from '../data/gameData';
import { PageView, PlayerProgress } from '../types/game';
import { KupangCoinIcon, PixelImage, WiraBudayaBadge } from '../components/PixelIcons';
import { SecretCodeCard } from '../components/SecretCodeCard';
import { retroAudio } from '../utils/audio';

interface VictoryScreenProps {
  progress: PlayerProgress;
  onNavigate: (page: PageView) => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({ progress, onNavigate }) => {
  const avatar = AVATARS.find((a) => a.id === progress.currentAvatar) ?? AVATARS[0];

  return (
    <main className="min-h-[calc(100vh-64px)] py-8 px-4 sm:px-6 flex items-center justify-center">
      <section className="pixel-box bg-[#FDF6E3] max-w-3xl w-full p-6 sm:p-8 text-center space-y-6">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-pixel-bob">
            <WiraBudayaBadge className="w-24 h-24 sm:w-28 sm:h-28" />
          </div>
          <p className="font-pixel text-xs sm:text-sm text-[#B45309] bg-[#FEF3C7] border-2 border-[#B45309] px-3 py-1">
            LENCANA WIRA BUDAYA DIPEROLEH
          </p>
          <h1 className="font-pixel text-2xl sm:text-4xl text-[#15803D]">
            TAHNIAH, WIRA BUDAYA!
          </h1>
          <p className="text-sm sm:text-lg font-bold text-[#2B1D14] max-w-xl leading-relaxed">
            "Anda telah berjaya menjelajah dunia budaya Malaysia dan menguasai sembilan jenis kata adjektif. Teruskan memelihara bahasa dan warisan negara!"
          </p>
        </div>

        {/* Player Avatar + Stats Summary */}
        <div className="bg-[#F5EBD1] border-3 border-[#2B1D14] p-5 grid grid-cols-1 md:grid-cols-12 gap-5 items-center text-left">
          <div className="md:col-span-4 flex flex-col items-center text-center">
            <div className="w-28 h-28 border-4 border-[#2B1D14] bg-white overflow-hidden mb-2">
              <PixelImage
                src={avatar.imageUrl}
                alt={avatar.name}
                className="w-full h-full object-cover"
                fallbackLabel={avatar.name}
              />
            </div>
            <p className="font-pixel text-sm text-[#2B1D14]">{progress.playerName}</p>
            <p className="text-xs font-bold text-[#5D4037]">{avatar.name}</p>
          </div>

          <div className="md:col-span-8 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border-2 border-[#2B1D14] p-3">
                <p className="text-xs font-bold text-[#5D4037]">Jumlah Kupang</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <KupangCoinIcon className="w-5 h-5" />
                  <span className="font-mono-num text-xl font-extrabold text-[#B45309]">
                    {progress.kupang}
                  </span>
                </div>
              </div>
              <div className="bg-white border-2 border-[#2B1D14] p-3">
                <p className="text-xs font-bold text-[#5D4037]">Soalan Betul</p>
                <p className="font-mono-num text-xl font-extrabold text-[#15803D] mt-1">
                  {progress.totalCorrectAnswers}
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-[#2B1D14] p-3 space-y-1.5">
              <p className="text-xs font-extrabold text-[#2B1D14] mb-1">
                Ketiga-tiga Tahap Diselesaikan:
              </p>
              {STAGE_METADATA.map((s) => (
                <div key={s.id} className="flex items-center gap-2 text-xs font-bold text-[#15803D]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    {s.name} ({s.difficulty})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Secret Code Unlock / Checklist */}
        <SecretCodeCard progress={progress} onNavigate={onNavigate} />

        {/* 3 Required Victory Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              retroAudio.playClick();
              onNavigate('WORLD_MAP');
            }}
            className="pixel-btn bg-[#16A34A] hover:bg-[#15803D] text-white py-3 px-4 text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>MAIN SEMULA</span>
          </button>

          <button
            type="button"
            onClick={() => {
              retroAudio.playClick();
              onNavigate('MENU');
            }}
            className="pixel-btn bg-[#0284C7] hover:bg-[#0369A1] text-white py-3 px-4 text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>KEMBALI KE MENU UTAMA</span>
          </button>

          <button
            type="button"
            onClick={() => {
              retroAudio.playClick();
              onNavigate('PROFILE');
            }}
            className="pixel-btn bg-[#FACC15] hover:bg-[#EAB308] text-[#2B1D14] py-3 px-4 text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>LIHAT PENCAPAIAN</span>
          </button>
        </div>
      </section>
    </main>
  );
};
