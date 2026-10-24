import type { WeddingProject } from '../../types/wedding';
import { drawCroppedImage, drawFormattedText, drawGaneshMotif, drawGoldenParticles, drawMandala } from './common';

export function renderShubhVivah(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  duration: number,
  project: WeddingProject,
  images: { bride?: HTMLImageElement; groom?: HTMLImageElement; couple?: HTMLImageElement; family?: HTMLImageElement }
) {
  // 1. Auspicious Crimson & Rich Ivory Backdrop
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#FFFDF8');
  bgGrad.addColorStop(0.3, '#FAF0E4');
  bgGrad.addColorStop(0.7, '#F2DCBF');
  bgGrad.addColorStop(1, '#E8C59A');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Traditional Crimson & Gold Frame
  ctx.save();
  ctx.strokeStyle = '#8B0000';
  ctx.lineWidth = 14;
  ctx.strokeRect(20, 20, width - 40, height - 40);

  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 3;
  ctx.strokeRect(36, 36, width - 72, height - 72);

  // Corner motifs
  const corners = [[36, 36], [width - 36, 36], [width - 36, height - 36], [36, height - 36]];
  corners.forEach(([cx, cy]) => {
    ctx.fillStyle = '#8B0000';
    ctx.beginPath();
    ctx.arc(cx, cy, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    ctx.stroke();
  });
  ctx.restore();

  // Rotating Auspicious Mandalas in background
  drawMandala(ctx, width * 0.15, height * 0.5, 220, time * 0.15, 'rgba(139, 0, 0, 0.12)');
  drawMandala(ctx, width * 0.85, height * 0.5, 220, -time * 0.15, 'rgba(139, 0, 0, 0.12)');

  // Subtle golden dust
  drawGoldenParticles(ctx, width, height, time, '#C29B38');

  // Scene timing
  const sceneDuration = duration / 7;
  const sceneIdx = Math.floor(time / sceneDuration);
  const sceneProgress = (time % sceneDuration) / sceneDuration;
  const fadeIn = Math.min(1, sceneProgress * 4);
  const fadeOut = Math.min(1, (1 - sceneProgress) * 4);
  ctx.globalAlpha = Math.min(fadeIn, fadeOut);

  const couple = project.couple;

  if (sceneIdx === 0) {
    // Sacred Ganesh Ji Opening
    drawGaneshMotif(ctx, width / 2, height * 0.28, 90, '#8B0000');

    drawFormattedText(ctx, '॥ ॐ श्री गणेशाय नमः ॥', width / 2, height * 0.44, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 52,
      color: '#8B0000',
    });

    drawFormattedText(ctx, 'मांगल्यं तनोतु वरवधूयोः', width / 2, height * 0.53, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 32,
      color: '#B8860B',
    });

    drawFormattedText(ctx, 'शुभ विवाह निमंत्रण', width / 2, height * 0.65, {
      font: "'Rozha One', 'Noto Serif Devanagari', serif",
      fontSize: 58,
      gradient: ['#990000', '#B8860B', '#990000'],
      glow: { color: 'rgba(184, 134, 11, 0.4)', blur: 15 },
    });

    drawFormattedText(ctx, `${couple.groomFamily} एवं ${couple.brideFamily}`, width / 2, height * 0.76, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 34,
      color: '#4A0E17',
    });
  } else if (sceneIdx === 1) {
    // Shubh Vivah Couple Name Reveal
    drawFormattedText(ctx, 'शुभ परिणय', width / 2, height * 0.24, {
      font: "'Rozha One', 'Noto Serif Devanagari', serif",
      fontSize: 44,
      color: '#8B0000',
    });

    drawFormattedText(ctx, couple.groomHindiName || couple.groomName, width / 2, height * 0.40, {
      font: "'Rozha One', 'Noto Serif Devanagari', serif",
      fontSize: 66,
      color: '#8B0000',
      glow: { color: 'rgba(212, 175, 55, 0.5)', blur: 20 },
    });

    drawFormattedText(ctx, couple.groomName.toUpperCase(), width / 2, height * 0.48, {
      font: "'Cinzel', serif",
      fontSize: 26,
      color: '#B8860B',
      letterSpacing: 4,
    });

    drawFormattedText(ctx, 'संग', width / 2, height * 0.57, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 42,
      color: '#D4AF37',
    });

    drawFormattedText(ctx, couple.brideHindiName || couple.brideName, width / 2, height * 0.68, {
      font: "'Rozha One', 'Noto Serif Devanagari', serif",
      fontSize: 66,
      color: '#8B0000',
      glow: { color: 'rgba(212, 175, 55, 0.5)', blur: 20 },
    });

    drawFormattedText(ctx, couple.brideName.toUpperCase(), width / 2, height * 0.76, {
      font: "'Cinzel', serif",
      fontSize: 26,
      color: '#B8860B',
      letterSpacing: 4,
    });
  } else if (sceneIdx === 2) {
    // Bride & Groom Portrait Spotlight
    const leftX = width * 0.28;
    const rightX = width * 0.72;
    const photoY = height * 0.44;
    const photoSize = 270;

    if (images.groom) {
      drawCroppedImage(ctx, images.groom, leftX - photoSize / 2, photoY - photoSize / 2, photoSize, photoSize, {
        isCircle: true,
        borderWidth: 6,
        borderColor: '#8B0000',
      });
    }

    drawFormattedText(ctx, `वर: ${couple.groomHindiName || couple.groomName}`, leftX, height * 0.68, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 34,
      color: '#8B0000',
    });
    drawFormattedText(ctx, `सुपुत्र: ${couple.groomParents}`, leftX, height * 0.75, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 24,
      color: '#4A0E17',
      maxWidth: 440,
    });

    if (images.bride) {
      drawCroppedImage(ctx, images.bride, rightX - photoSize / 2, photoY - photoSize / 2, photoSize, photoSize, {
        isCircle: true,
        borderWidth: 6,
        borderColor: '#8B0000',
      });
    }

    drawFormattedText(ctx, `वधू: ${couple.brideHindiName || couple.brideName}`, rightX, height * 0.68, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 34,
      color: '#8B0000',
    });
    drawFormattedText(ctx, `सुपुत्री: ${couple.brideParents}`, rightX, height * 0.75, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 24,
      color: '#4A0E17',
      maxWidth: 440,
    });
  } else if (sceneIdx === 3) {
    // Couple photo & Blessings
    const photoSize = 420;
    const photoX = width * 0.32 - photoSize / 2;
    const photoY = height / 2 - photoSize / 2;

    if (images.couple) {
      drawCroppedImage(ctx, images.couple, photoX, photoY, photoSize, photoSize, {
        isCircle: true,
        borderWidth: 8,
        borderColor: '#D4AF37',
      });
    }

    const textX = width * 0.72;
    drawFormattedText(ctx, '॥ मंगलम् भगवान विष्णुः ॥', textX, height * 0.34, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 36,
      color: '#8B0000',
    });

    drawFormattedText(ctx, 'मंगलम् गरुड़ध्वजः।\nमंगलम् पुण्डरीकाक्षः, मंगलाय तनो हरिः॥', textX, height * 0.47, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 28,
      color: '#4A0E17',
      lineHeight: 44,
      maxWidth: 600,
    });

    drawFormattedText(ctx, `${couple.groomName}  &  ${couple.brideName}`, textX, height * 0.64, {
      font: "'Great Vibes', cursive",
      fontSize: 56,
      color: '#8B0000',
    });
  } else if (sceneIdx === 4) {
    // Ceremonies in Traditional Card Style
    drawFormattedText(ctx, 'मांगलिक कार्यक्रम', width / 2, height * 0.16, {
      font: "'Rozha One', 'Noto Serif Devanagari', serif",
      fontSize: 46,
      color: '#8B0000',
    });

    const ceremonies = project.ceremonies.slice(0, 4);
    const cardWidth = Math.min(380, (width - 160) / Math.max(1, ceremonies.length));
    const totalW = ceremonies.length * cardWidth + (ceremonies.length - 1) * 30;
    const startX = (width - totalW) / 2;

    ceremonies.forEach((c, idx) => {
      const cx = startX + idx * (cardWidth + 30);
      const cy = height * 0.28;
      const ch = height * 0.56;

      ctx.fillStyle = '#FFF9F0';
      ctx.strokeStyle = '#B8860B';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(cx, cy, cardWidth, ch, 14);
      ctx.fill();
      ctx.stroke();

      const midX = cx + cardWidth / 2;

      drawFormattedText(ctx, c.hindiName || c.name, midX, cy + 60, {
        font: "'Noto Serif Devanagari', serif",
        fontSize: 30,
        color: '#8B0000',
        maxWidth: cardWidth - 30,
      });

      drawFormattedText(ctx, `दिनांक: ${c.date}`, midX, cy + 140, {
        font: "'Outfit', sans-serif",
        fontSize: 22,
        color: '#1A1A1A',
      });

      drawFormattedText(ctx, `समय: ${c.time}`, midX, cy + 185, {
        font: "'Outfit', sans-serif",
        fontSize: 22,
        color: '#8B0000',
      });

      drawFormattedText(ctx, c.venueName, midX, cy + 265, {
        font: "'Noto Serif Devanagari', serif",
        fontSize: 22,
        color: '#4A0E17',
        maxWidth: cardWidth - 30,
      });

      drawFormattedText(ctx, c.venueAddress, midX, cy + 325, {
        font: "'Outfit', sans-serif",
        fontSize: 16,
        color: '#666666',
        maxWidth: cardWidth - 40,
        lineHeight: 22,
      });
    });
  } else if (sceneIdx === 5) {
    // Invitation message
    drawFormattedText(ctx, project.message.shlokaHeading || '॥ श्री गणेशाय नमः ॥', width / 2, height * 0.24, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 42,
      color: '#8B0000',
    });

    drawFormattedText(ctx, project.message.bodyText, width / 2, height * 0.46, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 32,
      color: '#3A030E',
      maxWidth: 1300,
      lineHeight: 52,
    });

    drawFormattedText(ctx, project.message.closingSalutation, width / 2, height * 0.74, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 32,
      color: '#8B0000',
      maxWidth: 1100,
      lineHeight: 46,
    });
  } else {
    // Scene 6: Grand Shubh Vivah Blessing
    drawGaneshMotif(ctx, width / 2, height * 0.22, 70, '#8B0000');

    drawFormattedText(ctx, '॥ आपकी गरिमामयी उपस्थिति प्रार्थनीय है ॥', width / 2, height * 0.36, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 44,
      color: '#8B0000',
    });

    drawFormattedText(ctx, `${couple.groomHindiName || couple.groomName}  संग  ${couple.brideHindiName || couple.brideName}`, width / 2, height * 0.52, {
      font: "'Rozha One', 'Noto Serif Devanagari', serif",
      fontSize: 62,
      color: '#8B0000',
      glow: { color: 'rgba(212, 175, 55, 0.4)', blur: 20 },
    });

    const mainCeremony = project.ceremonies.find((c) => c.key === 'wedding') || project.ceremonies[0];
    if (mainCeremony) {
      drawFormattedText(ctx, `${mainCeremony.hindiName || mainCeremony.name} • ${mainCeremony.date} • ${mainCeremony.venueName}`, width / 2, height * 0.68, {
        font: "'Noto Serif Devanagari', serif",
        fontSize: 26,
        color: '#3A030E',
      });
    }

    drawFormattedText(ctx, 'विनीत: समस्त परिवार एवं स्नेहीजन', width / 2, height * 0.78, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 28,
      color: '#B8860B',
    });
  }

  ctx.globalAlpha = 1;
}
