import type { WeddingProject } from '../../types/wedding';
import type { LoadedImages } from '../../services/videoRenderer';
import {
  drawCroppedImage,
  drawFormattedText,
  drawGaneshMotif,
  drawGoldenParticles,
  drawMandala,
} from './common';

/**
 * Sampoorna Sarvajan Shubh Vivah (संपूर्ण सर्वजन शुभ विवाह निमंत्रण)
 * 100% शुद्ध देवनागरी हिंदी एवं वैदिक संस्कृत श्लोकों में रचा गया सार्वभौमिक निमंत्रण।
 * किसी विशिष्ट 2 परिवारों तक सीमित न होकर समस्त स्नेही स्वजनों, बंधु-बांधवों, सगे-संबंधियों,
 * मित्रों एवं अतिथियों को सामूहिक व आत्मीय रूप से आमंत्रित करता है।
 * राजसी मरकत हरा (Royal Emerald Velvet), 24K कुंदन स्वर्ण, तोरण एवं दिव्य दीप सज्जा।
 */
export function renderSampoornaSarvajan(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  duration: number,
  project: WeddingProject,
  images: LoadedImages
) {
  // 1. Auspicious Royal Emerald Velvet Background with Saffron Aura
  drawEmeraldVelvetBackground(ctx, width, height, time);

  // 2. Auspicious Toran, Golden Temple Bells & Kundan Borders
  drawToranAndKundanBorders(ctx, width, height, time);

  // 3. Auspicious Brass Diya Flames on Borders
  drawAuspiciousDiyas(ctx, width, height, time);

  // 4. Floating Pink/Gold Lotus Petals & Stardust
  drawFloatingLotusPetals(ctx, width, height, time);
  drawGoldenParticles(ctx, width, height, time, '#FFDF73');

  // Scene timing (7 scenes total)
  const sceneDuration = duration / 7;
  const sceneIdx = Math.min(6, Math.floor(time / sceneDuration));
  const sceneProgress = (time % sceneDuration) / sceneDuration;

  // Scene fade in/out
  const fadeIn = Math.min(1, sceneProgress * 4.5);
  const fadeOut = Math.min(1, (1 - sceneProgress) * 4.5);
  ctx.globalAlpha = Math.min(fadeIn, fadeOut);

  switch (sceneIdx) {
    case 0:
      // SCENE 1: गणेश वंदना एवं सार्वभौमिक मंगलाचरण
      renderScene1GaneshVandana(ctx, width, height, project);
      break;

    case 1:
      // SCENE 2: समस्त स्नेहीजनों को सस्नेह आमंत्रण (Universal Sarvajan Invitation)
      renderScene2SarvajanSnehNimantran(ctx, width, height, time);
      break;

    case 2:
      // SCENE 3: वर-वधू शुभ परिणय परिचय (Couples & Lineage with Universal Blessing)
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
      // SCENE 6: परिणय स्थल एवं समस्त अतिथियों का स्वागतम्
      renderScene6ParinaySthal(ctx, width, height, project);
      break;

    case 6:
      // SCENE 7: स्नेह निमंत्रण एवं आशीर्वचन समापन
      renderScene7AashirvaadSamapan(ctx, width, height);
      break;
  }

  ctx.globalAlpha = 1.0;
}

/**
 * 1. Auspicious Royal Emerald Velvet & Gold Halo Background
 */
function drawEmeraldVelvetBackground(
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

  bgGrad.addColorStop(0, '#0F482B'); // Rich Emerald Green
  bgGrad.addColorStop(0.45, '#09311D');
  bgGrad.addColorStop(0.8, '#051E11');
  bgGrad.addColorStop(1, '#020C07');

  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Warm Golden Kundan Halo in Center
  const halo = ctx.createRadialGradient(width / 2, height / 2, 30, width / 2, height / 2, width * 0.52);
  halo.addColorStop(0, 'rgba(255, 215, 0, 0.14)');
  halo.addColorStop(0.55, 'rgba(212, 175, 55, 0.06)');
  halo.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, width, height);

  ctx.restore();
}

/**
 * 2. Auspicious Mango Leaf Toran, Golden Temple Bells & Kundan Borders
 */
