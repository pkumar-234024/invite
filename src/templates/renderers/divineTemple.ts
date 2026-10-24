import type { WeddingProject } from '../../types/wedding';
import type { LoadedImages } from '../../services/videoRenderer';
import {
  drawCroppedImage,
  drawFormattedText,
  drawGoldenParticles,
  drawFloatingRosePetals,
  drawMandala,
} from './common';

/**
 * Template 01: Divine Temple Wedding Invitation
 * 7 Scenes | 16:9 Landscape (1920 × 1080) | 45-Second Cinematic Masterpiece
 *
 * Full-Screen Composition & Typography Hierarchy:
 * - Bride & Groom names: 'Cinzel Decorative' / 'Cinzel' (grand, royal, cinematic lettering)
 * - Main invitation headings: 'Playfair Display' (refined, elegant serif)
 * - Dates, times, venues & addresses: 'Poppins' (clean, modern, ultra-crisp on all screens)
 * - Traditional Sanskrit / Hindi text: 'Noto Serif Devanagari' (authentic, legible)
 * - Full-bleed edge-to-edge 16:9 architecture (no floating cards, no shrinking boxes)
 * - Safe areas (5-7% / 120-135px) protecting text while visuals fill all 4 edges.
 */
export function renderDivineTemple(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  duration: number,
  project: WeddingProject,
  images: LoadedImages
) {
  // Normalize playback to exact 45-second timeline (scenes: 6s, 6s, 7s, 7s, 6s, 6s, 7s)
  const normTime = Math.min(45, Math.max(0, (time / Math.max(1, duration)) * 45));

  const SCENE_BOUNDS = [0, 6, 12, 19, 26, 32, 38, 45];
  let sceneIdx = 0;
  for (let i = 0; i < SCENE_BOUNDS.length - 1; i++) {
    if (normTime >= SCENE_BOUNDS[i] && normTime <= SCENE_BOUNDS[i + 1]) {
      sceneIdx = i;
      break;
    }
  }

  const sStart = SCENE_BOUNDS[sceneIdx];
  const sEnd = SCENE_BOUNDS[sceneIdx + 1];
  const sDuration = sEnd - sStart;
  const sProgress = (normTime - sStart) / sDuration; // 0 to 1

  // 1. Full-Bleed 16:9 Base: Ancient sandstone & deep maroon velvet ambience
  drawFullBleedTempleBackground(ctx, width, height, normTime, sceneIdx);

  // 2. Render Scene-Specific Full-Screen Visuals
  switch (sceneIdx) {
    case 0:
      renderScene1TempleAwakening(ctx, width, height, sProgress, normTime, project);
      break;
    case 1:
      renderScene2SacredInvitation(ctx, width, height, sProgress, normTime, project);
      break;
    case 2:
      renderScene3CoupleNameReveal(ctx, width, height, sProgress, normTime, project);
      break;
    case 3:
      renderScene4CoupleMoments(ctx, width, height, sProgress, normTime, project, images);
      break;
    case 4:
      renderScene5AuspiciousDate(ctx, width, height, sProgress, normTime, project);
      break;
    case 5:
      renderScene6VenueCelebration(ctx, width, height, sProgress, normTime, project);
      break;
    case 6:
      renderScene7InvitationFinale(ctx, width, height, sProgress, normTime, project);
      break;
  }

  // 3. Full-Screen Seamless Transitions at scene boundary ends
  renderSceneSpecificTransition(ctx, width, height, sceneIdx, sProgress, normTime);

  // 4. Smooth fade to deep maroon / antique gold at exactly 45s
  if (normTime >= 43.5) {
    const fadeOutProgress = (normTime - 43.5) / 1.5;
    ctx.save();
    ctx.fillStyle = '#26040C';
    ctx.globalAlpha = Math.min(1, fadeOutProgress);
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }
}

/**
 * Full-bleed 16:9 temple background filling 0 to 1920 and 0 to 1080
 */
function drawFullBleedTempleBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  sceneIdx: number
) {
  ctx.save();
  const bgGrad = ctx.createRadialGradient(
    width / 2,
    height * 0.45,
    height * 0.15,
    width / 2,
    height / 2,
    width * 0.75
  );

  if (sceneIdx === 0) {
    // Scene 1: Starts in soft dawn atmospheric darkness
    bgGrad.addColorStop(0, '#380713');
    bgGrad.addColorStop(0.5, '#20030A');
    bgGrad.addColorStop(1, '#0F0105');
  } else if (sceneIdx === 4 || sceneIdx === 6) {
    // Sacred ceremonial warmth
    bgGrad.addColorStop(0, '#560B1C');
    bgGrad.addColorStop(0.5, '#320511');
    bgGrad.addColorStop(1, '#180208');
  } else {
    // Regal temple hall
    bgGrad.addColorStop(0, '#4C0A19');
    bgGrad.addColorStop(0.5, '#2A040E');
    bgGrad.addColorStop(1, '#140106');
  }

  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Floating golden stardust particles across the entire 16:9 frame
  drawGoldenParticles(ctx, width, height, time, '#FFE28A');
  ctx.restore();
}

/**
 * SCENE 1: The Divine Temple Awakening (00:00 - 00:06 | 6s)
 * Wide majestic temple filling the frame from edge to edge, carved stone pillars,
 * golden sunrise emerging behind temple roof, sunrays through morning mist,
 * traditional hanging bells, brass diyas flickering, smooth dolly-in.
 */
