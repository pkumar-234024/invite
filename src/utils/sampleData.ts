import type { Ceremony, CoupleDetails, InvitationMessage, WeddingProject } from '../types/wedding';

// High-fidelity vector SVG artwork representations for couple photos so users have stunning visual avatars instantly
export const SAMPLE_BRIDE_PHOTO = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" width="600" height="750">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4a0e17" />
      <stop offset="50%" stop-color="#800020" />
      <stop offset="100%" stop-color="#30000a" />
    </linearGradient>
    <radialGradient id="goldGlow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#ffe8a3" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#800020" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffe494" />
      <stop offset="50%" stop-color="#d4af37" />
      <stop offset="100%" stop-color="#997a15" />
    </linearGradient>
    <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#faebd7" />
      <stop offset="100%" stop-color="#e8c39e" />
    </linearGradient>
    <linearGradient id="dressGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#c41e3a" />
      <stop offset="50%" stop-color="#960018" />
      <stop offset="100%" stop-color="#660000" />
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="600" height="750" fill="url(#bgGrad)" />
  <circle cx="300" cy="300" r="280" fill="url(#goldGlow)" />
  
  <!-- Decorative Floral Arch -->
  <path d="M 50,700 Q 50,100 300,100 Q 550,100 550,700" fill="none" stroke="url(#goldGrad)" stroke-width="4" stroke-dasharray="10,8" />
  <circle cx="300" cy="98" r="8" fill="url(#goldGrad)" />
  
  <!-- Shoulders & Royal Red Lehenga Dupatta -->
  <path d="M 160,540 C 200,490 240,480 300,480 C 360,480 400,490 440,540 L 480,750 L 120,750 Z" fill="url(#dressGrad)" />
  <!-- Dupatta Gold Zari Embroidery -->
  <path d="M 170,550 C 220,510 270,500 300,500 C 330,500 380,510 430,550" fill="none" stroke="url(#goldGrad)" stroke-width="6" />
  <path d="M 180,580 C 230,540 270,530 300,530 C 330,530 370,540 420,580" fill="none" stroke="url(#goldGrad)" stroke-width="4" stroke-dasharray="8,6" />
  
  <!-- Neck -->
  <path d="M 270,390 L 270,470 L 330,470 L 330,390 Z" fill="url(#skinGrad)" />
  <!-- Kundan Choker Necklace -->
  <path d="M 260,440 Q 300,465 340,440" fill="none" stroke="url(#goldGrad)" stroke-width="12" stroke-linecap="round" />
  <circle cx="300" cy="460" r="7" fill="#c41e3a" stroke="url(#goldGrad)" stroke-width="2" />
  <circle cx="280" cy="454" r="5" fill="#305a30" stroke="url(#goldGrad)" stroke-width="2" />
  <circle cx="320" cy="454" r="5" fill="#305a30" stroke="url(#goldGrad)" stroke-width="2" />

  <!-- Face -->
  <ellipse cx="300" cy="310" rx="95" ry="115" fill="url(#skinGrad)" />
  
  <!-- Hair & Bridal Dupatta Head Cover -->
  <path d="M 195,290 C 190,190 240,150 300,150 C 360,150 410,190 405,290 C 400,230 365,185 300,185 C 235,185 200,230 195,290 Z" fill="#1a1110" />
  <path d="M 180,260 Q 300,120 420,260 Q 440,420 420,560 Q 300,500 180,560 Z" fill="none" stroke="url(#goldGrad)" stroke-width="5" />
  
  <!-- Eyes -->
  <path d="M 245,295 Q 265,280 285,295 Q 265,305 245,295 Z" fill="#ffffff" />
  <circle cx="265" cy="293" r="7" fill="#2c1d11" />
  <circle cx="267" cy="291" r="2.5" fill="#ffffff" />
  <!-- Eyeliner & Kohl -->
  <path d="M 240,295 Q 265,278 288,292" fill="none" stroke="#0f0f0f" stroke-width="2.5" stroke-linecap="round" />
  
  <path d="M 315,295 Q 335,280 355,295 Q 335,305 315,295 Z" fill="#ffffff" />
  <circle cx="335" cy="293" r="7" fill="#2c1d11" />
  <circle cx="337" cy="291" r="2.5" fill="#ffffff" />
  <path d="M 312,292 Q 335,278 360,295" fill="none" stroke="#0f0f0f" stroke-width="2.5" stroke-linecap="round" />
  
  <!-- Eyebrows -->
  <path d="M 242,278 Q 265,268 288,278" fill="none" stroke="#1f140e" stroke-width="3" stroke-linecap="round" />
  <path d="M 312,278 Q 335,268 358,278" fill="none" stroke="#1f140e" stroke-width="3" stroke-linecap="round" />
  
  <!-- Bindi & Maang Tikka -->
  <circle cx="300" cy="275" r="4.5" fill="#c41e3a" />
  <path d="M 300,170 L 300,240" stroke="url(#goldGrad)" stroke-width="2.5" />
  <ellipse cx="300" cy="242" rx="7" ry="9" fill="url(#goldGrad)" />
  <circle cx="300" cy="242" r="3.5" fill="#c41e3a" />
  
  <!-- Nose & Nath (Nose Ring) -->
  <path d="M 300,305 Q 303,330 297,335 Q 305,335 308,333" fill="none" stroke="#c99f7d" stroke-width="2.5" stroke-linecap="round" />
  <circle cx="282" cy="336" r="14" fill="none" stroke="url(#goldGrad)" stroke-width="2" />
  <path d="M 280,336 Q 220,330 205,360" fill="none" stroke="url(#goldGrad)" stroke-width="1.2" stroke-dasharray="3,2" />

  <!-- Lips -->
  <path d="M 278,368 Q 300,363 322,368 Q 300,385 278,368 Z" fill="#b3283f" />
  <path d="M 283,368 Q 300,373 317,368" fill="none" stroke="#800020" stroke-width="1.5" />

  <!-- Earrings (Jhumkas) -->
  <g transform="translate(192, 335)">
    <circle cx="0" cy="0" r="5" fill="url(#goldGrad)" />
    <path d="M -10,12 L 10,12 L 8,24 L -8,24 Z" fill="url(#goldGrad)" />
    <circle cx="0" cy="28" r="3" fill="#c41e3a" />
  </g>
  <g transform="translate(408, 335)">
    <circle cx="0" cy="0" r="5" fill="url(#goldGrad)" />
    <path d="M -10,12 L 10,12 L 8,24 L -8,24 Z" fill="url(#goldGrad)" />
    <circle cx="0" cy="28" r="3" fill="#c41e3a" />
  </g>
  
  <text x="300" y="720" font-family="'Cinzel', serif" font-size="24" fill="#ffd700" text-anchor="middle" letter-spacing="4">THE BRIDE</text>
