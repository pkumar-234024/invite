import type { WeddingProject } from '../../types/wedding';
import { drawCroppedImage, drawFormattedText } from './common';

export function renderModernLove(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  duration: number,
  project: WeddingProject,
  images: { bride?: HTMLImageElement; groom?: HTMLImageElement; couple?: HTMLImageElement; family?: HTMLImageElement }
) {
  // Sleek Contemporary Dark Charcoal / Onyx & Champagne Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#101014');
  bgGrad.addColorStop(0.5, '#1A1920');
  bgGrad.addColorStop(1, '#0C0C0E');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Modern Geometric Thin Gold Grid & Border
  ctx.save();
  ctx.strokeStyle = 'rgba(230, 202, 164, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(40, 40, width - 80, height - 80);

  // Cross hair lines in corners
  const crossCorners = [[40, 40], [width - 40, 40], [width - 40, height - 40], [40, height - 40]];
  crossCorners.forEach(([cx, cy]) => {
    ctx.beginPath();
    ctx.moveTo(cx - 15, cy);
    ctx.lineTo(cx + 15, cy);
    ctx.moveTo(cx, cy - 15);
    ctx.lineTo(cx, cy + 15);
    ctx.stroke();
  });
  ctx.restore();

  const sceneDuration = duration / 7;
  const sceneIdx = Math.floor(time / sceneDuration);
  const sceneProgress = (time % sceneDuration) / sceneDuration;
  const fadeIn = Math.min(1, sceneProgress * 4);
  const fadeOut = Math.min(1, (1 - sceneProgress) * 4);
  ctx.globalAlpha = Math.min(fadeIn, fadeOut);

  const couple = project.couple;

  if (sceneIdx === 0) {
    drawFormattedText(ctx, 'THE WEDDING CELEBRATION OF', width / 2, height * 0.35, {
      font: "'Outfit', sans-serif",
      fontSize: 24,
      color: '#E6CAA4',
      letterSpacing: 6,
    });

    drawFormattedText(ctx, `${couple.groomName.toUpperCase()}  &  ${couple.brideName.toUpperCase()}`, width / 2, height * 0.48, {
      font: "'Cinzel', serif",
      fontSize: 54,
      gradient: ['#FFFFFF', '#E6CAA4', '#FFFFFF'],
    });

    drawFormattedText(ctx, 'SAVE THE DATE', width / 2, height * 0.62, {
      font: "'Outfit', sans-serif",
      fontSize: 28,
      color: '#E6CAA4',
      letterSpacing: 8,
    });
  } else if (sceneIdx === 1) {
    drawFormattedText(ctx, 'WE ARE GETTING MARRIED', width / 2, height * 0.28, {
      font: "'Outfit', sans-serif",
      fontSize: 24,
      color: '#A09D97',
      letterSpacing: 6,
    });

    drawFormattedText(ctx, couple.groomName, width / 2, height * 0.42, {
      font: "'Playfair Display', serif",
      fontSize: 72,
      color: '#FFFFFF',
    });

    drawFormattedText(ctx, '&', width / 2, height * 0.54, {
      font: "'Cormorant Garamond', serif",
      fontSize: 48,
      color: '#E6CAA4',
    });

    drawFormattedText(ctx, couple.brideName, width / 2, height * 0.68, {
      font: "'Playfair Display', serif",
      fontSize: 72,
      color: '#FFFFFF',
    });
  } else if (sceneIdx === 2) {
    const leftX = width * 0.28;
    const rightX = width * 0.72;
    const photoY = height * 0.44;
    const photoSize = 280;

    if (images.groom) {
      drawCroppedImage(ctx, images.groom, leftX - photoSize / 2, photoY - photoSize / 2, photoSize, photoSize, {
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#E6CAA4',
      });
    }

    drawFormattedText(ctx, couple.groomName, leftX, height * 0.66, {
      font: "'Cinzel', serif",
      fontSize: 32,
      color: '#FFFFFF',
    });
    drawFormattedText(ctx, `Son of ${couple.groomParents}`, leftX, height * 0.74, {
      font: "'Outfit', sans-serif",
      fontSize: 20,
      color: '#A09D97',
      maxWidth: 440,
    });

    if (images.bride) {
      drawCroppedImage(ctx, images.bride, rightX - photoSize / 2, photoY - photoSize / 2, photoSize, photoSize, {
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#E6CAA4',
      });
    }

    drawFormattedText(ctx, couple.brideName, rightX, height * 0.66, {
      font: "'Cinzel', serif",
      fontSize: 32,
      color: '#FFFFFF',
    });
    drawFormattedText(ctx, `Daughter of ${couple.brideParents}`, rightX, height * 0.74, {
      font: "'Outfit', sans-serif",
      fontSize: 20,
      color: '#A09D97',
      maxWidth: 440,
    });
  } else if (sceneIdx === 3) {
    const imgW = 620;
    const imgH = 430;
    const photoX = width * 0.32 - imgW / 2;
    const photoY = height / 2 - imgH / 2;

    if (images.couple) {
      drawCroppedImage(ctx, images.couple, photoX, photoY, imgW, imgH, {
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#E6CAA4',
      });
    }

    const textX = width * 0.72;
    drawFormattedText(ctx, 'EVERY LOVE STORY IS BEAUTIFUL', textX, height * 0.35, {
      font: "'Outfit', sans-serif",
      fontSize: 22,
      color: '#E6CAA4',
      letterSpacing: 4,
    });

    drawFormattedText(ctx, `"${project.message.quote || 'But ours is my favorite.'}"`, textX, height * 0.48, {
      font: "'Playfair Display', serif",
      fontSize: 34,
      color: '#FFFFFF',
      maxWidth: 580,
      lineHeight: 48,
    });

    drawFormattedText(ctx, `${couple.groomName}  &  ${couple.brideName}`, textX, height * 0.65, {
      font: "'Cormorant Garamond', serif",
      fontSize: 48,
      color: '#E6CAA4',
    });
  } else if (sceneIdx === 4) {
    drawFormattedText(ctx, 'SCHEDULE OF CELEBRATION', width / 2, height * 0.16, {
      font: "'Cinzel', serif",
      fontSize: 36,
      color: '#FFFFFF',
      letterSpacing: 4,
    });

    const ceremonies = project.ceremonies.slice(0, 4);
    const cardWidth = Math.min(380, (width - 160) / Math.max(1, ceremonies.length));
    const totalW = ceremonies.length * cardWidth + (ceremonies.length - 1) * 30;
    const startX = (width - totalW) / 2;

    ceremonies.forEach((c, idx) => {
      const cx = startX + idx * (cardWidth + 30);
      const cy = height * 0.28;
      const ch = height * 0.56;

      ctx.fillStyle = '#141418';
      ctx.strokeStyle = '#33333A';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(cx, cy, cardWidth, ch, 8);
      ctx.fill();
      ctx.stroke();

      const midX = cx + cardWidth / 2;
      drawFormattedText(ctx, c.name, midX, cy + 60, {
        font: "'Outfit', sans-serif",
        fontSize: 24,
        color: '#FFFFFF',
        maxWidth: cardWidth - 30,
      });

      drawFormattedText(ctx, `📅 ${c.date}`, midX, cy + 150, {
        font: "'Outfit', sans-serif",
        fontSize: 20,
        color: '#E6CAA4',
      });

      drawFormattedText(ctx, `⏰ ${c.time}`, midX, cy + 195, {
        font: "'Outfit', sans-serif",
        fontSize: 20,
        color: '#FFFFFF',
      });

      drawFormattedText(ctx, c.venueName, midX, cy + 270, {
        font: "'Cormorant Garamond', serif",
        fontSize: 22,
        color: '#E6CAA4',
        maxWidth: cardWidth - 30,
      });

      drawFormattedText(ctx, c.venueAddress, midX, cy + 325, {
        font: "'Outfit', sans-serif",
        fontSize: 15,
        color: '#8A8884',
        maxWidth: cardWidth - 40,
        lineHeight: 22,
      });
    });
  } else if (sceneIdx === 5) {
    drawFormattedText(ctx, project.message.shlokaHeading || 'Together with our families', width / 2, height * 0.24, {
      font: "'Outfit', sans-serif",
      fontSize: 28,
      color: '#E6CAA4',
      letterSpacing: 4,
    });

    drawFormattedText(ctx, project.message.bodyText, width / 2, height * 0.46, {
      font: "'Playfair Display', serif",
      fontSize: 32,
      color: '#FFFFFF',
      maxWidth: 1300,
      lineHeight: 52,
    });

    drawFormattedText(ctx, project.message.closingSalutation, width / 2, height * 0.74, {
      font: "'Outfit', sans-serif",
      fontSize: 26,
      color: '#E6CAA4',
      letterSpacing: 2,
    });
  } else {
    drawFormattedText(ctx, 'JOIN US FOR THE CELEBRATION', width / 2, height * 0.28, {
      font: "'Outfit', sans-serif",
      fontSize: 28,
      color: '#E6CAA4',
      letterSpacing: 6,
    });

    drawFormattedText(ctx, `${couple.groomName.toUpperCase()}  &  ${couple.brideName.toUpperCase()}`, width / 2, height * 0.46, {
      font: "'Playfair Display', serif",
      fontSize: 66,
      color: '#FFFFFF',
    });

    const mainWedding = project.ceremonies.find((c) => c.key === 'wedding') || project.ceremonies[0];
    if (mainWedding) {
      drawFormattedText(ctx, `${mainWedding.name} • ${mainWedding.date} • ${mainWedding.venueName}`, width / 2, height * 0.64, {
        font: "'Outfit', sans-serif",
        fontSize: 24,
        color: '#E6CAA4',
      });
    }

    drawFormattedText(ctx, 'Warmest regards from both families', width / 2, height * 0.76, {
      font: "'Outfit', sans-serif",
      fontSize: 20,
      color: '#8A8884',
    });
  }

  ctx.globalAlpha = 1;
}
