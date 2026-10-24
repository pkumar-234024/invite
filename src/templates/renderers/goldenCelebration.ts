import type { WeddingProject } from '../../types/wedding';
import { drawCroppedImage, drawFormattedText, drawGoldenParticles } from './common';

export function renderGoldenCelebration(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  duration: number,
  project: WeddingProject,
  images: { bride?: HTMLImageElement; groom?: HTMLImageElement; couple?: HTMLImageElement; family?: HTMLImageElement }
) {
  // Midnight Noir with center golden radial radiance
  const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 80, width / 2, height / 2, width * 0.7);
  bgGrad.addColorStop(0, '#1C1914');
  bgGrad.addColorStop(0.4, '#100F0D');
  bgGrad.addColorStop(1, '#050506');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Intense 24k Gold Particle Showers
  drawGoldenParticles(ctx, width, height, time, '#FFD700');
  drawGoldenParticles(ctx, width, height, time * 1.5, '#FFF2A8');

  // Ornate Double Gold Border
  ctx.save();
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 4;
  ctx.strokeRect(30, 30, width - 60, height - 60);
  ctx.strokeStyle = '#FFE57F';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(42, 42, width - 84, height - 84);
  ctx.restore();

  const sceneDuration = duration / 7;
  const sceneIdx = Math.floor(time / sceneDuration);
  const sceneProgress = (time % sceneDuration) / sceneDuration;
  const fadeIn = Math.min(1, sceneProgress * 4);
  const fadeOut = Math.min(1, (1 - sceneProgress) * 4);
  ctx.globalAlpha = Math.min(fadeIn, fadeOut);

  const couple = project.couple;

  if (sceneIdx === 0) {
    drawFormattedText(ctx, 'A GOLDEN CELEBRATION OF LOVE', width / 2, height * 0.32, {
      font: "'Cinzel', serif",
      fontSize: 34,
      gradient: ['#FFF8D6', '#FFD700', '#FFE57F'],
      glow: { color: 'rgba(255, 215, 0, 0.8)', blur: 25 },
      letterSpacing: 6,
    });

    drawFormattedText(ctx, 'Together with their families', width / 2, height * 0.46, {
      font: "'Cormorant Garamond', serif",
      fontSize: 36,
      color: '#E0D5BE',
    });

    drawFormattedText(ctx, `${couple.groomFamily} & ${couple.brideFamily}`, width / 2, height * 0.58, {
      font: "'Cinzel Decorative', serif",
      fontSize: 46,
      gradient: ['#FFF8D6', '#FFD700', '#D4AF37'],
      glow: { color: 'rgba(255, 215, 0, 0.6)', blur: 20 },
    });

    drawFormattedText(ctx, 'Request the honor of your presence', width / 2, height * 0.70, {
      font: "'Cormorant Garamond', serif",
      fontSize: 28,
      color: '#F4ECE1',
    });
  } else if (sceneIdx === 1) {
    drawFormattedText(ctx, 'CORDIALLY INVITE YOU TO THE WEDDING OF', width / 2, height * 0.28, {
      font: "'Cinzel', serif",
      fontSize: 28,
      color: '#FFD700',
    });

    drawFormattedText(ctx, couple.groomName.toUpperCase(), width / 2, height * 0.42, {
      font: "'Cinzel Decorative', serif",
      fontSize: 66,
      gradient: ['#FFF8D6', '#FFD700', '#D4AF37'],
      glow: { color: 'rgba(255, 215, 0, 0.9)', blur: 30 },
    });

    drawFormattedText(ctx, '— & —', width / 2, height * 0.54, {
      font: "'Cormorant Garamond', serif",
      fontSize: 44,
      color: '#FFE57F',
    });

    drawFormattedText(ctx, couple.brideName.toUpperCase(), width / 2, height * 0.68, {
      font: "'Cinzel Decorative', serif",
      fontSize: 66,
      gradient: ['#FFF8D6', '#FFD700', '#D4AF37'],
      glow: { color: 'rgba(255, 215, 0, 0.9)', blur: 30 },
    });
  } else if (sceneIdx === 2) {
    const leftX = width * 0.28;
    const rightX = width * 0.72;
    const photoY = height * 0.44;
    const photoSize = 280;

    if (images.groom) {
      drawCroppedImage(ctx, images.groom, leftX - photoSize / 2, photoY - photoSize / 2, photoSize, photoSize, {
        borderRadius: 20,
        borderWidth: 5,
        borderColor: '#FFD700',
      });
    }

    drawFormattedText(ctx, couple.groomName, leftX, height * 0.66, {
      font: "'Cinzel', serif",
      fontSize: 34,
      gradient: ['#FFF8D6', '#FFD700', '#D4AF37'],
    });
    drawFormattedText(ctx, `Son of ${couple.groomParents}`, leftX, height * 0.74, {
      font: "'Cormorant Garamond', serif",
      fontSize: 24,
      color: '#E0D5BE',
      maxWidth: 440,
    });

    if (images.bride) {
      drawCroppedImage(ctx, images.bride, rightX - photoSize / 2, photoY - photoSize / 2, photoSize, photoSize, {
        borderRadius: 20,
        borderWidth: 5,
        borderColor: '#FFD700',
      });
    }

    drawFormattedText(ctx, couple.brideName, rightX, height * 0.66, {
      font: "'Cinzel', serif",
      fontSize: 34,
      gradient: ['#FFF8D6', '#FFD700', '#D4AF37'],
    });
    drawFormattedText(ctx, `Daughter of ${couple.brideParents}`, rightX, height * 0.74, {
      font: "'Cormorant Garamond', serif",
      fontSize: 24,
      color: '#E0D5BE',
      maxWidth: 440,
    });
  } else if (sceneIdx === 3) {
    const imgW = 600;
    const imgH = 420;
    const photoX = width * 0.32 - imgW / 2;
    const photoY = height / 2 - imgH / 2;

    if (images.couple) {
      drawCroppedImage(ctx, images.couple, photoX, photoY, imgW, imgH, {
        borderRadius: 20,
        borderWidth: 6,
        borderColor: '#FFD700',
      });
    }

    const textX = width * 0.72;
    drawFormattedText(ctx, 'AN ETERNAL BOND OF LOVE', textX, height * 0.35, {
      font: "'Cinzel', serif",
      fontSize: 30,
      color: '#FFD700',
    });

    drawFormattedText(ctx, `"${project.message.quote || 'Two lives, two hearts, joined together in friendship, united forever in love.'}"`, textX, height * 0.48, {
      font: "'Playfair Display', serif",
      fontSize: 30,
      color: '#FFFFFF',
      maxWidth: 580,
      lineHeight: 46,
    });

    drawFormattedText(ctx, `${couple.groomName}  &  ${couple.brideName}`, textX, height * 0.65, {
      font: "'Great Vibes', cursive",
      fontSize: 56,
      gradient: ['#FFF8D6', '#FFD700', '#FFE57F'],
      glow: { color: 'rgba(255, 215, 0, 0.7)', blur: 25 },
    });
  } else if (sceneIdx === 4) {
    drawFormattedText(ctx, 'GOLDEN WEDDING FESTIVITIES', width / 2, height * 0.16, {
      font: "'Cinzel Decorative', serif",
      fontSize: 40,
      gradient: ['#FFF8D6', '#FFD700', '#D4AF37'],
      glow: { color: 'rgba(255, 215, 0, 0.6)', blur: 15 },
    });

    const ceremonies = project.ceremonies.slice(0, 4);
    const cardWidth = Math.min(380, (width - 160) / Math.max(1, ceremonies.length));
    const totalW = ceremonies.length * cardWidth + (ceremonies.length - 1) * 30;
    const startX = (width - totalW) / 2;

    ceremonies.forEach((c, idx) => {
      const cx = startX + idx * (cardWidth + 30);
      const cy = height * 0.28;
      const ch = height * 0.56;

      ctx.fillStyle = '#14120F';
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(cx, cy, cardWidth, ch, 14);
      ctx.fill();
      ctx.stroke();

      const midX = cx + cardWidth / 2;
      drawFormattedText(ctx, c.name, midX, cy + 60, {
        font: "'Cinzel', serif",
        fontSize: 24,
        gradient: ['#FFF8D6', '#FFD700', '#D4AF37'],
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
        color: '#FFD700',
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
        color: '#C7A779',
        maxWidth: cardWidth - 40,
        lineHeight: 22,
      });
    });
  } else if (sceneIdx === 5) {
    drawFormattedText(ctx, project.message.shlokaHeading || '॥ श्री गणेशाय नमः ॥', width / 2, height * 0.24, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 40,
      gradient: ['#FFF8D6', '#FFD700', '#D4AF37'],
      glow: { color: 'rgba(255, 215, 0, 0.7)', blur: 20 },
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
      fontSize: 32,
      color: '#FFD700',
      maxWidth: 1100,
      lineHeight: 46,
    });
  } else {
    drawFormattedText(ctx, 'WE LOOK FORWARD TO CELEBRATING WITH YOU', width / 2, height * 0.28, {
      font: "'Cinzel', serif",
      fontSize: 30,
      color: '#FFD700',
      letterSpacing: 4,
    });

    drawFormattedText(ctx, `${couple.groomName}  &  ${couple.brideName}`, width / 2, height * 0.48, {
      font: "'Great Vibes', cursive",
      fontSize: 78,
      gradient: ['#FFF8D6', '#FFD700', '#FFE57F'],
      glow: { color: 'rgba(255, 215, 0, 0.9)', blur: 30 },
    });

    const mainWedding = project.ceremonies.find((c) => c.key === 'wedding') || project.ceremonies[0];
    if (mainWedding) {
      drawFormattedText(ctx, `${mainWedding.name} • ${mainWedding.date} • ${mainWedding.venueName}`, width / 2, height * 0.66, {
        font: "'Outfit', sans-serif",
        fontSize: 26,
        color: '#FFFFFF',
      });
    }

    drawFormattedText(ctx, 'Warmest blessings & regards', width / 2, height * 0.77, {
      font: "'Cormorant Garamond', serif",
      fontSize: 26,
      color: '#E0D5BE',
    });
  }

  ctx.globalAlpha = 1;
}
