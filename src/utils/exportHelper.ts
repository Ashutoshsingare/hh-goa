/**
 * Sanitizes a string for use in filenames.
 * Replaces non-alphanumeric chars with dashes and removes duplicate dashes.
 * Example: "Ashutosh Singare!" -> "HH-Goa-2026-Ashutosh-Singare-HH-4827.png"
 */
export function sanitizeFilename(name: string, hackerId: string): string {
  const cleanName = name
    .trim()
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const displayName = cleanName || 'Hacker';
  const cleanHackerId = hackerId.replace(/[^a-zA-Z0-9-]/g, '');

  return `HH-Goa-2026-${displayName}-${cleanHackerId}.png`;
}

/**
 * Loads an image URL into an HTMLImageElement and waits for completion.
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

/**
 * Deterministically exports the Hacker House Goa 2026 credential as a high-resolution PNG (2172x2896 px)
 * using 2D HTML5 Canvas rendering.
 *
 * Renders in exact layer order:
 * 1. Base template image (cardtemplate.png)
 * 2. Uploaded photo (object-fit: cover into photo slot)
 * 3. NAME text
 * 4. ROLE text
 * 5. HACKER ID text
 */
export async function exportCredentialPng(
  _cardElement: HTMLElement | null,
  name: string,
  role: string,
  photo: string | null,
  hackerId: string
): Promise<void> {
  // 1. Wait for web fonts to load
  if (document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // Continue even if fonts fail to load
    }
  }

  // 2. Load base template image
  const templateImg = await loadImage('/assets/cardtemplate.png');

  // 3. Load user photo if available
  let photoImg: HTMLImageElement | null = null;
  if (photo) {
    try {
      photoImg = await loadImage(photo);
    } catch (err) {
      console.warn('Could not load photo for canvas export:', err);
    }
  }

  // 4. Setup offscreen HTML5 Canvas at 2x resolution (2172 x 2896 px, >1600x2000)
  const baseWidth = 1086;
  const baseHeight = 1448;
  const scale = 2;

  const canvas = document.createElement('canvas');
  canvas.width = baseWidth * scale;
  canvas.height = baseHeight * scale;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not obtain 2D canvas context');

  // Enable high-quality image smoothing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Scale coordinates to base 1086x1448 coordinate space
  ctx.scale(scale, scale);

  // LAYER 1: BASE TEMPLATE IMAGE
  ctx.drawImage(templateImg, 0, 0, baseWidth, baseHeight);

  // LAYER 2: PHOTO LAYER (object-fit cover crop)
  const photoX = 146;
  const photoY = 406;
  const photoW = 338;
  const photoH = 434;

  if (photoImg) {
    const imgRatio = photoImg.width / photoImg.height;
    const boxRatio = photoW / photoH;
    let sX = 0;
    let sY = 0;
    let sWidth = photoImg.width;
    let sHeight = photoImg.height;

    if (imgRatio > boxRatio) {
      sWidth = photoImg.height * boxRatio;
      sX = (photoImg.width - sWidth) / 2;
    } else {
      sHeight = photoImg.width / boxRatio;
      sY = (photoImg.height - sHeight) / 2;
    }

    ctx.save();
    ctx.beginPath();
    ctx.rect(photoX, photoY, photoW, photoH);
    ctx.clip();
    ctx.drawImage(photoImg, sX, sY, sWidth, sHeight, photoX, photoY, photoW, photoH);
    ctx.restore();
  }

  // LAYER 3: NAME TEXT
  if (name && name.trim()) {
    ctx.fillStyle = '#0C2B1C';
    ctx.font = "800 36px 'Barlow Condensed', 'Arial', 'Helvetica', sans-serif";
    ctx.textBaseline = 'middle';
    ctx.fillText(name.trim().toUpperCase(), 560, 470, 440);
  }

  // LAYER 4: ROLE TEXT
  if (role && role.trim()) {
    ctx.fillStyle = '#0C2B1C';
    ctx.font = "800 30px 'Barlow Condensed', 'Arial', 'Helvetica', sans-serif";
    ctx.textBaseline = 'middle';
    ctx.fillText(role.trim().toUpperCase(), 560, 619, 440);
  }

  // LAYER 5: HACKER ID TEXT
  if (hackerId && hackerId.trim()) {
    ctx.fillStyle = '#0C2B1C';
    ctx.font = "700 26px 'Space Mono', 'Courier New', monospace";
    ctx.textBaseline = 'middle';
    ctx.fillText(hackerId.trim().toUpperCase(), 560, 759, 280);
  }

  // 5. Export PNG Blob & Trigger Download
  const filename = sanitizeFilename(name, hackerId);
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        resolve();
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = filename;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => {
        URL.revokeObjectURL(url);
        resolve();
      }, 500);
    }, 'image/png');
  });
}
