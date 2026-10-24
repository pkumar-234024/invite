import type { WeddingProject } from '../../types/wedding';
import { drawCroppedImage, drawFormattedText, drawGoldenParticles, drawRoyalBorder } from './common';

export function renderRoyalMaharaja(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  duration: number,
  project: WeddingProject,
  images: { bride?: HTMLImageElement; groom?: HTMLImageElement; couple?: HTMLImageElement; family?: HTMLImageElement }
) {
  // 1. Royal Maroon & Crimson Velvet Gradient Background
  const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 100, width / 2, height / 2, width * 0.75);
  bgGrad.addColorStop(0, '#5C081A');
  bgGrad.addColorStop(0.5, '#420412');
  bgGrad.addColorStop(1, '#200107');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Floating Golden Particles
  drawGoldenParticles(ctx, width, height, time, '#FFE28A');

  // Decorative Royal Border
  drawRoyalBorder(ctx, width, height, '#D4AF37', '#FFDF73');

  // Scene timing
  const sceneDuration = duration / 7;
  const sceneIdx = Math.floor(time / sceneDuration);
  const sceneProgress = (time % sceneDuration) / sceneDuration;

  // Scene fade in / out
  const fadeIn = Math.min(1, sceneProgress * 4);
  const fadeOut = Math.min(1, (1 - sceneProgress) * 4);
  const sceneAlpha = Math.min(fadeIn, fadeOut);
  ctx.globalAlpha = sceneAlpha;

  const couple = project.couple;

  if (sceneIdx === 0) {
    // SCENE 0: Opening Palace Doors & Sacred Invocation
    // Animated Palace Doors Opening in first 2 seconds
    const doorProgress = Math.min(1, sceneProgress * 2.2);
    const doorOffset = doorProgress * (width / 2);

    if (doorProgress < 1) {
      ctx.save();
      ctx.globalAlpha = 1 - doorProgress * 0.4;
      // Left Door
      ctx.fillStyle = '#3A030E';
      ctx.fillRect(0 - doorOffset, 0, width / 2, height);
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 4;
      ctx.strokeRect(40 - doorOffset, 40, width / 2 - 80, height - 80);

      // Right Door
      ctx.fillStyle = '#3A030E';
      ctx.fillRect(width / 2 + doorOffset, 0, width / 2, height);
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 4;
      ctx.strokeRect(width / 2 + doorOffset + 40, 40, width / 2 - 80, height - 80);
      ctx.restore();
    }

    // Sacred Ganesh & Royal Invocation
    drawFormattedText(ctx, '॥ श्री गणेशाय नमः ॥', width / 2, height * 0.32, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 48,
      gradient: ['#FFE89E', '#D4AF37', '#FFE89E'],
      glow: { color: 'rgba(212, 175, 55, 0.6)', blur: 20 },
    });

    drawFormattedText(ctx, 'A ROYAL INDIAN WEDDING INVITATION', width / 2, height * 0.46, {
      font: "'Cinzel', serif",
      fontSize: 34,
      color: '#E8D5B5',
      glow: { color: '#D4AF37', blur: 10 },
    });

    drawFormattedText(ctx, 'Together with their families', width / 2, height * 0.56, {
      font: "'Cormorant Garamond', serif",
      fontSize: 38,
      color: '#FDFBF7',
    });

    drawFormattedText(ctx, `${couple.groomFamily}  &  ${couple.brideFamily}`, width / 2, height * 0.68, {
      font: "'Cinzel Decorative', serif",
      fontSize: 44,
      gradient: ['#FFEAA7', '#D4AF37', '#F39C12'],
      glow: { color: 'rgba(255, 215, 0, 0.5)', blur: 15 },
    });
  } else if (sceneIdx === 1) {
    // SCENE 1: The Royal Couple Reveal
    drawFormattedText(ctx, 'INVITE YOU TO CELEBRATE THE WEDDING OF', width / 2, height * 0.28, {
      font: "'Cinzel', serif",
      fontSize: 30,
      color: '#D4AF37',
    });

    // Groom Name
    drawFormattedText(ctx, couple.groomName.toUpperCase(), width / 2, height * 0.42, {
      font: "'Cinzel Decorative', serif",
      fontSize: 68,
      gradient: ['#FFF3BF', '#E5C158', '#D4AF37'],
      glow: { color: 'rgba(212, 175, 55, 0.8)', blur: 25 },
    });

    // Hindi or Nickname
    if (couple.groomHindiName) {
      drawFormattedText(ctx, `(${couple.groomHindiName})`, width / 2, height * 0.49, {
        font: "'Noto Serif Devanagari', serif",
        fontSize: 32,
        color: '#E6D3B3',
      });
    }

    // Royal Weds Knot
    drawFormattedText(ctx, '❦  weds  ❦', width / 2, height * 0.57, {
      font: "'Great Vibes', cursive",
      fontSize: 54,
      color: '#FF6B6B',
      glow: { color: '#E5C158', blur: 15 },
    });

    // Bride Name
    drawFormattedText(ctx, couple.brideName.toUpperCase(), width / 2, height * 0.68, {
      font: "'Cinzel Decorative', serif",
      fontSize: 68,
      gradient: ['#FFF3BF', '#E5C158', '#D4AF37'],
      glow: { color: 'rgba(212, 175, 55, 0.8)', blur: 25 },
    });

    if (couple.brideHindiName) {
      drawFormattedText(ctx, `(${couple.brideHindiName})`, width / 2, height * 0.75, {
        font: "'Noto Serif Devanagari', serif",
        fontSize: 32,
        color: '#E6D3B3',
      });
    }
  } else if (sceneIdx === 2) {
    // SCENE 2: Bride & Groom Solo Spotlight with Portraits & Lineage
    // Left Box: Groom
    const leftX = width * 0.28;
    const rightX = width * 0.72;
    const photoY = height * 0.42;
    const photoSize = 280;

    if (images.groom) {
      drawCroppedImage(ctx, images.groom, leftX - photoSize / 2, photoY - photoSize / 2, photoSize, photoSize, {
        zoom: project.photos.offsets?.groom?.zoom || 1,
        offsetX: project.photos.offsets?.groom?.offsetX || 0,
        offsetY: project.photos.offsets?.groom?.offsetY || 0,
        borderRadius: 20,
        borderWidth: 5,
        borderColor: '#D4AF37',
      });
    }

    drawFormattedText(ctx, couple.groomName, leftX, height * 0.63, {
      font: "'Cinzel', serif",
      fontSize: 36,
      gradient: ['#FFE89E', '#D4AF37', '#FFE89E'],
    });
    drawFormattedText(ctx, `Son of ${couple.groomParents}`, leftX, height * 0.71, {
      font: "'Cormorant Garamond', serif",
      fontSize: 26,
      color: '#E8D5B5',
      maxWidth: 450,
    });

    // Right Box: Bride
    if (images.bride) {
      drawCroppedImage(ctx, images.bride, rightX - photoSize / 2, photoY - photoSize / 2, photoSize, photoSize, {
        zoom: project.photos.offsets?.bride?.zoom || 1,
        offsetX: project.photos.offsets?.bride?.offsetX || 0,
        offsetY: project.photos.offsets?.bride?.offsetY || 0,
        borderRadius: 20,
        borderWidth: 5,
        borderColor: '#D4AF37',
      });
    }

    drawFormattedText(ctx, couple.brideName, rightX, height * 0.63, {
      font: "'Cinzel', serif",
      fontSize: 36,
      gradient: ['#FFE89E', '#D4AF37', '#FFE89E'],
    });
    drawFormattedText(ctx, `Daughter of ${couple.brideParents}`, rightX, height * 0.71, {
      font: "'Cormorant Garamond', serif",
      fontSize: 26,
      color: '#E8D5B5',
      maxWidth: 450,
    });

    // Center divider
    drawFormattedText(ctx, '♥', width / 2, photoY, {
      font: "'Cinzel', serif",
      fontSize: 48,
      color: '#D4AF37',
      glow: { color: '#D4AF37', blur: 15 },
    });
  } else if (sceneIdx === 3) {
    // SCENE 3: Couple Romance Portrait & Heartfelt Quote
    const imgW = 620;
    const imgH = 420;
    const photoX = width * 0.32 - imgW / 2;
    const photoY = height / 2 - imgH / 2;

    if (images.couple) {
      drawCroppedImage(ctx, images.couple, photoX, photoY, imgW, imgH, {
        zoom: project.photos.offsets?.couple?.zoom || 1,
        offsetX: project.photos.offsets?.couple?.offsetX || 0,
        offsetY: project.photos.offsets?.couple?.offsetY || 0,
        borderRadius: 16,
        borderWidth: 6,
        borderColor: '#D4AF37',
      });
    }

    const textX = width * 0.72;
    drawFormattedText(ctx, 'TWO SOULS, ONE HEART', textX, height * 0.35, {
      font: "'Cinzel', serif",
      fontSize: 32,
      color: '#D4AF37',
      letterSpacing: 4,
    });

    drawFormattedText(ctx, `"${project.message.quote || 'Two hearts entwined in sacred love and togetherness.'}"`, textX, height * 0.48, {
      font: "'Playfair Display', serif",
      fontSize: 32,
      color: '#FFF6E6',
      maxWidth: 600,
      lineHeight: 46,
    });

    drawFormattedText(ctx, `${couple.groomName}  &  ${couple.brideName}`, textX, height * 0.65, {
      font: "'Great Vibes', cursive",
      fontSize: 54,
      gradient: ['#FFEAA7', '#D4AF37', '#FFDF73'],
      glow: { color: 'rgba(212, 175, 55, 0.6)', blur: 20 },
    });
  } else if (sceneIdx === 4) {
    // SCENE 4: Sacred Ceremonies Calendar & Venues
    drawFormattedText(ctx, 'WEDDING CELEBRATION SCHEDULE', width / 2, height * 0.16, {
      font: "'Cinzel Decorative', serif",
      fontSize: 42,
      gradient: ['#FFE89E', '#D4AF37', '#FFE89E'],
      glow: { color: 'rgba(212, 175, 55, 0.6)', blur: 15 },
    });

    const ceremonies = project.ceremonies.slice(0, 4);
    const cardWidth = Math.min(380, (width - 160) / Math.max(1, ceremonies.length));
    const totalW = ceremonies.length * cardWidth + (ceremonies.length - 1) * 30;
    const startX = (width - totalW) / 2;

    ceremonies.forEach((c, idx) => {
      const cx = startX + idx * (cardWidth + 30);
      const cy = height * 0.28;
      const ch = height * 0.56;

      // Card background
      ctx.fillStyle = 'rgba(30, 2, 7, 0.75)';
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(cx, cy, cardWidth, ch, 14);
      ctx.fill();
      ctx.stroke();

      const midX = cx + cardWidth / 2;

      // Ceremony Title
      drawFormattedText(ctx, c.hindiName || c.name, midX, cy + 60, {
        font: "'Noto Serif Devanagari', serif",
        fontSize: 28,
        gradient: ['#FFE89E', '#D4AF37', '#FFE89E'],
        maxWidth: cardWidth - 30,
      });

      drawFormattedText(ctx, c.name, midX, cy + 105, {
        font: "'Cinzel', serif",
        fontSize: 20,
        color: '#E8D5B5',
        maxWidth: cardWidth - 30,
      });

      // Date & Time
      drawFormattedText(ctx, `📅 ${c.date}`, midX, cy + 175, {
        font: "'Outfit', sans-serif",
        fontSize: 22,
        color: '#FFFFFF',
      });

      drawFormattedText(ctx, `⏰ ${c.time}`, midX, cy + 215, {
        font: "'Outfit', sans-serif",
        fontSize: 22,
        color: '#FFEAA7',
      });

      // Venue
      drawFormattedText(ctx, `📍 ${c.venueName}`, midX, cy + 285, {
        font: "'Cormorant Garamond', serif",
        fontSize: 22,
        color: '#FDFBF7',
        maxWidth: cardWidth - 30,
      });

      drawFormattedText(ctx, c.venueAddress, midX, cy + 340, {
        font: "'Outfit', sans-serif",
        fontSize: 16,
        color: '#C7A779',
        maxWidth: cardWidth - 40,
        lineHeight: 22,
      });
    });
  } else if (sceneIdx === 5) {
    // SCENE 5: Invitation Message & Shloka
    drawFormattedText(ctx, project.message.shlokaHeading || '॥ श्री गणेशाय नमः ॥', width / 2, height * 0.24, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 40,
      gradient: ['#FFEAA7', '#D4AF37', '#FFEAA7'],
      glow: { color: 'rgba(212, 175, 55, 0.7)', blur: 20 },
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
      gradient: ['#FFE89E', '#E5C158', '#D4AF37'],
      maxWidth: 1100,
      lineHeight: 46,
    });
  } else {
    // SCENE 6: Grand Finale & Warm Welcome ("सादर आमंत्रित")
    drawFormattedText(ctx, '॥ सादर आमंत्रित ॥', width / 2, height * 0.28, {
      font: "'Noto Serif Devanagari', serif",
      fontSize: 56,
      gradient: ['#FFF0B8', '#D4AF37', '#FFF0B8'],
      glow: { color: 'rgba(212, 175, 55, 0.8)', blur: 30 },
    });

    drawFormattedText(ctx, 'WE LOOK FORWARD TO BLESSING THE NEW BEGINNING', width / 2, height * 0.40, {
      font: "'Cinzel', serif",
      fontSize: 28,
      color: '#E8D5B5',
      letterSpacing: 3,
    });

    drawFormattedText(ctx, `${couple.groomName}  &  ${couple.brideName}`, width / 2, height * 0.54, {
      font: "'Great Vibes', cursive",
      fontSize: 76,
      gradient: ['#FFEAA7', '#D4AF37', '#FFDF73'],
      glow: { color: 'rgba(255, 215, 0, 0.7)', blur: 25 },
    });

    const mainWedding = project.ceremonies.find((c) => c.key === 'wedding') || project.ceremonies[0];
    if (mainWedding) {
      drawFormattedText(ctx, `${mainWedding.name} • ${mainWedding.date} • ${mainWedding.venueName}`, width / 2, height * 0.70, {
        font: "'Outfit', sans-serif",
        fontSize: 26,
        color: '#FFFFFF',
      });
    }

    drawFormattedText(ctx, 'With best compliments from all family members & relatives', width / 2, height * 0.79, {
      font: "'Cormorant Garamond', serif",
      fontSize: 26,
      color: '#D4AF37',
    });
  }

  ctx.globalAlpha = 1;
}
