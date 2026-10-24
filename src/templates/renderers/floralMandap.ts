import type { WeddingProject } from '../../types/wedding';
import { drawCroppedImage, drawFormattedText, drawGoldenParticles } from './common';

export function renderFloralMandap(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  duration: number,
  project: WeddingProject,
  images: { bride?: HTMLImageElement; groom?: HTMLImageElement; couple?: HTMLImageElement; family?: HTMLImageElement }
) {
  // Rich Royal Mandap Courtyard Crimson & Warm Ivory
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#380E1C');
  bgGrad.addColorStop(0.5, '#52142B');
  bgGrad.addColorStop(1, '#240812');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Mandap Carved Pillars on Left & Right
  ctx.save();
  // Left Pillar
  ctx.fillStyle = 'rgba(212, 175, 55, 0.2)';
  ctx.fillRect(40, 20, 50, height - 40);
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 20, 50, height - 40);

  // Right Pillar
  ctx.fillStyle = 'rgba(212, 175, 55, 0.2)';
  ctx.fillRect(width - 90, 20, 50, height - 40);
  ctx.strokeRect(width - 90, 20, 50, height - 40);

  // Hanging Temple Bells swaying gently
  const bellSway = Math.sin(time * 2) * 8;
  const bells = [160, 320, width / 2, width - 320, width - 160];
  bells.forEach((bx) => {
    ctx.strokeStyle = '#FFDF73';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bx, 20);
    ctx.lineTo(bx + bellSway, 90);
    ctx.stroke();

    // Brass Bell
    ctx.fillStyle = '#D4AF37';
    ctx.beginPath();
    ctx.arc(bx + bellSway, 95, 12, 0, Math.PI);
    ctx.fill();
    ctx.fillRect(bx + bellSway - 12, 95, 24, 6);
  });
  ctx.restore();

  drawGoldenParticles(ctx, width, height, time, '#FBBF24');

  const sceneDuration = duration / 7;
  const sceneIdx = Math.floor(time / sceneDuration);
  const sceneProgress = (time % sceneDuration) / sceneDuration;
  const fadeIn = Math.min(1, sceneProgress * 4);
  const fadeOut = Math.min(1, (1 - sceneProgress) * 4);
  ctx.globalAlpha = Math.min(fadeIn, fadeOut);

  const couple = project.couple;

  if (sceneIdx === 0) {
    drawFormattedText(ctx, '॥ शुभ विवाह मंडप ॥', width / 2, height * 0.32, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 52,
      gradient: ['#FDE68A', '#F59E0B', '#FDE68A'],
      glow: { color: 'rgba(245, 158, 11, 0.7)', blur: 20 },
    });

    drawFormattedText(ctx, 'A CELEBRATION UNDER THE SACRED MANDAP', width / 2, height * 0.46, {
      font: "'Cinzel', serif",
      fontSize: 32,
      color: '#FEF3C7',
      letterSpacing: 4,
    });

    drawFormattedText(ctx, `${couple.groomFamily} & ${couple.brideFamily}`, width / 2, height * 0.58, {
      font: "'Great Vibes', cursive",
      fontSize: 66,
      gradient: ['#FDE68A', '#F59E0B', '#FDE68A'],
    });

    drawFormattedText(ctx, 'Warmly invite you to grace the sacred wedding celebrations', width / 2, height * 0.70, {
      font: "'Cormorant Garamond', serif",
      fontSize: 30,
      color: '#FFFFFF',
    });
  } else if (sceneIdx === 1) {
    drawFormattedText(ctx, 'JOIN US AS WE EXCHANGE VOWS', width / 2, height * 0.28, {
      font: "'Cinzel', serif",
      fontSize: 28,
      color: '#F59E0B',
    });

    drawFormattedText(ctx, couple.groomName, width / 2, height * 0.42, {
      font: "'Playfair Display', serif",
      fontSize: 70,
      gradient: ['#FEF3C7', '#FBBF24', '#FEF3C7'],
      glow: { color: 'rgba(251, 191, 36, 0.8)', blur: 25 },
    });

    drawFormattedText(ctx, '❦  weds  ❦', width / 2, height * 0.54, {
      font: "'Great Vibes', cursive",
      fontSize: 52,
      color: '#F472B6',
    });

    drawFormattedText(ctx, couple.brideName, width / 2, height * 0.68, {
      font: "'Playfair Display', serif",
      fontSize: 70,
      gradient: ['#FEF3C7', '#FBBF24', '#FEF3C7'],
      glow: { color: 'rgba(251, 191, 36, 0.8)', blur: 25 },
    });
  } else if (sceneIdx === 2) {
    const leftX = width * 0.28;
    const rightX = width * 0.72;
    const photoY = height * 0.44;
    const photoSize = 280;

    if (images.groom) {
      drawCroppedImage(ctx, images.groom, leftX - photoSize / 2, photoY - photoSize / 2, photoSize, photoSize, {
        isCircle: true,
        borderWidth: 6,
        borderColor: '#F59E0B',
      });
    }

    drawFormattedText(ctx, couple.groomName, leftX, height * 0.68, {
      font: "'Playfair Display', serif",
      fontSize: 34,
      color: '#FEF3C7',
    });
    drawFormattedText(ctx, `Son of ${couple.groomParents}`, leftX, height * 0.75, {
      font: "'Cormorant Garamond', serif",
      fontSize: 24,
      color: '#FDE68A',
      maxWidth: 440,
    });

    if (images.bride) {
      drawCroppedImage(ctx, images.bride, rightX - photoSize / 2, photoY - photoSize / 2, photoSize, photoSize, {
        isCircle: true,
        borderWidth: 6,
        borderColor: '#F59E0B',
      });
    }

    drawFormattedText(ctx, couple.brideName, rightX, height * 0.68, {
      font: "'Playfair Display', serif",
      fontSize: 34,
      color: '#FEF3C7',
    });
    drawFormattedText(ctx, `Daughter of ${couple.brideParents}`, rightX, height * 0.75, {
      font: "'Cormorant Garamond', serif",
      fontSize: 24,
      color: '#FDE68A',
      maxWidth: 440,
    });
  } else if (sceneIdx === 3) {
    const imgW = 600;
    const imgH = 420;
    const photoX = width * 0.32 - imgW / 2;
    const photoY = height / 2 - imgH / 2;

    if (images.couple) {
      drawCroppedImage(ctx, images.couple, photoX, photoY, imgW, imgH, {
        borderRadius: 24,
        borderWidth: 6,
        borderColor: '#F59E0B',
      });
    }

    const textX = width * 0.72;
    drawFormattedText(ctx, 'BLOCKED BY THE HOLY AGNI', textX, height * 0.35, {
      font: "'Cinzel', serif",
      fontSize: 28,
      color: '#F59E0B',
    });

    drawFormattedText(ctx, `"${project.message.quote || 'Surrounded by flowers, blessings, and the holy fire of love.'}"`, textX, height * 0.48, {
      font: "'Playfair Display', serif",
      fontSize: 30,
      color: '#FFFFFF',
      maxWidth: 580,
      lineHeight: 46,
    });

    drawFormattedText(ctx, `${couple.groomName}  &  ${couple.brideName}`, textX, height * 0.65, {
      font: "'Great Vibes', cursive",
      fontSize: 54,
      color: '#FDE68A',
    });
  } else if (sceneIdx === 4) {
    drawFormattedText(ctx, 'MANDAP CEREMONY TIMINGS', width / 2, height * 0.16, {
      font: "'Cinzel Decorative', serif",
      fontSize: 40,
      gradient: ['#FEF3C7', '#FBBF24', '#FEF3C7'],
    });

    const ceremonies = project.ceremonies.slice(0, 4);
    const cardWidth = Math.min(380, (width - 160) / Math.max(1, ceremonies.length));
    const totalW = ceremonies.length * cardWidth + (ceremonies.length - 1) * 30;
    const startX = (width - totalW) / 2;

    ceremonies.forEach((c, idx) => {
      const cx = startX + idx * (cardWidth + 30);
      const cy = height * 0.28;
      const ch = height * 0.56;

      ctx.fillStyle = 'rgba(30, 8, 16, 0.85)';
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(cx, cy, cardWidth, ch, 16);
      ctx.fill();
      ctx.stroke();

      const midX = cx + cardWidth / 2;
      drawFormattedText(ctx, c.hindiName || c.name, midX, cy + 60, {
        font: "'Noto Serif Devanagari', serif",
        fontSize: 28,
        color: '#FDE68A',
        maxWidth: cardWidth - 30,
      });

      drawFormattedText(ctx, `📅 ${c.date}`, midX, cy + 150, {
        font: "'Outfit', sans-serif",
        fontSize: 22,
        color: '#FFFFFF',
      });

      drawFormattedText(ctx, `⏰ ${c.time}`, midX, cy + 195, {
        font: "'Outfit', sans-serif",
        fontSize: 22,
        color: '#F59E0B',
      });

      drawFormattedText(ctx, `📍 ${c.venueName}`, midX, cy + 270, {
        font: "'Cormorant Garamond', serif",
        fontSize: 22,
        color: '#FFFFFF',
        maxWidth: cardWidth - 30,
      });

      drawFormattedText(ctx, c.venueAddress, midX, cy + 325, {
        font: "'Outfit', sans-serif",
        fontSize: 16,
        color: '#FBCFE8',
        maxWidth: cardWidth - 40,
        lineHeight: 22,
      });
    });
  } else if (sceneIdx === 5) {
    drawFormattedText(ctx, project.message.shlokaHeading || '॥ श्री गणेशाय नमः ॥', width / 2, height * 0.24, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 40,
      color: '#FDE68A',
    });

    drawFormattedText(ctx, project.message.bodyText, width / 2, height * 0.46, {
      font: "'Noto Serif Devanagari', 'Cormorant Garamond', serif",
      fontSize: 32,
      color: '#FFFFFF',
      maxWidth: 1300,
      lineHeight: 52,
    });

    drawFormattedText(ctx, project.message.closingSalutation, width / 2, height * 0.74, {
      font: "'Cinzel', serif",
      fontSize: 32,
      color: '#FDE68A',
      maxWidth: 1100,
      lineHeight: 46,
    });
  } else {
    drawFormattedText(ctx, 'PLEASE BLESS OUR NEW JOURNEY', width / 2, height * 0.28, {
      font: "'Cinzel', serif",
      fontSize: 30,
      color: '#FDE68A',
      letterSpacing: 4,
    });

    drawFormattedText(ctx, `${couple.groomName}  &  ${couple.brideName}`, width / 2, height * 0.48, {
      font: "'Great Vibes', cursive",
      fontSize: 80,
      gradient: ['#FEF3C7', '#FBBF24', '#FEF3C7'],
      glow: { color: 'rgba(251, 191, 36, 0.8)', blur: 25 },
    });

    const mainWedding = project.ceremonies.find((c) => c.key === 'wedding') || project.ceremonies[0];
    if (mainWedding) {
      drawFormattedText(ctx, `${mainWedding.name} • ${mainWedding.date} • ${mainWedding.venueName}`, width / 2, height * 0.66, {
        font: "'Outfit', sans-serif",
        fontSize: 26,
        color: '#FFFFFF',
      });
    }

    drawFormattedText(ctx, 'Heartily welcomed by both families', width / 2, height * 0.77, {
      font: "'Cormorant Garamond', serif",
      fontSize: 26,
      color: '#FDE68A',
    });
  }

  ctx.globalAlpha = 1;
}
