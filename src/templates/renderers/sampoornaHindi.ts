import type { WeddingProject } from '../../types/wedding';
import type { LoadedImages } from '../../services/videoRenderer';
import {
  drawCroppedImage,
  drawFormattedText,
  drawGaneshMotif,
  drawGoldenParticles,
  drawFloatingRosePetals,
  drawMandala,
  drawRoyalBorder,
} from './common';

/**
 * Sampoorna Hindi Vivah (संपूर्ण हिंदी विवाह निमंत्रण)
 * 100% शुद्ध देवनागरी हिंदी एवं वैदिक संस्कृत श्लोकों में रचा गया पारंपरिक निमंत्रण।
 * सिंदूरी लाल, हल्दी केसरिया एवं २४ कैरेट शुद्ध स्वर्ण सज्जा, मांगलिक कलश एवं फेरे दर्शन।
 */
export function renderSampoornaHindi(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  duration: number,
  project: WeddingProject,
  images: LoadedImages
) {
  // 1. Auspicious Sindoor Vermilion & Saffron Royal Background
  drawSindoorBackground(ctx, width, height, time);

  // 2. Auspicious Marigold Garlands & Royal Border
  drawAuspiciousBorders(ctx, width, height);

  // 3. Floating Rose Petals & Golden Stardust
  drawFloatingRosePetals(ctx, width, height, time);
  drawGoldenParticles(ctx, width, height, time, '#FFDE7A');

  // Scene timing
  const sceneDuration = duration / 7;
  const sceneIdx = Math.min(6, Math.floor(time / sceneDuration));
  const sceneProgress = (time % sceneDuration) / sceneDuration;

  // Scene fade in/out
  const fadeIn = Math.min(1, sceneProgress * 4.5);
  const fadeOut = Math.min(1, (1 - sceneProgress) * 4.5);
  ctx.globalAlpha = Math.min(fadeIn, fadeOut);

  switch (sceneIdx) {
    case 0:
      // SCENE 1: गणेश वंदना एवं मंगलाचरण
      renderScene1GaneshVandana(ctx, width, height, project);
      break;

    case 1:
      // SCENE 2: सस्नेह पावन निमंत्रण
      renderScene2SnehNimantran(ctx, width, height, time, project);
      break;

    case 2:
      // SCENE 3: वर-वधू शुभ परिणय परिचय
      renderScene3VarVadhuParichay(ctx, width, height, project);
      break;

    case 3:
      // SCENE 4: वर-वधू युगल दर्शन (Photo Showcase)
      renderScene4VarVadhuDarshan(ctx, width, height, project, images);
      break;

    case 4:
      // SCENE 5: मांगलिक शुभ विवाह तिथि एवं लग्न मुहूर्त
      renderScene5ShubhTithiMuhurat(ctx, width, height, time, project);
      break;

    case 5:
      // SCENE 6: परिणय स्थल एवं बारात स्वागतम्
      renderScene6ParinaySthal(ctx, width, height, project);
      break;

    case 6:
      // SCENE 7: स्नेह निमंत्रण एवं आशीर्वचन समापन
      renderScene7AashirvaadSamapan(ctx, width, height, project);
      break;
  }

  ctx.globalAlpha = 1.0;
}

/**
 * 1. Auspicious Sindoor Vermilion & Turmeric Saffron Royal Background
 */
function drawSindoorBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  _time: number
) {
  ctx.save();
  const bgGrad = ctx.createRadialGradient(
    width / 2,
    height * 0.46,
    height * 0.15,
    width / 2,
    height / 2,
    width * 0.75
  );

  bgGrad.addColorStop(0, '#7A0A1F');
  bgGrad.addColorStop(0.45, '#560614');
  bgGrad.addColorStop(0.8, '#35030C');
  bgGrad.addColorStop(1, '#1A0105');

  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Auspicious Saffron Halo in Center
  const halo = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, width * 0.5);
  halo.addColorStop(0, 'rgba(245, 158, 11, 0.16)');
  halo.addColorStop(0.6, 'rgba(180, 20, 40, 0.08)');
  halo.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, width, height);

  ctx.restore();
}

/**
 * 2. Auspicious Marigold Garlands & Royal Gold Border
 */
