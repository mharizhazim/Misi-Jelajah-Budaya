import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export const KupangCoinIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg
    viewBox="0 0 16 16"
    className={`pixelated shrink-0 ${className}`}
    aria-hidden="true"
    shapeRendering="crispEdges"
  >
    {/* Outer dark border */}
    <rect x="5" y="1" width="6" height="1" fill="#2B1D14" />
    <rect x="3" y="2" width="2" height="1" fill="#2B1D14" />
    <rect x="11" y="2" width="2" height="1" fill="#2B1D14" />
    <rect x="2" y="3" width="1" height="2" fill="#2B1D14" />
    <rect x="13" y="3" width="1" height="2" fill="#2B1D14" />
    <rect x="1" y="5" width="1" height="6" fill="#2B1D14" />
    <rect x="14" y="5" width="1" height="6" fill="#2B1D14" />
    <rect x="2" y="11" width="1" height="2" fill="#2B1D14" />
    <rect x="13" y="11" width="1" height="2" fill="#2B1D14" />
    <rect x="3" y="13" width="2" height="1" fill="#2B1D14" />
    <rect x="11" y="13" width="2" height="1" fill="#2B1D14" />
    <rect x="5" y="14" width="6" height="1" fill="#2B1D14" />
    {/* Gold coin body */}
    <rect x="5" y="2" width="6" height="12" fill="#FACC15" />
    <rect x="3" y="3" width="10" height="10" fill="#FACC15" />
    <rect x="2" y="5" width="12" height="6" fill="#FACC15" />
    {/* Highlight rim */}
    <rect x="5" y="2" width="6" height="1" fill="#FEF08A" />
    <rect x="3" y="3" width="2" height="2" fill="#FEF08A" />
    <rect x="2" y="5" width="1" height="4" fill="#FEF08A" />
    {/* Shadow rim */}
    <rect x="5" y="13" width="6" height="1" fill="#CA8A04" />
    <rect x="11" y="11" width="2" height="2" fill="#CA8A04" />
    <rect x="13" y="7" width="1" height="4" fill="#CA8A04" />
    {/* Traditional Bunga / Star inner motif */}
    <rect x="7" y="4" width="2" height="8" fill="#B45309" />
    <rect x="4" y="7" width="8" height="2" fill="#B45309" />
    <rect x="7" y="7" width="2" height="2" fill="#FEF08A" />
  </svg>
);

export const WiraBudayaBadge: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg
    viewBox="0 0 24 24"
    className={`pixelated shrink-0 ${className}`}
    aria-label="Lencana Wira Budaya"
    shapeRendering="crispEdges"
  >
    {/* Ribbon top */}
    <rect x="6" y="1" width="4" height="6" fill="#B91C1C" />
    <rect x="14" y="1" width="4" height="6" fill="#B91C1C" />
    <rect x="10" y="1" width="4" height="6" fill="#FACC15" />
    {/* Outer medal ring */}
    <rect x="7" y="6" width="10" height="1" fill="#2B1D14" />
    <rect x="5" y="7" width="14" height="12" fill="#FACC15" />
    <rect x="4" y="9" width="16" height="8" fill="#FACC15" />
    <rect x="7" y="19" width="10" height="1" fill="#2B1D14" />
    {/* Inner gold ring */}
    <rect x="7" y="8" width="10" height="10" fill="#D97706" />
    <rect x="8" y="9" width="8" height="8" fill="#FEF08A" />
    {/* Bunga Raya / Keris star emblem */}
    <rect x="11" y="10" width="2" height="6" fill="#B91C1C" />
    <rect x="9" y="12" width="6" height="2" fill="#B91C1C" />
    <rect x="11" y="12" width="2" height="2" fill="#FACC15" />
  </svg>
);

export const PixelBird: React.FC<{ className?: string }> = ({ className = 'w-8 h-6' }) => (
  <svg viewBox="0 0 12 8" className={`pixelated ${className}`} aria-hidden="true" shapeRendering="crispEdges">
    <rect x="1" y="2" width="2" height="1" fill="#1E293B" />
    <rect x="3" y="3" width="2" height="1" fill="#1E293B" />
    <rect x="5" y="4" width="2" height="2" fill="#0F172A" />
    <rect x="7" y="3" width="2" height="1" fill="#1E293B" />
    <rect x="9" y="2" width="2" height="1" fill="#1E293B" />
  </svg>
);

export const PixelHibiscus: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 16 16" className={`pixelated shrink-0 ${className}`} aria-hidden="true" shapeRendering="crispEdges">
    <rect x="6" y="2" width="4" height="3" fill="#DC2626" />
    <rect x="2" y="5" width="4" height="4" fill="#EF4444" />
    <rect x="10" y="5" width="4" height="4" fill="#EF4444" />
    <rect x="4" y="10" width="3" height="4" fill="#B91C1C" />
    <rect x="9" y="10" width="3" height="4" fill="#B91C1C" />
    <rect x="6" y="6" width="4" height="4" fill="#FACC15" />
    <rect x="7" y="4" width="2" height="3" fill="#FEF08A" />
  </svg>
);

interface PixelImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export const PixelImage: React.FC<PixelImageProps> = ({
  src,
  alt,
  className = '',
  fallbackLabel = 'Ilustrasi Warisan',
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-amber-100 via-emerald-100 to-amber-200 text-amber-950 p-4 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Sparkles className="w-8 h-8 mb-2 text-amber-700" />
        <span className="font-pixel text-xs">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`pixelated ${className}`}
    />
  );
};
