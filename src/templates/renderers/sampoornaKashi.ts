/**
 * Sampoorna Kashi Shubh Vivah — Ultra-Premium 7-Scene Masterpiece Renderer
 * Inspired by ancient Kashi temple architecture, sacred Agni Havan Kund,
 * Swarna Dhara 2.0 transitions, and authentic Banarasi royal patrikas.
 * 
 * Specifications:
 * - Aspect Ratio: 16:9 Landscape (1920x1080 / 3840x2160)
 * - Duration: 45 Seconds (7 Scenes)
 * - Color Palette: Deep Sindoor Red (#8B0000), Royal Maroon (#580812),
 *   Swarna Gold (#FFD700), Haldi Yellow (#FDB813), Ivory White (#FFFDF9)
 */

import type { WeddingProject } from '../../types/wedding';
import type { LoadedImages } from '../../services/videoRenderer';
import {
  drawFormattedText,
  drawCroppedImage,
  createParticleArray,
} from './common';

// Color Palette Constants
const COLOR_SINDOOR_RED = '#8B0000';
const COLOR_ROYAL_MAROON = '#580812';
const COLOR_DARK_BASE = '#1A0205';
const COLOR_SWARNA_GOLD = '#FFD700';
const COLOR_HALDI_YELLOW = '#FDB813';
const COLOR_IVORY_WHITE = '#FFFDF9';

function drawKashiText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  font: string,
  fontSize: number,
  color: string,
  align: CanvasTextAlign = 'center',
  strokeOutline: boolean = true
) {
  drawFormattedText(ctx, text, x, y, {
    font,
    fontSize,
    color,
    align,
    strokeOutline,
  });
}

// Deterministic particle systems
const KASHI_GOLD_DUST = createParticleArray(90);
const SWARNA_DHARA_COINS = createParticleArray(140);
const HAVAN_EMBERS = createParticleArray(60);
const ROSE_PETALS = createParticleArray(40);

/**
 * Procedural Mango-leaf & Marigold Bandanwar across the top arch
 */
function drawTopBandanwar(
  ctx: CanvasRenderingContext2D,
  width: number,
  time: number
) {
  ctx.save();
  const garlandCount = Math.floor(width / 75);
  const startY = 15;

  // Hanging sacred rope
  ctx.beginPath();
  ctx.strokeStyle = '#6B4210';
  ctx.lineWidth = 4;
  ctx.moveTo(0, startY);
  for (let i = 0; i <= garlandCount; i++) {
    const x = i * (width / garlandCount);
    const drop = Math.sin((i / garlandCount) * Math.PI) * 12 + 10;
    ctx.lineTo(x, startY + drop);
  }
  ctx.stroke();

  // Draw mango leaves and marigold blossoms
  for (let i = 0; i < garlandCount; i++) {
    const x = (i + 0.5) * (width / garlandCount);
    const y = startY + Math.sin((i / garlandCount) * Math.PI) * 12 + 10;
    const sway = Math.sin(time * 2.2 + i * 0.7) * 4;

    // Mango leaf (curved teardrop)
    ctx.save();
    ctx.translate(x + sway * 0.5, y);
    ctx.rotate((Math.sin(time * 1.5 + i) * 0.08) + (i % 2 === 0 ? 0.05 : -0.05));
    
    // Leaf body
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-14, 25, -12, 55, 0, 75);
    ctx.bezierCurveTo(12, 55, 14, 25, 0, 0);
    const leafGrad = ctx.createLinearGradient(-10, 0, 10, 75);
    leafGrad.addColorStop(0, '#1E5E2A');
    leafGrad.addColorStop(0.6, '#2D7D32');
    leafGrad.addColorStop(1, '#1B4D20');
    ctx.fillStyle = leafGrad;
    ctx.fill();

    // Leaf gold central spine
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.moveTo(0, 5);
    ctx.lineTo(0, 70);
    ctx.stroke();
    ctx.restore();

    // Marigold flower at anchor point
    ctx.save();
    ctx.translate(x, y + 2);
    const flowerRadius = 14 + (i % 3);
    const petalCount = 12;
    for (let p = 0; p < petalCount; p++) {
      const angle = (p / petalCount) * Math.PI * 2;
      const px = Math.cos(angle) * (flowerRadius * 0.7);
      const py = Math.sin(angle) * (flowerRadius * 0.7);
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fillStyle = p % 2 === 0 ? COLOR_HALDI_YELLOW : '#FF8C00';
      ctx.fill();
    }
    // Flower center
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#C85A00';
    ctx.fill();

    // Golden brass bell suspended below every 3rd flower
    if (i % 3 === 1) {
      const bellSway = Math.sin(time * 3 + i) * 5;
      ctx.beginPath();
      ctx.strokeStyle = COLOR_SWARNA_GOLD;
      ctx.lineWidth = 1.5;
      ctx.moveTo(0, 10);
      ctx.lineTo(bellSway, 32);
      ctx.stroke();

      ctx.save();
      ctx.translate(bellSway, 32);
      ctx.beginPath();
      ctx.moveTo(-7, 10);
      ctx.lineTo(7, 10);
      ctx.lineTo(5, 0);
      ctx.lineTo(-5, 0);
      ctx.closePath();
      const bellGrad = ctx.createLinearGradient(-7, 0, 7, 10);
      bellGrad.addColorStop(0, COLOR_SWARNA_GOLD);
      bellGrad.addColorStop(0.5, '#FFF275');
      bellGrad.addColorStop(1, '#B8860B');
      ctx.fillStyle = bellGrad;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 10, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#B8860B';
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  }
  ctx.restore();
}

/**
 * Royal Kundan Jharokha Frame with inlaid gemstones
 */
function drawKundanJharokhaFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
) {
  ctx.save();
  const pillarWidth = 85;

  // Left & Right Royal Pillars
  const pillarGrad = ctx.createLinearGradient(0, 0, pillarWidth, 0);
  pillarGrad.addColorStop(0, '#3A060C');
  pillarGrad.addColorStop(0.2, '#6D101E');
  pillarGrad.addColorStop(0.5, '#A31C2E');
  pillarGrad.addColorStop(0.8, '#5C0B17');
  pillarGrad.addColorStop(1, '#2E0409');

  // Left Pillar Body
  ctx.fillStyle = pillarGrad;
  ctx.fillRect(0, 0, pillarWidth, height);
  // Right Pillar Body
  ctx.save();
  ctx.translate(width, 0);
  ctx.scale(-1, 1);
  ctx.fillRect(0, 0, pillarWidth, height);
  ctx.restore();

  // Inlaid Kundan Gemstones along pillar edges
  const gemSpacing = 65;
  const gemCount = Math.floor(height / gemSpacing);
  for (let i = 1; i < gemCount; i++) {
    const gy = i * gemSpacing;
    const isRuby = i % 2 === 0;

    // Left Gem
    drawKundanGem(ctx, pillarWidth - 20, gy, isRuby, time + i);
    // Right Gem
    drawKundanGem(ctx, width - pillarWidth + 20, gy, isRuby, time + i);
  }

  // Golden filigree borders along pillars
  ctx.strokeStyle = COLOR_SWARNA_GOLD;
  ctx.lineWidth = 3;
  ctx.shadowColor = 'rgba(255, 215, 0, 0.6)';
  ctx.shadowBlur = 10;
  ctx.strokeRect(pillarWidth - 8, 0, 2, height);
  ctx.strokeRect(width - pillarWidth + 6, 0, 2, height);

  // Outer corner filigree
  drawCornerFiligree(ctx, pillarWidth + 25, 55, 0);
  drawCornerFiligree(ctx, width - pillarWidth - 25, 55, Math.PI / 2);
  drawCornerFiligree(ctx, width - pillarWidth - 25, height - 55, Math.PI);
  drawCornerFiligree(ctx, pillarWidth + 25, height - 55, -Math.PI / 2);

  ctx.restore();
}

/**
 * Individual Kundan Gemstone (Ruby or Emerald) in a gold setting
 */
function drawKundanGem(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  isRuby: boolean,
  timeOffset: number
) {
  ctx.save();
  ctx.translate(x, y);

  // Gold outer bezel
  ctx.beginPath();
  ctx.arc(0, 0, 11, 0, Math.PI * 2);
  const bezelGrad = ctx.createRadialGradient(-3, -3, 2, 0, 0, 11);
  bezelGrad.addColorStop(0, '#FFF3A8');
  bezelGrad.addColorStop(0.6, COLOR_SWARNA_GOLD);
  bezelGrad.addColorStop(1, '#8B6508');
  ctx.fillStyle = bezelGrad;
  ctx.fill();

  // Gemstone dome
  ctx.beginPath();
  ctx.arc(0, 0, 7.5, 0, Math.PI * 2);
  const gemGrad = ctx.createRadialGradient(-2, -2, 1, 0, 0, 7.5);
  if (isRuby) {
    gemGrad.addColorStop(0, '#FF4D6D');
    gemGrad.addColorStop(0.5, '#C9184A');
    gemGrad.addColorStop(1, '#590D22');
  } else {
    gemGrad.addColorStop(0, '#70E000');
    gemGrad.addColorStop(0.5, '#38B000');
    gemGrad.addColorStop(1, '#004B23');
  }
  ctx.fillStyle = gemGrad;
  ctx.fill();

  // Specular light glint
  const glint = (Math.sin(timeOffset * 2.5) + 1) * 0.5;
  ctx.beginPath();
  ctx.arc(-2.5, -2.5, 2.5 * glint, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.fill();

  ctx.restore();
}

/**
 * Corner filigree bracket
 */
function drawCornerFiligree(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rot: number
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rot);
  ctx.strokeStyle = COLOR_SWARNA_GOLD;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 24, 0, Math.PI / 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 36, 0, Math.PI / 2);
  ctx.stroke();
  ctx.restore();
}

/**
 * Embossed 24K Gold Sacred Swastika
 */
