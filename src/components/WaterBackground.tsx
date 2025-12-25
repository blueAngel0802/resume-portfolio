import { useEffect, useRef } from "react";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export function WaterBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = clamp(window.devicePixelRatio || 1, 1, 2);

    function resize() {
      w = Math.floor(window.innerWidth);
      h = Math.floor(window.innerHeight);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Fast value-noise
    const rand = (x: number, y: number) => {
      const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return s - Math.floor(s);
    };
    const smoothstep = (t: number) => t * t * (3 - 2 * t);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    function noise(x: number, y: number) {
      const xi = Math.floor(x);
      const yi = Math.floor(y);
      const xf = x - xi;
      const yf = y - yi;

      const a = rand(xi, yi);
      const b = rand(xi + 1, yi);
      const c = rand(xi, yi + 1);
      const d = rand(xi + 1, yi + 1);

      const u = smoothstep(xf);
      const v = smoothstep(yf);

      return lerp(lerp(a, b, u), lerp(c, d, u), v);
    }

    const getTheme = () =>
      document.documentElement.getAttribute("data-theme") || "light";

    const start = performance.now();

    function frame(now: number) {
      const t = (now - start) / 1000;
      const theme = getTheme();

      // "Clean" palette: only highlights, no milky wash.
      const a1 = theme === "dark" ? 0.045 : 0.06; // wave tint opacity
      const a2 = theme === "dark" ? 0.05 : 0.07;  // caustics opacity

      const c2 = theme === "dark" ? `rgba(80,170,255,${a1})` : `rgba(60,150,255,${a1})`;
      const c3 = theme === "dark" ? `rgba(190,140,255,${a1})` : `rgba(170,140,255,${a1})`;

      ctx.clearRect(0, 0, w, h);

      // Waves: translucent moving fields
      const layers = 2;
      for (let L = 0; L < layers; L++) {
        const speed = 0.10 + L * 0.06;
        const scale = 0.0045 + L * 0.002;
        const step = 96 - L * 10;
        const amp = 120 + L * 70;

        const gx = ctx.createLinearGradient(0, 0, w, h);
        gx.addColorStop(0, c2);
        gx.addColorStop(1, c3);
        ctx.fillStyle = gx;

        for (let y = -step; y < h + step; y += step) {
          for (let x = -step; x < w + step; x += step) {
            const n =
              noise(x * scale + t * speed, y * scale + t * speed * 0.85) +
              0.55 * noise(x * scale * 2.0 - t * speed * 0.65, y * scale * 2.0 + t * speed * 0.35);

            const dx = Math.sin(t * (0.75 + L * 0.2) + n * 6.2) * (amp * 0.12);
            const dy = Math.cos(t * (0.85 + L * 0.2) + n * 5.6) * (amp * 0.10);

            const r = 180 + n * 120;
            const alpha = (theme === "dark" ? 0.035 : 0.04) + n * 0.018;

            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.ellipse(x + dx, y + dy, r, r * 0.70, n * Math.PI, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Caustics: subtle specular highlights (screen blend)
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = a2;

      for (let i = 0; i < 3; i++) {
        const n = noise(40 + t * 0.22 + i * 13, 20 + i * 17);
        const cx = w * (0.22 + 0.24 * i) + Math.sin(t * (0.35 + i * 0.1)) * 160;
        const cy = h * (0.28 + 0.16 * i) + Math.cos(t * (0.32 + i * 0.1)) * 120;
        const rr = 420 + n * 260;

        const radial = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr);
        radial.addColorStop(0, "rgba(255,255,255,0.95)");
        radial.addColorStop(1, "rgba(255,255,255,0)");

        ctx.fillStyle = radial;
        ctx.beginPath();
        ctx.arc(cx, cy, rr, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.55,
        filter: "saturate(1.08)",
      }}
    />
  );
}
