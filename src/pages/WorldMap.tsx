import React from 'react';
import { Lock, Play, CheckCircle2, ArrowRight, Compass, ShieldAlert } from 'lucide-react';
import { SCENE_IMAGES, STAGE_METADATA } from '../data/gameData';
import { PageView, PlayerProgress, StageId } from '../types/game';
import { PixelImage } from '../components/PixelIcons';
import { retroAudio } from '../utils/audio';

interface WorldMapProps {
  progress: PlayerProgress;
  isStageUnlocked: (stageId: StageId) => boolean;
  onNavigate: (page: PageView) => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  progress,
  isStageUnlocked,
  onNavigate,
}) => {
  const getStageStatus = (id: StageId) => {
    if (progress.completedStages.includes(id)) return 'SELESAI' as const;
    if (isStageUnlocked(id)) return 'SEDANG DITEROKAI' as const;
    return 'BELUM DIBUKA' as const;
  };

  const openStage = (id: StageId) => {
    if (!isStageUnlocked(id)) {
      retroAudio.playWrong();
      return;
    }
    retroAudio.playClick();
    if (id === 1) onNavigate('STAGE_1');
    if (id === 2) onNavigate('STAGE_2');
    if (id === 3) onNavigate('STAGE_3');
  };

  return (
    <main className="min-h-[calc(100vh-64px)] py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="pixel-box bg-[#FDF6E3] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-[#15803D] mb-1 flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              PETA DUNIA FANTASI NUSANTARA
            </p>
            <h1 className="font-pixel text-2xl sm:text-3xl text-[#2B1D14]">
              LAYAR WARISAN
            </h1>
            <p className="text-sm sm:text-base font-medium text-[#5D4037] mt-1">
              Selesaikan kawasan mengikut turutan untuk membuka laluan hingga ke istana diraja!
            </p>
          </div>
          <div className="bg-[#2B1D14] text-[#FEF08A] px-4 py-2.5 border-2 border-[#FACC15] shrink-0 text-sm font-bold">
            Kemajuan Peta: <span className="font-mono-num">{progress.completedStages.length}/3</span> Kawasan
          </div>
        </div>

        {/* Interactive Pixel Art World Map Canvas */}
        <section
          aria-label="Peta Interaktif Kawasan Pengembaraan"
          className="pixel-box bg-[#2B1D14] p-2 sm:p-3 relative overflow-hidden"
        >
          <div className="relative w-full aspect-[16/9] overflow-hidden border-2 border-[#1B100A]">
            <PixelImage
              src={SCENE_IMAGES.worldMap}
              alt="Peta dunia Pixel Art menunjukkan Tapak Warisan, Lebuh Nusantara dan Puncak Karyawan"
              className="w-full h-full object-cover"
              fallbackLabel="Peta Layar Warisan"
            />
            <div className="absolute inset-0 bg-black/15 pointer-events-none" />

            {/* Interactive Map Pins */}
            {STAGE_METADATA.map((stage) => {
              const status = getStageStatus(stage.id);
              const unlocked = status !== 'BELUM DIBUKA';
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => openStage(stage.id)}
                  style={{ left: stage.mapPosition.left, top: stage.mapPosition.top }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 pixel-btn px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-left cursor-pointer transition-transform ${
                    status === 'SELESAI'
                      ? 'bg-[#16A34A] text-white'
                      : unlocked
                      ? 'bg-[#FACC15] text-[#2B1D14] animate-pixel-bob'
                      : 'bg-[#4B5563]/95 text-gray-200 cursor-not-allowed'
                  }`}
                  aria-label={`${stage.name} (${stage.difficulty}) - ${status}`}
                >
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    {status === 'SELESAI' && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                    {status === 'SEDANG DITEROKAI' && <Play className="w-4 h-4 shrink-0" />}
                    {status === 'BELUM DIBUKA' && <Lock className="w-4 h-4 shrink-0" />}
                    <span className="font-pixel text-[10px] sm:text-xs">
                      {stage.id}. {stage.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Detailed Stage Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {STAGE_METADATA.map((stage) => {
            const status = getStageStatus(stage.id);
            const unlocked = status !== 'BELUM DIBUKA';
            return (
              <article
                key={stage.id}
                className={`pixel-box p-5 flex flex-col justify-between transition-opacity ${
                  unlocked ? 'bg-[#FDF6E3]' : 'bg-[#E5E0D0] opacity-90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 text-xs font-bold">
                    <span style={{ color: stage.badgeColor }}>
                      KAWASAN {stage.id} · {stage.difficulty}
                    </span>
                    <span className="flex items-center gap-1 text-[#2B1D14]">
                      {status === 'SELESAI' && (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                          <span className="text-[#15803D]">SELESAI</span>
                        </>
                      )}
                      {status === 'SEDANG DITEROKAI' && (
                        <>
                          <Play className="w-4 h-4 text-[#D97706]" />
                          <span className="text-[#B45309]">SEDANG DITEROKAI</span>
                        </>
                      )}
                      {status === 'BELUM DIBUKA' && (
                        <>
                          <Lock className="w-4 h-4 text-[#6B7280]" />
                          <span className="text-[#4B5563]">BELUM DIBUKA</span>
                        </>
                      )}
                    </span>
                  </div>

                  <h2 className="font-pixel text-lg sm:text-xl text-[#2B1D14] mb-1">
                    {stage.name}
                  </h2>
                  <p className="text-xs font-extrabold text-[#0369A1] mb-2">
                    Misi: {stage.concept}
                  </p>
                  <p className="text-sm font-medium text-[#5D4037] leading-relaxed mb-3">
                    {stage.description}
                  </p>
                </div>

                <div className="pt-3 border-t-2 border-[#2B1D14]/15 space-y-3">
                  <p className="text-xs font-bold text-[#92400E]">{stage.rewardText}</p>
                  {unlocked ? (
                    <button
                      type="button"
                      onClick={() => openStage(stage.id)}
                      className={`pixel-btn w-full py-2.5 px-4 text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer ${
                        status === 'SELESAI'
                          ? 'bg-[#15803D] hover:bg-[#166534] text-white'
                          : 'bg-[#EA580C] hover:bg-[#C2410C] text-white'
                      }`}
                    >
                      <span>{status === 'SELESAI' ? 'MAIN SEMULA TAHAP' : 'MASUK KAWASAN'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 bg-[#D6D3C4] border-2 border-[#9CA3AF] px-3 py-2.5 text-xs font-bold text-[#374151]">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>Selesaikan Kawasan {stage.id - 1} dahulu untuk membuka laluan.</span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </section>

        {progress.completedStages.length === 3 && (
          <div className="pixel-box bg-[#FEF3C7] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="font-pixel text-lg text-[#92400E]">SEMUA KAWASAN TELAH SELESAI!</h2>
              <p className="text-sm font-semibold text-[#5D4037]">
                Anda boleh melihat semula paparan kemenangan rasmi Wira Budaya anda.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                retroAudio.playVictory();
                onNavigate('VICTORY');
              }}
              className="pixel-btn bg-[#FACC15] hover:bg-[#EAB308] text-[#2B1D14] px-5 py-2.5 text-sm font-extrabold cursor-pointer whitespace-nowrap"
            >
              LIHAT SKRIN TAMAT PERMAINAN
            </button>
          </div>
        )}
      </div>
    </main>
  );
};
