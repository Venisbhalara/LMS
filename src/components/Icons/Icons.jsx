// Premium 3D SVG Icons Component Library - Creative, Classy & Professional
// Enhanced with gradients, shadows, and depth effects for a 3D appearance

export const SearchIcon = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="searchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 0.8 }} />
        <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0.4 }} />
      </linearGradient>
      <filter id="searchShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.2)"/>
      </filter>
    </defs>
    <circle cx="9" cy="9" r="6" fill="url(#searchGrad)" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" filter="url(#searchShadow)"/>
    <path d="M15 15L12.5 12.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" filter="url(#searchShadow)"/>
  </svg>
)

export const UserIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="userGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 0.9 }} />
        <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0.5 }} />
      </linearGradient>
      <filter id="userShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.2)"/>
      </filter>
    </defs>
    <circle cx="12" cy="8" r="4" fill="url(#userGrad)" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" filter="url(#userShadow)"/>
    <path d="M6 21C6 17.6863 8.68629 15 12 15C15.3137 15 18 17.6863 18 21" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" filter="url(#userShadow)"/>
  </svg>
)

export const BookIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="bookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 0.9 }} />
        <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0.6 }} />
      </linearGradient>
      <filter id="bookShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.2)"/>
      </filter>
    </defs>
    <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="url(#bookGrad)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" filter="url(#bookShadow)"/>
    <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" fill="url(#bookGrad)" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" filter="url(#bookShadow)"/>
    <path d="M9 7H15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" filter="url(#bookShadow)"/>
    <path d="M9 11H15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" filter="url(#bookShadow)"/>
  </svg>
)

export const GraduationIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="graduationGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 0.9 }} />
        <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0.5 }} />
      </linearGradient>
      <filter id="graduationShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.2)"/>
      </filter>
    </defs>
    <path d="M22 10L12 5L2 10L12 15L22 10Z" fill="url(#graduationGrad)" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" filter="url(#graduationShadow)"/>
    <path d="M2 10V19C2 19.5304 2.21071 20.0391 2.58579 20.4142C2.96086 20.7893 3.46957 21 4 21H20C20.5304 21 21.0391 20.7893 21.4142 20.4142C21.7893 20.0391 22 19.5304 22 19V10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" filter="url(#graduationShadow)"/>
    <path d="M6 21V12.5L12 15.5L18 12.5V21" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" filter="url(#graduationShadow)"/>
  </svg>
)

export const AwardIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="awardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 0.9 }} />
        <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0.5 }} />
      </linearGradient>
      <filter id="awardShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.2)"/>
      </filter>
    </defs>
    <circle cx="12" cy="8" r="6" fill="url(#awardGrad)" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" filter="url(#awardShadow)"/>
    <path d="M8.5 14L7 21L12 18.5L17 21L15.5 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" filter="url(#awardShadow)"/>
    <circle cx="12" cy="8" r="2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" filter="url(#awardShadow)"/>
  </svg>
)

export const BriefcaseIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="briefcaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 0.9 }} />
        <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0.5 }} />
      </linearGradient>
      <filter id="briefcaseShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.2)"/>
      </filter>
    </defs>
    <rect x="3" y="7" width="18" height="14" rx="2" fill="url(#briefcaseGrad)" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" filter="url(#briefcaseShadow)"/>
    <path d="M8 7V5C8 4.46957 8.21071 3.96086 8.58579 3.58579C8.96086 3.21071 9.46957 3 10 3H14C14.5304 3 15.0391 3.21071 15.4142 3.58579C15.7893 3.96086 16 4.46957 16 5V7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" filter="url(#briefcaseShadow)"/>
    <path d="M3 11H21" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" filter="url(#briefcaseShadow)"/>
    <path d="M9 15H15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" filter="url(#briefcaseShadow)"/>
  </svg>
)

export const CheckIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <filter id="checkShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.2)"/>
      </filter>
    </defs>
    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#checkShadow)"/>
  </svg>
)

export const ClockIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="clockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 0.9 }} />
        <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0.5 }} />
      </linearGradient>
      <filter id="clockShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.2)"/>
      </filter>
    </defs>
    <circle cx="12" cy="12" r="10" fill="url(#clockGrad)" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" filter="url(#clockShadow)"/>
    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" filter="url(#clockShadow)"/>
  </svg>
)

export const ChevronDownIcon = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <filter id="chevronShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.2)"/>
      </filter>
    </defs>
    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter="url(#chevronShadow)"/>
  </svg>
)

