import React, { useState } from 'react';
import { ShoppingBag, CheckCircle2, Lock, Star, AlertTriangle, Users } from 'lucide-react';
import { AVATARS } from '../data/gameData';
import { AvatarId, PageView, PlayerProgress } from '../types/game';
import { KupangCoinIcon, PixelImage } from '../components/PixelIcons';
import { SecretCodeCard } from '../components/SecretCodeCard';
import { retroAudio } from '../utils/audio';

interface AvatarShopProps {
  progress: PlayerProgress;
  onBuyAvatar: (id: AvatarId) => { ok: boolean; message: string };
  onSelectAvatar: (id: AvatarId) => boolean;
  onNavigate: (page: PageView) => void;
}

export const AvatarShop: React.FC<AvatarShopProps> = ({
  progress,
  onBuyAvatar,
  onSelectAvatar,
  onNavigate,
}) => {
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);

  const handleBuy = (id: AvatarId) => {
    const result = onBuyAvatar(id);
    setFeedback({ ok: result.ok, text: result.message });
  };

  return (
    <main className="min-h-[calc(100vh-64px)] py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="pixel-box bg-[#FDF6E3] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-[#EA580C] mb-1 flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4" />
              PASAR KEBUDAYAAN NUSANTARA
            </p>
            <h1 className="font-pixel text-2xl sm:text-3xl text-[#2B1D14]">KEDAI AVATAR</h1>
            <p className="text-sm font-medium text-[#5D4037] mt-1">
              Gunakan kupang hasil jawapan tepat anda untuk membuka watak pahlawan baharu.
              Kekuatan avatar ialah elemen permainan dan tidak mengubah markah akademik.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="bg-[#2B1D14] border-2 border-[#FACC15] px-4 py-2 flex items-center gap-2">
              <KupangCoinIcon className="w-6 h-6" />
              <span className="font-mono-num font-bold text-lg text-[#FEF08A]">
                {progress.kupang} KUPANG
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                retroAudio.playClick();
                onNavigate('AVATAR_SELECT');
              }}
              className="pixel-btn bg-[#0284C7] hover:bg-[#0369A1] text-white px-4 py-2.5 text-sm font-bold flex items-center gap-2 cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>PILIH AVATAR</span>
            </button>
          </div>
        </div>

        {/* Feedback Banner */}
        {feedback && (
          <div
            role="status"
            className={`pixel-box-sm p-4 flex items-center gap-3 font-bold text-sm sm:text-base ${
              feedback.ok
                ? 'bg-[#DCFCE7] text-[#14532D]'
                : 'bg-[#FEE2E2] text-[#7F1D1D]'
            }`}
          >
            {feedback.ok ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-[#15803D]" />
            ) : (
              <AlertTriangle className="w-5 h-5 shrink-0 text-[#B91C1C]" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}

        {/* Show Secret Code immediately if all 3 stages completed & Raja Mustafar owned */}
        {progress.completedStages.length === 3 &&
          progress.ownedAvatars.includes('raja_mustafar') && (
            <SecretCodeCard progress={progress} onNavigate={onNavigate} />
          )}

        {/* Avatar Shop Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {AVATARS.map((avatar) => {
            const owned = progress.ownedAvatars.includes(avatar.id);
            const active = progress.currentAvatar === avatar.id;
            const canAfford = progress.kupang >= avatar.price;

            return (
              <article
                key={avatar.id}
                className="pixel-box bg-[#FDF6E3] p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3 text-xs font-bold">
                    <span style={{ color: avatar.accentColor }}>{avatar.statusLabel}</span>
                    {owned ? (
                      <span className="flex items-center gap-1 text-[#15803D]">
                        <CheckCircle2 className="w-4 h-4" />
                        DIMILIKI
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[#6B7280]">
                        <Lock className="w-4 h-4" />
                        BELUM DIMILIKI
                      </span>
                    )}
                  </div>

                  <div className="w-full aspect-square max-w-[210px] mx-auto mb-4 border-4 border-[#2B1D14] bg-[#F5EBD1] overflow-hidden">
                    <PixelImage
                      src={avatar.imageUrl}
                      alt={`Ilustrasi Pixel Art ${avatar.name}`}
                      className="w-full h-full object-cover"
                      fallbackLabel={avatar.name}
                    />
                  </div>

                  <h2 className="font-pixel text-lg text-[#2B1D14] mb-1">{avatar.name}</h2>
                  <p className="text-xs font-semibold text-[#5D4037] mb-3">{avatar.description}</p>

                  {/* Strength Meter */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs font-bold text-[#2B1D14] mb-1">
                      <span>Tahap Kekuatan</span>
                      <span className="font-mono-num">{avatar.strength}/5</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <Star
                          key={lvl}
                          className={`w-4 h-4 ${
                            lvl <= avatar.strength
                              ? 'fill-[#FACC15] text-[#B45309]'
                              : 'fill-transparent text-[#CBD5E1]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-[#5D4037] mb-1">
                    <strong>Pakaian:</strong> {avatar.attire}
                  </p>
                  <p className="text-xs text-[#5D4037] mb-4">
                    <strong>Ciri khas:</strong> {avatar.specialTrait}
                  </p>
                </div>

                <div className="pt-3 border-t-2 border-[#2B1D14]/15 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#5D4037]">Harga</span>
                    <div className="flex items-center gap-1.5 font-mono-num font-extrabold text-base text-[#92400E]">
                      <KupangCoinIcon className="w-5 h-5" />
                      <span>{avatar.price === 0 ? 'Percuma' : `${avatar.price} Kupang`}</span>
                    </div>
                  </div>

                  {owned ? (
                    <button
                      type="button"
                      onClick={() => {
                        onSelectAvatar(avatar.id);
                        setFeedback({ ok: true, text: `${avatar.name} sedang digunakan!` });
                      }}
                      disabled={active}
                      className={`pixel-btn w-full py-2.5 px-4 text-sm font-extrabold cursor-pointer ${
                        active
                          ? 'bg-[#15803D] text-white opacity-95 cursor-default'
                          : 'bg-[#0284C7] hover:bg-[#0369A1] text-white'
                      }`}
                    >
                      {active ? 'SEDANG DIGUNAKAN' : 'PAKAI AVATAR INI'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleBuy(avatar.id)}
                      className={`pixel-btn w-full py-2.5 px-4 text-sm font-extrabold cursor-pointer ${
                        canAfford
                          ? 'bg-[#EA580C] hover:bg-[#C2410C] text-white'
                          : 'bg-[#D6D3C4] text-[#4B5563]'
                      }`}
                    >
                      BELI ({avatar.price} KUPANG)
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
};
