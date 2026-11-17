import React from 'react';

/**
 * High-precision SVG Flag of the State of Qatar
 * Official Maroon (#8A1538) with 9 white serrated points.
 */
export function QatarFlag({ className = 'h-3 w-[18px]' }) {
  return (
    <svg
      viewBox="0 0 28 18"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <title>State of Qatar · دولة قطر</title>
      <rect width="28" height="18" fill="#8A1538" />
      <path
        d="M0,0 L8.5,0 L11.5,1 L8.5,2 L11.5,3 L8.5,4 L11.5,5 L8.5,6 L11.5,7 L8.5,8 L11.5,9 L8.5,10 L11.5,11 L8.5,12 L11.5,13 L8.5,14 L11.5,15 L8.5,16 L11.5,17 L8.5,18 L0,18 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/**
 * High-precision SVG Flag of the United Kingdom / English (BGS Law spec)
 */
export function UkFlag({ className = 'h-3 w-[18px]' }) {
  return (
    <svg
      viewBox="0 0 60 30"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <title>English · المملكة المتحدة</title>
      <clipPath id="uk-flag-clip">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <g clipPath="url(#uk-flag-clip)">
        <path fill="#012169" d="M0,0 v30 h60 v-30 z" />
        <path stroke="#FFFFFF" strokeWidth="6" d="M0,0 L60,30 M60,0 L0,30" />
        <clipPath id="uk-flag-diag">
          <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
        </clipPath>
        <path stroke="#C8102E" strokeWidth="4" clipPath="url(#uk-flag-diag)" d="M0,0 L60,30 M60,0 L0,30" />
        <path stroke="#FFFFFF" strokeWidth="10" d="M30,0 v30 M0,15 h60" />
        <path stroke="#C8102E" strokeWidth="6" d="M30,0 v30 M0,15 h60" />
      </g>
    </svg>
  );
}

/**
 * Universal FlagIcon component
 */
export default function FlagIcon({
  locale = 'qa',
  className = 'h-3 w-[18px] shrink-0 overflow-hidden rounded-[1px] ring-1 ring-current/25 shadow-xs',
}) {
  const norm = String(locale).toLowerCase();
  if (norm === 'qa' || norm === 'ar' || norm === 'qatar') {
    return <QatarFlag className={className} />;
  }
  return <UkFlag className={className} />;
}