export const MenuIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <filter id="menuShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.2)"/>
      </filter>
    </defs>
    <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" filter="url(#menuShadow)"/>
    <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" filter="url(#menuShadow)"/>
    <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" filter="url(#menuShadow)"/>
  </svg>
)

export const LogOutIcon = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <filter id="logoutShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.2)"/>
      </filter>
    </defs>
    <path d="M7 17L12 12M12 12L7 7M12 12H2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" filter="url(#logoutShadow)"/>
    <path d="M2 4H10C11.1046 4 12 4.89543 12 6V18C12 19.1046 11.1046 20 10 20H2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" filter="url(#logoutShadow)"/>
  </svg>
)

export const SettingsIcon = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="settingsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 0.9 }} />
        <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0.5 }} />
      </linearGradient>
      <filter id="settingsShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.2)"/>
      </filter>
    </defs>
    <circle cx="10" cy="10" r="2.5" fill="url(#settingsGrad)" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" filter="url(#settingsShadow)"/>
    <path d="M16.6362 9.63624C16.6447 9.82956 16.6447 10.0241 16.6362 10.2174C16.5682 10.9395 16.2983 11.6316 15.8595 12.2062C15.4207 12.7808 14.8307 13.2148 14.1618 13.4559C13.493 13.6971 12.7714 13.7353 12.0821 13.5662L10.9821 15.3662C10.8652 15.5507 10.7079 15.7079 10.5234 15.8248C10.3388 15.9417 10.132 16.0152 9.91809 16.04C9.70419 16.0648 9.48877 16.0403 9.28768 15.9684C9.08659 15.8964 8.90532 15.779 8.75709 15.6256L6.91459 13.7831C6.76118 13.6349 6.64378 13.4536 6.57184 13.2525C6.4999 13.0514 6.47537 12.836 6.50019 12.6221C6.52501 12.4082 6.59848 12.2014 6.71537 12.0158C6.83227 11.8303 6.98952 11.671 7.17409 11.5521L8.97409 10.4521C8.80495 9.76281 8.84319 9.04117 9.08434 8.37234C9.3255 7.7035 9.75951 7.11347 10.3341 6.67468C10.9087 6.23588 11.6008 5.96595 12.3229 5.89796C12.5162 5.88946 12.7108 5.88946 12.9041 5.89796" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#settingsShadow)"/>
  </svg>
)

export const PlayIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <filter id="playShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.2)"/>
      </filter>
    </defs>
    <path d="M8 5V19L19 12L8 5Z" fill="currentColor" filter="url(#playShadow)"/>
  </svg>
)

export const UsersIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="usersGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 0.9 }} />
        <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0.5 }} />
      </linearGradient>
      <filter id="usersShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.2)"/>
      </filter>
    </defs>
    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" filter="url(#usersShadow)"/>
    <circle cx="9" cy="7" r="4" fill="url(#usersGrad)" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" filter="url(#usersShadow)"/>
    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" filter="url(#usersShadow)"/>
    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" filter="url(#usersShadow)"/>
  </svg>
)

export const StarIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <filter id="starShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.2)"/>
      </filter>
    </defs>
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#starShadow)"/>
  </svg>
)

export const CertificateIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="certificateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 0.9 }} />
        <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0.5 }} />
      </linearGradient>
      <filter id="certificateShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.2)"/>
      </filter>
    </defs>
    <path d="M15 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7L15 2Z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" filter="url(#certificateShadow)"/>
    <path d="M15 2V7H20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" filter="url(#certificateShadow)"/>
    <circle cx="9" cy="13" r="2" fill="url(#certificateGrad)" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" filter="url(#certificateShadow)"/>
    <path d="M13 17H17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" filter="url(#certificateShadow)"/>
    <path d="M13 15H17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" filter="url(#certificateShadow)"/>
  </svg>
)

export const BuildingIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="buildingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 0.9 }} />
        <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0.5 }} />
      </linearGradient>
      <filter id="buildingShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.2)"/>
      </filter>
    </defs>
    <rect x="4" y="2" width="16" height="20" rx="2" fill="url(#buildingGrad)" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" filter="url(#buildingShadow)"/>
    <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" filter="url(#buildingShadow)"/>
    <path d="M9 6H15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" filter="url(#buildingShadow)"/>
    <path d="M9 10H15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" filter="url(#buildingShadow)"/>
    <path d="M9 14H15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" filter="url(#buildingShadow)"/>
  </svg>
)

export const ArrowRightIcon = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <filter id="arrowShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.2)"/>
      </filter>
    </defs>
    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter="url(#arrowShadow)"/>
  </svg>
)

export const MailIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 7L12 13L21 7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
