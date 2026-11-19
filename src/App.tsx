import { useState } from 'react';
import { PageView } from './types/game';
import { useGameState } from './hooks/useGameState';
import { TopHud } from './components/TopHud';
import { AmbientBackdrop } from './components/AmbientBackdrop';
import { MainMenu } from './pages/MainMenu';
import { WorldMap } from './pages/WorldMap';
import { AvatarShop } from './pages/AvatarShop';
import { AvatarSelect } from './pages/AvatarSelect';
import { GuidePage } from './pages/GuidePage';
import { ProfilePage } from './pages/ProfilePage';
import { Stage1TapakWarisan } from './pages/Stage1TapakWarisan';
import { Stage2LebuhNusantara } from './pages/Stage2LebuhNusantara';
import { Stage3PuncakKaryawan } from './pages/Stage3PuncakKaryawan';
import { VictoryScreen } from './pages/VictoryScreen';
import { GoodbyeScreen } from './pages/GoodbyeScreen';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('MENU');
  const {
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
  } = useGameState();

  const navigate = (page: PageView) => {
    if (page === 'STAGE_2' && !isStageUnlocked(2)) {
      setCurrentPage('WORLD_MAP');
      return;
    }
    if (page === 'STAGE_3' && !isStageUnlocked(3)) {
      setCurrentPage('WORLD_MAP');
      return;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#1B3B2B] text-[#2B1D14]">
      {currentPage !== 'MENU' && <AmbientBackdrop subtle showWalkers />}

      <TopHud
        progress={progress}
        currentPage={currentPage}
        onNavigate={navigate}
        onToggleMusic={toggleMusic}
        onToggleSfx={toggleSfx}
      />

      <div className="relative z-10 flex-1 flex flex-col">
        {currentPage === 'MENU' && (
          <MainMenu progress={progress} onNavigate={navigate} />
        )}

        {currentPage === 'WORLD_MAP' && (
          <WorldMap
            progress={progress}
            isStageUnlocked={isStageUnlocked}
            onNavigate={navigate}
          />
        )}

        {currentPage === 'AVATAR_SHOP' && (
          <AvatarShop
            progress={progress}
            onBuyAvatar={buyAvatar}
            onSelectAvatar={selectAvatar}
            onNavigate={navigate}
          />
        )}

        {currentPage === 'AVATAR_SELECT' && (
          <AvatarSelect
            progress={progress}
            onSelectAvatar={selectAvatar}
            onNavigate={navigate}
          />
        )}

        {currentPage === 'GUIDE' && <GuidePage onNavigate={navigate} />}

        {currentPage === 'PROFILE' && (
          <ProfilePage
            progress={progress}
            onUpdateName={setPlayerName}
            onResetProgress={resetProgress}
            onNavigate={navigate}
          />
        )}

        {currentPage === 'STAGE_1' && (
          <Stage1TapakWarisan
            attemptCount={progress.stageAttemptCounts?.[1] ?? 0}
            onAddKupang={addKupang}
            onCompleteStage={completeStage}
            onNavigate={navigate}
          />
        )}

        {currentPage === 'STAGE_2' && (
          <Stage2LebuhNusantara
            attemptCount={progress.stageAttemptCounts?.[2] ?? 0}
            onAddKupang={addKupang}
            onCompleteStage={completeStage}
            onNavigate={navigate}
          />
        )}

        {currentPage === 'STAGE_3' && (
          <Stage3PuncakKaryawan
            progress={progress}
            attemptCount={progress.stageAttemptCounts?.[3] ?? 0}
            onAddKupang={addKupang}
            onCompleteStage={completeStage}
            onNavigate={navigate}
          />
        )}

        {currentPage === 'VICTORY' && (
          <VictoryScreen progress={progress} onNavigate={navigate} />
        )}

        {currentPage === 'GOODBYE' && (
          <GoodbyeScreen progress={progress} onNavigate={navigate} />
        )}
      </div>
    </div>
  );
}