function drawAuspiciousBorders(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();

  // Full-bleed decorative Indian wedding border
  drawRoyalBorder(ctx, width, height, '#D4AF37', '#FFDF73');

  // Top Continuous Marigold Garland Drape
  const segments = 38;
  const stepX = width / segments;
  for (let i = 0; i <= segments; i++) {
    const x = i * stepX;
    const norm = (i - segments / 2) / (segments / 2);
    const sag = (1 - norm * norm) * 38 + 48;

    // Saffron & Golden Haldi marigolds
    ctx.fillStyle = i % 2 === 0 ? '#FF8C00' : '#FFD700';
    ctx.beginPath();
    ctx.arc(x, sag, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = i % 2 === 0 ? '#FFA500' : '#FFF066';
    ctx.beginPath();
    ctx.arc(x, sag, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Auspicious Swastik corner emblems
  const swastikPositions = [
    [75, 75],
    [width - 75, 75],
    [75, height - 75],
    [width - 75, height - 75],
  ];

  swastikPositions.forEach(([x, y]) => {
    drawSwastikMotif(ctx, x, y, 18, '#D4AF37');
  });

  ctx.restore();
}

function drawSwastikMotif(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  color: string
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.lineCap = 'round';

  const s = size / 2;
  // Horizontal & Vertical cross
  ctx.beginPath();
  ctx.moveTo(-s, 0);
  ctx.lineTo(s, 0);
  ctx.moveTo(0, -s);
  ctx.lineTo(0, s);

  // Arms
  ctx.moveTo(s, 0);
  ctx.lineTo(s, s);
  ctx.moveTo(-s, 0);
  ctx.lineTo(-s, -s);
  ctx.moveTo(0, -s);
  ctx.lineTo(s, -s);
  ctx.moveTo(0, s);
  ctx.lineTo(-s, s);
  ctx.stroke();

  // Dots
  ctx.fillStyle = color;
  const d = s * 0.5;
  [
    [d, -d],
    [d, d],
    [-d, d],
    [-d, -d],
  ].forEach(([px, py]) => {
    ctx.beginPath();
    ctx.arc(px, py, 1.8, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

/**
 * SCENE 1: गणेश वंदना एवं मंगलाचरण
 */
function renderScene1GaneshVandana(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: WeddingProject
) {
  // Sacred Ganesh Ji with Mukut & Tilak
  drawGaneshMotif(ctx, width / 2, height * 0.25, 95, '#FFE494');

  // Heading
  drawFormattedText(ctx, project.message.shlokaHeading || '॥ श्री गणेशाय नमः ॥', width / 2, height * 0.39, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 54,
    gradient: ['#FFF8DC', '#E5C065', '#D4AF37'],
    shadow: { color: 'rgba(0,0,0,0.95)', blur: 14, offsetX: 0, offsetY: 3 },
  });

  // Sanskrit Shloka
  drawFormattedText(
    ctx,
    'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
    width / 2,
    height * 0.52,
    {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 32,
      color: '#FFEAA7',
      lineHeight: 46,
      shadow: { color: 'rgba(0,0,0,0.9)', blur: 10, offsetX: 0, offsetY: 2 },
    }
  );

  // Subtitle
  drawFormattedText(ctx, '॥ मांगलिक वैवाहिक निमंत्रण पत्र ॥', width / 2, height * 0.66, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 40,
    gradient: ['#FFEDB3', '#F59E0B', '#FFEDB3'],
    shadow: { color: 'rgba(0,0,0,0.95)', blur: 12, offsetX: 0, offsetY: 3 },
  });

  drawFormattedText(
    ctx,
    'परमपिता परमेश्वर की असीम अनुकम्पा एवं पूज्य पूर्वजों के आशीर्वाद से',
    width / 2,
    height * 0.75,
    {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 26,
      color: '#F4DEB3',
    }
  );
}

/**
 * SCENE 2: सस्नेह पावन निमंत्रण
 */
function renderScene2SnehNimantran(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  project: WeddingProject
) {
  // Rotating Mandala
  ctx.save();
  ctx.globalAlpha = 0.32;
  drawMandala(ctx, width / 2, height * 0.5, 420, time * 0.09, '#D4AF37');
  ctx.restore();

  drawFormattedText(ctx, '॥ सस्नेह निमंत्रण ॥', width / 2, height * 0.28, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 48,
    gradient: ['#FFF8DC', '#E5C065', '#D4AF37'],
    shadow: { color: 'rgba(0,0,0,0.95)', blur: 14, offsetX: 0, offsetY: 3 },
  });

  drawFormattedText(
    ctx,
    'मान्यवर, हमारे यहाँ शुभ विवाह का पावन अवसर निश्चित हुआ है।\nइस मांगलिक वेला में आपकी गरिमामयी उपस्थिति एवं स्नेहिल आशीर्वाद सादर प्रार्थनीय है।',
    width / 2,
    height * 0.44,
    {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 30,
      color: '#FFF8EC',
      lineHeight: 48,
      maxWidth: 1350,
      shadow: { color: 'rgba(0,0,0,0.9)', blur: 10, offsetX: 0, offsetY: 2 },
    }
  );

  drawFormattedText(ctx, '॥ सादर आमंत्रित परिवार ॥', width / 2, height * 0.61, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 32,
    color: '#FFEAA7',
  });

  const groomFamily = project.couple.groomFamily || 'शर्मा परिवार';
  const brideFamily = project.couple.brideFamily || 'वर्मा परिवार';
  drawFormattedText(ctx, `${groomFamily}   एवं   ${brideFamily}`, width / 2, height * 0.71, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 42,
    gradient: ['#FFF8DB', '#E5C065', '#D4AF37'],
    shadow: { color: 'rgba(0,0,0,0.95)', blur: 12, offsetX: 0, offsetY: 3 },
  });
}

/**
 * SCENE 3: वर-वधू शुभ परिणय परिचय
 */
function renderScene3VarVadhuParichay(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: WeddingProject
) {
  const couple = project.couple;

  drawFormattedText(ctx, '॥ शुभ विवाह परिणय सूत्र बंधन ॥', width / 2, height * 0.23, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 36,
    color: '#FFEAA7',
    shadow: { color: 'rgba(0,0,0,0.85)', blur: 10, offsetX: 0, offsetY: 2 },
  });

  // वधू (Bride)
  const brideName = couple.brideHindiName || couple.brideName || 'पूजा';
  drawFormattedText(ctx, `आयुष्मती  ${brideName}`, width / 2, height * 0.37, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 68,
    gradient: ['#FFF8DC', '#E6C065', '#D4AF37'],
    shadow: { color: 'rgba(0,0,0,0.95)', blur: 16, offsetX: 0, offsetY: 4 },
  });

  if (couple.brideParents) {
    drawFormattedText(ctx, `सुपुत्री: श्रीमती एवं श्री ${couple.brideParents}`, width / 2, height * 0.46, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 26,
      color: '#F5DEB3',
    });
  }

  // संग (Weds)
  drawFormattedText(ctx, '॥ संग ॥', width / 2, height * 0.55, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 44,
    color: '#FFDF73',
    shadow: { color: 'rgba(0,0,0,0.9)', blur: 10, offsetX: 0, offsetY: 2 },
  });

  // वर (Groom)
  const groomName = couple.groomHindiName || couple.groomName || 'राहुल';
  drawFormattedText(ctx, `आयुष्मान  ${groomName}`, width / 2, height * 0.66, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 68,
    gradient: ['#FFF8DC', '#E6C065', '#D4AF37'],
    shadow: { color: 'rgba(0,0,0,0.95)', blur: 16, offsetX: 0, offsetY: 4 },
  });

  if (couple.groomParents) {
    drawFormattedText(ctx, `सुपुत्र: श्रीमती एवं श्री ${couple.groomParents}`, width / 2, height * 0.75, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 26,
      color: '#F5DEB3',
    });
  }
}

