import type { WeddingProject } from '../../types/wedding';
import type { LoadedImages } from '../../services/videoRenderer';
import {
  drawCroppedImage,
  drawFormattedText,
  drawGaneshMotif,
  drawMandala,
} from './common';

/**
 * Royal Cream & Pearl (शाही क्रीम एवं मोती)
 * A breathtaking lighter luxury Indian wedding invitation.
 * Features warm pearl cream silk texture, champagne gold foil filigree,
 * floating white jasmine blossoms, delicate kundan pearls, and rich burgundy typography.
 */
export function renderRoyalCreamPalace(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  duration: number,
  project: WeddingProject,
  images: LoadedImages
) {
  // 1. Warm Pearl Cream Silk Background with Jacquard Texture
  drawCreamSilkBackground(ctx, width, height, time);

  // 2. Champagne Gold Foil Arch & Pearl Borders
  drawChampagnePearlBorders(ctx, width, height);

  // 3. Floating Jasmine & White Lotus Petals
  drawFloatingJasminePetals(ctx, width, height, time);

  // 4. Subtle Twinkling Champagne Dust
  drawChampagneDust(ctx, width, height, time);

  // Scene timing
  const sceneDuration = duration / 7;
  const sceneIdx = Math.min(6, Math.floor(time / sceneDuration));
  const sceneProgress = (time % sceneDuration) / sceneDuration;

  // Smooth fade between scenes
  const fadeIn = Math.min(1, sceneProgress * 4.5);
  const fadeOut = Math.min(1, (1 - sceneProgress) * 4.5);
  ctx.globalAlpha = Math.min(fadeIn, fadeOut);

  const couple = project.couple;

  switch (sceneIdx) {
    case 0:
      // SCENE 1: Sacred Ganesh Invocation & Pearl Gate Opening
      renderScene1GaneshBlessing(ctx, width, height, time, couple, project);
      break;

    case 1:
      // SCENE 2: Sacred Invitation with Rotating Kundan Mandala
      renderScene2SacredInvitation(ctx, width, height, time, couple);
      break;

    case 2:
      // SCENE 3: Grand Couple Name Reveal in Rich Burgundy & Gold
      renderScene3CoupleNames(ctx, width, height, time, couple);
      break;

    case 3:
      // SCENE 4: Expansive Couple Portrait in Ornate Pearl Arch
      renderScene4CouplePortrait(ctx, width, height, time, project, images);
      break;

    case 4:
      // SCENE 5: Auspicious Wedding Date & Muhurat
      renderScene5WeddingDate(ctx, width, height, time, project);
      break;

    case 5:
      // SCENE 6: Grand Mandap Venue & Ceremony
      renderScene6VenueCelebration(ctx, width, height, time, project);
      break;

    case 6:
      // SCENE 7: Royal Cream & Gold Invitation Finale
      renderScene7GrandFinale(ctx, width, height, time, project);
      break;
  }

  ctx.globalAlpha = 1.0;
}

/**
 * 1. Warm Pearl Cream Silk Background with Woven Jacquard Weave Texture
 */
function drawCreamSilkBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
) {
  ctx.save();

  // Luxurious radial gradient: Pearlescent cream center to warm ivory peach corners
  const bgGrad = ctx.createRadialGradient(
    width / 2,
    height * 0.48,
    height * 0.2,
    width / 2,
    height / 2,
    width * 0.72
  );
  bgGrad.addColorStop(0, '#FFFDF8');
  bgGrad.addColorStop(0.45, '#FAF3E3');
  bgGrad.addColorStop(0.8, '#F3E5D0');
  bgGrad.addColorStop(1, '#E8D7BE');

  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Procedural woven silk sheen lines (Banarasi cream silk texture)
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.04)';
  ctx.lineWidth = 1;
  const spacing = 18;
  for (let x = -height; x < width + height; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + height, height);
    ctx.stroke();
  }
  for (let x = width + height; x > -height; x -= spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x - height, height);
    ctx.stroke();
  }

  // Soft shifting ambient light beam
  const lightX = width / 2 + Math.sin(time * 0.5) * 120;
  const sheenGrad = ctx.createLinearGradient(lightX - 350, 0, lightX + 350, height);
  sheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
  sheenGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.18)');
  sheenGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = sheenGrad;
  ctx.fillRect(0, 0, width, height);

  ctx.restore();
}

