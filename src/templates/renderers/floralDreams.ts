import type { WeddingProject } from '../../types/wedding';
import { drawCroppedImage, drawFloatingRosePetals, drawFormattedText } from './common';

export function renderFloralDreams(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  duration: number,
  project: WeddingProject,
  images: { bride?: HTMLImageElement; groom?: HTMLImageElement; couple?: HTMLImageElement; family?: HTMLImageElement }
) {
  // Romantic Pastel Berry & Deep Rose Garden Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#2C101A');
  bgGrad.addColorStop(0.5, '#48182B');
  bgGrad.addColorStop(1, '#1A0811');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Floating delicate rose petals
  drawFloatingRosePetals(ctx, width, height, time);

  // Soft Rose Gold & Pearl Border
  ctx.save();
  ctx.strokeStyle = '#D88A96';
  ctx.lineWidth = 3;
  ctx.strokeRect(36, 36, width - 72, height - 72);
  ctx.strokeStyle = '#EFCAD0';
  ctx.lineWidth = 1;
  ctx.setLineDash([6, 6]);
  ctx.strokeRect(48, 48, width - 96, height - 96);
  ctx.restore();

  const sceneDuration = duration / 7;
  const sceneIdx = Math.floor(time / sceneDuration);
  const sceneProgress = (time % sceneDuration) / sceneDuration;
  const fadeIn = Math.min(1, sceneProgress * 4);
  const fadeOut = Math.min(1, (1 - sceneProgress) * 4);
  ctx.globalAlpha = Math.min(fadeIn, fadeOut);

  const couple = project.couple;

  if (sceneIdx === 0) {
    drawFormattedText(ctx, '🌸  WEDDING INVITATION  🌸', width / 2, height * 0.32, {
      font: "'Playfair Display', serif",
      fontSize: 32,
      color: '#FCE4EC',
      letterSpacing: 4,
    });

    drawFormattedText(ctx, 'Together with their loving families', width / 2, height * 0.44, {
      font: "'Cormorant Garamond', serif",
      fontSize: 38,
      color: '#FAD2E1',
    });

    drawFormattedText(ctx, `${couple.groomFamily}  &  ${couple.brideFamily}`, width / 2, height * 0.58, {
      font: "'Great Vibes', cursive",
      fontSize: 64,
      gradient: ['#FFE5EC', '#F4ACB7', '#FFE5EC'],
      glow: { color: 'rgba(244, 172, 183, 0.6)', blur: 20 },
    });

    drawFormattedText(ctx, 'Invite you to celebrate the joyous blooming of their love', width / 2, height * 0.70, {
      font: "'Playfair Display', serif",
      fontSize: 26,
      color: '#FFFFFF',
    });
  } else if (sceneIdx === 1) {
    drawFormattedText(ctx, 'CELEBRATING THE WEDDING OF', width / 2, height * 0.28, {
      font: "'Playfair Display', serif",
      fontSize: 28,
      color: '#F4ACB7',
      letterSpacing: 3,
    });

    drawFormattedText(ctx, couple.groomName, width / 2, height * 0.42, {
      font: "'Great Vibes', cursive",
      fontSize: 76,
      gradient: ['#FFF0F3', '#FFCCD5', '#FFF0F3'],
      glow: { color: 'rgba(255, 182, 193, 0.7)', blur: 25 },
    });

    drawFormattedText(ctx, '❦  and  ❦', width / 2, height * 0.54, {
      font: "'Playfair Display', serif",
      fontSize: 34,
      color: '#D88A96',
    });

    drawFormattedText(ctx, couple.brideName, width / 2, height * 0.68, {
      font: "'Great Vibes', cursive",
      fontSize: 76,
      gradient: ['#FFF0F3', '#FFCCD5', '#FFF0F3'],
      glow: { color: 'rgba(255, 182, 193, 0.7)', blur: 25 },
    });
  } else if (sceneIdx === 2) {
    const leftX = width * 0.28;
    const rightX = width * 0.72;
    const photoY = height * 0.44;
    const photoSize = 270;

    if (images.groom) {
      drawCroppedImage(ctx, images.groom, leftX - photoSize / 2, photoY - photoSize / 2, photoSize, photoSize, {
        isCircle: true,
        borderWidth: 6,
        borderColor: '#D88A96',
      });
    }

    drawFormattedText(ctx, couple.groomName, leftX, height * 0.66, {
      font: "'Great Vibes', cursive",
      fontSize: 48,
      color: '#FFF0F3',
    });
    drawFormattedText(ctx, `Son of ${couple.groomParents}`, leftX, height * 0.74, {
      font: "'Cormorant Garamond', serif",
      fontSize: 24,
      color: '#FAD2E1',
      maxWidth: 440,
    });

    if (images.bride) {
      drawCroppedImage(ctx, images.bride, rightX - photoSize / 2, photoY - photoSize / 2, photoSize, photoSize, {
        isCircle: true,
        borderWidth: 6,
        borderColor: '#D88A96',
      });
    }

    drawFormattedText(ctx, couple.brideName, rightX, height * 0.66, {
      font: "'Great Vibes', cursive",
      fontSize: 48,
      color: '#FFF0F3',
    });
    drawFormattedText(ctx, `Daughter of ${couple.brideParents}`, rightX, height * 0.74, {
      font: "'Cormorant Garamond', serif",
      fontSize: 24,
      color: '#FAD2E1',
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
        borderColor: '#F4ACB7',
      });
    }

    const textX = width * 0.72;
    drawFormattedText(ctx, 'WRITTEN IN THE STARS', textX, height * 0.35, {
      font: "'Playfair Display', serif",
      fontSize: 30,
      color: '#F4ACB7',
    });

    drawFormattedText(ctx, `"${project.message.quote || 'You are my today and all of my tomorrows.'}"`, textX, height * 0.48, {
      font: "'Cormorant Garamond', serif",
      fontSize: 32,
      color: '#FFFFFF',
      maxWidth: 580,
      lineHeight: 46,
    });

    drawFormattedText(ctx, `${couple.groomName}  &  ${couple.brideName}`, textX, height * 0.65, {
      font: "'Great Vibes', cursive",
      fontSize: 56,
      color: '#FFCCD5',
    });
  } else if (sceneIdx === 4) {
    drawFormattedText(ctx, 'CELEBRATIONS & CEREMONIES', width / 2, height * 0.16, {
      font: "'Playfair Display', serif",
      fontSize: 40,
      color: '#FFCCD5',
    });

    const ceremonies = project.ceremonies.slice(0, 4);
    const cardWidth = Math.min(380, (width - 160) / Math.max(1, ceremonies.length));
    const totalW = ceremonies.length * cardWidth + (ceremonies.length - 1) * 30;
    const startX = (width - totalW) / 2;

    ceremonies.forEach((c, idx) => {
      const cx = startX + idx * (cardWidth + 30);
      const cy = height * 0.28;
      const ch = height * 0.56;

      ctx.fillStyle = 'rgba(40, 15, 25, 0.85)';
      ctx.strokeStyle = '#F4ACB7';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(cx, cy, cardWidth, ch, 16);
      ctx.fill();
      ctx.stroke();

      const midX = cx + cardWidth / 2;
      drawFormattedText(ctx, c.name, midX, cy + 60, {
        font: "'Playfair Display', serif",
        fontSize: 26,
        color: '#FFCCD5',
        maxWidth: cardWidth - 30,
      });

      drawFormattedText(ctx, c.hindiName || '', midX, cy + 100, {
        font: "'Noto Serif Devanagari', serif",
        fontSize: 20,
        color: '#FAD2E1',
      });

      drawFormattedText(ctx, `📅 ${c.date}`, midX, cy + 175, {
        font: "'Outfit', sans-serif",
        fontSize: 22,
        color: '#FFFFFF',
      });

      drawFormattedText(ctx, `⏰ ${c.time}`, midX, cy + 215, {
        font: "'Outfit', sans-serif",
        fontSize: 22,
        color: '#F4ACB7',
      });

      drawFormattedText(ctx, `📍 ${c.venueName}`, midX, cy + 285, {
        font: "'Cormorant Garamond', serif",
        fontSize: 22,
        color: '#FFFFFF',
        maxWidth: cardWidth - 30,
      });

      drawFormattedText(ctx, c.venueAddress, midX, cy + 340, {
        font: "'Outfit', sans-serif",
        fontSize: 16,
        color: '#E8A598',
        maxWidth: cardWidth - 40,
        lineHeight: 22,
      });
    });
  } else if (sceneIdx === 5) {
    drawFormattedText(ctx, project.message.shlokaHeading || 'Together With Their Families', width / 2, height * 0.24, {
      font: "'Playfair Display', serif",
      fontSize: 38,
      color: '#FFCCD5',
    });

    drawFormattedText(ctx, project.message.bodyText, width / 2, height * 0.46, {
      font: "'Cormorant Garamond', serif",
      fontSize: 32,
      color: '#FFFFFF',
      maxWidth: 1300,
      lineHeight: 52,
    });

    drawFormattedText(ctx, project.message.closingSalutation, width / 2, height * 0.74, {
      font: "'Great Vibes', cursive",
      fontSize: 48,
      color: '#F4ACB7',
      maxWidth: 1100,
    });
  } else {
    drawFormattedText(ctx, '🌸 PLEASE JOIN US TO CELEBRATE 🌸', width / 2, height * 0.28, {
      font: "'Playfair Display', serif",
      fontSize: 34,
      color: '#F4ACB7',
      letterSpacing: 3,
    });

    drawFormattedText(ctx, `${couple.groomName}  &  ${couple.brideName}`, width / 2, height * 0.46, {
      font: "'Great Vibes', cursive",
      fontSize: 82,
      gradient: ['#FFF0F3', '#FFCCD5', '#FFF0F3'],
      glow: { color: 'rgba(255, 182, 193, 0.8)', blur: 30 },
    });

    const mainWedding = project.ceremonies.find((c) => c.key === 'wedding') || project.ceremonies[0];
    if (mainWedding) {
      drawFormattedText(ctx, `${mainWedding.name} • ${mainWedding.date} • ${mainWedding.venueName}`, width / 2, height * 0.64, {
        font: "'Outfit', sans-serif",
        fontSize: 26,
        color: '#FFFFFF',
      });
    }

    drawFormattedText(ctx, 'Your presence is the greatest gift of all', width / 2, height * 0.76, {
      font: "'Cormorant Garamond', serif",
      fontSize: 28,
      color: '#FAD2E1',
    });
  }

  ctx.globalAlpha = 1;
}