</svg>
`)}`;

export const SAMPLE_GROOM_PHOTO = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" width="600" height="750">
  <defs>
    <linearGradient id="bgGradGroom" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#14213d" />
      <stop offset="50%" stop-color="#1f2c4c" />
      <stop offset="100%" stop-color="#0b1325" />
    </linearGradient>
    <radialGradient id="goldGlowGroom" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#ffe8a3" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#14213d" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="goldGradG" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffe494" />
      <stop offset="50%" stop-color="#d4af37" />
      <stop offset="100%" stop-color="#997a15" />
    </linearGradient>
    <linearGradient id="skinGradG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#faebd7" />
      <stop offset="100%" stop-color="#e0b890" />
    </linearGradient>
    <linearGradient id="turbanGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#9e1b32" />
      <stop offset="50%" stop-color="#c41e3a" />
      <stop offset="100%" stop-color="#730f22" />
    </linearGradient>
    <linearGradient id="sherwaniGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fff8f0" />
      <stop offset="60%" stop-color="#f5e6d3" />
      <stop offset="100%" stop-color="#dec5a5" />
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="600" height="750" fill="url(#bgGradGroom)" />
  <circle cx="300" cy="300" r="280" fill="url(#goldGlowGroom)" />
  
  <!-- Royal Arch -->
  <path d="M 50,700 Q 50,100 300,100 Q 550,100 550,700" fill="none" stroke="url(#goldGradG)" stroke-width="4" stroke-dasharray="10,8" />
  <circle cx="300" cy="98" r="8" fill="url(#goldGradG)" />

  <!-- Royal Sherwani Shoulders -->
  <path d="M 140,530 C 190,480 240,470 300,470 C 360,470 410,480 460,530 L 510,750 L 90,750 Z" fill="url(#sherwaniGrad)" />
  <!-- Sherwani Mandarin Collar & Gold Embroidery -->
  <path d="M 260,450 C 260,470 340,470 340,450" fill="none" stroke="url(#goldGradG)" stroke-width="8" />
  <line x1="300" y1="470" x2="300" y2="750" stroke="url(#goldGradG)" stroke-width="5" />
  <!-- Gold Buttons -->
  <circle cx="300" cy="510" r="5" fill="url(#goldGradG)" />
  <circle cx="300" cy="550" r="5" fill="url(#goldGradG)" />
  <circle cx="300" cy="590" r="5" fill="url(#goldGradG)" />
  <circle cx="300" cy="630" r="5" fill="url(#goldGradG)" />
  <!-- Royal Pearl Mala -->
  <path d="M 240,480 Q 300,560 360,480" fill="none" stroke="#fffdf5" stroke-width="8" stroke-dasharray="6,3" />
  <path d="M 230,500 Q 300,610 370,500" fill="none" stroke="#0f5257" stroke-width="7" stroke-dasharray="6,4" />
  <circle cx="300" cy="610" r="10" fill="url(#goldGradG)" stroke="#9e1b32" stroke-width="3" />

  <!-- Neck -->
  <path d="M 270,390 L 270,460 L 330,460 L 330,390 Z" fill="url(#skinGradG)" />

  <!-- Face -->
  <ellipse cx="300" cy="325" rx="95" ry="115" fill="url(#skinGradG)" />
  <!-- Well-groomed Beard & Mustache -->
  <path d="M 220,340 C 240,430 360,430 380,340 C 375,410 350,440 300,440 C 250,440 225,410 220,340 Z" fill="#1f1814" />
  <path d="M 265,368 Q 300,358 335,368 Q 300,378 265,368 Z" fill="#1f1814" />

  <!-- Eyes -->
  <path d="M 248,310 Q 268,295 288,310 Q 268,320 248,310 Z" fill="#ffffff" />
  <circle cx="268" cy="308" r="7" fill="#24160c" />
  <circle cx="270" cy="306" r="2.5" fill="#ffffff" />
  <path d="M 245,309 Q 268,293 290,307" fill="none" stroke="#1f1814" stroke-width="2.5" />

  <path d="M 312,310 Q 332,295 352,310 Q 332,320 312,310 Z" fill="#ffffff" />
  <circle cx="332" cy="308" r="7" fill="#24160c" />
  <circle cx="334" cy="306" r="2.5" fill="#ffffff" />
  <path d="M 310,307 Q 332,293 355,309" fill="none" stroke="#1f1814" stroke-width="2.5" />

  <!-- Eyebrows -->
  <path d="M 242,292 Q 268,280 292,292" fill="none" stroke="#140d09" stroke-width="4" stroke-linecap="round" />
  <path d="M 308,292 Q 332,280 358,292" fill="none" stroke="#140d09" stroke-width="4" stroke-linecap="round" />

  <!-- Nose -->
  <path d="M 300,305 L 297,345 L 305,345" fill="none" stroke="#b89370" stroke-width="2.5" stroke-linecap="round" />

  <!-- Lips -->
  <path d="M 280,380 Q 300,376 320,380 Q 300,392 280,380 Z" fill="#ab5d50" />

  <!-- Royal Turban (Pagri / Safa) -->
  <path d="M 180,260 C 170,170 240,140 300,135 C 380,130 430,170 420,260 C 400,220 360,205 300,205 C 240,205 200,220 180,260 Z" fill="url(#turbanGrad)" />
  <path d="M 175,230 Q 300,160 425,230" fill="none" stroke="url(#goldGradG)" stroke-width="8" />
  <path d="M 195,190 Q 300,130 405,190" fill="none" stroke="url(#goldGradG)" stroke-width="5" />
  <!-- Kalgi (Royal Feather Brooch on Turban) -->
  <path d="M 290,135 Q 260,60 300,30 Q 340,60 310,135 Z" fill="url(#goldGradG)" />
  <ellipse cx="300" cy="135" rx="14" ry="16" fill="url(#goldGradG)" />
  <circle cx="300" cy="135" r="7" fill="#9e1b32" />
  <circle cx="300" cy="135" r="3" fill="#ffe494" />

  <text x="300" y="720" font-family="'Cinzel', serif" font-size="24" fill="#ffd700" text-anchor="middle" letter-spacing="4">THE GROOM</text>