function renderScene1TempleAwakening(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number,
  time: number,
  project: WeddingProject
) {
  ctx.save();

  // Slow cinematic dolly-in (1.0 -> 1.05)
  const zoom = 1.0 + progress * 0.05;
  ctx.translate(width / 2, height / 2);
  ctx.scale(zoom, zoom);
  ctx.translate(-width / 2, -height / 2);

  // 1. Golden Sunrise emerging behind temple roof (filling full 16:9 canvas)
  const sunAlpha = Math.min(1, progress * 1.5);
  const sunGrad = ctx.createRadialGradient(
    width / 2,
    height * 0.36,
    30,
    width / 2,
    height * 0.36,
    width * 0.65
  );
  sunGrad.addColorStop(0, `rgba(255, 240, 180, ${sunAlpha * 0.98})`);
  sunGrad.addColorStop(0.25, `rgba(255, 185, 55, ${sunAlpha * 0.7})`);
  sunGrad.addColorStop(0.65, `rgba(180, 50, 15, ${sunAlpha * 0.3})`);
  sunGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = sunGrad;
  ctx.fillRect(0, 0, width, height);

  // Volumetric Sunrays streaming from the temple peak
  drawVolumetricRays(ctx, width / 2, height * 0.36, width, height, progress, time);

  // 2. Edge-to-Edge Temple Architecture (flush to left and right edges)
  drawEdgeToEdgeTempleArchitecture(ctx, width, height, time);

  // 3. Hanging Temple Bells swaying gently
  drawHangingTempleBells(ctx, width, time);

  // 4. Marigold Garlands spanning the entire top beam
  drawFullWidthMarigoldGarlands(ctx, width);

  // 5. Flickering Brass Diyas at entrance
  drawBrassDiyas(ctx, 90, height - 90, 42, time);
  drawBrassDiyas(ctx, width - 90, height - 90, 42, time + 1.4);

  // 6. Awakening Sacred Invocation Typography
  const textFade = Math.min(1, Math.max(0, (progress - 0.15) * 2.2));
  ctx.save();
  ctx.globalAlpha = textFade;

  // Sanskrit Shloka in Devanagari
  drawFormattedText(ctx, project.message.shlokaHeading || '॥ श्री गणेशाय नमः ॥', width / 2, height * 0.39, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 54,
    gradient: ['#FFF4D4', '#E6C065', '#D4AF37'],
    shadow: { color: 'rgba(0, 0, 0, 0.85)', blur: 12, offsetX: 0, offsetY: 3 },
  });

  // Invitation Header in Playfair Display
  drawFormattedText(ctx, 'DIVINE TEMPLE WEDDING INVITATION', width / 2, height * 0.52, {
    font: "'Playfair Display', serif",
    fontSize: 38,
    color: '#FFEAA7',
    letterSpacing: 6,
    shadow: { color: 'rgba(0, 0, 0, 0.85)', blur: 10, offsetX: 0, offsetY: 2 },
  });

  // Supporting text in Poppins
  drawFormattedText(ctx, 'An Auspicious Union Blessed by the Almighty & Sacred Traditions', width / 2, height * 0.61, {
    font: "'Poppins', sans-serif",
    fontSize: 24,
    color: '#F4DEB3',
    letterSpacing: 2,
    shadow: { color: 'rgba(0, 0, 0, 0.9)', blur: 8, offsetX: 0, offsetY: 2 },
  });
  ctx.restore();

  ctx.restore();
}

/**
 * SCENE 2: A Sacred Invitation (00:06 - 00:12 | 6s)
 * Full-screen ornamental temple environment, symmetrical pillars, lotus motifs,
 * decorated arch, marigold garlands, glowing brass diyas, rotating mandala.
 * Text: "With the Divine Blessings" / "Of Our Families"
 */
function renderScene2SacredInvitation(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number,
  time: number,
  project: WeddingProject
) {
  ctx.save();

  const zoom = 1.0 + progress * 0.04;
  ctx.translate(width / 2, height / 2);
  ctx.scale(zoom, zoom);
  ctx.translate(-width / 2, -height / 2);

  // Full-bleed architecture
  drawEdgeToEdgeTempleArchitecture(ctx, width, height, time);
  drawFullWidthMarigoldGarlands(ctx, width);
  drawHangingTempleBells(ctx, width, time);

  // Central Rotating Sacred Mandala (large, fills central area without dominating text)
  const mandalaAlpha = Math.min(1, progress * 2);
  ctx.save();
  ctx.globalAlpha = mandalaAlpha * 0.4;
  drawMandala(ctx, width / 2, height * 0.5, 420, time * 0.1, 'rgba(212, 175, 55, 0.5)');
  ctx.restore();

  // Floating rose and marigold petals across the 16:9 canvas
  drawFloatingRosePetals(ctx, width, height, time);

  // Glowing brass lamps
  drawBrassDiyas(ctx, 90, height - 90, 42, time);
  drawBrassDiyas(ctx, width - 90, height - 90, 42, time + 2);

  // Typography Hierarchy
  const textAlpha = Math.min(1, progress * 2.5);
  ctx.save();
  ctx.globalAlpha = textAlpha;

  // Sacred Lotus Motif above text
  drawLotusMotif(ctx, width / 2, height * 0.27, 56, '#FFE494');

  // Heading in Playfair Display
  drawFormattedText(ctx, 'With the Divine Blessings', width / 2, height * 0.41, {
    font: "'Playfair Display', serif",
    fontSize: 46,
    color: '#FFF8EC',
    letterSpacing: 3,
    shadow: { color: 'rgba(0, 0, 0, 0.85)', blur: 10, offsetX: 0, offsetY: 2 },
  });

  drawFormattedText(ctx, 'OF OUR FAMILIES', width / 2, height * 0.51, {
    font: "'Cinzel', serif",
    fontSize: 52,
    gradient: ['#FFF4D4', '#E6C065', '#D4AF37'],
    letterSpacing: 8,
    shadow: { color: 'rgba(0, 0, 0, 0.9)', blur: 12, offsetX: 0, offsetY: 3 },
  });

  // Families in Poppins / Cinzel
  const groomFamily = project.couple.groomFamily || 'Sharma Family';
  const brideFamily = project.couple.brideFamily || 'Verma Family';
  drawFormattedText(ctx, `${groomFamily}   &   ${brideFamily}`, width / 2, height * 0.63, {
    font: "'Poppins', sans-serif",
    fontSize: 34,
    color: '#FDE49E',
    letterSpacing: 2,
    shadow: { color: 'rgba(0, 0, 0, 0.85)', blur: 8, offsetX: 0, offsetY: 2 },
  });

  ctx.restore();
  ctx.restore();
}

/**
 * SCENE 3: The Grand Couple Name Reveal (00:12 - 00:19 | 7s)
 * Couple's names are the central focal point framed by a large arch occupying most of the frame.
 * Bride's name first, ampersand, groom's name in Cinzel Decorative.
 * Dimensional gold lettering illuminated stroke by stroke.
 */
