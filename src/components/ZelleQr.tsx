import { zelleQr } from "@/data/zelle-qr";
import { FLOWER_PATH } from "./Flower";

const { size: N, rows } = zelleQr;
const Q = 4;
const W = N + 2 * Q;
const HALF = 5; // half-width of the centre knockout (11x11 modules)
const mid = Math.floor(N / 2);

const dark = (x: number, y: number) => rows[y][x] === "1";
const inFinder = (x: number, y: number) =>
  (x < 7 && y < 7) || (x >= N - 7 && y < 7) || (x < 7 && y >= N - 7);
const inLogo = (x: number, y: number) =>
  Math.abs(x - mid) <= HALF && Math.abs(y - mid) <= HALF;

// Merge horizontal runs of dark modules into single rounded bars.
const runs: { x: number; y: number; w: number }[] = [];
for (let y = 0; y < N; y++) {
  let x = 0;
  while (x < N) {
    if (!dark(x, y) || inFinder(x, y) || inLogo(x, y)) {
      x++;
      continue;
    }
    let x2 = x;
    while (
      x2 + 1 < N &&
      dark(x2 + 1, y) &&
      !inFinder(x2 + 1, y) &&
      !inLogo(x2 + 1, y)
    )
      x2++;
    runs.push({ x, y, w: x2 - x + 1 });
    x = x2 + 1;
  }
}

const eyes: [number, number][] = [
  [0, 0],
  [N - 7, 0],
  [0, N - 7],
];

const cx = Q + mid + 0.5;
const cy = Q + mid + 0.5;
const s = (2 * HALF + 0.2) / 332;

/** Brand-styled QR for the Zelle link. Always brown on white so it scans in either theme. */
export function ZelleQr({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${W}`}
      role="img"
      aria-label="QR code for the Zelle giving link"
      className={className}
      shapeRendering="geometricPrecision"
    >
      <rect width={W} height={W} fill="#ffffff" rx="2" />
      <g fill="#4a2a1e">
        {runs.map((r) => (
          <rect
            key={`${r.x}-${r.y}`}
            x={Q + r.x + 0.025}
            y={Q + r.y + 0.025}
            width={r.w - 0.05}
            height={0.95}
            rx={0.32}
          />
        ))}
        {eyes.map(([fx, fy]) => (
          <g key={`${fx}-${fy}`}>
            <rect x={Q + fx} y={Q + fy} width={7} height={7} rx={2.2} />
            <rect
              x={Q + fx + 1}
              y={Q + fy + 1}
              width={5}
              height={5}
              rx={1.5}
              fill="#ffffff"
            />
            <rect x={Q + fx + 2} y={Q + fy + 2} width={3} height={3} rx={1} />
          </g>
        ))}
        <g transform={`translate(${cx - 166 * s} ${cy - 146 * s}) scale(${s})`}>
          <path fillRule="evenodd" d={FLOWER_PATH} />
        </g>
      </g>
    </svg>
  );
}
