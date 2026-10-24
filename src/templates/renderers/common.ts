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

/**
 * Draw an image fitted into a designated canvas rectangle or circle
 * with aspect-ratio preservation (object-fit: cover), zoom, and pan offsets.
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
  } = options;

  if (!img || !img.complete || img.naturalWidth === 0) return;

  ctx.save();

  // Create clipping path
  ctx.beginPath();
  if (isCircle) {
    const radius = Math.min(targetW, targetH) / 2;
    ctx.arc(targetX + targetW / 2, targetY + targetH / 2, radius, 0, Math.PI * 2);
  } else if (borderRadius > 0) {
    const r = borderRadius;
    ctx.roundRect(targetX, targetY, targetW, targetH, r);
  } else {
    ctx.rect(targetX, targetY, targetW, targetH);
  }
  ctx.clip();

  // Calculate object-fit: cover coordinates
  const imgW = img.naturalWidth;
  const imgH = img.naturalHeight;
  const targetRatio = targetW / targetH;
  const imgRatio = imgW / imgH;

  let sW = imgW;
  let sH = imgH;
  let sX = 0;
  let sY = 0;

  if (imgRatio > targetRatio) {
    // Image is wider than target
    sW = imgH * targetRatio;
    sX = (imgW - sW) / 2;
  } else {
    // Image is taller than target
    sH = imgW / targetRatio;
    sY = (imgH - sH) / 2;
  }

  // Apply user zoom and pan offsets
  const clampedZoom = Math.max(1, Math.min(3, zoom));
  const effectiveSW = sW / clampedZoom;
  const effectiveSH = sH / clampedZoom;

  const panRangeX = (sW - effectiveSW) / 2;
  const panRangeY = (sH - effectiveSH) / 2;

  const finalSX = Math.max(0, Math.min(imgW - effectiveSW, sX + (sW - effectiveSW) / 2 + (offsetX / 100) * panRangeX));
  const finalSY = Math.max(0, Math.min(imgH - effectiveSH, sY + (sH - effectiveSH) / 2 + (offsetY / 100) * panRangeY));

  ctx.drawImage(img, finalSX, finalSY, effectiveSW, effectiveSH, targetX, targetY, targetW, targetH);
  ctx.restore();

  // Optional decorative stroke
  if (borderWidth > 0) {
    ctx.save();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.beginPath();
    if (isCircle) {
      const radius = Math.min(targetW, targetH) / 2;
      ctx.arc(targetX + targetW / 2, targetY + targetH / 2, radius, 0, Math.PI * 2);
    } else if (borderRadius > 0) {
      ctx.roundRect(targetX, targetY, targetW, targetH, borderRadius);
    } else {
      ctx.rect(targetX, targetY, targetW, targetH);
    }
    ctx.stroke();
    ctx.restore();
  }
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
  } = {}
) {
  const {
    font = "'Cinzel', serif",
    fontSize = 32,
    color = '#FFFFFF',
    gradient,
    align = 'center',
    lineHeight = fontSize * 1.35,
    maxWidth = 1600,
    letterSpacing,
    glow,
  } = options;

  ctx.save();
  ctx.font = `${fontSize}px ${font}`;
  if (letterSpacing && 'letterSpacing' in ctx) {
    (ctx as unknown as { letterSpacing: string }).letterSpacing = typeof letterSpacing === 'number' ? `${letterSpacing}px` : letterSpacing;
  }
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';

  if (glow) {
    ctx.shadowColor = glow.color;
    ctx.shadowBlur = glow.blur;
  }

  if (gradient && gradient.length >= 2) {
    const grad = ctx.createLinearGradient(x - 300, y, x + 300, y);
    grad.addColorStop(0, gradient[0]);
    grad.addColorStop(0.5, gradient[1]);
    grad.addColorStop(1, gradient[2] || gradient[0]);
    ctx.fillStyle = grad;
  } else {
    ctx.fillStyle = color;
  }

  // Handle explicit newlines first
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

  const totalHeight = (wrappedLines.length - 1) * lineHeight;
  let startY = y - totalHeight / 2;

  for (let i = 0; i < wrappedLines.length; i++) {
    ctx.fillText(wrappedLines[i], x, startY + i * lineHeight);
  }

  ctx.restore();
}