function renderScene3CoupleNameReveal(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number,
  time: number,
  project: WeddingProject
) {
  ctx.save();

  const zoom = 1.0 + progress * 0.04;
  ctx.translate(width / 2, height / 2);
  ctx.scale(zoom, zoom);
  ctx.translate(-width / 2, -height / 2);

  drawEdgeToEdgeTempleArchitecture(ctx, width, height, time);
  drawFullWidthMarigoldGarlands(ctx, width);
  drawHangingTempleBells(ctx, width, time);
  drawBrassDiyas(ctx, 90, height - 90, 42, time);
  drawBrassDiyas(ctx, width - 90, height - 90, 42, time + 1.2);

  // Subtitle Heading in Playfair Display
  drawFormattedText(ctx, 'CORDIALLY INVITE YOU TO CELEBRATE THE WEDDING OF', width / 2, height * 0.25, {
    font: "'Playfair Display', serif",
    fontSize: 28,
    color: '#D4AF37',
    letterSpacing: 4,
    shadow: { color: 'rgba(0, 0, 0, 0.85)', blur: 8, offsetX: 0, offsetY: 2 },
  });

  // Staggered Name Reveal: Bride first, &, Groom
  const brideAlpha = Math.min(1, Math.max(0, (progress - 0.08) * 3));
  const ampAlpha = Math.min(1, Math.max(0, (progress - 0.28) * 3.5));
  const groomAlpha = Math.min(1, Math.max(0, (progress - 0.46) * 3));

  // 1. Bride Name (Cinzel Decorative - Grand, Royal, High Readability)
  ctx.save();
  ctx.globalAlpha = brideAlpha;
  drawFormattedText(ctx, project.couple.brideName || 'Pooja', width / 2, height * 0.39, {
    font: "'Cinzel Decorative', 'Cinzel', serif",
    fontSize: 76,
    gradient: ['#FFF8DC', '#E6C065', '#D4AF37'],
    shadow: { color: 'rgba(0, 0, 0, 0.95)', blur: 16, offsetX: 0, offsetY: 4 },
  });

  if (project.couple.brideParents) {
    drawFormattedText(ctx, `Daughter of ${project.couple.brideParents}`, width / 2, height * 0.47, {
      font: "'Poppins', sans-serif",
      fontSize: 22,
      color: '#F5DEB3',
      shadow: { color: 'rgba(0, 0, 0, 0.85)', blur: 6, offsetX: 0, offsetY: 1 },
    });
  }
  ctx.restore();

  // 2. Ornate Ampersand
  ctx.save();
  ctx.globalAlpha = ampAlpha;
  drawFormattedText(ctx, '&', width / 2, height * 0.55, {
    font: "'Great Vibes', cursive",
    fontSize: 58,
    color: '#FFDF73',
    shadow: { color: 'rgba(0, 0, 0, 0.85)', blur: 12, offsetX: 0, offsetY: 2 },
  });
  ctx.restore();

  // 3. Groom Name (Cinzel Decorative)
  ctx.save();
  ctx.globalAlpha = groomAlpha;
  drawFormattedText(ctx, project.couple.groomName || 'Rahul', width / 2, height * 0.65, {
    font: "'Cinzel Decorative', 'Cinzel', serif",
    fontSize: 76,
    gradient: ['#FFF8DC', '#E6C065', '#D4AF37'],
    shadow: { color: 'rgba(0, 0, 0, 0.95)', blur: 16, offsetX: 0, offsetY: 4 },
  });

  if (project.couple.groomParents) {
    drawFormattedText(ctx, `Son of ${project.couple.groomParents}`, width / 2, height * 0.73, {
      font: "'Poppins', sans-serif",
      fontSize: 22,
      color: '#F5DEB3',
      shadow: { color: 'rgba(0, 0, 0, 0.85)', blur: 6, offsetX: 0, offsetY: 1 },
    });
  }
  ctx.restore();

  ctx.restore();
}

/**
 * SCENE 4: The Couple's Beautiful Moments (00:19 - 00:26 | 7s)
 * Wide cinematic 16:9 composition with photograph as the primary focal point.
 * Expansive 1160 × 620 frame filling the central widescreen canvas, with side pillars
 * and floral arrangements extending to the very edges.
 * Preserves original photographs and facial proportions without distortion.
 */
function renderScene4CoupleMoments(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number,
  time: number,
  project: WeddingProject,
  images: LoadedImages
) {
  ctx.save();

  const zoom = 1.0 + progress * 0.035;
  ctx.translate(width / 2, height / 2);
  ctx.scale(zoom, zoom);
  ctx.translate(-width / 2, -height / 2);

  drawEdgeToEdgeTempleArchitecture(ctx, width, height, time);
  drawFullWidthMarigoldGarlands(ctx, width);

  // Heading above photo in Playfair Display
  drawFormattedText(ctx, 'MOMENTS OF ETERNAL LOVE', width / 2, height * 0.13, {
    font: "'Playfair Display', serif",
    fontSize: 32,
    gradient: ['#FFE9A7', '#D4AF37', '#FFC83B'],
    letterSpacing: 6,
    shadow: { color: 'rgba(0, 0, 0, 0.85)', blur: 10, offsetX: 0, offsetY: 2 },
  });

  // Expansive Widescreen Photo Frame (1160 × 620 px)
  const coupleImg = images.couple || images.bride || images.groom;
  const photoOffsets = project.photos.offsets?.couple || {
    zoom: 1,
    offsetX: 0,
    offsetY: 0,
    frameShape: 'royal-arch',
    filter: 'royal-gold',
  };

  const frameW = 1160;
  const frameH = 630;
  const frameX = width / 2 - frameW / 2;
  const frameY = height * 0.18;

  if (coupleImg) {
    drawCroppedImage(ctx, coupleImg, frameX, frameY, frameW, frameH, {
      zoom: photoOffsets.zoom || 1.05,
      offsetX: photoOffsets.offsetX || 0,
      offsetY: photoOffsets.offsetY || 0,
      rotation: photoOffsets.rotation || 0,
      frameShape: photoOffsets.frameShape || 'royal-arch',
      filter: photoOffsets.filter || 'royal-gold',
      borderWidth: 6,
      borderColor: '#D4AF37',
    });
  } else {
    drawTempleMonogramPlaceholder(ctx, frameX, frameY, frameW, frameH, project);
  }

  // Floating rose and marigold petals in foreground
  drawFloatingRosePetals(ctx, width, height, time);

  // Couple names caption at bottom in Cinzel
  drawFormattedText(
    ctx,
    `${project.couple.brideName || 'Pooja'}   &   ${project.couple.groomName || 'Rahul'}`,
    width / 2,
    height * 0.91,
    {
      font: "'Cinzel', serif",
      fontSize: 36,
      gradient: ['#FFF0C2', '#D4AF37', '#FFDF73'],
      letterSpacing: 4,
      shadow: { color: 'rgba(0, 0, 0, 0.95)', blur: 12, offsetX: 0, offsetY: 3 },
    }
  );

  // Flanking brass floor lamps
  drawBrassDiyas(ctx, 90, height - 90, 42, time);
  drawBrassDiyas(ctx, width - 90, height - 90, 42, time + 1.2);

  ctx.restore();
}

/**
 * SCENE 5: The Auspicious Wedding Date (00:26 - 00:32 | 6s)
 * Date is large, prominent, and readable instantly on mobile screens.
 * Integrated into full-screen ceremonial background with brass kalash,
 * glowing diyas, rotating mandala, and golden light sweep.
 */
