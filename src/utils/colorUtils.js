/** Brand palette constants */
export const NAVY = '#222244';
export const AQUA = '#00D9D3';
export const MANDARIN = '#F5501C';

/** Light grey for states with no teachers (visible on white bg) */
export const EMPTY_STATE_COLOR = '#E8E8E8';

/** Selected state highlight stroke — uses Mandarin accent */
export const SELECTED_STROKE_COLOR = MANDARIN;

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function rgbToHex(r, g, b) {
  return (
    '#' +
    [r, g, b]
      .map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0'))
      .join('')
  );
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * Heat-map gradient (light navy → dark navy):
 * 0%  → Very light navy   #C8C8DD   (fewest teachers)
 * 50% → Mid navy          #6A6A99   (transition)
 * 100%→ Dark navy         #222244   (most teachers — brand navy)
 */
const GRADIENT_STOPS = [
  [0.0, '#C8C8DD'],
  [0.5, '#6A6A99'],
  [1.0, '#222244'],
];

function interpolateGradient(t) {
  for (let i = 0; i < GRADIENT_STOPS.length - 1; i++) {
    const [t0, c0] = GRADIENT_STOPS[i];
    const [t1, c1] = GRADIENT_STOPS[i + 1];
    if (t <= t1) {
      const local = (t - t0) / (t1 - t0);
      const rgb0 = hexToRgb(c0);
      const rgb1 = hexToRgb(c1);
      return rgbToHex(
        lerp(rgb0[0], rgb1[0], local),
        lerp(rgb0[1], rgb1[1], local),
        lerp(rgb0[2], rgb1[2], local)
      );
    }
  }
  return GRADIENT_STOPS[GRADIENT_STOPS.length - 1][1];
}

/**
 * Returns a heat-map color for a given teacher count.
 * @param {number} count  — teachers in this state
 * @param {number} maxCount — max teachers in any state (for normalization)
 */
export function getStateColor(count, maxCount) {
  if (count === 0) return EMPTY_STATE_COLOR;
  const effectiveMax = Math.max(maxCount, 4);
  const t = Math.min(count / effectiveMax, 1);
  return interpolateGradient(t);
}

/** Pre-built legend stops for the gradient bar (starts from grey/0 through the heat colors) */
export const LEGEND_GRADIENT = [EMPTY_STATE_COLOR, ...GRADIENT_STOPS.map(([, c]) => c)];
