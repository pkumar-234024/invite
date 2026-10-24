import type { WeddingProject } from '../../types/wedding';
import { drawCroppedImage, drawFormattedText, drawGoldenParticles } from './common';

export function renderRoyalRajasthani(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  duration: number,
  project: WeddingProject,
  images: { bride?: HTMLImageElement; groom?: HTMLImageElement; couple?: HTMLImageElement; family?: HTMLImageElement }
) {
  // 1. Rajasthani Fort Red Sandstone & Desert Gold Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#42020B');
  bgGrad.addColorStop(0.5, '#730C1E');
  bgGrad.addColorStop(1, '#2E0007');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Rajasthani Jharokha Scalloped Arch in Background
  ctx.save();
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  // Draw grand Rajasthani multi-foil arch
  ctx.moveTo(width * 0.1, height * 0.9);
  ctx.lineTo(width * 0.1, height * 0.35);
  ctx.bezierCurveTo(width * 0.1, height * 0.1, width * 0.35, height * 0.05, width * 0.5, height * 0.05);
  ctx.bezierCurveTo(width * 0.65, height * 0.05, width * 0.9, height * 0.1, width * 0.9, height * 0.35);
  ctx.lineTo(width * 0.9, height * 0.9);
  ctx.stroke();

  // Emerald green and gold ornamental band
  ctx.strokeStyle = '#0F5257';
  ctx.lineWidth = 6;
  ctx.strokeRect(30, 30, width - 60, height - 60);
  ctx.strokeStyle = '#E5C158';
  ctx.lineWidth = 2;
  ctx.strokeRect(42, 42, width - 84, height - 84);
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
    drawFormattedText(ctx, '॥ खम्मा घणी सा ॥', width / 2, height * 0.32, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 52,
      gradient: ['#FFEAA7', '#E5C158', '#FFEAA7'],
      glow: { color: 'rgba(229, 193, 88, 0.6)', blur: 20 },
    });

    drawFormattedText(ctx, 'ROYAL RAJASTHANI HERITAGE WEDDING', width / 2, height * 0.46, {
      font: "'Cinzel', serif",
      fontSize: 34,
      color: '#E8D5B5',
      letterSpacing: 4,
    });

    drawFormattedText(ctx, `${couple.groomFamily} & ${couple.brideFamily}`, width / 2, height * 0.60, {
      font: "'Cinzel Decorative', serif",
      fontSize: 42,
      gradient: ['#FFF3BF', '#E5C158', '#D4AF37'],
    });

    drawFormattedText(ctx, 'Cordially request the honour of your auspicious presence', width / 2, height * 0.70, {
      font: "'Cormorant Garamond', serif",
      fontSize: 30,
      color: '#F4ECE1',
    });
  } else if (sceneIdx === 1) {
    drawFormattedText(ctx, 'CELEBRATING THE ROYAL UNION', width / 2, height * 0.28, {
      font: "'Cinzel', serif",
      fontSize: 28,
      color: '#E5C158',
    });

    drawFormattedText(ctx, `Banna Sa ${couple.groomName.toUpperCase()}`, width / 2, height * 0.42, {
      font: "'Cinzel Decorative', serif",
      fontSize: 60,
      gradient: ['#FFF3BF', '#E5C158', '#FFDF73'],
      glow: { color: 'rgba(212, 175, 55, 0.7)', blur: 25 },
    });

    drawFormattedText(ctx, '— weds —', width / 2, height * 0.54, {
      font: "'Great Vibes', cursive",
      fontSize: 50,
      color: '#E5C158',
    });

    drawFormattedText(ctx, `Baisa ${couple.brideName.toUpperCase()}`, width / 2, height * 0.68, {
      font: "'Cinzel Decorative', serif",
      fontSize: 60,
      gradient: ['#FFF3BF', '#E5C158', '#FFDF73'],
      glow: { color: 'rgba(212, 175, 55, 0.7)', blur: 25 },
    });
  } else if (sceneIdx === 2) {
    const leftX = width * 0.28;
    const rightX = width * 0.72;
    const photoY = height * 0.44;
    const photoSize = 280;

    if (images.groom) {
      drawCroppedImage(ctx, images.groom, leftX - photoSize / 2, photoY - photoSize / 2, photoSize, photoSize, {
        borderRadius: 24,
        borderWidth: 6,
        borderColor: '#E5C158',
      });
    }

    drawFormattedText(ctx, couple.groomName, leftX, height * 0.66, {
      font: "'Cinzel', serif",
      fontSize: 34,
      gradient: ['#FFEAA7', '#E5C158', '#FFEAA7'],
    });
    drawFormattedText(ctx, `Son of ${couple.groomParents}`, leftX, height * 0.74, {
      font: "'Cormorant Garamond', serif",
      fontSize: 24,
      color: '#E8D5B5',
      maxWidth: 440,
    });

    if (images.bride) {
      drawCroppedImage(ctx, images.bride, rightX - photoSize / 2, photoY - photoSize / 2, photoSize, photoSize, {
        borderRadius: 24,
        borderWidth: 6,
        borderColor: '#E5C158',
      });
    }

    drawFormattedText(ctx, couple.brideName, rightX, height * 0.66, {
      font: "'Cinzel', serif",
      fontSize: 34,
      gradient: ['#FFEAA7', '#E5C158', '#FFEAA7'],
    });
    drawFormattedText(ctx, `Daughter of ${couple.brideParents}`, rightX, height * 0.74, {
      font: "'Cormorant Garamond', serif",
      fontSize: 24,
      color: '#E8D5B5',
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
        borderColor: '#E5C158',
      });
    }

    const textX = width * 0.72;
    drawFormattedText(ctx, 'A HERITAGE OF ETERNAL LOVE', textX, height * 0.35, {
      font: "'Cinzel', serif",
      fontSize: 30,
      color: '#E5C158',
    });

    drawFormattedText(ctx, `"${project.message.quote || 'As royal as the desert sands, as timeless as the palaces.'}"`, textX, height * 0.48, {
      font: "'Playfair Display', serif",
      fontSize: 30,
      color: '#FFF6E6',
      maxWidth: 580,
      lineHeight: 46,
    });

    drawFormattedText(ctx, `${couple.groomName}  &  ${couple.brideName}`, textX, height * 0.65, {
      font: "'Great Vibes', cursive",
      fontSize: 54,
      gradient: ['#FFEAA7', '#E5C158', '#FFDF73'],
    });
  } else if (sceneIdx === 4) {
    drawFormattedText(ctx, 'RAJASTHANI ROYAL CEREMONIES', width / 2, height * 0.16, {
      font: "'Cinzel Decorative', serif",
      fontSize: 40,
      gradient: ['#FFEAA7', '#E5C158', '#FFEAA7'],
    });

    const ceremonies = project.ceremonies.slice(0, 4);
    const cardWidth = Math.min(380, (width - 160) / Math.max(1, ceremonies.length));
    const totalW = ceremonies.length * cardWidth + (ceremonies.length - 1) * 30;
    const startX = (width - totalW) / 2;

    ceremonies.forEach((c, idx) => {
      const cx = startX + idx * (cardWidth + 30);
      const cy = height * 0.28;
      const ch = height * 0.56;

      ctx.fillStyle = 'rgba(25, 2, 7, 0.85)';
      ctx.strokeStyle = '#E5C158';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(cx, cy, cardWidth, ch, 14);
      ctx.fill();
      ctx.stroke();

      const midX = cx + cardWidth / 2;
      drawFormattedText(ctx, c.hindiName || c.name, midX, cy + 60, {
        font: "'Noto Serif Devanagari', serif",
        fontSize: 28,
        gradient: ['#FFEAA7', '#E5C158', '#FFEAA7'],
        maxWidth: cardWidth - 30,
      });

      drawFormattedText(ctx, c.name, midX, cy + 105, {
        font: "'Cinzel', serif",
        fontSize: 20,
        color: '#E8D5B5',
        maxWidth: cardWidth - 30,
      });

      drawFormattedText(ctx, `📅 ${c.date}`, midX, cy + 175, {
        font: "'Outfit', sans-serif",
        fontSize: 22,
        color: '#FFFFFF',
      });

      drawFormattedText(ctx, `⏰ ${c.time}`, midX, cy + 215, {
        font: "'Outfit', sans-serif",
        fontSize: 22,
        color: '#E5C158',
      });

      drawFormattedText(ctx, `📍 ${c.venueName}`, midX, cy + 285, {
        font: "'Cormorant Garamond', serif",
        fontSize: 22,
        color: '#FDFBF7',
        maxWidth: cardWidth - 30,
      });

      drawFormattedText(ctx, c.venueAddress, midX, cy + 340, {
        font: "'Outfit', sans-serif",
        fontSize: 16,
        color: '#D4AF37',
        maxWidth: cardWidth - 40,
        lineHeight: 22,
      });
    });
  } else if (sceneIdx === 5) {
    drawFormattedText(ctx, project.message.shlokaHeading || '॥ श्री गणेशाय नमः ॥', width / 2, height * 0.24, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 40,
      gradient: ['#FFEAA7', '#E5C158', '#FFEAA7'],
    });

    drawFormattedText(ctx, project.message.bodyText, width / 2, height * 0.46, {
      font: "'Noto Serif Devanagari', 'Cormorant Garamond', serif",
      fontSize: 30,
      color: '#FFF8EB',
      maxWidth: 1300,
      lineHeight: 52,
    });

    drawFormattedText(ctx, project.message.closingSalutation, width / 2, height * 0.74, {
      font: "'Cinzel', 'Noto Serif Devanagari', serif",
      fontSize: 32,
      color: '#E5C158',
      maxWidth: 1100,
      lineHeight: 46,
    });
  } else {
    drawFormattedText(ctx, '॥ पधारो म्हारे देश ॥', width / 2, height * 0.26, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 54,
      gradient: ['#FFF3BF', '#E5C158', '#FFF3BF'],
      glow: { color: 'rgba(229, 193, 88, 0.7)', blur: 25 },
    });

    drawFormattedText(ctx, 'AWAITING YOUR ROYAL PRESENCE', width / 2, height * 0.38, {
      font: "'Cinzel', serif",
      fontSize: 28,
      color: '#E8D5B5',
      letterSpacing: 4,
    });

    drawFormattedText(ctx, `${couple.groomName}  &  ${couple.brideName}`, width / 2, height * 0.52, {
      font: "'Great Vibes', cursive",
      fontSize: 74,
      gradient: ['#FFEAA7', '#E5C158', '#FFDF73'],
    });

    const mainWedding = project.ceremonies.find((c) => c.key === 'wedding') || project.ceremonies[0];
    if (mainWedding) {
      drawFormattedText(ctx, `${mainWedding.name} • ${mainWedding.date} • ${mainWedding.venueName}`, width / 2, height * 0.68, {
        font: "'Outfit', sans-serif",
        fontSize: 26,
        color: '#FFFFFF',
      });
    }

    drawFormattedText(ctx, 'सादर आमंत्रित: समस्त राठौड़ एवं शेखावत परिवार', width / 2, height * 0.78, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 28,
      color: '#E5C158',
    });
  }

  ctx.globalAlpha = 1;
}
