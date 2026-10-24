import type { WeddingProject } from '../../types/wedding';
import { drawCroppedImage, drawFormattedText, drawGoldenParticles } from './common';

export function renderClassicIndian(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  duration: number,
  project: WeddingProject,
  images: { bride?: HTMLImageElement; groom?: HTMLImageElement; couple?: HTMLImageElement; family?: HTMLImageElement }
) {
  // Heritage Crimson Silk & Warm Royal Cream Card
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#42040D');
  bgGrad.addColorStop(0.5, '#610B18');
  bgGrad.addColorStop(1, '#2E0208');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Classic Paisley / Kalka & Gold Foil Formal Border
  ctx.save();
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 4;
  ctx.strokeRect(35, 35, width - 70, height - 70);

  ctx.strokeStyle = '#FFF8E7';
  ctx.lineWidth = 1;
  ctx.strokeRect(45, 45, width - 90, height - 90);

  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 6]);
  ctx.strokeRect(55, 55, width - 110, height - 110);
  ctx.setLineDash([]);
  ctx.restore();

  drawGoldenParticles(ctx, width, height, time, '#FFDF73');

  const sceneDuration = duration / 7;
  const sceneIdx = Math.floor(time / sceneDuration);
  const sceneProgress = (time % sceneDuration) / sceneDuration;
  const fadeIn = Math.min(1, sceneProgress * 4);
  const fadeOut = Math.min(1, (1 - sceneProgress) * 4);
  ctx.globalAlpha = Math.min(fadeIn, fadeOut);

  const couple = project.couple;

  if (sceneIdx === 0) {
    drawFormattedText(ctx, '॥ ॐ नमो भगवते वासुदेवाय ॥', width / 2, height * 0.32, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 46,
      gradient: ['#FFF8E7', '#D4AF37', '#FFF8E7'],
      glow: { color: 'rgba(212, 175, 55, 0.7)', blur: 20 },
    });

    drawFormattedText(ctx, 'A CLASSIC INDIAN WEDDING INVITATION', width / 2, height * 0.46, {
      font: "'Cinzel', serif",
      fontSize: 32,
      color: '#FFF8E7',
      letterSpacing: 4,
    });

    drawFormattedText(ctx, `${couple.groomFamily} & ${couple.brideFamily}`, width / 2, height * 0.58, {
      font: "'Cinzel Decorative', serif",
      fontSize: 44,
      gradient: ['#FFF8E7', '#E5C158', '#D4AF37'],
    });

    drawFormattedText(ctx, 'Solicit your gracious presence on the holy nuptials of their children', width / 2, height * 0.70, {
      font: "'Cormorant Garamond', serif",
      fontSize: 30,
      color: '#FFFFFF',
    });
  } else if (sceneIdx === 1) {
    drawFormattedText(ctx, 'CELEBRATING THE WEDDING OF', width / 2, height * 0.28, {
      font: "'Cinzel', serif",
      fontSize: 28,
      color: '#D4AF37',
    });

    drawFormattedText(ctx, couple.groomName.toUpperCase(), width / 2, height * 0.42, {
      font: "'Cinzel', serif",
      fontSize: 64,
      gradient: ['#FFF8E7', '#D4AF37', '#FFF8E7'],
      glow: { color: 'rgba(212, 175, 55, 0.8)', blur: 25 },
    });

    drawFormattedText(ctx, '— weds —', width / 2, height * 0.54, {
      font: "'Great Vibes', cursive",
      fontSize: 48,
      color: '#D4AF37',
    });

    drawFormattedText(ctx, couple.brideName.toUpperCase(), width / 2, height * 0.68, {
      font: "'Cinzel', serif",
      fontSize: 64,
      gradient: ['#FFF8E7', '#D4AF37', '#FFF8E7'],
      glow: { color: 'rgba(212, 175, 55, 0.8)', blur: 25 },
    });
  } else if (sceneIdx === 2) {
    const leftX = width * 0.28;
    const rightX = width * 0.72;
    const photoY = height * 0.44;
    const photoSize = 280;

    if (images.groom) {
      drawCroppedImage(ctx, images.groom, leftX - photoSize / 2, photoY - photoSize / 2, photoSize, photoSize, {
        borderRadius: 16,
        borderWidth: 5,
        borderColor: '#D4AF37',
      });
    }

    drawFormattedText(ctx, couple.groomName, leftX, height * 0.66, {
      font: "'Cinzel', serif",
      fontSize: 34,
      gradient: ['#FFF8E7', '#D4AF37', '#FFF8E7'],
    });
    drawFormattedText(ctx, `Son of ${couple.groomParents}`, leftX, height * 0.74, {
      font: "'Cormorant Garamond', serif",
      fontSize: 24,
      color: '#FFF8E7',
      maxWidth: 440,
    });

    if (images.bride) {
      drawCroppedImage(ctx, images.bride, rightX - photoSize / 2, photoY - photoSize / 2, photoSize, photoSize, {
        borderRadius: 16,
        borderWidth: 5,
        borderColor: '#D4AF37',
      });
    }

    drawFormattedText(ctx, couple.brideName, rightX, height * 0.66, {
      font: "'Cinzel', serif",
      fontSize: 34,
      gradient: ['#FFF8E7', '#D4AF37', '#FFF8E7'],
    });
    drawFormattedText(ctx, `Daughter of ${couple.brideParents}`, rightX, height * 0.74, {
      font: "'Cormorant Garamond', serif",
      fontSize: 24,
      color: '#FFF8E7',
      maxWidth: 440,
    });
  } else if (sceneIdx === 3) {
    const imgW = 600;
    const imgH = 420;
    const photoX = width * 0.32 - imgW / 2;
    const photoY = height / 2 - imgH / 2;

    if (images.couple) {
      drawCroppedImage(ctx, images.couple, photoX, photoY, imgW, imgH, {
        borderRadius: 16,
        borderWidth: 6,
        borderColor: '#D4AF37',
      });
    }

    const textX = width * 0.72;
    drawFormattedText(ctx, 'A TIMELESS COMMITMENT', textX, height * 0.35, {
      font: "'Cinzel', serif",
      fontSize: 30,
      color: '#D4AF37',
    });

    drawFormattedText(ctx, `"${project.message.quote || 'True love stands the test of time, blessed by family and tradition.'}"`, textX, height * 0.48, {
      font: "'Playfair Display', serif",
      fontSize: 30,
      color: '#FFFFFF',
      maxWidth: 580,
      lineHeight: 46,
    });

    drawFormattedText(ctx, `${couple.groomName}  &  ${couple.brideName}`, textX, height * 0.65, {
      font: "'Great Vibes', cursive",
      fontSize: 54,
      color: '#FFDF73',
    });
  } else if (sceneIdx === 4) {
    drawFormattedText(ctx, 'PROGRAMME & CEREMONIES', width / 2, height * 0.16, {
      font: "'Cinzel Decorative', serif",
      fontSize: 40,
      gradient: ['#FFF8E7', '#D4AF37', '#FFF8E7'],
    });

    const ceremonies = project.ceremonies.slice(0, 4);
    const cardWidth = Math.min(380, (width - 160) / Math.max(1, ceremonies.length));
    const totalW = ceremonies.length * cardWidth + (ceremonies.length - 1) * 30;
    const startX = (width - totalW) / 2;

    ceremonies.forEach((c, idx) => {
      const cx = startX + idx * (cardWidth + 30);
      const cy = height * 0.28;
      const ch = height * 0.56;

      ctx.fillStyle = '#260207';
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(cx, cy, cardWidth, ch, 12);
      ctx.fill();
      ctx.stroke();

      const midX = cx + cardWidth / 2;
      drawFormattedText(ctx, c.name, midX, cy + 60, {
        font: "'Cinzel', serif",
        fontSize: 24,
        color: '#D4AF37',
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
        color: '#D4AF37',
      });

      drawFormattedText(ctx, `📍 ${c.venueName}`, midX, cy + 270, {
        font: "'Cormorant Garamond', serif",
        fontSize: 22,
        color: '#FFF8E7',
        maxWidth: cardWidth - 30,
      });

      drawFormattedText(ctx, c.venueAddress, midX, cy + 325, {
        font: "'Outfit', sans-serif",
        fontSize: 16,
        color: '#E8D5B5',
        maxWidth: cardWidth - 40,
        lineHeight: 22,
      });
    });
  } else if (sceneIdx === 5) {
    drawFormattedText(ctx, project.message.shlokaHeading || '॥ श्री गणेशाय नमः ॥', width / 2, height * 0.24, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 40,
      color: '#D4AF37',
    });

    drawFormattedText(ctx, project.message.bodyText, width / 2, height * 0.46, {
      font: "'Cormorant Garamond', serif",
      fontSize: 32,
      color: '#FFF8E7',
      maxWidth: 1300,
      lineHeight: 52,
    });

    drawFormattedText(ctx, project.message.closingSalutation, width / 2, height * 0.74, {
      font: "'Cinzel', serif",
      fontSize: 32,
      color: '#D4AF37',
      maxWidth: 1100,
      lineHeight: 46,
    });
  } else {
    drawFormattedText(ctx, '॥ सादर निमंत्रण ॥', width / 2, height * 0.28, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 54,
      gradient: ['#FFF8E7', '#D4AF37', '#FFF8E7'],
      glow: { color: 'rgba(212, 175, 55, 0.8)', blur: 25 },
    });

    drawFormattedText(ctx, `${couple.groomName}  &  ${couple.brideName}`, width / 2, height * 0.48, {
      font: "'Cinzel', serif",
      fontSize: 66,
      gradient: ['#FFF8E7', '#D4AF37', '#FFF8E7'],
    });

    const mainWedding = project.ceremonies.find((c) => c.key === 'wedding') || project.ceremonies[0];
    if (mainWedding) {
      drawFormattedText(ctx, `${mainWedding.name} • ${mainWedding.date} • ${mainWedding.venueName}`, width / 2, height * 0.66, {
        font: "'Outfit', sans-serif",
        fontSize: 26,
        color: '#FFFFFF',
      });
    }

    drawFormattedText(ctx, 'With best compliments from family and friends', width / 2, height * 0.77, {
      font: "'Cormorant Garamond', serif",
      fontSize: 26,
      color: '#FFF8E7',
    });
  }

  ctx.globalAlpha = 1;
}
