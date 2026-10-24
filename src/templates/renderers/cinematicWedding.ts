import type { WeddingProject } from '../../types/wedding';
import { drawCroppedImage, drawFormattedText, drawGoldenParticles } from './common';

export function renderCinematicWedding(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  duration: number,
  project: WeddingProject,
  images: { bride?: HTMLImageElement; groom?: HTMLImageElement; couple?: HTMLImageElement; family?: HTMLImageElement }
) {
  // Cinematic Film Noir & Warm Amber Anamorphic Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#040406');
  bgGrad.addColorStop(0.5, '#121118');
  bgGrad.addColorStop(1, '#050508');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Anamorphic Warm Lens Flare across canvas center
  ctx.save();
  const flareGrad = ctx.createLinearGradient(0, height / 2, width, height / 2);
  flareGrad.addColorStop(0, 'rgba(255, 160, 50, 0)');
  flareGrad.addColorStop(0.5, 'rgba(255, 190, 80, 0.15)');
  flareGrad.addColorStop(1, 'rgba(255, 160, 50, 0)');
  ctx.fillStyle = flareGrad;
  ctx.fillRect(0, height * 0.45, width, height * 0.1);
  ctx.restore();

  drawGoldenParticles(ctx, width, height, time, '#F59E0B');

  // Cinematic 2.35:1 Letterbox Matte Bars (Top & Bottom)
  const barHeight = 65;
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, barHeight);
  ctx.fillRect(0, height - barHeight, width, barHeight);

  // Subtle gold accent line above and below letterbox
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(80, barHeight);
  ctx.lineTo(width - 80, barHeight);
  ctx.moveTo(80, height - barHeight);
  ctx.lineTo(width - 80, height - barHeight);
  ctx.stroke();

  const sceneDuration = duration / 7;
  const sceneIdx = Math.floor(time / sceneDuration);
  const sceneProgress = (time % sceneDuration) / sceneDuration;
  const fadeIn = Math.min(1, sceneProgress * 4);
  const fadeOut = Math.min(1, (1 - sceneProgress) * 4);
  ctx.globalAlpha = Math.min(fadeIn, fadeOut);

  const couple = project.couple;

  if (sceneIdx === 0) {
    drawFormattedText(ctx, 'A CINEMATIC WEDDING EXPERIENCE', width / 2, height * 0.35, {
      font: "'Outfit', sans-serif",
      fontSize: 26,
      color: '#F59E0B',
      letterSpacing: 8,
    });

    drawFormattedText(ctx, 'FROM THE HOUSES OF', width / 2, height * 0.45, {
      font: "'Cinzel', serif",
      fontSize: 22,
      color: '#A3A3A3',
      letterSpacing: 6,
    });

    drawFormattedText(ctx, `${couple.groomFamily.toUpperCase()}  &  ${couple.brideFamily.toUpperCase()}`, width / 2, height * 0.58, {
      font: "'Cinzel Decorative', serif",
      fontSize: 48,
      gradient: ['#FFFFFF', '#F59E0B', '#FFFFFF'],
      glow: { color: 'rgba(245, 158, 11, 0.7)', blur: 25 },
    });
  } else if (sceneIdx === 1) {
    drawFormattedText(ctx, 'STARRING IN THEIR FOREVER LOVE STORY', width / 2, height * 0.28, {
      font: "'Outfit', sans-serif",
      fontSize: 24,
      color: '#F59E0B',
      letterSpacing: 6,
    });

    drawFormattedText(ctx, couple.groomName.toUpperCase(), width / 2, height * 0.42, {
      font: "'Cinzel', serif",
      fontSize: 66,
      color: '#FFFFFF',
      letterSpacing: 4,
    });

    drawFormattedText(ctx, 'WITH', width / 2, height * 0.54, {
      font: "'Outfit', sans-serif",
      fontSize: 26,
      color: '#F59E0B',
      letterSpacing: 6,
    });

    drawFormattedText(ctx, couple.brideName.toUpperCase(), width / 2, height * 0.68, {
      font: "'Cinzel', serif",
      fontSize: 66,
      color: '#FFFFFF',
      letterSpacing: 4,
    });
  } else if (sceneIdx === 2) {
    const leftX = width * 0.28;
    const rightX = width * 0.72;
    const photoY = height * 0.44;
    const photoSize = 280;

    // Ken Burns slow zoom factor
    const kenBurns = 1 + sceneProgress * 0.15;

    if (images.groom) {
      drawCroppedImage(ctx, images.groom, leftX - photoSize / 2, photoY - photoSize / 2, photoSize, photoSize, {
        zoom: kenBurns,
        borderRadius: 12,
        borderWidth: 3,
        borderColor: '#F59E0B',
      });
    }

    drawFormattedText(ctx, couple.groomName, leftX, height * 0.66, {
      font: "'Cinzel', serif",
      fontSize: 34,
      color: '#FFFFFF',
    });
    drawFormattedText(ctx, `Son of ${couple.groomParents}`, leftX, height * 0.74, {
      font: "'Outfit', sans-serif",
      fontSize: 20,
      color: '#A3A3A3',
      maxWidth: 440,
    });

    if (images.bride) {
      drawCroppedImage(ctx, images.bride, rightX - photoSize / 2, photoY - photoSize / 2, photoSize, photoSize, {
        zoom: kenBurns,
        borderRadius: 12,
        borderWidth: 3,
        borderColor: '#F59E0B',
      });
    }

    drawFormattedText(ctx, couple.brideName, rightX, height * 0.66, {
      font: "'Cinzel', serif",
      fontSize: 34,
      color: '#FFFFFF',
    });
    drawFormattedText(ctx, `Daughter of ${couple.brideParents}`, rightX, height * 0.74, {
      font: "'Outfit', sans-serif",
      fontSize: 20,
      color: '#A3A3A3',
      maxWidth: 440,
    });
  } else if (sceneIdx === 3) {
    const imgW = 620;
    const imgH = 420;
    const photoX = width * 0.32 - imgW / 2;
    const photoY = height / 2 - imgH / 2;
    const kenBurns = 1 + sceneProgress * 0.12;

    if (images.couple) {
      drawCroppedImage(ctx, images.couple, photoX, photoY, imgW, imgH, {
        zoom: kenBurns,
        borderRadius: 12,
        borderWidth: 4,
        borderColor: '#F59E0B',
      });
    }

    const textX = width * 0.72;
    drawFormattedText(ctx, 'THE PREMIERE OF TOGETHERNESS', textX, height * 0.35, {
      font: "'Outfit', sans-serif",
      fontSize: 24,
      color: '#F59E0B',
      letterSpacing: 4,
    });

    drawFormattedText(ctx, `"${project.message.quote || 'In all the world, there is no heart for me like yours.'}"`, textX, height * 0.48, {
      font: "'Playfair Display', serif",
      fontSize: 32,
      color: '#FFFFFF',
      maxWidth: 580,
      lineHeight: 46,
    });

    drawFormattedText(ctx, `${couple.groomName}  &  ${couple.brideName}`, textX, height * 0.65, {
      font: "'Cinzel', serif",
      fontSize: 46,
      gradient: ['#FFFFFF', '#F59E0B', '#FFFFFF'],
    });
  } else if (sceneIdx === 4) {
    drawFormattedText(ctx, 'CINEMATIC EVENT SCHEDULE', width / 2, height * 0.18, {
      font: "'Cinzel', serif",
      fontSize: 38,
      gradient: ['#FFFFFF', '#F59E0B', '#FFFFFF'],
      letterSpacing: 6,
    });

    const ceremonies = project.ceremonies.slice(0, 4);
    const cardWidth = Math.min(380, (width - 160) / Math.max(1, ceremonies.length));
    const totalW = ceremonies.length * cardWidth + (ceremonies.length - 1) * 30;
    const startX = (width - totalW) / 2;

    ceremonies.forEach((c, idx) => {
      const cx = startX + idx * (cardWidth + 30);
      const cy = height * 0.28;
      const ch = height * 0.54;

      ctx.fillStyle = '#0E0E14';
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(cx, cy, cardWidth, ch, 8);
      ctx.fill();
      ctx.stroke();

      const midX = cx + cardWidth / 2;
      drawFormattedText(ctx, c.name, midX, cy + 55, {
        font: "'Cinzel', serif",
        fontSize: 22,
        color: '#FFFFFF',
        maxWidth: cardWidth - 30,
      });

      drawFormattedText(ctx, `DATE: ${c.date}`, midX, cy + 140, {
        font: "'Outfit', sans-serif",
        fontSize: 20,
        color: '#F59E0B',
      });

      drawFormattedText(ctx, `TIME: ${c.time}`, midX, cy + 185, {
        font: "'Outfit', sans-serif",
        fontSize: 20,
        color: '#FFFFFF',
      });

      drawFormattedText(ctx, c.venueName, midX, cy + 260, {
        font: "'Playfair Display', serif",
        fontSize: 22,
        color: '#FFFFFF',
        maxWidth: cardWidth - 30,
      });

      drawFormattedText(ctx, c.venueAddress, midX, cy + 315, {
        font: "'Outfit', sans-serif",
        fontSize: 15,
        color: '#A3A3A3',
        maxWidth: cardWidth - 40,
        lineHeight: 22,
      });
    });
  } else if (sceneIdx === 5) {
    drawFormattedText(ctx, project.message.shlokaHeading || '॥ श्री गणेशाय नमः ॥', width / 2, height * 0.24, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 38,
      color: '#F59E0B',
    });

    drawFormattedText(ctx, project.message.bodyText, width / 2, height * 0.46, {
      font: "'Cormorant Garamond', serif",
      fontSize: 32,
      color: '#FFFFFF',
      maxWidth: 1300,
      lineHeight: 52,
    });

    drawFormattedText(ctx, project.message.closingSalutation, width / 2, height * 0.74, {
      font: "'Cinzel', serif",
      fontSize: 30,
      color: '#F59E0B',
      maxWidth: 1100,
      lineHeight: 46,
    });
  } else {
    drawFormattedText(ctx, 'COMING TO CELEBRATE WITH YOU', width / 2, height * 0.28, {
      font: "'Outfit', sans-serif",
      fontSize: 26,
      color: '#F59E0B',
      letterSpacing: 6,
    });

    drawFormattedText(ctx, `${couple.groomName.toUpperCase()}  &  ${couple.brideName.toUpperCase()}`, width / 2, height * 0.46, {
      font: "'Cinzel', serif",
      fontSize: 68,
      gradient: ['#FFFFFF', '#F59E0B', '#FFFFFF'],
      glow: { color: 'rgba(245, 158, 11, 0.8)', blur: 30 },
    });

    const mainWedding = project.ceremonies.find((c) => c.key === 'wedding') || project.ceremonies[0];
    if (mainWedding) {
      drawFormattedText(ctx, `${mainWedding.name} • ${mainWedding.date} • ${mainWedding.venueName}`, width / 2, height * 0.64, {
        font: "'Outfit', sans-serif",
        fontSize: 24,
        color: '#FFFFFF',
      });
    }

    drawFormattedText(ctx, 'Be our special guest on our big day', width / 2, height * 0.76, {
      font: "'Cormorant Garamond', serif",
      fontSize: 26,
      color: '#A3A3A3',
    });
  }

  ctx.globalAlpha = 1;
}