/**
 * SCENE 4: वर-वधू युगल दर्शन (Photo Showcase)
 */
function renderScene4VarVadhuDarshan(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: WeddingProject,
  images: LoadedImages
) {
  drawFormattedText(ctx, '॥ वर-वधू युगल दर्शन ॥', width / 2, height * 0.13, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 38,
    gradient: ['#FFE9A7', '#D4AF37', '#FFC83B'],
    shadow: { color: 'rgba(0,0,0,0.85)', blur: 10, offsetX: 0, offsetY: 2 },
  });

  const coupleImg = images.couple || images.bride || images.groom;
  const photoOffsets = project.photos.offsets?.couple || {
    zoom: 1,
    offsetX: 0,
    offsetY: 0,
    frameShape: 'royal-arch',
    filter: 'royal-gold',
  };

  const frameW = 1140;
  const frameH = 620;
  const frameX = width / 2 - frameW / 2;
  const frameY = height * 0.18;

  if (coupleImg) {
    drawCroppedImage(ctx, coupleImg, frameX, frameY, frameW, frameH, {
      zoom: photoOffsets.zoom || 1.05,
      offsetX: photoOffsets.offsetX || 0,
      offsetY: photoOffsets.offsetY || 0,
      rotation: photoOffsets.rotation || 0,
      frameShape: photoOffsets.frameShape || 'royal-arch',
      filter: photoOffsets.filter || 'royal-gold',
      borderWidth: 6,
      borderColor: '#D4AF37',
    });
  } else {
    ctx.save();
    ctx.fillStyle = '#420612';
    ctx.fillRect(frameX, frameY, frameW, frameH);
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 4;
    ctx.strokeRect(frameX, frameY, frameW, frameH);

    drawFormattedText(ctx, 'शुभ विवाह', width / 2, height * 0.48, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 70,
      color: '#FFEAA7',
    });
    ctx.restore();
  }

  // Caption at bottom
  const bName = project.couple.brideHindiName || project.couple.brideName || 'पूजा';
  const gName = project.couple.groomHindiName || project.couple.groomName || 'राहुल';
  drawFormattedText(ctx, `आयुष्मती ${bName}   एवं   आयुष्मान ${gName}`, width / 2, height * 0.91, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 36,
    gradient: ['#FFF0C2', '#D4AF37', '#FFDF73'],
    shadow: { color: 'rgba(0,0,0,0.95)', blur: 12, offsetX: 0, offsetY: 3 },
  });
}