function renderScene5AuspiciousDate(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number,
  time: number,
  project: WeddingProject
) {
  ctx.save();

  drawEdgeToEdgeTempleArchitecture(ctx, width, height, time);
  drawFullWidthMarigoldGarlands(ctx, width);

  // Rotating golden mandala in background (large)
  ctx.save();
  ctx.globalAlpha = 0.35;
  drawMandala(ctx, width / 2, height * 0.52, 440, time * 0.08, 'rgba(212, 175, 55, 0.45)');
  ctx.restore();

  const weddingCeremony =
    project.ceremonies.find((c) => c.key === 'wedding') ||
    project.ceremonies[0] || {
      name: 'Wedding Ceremony',
      date: '2026-11-28',
      time: '07:00 PM',
      venueName: 'The Grand Palace',
    };

  // Header in Playfair Display
  drawFormattedText(ctx, 'SAVE THE AUSPICIOUS DATE', width / 2, height * 0.18, {
    font: "'Playfair Display', serif",
    fontSize: 38,
    color: '#FFEAA7',
    letterSpacing: 8,
    shadow: { color: 'rgba(0, 0, 0, 0.85)', blur: 12, offsetX: 0, offsetY: 2 },
  });

  // Sacred Brass Kalash Motif
  drawSacredKalash(ctx, width / 2, height * 0.33, 85, time);

  // Parse Date
  const dateObj = new Date(weddingCeremony.date || '2026-11-28');
  const dayStr = isNaN(dateObj.getTime())
    ? '28'
    : dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  const weekdayStr = isNaN(dateObj.getTime())
    ? 'Saturday'
    : dateObj.toLocaleDateString('en-US', { weekday: 'long' });

  // PROMINENT LARGE WEDDING DATE (Cinzel Decorative / Cinzel - Bold, Instant Readability)
  drawFormattedText(ctx, dayStr.toUpperCase(), width / 2, height * 0.53, {
    font: "'Cinzel Decorative', 'Cinzel', serif",
    fontSize: 66,
    gradient: ['#FFF8DB', '#E5C065', '#D4AF37'],
    letterSpacing: 4,
    shadow: { color: 'rgba(0, 0, 0, 0.95)', blur: 16, offsetX: 0, offsetY: 4 },
  });

  // Soft golden light sweep across the date
  const sweepPos = (progress * 1.4 - 0.2) * width;
  ctx.save();
  const sweepGrad = ctx.createLinearGradient(sweepPos - 220, 0, sweepPos + 220, 0);
  sweepGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
  sweepGrad.addColorStop(0.5, 'rgba(255, 240, 180, 0.45)');
  sweepGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = sweepGrad;
  ctx.fillRect(width * 0.15, height * 0.47, width * 0.7, 85);
  ctx.restore();

  // Day & Wedding Time in clean Poppins (highly legible on mobile)
  drawFormattedText(ctx, `${weekdayStr.toUpperCase()}   |   ${(weddingCeremony.time || '07:00 PM').toUpperCase()} ONWARDS`, width / 2, height * 0.65, {
    font: "'Poppins', sans-serif",
    fontSize: 30,
    color: '#FFF8EC',
    letterSpacing: 3,
    shadow: { color: 'rgba(0, 0, 0, 0.9)', blur: 8, offsetX: 0, offsetY: 2 },
  });

  // Auspicious Muhurat in Devanagari
  drawFormattedText(ctx, '॥ शुभ लग्न मुहूर्त : गोधूलि वेला ॥', width / 2, height * 0.76, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 34,
    gradient: ['#FFEAA7', '#D4AF37', '#FFC83B'],
    shadow: { color: 'rgba(0, 0, 0, 0.85)', blur: 10, offsetX: 0, offsetY: 2 },
  });

  // Brass floor lamps
  drawBrassDiyas(ctx, 90, height - 90, 42, time);
  drawBrassDiyas(ctx, width - 90, height - 90, 42, time + 1);

  ctx.restore();
}

/**
 * SCENE 6: The Wedding Venue and Celebration (00:32 - 00:38 | 6s)
 * Full-screen decorated mandap, warm hanging lights, high-contrast readable venue typography.
 * Venue Name: Playfair Display. Address & Time: Poppins.
 */
function renderScene6VenueCelebration(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number,
  time: number,
  project: WeddingProject
) {
  ctx.save();

  const zoom = 1.0 + progress * 0.04;
  ctx.translate(width / 2, height / 2);
  ctx.scale(zoom, zoom);
  ctx.translate(-width / 2, -height / 2);

  drawEdgeToEdgeTempleArchitecture(ctx, width, height, time);
  drawFullWidthMarigoldGarlands(ctx, width);
  drawWarmHangingLights(ctx, width, time);

  const primaryCeremony =
    project.ceremonies.find((c) => c.key === 'wedding') ||
    project.ceremonies[0] || {
      name: 'Wedding Ceremony',
      venueName: 'The Grand Heritage Palace',
      venueAddress: 'Royal Courtyard, Udaipur, Rajasthan, India',
      time: '07:00 PM',
    };

  // Header in Playfair Display
  drawFormattedText(ctx, 'WEDDING CEREMONY & CELEBRATION', width / 2, height * 0.22, {
    font: "'Playfair Display', serif",
    fontSize: 38,
    gradient: ['#FFEAA7', '#D4AF37', '#FFC83B'],
    letterSpacing: 6,
    shadow: { color: 'rgba(0, 0, 0, 0.9)', blur: 10, offsetX: 0, offsetY: 2 },
  });

  // Mandap Icon Emblem
  drawMandapIcon(ctx, width / 2, height * 0.36, 80);

  // Venue Name in Playfair Display (large, elegant)
  drawFormattedText(ctx, primaryCeremony.venueName || 'The Grand Heritage Palace', width / 2, height * 0.51, {
    font: "'Playfair Display', serif",
    fontSize: 48,
    color: '#FFF8EB',
    shadow: { color: 'rgba(0, 0, 0, 0.95)', blur: 14, offsetX: 0, offsetY: 3 },
  });

  // Venue Address in clean Poppins (ultra-readable on mobile, wrapped)
  drawFormattedText(ctx, primaryCeremony.venueAddress || 'Royal Courtyard, Udaipur, Rajasthan', width / 2, height * 0.61, {
    font: "'Poppins', sans-serif",
    fontSize: 28,
    color: '#F4E4D0',
    maxWidth: 1300,
    lineHeight: 38,
    shadow: { color: 'rgba(0, 0, 0, 0.95)', blur: 8, offsetX: 0, offsetY: 2 },
  });

  // Ceremony Timings in clean Poppins
  drawFormattedText(ctx, `Baraat Arrival: 06:00 PM   •   Jaimala & Phere: ${primaryCeremony.time || '07:30 PM'}`, width / 2, height * 0.72, {
    font: "'Poppins', sans-serif",
    fontSize: 24,
    color: '#FFDF73',
    letterSpacing: 2,
    shadow: { color: 'rgba(0, 0, 0, 0.85)', blur: 6, offsetX: 0, offsetY: 1 },
  });

  drawFloatingRosePetals(ctx, width, height, time);
  drawBrassDiyas(ctx, 90, height - 90, 42, time);
  drawBrassDiyas(ctx, width - 90, height - 90, 42, time + 1.8);

  ctx.restore();
}