</svg>
`)}`;

export const SAMPLE_COUPLE_PHOTO = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="bgCouple" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3d0313" />
      <stop offset="50%" stop-color="#590d22" />
      <stop offset="100%" stop-color="#1b0007" />
    </linearGradient>
    <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffdda1" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#590d22" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="goldC" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffe494" />
      <stop offset="50%" stop-color="#d4af37" />
      <stop offset="100%" stop-color="#997a15" />
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bgCouple)" />
  <circle cx="400" cy="300" r="360" fill="url(#centerGlow)" />
  
  <!-- Royal Arch Mandap Outline -->
  <path d="M 80,580 Q 80,80 400,80 Q 720,80 720,580" fill="none" stroke="url(#goldC)" stroke-width="3" stroke-dasharray="12,8" />
  <circle cx="400" cy="78" r="8" fill="url(#goldC)" />
  
  <!-- Groom Silhouette / Stylized -->
  <g transform="translate(180, 100)">
    <!-- Turban & Kalgi -->
    <path d="M 70,80 Q 120,40 170,80 Q 150,110 70,110 Z" fill="#9e1b32" stroke="url(#goldC)" stroke-width="2" />
    <ellipse cx="120" cy="65" rx="8" ry="10" fill="url(#goldC)" />
    <!-- Face -->
    <ellipse cx="120" cy="140" rx="45" ry="55" fill="#f5d6ba" />
    <!-- Body Sherwani -->
    <path d="M 40,210 C 70,190 170,190 200,210 L 220,480 L 20,480 Z" fill="#fff9ed" />
    <path d="M 60,240 Q 120,300 180,240" fill="none" stroke="url(#goldC)" stroke-width="4" />
  </g>

  <!-- Bride Silhouette / Stylized -->
  <g transform="translate(380, 115)">
    <!-- Dupatta Veil -->
    <path d="M 60,90 Q 130,40 200,90 Q 220,260 200,450 Q 130,360 60,450 Z" fill="#7a0418" opacity="0.85" stroke="url(#goldC)" stroke-width="2" />
    <!-- Face -->
    <ellipse cx="130" cy="135" rx="42" ry="50" fill="#fbe3cf" />
    <circle cx="130" cy="120" r="3" fill="#c41e3a" />
    <!-- Body Lehenga -->
    <path d="M 60,200 C 90,185 170,185 200,200 L 240,470 L 20,470 Z" fill="#c41e3a" />
    <path d="M 70,230 Q 130,280 190,230" fill="none" stroke="url(#goldC)" stroke-width="5" />
    <circle cx="130" cy="245" r="5" fill="#d4af37" />
  </g>

  <!-- Varmala / Garland connecting couple -->
  <path d="M 270,330 Q 400,430 530,330" fill="none" stroke="#ff4d6d" stroke-width="12" stroke-dasharray="14,4" />
  <path d="M 270,330 Q 400,430 530,330" fill="none" stroke="#ffe066" stroke-width="4" stroke-dasharray="10,6" />

  <!-- Heart & Rings Icon -->
  <g transform="translate(370, 200)">
    <circle cx="15" cy="15" r="14" fill="none" stroke="url(#goldC)" stroke-width="3" />
    <circle cx="35" cy="15" r="14" fill="none" stroke="url(#goldC)" stroke-width="3" />
    <polygon points="35, -2 40, 5 30, 5" fill="#00e5ff" />
  </g>

  <!-- Sparkles -->
  <circle cx="150" cy="200" r="3" fill="#ffe494" />
  <circle cx="650" cy="180" r="4" fill="#ffe494" />
  <circle cx="200" cy="400" r="3" fill="#ffe494" />
  <circle cx="600" cy="420" r="3" fill="#ffe494" />

  <text x="400" y="550" font-family="'Great Vibes', cursive" font-size="44" fill="#ffd700" text-anchor="middle">Aarav &amp; Ananya</text>
