import React, { useState } from 'react';
import {
  User,
  Award,
  CheckCircle2,
  Lock,
  Edit3,
  Save,
  RotateCcw,
  AlertTriangle,
  Map,
} from 'lucide-react';
import { AVATARS, STAGE_METADATA } from '../data/gameData';
import { PageView, PlayerProgress } from '../types/game';
import { KupangCoinIcon, PixelImage, WiraBudayaBadge } from '../components/PixelIcons';
import { SecretCodeCard } from '../components/SecretCodeCard';
import { retroAudio } from '../utils/audio';

interface ProfilePageProps {
  progress: PlayerProgress;
  onUpdateName: (name: string) => void;
  onResetProgress: () => void;
  onNavigate: (page: PageView) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  progress,
  onUpdateName,
  onResetProgress,
  onNavigate,
}) => {
  const [editingName, setEditingName] = useState(false);
  const [draftName, setDraftName] = useState(progress.playerName);
  const [confirmReset, setConfirmReset] = useState(false);

  const avatar = AVATARS.find((a) => a.id === progress.currentAvatar) ?? AVATARS[0];
  const progressPercent = Math.round((progress.completedStages.length / 3) * 100);

  const achievements = [
    {
      id: 'ach-s1',
      title: 'Penjelajah Tapak Warisan',
      desc: 'Menyelesaikan cabaran klasifikasi 18 kata adjektif.',
      unlocked: progress.completedStages.includes(1),
    },
    {
      id: 'ach-s2',
      title: 'Bintang Lebuh Nusantara',
      desc: 'Menamatkan semua soalan bergambar budaya Malaysia.',
      unlocked: progress.completedStages.includes(2),
    },
    {
      id: 'ach-s3',
      title: 'Penakluk Puncak Karyawan',
      desc: 'Melengkapkan semua ayat kata adjektif di istana diraja.',
      unlocked: progress.completedStages.includes(3),
    },
    {
      id: 'ach-avatar',
      title: 'Pengumpul Pahlawan',
      desc: 'Memiliki sekurang-kurangnya 3 avatar berbeza.',
      unlocked: progress.ownedAvatars.length >= 3,
    },
    {
      id: 'ach-wira',
      title: 'Wira Budaya Sejati',
      desc: 'Menamatkan ketiga-tiga kawasan warisan Nusantara.',
      unlocked: progress.completedStages.length === 3,
    },
  ];

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    retroAudio.playClick();
    onUpdateName(draftName);
    setEditingName(false);
  };

  return (
    <main className="min-h-[calc(100vh-64px)] py-6 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Card */}
        <section className="pixel-box bg-[#FDF6E3] p-5 sm:p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-32 h-32 sm:w-36 sm:h-36 border-4 border-[#2B1D14] bg-[#F5EBD1] overflow-hidden shrink-0">
            <PixelImage
              src={avatar.imageUrl}
              alt={avatar.name}
              className="w-full h-full object-cover"
              fallbackLabel={avatar.name}
            />
          </div>

          <div className="flex-1 w-full text-center md:text-left space-y-3">
            <p className="text-xs font-extrabold text-[#0284C7] flex items-center justify-center md:justify-start gap-1.5">
              <User className="w-4 h-4" />
              PROFIL & REKOD PENGEMBARAAN
            </p>

            {editingName ? (
              <form onSubmit={handleSaveName} className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <input
                  type="text"
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  maxLength={24}
                  aria-label="Nama Pemain"
                  className="bg-white border-3 border-[#2B1D14] px-3 py-1.5 font-bold text-base text-[#2B1D14] focus:outline-none focus:ring-2 focus:ring-[#EA580C]"
                />
                <button
                  type="submit"
                  className="pixel-btn bg-[#16A34A] text-white px-3 py-1.5 text-sm font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  Simpan
                </button>
              </form>
            ) : (
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <h1 className="font-pixel text-2xl sm:text-3xl text-[#2B1D14]">
                  {progress.playerName}
                </h1>
                <button
                  type="button"
                  onClick={() => {
                    retroAudio.playClick();
                    setDraftName(progress.playerName);
                    setEditingName(true);
                  }}
                  className="pixel-btn bg-[#FEF3C7] text-[#2B1D14] px-2.5 py-1 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Tukar Nama
                </button>
              </div>
            )}

            <p className="text-sm font-semibold text-[#5D4037]">
              Avatar Semasa: <strong className="text-[#2B1D14]">{avatar.name}</strong> ({avatar.statusLabel})
            </p>

            {/* Pixel Progress Bar */}
            <div className="pt-1">
              <div className="flex items-center justify-between text-xs font-extrabold text-[#2B1D14] mb-1.5">
                <span>Kemajuan Keseluruhan Pengembaraan</span>
                <span className="font-mono-num">
                  {progress.completedStages.length}/3 Tahap ({progressPercent}%)
                </span>
              </div>
              <div className="w-full h-6 bg-[#E5E0D0] border-3 border-[#2B1D14] p-0.5">
                <div
                  className="h-full bg-[#16A34A] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Key Stats Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="pixel-box-sm bg-[#FDF6E3] p-4">
            <p className="text-xs font-bold text-[#5D4037]">Jumlah Kupang</p>
            <div className="flex items-center gap-2 mt-1">
              <KupangCoinIcon className="w-6 h-6" />
              <span className="font-mono-num text-2xl font-extrabold text-[#B45309]">
                {progress.kupang}
              </span>
            </div>
          </div>

          <div className="pixel-box-sm bg-[#FDF6E3] p-4">
            <p className="text-xs font-bold text-[#5D4037]">Jawapan Betul</p>
            <p className="font-mono-num text-2xl font-extrabold text-[#15803D] mt-1">
              {progress.totalCorrectAnswers}
            </p>
          </div>

          <div className="pixel-box-sm bg-[#FDF6E3] p-4">
            <p className="text-xs font-bold text-[#5D4037]">Tahap Selesai</p>
            <p className="font-mono-num text-2xl font-extrabold text-[#0369A1] mt-1">
              {progress.completedStages.length} / 3
            </p>
          </div>

          <div className="pixel-box-sm bg-[#FDF6E3] p-4">
            <p className="text-xs font-bold text-[#5D4037]">Avatar Dimiliki</p>
            <p className="font-mono-num text-2xl font-extrabold text-[#7C2D12] mt-1">
              {progress.ownedAvatars.length} / {AVATARS.length}
            </p>
          </div>
        </section>

        {/* Completed Stages Breakdown & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="pixel-box bg-[#FDF6E3] p-5 space-y-4">
            <h2 className="font-pixel text-lg text-[#2B1D14]">STATUS KAWASAN WARISAN</h2>
            <div className="space-y-3">
              {STAGE_METADATA.map((s) => {
                const done = progress.completedStages.includes(s.id);
                return (
                  <div
                    key={s.id}
                    className={`border-2 border-[#2B1D14] p-3 flex items-center justify-between gap-3 ${
                      done ? 'bg-[#DCFCE7]' : 'bg-[#F5EBD1]'
                    }`}
                  >
                    <div>
                      <p className="font-extrabold text-sm text-[#2B1D14]">
                        {s.id}. {s.name} ({s.difficulty})
                      </p>
                      <p className="text-xs text-[#5D4037]">{s.concept}</p>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-extrabold shrink-0">
                      {done ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                          <span className="text-[#15803D]">SELESAI</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 text-[#6B7280]" />
                          <span className="text-[#4B5563]">BELUM</span>
                        </>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => {
                retroAudio.playClick();
                onNavigate('WORLD_MAP');
              }}
              className="pixel-btn w-full bg-[#16A34A] hover:bg-[#15803D] text-white py-2.5 text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Map className="w-4 h-4" />
              <span>TERUSKAN PENGEMBARAAN</span>
            </button>
          </section>

          <section className="pixel-box bg-[#FDF6E3] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-pixel text-lg text-[#2B1D14] flex items-center gap-2">
                <Award className="w-5 h-5 text-[#D97706]" />
                <span>REKOD PENCAPAIAN</span>
              </h2>
              {progress.completedStages.length === 3 && (
                <WiraBudayaBadge className="w-10 h-10" />
              )}
            </div>
            <div className="space-y-2.5">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className={`border-2 border-[#2B1D14] p-3 flex items-center gap-3 ${
                    ach.unlocked ? 'bg-[#FEF3C7]' : 'bg-[#E5E0D0] opacity-75'
                  }`}
                >
                  {ach.unlocked ? (
                    <CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0" />
                  ) : (
                    <Lock className="w-5 h-5 text-[#6B7280] shrink-0" />
                  )}
                  <div>
                    <p className="font-extrabold text-sm text-[#2B1D14]">{ach.title}</p>
                    <p className="text-xs text-[#5D4037]">{ach.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Medan Pendekar Bahasa Secret Code Card */}
        <SecretCodeCard progress={progress} onNavigate={onNavigate} />

        {/* Reset Progress Section with Explicit Confirmation */}
        <section className="pixel-box bg-[#FEE2E2] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-pixel text-base text-[#7F1D1D]">SET SEMULA PERMAINAN</h2>
            <p className="text-xs sm:text-sm font-medium text-[#7F1D1D]">
              Tindakan ini akan memadam semua kupang, avatar yang dibeli dan rekod tahap.
            </p>
          </div>
          {!confirmReset ? (
            <button
              type="button"
              onClick={() => {
                retroAudio.playClick();
                setConfirmReset(true);
              }}
              className="pixel-btn bg-[#B91C1C] hover:bg-[#991B1B] text-white px-4 py-2.5 text-sm font-extrabold flex items-center gap-2 cursor-pointer shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
              <span>SET SEMULA DATA</span>
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-2 bg-white border-2 border-[#7F1D1D] p-2.5">
              <AlertTriangle className="w-4 h-4 text-[#B91C1C]" />
              <span className="text-xs font-extrabold text-[#7F1D1D] mr-1">
                Pasti mahu padam semua?
              </span>
              <button
                type="button"
                onClick={() => {
                  onResetProgress();
                  setConfirmReset(false);
                }}
                className="pixel-btn bg-[#DC2626] text-white px-3 py-1.5 text-xs font-extrabold cursor-pointer"
              >
                YA, PADAM SEMUA
              </button>
              <button
                type="button"
                onClick={() => {
                  retroAudio.playClick();
                  setConfirmReset(false);
                }}
                className="pixel-btn bg-[#E5E7EB] text-[#2B1D14] px-3 py-1.5 text-xs font-bold cursor-pointer"
              >
                BATAL
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
