export type PageView =
  | 'MENU'
  | 'WORLD_MAP'
  | 'AVATAR_SELECT'
  | 'AVATAR_SHOP'
  | 'GUIDE'
  | 'PROFILE'
  | 'STAGE_1'
  | 'STAGE_2'
  | 'STAGE_3'
  | 'VICTORY'
  | 'GOODBYE';

export type AvatarId =
  | 'orang_kampung'
  | 'awang_kenit'
  | 'badang'
  | 'raksasa'
  | 'raja_mustafar';

export interface AvatarItem {
  id: AvatarId;
  name: string;
  price: number;
  strength: number;
  statusLabel: string;
  attire: string;
  specialTrait: string;
  description: string;
  imageUrl: string;
  accentColor: string;
}

export type AdjectiveCategoryId =
  | 'sifat'
  | 'warna'
  | 'ukuran'
  | 'bentuk'
  | 'waktu'
  | 'jarak'
  | 'cara'
  | 'perasaan'
  | 'pancaindera';

export interface AdjectiveCategory {
  id: AdjectiveCategoryId;
  name: string;
  shortName: string;
  definition: string;
  examples: string[];
  colorClass: string;
}

export interface Stage1Word {
  id: string;
  word: string;
  categoryId: AdjectiveCategoryId;
  explanation: string;
}

export interface Stage2Question {
  id: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  sentence: string;
  options: [string, string, string];
  correctIndex: number;
  adjectiveType: string;
  explanationCorrect: string;
  explanationWrong: string;
}

export interface Stage3Question {
  id: string;
  title: string;
  sentence: string;
  options: [string, string, string];
  correctIndex: number;
  adjectiveType: string;
  explanationCorrect: string;
  optionReasons: [string, string, string];
}

export type StageId = 1 | 2 | 3;

export interface PlayerProgress {
  playerName: string;
  kupang: number;
  currentAvatar: AvatarId;
  ownedAvatars: AvatarId[];
  completedStages: StageId[];
  bonusClaimed: Record<StageId, boolean>;
  stageAttemptCounts: Record<StageId, number>;
  totalCorrectAnswers: number;
  bestStage1TimeSec: number | null;
  musicEnabled: boolean;
  sfxEnabled: boolean;
}