</svg>
`)}`;

export const PREDEFINED_CEREMONIES: Omit<Ceremony, 'id'>[] = [
  {
    key: 'engagement',
    name: 'Engagement Ceremony',
    hindiName: 'सगाई समारोह',
    date: '2026-11-20',
    time: '06:00 PM',
    venueName: 'The Leela Palace Ballroom',
    venueAddress: 'Chanakyapuri, New Delhi',
    description: 'Ring exchange ceremony followed by cocktail dinner & musical night.',
  },
  {
    key: 'haldi',
    name: 'Haldi Ceremony',
    hindiName: 'हल्दी उत्सव',
    date: '2026-11-24',
    time: '10:30 AM',
    venueName: 'Sunken Courtyard, Royal Villa',
    venueAddress: 'Chhatarpur Farms, New Delhi',
    description: 'Yellow vibes, fragrant turmeric blessings, laughter, and pool party.',
  },
  {
    key: 'mehndi',
    name: 'Mehndi & Sangeet',
    hindiName: 'मेहंदी एवं संगीत संध्या',
    date: '2026-11-24',
    time: '06:30 PM',
    venueName: 'Grand Crystal Hall',
    venueAddress: 'Taj Palace, New Delhi',
    description: 'Henna magic, high-energy dance performances & festive Indian cuisine.',
  },
  {
    key: 'wedding',
    name: 'Shubh Vivah (Wedding)',
    hindiName: 'शुभ विवाह',
    date: '2026-11-25',
    time: '07:00 PM',
    venueName: 'The Grand Heritage Lawn',
    venueAddress: 'ITC Maurya, New Delhi',
    description: 'Baraat welcome at 7 PM, Jaimala at 8:30 PM, followed by Pheras & Royal Feast.',
  },
  {
    key: 'reception',
    name: 'Grand Reception',
    hindiName: 'आशीर्वाद समारोह',
    date: '2026-11-27',
    time: '07:30 PM',
    venueName: 'Royal Imperial Banquet',
    venueAddress: 'Connaught Place, New Delhi',
    description: 'An evening of celebration, live sufi band, and dinner with the newlyweds.',
  },
];