function drawToranAndKundanBorders(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
) {
  ctx.save();
  const pad = 36;
  const innerPad = 48;

  // Outer Border: Polished Kundan Gold
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 3.5;
  ctx.strokeRect(pad, pad, width - pad * 2, height - pad * 2);

  // Inner Border: Dotted Gold Filigree
  ctx.strokeStyle = '#FFDF73';
  ctx.lineWidth = 1.4;
  ctx.setLineDash([7, 5]);
  ctx.strokeRect(innerPad, innerPad, width - innerPad * 2, height - innerPad * 2);
  ctx.setLineDash([]);

  // Traditional Paisley / Alpana Corners
  const corners = [
    [pad, pad, 1, 1],
    [width - pad, pad, -1, 1],
    [width - pad, height - pad, -1, -1],
    [pad, height - pad, 1, -1],
  ];

  corners.forEach(([cx, cy, sx, sy]) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(sx, sy);
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2.5;

    // Corner bracket
    ctx.beginPath();
    ctx.moveTo(0, 42);
    ctx.lineTo(42, 42);
    ctx.lineTo(42, 0);
    ctx.stroke();

    // Corner decorative floral petals
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.moveTo(22, 12);
    ctx.lineTo(32, 22);
    ctx.lineTo(22, 32);
    ctx.lineTo(12, 22);
    ctx.closePath();
    ctx.fill();

    // Small corner circle
    ctx.beginPath();
    ctx.arc(42, 42, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  // Top Auspicious Mango Leaf & Golden Bell Toran (तोरण)
  const segments = 32;
  const stepX = width / segments;
  for (let i = 0; i <= segments; i++) {
    const x = i * stepX;
    const norm = (i - segments / 2) / (segments / 2);
    const sag = (1 - norm * norm) * 34 + 44;

    // Mango Leaf (आम्रपल्लव)
    ctx.save();
    ctx.translate(x, sag);
    ctx.fillStyle = '#1D7A46';
    ctx.beginPath();
    ctx.ellipse(0, 8, 9, 16, Math.sin(time + i * 0.4) * 0.08, 0, Math.PI * 2);
    ctx.fill();

    // Leaf vein in bright gold
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 20);
    ctx.stroke();

    // Golden Temple Bell (स्वर्ण घंटी) hanging at key positions
    if (i % 4 === 0) {
      const bellY = 24;
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.moveTo(-7, bellY + 12);
      ctx.lineTo(7, bellY + 12);
      ctx.lineTo(5, bellY);
      ctx.lineTo(-5, bellY);
      ctx.closePath();
      ctx.fill();

      // Bell clapper
      ctx.beginPath();
      ctx.arc(0, bellY + 14, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  ctx.restore();
}

/**
 * 3. Auspicious Brass Diyas with Flickering Flames (मंगल दीप)
 */
function drawAuspiciousDiyas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
) {
  ctx.save();
  const diyaY = height * 0.88;
  const leftX = 85;
  const rightX = width - 85;

  [leftX, rightX].forEach((diyaX) => {
    ctx.save();
    ctx.translate(diyaX, diyaY);

    // Diya Brass Base
    ctx.fillStyle = '#D4AF37';
    ctx.beginPath();
    ctx.ellipse(0, 0, 28, 12, 0, 0, Math.PI);
    ctx.fill();

    // Diya Stand
    ctx.beginPath();
    ctx.moveTo(-10, 12);
    ctx.lineTo(10, 12);
    ctx.lineTo(16, 20);
    ctx.lineTo(-16, 20);
    ctx.closePath();
    ctx.fill();

    // Flickering Flame
    const flicker = Math.sin(time * 8 + diyaX) * 2;
    const flameH = 22 + flicker;

    const flameGrad = ctx.createRadialGradient(0, -6, 2, 0, -12, flameH);
    flameGrad.addColorStop(0, '#FFFFFF');
    flameGrad.addColorStop(0.3, '#FFF275');
    flameGrad.addColorStop(0.7, '#FF7A00');
    flameGrad.addColorStop(1, 'rgba(255, 60, 0, 0)');

    ctx.fillStyle = flameGrad;
    ctx.beginPath();
    ctx.moveTo(-6, -2);
    ctx.quadraticCurveTo(-8, -flameH * 0.6, 0, -flameH);
    ctx.quadraticCurveTo(8, -flameH * 0.6, 6, -2);
    ctx.closePath();
    ctx.fill();

    // Warm Ambient Light Glow
    const glow = ctx.createRadialGradient(0, -10, 5, 0, -10, 60);
    glow.addColorStop(0, 'rgba(255, 200, 50, 0.28)');
    glow.addColorStop(1, 'rgba(255, 140, 0, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(0, -10, 60, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  });

  ctx.restore();
}

/**
 * 4. Floating Sacred Pink & Gold Lotus Petals (कमल दल)
 */
function drawFloatingLotusPetals(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
) {
  ctx.save();
  const petalCount = 38;
  for (let i = 0; i < petalCount; i++) {
    const seed = (i * 9301 + 49297) % 233280;
    const norm = seed / 233280;
    const speedY = 0.04 + norm * 0.06;
    const y = ((norm + time * speedY) % 1) * height;
    const sway = Math.sin(time * 1.3 + i * 0.7) * 45;
    const x = ((norm * width + sway) % width + width) % width;
    const rot = time * 0.7 + i;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);

    // Sacred Lotus Pink & Gold Petal
    const isPink = i % 3 !== 0;
    ctx.fillStyle = isPink ? '#FF8DA1' : '#FFD700';
    ctx.globalAlpha = 0.5 + 0.3 * Math.sin(time * 2 + i);

    ctx.beginPath();
    ctx.ellipse(0, 0, 14, 7, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

/**
 * SCENE 1: श्री गणेश वंदना एवं सार्वभौमिक मंगलाचरण
 */
function renderScene1GaneshVandana(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: WeddingProject
) {
  // Sacred Ganesh Ji with Mukut, Tilak & Modak
  drawGaneshMotif(ctx, width / 2, height * 0.24, 98, '#FFE494');

  // Heading
  drawFormattedText(ctx, project.message.shlokaHeading || '॥ श्री गणेशाय नमः ॥', width / 2, height * 0.38, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 54,
    gradient: ['#FFFCE8', '#F3D278', '#D4AF37'],
    shadow: { color: 'rgba(0,0,0,0.95)', blur: 14, offsetX: 0, offsetY: 3 },
  });

  // Sanskrit Shloka
  drawFormattedText(
    ctx,
    'विघ्नेश्वराय वरदाय सुरप्रियाय लम्बोदराय सकलाय जगद्धिताय।\nनागाननाय श्रुतियज्ञविभूषिताय गौरीसुताय गणनाथ नमो नमस्ते॥',
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

  // Universal Subtitle
  drawFormattedText(ctx, '॥ पावन वैवाहिक सस्नेह आमंत्रण पत्र ॥', width / 2, height * 0.67, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 40,
    gradient: ['#FFEDB3', '#F59E0B', '#FFEDB3'],
    shadow: { color: 'rgba(0,0,0,0.95)', blur: 12, offsetX: 0, offsetY: 3 },
  });

  drawFormattedText(
    ctx,
    'परमपिता परमात्मा की असीम अनुकम्पा एवं पूज्य पूर्वजों के शुभाशीर्वाद से',
    width / 2,
    height * 0.77,
    {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 27,
      color: '#F4DEB3',
    }
  );
}

/**
 * SCENE 2: समस्त स्नेहीजनों को सस्नेह आमंत्रण (Universal Sarvajan Invitation)
 * NOTE: Directly addresses user request — no specific 2 parivars (e.g. no Sharma/Kushwaha),
 * instead cordially invites EVERYONE universally as loved family, relatives, and friends!
 */
function renderScene2SarvajanSnehNimantran(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
) {
  // Rotating Sacred Mandala in background
  ctx.save();
  ctx.globalAlpha = 0.34;
  drawMandala(ctx, width / 2, height * 0.5, 430, time * 0.08, '#D4AF37');
  ctx.restore();

  drawFormattedText(ctx, '॥ सस्नेह सर्वजन आमंत्रण ॥', width / 2, height * 0.26, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 48,
    gradient: ['#FFF8DC', '#E5C065', '#D4AF37'],
    shadow: { color: 'rgba(0,0,0,0.95)', blur: 14, offsetX: 0, offsetY: 3 },
  });

  // Universal Heartfelt Welcome Poetry
  drawFormattedText(
    ctx,
    'न किसी कुल का भेद, न किसी परिवार की सीमा,\nआप सभी हमारे आत्मीय स्वजन हैं, यही हमारा परम गौरव है।\nइस पावन मांगलिक परिणय उत्सव की शुभ वेला में आप सभी स्नेही स्वजनों,\nबंधु-बांधवों, सगे-संबंधियों, मित्रों एवं आत्मीयजनों का सहृदय स्वागत एवं अभिनंदन है।',
    width / 2,
    height * 0.44,
    {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 30,
      color: '#FFF8EC',
      lineHeight: 48,
      maxWidth: 1400,
      shadow: { color: 'rgba(0,0,0,0.95)', blur: 12, offsetX: 0, offsetY: 2 },
    }
  );

  // Large Auspicious Gold Banner: "आप सभी सादर आमंत्रित हैं"
  drawFormattedText(ctx, '॥ आप सभी सपरिवार सादर आमंत्रित हैं ॥', width / 2, height * 0.64, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 44,
    gradient: ['#FFFCE8', '#FFD700', '#F59E0B'],
    shadow: { color: 'rgba(0,0,0,0.95)', blur: 14, offsetX: 0, offsetY: 3 },
  });

  // Inclusive salutation
  drawFormattedText(
    ctx,
    'हार्दिक स्वागताकांक्षी: समस्त स्नेहीजन, आत्मीय परिवार एवं मित्रगण',
    width / 2,
    height * 0.76,
    {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 32,
      color: '#FFEAA7',
      shadow: { color: 'rgba(0,0,0,0.9)', blur: 10, offsetX: 0, offsetY: 2 },
    }
  );
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

  drawFormattedText(ctx, '॥ शुभ विवाह परिणय सूत्र बंधन ॥', width / 2, height * 0.22, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 38,
    color: '#FFEAA7',
    shadow: { color: 'rgba(0,0,0,0.85)', blur: 10, offsetX: 0, offsetY: 2 },
  });

  // वधू (Bride)
  const brideName = couple.brideHindiName || couple.brideName || 'पूजा';
  drawFormattedText(ctx, `आयुष्मती  ${brideName}`, width / 2, height * 0.36, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 68,
    gradient: ['#FFF8DC', '#E6C065', '#D4AF37'],
    shadow: { color: 'rgba(0,0,0,0.95)', blur: 16, offsetX: 0, offsetY: 4 },
  });

  if (couple.brideParents) {
    drawFormattedText(ctx, `सुपुत्री: श्रीमती एवं श्री ${couple.brideParents}`, width / 2, height * 0.45, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 27,
      color: '#F5DEB3',
    });
  }

  // संग (Weds)
  drawFormattedText(ctx, '॥ संग ॥', width / 2, height * 0.54, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 44,
    color: '#FFDF73',
    shadow: { color: 'rgba(0,0,0,0.9)', blur: 10, offsetX: 0, offsetY: 2 },
  });

  // वर (Groom)
  const groomName = couple.groomHindiName || couple.groomName || 'राहुल';
  drawFormattedText(ctx, `आयुष्मान  ${groomName}`, width / 2, height * 0.65, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 68,
    gradient: ['#FFF8DC', '#E6C065', '#D4AF37'],
    shadow: { color: 'rgba(0,0,0,0.95)', blur: 16, offsetX: 0, offsetY: 4 },
  });

  if (couple.groomParents) {
    drawFormattedText(ctx, `सुपुत्र: श्रीमती एवं श्री ${couple.groomParents}`, width / 2, height * 0.74, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 27,
      color: '#F5DEB3',
    });
  }

  // Universal Blessing Line
  drawFormattedText(
    ctx,
    'समस्त बड़े-बुजुर्गों के शुभाशीर्वाद एवं आप सभी आत्मीयजनों के पावन सान्निध्य में',
    width / 2,
    height * 0.83,
    {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 24,
      color: '#FFDE7A',
    }
  );
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
  drawFormattedText(ctx, '॥ वर-वधू युगल दर्शन ॥', width / 2, height * 0.12, {
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
  const frameY = height * 0.17;

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
    ctx.fillStyle = '#082E1A';
    ctx.fillRect(frameX, frameY, frameW, frameH);
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 4;
    ctx.strokeRect(frameX, frameY, frameW, frameH);

    drawFormattedText(ctx, '॥ शुभ परिणय ॥', width / 2, height * 0.48, {
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

  drawFormattedText(ctx, '॥ मांगलिक शुभ विवाह तिथि एवं लग्न मुहूर्त ॥', width / 2, height * 0.20, {
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
  drawFormattedText(ctx, `${weekdayStr},  ${day} ${monthStr} ${year}`, width / 2, height * 0.43, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 62,
    gradient: ['#FFF8DB', '#E5C065', '#D4AF37'],
    shadow: { color: 'rgba(0,0,0,0.95)', blur: 16, offsetX: 0, offsetY: 4 },
  });

  // Muhurat & Events
  drawFormattedText(ctx, 'शुभ लग्न मुहूर्त: गोधूलि वेला, सायं ०७:०० बजे से', width / 2, height * 0.57, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 34,
    color: '#FFEAA7',
    shadow: { color: 'rgba(0,0,0,0.9)', blur: 8, offsetX: 0, offsetY: 2 },
  });

  drawFormattedText(ctx, 'पावन पाणिग्रहण एवं सप्तपदी (फेरे): रात्रि ०८:३० बजे', width / 2, height * 0.68, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 30,
    color: '#FFF8EC',
  });

  drawFormattedText(
    ctx,
    '॥ ॐ मङ्गलम् भगवान विष्णुः मङ्गलम् गरुडध्वजः। मङ्गलम् पुण्डरीकाक्षः मङ्गलाय तनो हरिः ॥',
    width / 2,
    height * 0.80,
    {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 26,
      color: '#D4AF37',
    }
  );
}

/**
 * SCENE 6: परिणय स्थल एवं समस्त अतिथियों का स्वागतम्
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

  drawFormattedText(ctx, '॥ परिणय स्थल एवं स्वागतम् ॥', width / 2, height * 0.21, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 42,
    gradient: ['#FFEAA7', '#D4AF37', '#FFC83B'],
    shadow: { color: 'rgba(0,0,0,0.9)', blur: 12, offsetX: 0, offsetY: 3 },
  });

  // Venue Name
  drawFormattedText(ctx, primaryCeremony.venueName || 'द ग्रांड पैलेस', width / 2, height * 0.41, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 50,
    color: '#FFF8EB',
    shadow: { color: 'rgba(0,0,0,0.95)', blur: 14, offsetX: 0, offsetY: 3 },
  });

  // Venue Address
  drawFormattedText(ctx, primaryCeremony.venueAddress || 'उदयपुर, राजस्थान', width / 2, height * 0.53, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 32,
    color: '#F4E4D0',
    maxWidth: 1300,
    lineHeight: 44,
  });

  // Schedule
  drawFormattedText(ctx, 'बारात शोभायात्रा: सायं ०६:०० बजे   •   वरमाला एवं प्रीतिभोज: सायं ०७:३० बजे से', width / 2, height * 0.68, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 28,
    color: '#FFDF73',
  });

  drawFormattedText(ctx, 'आप सभी का शुभागमन हमारे इस उत्सव को भव्यता एवं सार्थकता प्रदान करेगा', width / 2, height * 0.79, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 26,
    color: '#FFEAA7',
  });
}

/**
 * SCENE 7: स्नेह निमंत्रण एवं आशीर्वचन समापन (Universal Closing Blessing)
 */
function renderScene7AashirvaadSamapan(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  drawFormattedText(ctx, '॥ सस्नेह आमंत्रण एवं आशीर्वचन ॥', width / 2, height * 0.23, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 44,
    gradient: ['#FFEAA7', '#D4AF37', '#FFC83B'],
    shadow: { color: 'rgba(0,0,0,0.9)', blur: 12, offsetX: 0, offsetY: 3 },
  });

  // Traditional Hindi Invitation Poetry (हे आत्मीय स्वजन...)
  drawFormattedText(
    ctx,
    'भेज रहे हैं स्नेह निमंत्रण, आप सभी को बुलाने को।\nहे आत्मीय स्वजन, भूल न जाना आने को॥',
    width / 2,
    height * 0.40,
    {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 34,
      color: '#FFF8EC',
      lineHeight: 52,
      shadow: { color: 'rgba(0,0,0,0.95)', blur: 12, offsetX: 0, offsetY: 3 },
    }
  );

  drawFormattedText(ctx, '॥ दर्शनाभिलाषी एवं विनीत ॥', width / 2, height * 0.58, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 32,
    color: '#FFEAA7',
  });

  // Universal Salutation: No specific parivar bias
  drawFormattedText(ctx, 'समस्त स्नेही स्वजन, आत्मीय परिवार एवं मित्रगण', width / 2, height * 0.68, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 36,
    gradient: ['#FFF8DB', '#E5C065', '#D4AF37'],
    shadow: { color: 'rgba(0,0,0,0.95)', blur: 12, offsetX: 0, offsetY: 3 },
  });

  // Final Sacred Vedic Shanti Mantra
  drawFormattedText(
    ctx,
    '॥ ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः पृथिवी शान्तिरापः। ॐ शान्तिः शान्तिः शान्तिः ॥',
    width / 2,
    height * 0.81,
    {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 27,
      color: '#D4AF37',
    }
  );
}
