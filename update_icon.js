const fs = require("fs");
const path = "d:\\L-M-S\\src\\components\\Icons\\Icons.jsx";

const newIconCode = `export const TrashIcon = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="trashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#b91c1c', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="trashLidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ff6b6b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
      </linearGradient>
      <filter id="trashShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="rgba(185, 28, 28, 0.25)"/>
      </filter>
    </defs>
    <path d="M6 7L7.5 19.5C7.6 20.3 8.3 21 9.1 21H14.9C15.7 21 16.4 20.3 16.5 19.5L18 7H6Z" fill="url(#trashGrad)" filter="url(#trashShadow)"/>
    <rect x="4" y="4" width="16" height="3" rx="1.5" fill="url(#trashLidGrad)" filter="url(#trashShadow)"/>
    <path d="M9.5 4V2.5C9.5 1.7 10.2 1 11 1H13C13.8 1 14.5 1.7 14.5 2.5V4H9.5Z" fill="url(#trashLidGrad)"/>
    <path d="M9.5 10V18" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14.5 10V18" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)`;

try {
  let content = fs.readFileSync(path, "utf8");

  // Attempt to find the component.
  // We look for 'export const TrashIcon = '
  // And replace until 'export const MailIcon'

  let startIndex = content.indexOf("export const TrashIcon = ");
  if (startIndex === -1) {
    console.error("Error: TrashIcon not found");
    process.exit(1);
  }

  let endIndex = content.indexOf("export const MailIcon", startIndex);
  if (endIndex === -1) {
    console.error("Error: MailIcon not found");
    process.exit(1);
  }

  const preContent = content.substring(0, startIndex);
  const postContent = content.substring(endIndex);

  const updatedContent = preContent + newIconCode + "\n\n" + postContent;

  fs.writeFileSync(path, updatedContent, "utf8");
  console.log("Successfully updated TrashIcon");
} catch (err) {
  console.error("Error:", err);
  process.exit(1);
}