export const ALL_CEREMONY_PRESETS = [
  { key: 'roka', name: 'Roka Ceremony', hindiName: 'रोका' },
  { key: 'tilak', name: 'Tilak Ceremony', hindiName: 'तिलक' },
  { key: 'engagement', name: 'Engagement', hindiName: 'सगाई' },
  { key: 'haldi', name: 'Haldi Ceremony', hindiName: 'हल्दी' },
  { key: 'mehndi', name: 'Mehndi Ceremony', hindiName: 'मेहंदी' },
  { key: 'sangeet', name: 'Sangeet Night', hindiName: 'संगीत' },
  { key: 'baraat', name: 'Baraat Swagat', hindiName: 'बारात' },
  { key: 'jaimala', name: 'Jaimala Ceremony', hindiName: 'जयमाला' },
  { key: 'wedding', name: 'Shubh Vivah', hindiName: 'शुभ विवाह' },
  { key: 'vidaai', name: 'Vidaai', hindiName: 'विदाई' },
  { key: 'reception', name: 'Wedding Reception', hindiName: 'रिसेप्शन' },
];

export const INVITATION_MESSAGE_PRESETS: { [key: string]: InvitationMessage } = {
  hindi: {
    language: 'hindi',
    shlokaHeading: '॥ श्री गणेशाय नमः ॥',
    bodyText: `सप्रेम निवेदन है कि हमारे परिवार में शुभ विवाह का मंगल अवसर आया है।
हमें अत्यंत हर्ष हो रहा है कि आप इस पावन अवसर पर वर-वधू को अपना आशीर्वाद प्रदान करें।
आपकी गरिमामयी उपस्थिति हमारे लिए परम सौभाग्य की बात होगी।`,
    closingSalutation: 'सादर आमंत्रित:\nसमस्त शर्मा एवं पटेल परिवार',
    quote: 'मंगलम् भगवान विष्णुः, मंगलम् गरुड़ध्वजः। मंगलम् पुण्डरीकाक्षः, मंगलाय तनो हरिः॥',
  },
  english: {
    language: 'english',
    shlokaHeading: 'Together With Their Families',
    bodyText: `Cordially invite you to celebrate the joyous union of their beloved children as they embark on their journey of love, friendship, and togetherness.
Your gracious presence and heartfelt blessings will make this auspicious occasion truly unforgettable for both our families.`,
    closingSalutation: 'Warm Regards & Best Compliments:\nSharma & Patel Families',
    quote: 'Two souls with but a single thought, two hearts that beat as one.',
  },
  bilingual: {
    language: 'bilingual',
    shlokaHeading: '॥ श्री गणेशाय नमः ॥ With the Divine Blessings of God',
    bodyText: `सप्रेम निवेदन है कि हमारे परिवार में शुभ विवाह का मंगल अवसर आया है।
We warmly invite you and your family to join us in celebrating the holy wedding ceremony and bless the couple with love, joy, and prosperity.
आपकी उपस्थिति हमारे लिए सौभाग्य की बात होगी।`,
    closingSalutation: 'सादर आमंत्रित / Warmly Invited:\nSharma & Patel Families',
    quote: 'शुभं करोति कल्याणं आरोग्यं धनसंपदा ॥',
  },
};