/**
 * SCENE 7: The Grand Wedding Invitation Finale (00:38 - 00:45 | 7s)
 * Full-screen finale with edge-to-edge temple architecture, floral garland canopy,
 * refined ornamental border drawing itself in safe area, lotus motif, and final invitation.
 */
function renderScene7InvitationFinale(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number,
  time: number,
  project: WeddingProject
) {
  ctx.save();

  // Slow majestic pull-back (1.04 -> 1.0)
  const zoom = 1.04 - progress * 0.04;
  ctx.translate(width / 2, height / 2);
  ctx.scale(zoom, zoom);
  ctx.translate(-width / 2, -height / 2);

  // Grand golden background aura across whole canvas
  const auraGrad = ctx.createRadialGradient(
    width / 2,
    height * 0.5,
    60,
    width / 2,
    height * 0.5,
    width * 0.7
  );
  auraGrad.addColorStop(0, 'rgba(105, 18, 35, 0.95)');
  auraGrad.addColorStop(0.6, 'rgba(52, 8, 17, 0.98)');
  auraGrad.addColorStop(1, '#1A0208');
  ctx.fillStyle = auraGrad;
  ctx.fillRect(0, 0, width, height);

  // Full-bleed edge architecture
  drawEdgeToEdgeTempleArchitecture(ctx, width, height, time);
  drawFullWidthMarigoldGarlands(ctx, width);
  drawFloatingRosePetals(ctx, width, height, time);
  drawGoldenParticles(ctx, width, height, time, '#FFEAA7');

  // Animated ornamental border drawing itself in safe area
  const borderDrawProgress = Math.min(1, progress * 2.5);
  drawAnimatedOrnamentalBorder(ctx, width, height, borderDrawProgress);

  // Lotus motif at center top
  drawLotusMotif(ctx, width / 2, height * 0.2, 58, '#FFE494');

  // Text Hierarchy
  drawFormattedText(ctx, 'WE CORDIALLY INVITE YOU', width / 2, height * 0.31, {
    font: "'Playfair Display', serif",
    fontSize: 34,
    color: '#FFEAA7',
    letterSpacing: 6,
    shadow: { color: 'rgba(0, 0, 0, 0.85)', blur: 10, offsetX: 0, offsetY: 2 },
  });

  drawFormattedText(ctx, 'TO CELEBRATE THE WEDDING OF', width / 2, height * 0.38, {
    font: "'Poppins', sans-serif",
    fontSize: 24,
    color: '#FFF5E0',
    letterSpacing: 4,
    shadow: { color: 'rgba(0, 0, 0, 0.85)', blur: 6, offsetX: 0, offsetY: 1 },
  });

  // Bride & Groom Names (Grand Cinzel Decorative)
  const coupleText = `${project.couple.brideName || 'Pooja'}   &   ${project.couple.groomName || 'Rahul'}`;
  drawFormattedText(ctx, coupleText, width / 2, height * 0.51, {
    font: "'Cinzel Decorative', 'Cinzel', serif",
    fontSize: 68,
    gradient: ['#FFF8DB', '#E5C065', '#D4AF37'],
    letterSpacing: 4,
    shadow: { color: 'rgba(0, 0, 0, 0.95)', blur: 16, offsetX: 0, offsetY: 4 },
  });

  // Warm closing invitation in Playfair Display
  drawFormattedText(ctx, '“Your Presence Will Make Our Celebration Complete”', width / 2, height * 0.63, {
    font: "'Playfair Display', serif",
    fontSize: 32,
    color: '#FEEFC8',
    shadow: { color: 'rgba(0, 0, 0, 0.85)', blur: 8, offsetX: 0, offsetY: 2 },
  });

  // Salutation in Poppins
  const closing = project.message.closingSalutation || 'Soliciting Your Gracious Presence & Blessings';
  drawFormattedText(ctx, closing, width / 2, height * 0.72, {
    font: "'Poppins', sans-serif",
    fontSize: 24,
    color: '#D4AF37',
    letterSpacing: 2,
    shadow: { color: 'rgba(0, 0, 0, 0.85)', blur: 6, offsetX: 0, offsetY: 1 },
  });

  // Auspicious Mantra in Devanagari
  drawFormattedText(ctx, '॥ ॐ नमो भगवते वासुदेवाय नमः ॥', width / 2, height * 0.81, {
    font: "'Noto Serif Devanagari', serif",
    fontSize: 30,
    gradient: ['#FFE9A7', '#D4AF37', '#FFC83B'],
    shadow: { color: 'rgba(0, 0, 0, 0.85)', blur: 10, offsetX: 0, offsetY: 2 },
  });

  drawBrassDiyas(ctx, 90, height - 90, 42, time);
  drawBrassDiyas(ctx, width - 90, height - 90, 42, time + 2);

  ctx.restore();
}

/**
 * Executes the EXACT 6 full-screen cinematic transitions between scenes:
 * 1->2: Golden Temple Door Reveal (doors open from center, golden light fills frame)
 * 2->3: Golden Mandala Bloom (mandala spins, petals sweep outward across screen)
 * 3->4: Floral Archway (flower petals swirl, parting to reveal photo)
 * 4->5: Petals Transform into Gold (petals sweep across screen, turning into golden particles)
 * 5->6: Sacred Light Sweep (horizontal golden light wave sweeping across frame)
 * 6->7: Grand Golden Finale (golden halo spreads, lights intensify, petals fall)
 */
