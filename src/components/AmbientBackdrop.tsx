import React from 'react';
import { PixelBird } from './PixelIcons';

const PixelCloud: React.FC<{ className?: string }> = ({ className = 'w-24 h-12' }) => (
  <svg viewBox="0 0 24 12" className={`pixelated ${className}`} aria-hidden="true" shapeRendering="crispEdges">
    <rect x="6" y="2" width="8" height="2" fill="#FFFFFF" />
    <rect x="4" y="4" width="14" height="3" fill="#FFFFFF" />
    <rect x="2" y="7" width="20" height="3" fill="#F8FAFC" />
    <rect x="3" y="9" width="18" height="1" fill="#BAE6FD" />
  </svg>
);

const PixelWalker: React.FC<{ shirtColor: string; hatColor: string; className?: string }> = ({
  shirtColor,
  hatColor,
  className = 'w-8 h-10',
}) => (
  <svg
    viewBox="0 0 12 16"
    className={`pixelated animate-walk-step ${className}`}
    aria-hidden="true"
    shapeRendering="crispEdges"
  >
    {/* Tanjak / Songkok */}
    <rect x="4" y="1" width="4" height="2" fill={hatColor} />
    {/* Head */}
    <rect x="4" y="3" width="4" height="3" fill="#D99B66" />
    <rect x="6" y="4" width="1" height="1" fill="#1E130D" />
    {/* Baju Melayu */}
    <rect x="3" y="6" width="6" height="4" fill={shirtColor} />
    {/* Kain samping */}
    <rect x="3" y="10" width="6" height="2" fill="#FACC15" />
    {/* Legs */}
    <rect x="4" y="12" width="2" height="3" fill="#2B1D14" />
    <rect x="7" y="12" width="2" height="3" fill="#2B1D14" />
  </svg>
);

interface AmbientBackdropProps {
  showWalkers?: boolean;
  subtle?: boolean;
  className?: string;
}

export const AmbientBackdrop: React.FC<AmbientBackdropProps> = ({
  showWalkers = true,
  subtle = false,
  className = 'fixed inset-0 z-0',
}) => {
  return (
    <div
      className={`pointer-events-none overflow-hidden ${className} ${
        subtle ? 'opacity-45' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      {/* Moving Pixel Clouds */}
      <div className="absolute top-16 left-0 right-0 h-24">
        <div className="animate-cloud-slow absolute top-0">
          <PixelCloud className="w-28 h-14 opacity-80" />
        </div>
        <div className="animate-cloud-mid absolute top-8">
          <PixelCloud className="w-20 h-10 opacity-70" />
        </div>
      </div>

      {/* Flying Pixel Birds with flapping wings */}
      <div className="absolute top-24 left-0 right-0 h-28">
        <div className="animate-bird-slow absolute top-1">
          <PixelBird className="w-9 h-6 animate-wing-flap" />
        </div>
        <div className="animate-bird-fast absolute top-10">
          <PixelBird className="w-7 h-5 animate-wing-flap opacity-90" />
        </div>
      </div>

      {/* Walking Pixel Villagers along the bottom grassy edge */}
      {showWalkers && (
        <div className="absolute bottom-2 left-0 right-0 h-12">
          <div className="animate-walker-right absolute bottom-0">
            <PixelWalker shirtColor="#0F766E" hatColor="#1E293B" className="w-8 h-11" />
          </div>
          <div className="animate-walker-left absolute bottom-0">
            <PixelWalker shirtColor="#B91C1C" hatColor="#DC2626" className="w-8 h-11" />
          </div>
        </div>
      )}
    </div>
  );
};