/**
 * SCENE 5: मांगलिक शुभ विवाह तिथि एवं लग्न मुहूर्त
 */
function renderScene5ShubhTithiMuhurat(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  project: WeddingProject
) {
  ctx.save();
  ctx.globalAlpha = 0.32;
  drawMandala(ctx, width / 2, height * 0.52, 440, time * 0.08, '#D4AF37');
  ctx.restore();

  drawFormattedText(ctx, '॥ मांगलिक शुभ विवाह तिथि एवं मुहूर्त ॥', width / 2, height * 0.21, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 42,
    gradient: ['#FFEAA7', '#D4AF37', '#FFC83B'],
    shadow: { color: 'rgba(0,0,0,0.9)', blur: 12, offsetX: 0, offsetY: 3 },
  });

  const weddingCeremony =
    project.ceremonies.find((c) => c.key === 'wedding') ||
    project.ceremonies[0] || {
      date: '2026-11-28',
      time: '07:00 PM',
    };

  // Convert Date into Hindi string
  const dateObj = new Date(weddingCeremony.date || '2026-11-28');
  const day = isNaN(dateObj.getTime()) ? 28 : dateObj.getDate();
  const year = isNaN(dateObj.getTime()) ? 2026 : dateObj.getFullYear();
  const monthsHindi = [
    'जनवरी',
    'फ़रवरी',
    'मार्च',
    'अप्रैल',
    'मई',
    'जून',
    'जुलाई',
    'अगस्त',
    'सितंबर',
    'अक्टूबर',
    'नवंबर',
    'दिसंबर',
  ];
  const daysHindi = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
  const monthStr = isNaN(dateObj.getTime()) ? 'नवंबर' : monthsHindi[dateObj.getMonth()];
  const weekdayStr = isNaN(dateObj.getTime()) ? 'शनिवार' : daysHindi[dateObj.getDay()];

  // Prominent Hindi Date
  drawFormattedText(ctx, `${weekdayStr},  ${day} ${monthStr} ${year}`, width / 2, height * 0.44, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 62,
    gradient: ['#FFF8DB', '#E5C065', '#D4AF37'],
    shadow: { color: 'rgba(0,0,0,0.95)', blur: 16, offsetX: 0, offsetY: 4 },
  });

  // Muhurat & Events
  drawFormattedText(ctx, 'शुभ लग्न मुहूर्त: गोधूलि वेला, सायं ०७:०० बजे से', width / 2, height * 0.58, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 34,
    color: '#FFEAA7',
    shadow: { color: 'rgba(0,0,0,0.9)', blur: 8, offsetX: 0, offsetY: 2 },
  });

  drawFormattedText(ctx, 'हस्त मिलाप एवं पावन सप्तपदी (फेरे): रात्रि ०८:३० बजे', width / 2, height * 0.69, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 30,
    color: '#FFF8EC',
  });

  drawFormattedText(ctx, '॥ ॐ स्वस्ति न इन्द्रो वृद्धश्रवाः स्वस्ति नः पूषा विश्ववेदाः ॥', width / 2, height * 0.80, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 26,
    color: '#D4AF37',
  });
}