export const DEFAULT_COUPLE: CoupleDetails = {
  brideName: 'Ananya Patel',
  brideHindiName: 'अनन्या पटेल',
  groomName: 'Aarav Sharma',
  groomHindiName: 'आरव शर्मा',
  brideNickname: 'Anu',
  groomNickname: 'Avi',
  brideFamily: 'Patel Family',
  groomFamily: 'Sharma Family',
  brideParents: 'Mr. Rajesh & Mrs. Sunita Patel',
  groomParents: 'Mr. Mahendra & Mrs. Rekha Sharma',
};

export const PHOTO_STYLE_PRESETS = [
  {
    id: 'regal-maroon',
    title: 'Royal Regal Maroon',
    hindiTitle: 'शाही मारूड़ी',
    bride: SAMPLE_BRIDE_PHOTO,
    groom: SAMPLE_GROOM_PHOTO,
    couple: SAMPLE_COUPLE_PHOTO,
    filter: 'royal-gold' as const,
    frameShape: 'royal-arch' as const,
  },
  {
    id: 'kundan-heritage',
    title: 'Kundan Heritage Gold',
    hindiTitle: 'कुंदन हेरिटेज',
    bride: SAMPLE_BRIDE_PHOTO,
    groom: SAMPLE_GROOM_PHOTO,
    couple: SAMPLE_COUPLE_PHOTO,
    filter: 'vintage-sepia' as const,
    frameShape: 'oval-kundan' as const,
  },
  {
    id: 'festive-vibrant',
    title: 'Festive Vivah Celebration',
    hindiTitle: 'उत्सव विवाह',
    bride: SAMPLE_BRIDE_PHOTO,
    groom: SAMPLE_GROOM_PHOTO,
    couple: SAMPLE_COUPLE_PHOTO,
    filter: 'festive-vibrant' as const,
    frameShape: 'floral-wreath' as const,
  },
  {
    id: 'romantic-pastel',
    title: 'Romantic Soft Dream',
    hindiTitle: 'गुलाबी प्रेम',
    bride: SAMPLE_BRIDE_PHOTO,
    groom: SAMPLE_GROOM_PHOTO,
    couple: SAMPLE_COUPLE_PHOTO,
    filter: 'romantic-soft' as const,
    frameShape: 'modern-card' as const,
  },
];

export const createDefaultProject = (id: string = 'proj_' + Date.now()): WeddingProject => {
  return {
    id,
    name: 'Aarav & Ananya Wedding Invitation',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    couple: { ...DEFAULT_COUPLE },
    ceremonies: PREDEFINED_CEREMONIES.map((c, i) => ({ ...c, id: `ceremony_${i + 1}` })),
    message: { ...INVITATION_MESSAGE_PRESETS.hindi },
    photos: {
      bridePhoto: SAMPLE_BRIDE_PHOTO,
      groomPhoto: SAMPLE_GROOM_PHOTO,
      couplePhoto: SAMPLE_COUPLE_PHOTO,
      offsets: {
        bride: { zoom: 1, offsetX: 0, offsetY: 0, rotation: 0, filter: 'none', frameShape: 'default' },
        groom: { zoom: 1, offsetX: 0, offsetY: 0, rotation: 0, filter: 'none', frameShape: 'default' },
        couple: { zoom: 1, offsetX: 0, offsetY: 0, rotation: 0, filter: 'none', frameShape: 'default' },
      },
    },
    templateId: 'divine-temple',
    audio: {
      enabled: true,
      trackId: 'mangal-shehnai',
      volume: 0.85,
      startTime: 0,
      fadeIn: true,
      fadeOut: true,
    },
    videoSettings: {
      resolution: '1080p',
      width: 1920,
      height: 1080,
      fps: 30,
      durationSeconds: 45,
      format: 'mp4',
      transition: 'auto',
    },
  };
};
