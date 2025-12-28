'use client';

import React from 'react';

interface AdSlotProps {
  type: 'sidebar' | 'native' | 'banner';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ type, className = '' }) => {
  const getAdSize = () => {
    switch (type) {
      case 'sidebar':
        return { width: '300px', height: '600px' };
      case 'native':
        return { width: '100%', height: '250px' };
      case 'banner':
        return { width: '728px', height: '90px' };
      default:
        return { width: '300px', height: '250px' };
    }
  };

  const size = getAdSize();

  return (
    <div
      className={`bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center ${className}`}
      style={{ width: size.width, height: size.height }}
    >
      <div className="text-center text-gray-400">
        <p className="text-sm font-medium">Advertisement</p>
        <p className="text-xs mt-1">{size.width} × {size.height}</p>
      </div>
    </div>
  );
};
