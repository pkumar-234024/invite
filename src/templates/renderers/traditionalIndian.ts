import type { WeddingProject } from '../../types/wedding';
import { drawCroppedImage, drawFormattedText, drawGoldenParticles } from './common';

export function renderTraditionalIndian(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  duration: number,
  project: WeddingProject,
  images: { bride?: HTMLImageElement; groom?: HTMLImageElement; couple?: HTMLImageElement; family?: HTMLImageElement }
) {
  // Rich Vermilion Red & Festive Marigold Saffron
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#5C0808');
  bgGrad.addColorStop(0.5, '#7F1111');
  bgGrad.addColorStop(1, '#380404');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Marigold flower garland swag across top border
  ctx.save();
  const swagCount = 8;
  const swagWidth = width / swagCount;
  for (let s = 0; s < swagCount; s++) {
    const sx = s * swagWidth;
    ctx.beginPath();
    ctx.moveTo(sx, 15);
    ctx.quadraticCurveTo(sx + swagWidth / 2, 70, sx + swagWidth, 15);
    ctx.strokeStyle = '#FFA000';
    ctx.lineWidth = 14;
    ctx.stroke();

    ctx.strokeStyle = '#FFD54F';
    ctx.lineWidth = 6;
    ctx.stroke();
  }

  // Traditional Yellow & Gold Border
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 4;
  ctx.strokeRect(30, 40, width - 60, height - 70);
  ctx.strokeStyle = '#FCD34D';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(42, 52, width - 84, height - 94);
  ctx.restore();

  drawGoldenParticles(ctx, width, height, time, '#FFD54F');

  const sceneDuration = duration / 7;
  const sceneIdx = Math.floor(time / sceneDuration);
  const sceneProgress = (time % sceneDuration) / sceneDuration;
  const fadeIn = Math.min(1, sceneProgress * 4);
  const fadeOut = Math.min(1, (1 - sceneProgress) * 4);
  ctx.globalAlpha = Math.min(fadeIn, fadeOut);

  const couple = project.couple;

  if (sceneIdx === 0) {
    drawFormattedText(ctx, '॥ शुभ विवाह महोत्सव ॥', width / 2, height * 0.32, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 52,
      gradient: ['#FFFBEB', '#FCD34D', '#FFFBEB'],
      glow: { color: 'rgba(252, 211, 77, 0.7)', blur: 20 },
    });

    drawFormattedText(ctx, 'A CELEBRATION OF SACRED RITUALS & JOY', width / 2, height * 0.46, {
      font: "'Cinzel', serif",
      fontSize: 32,
      color: '#FEF3C7',
      letterSpacing: 4,
    });

    drawFormattedText(ctx, `${couple.groomFamily} एवं ${couple.brideFamily}`, width / 2, height * 0.58, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 42,
      gradient: ['#FEF3C7', '#FBBF24', '#FEF3C7'],
    });

    drawFormattedText(ctx, 'आप सभी स्नेहीजनों को सादर आमंत्रित करते हैं', width / 2, height * 0.70, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 30,
      color: '#FFFFFF',
    });
  } else if (sceneIdx === 1) {
    drawFormattedText(ctx, '॥ परिणय सूत्र ॥', width / 2, height * 0.26, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 38,
      color: '#FCD34D',
    });

    drawFormattedText(ctx, couple.groomHindiName || couple.groomName, width / 2, height * 0.40, {
      font: "'Rozha One', 'Noto Serif Devanagari', serif",
      fontSize: 68,
      gradient: ['#FFFBEB', '#FCD34D', '#FFFBEB'],
      glow: { color: 'rgba(251, 191, 36, 0.8)', blur: 25 },
    });

    drawFormattedText(ctx, 'संग', width / 2, height * 0.52, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 42,
      color: '#FBBF24',
    });

    drawFormattedText(ctx, couple.brideHindiName || couple.brideName, width / 2, height * 0.66, {
      font: "'Rozha One', 'Noto Serif Devanagari', serif",
      fontSize: 68,
      gradient: ['#FFFBEB', '#FCD34D', '#FFFBEB'],
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
        borderColor: '#FCD34D',
      });
    }

    drawFormattedText(ctx, `वर: ${couple.groomHindiName || couple.groomName}`, leftX, height * 0.68, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 34,
      color: '#FEF3C7',
    });
    drawFormattedText(ctx, `सुपुत्र: ${couple.groomParents}`, leftX, height * 0.75, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 24,
      color: '#FDE68A',
      maxWidth: 440,
    });

    if (images.bride) {
      drawCroppedImage(ctx, images.bride, rightX - photoSize / 2, photoY - photoSize / 2, photoSize, photoSize, {
        isCircle: true,
        borderWidth: 6,
        borderColor: '#FCD34D',
      });
    }

    drawFormattedText(ctx, `वधू: ${couple.brideHindiName || couple.brideName}`, rightX, height * 0.68, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 34,
      color: '#FEF3C7',
    });
    drawFormattedText(ctx, `सुपुत्री: ${couple.brideParents}`, rightX, height * 0.75, {
      font: "'Noto Serif Devanagari', serif",
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
        borderRadius: 20,
        borderWidth: 6,
        borderColor: '#FCD34D',
      });
    }

    const textX = width * 0.72;
    drawFormattedText(ctx, '॥ सात फेरे, सात वचन ॥', textX, height * 0.35, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 36,
      color: '#FCD34D',
    });

    drawFormattedText(ctx, 'सुख-दुःख में संग निभाएंगे,\nजीवन भर प्रेम बरसाएंगे।\nईश्वर का आशीष पाकर,\nनया संसार बसाएंगे॥', textX, height * 0.49, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 28,
      color: '#FFFFFF',
      lineHeight: 44,
      maxWidth: 580,
    });

    drawFormattedText(ctx, `${couple.groomName}  &  ${couple.brideName}`, textX, height * 0.68, {
      font: "'Great Vibes', cursive",
      fontSize: 54,
      color: '#FCD34D',
    });
  } else if (sceneIdx === 4) {
    drawFormattedText(ctx, 'मांगलिक कार्यक्रम विवरण', width / 2, height * 0.16, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 42,
      gradient: ['#FFFBEB', '#FCD34D', '#FFFBEB'],
    });

    const ceremonies = project.ceremonies.slice(0, 4);
    const cardWidth = Math.min(380, (width - 160) / Math.max(1, ceremonies.length));
    const totalW = ceremonies.length * cardWidth + (ceremonies.length - 1) * 30;
    const startX = (width - totalW) / 2;

    ceremonies.forEach((c, idx) => {
      const cx = startX + idx * (cardWidth + 30);
      const cy = height * 0.28;
      const ch = height * 0.56;

      ctx.fillStyle = '#450A0A';
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(cx, cy, cardWidth, ch, 14);
      ctx.fill();
      ctx.stroke();

      const midX = cx + cardWidth / 2;
      drawFormattedText(ctx, c.hindiName || c.name, midX, cy + 60, {
        font: "'Noto Serif Devanagari', serif",
        fontSize: 28,
        color: '#FCD34D',
        maxWidth: cardWidth - 30,
      });

      drawFormattedText(ctx, `📅 दिनांक: ${c.date}`, midX, cy + 150, {
        font: "'Noto Serif Devanagari', 'Outfit', sans-serif",
        fontSize: 20,
        color: '#FFFFFF',
      });

      drawFormattedText(ctx, `⏰ समय: ${c.time}`, midX, cy + 195, {
        font: "'Noto Serif Devanagari', 'Outfit', sans-serif",
        fontSize: 20,
        color: '#FCD34D',
      });

      drawFormattedText(ctx, `📍 ${c.venueName}`, midX, cy + 270, {
        font: "'Noto Serif Devanagari', serif",
        fontSize: 22,
        color: '#FFFFFF',
        maxWidth: cardWidth - 30,
      });

      drawFormattedText(ctx, c.venueAddress, midX, cy + 325, {
        font: "'Noto Serif Devanagari', serif",
        fontSize: 16,
        color: '#FDE68A',
        maxWidth: cardWidth - 40,
        lineHeight: 22,
      });
    });
  } else if (sceneIdx === 5) {
    drawFormattedText(ctx, project.message.shlokaHeading || '॥ श्री गणेशाय नमः ॥', width / 2, height * 0.24, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 42,
      color: '#FCD34D',
    });

    drawFormattedText(ctx, project.message.bodyText, width / 2, height * 0.46, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 32,
      color: '#FFFFFF',
      maxWidth: 1300,
      lineHeight: 52,
    });

    drawFormattedText(ctx, project.message.closingSalutation, width / 2, height * 0.74, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 32,
      color: '#FCD34D',
      maxWidth: 1100,
      lineHeight: 46,
    });
  } else {
    drawFormattedText(ctx, '॥ सादर आमंत्रित ॥', width / 2, height * 0.28, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 54,
      gradient: ['#FFFBEB', '#FCD34D', '#FFFBEB'],
      glow: { color: 'rgba(252, 211, 77, 0.8)', blur: 25 },
    });

    drawFormattedText(ctx, `${couple.groomHindiName || couple.groomName}  संग  ${couple.brideHindiName || couple.brideName}`, width / 2, height * 0.48, {
      font: "'Rozha One', 'Noto Serif Devanagari', serif",
      fontSize: 66,
      color: '#FFFFFF',
    });

    const mainWedding = project.ceremonies.find((c) => c.key === 'wedding') || project.ceremonies[0];
    if (mainWedding) {
      drawFormattedText(ctx, `${mainWedding.hindiName || mainWedding.name} • ${mainWedding.date} • ${mainWedding.venueName}`, width / 2, height * 0.66, {
        font: "'Noto Serif Devanagari', serif",
        fontSize: 26,
        color: '#FDE68A',
      });
    }

    drawFormattedText(ctx, 'आपकी गरिमामयी उपस्थिति हमारे लिए सौभाग्य की बात होगी', width / 2, height * 0.77, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 26,
      color: '#FCD34D',
    });
  }

  ctx.globalAlpha = 1;
}
