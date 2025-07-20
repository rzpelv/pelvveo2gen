
import React from 'react';

type IconProps = {
  className?: string;
};

export const VeoLogo: React.FC<IconProps> = ({ className }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#grad1)"/>
    <path d="M2 17L12 22L22 17L12 12L2 17Z" fill="url(#grad2)"/>
    <path d="M2 7L12 12V22L2 17V7Z" fill="url(#grad3)"/>
    <path d="M22 7L12 12V22L22 17V7Z" fill="url(#grad4)"/>
    <defs>
      <linearGradient id="grad1" x1="12" y1="2" x2="12" y2="12" gradientUnits="userSpaceOnUse">
        <stop stopColor="#a78bfa"/>
        <stop offset="1" stopColor="#818cf8"/>
      </linearGradient>
      <linearGradient id="grad2" x1="12" y1="12" x2="12" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#818cf8"/>
        <stop offset="1" stopColor="#6366f1"/>
      </linearGradient>
      <linearGradient id="grad3" x1="2" y1="14.5" x2="12" y2="14.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#a78bfa" stopOpacity="0.8"/>
        <stop offset="1" stopColor="#818cf8" stopOpacity="0.8"/>
      </linearGradient>
      <linearGradient id="grad4" x1="12" y1="14.5" x2="22" y2="14.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#818cf8" stopOpacity="0.8"/>
        <stop offset="1" stopColor="#6366f1" stopOpacity="0.8"/>
      </linearGradient>
    </defs>
  </svg>
);

export const MagicWandIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M6 21l15 -15l-3 -3l-15 15l3 3" />
    <path d="M15 6l3 3" />
    <path d="M9 12l3 3" />
  </svg>
);

export const VideoIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m22 8-6 4 6 4V8Z" />
    <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
  </svg>
);


export const PlayIcon: React.FC<IconProps> = ({ className }) => (
    <svg 
        className={className} 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M8 5.14v14l11-7-11-7z"/>
    </svg>
);