function renderSceneSpecificTransition(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  sceneIdx: number,
  sProgress: number,
  time: number
) {
  if (sProgress < 0.78 || sceneIdx >= 6) return;

  const tProgress = (sProgress - 0.78) / 0.22; // 0 to 1
  ctx.save();

  if (sceneIdx === 0) {
    // 1 -> 2: Golden Temple Door Reveal (doors slide from center outward)
    const doorSlide = tProgress * (width / 2);

    const lightW = width * tProgress * 1.6;
    const centerGrad = ctx.createRadialGradient(
      width / 2,
      height / 2,
      10,
      width / 2,
      height / 2,
      Math.max(10, lightW)
    );
    centerGrad.addColorStop(0, `rgba(255, 245, 205, ${tProgress * 0.98})`);
    centerGrad.addColorStop(0.4, `rgba(255, 200, 80, ${tProgress * 0.85})`);
    centerGrad.addColorStop(0.8, `rgba(212, 175, 55, ${tProgress * 0.5})`);
    centerGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = centerGrad;
    ctx.fillRect(0, 0, width, height);

    // Left Door
    ctx.fillStyle = '#380612';
    ctx.fillRect(0 - doorSlide, 0, width / 2, height);
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 4;
    ctx.strokeRect(30 - doorSlide, 30, width / 2 - 60, height - 60);

    // Right Door
    ctx.fillStyle = '#380612';
    ctx.fillRect(width / 2 + doorSlide, 0, width / 2, height);
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 4;
    ctx.strokeRect(width / 2 + doorSlide + 30, 30, width / 2 - 60, height - 60);
  } else if (sceneIdx === 1) {
    // 2 -> 3: Golden Mandala Bloom
    const maxR = Math.sqrt(width * width + height * height) * 0.58;
    const radius = maxR * tProgress;

    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(time * 3 + tProgress * Math.PI);

    const auraGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, Math.max(10, radius));
    auraGrad.addColorStop(0, `rgba(255, 240, 160, ${tProgress * 0.95})`);
    auraGrad.addColorStop(0.5, `rgba(212, 175, 55, ${tProgress * 0.7})`);
    auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = auraGrad;
    ctx.beginPath();
    ctx.arc(0, 0, Math.max(1, radius), 0, Math.PI * 2);
    ctx.fill();

    const petalCount = 32;
    for (let p = 0; p < petalCount; p++) {
      ctx.rotate((Math.PI * 2) / petalCount);
      ctx.fillStyle = p % 2 === 0 ? '#FF8C00' : '#E85D75';
      ctx.beginPath();
      ctx.ellipse(radius * 0.7, 0, 16 * tProgress, 9 * tProgress, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  } else if (sceneIdx === 2) {
    // 3 -> 4: The Floral Archway
    const swirlAlpha = tProgress * 0.92;
    ctx.fillStyle = `rgba(38, 4, 12, ${swirlAlpha * 0.45})`;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.translate(width / 2, height / 2);
    const count = 48;
    for (let i = 0; i < count; i++) {
      const angle = (i * Math.PI * 2) / count + time * 4;
      const dist = (1 - tProgress * 0.75) * (width * 0.45);
      const px = Math.cos(angle) * dist;
      const py = Math.sin(angle) * (dist * 0.58);

      ctx.fillStyle = i % 2 === 0 ? '#E85D75' : '#FFA500';
      ctx.globalAlpha = swirlAlpha;
      ctx.beginPath();
      ctx.ellipse(px, py, 20, 11, angle, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  } else if (sceneIdx === 3) {
    // 4 -> 5: Petals Transform into Gold
    const breezeX = tProgress * width * 1.35;
    const goldGrad = ctx.createLinearGradient(breezeX - 350, 0, breezeX + 350, 0);
    goldGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    goldGrad.addColorStop(0.5, `rgba(255, 215, 0, ${tProgress * 0.88})`);
    goldGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 60; i++) {
      const px = ((breezeX + i * 28) % width);
      const py = (i * 20) % height;
      ctx.fillStyle = '#FFEAA7';
      ctx.globalAlpha = tProgress;
      ctx.beginPath();
      ctx.arc(px, py, 3 + (i % 4), 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (sceneIdx === 4) {
    // 5 -> 6: The Sacred Light Sweep
    const waveX = tProgress * width * 1.5 - width * 0.25;
    const waveGrad = ctx.createLinearGradient(waveX - 300, 0, waveX + 300, 0);
    waveGrad.addColorStop(0, 'rgba(255, 215, 0, 0)');
    waveGrad.addColorStop(0.4, `rgba(255, 240, 170, ${tProgress * 0.95})`);
    waveGrad.addColorStop(0.6, `rgba(255, 190, 50, ${tProgress * 0.9})`);
    waveGrad.addColorStop(1, 'rgba(255, 215, 0, 0)');
    ctx.fillStyle = waveGrad;
    ctx.fillRect(0, 0, width, height);
  } else if (sceneIdx === 5) {
    // 6 -> 7: The Grand Golden Finale
    const haloGrad = ctx.createRadialGradient(
      width / 2,
      height * 0.45,
      20,
      width / 2,
      height * 0.45,
      width * 0.75 * tProgress
    );
    haloGrad.addColorStop(0, `rgba(255, 245, 190, ${tProgress * 0.94})`);
    haloGrad.addColorStop(0.5, `rgba(212, 175, 55, ${tProgress * 0.65})`);
    haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = haloGrad;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.restore();
}

/**
 * Volumetric Golden Sunrays streaming through temple courtyard
 */
function drawVolumetricRays(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  width: number,
  height: number,
  progress: number,
  time: number
) {
  ctx.save();
  const rayCount = 14;
  const rayAlpha = Math.min(1, progress * 1.8) * 0.32;

  for (let i = 0; i < rayCount; i++) {
    const angle = (i * Math.PI) / (rayCount - 1) + 0.12 * Math.sin(time * 0.5 + i);
    const rayLength = Math.max(width, height) * 1.3;
    const spread = 0.08 + 0.02 * Math.sin(time + i);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    const grad = ctx.createLinearGradient(0, 0, rayLength, 0);
    grad.addColorStop(0, `rgba(255, 245, 190, ${rayAlpha})`);
    grad.addColorStop(0.6, `rgba(255, 195, 75, ${rayAlpha * 0.4})`);
    grad.addColorStop(1, 'rgba(255, 195, 75, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(rayLength, -Math.tan(spread) * rayLength);
    ctx.lineTo(rayLength, Math.tan(spread) * rayLength);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

/**
 * Edge-to-Edge Temple Architecture
 * Left pillar flush at x = 0, Right pillar flush at x = width - 150.
 * Top beam spanning 0 to width. No shrinking or floating inset boxes!
 */
function drawEdgeToEdgeTempleArchitecture(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  _time: number
) {
  ctx.save();
  const pillarW = 150;

  // Left Stone Pillar (flush against left border: 0 to pillarW)
  drawSingleTemplePillar(ctx, 0, 0, pillarW, height, 'left');

  // Right Stone Pillar (flush against right border: width - pillarW to width)
  drawSingleTemplePillar(ctx, width - pillarW, 0, pillarW, height, 'right');

  // Top Ornamental Temple Arch Beam (spanning 0 to width)
  const beamH = 65;
  const beamGrad = ctx.createLinearGradient(0, 0, 0, beamH);
  beamGrad.addColorStop(0, '#560B1C');
  beamGrad.addColorStop(0.5, '#3A0612');
  beamGrad.addColorStop(1, '#22030A');
  ctx.fillStyle = beamGrad;
  ctx.fillRect(0, 0, width, beamH);

  // Gold Trim lines along top and bottom of beam
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, beamH);
  ctx.lineTo(width, beamH);
  ctx.stroke();

  // Decorative gold frieze motifs inside top beam
  ctx.strokeStyle = 'rgba(255, 223, 115, 0.5)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([12, 8]);
  ctx.beginPath();
  ctx.moveTo(150, beamH / 2);
  ctx.lineTo(width - 150, beamH / 2);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.restore();
}

/**
 * Draws a single carved temple pillar with ornamental base, capital, and fluting
 */
function drawSingleTemplePillar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  side: 'left' | 'right'
) {
  ctx.save();
  const shaftGrad = ctx.createLinearGradient(x, 0, x + w, 0);
  if (side === 'left') {
    shaftGrad.addColorStop(0, '#1E0308');
    shaftGrad.addColorStop(0.3, '#4A0A18');
    shaftGrad.addColorStop(0.7, '#380611');
    shaftGrad.addColorStop(1, '#1A0207');
  } else {
    shaftGrad.addColorStop(0, '#1A0207');
    shaftGrad.addColorStop(0.3, '#380611');
    shaftGrad.addColorStop(0.7, '#4A0A18');
    shaftGrad.addColorStop(1, '#1E0308');
  }
  ctx.fillStyle = shaftGrad;
  ctx.fillRect(x, y + 65, w, h - 130);

  // Vertical carved fluting with gold highlights
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
  ctx.lineWidth = 2;
  const fluteCount = 5;
  for (let i = 1; i <= fluteCount; i++) {
    const fx = x + (w / (fluteCount + 1)) * i;
    ctx.beginPath();
    ctx.moveTo(fx, y + 75);
    ctx.lineTo(fx, y + h - 75);
    ctx.stroke();
  }

  // Capital (top)
  const capGrad = ctx.createLinearGradient(x, 0, x + w, 0);
  capGrad.addColorStop(0, '#751128');
  capGrad.addColorStop(0.5, '#9C1A36');
  capGrad.addColorStop(1, '#4A0818');
  ctx.fillStyle = capGrad;
  ctx.fillRect(x, y + 50, w, 28);
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(x, y + 50, w, 28);

  // Base (bottom)
  ctx.fillStyle = capGrad;
  ctx.fillRect(x, y + h - 65, w, 35);
  ctx.strokeRect(x, y + h - 65, w, 35);

  ctx.restore();
}

/**
 * Traditional Indian Hanging Temple Bells swaying gently
 */
function drawHangingTempleBells(ctx: CanvasRenderingContext2D, width: number, time: number) {
  const bellPositions = [
    { x: 195, len: 140, sway: Math.sin(time * 2) * 0.08 },
    { x: 280, len: 110, sway: Math.sin(time * 2.2 + 0.5) * 0.07 },
    { x: width - 280, len: 110, sway: Math.sin(time * 2.1 + 1) * -0.07 },
    { x: width - 195, len: 140, sway: Math.sin(time * 1.9 + 1.5) * -0.08 },
  ];

  ctx.save();
  bellPositions.forEach(({ x, len, sway }) => {
    ctx.save();
    ctx.translate(x, 65);
    ctx.rotate(sway);

    // Hanging brass chain
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, len);
    ctx.stroke();
    ctx.setLineDash([]);

    // Brass bell body
    ctx.save();
    ctx.translate(0, len);
    const bellGrad = ctx.createLinearGradient(-20, 0, 20, 0);
    bellGrad.addColorStop(0, '#AA820A');
    bellGrad.addColorStop(0.5, '#FFE57F');
    bellGrad.addColorStop(1, '#8C6B05');
    ctx.fillStyle = bellGrad;

    ctx.beginPath();
    ctx.moveTo(0, -6);
    ctx.bezierCurveTo(-15, 0, -24, 24, -26, 34);
    ctx.lineTo(26, 34);
    ctx.bezierCurveTo(24, 24, 15, 0, 0, -6);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#5E4804';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Clapper
    ctx.fillStyle = '#FFE57F';
    ctx.beginPath();
    ctx.arc(Math.sin(time * 4) * 3, 38, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  });
  ctx.restore();
}

/**
 * Traditional Marigold Garland Drapes spanning the entire width 0 to 1920
 */
function drawFullWidthMarigoldGarlands(ctx: CanvasRenderingContext2D, width: number) {
  ctx.save();
  const segments = 44;
  const startX = 0;
  const endX = width;
  const stepX = (endX - startX) / segments;

  for (let i = 0; i <= segments; i++) {
    const x = startX + i * stepX;
    const normalized = (i - segments / 2) / (segments / 2);
    const sag = (1 - normalized * normalized) * 42 + 65;

    // Alternating bright saffron and yellow marigolds
    ctx.fillStyle = i % 2 === 0 ? '#FF8C00' : '#FFD700';
    ctx.beginPath();
    ctx.arc(x, sag, 11, 0, Math.PI * 2);
    ctx.fill();

    // Flower texture core
    ctx.fillStyle = i % 2 === 0 ? '#FFA500' : '#FFE44D';
    ctx.beginPath();
    ctx.arc(x, sag, 5.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/**
 * Flickering Brass Diya with warm radial illumination
 */
function drawBrassDiyas(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  time: number
) {
  ctx.save();
  ctx.translate(x, y);

  const flicker = 1.0 + Math.sin(time * 14) * 0.08 + Math.cos(time * 22) * 0.05;

  // 1. Warm radial illumination aura
  const auraGrad = ctx.createRadialGradient(0, -radius * 0.4, 6, 0, -radius * 0.4, radius * 3.6);
  auraGrad.addColorStop(0, 'rgba(255, 230, 130, 0.55)');
  auraGrad.addColorStop(0.4, 'rgba(255, 140, 20, 0.25)');
  auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = auraGrad;
  ctx.beginPath();
  ctx.arc(0, -radius * 0.4, radius * 3.6, 0, Math.PI * 2);
  ctx.fill();

  // 2. Brass Lamp Base
  const brassGrad = ctx.createLinearGradient(-radius, 0, radius, 0);
  brassGrad.addColorStop(0, '#8C6B05');
  brassGrad.addColorStop(0.3, '#FFE066');
  brassGrad.addColorStop(0.7, '#D4AF37');
  brassGrad.addColorStop(1, '#5E4804');
  ctx.fillStyle = brassGrad;

  ctx.beginPath();
  ctx.ellipse(0, 0, radius, radius * 0.45, 0, 0, Math.PI);
  ctx.fill();
  ctx.strokeStyle = '#473602';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Stem & Base Stand
  ctx.fillRect(-radius * 0.2, radius * 0.4, radius * 0.4, radius * 0.35);
  ctx.beginPath();
  ctx.ellipse(0, radius * 0.75, radius * 0.5, radius * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();

  // 3. Sacred Flickering Flame
  ctx.save();
  ctx.translate(0, -radius * 0.3);
  ctx.scale(flicker, flicker);

  // Outer flame
  ctx.fillStyle = '#FF6B00';
  ctx.beginPath();
  ctx.moveTo(0, -radius * 0.95);
  ctx.bezierCurveTo(radius * 0.4, -radius * 0.5, radius * 0.3, 0, 0, 0);
  ctx.bezierCurveTo(-radius * 0.3, 0, -radius * 0.4, -radius * 0.5, 0, -radius * 0.95);
  ctx.fill();

  // Inner flame
  ctx.fillStyle = '#FFF275';
  ctx.beginPath();
  ctx.moveTo(0, -radius * 0.75);
  ctx.bezierCurveTo(radius * 0.22, -radius * 0.4, radius * 0.16, 0, 0, 0);
  ctx.bezierCurveTo(-radius * 0.16, 0, -radius * 0.22, -radius * 0.4, 0, -radius * 0.75);
  ctx.fill();

  // White spark
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.ellipse(0, -radius * 0.15, radius * 0.08, radius * 0.15, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
  ctx.restore();
}

/**
 * Sacred Kalash Motif with mango leaves and coconut
 */
function drawSacredKalash(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  _time: number
) {
  ctx.save();
  ctx.translate(cx, cy);
  const s = size / 100;
  ctx.scale(s, s);

  const kalashGrad = ctx.createLinearGradient(-35, 0, 35, 0);
  kalashGrad.addColorStop(0, '#AA820A');
  kalashGrad.addColorStop(0.4, '#FFE57F');
  kalashGrad.addColorStop(0.8, '#D4AF37');
  kalashGrad.addColorStop(1, '#664E03');
  ctx.fillStyle = kalashGrad;

  ctx.beginPath();
  ctx.arc(0, 15, 36, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Red Mauli thread
  ctx.strokeStyle = '#D62246';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-28, -8);
  ctx.lineTo(28, -8);
  ctx.stroke();

  // Mango leaves
  ctx.fillStyle = '#2D6A4F';
  const leafAngles = [-0.65, -0.32, 0, 0.32, 0.65];
  leafAngles.forEach((ang) => {
    ctx.save();
    ctx.rotate(ang);
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.quadraticCurveTo(12, -35, 0, -50);
    ctx.quadraticCurveTo(-12, -35, 0, -10);
    ctx.fill();
    ctx.restore();
  });

  // Sacred Coconut
  ctx.fillStyle = '#7F4F24';
  ctx.beginPath();
  ctx.ellipse(0, -22, 16, 22, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();
}

/**
 * Sacred Lotus Flower Motif
 */
function drawLotusMotif(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  color: string = '#FFE494'
) {
  ctx.save();
  ctx.translate(cx, cy);
  const s = size / 60;
  ctx.scale(s, s);

  ctx.fillStyle = color;
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.moveTo(0, 10);
  ctx.quadraticCurveTo(14, -12, 0, -28);
  ctx.quadraticCurveTo(-14, -12, 0, 10);
  ctx.fill();
  ctx.stroke();

  [-1, 1].forEach((side) => {
    ctx.save();
    ctx.scale(side, 1);
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.quadraticCurveTo(24, -4, 20, -20);
    ctx.quadraticCurveTo(8, -8, 0, 10);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  });

  ctx.restore();
}

/**
 * Mandap Icon for Venue Scene
 */
function drawMandapIcon(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) {
  ctx.save();
  ctx.translate(cx, cy);
  const s = size / 80;
  ctx.scale(s, s);

  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 3;
  ctx.fillStyle = '#FFEAA7';

  ctx.strokeRect(-32, -15, 6, 45);
  ctx.strokeRect(26, -15, 6, 45);

  ctx.beginPath();
  ctx.moveTo(-40, -15);
  ctx.lineTo(0, -38);
  ctx.lineTo(40, -15);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, -42, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#FF7700';
  ctx.beginPath();
  ctx.moveTo(-10, 28);
  ctx.lineTo(0, 16);
  ctx.lineTo(10, 28);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

/**
 * Hanging Fairy Lights & Lamps spanning full width
 */
function drawWarmHangingLights(ctx: CanvasRenderingContext2D, width: number, time: number) {
  ctx.save();
  const count = 12;
  const step = width / (count + 1);

  for (let i = 1; i <= count; i++) {
    const x = i * step;
    const len = 70 + (i % 3) * 35;
    const pulse = 0.7 + 0.3 * Math.sin(time * 3 + i);

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(x, 65);
    ctx.lineTo(x, 65 + len);
    ctx.stroke();

    const bulbGrad = ctx.createRadialGradient(x, 65 + len, 2, x, 65 + len, 20);
    bulbGrad.addColorStop(0, `rgba(255, 245, 180, ${pulse})`);
    bulbGrad.addColorStop(0.5, `rgba(255, 180, 50, ${pulse * 0.5})`);
    bulbGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = bulbGrad;
    ctx.beginPath();
    ctx.arc(x, 65 + len, 20, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/**
 * Animated Ornamental Border Drawing in Safe Area (Finale)
 * Keeps essential safe margin (120px) without boxing or shrinking the visual composition
 */
function drawAnimatedOrnamentalBorder(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number
) {
  if (progress <= 0) return;
  ctx.save();
  const padX = 125;
  const padY = 85;
  const totalPerimeter = (width - padX * 2) * 2 + (height - padY * 2) * 2;
  const currentLen = totalPerimeter * progress;

  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 2.5;
  ctx.setLineDash([currentLen, totalPerimeter]);
  ctx.strokeRect(padX, padY, width - padX * 2, height - padY * 2);
  ctx.setLineDash([]);

  // Corner Florets
  const corners = [
    [padX, padY],
    [width - padX, padY],
    [width - padX, height - padY],
    [padX, height - padY],
  ];

  corners.forEach(([cx, cy]) => {
    ctx.fillStyle = '#FFE494';
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

/**
 * Placeholder when no photo is provided
 */
function drawTempleMonogramPlaceholder(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  project: WeddingProject
) {
  ctx.save();
  ctx.fillStyle = '#32050E';
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 4;
  ctx.strokeRect(x, y, w, h);

  const bInitial = (project.couple.brideName || 'P')[0].toUpperCase();
  const gInitial = (project.couple.groomName || 'R')[0].toUpperCase();

  drawFormattedText(ctx, `${bInitial}  ❤  ${gInitial}`, x + w / 2, y + h / 2 - 20, {
    font: "'Cinzel Decorative', 'Cinzel', serif",
    fontSize: 72,
    gradient: ['#FFEAA7', '#D4AF37', '#FFDF73'],
    shadow: { color: 'rgba(0, 0, 0, 0.9)', blur: 16, offsetX: 0, offsetY: 3 },
  });

  drawFormattedText(ctx, 'Sacred Matrimony', x + w / 2, y + h / 2 + 60, {
    font: "'Playfair Display', serif",
    fontSize: 32,
    color: '#F4DEB3',
    shadow: { color: 'rgba(0, 0, 0, 0.85)', blur: 8, offsetX: 0, offsetY: 2 },
  });
  ctx.restore();
}
