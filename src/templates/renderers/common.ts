/**
 * Common Canvas 2D Drawing Utilities for ShaadiMotion
 * Provides high-performance vector rendering for Indian wedding elements,
 * typography, golden glows, particles, and photo frame management.
 */

export interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  phase: number;
  color?: string;
}

// Generate deterministic particles based on seed/time
export function createParticleArray(count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random(),
      y: Math.random(),
      size: 1 + Math.random() * 4,
      speedY: 0.05 + Math.random() * 0.1,
      speedX: (Math.random() - 0.5) * 0.04,
      opacity: 0.3 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
    });
  }
  return particles;
}

const GLOBAL_GOLD_PARTICLES = createParticleArray(80);
const GLOBAL_ROSE_PETALS = createParticleArray(45);

export function drawGoldenParticles(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  color: string = '#FFE494'
) {
  ctx.save();
  for (let i = 0; i < GLOBAL_GOLD_PARTICLES.length; i++) {
    const p = GLOBAL_GOLD_PARTICLES[i];
    const y = ((p.y + time * p.speedY) % 1) * height;
    const x = ((p.x + Math.sin(time * 1.5 + p.phase) * 0.05 + time * p.speedX) % 1 + 1) % 1 * width;
    const pulse = 0.5 + 0.5 * Math.sin(time * 3 + p.phase);
    const alpha = p.opacity * pulse;

    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(x, y, p.size, 0, Math.PI * 2);
    ctx.fill();

    // Soft glow around larger particles
    if (p.size > 2.5) {
      ctx.globalAlpha = alpha * 0.4;
      ctx.beginPath();
      ctx.arc(x, y, p.size * 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

export function drawFloatingRosePetals(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
) {
  ctx.save();
  for (let i = 0; i < GLOBAL_ROSE_PETALS.length; i++) {
    const p = GLOBAL_ROSE_PETALS[i];
    const y = ((p.y + time * (p.speedY * 0.7)) % 1) * height;
    const sway = Math.sin(time * 1.2 + p.phase) * 60;
    const x = ((p.x * width + sway) % width + width) % width;
    const rot = time * 0.8 + p.phase;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.fillStyle = i % 2 === 0 ? '#E85D75' : '#FF758F';
    ctx.globalAlpha = 0.55 * (0.6 + 0.4 * Math.sin(time * 2 + p.phase));

    ctx.beginPath();
    ctx.ellipse(0, 0, p.size * 3.5, p.size * 2, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

/**
 * Draw an ornate Royal Indian arch frame with decorative corners & borders
 */
export function drawRoyalBorder(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  borderColor: string = '#D4AF37',
  innerColor: string = '#FFDF73'
) {
  ctx.save();
  const pad = 40;
  const innerPad = 52;

  // Outer border
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 3;
  ctx.strokeRect(pad, pad, width - pad * 2, height - pad * 2);

  // Inner border
  ctx.strokeStyle = innerColor;
  ctx.lineWidth = 1.2;
  ctx.setLineDash([8, 6]);
  ctx.strokeRect(innerPad, innerPad, width - innerPad * 2, height - innerPad * 2);
  ctx.setLineDash([]);

  // Corner flourishes
  const corners = [
    [pad, pad, 1, 1],
    [width - pad, pad, -1, 1],
    [width - pad, height - pad, -1, -1],
    [pad, height - pad, 1, -1],
  ];

  corners.forEach(([cx, cy, sx, sy]) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(sx, sy);
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2.5;

    // Corner bracket
    ctx.beginPath();
    ctx.moveTo(0, 35);
    ctx.lineTo(35, 35);
    ctx.lineTo(35, 0);
    ctx.stroke();

    // Corner decorative diamond
    ctx.fillStyle = borderColor;
    ctx.beginPath();
    ctx.moveTo(18, 10);
    ctx.lineTo(26, 18);
    ctx.lineTo(18, 26);
    ctx.lineTo(10, 18);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  });

  ctx.restore();
}

/**
 * Draw an auspicious Ganesh Ji motif
 */
export function drawGaneshMotif(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  color: string = '#D4AF37'
) {
  ctx.save();
  ctx.translate(cx, cy);
  const s = size / 100;
  ctx.scale(s, s);

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Head crown / Mukut
  ctx.beginPath();
  ctx.moveTo(-16, -24);
  ctx.lineTo(0, -42);
  ctx.lineTo(16, -24);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, -42, 3, 0, Math.PI * 2);
  ctx.fill();

  // Head and trunk curve (Om Ganesh silhouette)
  ctx.beginPath();
  ctx.moveTo(0, -22);
  ctx.bezierCurveTo(24, -22, 28, 5, 12, 18);
  ctx.bezierCurveTo(4, 25, 6, 38, 18, 38);
  ctx.stroke();

  // Left ear
  ctx.beginPath();
  ctx.bezierCurveTo(-4, -18, -26, -14, -26, 4);
  ctx.bezierCurveTo(-26, 16, -10, 20, 0, 14);
  ctx.stroke();

  // Modak (sweet) in trunk
  ctx.beginPath();
  ctx.arc(24, 34, 4.5, 0, Math.PI * 2);
  ctx.fill();

  // Tilak
  ctx.beginPath();
  ctx.arc(0, -10, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Draw rotating decorative sacred mandala
 */
export function drawMandala(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  rotation: number,
  color: string = 'rgba(212, 175, 55, 0.4)'
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;

  const petals = 16;
  for (let i = 0; i < petals; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI * 2) / petals);

    // Petal loop
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(radius * 0.4, radius * 0.6, 0, radius);
    ctx.quadraticCurveTo(-radius * 0.4, radius * 0.6, 0, 0);
    ctx.stroke();

    // Inner detail
    ctx.beginPath();
    ctx.arc(0, radius * 0.65, radius * 0.08, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // Concentric decorative circles
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.35, 0, Math.PI * 2);
  ctx.stroke();

  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.75, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

export type PhotoFilter = 'none' | 'royal-gold' | 'festive-vibrant' | 'vintage-sepia' | 'romantic-soft';
export type PhotoFrameShape = 'default' | 'royal-arch' | 'oval-kundan' | 'heritage-square' | 'floral-wreath' | 'modern-card';

/**
 * Draw an image fitted into a designated canvas area with professional frame shapes,
 * rotation, aspect-ratio preservation (object-fit: cover), zoom, pan offsets, and color grading.
 */
export function drawCroppedImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  targetX: number,
  targetY: number,
  targetW: number,
  targetH: number,
  options: {
    zoom?: number;
    offsetX?: number;
    offsetY?: number;
    isCircle?: boolean;
    borderRadius?: number;
    borderWidth?: number;
    borderColor?: string;
    rotation?: number;
    filter?: PhotoFilter;
    frameShape?: PhotoFrameShape;
  } = {}
) {
  const {
    zoom = 1,
    offsetX = 0,
    offsetY = 0,
    isCircle = false,
    borderRadius = 0,
    borderWidth = 0,
    borderColor = '#D4AF37',
    rotation = 0,
    filter = 'none',
    frameShape = 'default',
  } = options;

  if (!img || !img.complete || img.naturalWidth === 0) return;

  ctx.save();

  // 1. Create Clipping Path according to Frame Shape
  ctx.beginPath();
  const effectiveShape = frameShape !== 'default' ? frameShape : isCircle ? 'oval-kundan' : 'modern-card';

  if (effectiveShape === 'royal-arch') {
    // Royal Mughal Scalloped Arch
    const r = targetW / 2;
    const archH = targetH * 0.42;
    ctx.moveTo(targetX, targetY + targetH);
    ctx.lineTo(targetX, targetY + archH);
    ctx.bezierCurveTo(targetX, targetY, targetX + r * 0.4, targetY, targetX + r, targetY - 10);
    ctx.bezierCurveTo(targetX + targetW - r * 0.4, targetY, targetX + targetW, targetY, targetX + targetW, targetY + archH);
    ctx.lineTo(targetX + targetW, targetY + targetH);
    ctx.closePath();
  } else if (effectiveShape === 'oval-kundan') {
    // Royal Oval Medallion
    ctx.ellipse(targetX + targetW / 2, targetY + targetH / 2, targetW / 2, targetH / 2, 0, 0, Math.PI * 2);
  } else if (effectiveShape === 'floral-wreath') {
    // Circular Floral Frame
    const rad = Math.min(targetW, targetH) / 2;
    ctx.arc(targetX + targetW / 2, targetY + targetH / 2, rad, 0, Math.PI * 2);
  } else if (effectiveShape === 'heritage-square') {
    // Classic Square / Rectangle with slight radius
    ctx.roundRect(targetX, targetY, targetW, targetH, 8);
  } else {
    // Modern Card Rounded Rectangle
    const r = borderRadius > 0 ? borderRadius : 16;
    ctx.roundRect(targetX, targetY, targetW, targetH, r);
  }
  ctx.clip();

  // 2. Apply Professional Color Grading Filter
  if ('filter' in ctx) {
    switch (filter) {
      case 'royal-gold':
        ctx.filter = 'sepia(0.28) contrast(1.15) brightness(1.04) saturate(1.22)';
        break;
      case 'festive-vibrant':
        ctx.filter = 'saturate(1.42) contrast(1.12) brightness(1.02)';
        break;
      case 'vintage-sepia':
        ctx.filter = 'sepia(0.65) contrast(1.08) brightness(0.96)';
        break;
      case 'romantic-soft':
        ctx.filter = 'brightness(1.06) contrast(0.96) saturate(1.18)';
        break;
      default:
        ctx.filter = 'none';
        break;
    }
  }

  // 3. Calculate object-fit: cover coordinates
  const imgW = img.naturalWidth;
  const imgH = img.naturalHeight;
  const targetRatio = targetW / targetH;
  const imgRatio = imgW / imgH;

  let sW = imgW;
  let sH = imgH;
  let sX = 0;
  let sY = 0;

  if (imgRatio > targetRatio) {
    sW = imgH * targetRatio;
    sX = (imgW - sW) / 2;
  } else {
    sH = imgW / targetRatio;
    sY = (imgH - sH) / 2;
  }

  const clampedZoom = Math.max(1, Math.min(3, zoom));
  const effectiveSW = sW / clampedZoom;
  const effectiveSH = sH / clampedZoom;

  const panRangeX = (sW - effectiveSW) / 2;
  const panRangeY = (sH - effectiveSH) / 2;

  const finalSX = Math.max(0, Math.min(imgW - effectiveSW, sX + (sW - effectiveSW) / 2 + (offsetX / 100) * panRangeX));
  const finalSY = Math.max(0, Math.min(imgH - effectiveSH, sY + (sH - effectiveSH) / 2 + (offsetY / 100) * panRangeY));

  // 4. Handle Rotation
  if (rotation && rotation !== 0) {
    ctx.save();
    ctx.translate(targetX + targetW / 2, targetY + targetH / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(img, finalSX, finalSY, effectiveSW, effectiveSH, -targetW / 2, -targetH / 2, targetW, targetH);
    ctx.restore();
  } else {
    ctx.drawImage(img, finalSX, finalSY, effectiveSW, effectiveSH, targetX, targetY, targetW, targetH);
  }

  // Reset filter
  if ('filter' in ctx) {
    ctx.filter = 'none';
  }
  ctx.restore();

  // 5. Decorative Outer Border & Jewels
  ctx.save();
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = borderWidth > 0 ? borderWidth : 4;

  if (effectiveShape === 'royal-arch') {
    const r = targetW / 2;
    const archH = targetH * 0.42;
    ctx.beginPath();
    ctx.moveTo(targetX, targetY + targetH);
    ctx.lineTo(targetX, targetY + archH);
    ctx.bezierCurveTo(targetX, targetY, targetX + r * 0.4, targetY, targetX + r, targetY - 10);
    ctx.bezierCurveTo(targetX + targetW - r * 0.4, targetY, targetX + targetW, targetY, targetX + targetW, targetY + archH);
    ctx.lineTo(targetX + targetW, targetY + targetH);
    ctx.closePath();
    ctx.stroke();

    // Crown jewel at top point
    ctx.fillStyle = '#C41E3A';
    ctx.beginPath();
    ctx.arc(targetX + r, targetY - 10, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else if (effectiveShape === 'oval-kundan') {
    ctx.beginPath();
    ctx.ellipse(targetX + targetW / 2, targetY + targetH / 2, targetW / 2, targetH / 2, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Kundan bead pearls around perimeter
    const beadCount = 28;
    const cx = targetX + targetW / 2;
    const cy = targetY + targetH / 2;
    const rx = targetW / 2 + 5;
    const ry = targetH / 2 + 5;
    ctx.fillStyle = '#FFE494';
    for (let b = 0; b < beadCount; b++) {
      const angle = (b * Math.PI * 2) / beadCount;
      const bx = cx + Math.cos(angle) * rx;
      const by = cy + Math.sin(angle) * ry;
      ctx.beginPath();
      ctx.arc(bx, by, b % 2 === 0 ? 3.5 : 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (effectiveShape === 'floral-wreath') {
    const rad = Math.min(targetW, targetH) / 2;
    ctx.beginPath();
    ctx.arc(targetX + targetW / 2, targetY + targetH / 2, rad, 0, Math.PI * 2);
    ctx.stroke();

    // Floral Petals along border
    const petals = 18;
    const cx = targetX + targetW / 2;
    const cy = targetY + targetH / 2;
    ctx.fillStyle = '#E85D75';
    for (let p = 0; p < petals; p++) {
      const angle = (p * Math.PI * 2) / petals;
      const px = cx + Math.cos(angle) * (rad + 6);
      const py = cy + Math.sin(angle) * (rad + 6);
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (effectiveShape === 'heritage-square') {
    ctx.strokeRect(targetX, targetY, targetW, targetH);
    // 4 Filigree Corner Flourishes
    const cornerSize = 18;
    const corners = [
      [targetX, targetY, 1, 1],
      [targetX + targetW, targetY, -1, 1],
      [targetX + targetW, targetY + targetH, -1, -1],
      [targetX, targetY + targetH, 1, -1],
    ];
    corners.forEach(([cx, cy, sx, sy]) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(sx, sy);
      ctx.fillStyle = borderColor;
      ctx.fillRect(0, 0, cornerSize, 4);
      ctx.fillRect(0, 0, 4, cornerSize);
      ctx.beginPath();
      ctx.arc(6, 6, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  } else {
    ctx.beginPath();
    ctx.roundRect(targetX, targetY, targetW, targetH, borderRadius > 0 ? borderRadius : 16);
    ctx.stroke();
  }
  ctx.restore();
}

/**
 * Render dynamic cinematic transition effect across scene boundaries
 */
export function drawCinematicTransition(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  sceneProgress: number,
  transitionType: string = 'auto',
  templateId: string = 'royal-maharaja',
  time: number = 0
) {
  // Only trigger at scene transition boundary (outgoing: >0.84, incoming: <0.16)
  const isOutgoing = sceneProgress > 0.84;
  const isIncoming = sceneProgress < 0.16;

  if (!isOutgoing && !isIncoming) return;

  // Calculate transition normalized phase [0, 1]
  // 0 -> 1 during exit, and 1 -> 0 during entrance
  let transProgress = 0;
  if (isOutgoing) {
    transProgress = (sceneProgress - 0.84) / 0.16; // 0 to 1
  } else {
    transProgress = (0.16 - sceneProgress) / 0.16; // 1 to 0
  }

  // Auto-resolve transition type based on template
  let effectiveType = transitionType;
  if (effectiveType === 'auto') {
    if (templateId === 'royal-maharaja' || templateId === 'royal-rajasthani') {
      effectiveType = 'royal-curtain';
    } else if (templateId === 'shubh-vivah' || templateId === 'traditional-indian') {
      effectiveType = 'mandala-bloom';
    } else if (templateId === 'cinematic-wedding' || templateId === 'modern-love') {
      effectiveType = 'light-leak';
    } else if (templateId === 'golden-celebration' || templateId === 'classic-indian') {
      effectiveType = 'gold-stardust';
    } else {
      effectiveType = 'gold-stardust';
    }
  }

  ctx.save();

  if (effectiveType === 'light-leak') {
    // 1. Anamorphic Film Light Leak Flare
    const flareX = (1 - transProgress) * width * 1.2;
    const flareAlpha = transProgress * 0.95;

    const leakGrad = ctx.createRadialGradient(flareX, height * 0.5, 50, flareX, height * 0.5, width * 0.8);
    leakGrad.addColorStop(0, `rgba(255, 230, 170, ${flareAlpha})`);
    leakGrad.addColorStop(0.3, `rgba(255, 160, 40, ${flareAlpha * 0.75})`);
    leakGrad.addColorStop(0.7, `rgba(212, 175, 55, ${flareAlpha * 0.4})`);
    leakGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = leakGrad;
    ctx.fillRect(0, 0, width, height);

    // Horizontal Anamorphic Blue/Amber Streak
    const streakH = 60;
    const streakGrad = ctx.createLinearGradient(0, height / 2 - streakH, 0, height / 2 + streakH);
    streakGrad.addColorStop(0, 'rgba(255, 215, 0, 0)');
    streakGrad.addColorStop(0.5, `rgba(255, 240, 200, ${transProgress * 0.85})`);
    streakGrad.addColorStop(1, 'rgba(255, 215, 0, 0)');
    ctx.fillStyle = streakGrad;
    ctx.fillRect(0, height / 2 - streakH, width, streakH * 2);
  } else if (effectiveType === 'royal-curtain') {
    // 2. Royal Velvet Palace Curtain Split Wipe
    const curtainW = (width / 2) * transProgress;
    ctx.fillStyle = '#42030D';

    // Left Curtain
    ctx.fillRect(0, 0, curtainW, height);
    // Right Curtain
    ctx.fillRect(width - curtainW, 0, curtainW, height);

    // Golden trimmed leading edges
    if (curtainW > 10) {
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(curtainW, 0);
      ctx.lineTo(curtainW, height);
      ctx.moveTo(width - curtainW, 0);
      ctx.lineTo(width - curtainW, height);
      ctx.stroke();

      // Golden tassels on leading edge
      ctx.fillStyle = '#FFE494';
      for (let y = 50; y < height; y += 120) {
        ctx.beginPath();
        ctx.arc(curtainW, y, 6, 0, Math.PI * 2);
        ctx.arc(width - curtainW, y, 6, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else if (effectiveType === 'mandala-bloom') {
    // 3. Sacred Golden Mandala Iris Bloom
    const maxRadius = Math.sqrt(width * width + height * height) * 0.6;
    const radius = maxRadius * (1 - transProgress);

    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(time * 2 + transProgress * Math.PI);

    // Radial gold aura
    const auraGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, radius);
    auraGrad.addColorStop(0, `rgba(212, 175, 55, ${transProgress * 0.9})`);
    auraGrad.addColorStop(0.6, `rgba(139, 0, 0, ${transProgress * 0.8})`);
    auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = auraGrad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();

    // Sacred rotating petals
    const petals = 24;
    ctx.strokeStyle = '#FFE494';
    ctx.lineWidth = 3;
    for (let p = 0; p < petals; p++) {
      ctx.rotate((Math.PI * 2) / petals);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(radius * 0.5, radius * 0.5, 0, radius);
      ctx.stroke();
    }
    ctx.restore();
  } else if (effectiveType === 'zoom-push') {
    // 4. Cinematic Zoom-Push & Motion Blur streaks
    ctx.fillStyle = `rgba(14, 13, 17, ${transProgress * 0.85})`;
    ctx.fillRect(0, 0, width, height);

    // Motion streaks
    ctx.strokeStyle = 'rgba(255, 228, 148, 0.4)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 20; i++) {
      const sx = Math.random() * width;
      const sy = Math.random() * height;
      const len = 80 * transProgress;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx + len, sy);
      ctx.stroke();
    }
  } else {
    // 5. Golden Stardust Swirl Dissolve ('gold-stardust')
    const dustCount = 80;
    const burstAlpha = transProgress * 0.95;

    // Flash glow in center
    const glow = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width * 0.6);
    glow.addColorStop(0, `rgba(255, 235, 150, ${burstAlpha * 0.8})`);
    glow.addColorStop(0.5, `rgba(212, 175, 55, ${burstAlpha * 0.5})`);
    glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    // Twinkling Stardust particle burst
    for (let i = 0; i < dustCount; i++) {
      const angle = (i * Math.PI * 2) / dustCount + time * 3;
      const dist = (Math.sin(i * 13 + time * 5) * 0.5 + 0.5) * (width * 0.55) * transProgress;
      const px = width / 2 + Math.cos(angle) * dist;
      const py = height / 2 + Math.sin(angle) * (dist * 0.6);
      const starSize = 2 + (i % 5) * 2;

      ctx.fillStyle = i % 2 === 0 ? '#FFE89E' : '#FFFFFF';
      ctx.globalAlpha = burstAlpha * (0.6 + 0.4 * Math.sin(time * 10 + i));
      ctx.beginPath();
      ctx.arc(px, py, starSize, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
}

/**
 * Draw multi-line centered text with optional gradient, glow, and max-width wrapping
 */
export function drawFormattedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  options: {
    font?: string;
    fontSize?: number;
    color?: string;
    gradient?: string[];
    align?: CanvasTextAlign;
    lineHeight?: number;
    maxWidth?: number;
    letterSpacing?: number | string;
    glow?: { color: string; blur: number };
    shadow?: { color: string; blur: number; offsetX?: number; offsetY?: number };
    strokeOutline?: boolean;
  } = {}
) {
  const {
    font = "'Cinzel', serif",
    fontSize = 34,
    color = '#FFFFFF',
    gradient,
    align = 'center',
    maxWidth = 1680,
    letterSpacing,
    glow,
    shadow,
    strokeOutline = true,
  } = options;

  // Boost font size by 20% across all templates for high-impact visibility
  const effectiveFontSize = Math.round(fontSize * 1.22);
  const effectiveLineHeight = options.lineHeight
    ? Math.round(options.lineHeight * 1.20)
    : Math.round(effectiveFontSize * 1.34);

  ctx.save();

  // Ensure solid legible font weight (600/700/bold) if not explicitly supplied
  const hasWeight = /bold|[1-9]00/i.test(font);
  const fontSpec = hasWeight ? `${effectiveFontSize}px ${font}` : `600 ${effectiveFontSize}px ${font}`;
  ctx.font = fontSpec;

  if (letterSpacing && 'letterSpacing' in ctx) {
    (ctx as unknown as { letterSpacing: string }).letterSpacing = typeof letterSpacing === 'number' ? `${letterSpacing}px` : letterSpacing;
  }
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';

  // Handle explicit newlines and wrap words
  const rawLines = text.split('\n');
  const wrappedLines: string[] = [];

  for (const rawLine of rawLines) {
    const words = rawLine.split(' ');
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine) {
        wrappedLines.push(currentLine);
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      wrappedLines.push(currentLine);
    }
  }

  const totalHeight = (wrappedLines.length - 1) * effectiveLineHeight;
  const startY = y - totalHeight / 2;

  // 1. High-contrast outline pass for 100% legibility over any bright background or particles
  if (strokeOutline) {
    ctx.save();
    const isDarkColor =
      typeof color === 'string' &&
      (/^#(?:[0-4][0-9a-f]{5}|[0-4][0-9a-f]{2})/i.test(color) ||
        color === '#8B0000' ||
        color === '#7A0A1F' ||
        color === '#6B0D25');
    ctx.strokeStyle = isDarkColor ? 'rgba(255, 248, 220, 0.85)' : 'rgba(10, 2, 5, 0.9)';
    ctx.lineWidth = Math.max(3, effectiveFontSize * 0.08);
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;
    for (let i = 0; i < wrappedLines.length; i++) {
      ctx.strokeText(wrappedLines[i], x, startY + i * effectiveLineHeight);
    }
    ctx.restore();
  }

  // 2. High-contrast drop shadow or glow
  if (shadow) {
    ctx.shadowColor = shadow.color;
    ctx.shadowBlur = shadow.blur;
    ctx.shadowOffsetX = shadow.offsetX || 0;
    ctx.shadowOffsetY = shadow.offsetY || 0;
  } else if (glow) {
    ctx.shadowColor = glow.color;
    ctx.shadowBlur = glow.blur;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  } else {
    // Default crisp shadow for all templates
    ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
    ctx.shadowBlur = Math.max(8, effectiveFontSize * 0.18);
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 3;
  }

  // 3. Fill text with rich color or gradient
  if (gradient && gradient.length >= 2) {
    const grad = ctx.createLinearGradient(x - 350, y, x + 350, y);
    grad.addColorStop(0, gradient[0]);
    grad.addColorStop(0.5, gradient[1]);
    grad.addColorStop(1, gradient[2] || gradient[0]);
    ctx.fillStyle = grad;
  } else {
    ctx.fillStyle = color;
  }

  for (let i = 0; i < wrappedLines.length; i++) {
    ctx.fillText(wrappedLines[i], x, startY + i * effectiveLineHeight);
  }

  ctx.restore();
}
