import React from 'react';
import { Users, CheckCircle2, Lock, ShoppingBag, Star } from 'lucide-react';
import { AVATARS } from '../data/gameData';
import { AvatarId, PageView, PlayerProgress } from '../types/game';
import { PixelImage } from '../components/PixelIcons';
import { retroAudio } from '../utils/audio';

interface AvatarSelectProps {
  progress: PlayerProgress;
  onSelectAvatar: (id: AvatarId) => boolean;
  onNavigate: (page: PageView) => void;
}

export const AvatarSelect: React.FC<AvatarSelectProps> = ({
  progress,
  onSelectAvatar,
  onNavigate,
}) => {
  return (
    <main className="min-h-[calc(100vh-64px)] py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="pixel-box bg-[#FDF6E3] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-[#0284C7] mb-1 flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              KOLEKSI WATAK PENGEMBARA
            </p>
            <h1 className="font-pixel text-2xl sm:text-3xl text-[#2B1D14]">PILIH AVATAR</h1>
            <p className="text-sm font-medium text-[#5D4037] mt-1">
              Tukar watak pengembaraan anda pada bila-bila masa. Avatar yang belum dibeli boleh diperoleh di Kedai Avatar.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              retroAudio.playClick();
              onNavigate('AVATAR_SHOP');
            }}
            className="pixel-btn bg-[#EA580C] hover:bg-[#C2410C] text-white px-4 py-2.5 text-sm font-extrabold flex items-center gap-2 cursor-pointer shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>PERGI KE KEDAI AVATAR</span>
          </button>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {AVATARS.map((avatar) => {
            const owned = progress.ownedAvatars.includes(avatar.id);
            const active = progress.currentAvatar === avatar.id;

            return (
              <article
                key={avatar.id}
                className={`pixel-box p-5 flex flex-col justify-between ${
                  active
                    ? 'bg-[#FEF9C3]'
                    : owned
                    ? 'bg-[#FDF6E3]'
                    : 'bg-[#E5E0D0] opacity-85'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3 text-xs font-bold">
                    <span style={{ color: avatar.accentColor }}>{avatar.statusLabel}</span>
                    {active ? (
                      <span className="text-[#15803D] flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        SEDANG DIPAKAI
                      </span>
                    ) : owned ? (
                      <span className="text-[#0369A1]">DIMILIKI</span>
                    ) : (
                      <span className="text-[#4B5563] flex items-center gap-1">
                        <Lock className="w-4 h-4" />
                        TERKUNCI
                      </span>
                    )}
                  </div>

                  <div className="w-full aspect-square max-w-[200px] mx-auto mb-4 border-4 border-[#2B1D14] bg-[#F5EBD1] overflow-hidden">
                    <PixelImage
                      src={avatar.imageUrl}
                      alt={avatar.name}
                      className={`w-full h-full object-cover ${!owned ? 'grayscale opacity-75' : ''}`}
                      fallbackLabel={avatar.name}
                    />
                  </div>

                  <h2 className="font-pixel text-lg text-[#2B1D14] mb-1">{avatar.name}</h2>
                  <p className="text-xs font-semibold text-[#5D4037] mb-3">{avatar.specialTrait}</p>

                  <div className="flex items-center gap-1 mb-4">
                    <span className="text-xs font-bold text-[#2B1D14] mr-1">Kekuatan:</span>
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

                {owned ? (
                  <button
                    type="button"
                    onClick={() => onSelectAvatar(avatar.id)}
                    disabled={active}
                    className={`pixel-btn w-full py-2.5 px-4 text-sm font-extrabold cursor-pointer ${
                      active
                        ? 'bg-[#15803D] text-white cursor-default'
                        : 'bg-[#0284C7] hover:bg-[#0369A1] text-white'
                    }`}
                  >
                    {active ? 'AVATAR AKTIF' : 'PILIH AVATAR INI'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      retroAudio.playClick();
                      onNavigate('AVATAR_SHOP');
                    }}
                    className="pixel-btn w-full py-2.5 px-4 text-sm font-bold bg-[#D6D3C4] hover:bg-[#CBD5E1] text-[#2B1D14] cursor-pointer"
                  >
                    BELI DI KEDAI ({avatar.price} KUPANG)
                  </button>
                )}
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
};
