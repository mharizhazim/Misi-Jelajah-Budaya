import { useState, useEffect, useCallback } from 'react';
import { AvatarId, PlayerProgress, StageId } from '../types/game';
import { AVATARS } from '../data/gameData';
import { retroAudio } from '../utils/audio';

const STORAGE_KEY = 'misi_jelajah_budaya_v1';

const DEFAULT_PROGRESS: PlayerProgress = {
  playerName: 'Pengembara Muda',
  kupang: 0,
  currentAvatar: 'orang_kampung',
  ownedAvatars: ['orang_kampung'],
  completedStages: [],
  bonusClaimed: {
    1: false,
    2: false,
    3: false,
  },
  stageAttemptCounts: {
    1: 0,
    2: 0,
    3: 0,
  },
  totalCorrectAnswers: 0,
  bestStage1TimeSec: null,
  musicEnabled: true,
  sfxEnabled: true,
};

function loadProgress(): PlayerProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<PlayerProgress>;
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      kupang: Math.max(0, Number(parsed.kupang ?? 0)),
      ownedAvatars: Array.isArray(parsed.ownedAvatars) && parsed.ownedAvatars.includes('orang_kampung')
        ? parsed.ownedAvatars
        : ['orang_kampung'],
      completedStages: Array.isArray(parsed.completedStages) ? parsed.completedStages : [],
      bonusClaimed: {
        1: Boolean(parsed.bonusClaimed?.[1]),
        2: Boolean(parsed.bonusClaimed?.[2]),
        3: Boolean(parsed.bonusClaimed?.[3]),
      },
      stageAttemptCounts: {
        1: Number(parsed.stageAttemptCounts?.[1] ?? 0),
        2: Number(parsed.stageAttemptCounts?.[2] ?? 0),
        3: Number(parsed.stageAttemptCounts?.[3] ?? 0),
      },
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function useGameState() {
  const [progress, setProgress] = useState<PlayerProgress>(loadProgress);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota errors
    }
  }, [progress]);

  useEffect(() => {
    retroAudio.setSettings(progress.musicEnabled, progress.sfxEnabled);
  }, [progress.musicEnabled, progress.sfxEnabled]);

  const addKupang = useCallback((amount: number, countCorrect = true) => {
    if (amount <= 0) return;
    setProgress((prev) => ({
      ...prev,
      kupang: Math.max(0, prev.kupang + amount),
      totalCorrectAnswers: countCorrect ? prev.totalCorrectAnswers + 1 : prev.totalCorrectAnswers,
    }));
  }, []);

  const completeStage = useCallback(
    (stageId: StageId, bonusAmount: number, stage1TimeSec?: number): { bonusGranted: number } => {
      const granted = progress.bonusClaimed[stageId] ? 0 : bonusAmount;
      setProgress((prev) => {
        const alreadyClaimed = prev.bonusClaimed[stageId];
        const actualBonus = alreadyClaimed ? 0 : bonusAmount;
        const completedSet = new Set<StageId>([...prev.completedStages, stageId]);
        const nextBestTime =
          stageId === 1 && typeof stage1TimeSec === 'number'
            ? prev.bestStage1TimeSec === null
              ? stage1TimeSec
              : Math.min(prev.bestStage1TimeSec, stage1TimeSec)
            : prev.bestStage1TimeSec;

        return {
          ...prev,
          kupang: Math.max(0, prev.kupang + actualBonus),
          completedStages: Array.from(completedSet).sort() as StageId[],
          bonusClaimed: {
            ...prev.bonusClaimed,
            [stageId]: true,
          },
          stageAttemptCounts: {
            ...prev.stageAttemptCounts,
            [stageId]: (prev.stageAttemptCounts?.[stageId] ?? 0) + 1,
          },
          bestStage1TimeSec: nextBestTime,
        };
      });
      return { bonusGranted: granted };
    },
    [progress.bonusClaimed]
  );

  const buyAvatar = useCallback(
    (avatarId: AvatarId): { ok: boolean; message: string } => {
      const avatar = AVATARS.find((a) => a.id === avatarId);
      if (!avatar) return { ok: false, message: 'Avatar tidak ditemui.' };
      if (progress.ownedAvatars.includes(avatarId)) {
        return { ok: false, message: 'Avatar ini sudah anda miliki!' };
      }
      if (progress.kupang < avatar.price) {
        retroAudio.playWrong();
        return { ok: false, message: 'Kupang anda belum mencukupi!' };
      }
      retroAudio.playCoin();
      setProgress((prev) => {
        if (prev.ownedAvatars.includes(avatarId) || prev.kupang < avatar.price) {
          return prev;
        }
        return {
          ...prev,
          kupang: Math.max(0, prev.kupang - avatar.price),
          ownedAvatars: [...prev.ownedAvatars, avatarId],
          currentAvatar: avatarId,
        };
      });
      return { ok: true, message: `Tahniah! ${avatar.name} berjaya dibeli dan dipilih.` };
    },
    [progress.kupang, progress.ownedAvatars]
  );

  const selectAvatar = useCallback(
    (avatarId: AvatarId): boolean => {
      if (!progress.ownedAvatars.includes(avatarId)) return false;
      retroAudio.playClick();
      setProgress((prev) => ({
        ...prev,
        currentAvatar: avatarId,
      }));
      return true;
    },
    [progress.ownedAvatars]
  );

  const setPlayerName = useCallback((name: string) => {
    const trimmed = name.trim().slice(0, 24) || 'Pengembara Muda';
    setProgress((prev) => ({ ...prev, playerName: trimmed }));
  }, []);

  const toggleMusic = useCallback(() => {
    setProgress((prev) => {
      const next = !prev.musicEnabled;
      retroAudio.unlockAndStartMusic(next);
      return { ...prev, musicEnabled: next };
    });
  }, []);

  const toggleSfx = useCallback(() => {
    setProgress((prev) => ({ ...prev, sfxEnabled: !prev.sfxEnabled }));
  }, []);

  const resetProgress = useCallback(() => {
    retroAudio.playClick();
    setProgress({ ...DEFAULT_PROGRESS });
  }, []);

  const isStageUnlocked = useCallback(
    (stageId: StageId): boolean => {
      if (stageId === 1) return true;
      if (stageId === 2) return progress.completedStages.includes(1);
      if (stageId === 3) return progress.completedStages.includes(2);
      return false;
    },
    [progress.completedStages]
  );

  return {
    progress,
    addKupang,
    completeStage,
    buyAvatar,
    selectAvatar,
    setPlayerName,
    toggleMusic,
    toggleSfx,
    resetProgress,
    isStageUnlocked,
  };
}
