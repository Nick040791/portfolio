import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * LaunchCode official Rocket over Underscore mark
 */
export const LaunchCodeLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="LaunchCode Logo"
  >
    <rect width="64" height="64" rx="14" fill="#09131F" stroke="#0284C7" strokeWidth="1.5" />
    
    {/* Rocket Fuselage */}
    <path
      d="M32 9C27.5 15.5 24.5 25 24.5 35.5C24.5 36.5 25 37.5 26 37.5H38C39 37.5 39.5 36.5 39.5 35.5C39.5 25 36.5 15.5 32 9Z"
      stroke="#38BDF8"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#0C1E34"
    />

    {/* Cockpit Porthole Window */}
    <circle
      cx="32"
      cy="21.5"
      r="3.5"
      stroke="#38BDF8"
      strokeWidth="2.2"
      fill="#09131F"
    />

    {/* Left Swept Booster Fin */}
    <path
      d="M24.5 28.5L16.5 35.5C15.8 36.1 15.8 37.2 16.5 37.8L19.5 40.8C20.1 41.4 21.2 41.4 21.8 40.8L24.5 37.5"
      stroke="#38BDF8"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#0C1E34"
    />

    {/* Right Swept Booster Fin */}
    <path
      d="M39.5 28.5L47.5 35.5C48.2 36.1 48.2 37.2 47.5 37.8L44.5 40.8C43.9 41.4 42.8 41.4 42.2 40.8L39.5 37.5"
      stroke="#38BDF8"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#0C1E34"
    />

    {/* Rocket Exhaust Flame */}
    <path
      d="M28 37.5L32 46L36 37.5"
      stroke="#38BDF8"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M32 37.5L32 46"
      stroke="#38BDF8"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Horizontal Underscore Bar */}
    <rect
      x="14"
      y="51"
      width="36"
      height="4.5"
      rx="2.25"
      fill="#38BDF8"
    />
  </svg>
);

/**
 * freeCodeCamp official flame symbol
 */
export const FreeCodeCampLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="freeCodeCamp Logo"
  >
    <rect width="64" height="64" rx="14" fill="#0A0A23" stroke="#D97706" strokeWidth="2" />
    <path
      d="M32 10C32 10 24 22 24 30C24 35.5 27.5 40 32 40C32 40 30 35 32 32C34 29 37 27 37 23C41 27 43 32 43 36C43 43.5 37 49 31 49C22 49 17 41 17 32C17 21 27 12 32 10Z"
      fill="#F59E0B"
    />
    <path
      d="M33 26C33 26 29 32 29 37C29 40 31 43 34 43C37 43 39 40 39 37C39 33 36 29 33 26Z"
      fill="#FDE68A"
    />
  </svg>
);

/**
 * Microsoft official 4-quadrant logo
 */
export const MicrosoftLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Microsoft Logo"
  >
    <rect width="64" height="64" rx="14" fill="#15171E" stroke="#334155" strokeWidth="1.5" />
    {/* Red Square */}
    <rect x="15" y="15" width="15" height="15" rx="1.5" fill="#F25022" />
    {/* Green Square */}
    <rect x="34" y="15" width="15" height="15" rx="1.5" fill="#7FBA00" />
    {/* Blue Square */}
    <rect x="15" y="34" width="15" height="15" rx="1.5" fill="#00A4EF" />
    {/* Yellow Square */}
    <rect x="34" y="34" width="15" height="15" rx="1.5" fill="#FFB900" />
  </svg>
);

/**
 * Google official 4-color 'G' logo
 */
export const GoogleLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Google Logo"
  >
    <rect width="64" height="64" rx="14" fill="#181A20" stroke="#334155" strokeWidth="1.5" />
    <g transform="translate(14, 14)">
      {/* Blue segment */}
      <path
        d="M34.5 18.4C34.5 17.1 34.4 15.9 34.1 14.7H18V21.7H27.3C26.9 23.9 25.6 25.7 23.6 27V31.4H29.6C33.1 28.2 34.5 23.8 34.5 18.4Z"
        fill="#4285F4"
      />
      {/* Green segment */}
      <path
        d="M18 35.5C22.8 35.5 26.8 33.9 29.6 31.4L23.6 27C22 28.1 19.9 28.8 18 28.8C13.3 28.8 9.3 25.6 7.9 21.3H1.7V25.9C4.6 31.6 10.8 35.5 18 35.5Z"
        fill="#34A853"
      />
      {/* Yellow segment */}
      <path
        d="M7.9 21.3C7.5 20.1 7.3 18.8 7.3 17.5C7.3 16.2 7.5 14.9 7.9 13.7V9.1H1.7C0.6 11.3 0 13.8 0 17.5C0 21.2 0.6 23.7 1.7 25.9L7.9 21.3Z"
        fill="#FBBC05"
      />
      {/* Red segment */}
      <path
        d="M18 6.2C20.6 6.2 22.9 7.1 24.8 8.9L30 3.7C26.8 0.7 22.8 0 18 0C10.8 0 4.6 3.9 1.7 9.6L7.9 14.2C9.3 9.4 13.3 6.2 18 6.2Z"
        fill="#EA4335"
      />
    </g>
  </svg>
);

/**
 * Python official dual-snake symbol
 */