/**
 * 2. Champagne Gold Foil Arch & Pearl Borders
 */
function drawChampagnePearlBorders(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  const pad = 44;
  const innerPad = 58;

  // Outer Champagne Gold Border
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 3;
  ctx.strokeRect(pad, pad, width - pad * 2, height - pad * 2);

  // Inner Fine Dashed Gold Line
  ctx.strokeStyle = '#C5A059';
  ctx.lineWidth = 1.2;
  ctx.setLineDash([8, 6]);
  ctx.strokeRect(innerPad, innerPad, width - innerPad * 2, height - innerPad * 2);
  ctx.setLineDash([]);

  // Corner Kundan Pearls & Filigree
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

    // Gold bracket
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 38);
    ctx.lineTo(38, 38);
    ctx.lineTo(38, 0);
    ctx.stroke();

    // Pearl bead in corner
    ctx.fillStyle = '#FFFDF7';
    ctx.beginPath();
    ctx.arc(20, 20, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.restore();
  });

  // Top and bottom centered gold floral crests
  drawGoldCrest(ctx, width / 2, pad + 2);
  drawGoldCrest(ctx, width / 2, height - pad - 2);

  ctx.restore();
}

function drawGoldCrest(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.fillStyle = '#D4AF37';
  ctx.beginPath();
  ctx.moveTo(0, -6);
  ctx.lineTo(12, 0);
  ctx.lineTo(0, 6);
  ctx.lineTo(-12, 0);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#FFFDF7';
  ctx.beginPath();
  ctx.arc(0, 0, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/**
 * 3. Floating Jasmine & White Lotus Petals
 */
function drawFloatingJasminePetals(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
) {
  ctx.save();
  const count = 30;

  for (let i = 0; i < count; i++) {
    const seed = i * 137.5;
    const speed = 0.04 + (i % 5) * 0.015;
    const y = ((seed + time * speed * 80) % (height + 60)) - 30;
    const sway = Math.sin(time * 1.4 + i) * 45;
    const x = (((seed * 7.3 + sway) % width) + width) % width;
    const rot = time * 0.9 + i;
    const size = 6 + (i % 4) * 3;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);

    // Jasmine Petal: Pure white with subtle golden-yellow center
    const petalGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, size);
    petalGrad.addColorStop(0, '#FFFBE6');
    petalGrad.addColorStop(0.6, '#FFFFFF');
    petalGrad.addColorStop(1, 'rgba(255, 250, 240, 0.85)');

    ctx.fillStyle = petalGrad;
    ctx.globalAlpha = 0.65 + 0.25 * Math.sin(time * 2 + i);

    ctx.beginPath();
    ctx.ellipse(0, 0, size * 1.8, size, 0, 0, Math.PI * 2);
    ctx.fill();

    // Central saffron dot
    if (i % 2 === 0) {
      ctx.fillStyle = '#E5A93C';
      ctx.beginPath();
      ctx.arc(0, 0, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
  ctx.restore();
}

/**
 * 4. Sparkling Champagne Stardust Dust
 */
function drawChampagneDust(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
) {
  ctx.save();
  const count = 45;

  for (let i = 0; i < count; i++) {
    const x = ((i * 123.456 + Math.sin(time * 0.5 + i) * 60) % width + width) % width;
    const y = ((i * 87.654 + time * 20) % height + height) % height;
    const pulse = 0.4 + 0.6 * Math.sin(time * 3 + i);

    ctx.fillStyle = i % 2 === 0 ? '#D4AF37' : '#F5DEB3';
    ctx.globalAlpha = 0.45 * pulse;
    ctx.beginPath();
    ctx.arc(x, y, 1.5 + (i % 3), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/**
 * SCENE 1: Sacred Ganesh Invocation & Pearl Gate
 */
function renderScene1GaneshBlessing(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  _time: number,
  couple: { groomFamily: string; brideFamily: string },
  project: WeddingProject
) {
  // Sacred Ganesh Ji Motif in Antique Gold & Ruby
  drawGaneshMotif(ctx, width / 2, height * 0.27, 85, '#520818');

  // Auspicious Shloka in Devanagari
  drawFormattedText(ctx, project.message.shlokaHeading || '॥ श्री गणेशाय नमः ॥', width / 2, height * 0.42, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 50,
    color: '#520818',
    letterSpacing: 2,
    shadow: { color: 'rgba(212, 175, 55, 0.45)', blur: 8, offsetX: 0, offsetY: 2 },
  });

  drawFormattedText(ctx, 'ROYAL WEDDING INVITATION', width / 2, height * 0.53, {
    font: "'Playfair Display', serif",
    fontSize: 36,
    color: '#8A5D18',
    letterSpacing: 8,
    shadow: { color: 'rgba(255, 255, 255, 0.9)', blur: 6, offsetX: 0, offsetY: 1 },
  });

  drawFormattedText(ctx, 'Together with their families', width / 2, height * 0.62, {
    font: "'Poppins', sans-serif",
    fontSize: 24,
    color: '#6B4C2C',
    letterSpacing: 3,
  });

  // Families
  drawFormattedText(ctx, `${couple.groomFamily}   &   ${couple.brideFamily}`, width / 2, height * 0.72, {
    font: "'Cinzel', serif",
    fontSize: 38,
    color: '#420412',
    letterSpacing: 3,
    shadow: { color: 'rgba(212, 175, 55, 0.5)', blur: 10, offsetX: 0, offsetY: 2 },
  });
}

/**
 * SCENE 2: Sacred Invitation with Rotating Kundan Mandala
 */
function renderScene2SacredInvitation(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  couple: { groomFamily: string; brideFamily: string }
) {
  // Rotating Champagne Gold Mandala in center
  ctx.save();
  ctx.globalAlpha = 0.35;
  drawMandala(ctx, width / 2, height * 0.5, 420, time * 0.1, '#D4AF37');
  ctx.restore();

  drawFormattedText(ctx, 'With the Divine Blessings', width / 2, height * 0.38, {
    font: "'Playfair Display', serif",
    fontSize: 44,
    color: '#520818',
    letterSpacing: 4,
    shadow: { color: 'rgba(255, 255, 255, 0.9)', blur: 8, offsetX: 0, offsetY: 2 },
  });

  drawFormattedText(ctx, 'OF OUR FAMILIES', width / 2, height * 0.49, {
    font: "'Cinzel', serif",
    fontSize: 50,
    color: '#8A5D18',
    letterSpacing: 8,
    shadow: { color: 'rgba(212, 175, 55, 0.5)', blur: 12, offsetX: 0, offsetY: 3 },
  });

  drawFormattedText(ctx, `${couple.groomFamily}   •   ${couple.brideFamily}`, width / 2, height * 0.62, {
    font: "'Poppins', sans-serif",
    fontSize: 32,
    color: '#420412',
    letterSpacing: 3,
  });

  drawFormattedText(ctx, 'Request the honour of your esteemed presence', width / 2, height * 0.73, {
    font: "'Playfair Display', serif",
    fontSize: 26,
    color: '#6B4C2C',
    letterSpacing: 2,
  });
}

/**
 * SCENE 3: Grand Couple Name Reveal in Rich Burgundy & Gold
 */
function renderScene3CoupleNames(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  _time: number,
  couple: { brideName: string; groomName: string; brideParents?: string; groomParents?: string }
) {
  drawFormattedText(ctx, 'INVITE YOU TO CELEBRATE THE WEDDING OF', width / 2, height * 0.23, {
    font: "'Playfair Display', serif",
    fontSize: 28,
    color: '#8A5D18',
    letterSpacing: 5,
  });

  // Bride Name (Grand Royal Burgundy)
  drawFormattedText(ctx, couple.brideName, width / 2, height * 0.38, {
    font: "'Cinzel Decorative', 'Cinzel', serif",
    fontSize: 74,
    color: '#520818',
    shadow: { color: 'rgba(212, 175, 55, 0.6)', blur: 14, offsetX: 0, offsetY: 3 },
  });

  if (couple.brideParents) {
    drawFormattedText(ctx, `Daughter of ${couple.brideParents}`, width / 2, height * 0.46, {
      font: "'Poppins', sans-serif",
      fontSize: 22,
      color: '#6B4C2C',
    });
  }

  // Ampersand
  drawFormattedText(ctx, '&', width / 2, height * 0.54, {
    font: "'Great Vibes', cursive",
    fontSize: 54,
    color: '#D4AF37',
    shadow: { color: 'rgba(82, 8, 24, 0.3)', blur: 8, offsetX: 0, offsetY: 2 },
  });

  // Groom Name
  drawFormattedText(ctx, couple.groomName, width / 2, height * 0.65, {
    font: "'Cinzel Decorative', 'Cinzel', serif",
    fontSize: 74,
    color: '#520818',
    shadow: { color: 'rgba(212, 175, 55, 0.6)', blur: 14, offsetX: 0, offsetY: 3 },
  });

  if (couple.groomParents) {
    drawFormattedText(ctx, `Son of ${couple.groomParents}`, width / 2, height * 0.73, {
      font: "'Poppins', sans-serif",
      fontSize: 22,
      color: '#6B4C2C',
    });
  }
}

/**
 * SCENE 4: Expansive Couple Portrait in Ornate Pearl Arch
 */
function renderScene4CouplePortrait(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  _time: number,
  project: WeddingProject,
  images: LoadedImages
) {
  drawFormattedText(ctx, 'MOMENTS OF ETERNAL LOVE', width / 2, height * 0.13, {
    font: "'Playfair Display', serif",
    fontSize: 32,
    color: '#8A5D18',
    letterSpacing: 6,
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
  const frameH = 630;
  const frameX = width / 2 - frameW / 2;
  const frameY = height * 0.18;

  if (coupleImg) {
    drawCroppedImage(ctx, coupleImg, frameX, frameY, frameW, frameH, {
      zoom: photoOffsets.zoom || 1.05,
      offsetX: photoOffsets.offsetX || 0,
      offsetY: photoOffsets.offsetY || 0,
      rotation: photoOffsets.rotation || 0,
      frameShape: photoOffsets.frameShape || 'royal-arch',
      filter: photoOffsets.filter || 'none',
      borderWidth: 6,
      borderColor: '#D4AF37',
    });
  } else {
    // Elegant fallback monogram
    ctx.save();
    ctx.fillStyle = '#FFF8EC';
    ctx.fillRect(frameX, frameY, frameW, frameH);
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 4;
    ctx.strokeRect(frameX, frameY, frameW, frameH);

    drawFormattedText(
      ctx,
      `${project.couple.brideName || 'P'}  ❤  ${project.couple.groomName || 'R'}`,
      width / 2,
      height * 0.48,
      {
        font: "'Cinzel Decorative', serif",
        fontSize: 70,
        color: '#520818',
      }
    );
    ctx.restore();
  }

  // Caption at bottom
  drawFormattedText(
    ctx,
    `${project.couple.brideName}   &   ${project.couple.groomName}`,
    width / 2,
    height * 0.91,
    {
      font: "'Cinzel', serif",
      fontSize: 36,
      color: '#420412',
      letterSpacing: 4,
    }
  );
}

/**
 * SCENE 5: Auspicious Wedding Date & Muhurat
 */
function renderScene5WeddingDate(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  project: WeddingProject
) {
  // Rotating background mandala
  ctx.save();
  ctx.globalAlpha = 0.28;
  drawMandala(ctx, width / 2, height * 0.52, 440, time * 0.08, '#D4AF37');
  ctx.restore();

  const weddingCeremony =
    project.ceremonies.find((c) => c.key === 'wedding') ||
    project.ceremonies[0] || {
      date: '2026-11-28',
      time: '07:00 PM',
    };

  const dateObj = new Date(weddingCeremony.date || '2026-11-28');
  const dayStr = isNaN(dateObj.getTime())
    ? '28'
    : dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  const weekdayStr = isNaN(dateObj.getTime())
    ? 'Saturday'
    : dateObj.toLocaleDateString('en-US', { weekday: 'long' });

  drawFormattedText(ctx, 'SAVE THE AUSPICIOUS DATE', width / 2, height * 0.24, {
    font: "'Playfair Display', serif",
    fontSize: 38,
    color: '#8A5D18',
    letterSpacing: 8,
  });

  // Large Prominent Date in Burgundy
  drawFormattedText(ctx, dayStr.toUpperCase(), width / 2, height * 0.46, {
    font: "'Cinzel Decorative', 'Cinzel', serif",
    fontSize: 66,
    color: '#520818',
    letterSpacing: 4,
    shadow: { color: 'rgba(212, 175, 55, 0.55)', blur: 14, offsetX: 0, offsetY: 3 },
  });

  // Time & Day in Poppins
  drawFormattedText(ctx, `${weekdayStr.toUpperCase()}   |   ${(weddingCeremony.time || '07:00 PM').toUpperCase()} ONWARDS`, width / 2, height * 0.61, {
    font: "'Poppins', sans-serif",
    fontSize: 30,
    color: '#420412',
    letterSpacing: 3,
  });

  // Sacred Muhurat in Devanagari
  drawFormattedText(ctx, '॥ शुभ लग्न मुहूर्त : गोधूलि वेला ॥', width / 2, height * 0.74, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 34,
    color: '#8A5D18',
    letterSpacing: 2,
  });
}

/**
 * SCENE 6: Grand Mandap Venue & Ceremony
 */
function renderScene6VenueCelebration(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  _time: number,
  project: WeddingProject
) {
  const primaryCeremony =
    project.ceremonies.find((c) => c.key === 'wedding') ||
    project.ceremonies[0] || {
      name: 'Wedding Ceremony',
      venueName: 'The Lake Palace & Courtyard',
      venueAddress: 'Udaipur, Rajasthan, India',
      time: '07:00 PM',
    };

  drawFormattedText(ctx, 'WEDDING CEREMONY & CELEBRATION', width / 2, height * 0.22, {
    font: "'Playfair Display', serif",
    fontSize: 38,
    color: '#8A5D18',
    letterSpacing: 6,
  });

  // Venue Name in Playfair Display
  drawFormattedText(ctx, primaryCeremony.venueName || 'The Lake Palace & Courtyard', width / 2, height * 0.44, {
    font: "'Playfair Display', serif",
    fontSize: 48,
    color: '#520818',
    shadow: { color: 'rgba(212, 175, 55, 0.5)', blur: 12, offsetX: 0, offsetY: 2 },
  });

  // Venue Address in Poppins
  drawFormattedText(ctx, primaryCeremony.venueAddress || 'Royal Courtyard, Udaipur, Rajasthan', width / 2, height * 0.56, {
    font: "'Poppins', sans-serif",
    fontSize: 28,
    color: '#6B4C2C',
    maxWidth: 1300,
    lineHeight: 38,
  });

  // Timings
  drawFormattedText(ctx, `Baraat: 06:00 PM   •   Varmala & Phere: ${primaryCeremony.time || '07:30 PM'}`, width / 2, height * 0.71, {
    font: "'Poppins', sans-serif",
    fontSize: 24,
    color: '#8A5D18',
    letterSpacing: 2,
  });
}

/**
 * SCENE 7: Royal Cream & Gold Invitation Finale
 */
function renderScene7GrandFinale(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  _time: number,
  project: WeddingProject
) {
  drawFormattedText(ctx, 'WE CORDIALLY INVITE YOU', width / 2, height * 0.28, {
    font: "'Playfair Display', serif",
    fontSize: 34,
    color: '#8A5D18',
    letterSpacing: 6,
  });

  drawFormattedText(ctx, 'TO CELEBRATE THE WEDDING OF', width / 2, height * 0.36, {
    font: "'Poppins', sans-serif",
    fontSize: 24,
    color: '#6B4C2C',
    letterSpacing: 4,
  });

  // Couple Names in Grand Burgundy & Gold
  const coupleText = `${project.couple.brideName || 'Pooja'}   &   ${project.couple.groomName || 'Rahul'}`;
  drawFormattedText(ctx, coupleText, width / 2, height * 0.49, {
    font: "'Cinzel Decorative', 'Cinzel', serif",
    fontSize: 68,
    color: '#520818',
    letterSpacing: 4,
    shadow: { color: 'rgba(212, 175, 55, 0.65)', blur: 16, offsetX: 0, offsetY: 4 },
  });

  drawFormattedText(ctx, '“Your Presence Will Make Our Celebration Complete”', width / 2, height * 0.62, {
    font: "'Playfair Display', serif",
    fontSize: 32,
    color: '#420412',
  });

  const closing = project.message.closingSalutation || 'Soliciting Your Gracious Presence & Blessings';
  drawFormattedText(ctx, closing, width / 2, height * 0.72, {
    font: "'Poppins', sans-serif",
    fontSize: 24,
    color: '#8A5D18',
    letterSpacing: 2,
  });

  drawFormattedText(ctx, '॥ ॐ नमो भगवते वासुदेवाय नमः ॥', width / 2, height * 0.82, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 30,
    color: '#520818',
  });
}