function drawSacredSwastika(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  time: number
) {
  ctx.save();
  ctx.translate(cx, cy);

  // Subtle breathing pulse
  const pulse = 1 + Math.sin(time * 2) * 0.03;
  ctx.scale(pulse, pulse);

  // Gold aura glow
  const auraGrad = ctx.createRadialGradient(0, 0, size * 0.2, 0, 0, size * 1.4);
  auraGrad.addColorStop(0, 'rgba(255, 215, 0, 0.45)');
  auraGrad.addColorStop(0.5, 'rgba(253, 184, 19, 0.2)');
  auraGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = auraGrad;
  ctx.beginPath();
  ctx.arc(0, 0, size * 1.4, 0, Math.PI * 2);
  ctx.fill();

  // Swastika arms
  const arm = size * 0.55;
  const hook = size * 0.28;
  const strokeW = size * 0.16;

  ctx.lineWidth = strokeW;
  ctx.lineCap = 'square';
  ctx.strokeStyle = COLOR_SWARNA_GOLD;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 4;

  // Cross lines with hooks
  ctx.beginPath();
  // Horizontal arm & right hook up
  ctx.moveTo(-arm, 0);
  ctx.lineTo(arm, 0);
  ctx.lineTo(arm, -hook);

  // Left hook down
  ctx.moveTo(-arm, 0);
  ctx.lineTo(-arm, hook);

  // Vertical arm & top hook left
  ctx.moveTo(0, -arm);
  ctx.lineTo(0, arm);
  ctx.lineTo(-hook, arm);

  // Bottom hook right
  ctx.moveTo(0, -arm);
  ctx.lineTo(hook, -arm);
  ctx.stroke();

  // 4 Sacred Auspicious Dots (Bindu)
  const dotOffset = arm * 0.5;
  const dotR = strokeW * 0.45;
  const dots = [
    { x: dotOffset, y: -dotOffset },
    { x: -dotOffset, y: -dotOffset },
    { x: -dotOffset, y: dotOffset },
    { x: dotOffset, y: dotOffset },
  ];

  ctx.fillStyle = COLOR_SWARNA_GOLD;
  ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
  ctx.shadowBlur = 8;
  dots.forEach((d) => {
    ctx.beginPath();
    ctx.arc(d.x, d.y, dotR, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

/**
 * Detailed Sacred Havan Kund with dancing procedural fire flames & smoke
 */
function drawHavanKund(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  time: number
) {
  ctx.save();
  ctx.translate(cx, cy);

  // 1. Copper Base Steps (3 tiers)
  const tiers = [
    { w: size * 1.5, h: size * 0.22, y: size * 0.55 },
    { w: size * 1.25, h: size * 0.18, y: size * 0.38 },
    { w: size * 1.0, h: size * 0.24, y: size * 0.16 },
  ];

  tiers.forEach((t) => {
    const copperGrad = ctx.createLinearGradient(-t.w / 2, 0, t.w / 2, 0);
    copperGrad.addColorStop(0, '#5C1D06');
    copperGrad.addColorStop(0.3, '#A0431D');
    copperGrad.addColorStop(0.5, '#D46A38');
    copperGrad.addColorStop(0.7, '#A0431D');
    copperGrad.addColorStop(1, '#5C1D06');

    ctx.fillStyle = copperGrad;
    ctx.fillRect(-t.w / 2, t.y, t.w, t.h);

    // Gold trim line
    ctx.strokeStyle = COLOR_SWARNA_GOLD;
    ctx.lineWidth = 2;
    ctx.strokeRect(-t.w / 2, t.y, t.w, t.h);
  });

  // Havan Kund Pit Cavity
  const pitW = size * 0.8;
  const pitH = size * 0.16;
  ctx.fillStyle = '#220800';
  ctx.beginPath();
  ctx.ellipse(0, size * 0.16, pitW * 0.5, pitH * 0.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Glowing Charcoal Embers inside pit
  ctx.fillStyle = '#FF3300';
  ctx.shadowColor = '#FF6600';
  ctx.shadowBlur = 25;
  ctx.beginPath();
  ctx.ellipse(0, size * 0.16, pitW * 0.4, pitH * 0.35, 0, 0, Math.PI * 2);
  ctx.fill();

  // 2. Realistic Multi-layered Dancing Agni Flames
  ctx.shadowBlur = 30;
  ctx.shadowColor = '#FF9900';

  // Flame count & oscillation
  const flameCount = 9;
  for (let f = 0; f < flameCount; f++) {
    const fx = (f - (flameCount - 1) / 2) * (size * 0.08);
    const wave = Math.sin(time * 8 + f * 1.4);
    const flameH = (size * 0.65) + wave * (size * 0.15) - Math.abs(fx) * 0.4;
    const flameBaseW = size * 0.12;

    // Outer Orange Flame
    ctx.beginPath();
    ctx.moveTo(fx - flameBaseW, size * 0.16);
    ctx.quadraticCurveTo(
      fx - flameBaseW * 0.4 + wave * 8,
      size * 0.16 - flameH * 0.5,
      fx + wave * 12,
      size * 0.16 - flameH
    );
    ctx.quadraticCurveTo(
      fx + flameBaseW * 0.4 + wave * 4,
      size * 0.16 - flameH * 0.5,
      fx + flameBaseW,
      size * 0.16
    );
    ctx.closePath();
    const fireGrad = ctx.createLinearGradient(0, size * 0.16, 0, size * 0.16 - flameH);
    fireGrad.addColorStop(0, '#FF4500');
    fireGrad.addColorStop(0.4, '#FF8C00');
    fireGrad.addColorStop(0.8, '#FFD700');
    fireGrad.addColorStop(1, 'rgba(255, 255, 200, 0.9)');
    ctx.fillStyle = fireGrad;
    ctx.fill();

    // Inner Hot White-Yellow Core
    ctx.beginPath();
    ctx.moveTo(fx - flameBaseW * 0.5, size * 0.16);
    ctx.quadraticCurveTo(
      fx + wave * 4,
      size * 0.16 - flameH * 0.3,
      fx + wave * 6,
      size * 0.16 - flameH * 0.6
    );
    ctx.quadraticCurveTo(
      fx + flameBaseW * 0.5,
      size * 0.16 - flameH * 0.3,
      fx + flameBaseW * 0.5,
      size * 0.16
    );
    ctx.closePath();
    ctx.fillStyle = 'rgba(255, 255, 220, 0.85)';
    ctx.fill();
  }

  // 3. Floating Sacred Embers rising from fire
  HAVAN_EMBERS.forEach((p, idx) => {
    const emberY = (size * 0.1) - (((time * 0.3 + p.speedY + idx * 0.05) % 1) * (size * 1.5));
    const emberX = Math.sin(time * 3 + idx) * (size * 0.35) + (p.speedX * size);
    const emberAlpha = Math.max(0, 1 - Math.abs(emberY) / (size * 1.5));

    ctx.beginPath();
    ctx.arc(emberX, emberY, 2.5 + (idx % 3), 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 200, 50, ${emberAlpha * 0.9})`;
    ctx.shadowColor = '#FF9900';
    ctx.shadowBlur = 10;
    ctx.fill();
  });

  // 4. Delicate Rising Incense Smoke
  for (let s = 0; s < 5; s++) {
    const sOffset = (time * 0.15 + s * 0.2) % 1;
    const smokeY = size * 0.1 - sOffset * (size * 1.8);
    const smokeX = Math.sin(time * 2 + s * 1.5) * (size * 0.4);
    const smokeRadius = 15 + sOffset * 40;
    const smokeAlpha = Math.sin(sOffset * Math.PI) * 0.18;

    ctx.beginPath();
    ctx.arc(smokeX, smokeY, smokeRadius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 240, 220, ${smokeAlpha})`;
    ctx.shadowBlur = 0;
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Ancient Kashi Ghats & Temple Silhouettes along the sacred Ganga
 */
function drawKashiGhatsSilhouette(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
) {
  ctx.save();
  const waterY = height * 0.72;

  // Distant Temple Shikharas (Silhouettes)
  ctx.fillStyle = 'rgba(40, 5, 10, 0.85)';
  const temples = [
    { x: width * 0.18, w: 90, h: 220 },
    { x: width * 0.28, w: 130, h: 310 },
    { x: width * 0.42, w: 80, h: 190 },
    { x: width * 0.58, w: 140, h: 340 },
    { x: width * 0.72, w: 95, h: 240 },
    { x: width * 0.82, w: 120, h: 280 },
  ];

  temples.forEach((t) => {
    // Temple body
    ctx.beginPath();
    ctx.moveTo(t.x - t.w / 2, waterY);
    ctx.lineTo(t.x - t.w / 2, waterY - t.h * 0.5);
    // Scalloped curve to spire
    ctx.quadraticCurveTo(t.x - t.w * 0.2, waterY - t.h * 0.85, t.x, waterY - t.h);
    ctx.quadraticCurveTo(t.x + t.w * 0.2, waterY - t.h * 0.85, t.x + t.w / 2, waterY - t.h * 0.5);
    ctx.lineTo(t.x + t.w / 2, waterY);
    ctx.closePath();
    ctx.fill();

    // Kalash on temple spire
    ctx.beginPath();
    ctx.arc(t.x, waterY - t.h - 10, 8, 0, Math.PI * 2);
    ctx.fillStyle = COLOR_SWARNA_GOLD;
    ctx.fill();
    ctx.fillStyle = 'rgba(40, 5, 10, 0.85)';
  });

  // Stone Ghat Steps
  const stepCount = 5;
  const stepH = (height - waterY) / stepCount;
  for (let st = 0; st < stepCount; st++) {
    const sy = waterY + st * stepH;
    ctx.fillStyle = st % 2 === 0 ? '#38060D' : '#2A0409';
    ctx.fillRect(0, sy, width, stepH);

    // Stone step gold rim
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, sy);
    ctx.lineTo(width, sy);
    ctx.stroke();

    // Flickering earthen diyas on steps
    const diyaCount = 8;
    for (let d = 0; d < diyaCount; d++) {
      const dx = ((d + 0.5) / diyaCount) * width + (st * 30);
      if (dx < width) {
        drawGhatDiya(ctx, dx, sy, time + d + st);
      }
    }
  }

  // Ganga Water Ripples & Gold Reflection
  ctx.fillStyle = 'rgba(20, 2, 5, 0.65)';
  ctx.fillRect(0, waterY, width, height - waterY);

  // Shimmering water reflections
  for (let r = 0; r < 20; r++) {
    const ry = waterY + 15 + Math.random() * (height - waterY - 30);
    const rx = width * 0.2 + Math.random() * (width * 0.6);
    const rLen = 40 + Math.random() * 90;
    const rAlpha = (Math.sin(time * 4 + r) + 1) * 0.2;

    ctx.strokeStyle = `rgba(255, 215, 0, ${rAlpha})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(rx - rLen / 2, ry);
    ctx.lineTo(rx + rLen / 2, ry);
    ctx.stroke();
  }

  ctx.restore();
}

/**
 * Small earthen Diya along the ghat steps
 */
function drawGhatDiya(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  timeOffset: number
) {
  ctx.save();
  ctx.translate(x, y);

  // Earthen clay base
  ctx.beginPath();
  ctx.ellipse(0, 0, 10, 4, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#8B4513';
  ctx.fill();

  // Flame
  const flameWave = Math.sin(timeOffset * 6) * 1.5;
  ctx.beginPath();
  ctx.moveTo(-4, 0);
  ctx.quadraticCurveTo(-2 + flameWave, -10, 0 + flameWave, -14);
  ctx.quadraticCurveTo(2 + flameWave, -10, 4, 0);
  ctx.closePath();
  ctx.fillStyle = '#FFD700';
  ctx.shadowColor = '#FF9900';
  ctx.shadowBlur = 12;
  ctx.fill();

  ctx.restore();
}

/**
 * Royal Ceremonial Scroll (Patrika Parchment)
 */
function drawCeremonialScroll(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  w: number,
  h: number
) {
  ctx.save();
  ctx.translate(cx, cy);

  // Outer velvet shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
  ctx.shadowBlur = 35;
  ctx.shadowOffsetY = 15;

  // Ivory parchment body
  const parchmentGrad = ctx.createLinearGradient(0, -h / 2, 0, h / 2);
  parchmentGrad.addColorStop(0, '#FFFDF8');
  parchmentGrad.addColorStop(0.5, '#FAF3E3');
  parchmentGrad.addColorStop(1, '#EFE4CD');

  ctx.fillStyle = parchmentGrad;
  ctx.fillRect(-w / 2, -h / 2, w, h);

  // Rich maroon velvet border
  ctx.shadowBlur = 0;
  ctx.strokeStyle = COLOR_ROYAL_MAROON;
  ctx.lineWidth = 14;
  ctx.strokeRect(-w / 2, -h / 2, w, h);

  // 24K Gold Filigree Inner Trim
  ctx.strokeStyle = COLOR_SWARNA_GOLD;
  ctx.lineWidth = 3;
  ctx.strokeRect(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20);

  // Curled corner roll accents (top & bottom)
  const rollH = 22;
  const rollW = w + 30;
  [-h / 2, h / 2].forEach((ry) => {
    const rollGrad = ctx.createLinearGradient(-rollW / 2, 0, rollW / 2, 0);
    rollGrad.addColorStop(0, '#8B6508');
    rollGrad.addColorStop(0.2, COLOR_SWARNA_GOLD);
    rollGrad.addColorStop(0.5, '#FFF4B8');
    rollGrad.addColorStop(0.8, COLOR_SWARNA_GOLD);
    rollGrad.addColorStop(1, '#8B6508');

    ctx.fillStyle = rollGrad;
    ctx.fillRect(-rollW / 2, ry - rollH / 2, rollW, rollH);

    // Roll gold caps
    ctx.beginPath();
    ctx.arc(-rollW / 2, ry, rollH * 0.7, 0, Math.PI * 2);
    ctx.arc(rollW / 2, ry, rollH * 0.7, 0, Math.PI * 2);
    ctx.fillStyle = COLOR_SWARNA_GOLD;
    ctx.fill();
  });

  ctx.restore();
}

/**
 * Signature Swarna Dhara 2.0 Transition: Vertical Gold & Akshat Cascade
 */
function drawSwarnaDharaCascade(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number
) {
  ctx.save();
  const cascadeAlpha = Math.sin(progress * Math.PI);

  SWARNA_DHARA_COINS.forEach((p, idx) => {
    const py = ((p.y + progress * 1.8 + p.speedY) % 1) * height;
    const px = p.x * width;

    if (idx % 3 === 0) {
      // 24K Gold Coin
      ctx.beginPath();
      ctx.arc(px, py, 6 + (idx % 4), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 215, 0, ${cascadeAlpha * 0.85})`;
      ctx.shadowColor = '#FFD700';
      ctx.shadowBlur = 10;
      ctx.fill();
    } else {
      // Akshat Rice Grain (elongated white-cream grain)
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate((p.phase + progress * 6) % (Math.PI * 2));
      ctx.beginPath();
      ctx.ellipse(0, 0, 2.5, 7, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 253, 245, ${cascadeAlpha * 0.9})`;
      ctx.shadowBlur = 0;
      ctx.fill();
      ctx.restore();
    }
  });

  // Soft gold dust veil
  ctx.fillStyle = `rgba(255, 215, 0, ${cascadeAlpha * 0.18})`;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

/**
 * Silk Curtain Transition
 */
function drawSilkCurtainSweep(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number
) {
  ctx.save();
  const curtainW = width * (1 - Math.abs(progress - 0.5) * 2);
  const curtainGrad = ctx.createLinearGradient(0, 0, curtainW, 0);
  curtainGrad.addColorStop(0, '#3A0309');
  curtainGrad.addColorStop(0.5, '#780B1E');
  curtainGrad.addColorStop(1, '#A0152B');

  ctx.fillStyle = curtainGrad;
  ctx.fillRect(0, 0, curtainW, height);

  // Gold travelling edge
  ctx.strokeStyle = COLOR_SWARNA_GOLD;
  ctx.lineWidth = 6;
  ctx.shadowColor = '#FFD700';
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.moveTo(curtainW, 0);
  ctx.lineTo(curtainW, height);
  ctx.stroke();

  ctx.restore();
}

/**
 * Floating Gold Dust Particles
 */
function drawGoldAtmosphere(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
) {
  ctx.save();
  KASHI_GOLD_DUST.forEach((p, idx) => {
    const px = ((p.x + Math.sin(time * 0.5 + idx) * 0.05) % 1) * width;
    const py = ((p.y - time * 0.04) % 1) * height;
    const alpha = (Math.sin(time * 2 + idx) + 1) * 0.35 * p.opacity;

    ctx.beginPath();
    ctx.arc(px, py < 0 ? py + height : py, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 215, 0, ${alpha})`;
    ctx.shadowColor = '#FFD700';
    ctx.shadowBlur = 6;
    ctx.fill();
  });
  ctx.restore();
}

/**
 * Floating Rose Petals
 */
function drawFallingRosePetals(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
) {
  ctx.save();
  ROSE_PETALS.forEach((p, idx) => {
    const px = (p.x * width + Math.sin(time * 1.5 + idx) * 45) % width;
    const py = ((p.y + time * 0.08) % 1) * height;
    const rot = time * 2 + idx;

    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.ellipse(0, 0, 7, 12, 0, 0, Math.PI * 2);
    ctx.fillStyle = idx % 2 === 0 ? 'rgba(190, 15, 45, 0.75)' : 'rgba(253, 184, 19, 0.8)';
    ctx.shadowBlur = 0;
    ctx.fill();
    ctx.restore();
  });
  ctx.restore();
}

/**
 * Master 7-Scene Sampoorna Kashi Shubh Vivah Renderer
 */
export function renderSampoornaKashi(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  duration: number,
  project: WeddingProject,
  images: LoadedImages
) {
  // Normalize time inside full 45s duration
  const activeDuration = Math.max(duration, 45);
  const currentTime = time % activeDuration;

  // 1. Deep Sindoor & Maroon Base Vignette
  const bgGrad = ctx.createRadialGradient(
    width * 0.5,
    height * 0.5,
    width * 0.1,
    width * 0.5,
    height * 0.5,
    width * 0.75
  );
  bgGrad.addColorStop(0, COLOR_SINDOOR_RED);
  bgGrad.addColorStop(0.65, COLOR_ROYAL_MAROON);
  bgGrad.addColorStop(1, COLOR_DARK_BASE);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Volumetric Sunray Atmosphere
  ctx.save();
  const rayGrad = ctx.createLinearGradient(0, 0, width, height);
  rayGrad.addColorStop(0, 'rgba(255, 215, 0, 0.12)');
  rayGrad.addColorStop(0.5, 'rgba(253, 184, 19, 0.05)');
  rayGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = rayGrad;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  // Floating ambient gold dust
  drawGoldAtmosphere(ctx, width, height, currentTime);

  // Floating ceremonial rose & marigold petals
  drawFallingRosePetals(ctx, width, height, currentTime);

  // ==========================================
  // SCENE 01 — DIVYA MANGAL AARAMBH (0 – 5s)
  // ==========================================
  if (currentTime < 5.0) {
    const sceneTime = currentTime;
    const enterAlpha = Math.min(1, sceneTime / 1.2);
    const scale = 0.95 + (sceneTime / 5.0) * 0.05;

    ctx.save();
    ctx.globalAlpha = enterAlpha;
    ctx.translate(width / 2, height / 2);
    ctx.scale(scale, scale);
    ctx.translate(-width / 2, -height / 2);

    // Sacred Swastika reveal
    drawSacredSwastika(ctx, width * 0.5, height * 0.38, 95, sceneTime);

    // Title: ॥ श्री गणेशाय नमः ॥
    drawKashiText(
      ctx,
      '॥ श्री गणेशाय नमः ॥',
      width * 0.5,
      height * 0.65,
      'Noto Serif Devanagari, Cormorant Garamond, serif',
      56,
      COLOR_SWARNA_GOLD,
      'center',
      true
    );

    drawKashiText(
      ctx,
      'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ',
      width * 0.5,
      height * 0.76,
      'Noto Serif Devanagari, serif',
      32,
      COLOR_IVORY_WHITE,
      'center',
      false
    );

    ctx.restore();

    // Swarna Dhara transition into Scene 2
    if (sceneTime > 4.2) {
      drawSwarnaDharaCascade(ctx, width, height, (sceneTime - 4.2) / 0.8);
    }
  }

  // ==========================================
  // SCENE 02 — KASHI KI DIVYA AABHA (5 – 10s)
  // ==========================================
  else if (currentTime >= 5.0 && currentTime < 10.0) {
    const sceneTime = currentTime - 5.0;
    const enterAlpha = Math.min(1, sceneTime / 1.0);

    ctx.save();
    ctx.globalAlpha = enterAlpha;

    // Ancient Kashi Ghats & Temple Silhouettes
    drawKashiGhatsSilhouette(ctx, width, height, currentTime);

    // Title & City Blessing
    drawKashiText(
      ctx,
      '॥ ॐ नमः शिवाय ॥',
      width * 0.5,
      height * 0.28,
      'Noto Serif Devanagari, Cormorant Garamond, serif',
      52,
      COLOR_SWARNA_GOLD,
      'center',
      true
    );

    drawKashiText(
      ctx,
      'काशी विश्वनाथ की पावन नगरी से',
      width * 0.5,
      height * 0.40,
      'Noto Serif Devanagari, serif',
      42,
      COLOR_IVORY_WHITE,
      'center',
      true
    );

    drawKashiText(
      ctx,
      'पवित्र गंगा तट पर मंगल परिणय की पावन बेला',
      width * 0.5,
      height * 0.51,
      'Noto Serif Devanagari, serif',
      30,
      COLOR_HALDI_YELLOW,
      'center',
      false
    );

    ctx.restore();

    // Silk Curtain Sweep transition into Scene 3
    if (sceneTime > 4.2) {
      drawSilkCurtainSweep(ctx, width, height, (sceneTime - 4.2) / 0.8);
    }
  }

  // ==========================================
  // SCENE 03 — SHUBH VIVAH PATRIKA (10 – 15s)
  // ==========================================
  else if (currentTime >= 10.0 && currentTime < 15.0) {
    const sceneTime = currentTime - 10.0;
    const enterAlpha = Math.min(1, sceneTime / 1.0);

    ctx.save();
    ctx.globalAlpha = enterAlpha;

    // Ceremonial Royal Scroll
    const scrollW = Math.min(width * 0.72, 1050);
    const scrollH = height * 0.62;
    drawCeremonialScroll(ctx, width * 0.5, height * 0.5, scrollW, scrollH);

    // Heading: ॥ शुभ विवाह ॥
    drawKashiText(
      ctx,
      '॥ शुभ विवाह ॥',
      width * 0.5,
      height * 0.36,
      'Noto Serif Devanagari, Cinzel Decorative, serif',
      62,
      COLOR_ROYAL_MAROON,
      'center',
      true
    );

    // Subheadings
    drawKashiText(
      ctx,
      'मांगलिक विवाह पत्रिका',
      width * 0.5,
      height * 0.48,
      'Noto Serif Devanagari, serif',
      36,
      '#780B1E',
      'center',
      true
    );

    drawKashiText(
      ctx,
      'परमपिता परमात्मा की असीम अनुकंपा से हमारे प्रियजनों का पावन गठबंधन',
      width * 0.5,
      height * 0.58,
      'Noto Serif Devanagari, Poppins, sans-serif',
      28,
      '#4A0510',
      'center',
      false
    );

    drawKashiText(
      ctx,
      'सादर निमंत्रण',
      width * 0.5,
      height * 0.68,
      'Noto Serif Devanagari, serif',
      34,
      COLOR_SWARNA_GOLD,
      'center',
      true
    );

    ctx.restore();

    // Swarna Dhara transition into Scene 4
    if (sceneTime > 4.2) {
      drawSwarnaDharaCascade(ctx, width, height, (sceneTime - 4.2) / 0.8);
    }
  }

  // ==========================================
  // SCENE 04 — DIVYA VIVAH MANDAP (15 – 21s)
  // ==========================================
  else if (currentTime >= 15.0 && currentTime < 21.0) {
    const sceneTime = currentTime - 15.0;
    const enterAlpha = Math.min(1, sceneTime / 1.0);

    ctx.save();
    ctx.globalAlpha = enterAlpha;

    // Left Side: Sacred Havan Kund & Dancing Agni
    drawHavanKund(ctx, width * 0.32, height * 0.56, 170, currentTime);

    // Right Side: Couple Photo / Portrait
    const frameW = 420;
    const frameH = 500;
    const frameX = width * 0.68;
    const frameY = height * 0.50;

    if (images.couple || images.bride || images.groom) {
      const activeImg = images.couple || images.bride || images.groom;
      drawCroppedImage(
        ctx,
        activeImg!,
        frameX - frameW / 2,
        frameY - frameH / 2,
        frameW,
        frameH,
        project.photos?.offsets?.couple
      );
    } else {
      // Traditional Mandap Shloka Panel if no photo
      ctx.fillStyle = 'rgba(58, 8, 14, 0.75)';
      ctx.fillRect(frameX - frameW / 2, frameY - frameH / 2, frameW, frameH);
      ctx.strokeStyle = COLOR_SWARNA_GOLD;
      ctx.lineWidth = 3;
      ctx.strokeRect(frameX - frameW / 2, frameY - frameH / 2, frameW, frameH);

      drawKashiText(
        ctx,
        '॥ सप्तपदी ॥',
        frameX,
        frameY - 80,
        'Noto Serif Devanagari, serif',
        42,
        COLOR_SWARNA_GOLD,
        'center',
        true
      );
      drawKashiText(
        ctx,
        'सखा सप्तपदा भव।',
        frameX,
        frameY,
        'Noto Serif Devanagari, serif',
        30,
        COLOR_IVORY_WHITE,
        'center',
        false
      );
      drawKashiText(
        ctx,
        'सखायौ सप्तपदा बभूव।',
        frameX,
        frameY + 50,
        'Noto Serif Devanagari, serif',
        28,
        COLOR_HALDI_YELLOW,
        'center',
        false
      );
    }

    // Top Header
    drawKashiText(
      ctx,
      'पवित्र अग्नि के समक्ष सात फेरे',
      width * 0.5,
      height * 0.16,
      'Noto Serif Devanagari, serif',
      44,
      COLOR_SWARNA_GOLD,
      'center',
      true
    );

    ctx.restore();

    // Transition into Scene 5
    if (sceneTime > 5.2) {
      drawSwarnaDharaCascade(ctx, width, height, (sceneTime - 5.2) / 0.8);
    }
  }

  // ==========================================
  // SCENE 05 — VAR-VADHU NAAM PRADARSHAN (21 – 28s)
  // ==========================================
  else if (currentTime >= 21.0 && currentTime < 28.0) {
    const sceneTime = currentTime - 21.0;
    const enterAlpha = Math.min(1, sceneTime / 1.0);

    ctx.save();
    ctx.globalAlpha = enterAlpha;

    // Names from project
    const groomName = project.couple.groomHindiName || project.couple.groomName || 'चि. आयुष्मान';
    const brideName = project.couple.brideHindiName || project.couple.brideName || 'सौ. अनन्या';
    const groomParents = project.couple.groomParents || 'सुपुत्र: श्रीमती एवं श्री ...';
    const brideParents = project.couple.brideParents || 'सुपुत्री: श्रीमती एवं श्री ...';

    // Top Shloka Header
    drawKashiText(
      ctx,
      '॥ परिणय सूत्र ॥',
      width * 0.5,
      height * 0.16,
      'Noto Serif Devanagari, serif',
      36,
      COLOR_HALDI_YELLOW,
      'center',
      true
    );

    // Groom's Name (Center Top)
    drawKashiText(
      ctx,
      groomName,
      width * 0.5,
      height * 0.32,
      'Noto Serif Devanagari, Cinzel Decorative, serif',
      68,
      COLOR_SWARNA_GOLD,
      'center',
      true
    );

    // Groom Parents Line
    drawKashiText(
      ctx,
      `(${groomParents})`,
      width * 0.5,
      height * 0.41,
      'Noto Serif Devanagari, Poppins, sans-serif',
      26,
      COLOR_IVORY_WHITE,
      'center',
      false
    );

    // Auspicious Connector: "संग" / "एवं"
    drawKashiText(
      ctx,
      '— संग —',
      width * 0.5,
      height * 0.51,
      'Noto Serif Devanagari, Cormorant Garamond, serif',
      44,
      COLOR_HALDI_YELLOW,
      'center',
      true
    );

    // Bride's Name (Center Bottom)
    drawKashiText(
      ctx,
      brideName,
      width * 0.5,
      height * 0.65,
      'Noto Serif Devanagari, Cinzel Decorative, serif',
      68,
      COLOR_SWARNA_GOLD,
      'center',
      true
    );

    // Bride Parents Line
    drawKashiText(
      ctx,
      `(${brideParents})`,
      width * 0.5,
      height * 0.74,
      'Noto Serif Devanagari, Poppins, sans-serif',
      26,
      COLOR_IVORY_WHITE,
      'center',
      false
    );

    ctx.restore();

    // Transition into Scene 6
    if (sceneTime > 6.2) {
      drawSilkCurtainSweep(ctx, width, height, (sceneTime - 6.2) / 0.8);
    }
  }

  // ==========================================
  // SCENE 06 — MANGAL SHUBHKAMNAYEN (28 – 36s)
  // ==========================================
  else if (currentTime >= 28.0 && currentTime < 36.0) {
    const sceneTime = currentTime - 28.0;
    const enterAlpha = Math.min(1, sceneTime / 1.0);

    ctx.save();
    ctx.globalAlpha = enterAlpha;

    // Ceremonial Blessing Scroll
    const scrollW = Math.min(width * 0.76, 1100);
    const scrollH = height * 0.68;
    drawCeremonialScroll(ctx, width * 0.5, height * 0.5, scrollW, scrollH);

    // Sacred Sanskrit Blessing
    drawKashiText(
      ctx,
      '॥ मांगलिक श्लोक ॥',
      width * 0.5,
      height * 0.26,
      'Noto Serif Devanagari, serif',
      36,
      COLOR_ROYAL_MAROON,
      'center',
      true
    );

    drawKashiText(
      ctx,
      'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।',
      width * 0.5,
      height * 0.36,
      'Noto Serif Devanagari, serif',
      34,
      '#660918',
      'center',
      true
    );

    drawKashiText(
      ctx,
      'निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥',
      width * 0.5,
      height * 0.44,
      'Noto Serif Devanagari, serif',
      34,
      '#660918',
      'center',
      true
    );

    // Divider
    ctx.strokeStyle = COLOR_SWARNA_GOLD;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width * 0.35, height * 0.52);
    ctx.lineTo(width * 0.65, height * 0.52);
    ctx.stroke();

    // Hindi Invitation Message
    drawKashiText(
      ctx,
      'आप सभी सपरिवार सादर आमंत्रित हैं।',
      width * 0.5,
      height * 0.60,
      'Noto Serif Devanagari, serif',
      36,
      COLOR_ROYAL_MAROON,
      'center',
      true
    );

    drawKashiText(
      ctx,
      'नवदंपति को अपना स्नेह एवं शुभाशीष प्रदान करें।',
      width * 0.5,
      height * 0.68,
      'Noto Serif Devanagari, serif',
      32,
      '#4A0510',
      'center',
      false
    );

    ctx.restore();

    // Swarna Dhara transition into Scene 7
    if (sceneTime > 7.2) {
      drawSwarnaDharaCascade(ctx, width, height, (sceneTime - 7.2) / 0.8);
    }
  }

  // ==========================================
  // SCENE 07 — RAJASI MANGAL SAMAPAN (36 – 45s)
  // ==========================================
  else {
    const sceneTime = currentTime - 36.0;
    const enterAlpha = Math.min(1, sceneTime / 1.0);

    ctx.save();
    ctx.globalAlpha = enterAlpha;

    const groomName = project.couple.groomHindiName || project.couple.groomName || 'आयुष्मान';
    const brideName = project.couple.brideHindiName || project.couple.brideName || 'अनन्या';
    const mainCeremony = project.ceremonies?.[0] || {
      date: '2026-11-28',
      time: 'शाम 07:00 बजे से',
      venueName: 'काशी राजमहल, दशाश्वमेध घाट, वाराणसी',
    };
    const familyGreeting = project.couple.groomFamily || project.couple.brideFamily || 'समस्त काशी परिवार';

    // Couple Name Banner
    drawKashiText(
      ctx,
      `${groomName} संग ${brideName}`,
      width * 0.5,
      height * 0.20,
      'Noto Serif Devanagari, Cinzel Decorative, serif',
      56,
      COLOR_SWARNA_GOLD,
      'center',
      true
    );

    drawKashiText(
      ctx,
      '॥ शुभ विवाह संस्कार ॥',
      width * 0.5,
      height * 0.32,
      'Noto Serif Devanagari, serif',
      38,
      COLOR_HALDI_YELLOW,
      'center',
      true
    );

    // Auspicious Date & Time
    drawKashiText(
      ctx,
      `शुभ तिथि: ${mainCeremony.date}  |  मुहूर्त: ${mainCeremony.time}`,
      width * 0.5,
      height * 0.46,
      'Noto Serif Devanagari, Poppins, sans-serif',
      34,
      COLOR_IVORY_WHITE,
      'center',
      true
    );

    // Venue Details
    drawKashiText(
      ctx,
      `विवाह स्थल: ${mainCeremony.venueName}`,
      width * 0.5,
      height * 0.58,
      'Noto Serif Devanagari, Poppins, sans-serif',
      32,
      COLOR_HALDI_YELLOW,
      'center',
      false
    );

    // Family Salutation
    drawKashiText(
      ctx,
      `दर्शनाभिलाषी एवं सादर — ${familyGreeting}`,
      width * 0.5,
      height * 0.72,
      'Noto Serif Devanagari, serif',
      34,
      COLOR_SWARNA_GOLD,
      'center',
      true
    );

    ctx.restore();

    // Gentle fade to deep maroon at the very end
    if (sceneTime > 8.0) {
      const fadeAlpha = (sceneTime - 8.0) / 1.0;
      ctx.fillStyle = `rgba(26, 2, 5, ${fadeAlpha})`;
      ctx.fillRect(0, 0, width, height);

      // Final glowing point of gold light
      ctx.beginPath();
      ctx.arc(width * 0.5, height * 0.5, 4 + (1 - fadeAlpha) * 12, 0, Math.PI * 2);
      ctx.fillStyle = COLOR_SWARNA_GOLD;
      ctx.shadowColor = '#FFD700';
      ctx.shadowBlur = 20;
      ctx.fill();
    }
  }

  // ==========================================
  // TOP ARCH & KUNDAN JHAROKHA PILLARS (Persistent Overlays)
  // ==========================================
  drawKundanJharokhaFrame(ctx, width, height, currentTime);
  drawTopBandanwar(ctx, width, currentTime);
}