export const PythonLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Python Logo"
  >
    <rect width="64" height="64" rx="14" fill="#0E1726" stroke="#2563EB" strokeWidth="1.5" />
    <g transform="translate(15, 13)">
      {/* Blue Snake Top */}
      <path
        d="M16.9 0C8.1 0 8.6 3.8 8.6 3.8L8.7 7.7H17.2V8.9H5.7C5.7 8.9 0 8.3 0 17.2C0 26.1 5 25.7 5 25.7H8V21.6C8 21.6 7.8 16.5 13 16.5H21.5C21.5 16.5 25.6 16.6 25.6 12.6V4.1C25.6 4.1 26.1 0 16.9 0ZM12.2 2.6C13.1 2.6 13.8 3.3 13.8 4.2C13.8 5.1 13.1 5.8 12.2 5.8C11.3 5.8 10.6 5.1 10.6 4.2C10.6 3.3 11.3 2.6 12.2 2.6Z"
        fill="#387EB8"
      />
      {/* Yellow Snake Bottom */}
      <path
        d="M17.1 34C25.9 34 25.4 30.2 25.4 30.2L25.3 26.3H16.8V25.1H28.3C28.3 25.1 34 25.7 34 16.8C34 7.9 29 8.3 29 8.3H26V12.4C26 12.4 26.2 17.5 21 17.5H12.5C12.5 17.5 8.4 17.4 8.4 21.4V29.9C8.4 29.9 7.9 34 17.1 34ZM21.8 31.4C20.9 31.4 20.2 30.7 20.2 29.8C20.2 28.9 20.9 28.2 21.8 28.2C22.7 28.2 23.4 28.9 23.4 29.8C23.4 30.7 22.7 31.4 21.8 31.4Z"
        fill="#FFE052"
      />
    </g>
  </svg>
);

/**
 * Vanderbilt University official Gold 'V' logo
 */
export const VanderbiltLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Vanderbilt University Logo"
  >
    <rect width="64" height="64" rx="14" fill="#121316" stroke="#D4AF37" strokeWidth="2" />
    {/* Vanderbilt V */}
    <path
      d="M17 17H25.5L32 36L38.5 17H47L36 47H28L17 17Z"
      fill="#D4AF37"
    />
    <path
      d="M23 19H27L32 34L37 19H41L34.5 44H29.5L23 19Z"
      fill="#F5E087"
    />
  </svg>
);

/**
 * Coursera official geometric C logo
 */
export const CourseraLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Coursera Logo"
  >
    <rect width="64" height="64" rx="14" fill="#0A142F" stroke="#0056D2" strokeWidth="2" />
    <path
      d="M32 15C22.6 15 15 22.6 15 32C15 41.4 22.6 49 32 49C38.8 49 44.7 45 47.3 39.2L39.8 36.5C38.4 39.8 35.4 42 32 42C26.5 42 22 37.5 22 32C22 26.5 26.5 22 32 22C35.4 22 38.4 24.2 39.8 27.5L47.3 24.8C44.7 19 38.8 15 32 15Z"
      fill="#0056D2"
    />
  </svg>
);

/**
 * Hire-Human official 4-pointed coral star emblem with diamond center cutout
 */
export const HireHumanLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Hire-Human Logo"
  >
    <rect width="64" height="64" rx="14" fill="#1C110F" stroke="#EA580C" strokeWidth="1.5" />
    
    {/* Coral 4-pointed rounded cross with concave diamond star center cutout */}
    <path
      d="M32 10C34.5 10 36.5 11.2 36.5 13.5L36.5 19.5C36.5 24 40 27.5 44.5 27.5L50.5 27.5C52.8 27.5 54 29.5 54 32C54 34.5 52.8 36.5 50.5 36.5L44.5 36.5C40 36.5 36.5 40 36.5 44.5L36.5 50.5C36.5 52.8 34.5 54 32 54C29.5 54 27.5 52.8 27.5 50.5L27.5 44.5C27.5 40 24 36.5 19.5 36.5L13.5 36.5C11.2 36.5 10 34.5 10 32C10 29.5 11.2 27.5 13.5 27.5L19.5 27.5C24 27.5 27.5 24 27.5 19.5L27.5 13.5C27.5 11.2 29.5 10 32 10Z M32 25C32 28.8 35.2 32 39 32C35.2 32 32 35.2 32 39C32 35.2 28.8 32 25 32C28.8 32 32 28.8 32 25Z"
      fill="#FF6740"
      fillRule="evenodd"
    />
  </svg>
);

/**
 * MDHEWD (Missouri Dept of Higher Education & Workforce Development) Emblem
 */
export const MDHEWDLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="MDHEWD Logo"
  >
    <rect width="64" height="64" rx="14" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
    {/* Missouri Gateway Arch Motif */}
    <path
      d="M17 48C17 26 23.5 16 32 16C40.5 16 47 26 47 48"
      stroke="#38BDF8"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <path
      d="M23 48C23 31 27 22 32 22C37 22 41 31 41 48"
      stroke="#7DD3FC"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="32" cy="30" r="3" fill="#BAE6FD" />
  </svg>
);

export type LogoId =
  | 'launchcode'
  | 'freecodecamp'
  | 'microsoft'
  | 'google'
  | 'python'
  | 'vanderbilt'
  | 'coursera'
  | 'hirehuman'
  | 'mdhewd';

export const getCredentialLogo = (logoId?: LogoId | string, className?: string) => {
  switch (logoId) {
    case 'launchcode':
      return <LaunchCodeLogo className={className} />;
    case 'freecodecamp':
      return <FreeCodeCampLogo className={className} />;
    case 'microsoft':
      return <MicrosoftLogo className={className} />;
    case 'google':
      return <GoogleLogo className={className} />;
    case 'python':
      return <PythonLogo className={className} />;
    case 'vanderbilt':
      return <VanderbiltLogo className={className} />;
    case 'coursera':
      return <CourseraLogo className={className} />;
    case 'hirehuman':
      return <HireHumanLogo className={className} />;
    case 'mdhewd':
      return <MDHEWDLogo className={className} />;
    default:
      return <LaunchCodeLogo className={className} />;
  }
};