/**
 * SCENE 6: परिणय स्थल एवं बारात स्वागतम्
 */
function renderScene6ParinaySthal(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: WeddingProject
) {
  const primaryCeremony =
    project.ceremonies.find((c) => c.key === 'wedding') ||
    project.ceremonies[0] || {
      name: 'शुभ विवाह समारोह',
      venueName: 'द ग्रांड पैलेस',
      venueAddress: 'उदयपुर, राजस्थान',
    };

  drawFormattedText(ctx, '॥ परिणय स्थल एवं स्वागतम् ॥', width / 2, height * 0.22, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 42,
    gradient: ['#FFEAA7', '#D4AF37', '#FFC83B'],
    shadow: { color: 'rgba(0,0,0,0.9)', blur: 12, offsetX: 0, offsetY: 3 },
  });

  // Venue Name
  drawFormattedText(ctx, primaryCeremony.venueName || 'द ग्रांड पैलेस', width / 2, height * 0.42, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 50,
    color: '#FFF8EB',
    shadow: { color: 'rgba(0,0,0,0.95)', blur: 14, offsetX: 0, offsetY: 3 },
  });

  // Venue Address
  drawFormattedText(ctx, primaryCeremony.venueAddress || 'उदयपुर, राजस्थान', width / 2, height * 0.54, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 32,
    color: '#F4E4D0',
    maxWidth: 1300,
    lineHeight: 44,
  });

  // Schedule
  drawFormattedText(ctx, 'बारात आगमन: सायं ०६:०० बजे   •   वरमाला एवं प्रीतिभोज: सायं ०७:३० बजे से', width / 2, height * 0.69, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 28,
    color: '#FFDF73',
  });

  drawFormattedText(ctx, 'आपकी गरिमामयी उपस्थिति हमारे लिए सौभाग्य का प्रतीक होगी', width / 2, height * 0.79, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 26,
    color: '#FFEAA7',
  });
}

/**
 * SCENE 7: स्नेह निमंत्रण एवं आशीर्वचन समापन
 */
function renderScene7AashirvaadSamapan(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: WeddingProject
) {
  drawFormattedText(ctx, '॥ सस्नेह सादर निमंत्रण ॥', width / 2, height * 0.24, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 44,
    gradient: ['#FFEAA7', '#D4AF37', '#FFC83B'],
    shadow: { color: 'rgba(0,0,0,0.9)', blur: 12, offsetX: 0, offsetY: 3 },
  });

  // Traditional Hindi Invitation Poetry (हे मानस के राजहंस...)
  drawFormattedText(
    ctx,
    'भेज रहे हैं स्नेह निमंत्रण, प्रियवर तुम्हें बुलाने को।\nहे मानस के राजहंस, भूल न जाना आने को॥',
    width / 2,
    height * 0.41,
    {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 34,
      color: '#FFF8EC',
      lineHeight: 52,
      shadow: { color: 'rgba(0,0,0,0.95)', blur: 12, offsetX: 0, offsetY: 3 },
    }
  );

  drawFormattedText(ctx, '॥ दर्शनाभिलाषी एवं विनीत ॥', width / 2, height * 0.59, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 32,
    color: '#FFEAA7',
  });

  const closing = project.message.closingSalutation || 'समस्त परिवार एवं स्वजन';
  drawFormattedText(ctx, closing, width / 2, height * 0.69, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 36,
    gradient: ['#FFF8DB', '#E5C065', '#D4AF37'],
    shadow: { color: 'rgba(0,0,0,0.95)', blur: 12, offsetX: 0, offsetY: 3 },
  });

  // Final Sacred Shanti Mantra
  drawFormattedText(ctx, '॥ ॐ शं नो मित्रः शं वरुणः। ॐ शान्तिः शान्तिः शान्तिः ॥', width / 2, height * 0.81, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 28,
    color: '#D4AF37',
  });
}
