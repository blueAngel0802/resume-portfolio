import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  a: number;
  tw: number; // twinkle speed
  ph: number; // phase
  vx: number;
  vy: number;
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = clamp(window.devicePixelRatio || 1, 1, 2);

    function rand(min: number, max: number) {
      return min + Math.random() * (max - min);
    }

    function resize() {
      w = Math.floor(window.innerWidth);
      h = Math.floor(window.innerHeight);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // density scales with screen area
      const count = Math.floor((w * h) / 5000); // ~120 on 1920x1080
      const stars: Star[] = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: rand(0, w),
          y: rand(0, h),
          r: rand(0.6, 1.8),
          a: rand(0.25, 0.85),
          tw: rand(0.6, 1.6),
          ph: rand(0, Math.PI * 2),
          vx: rand(-0.03, 0.03),
          vy: rand(-0.02, 0.02),
        });
      }
      starsRef.current = stars;
    }

    const getTheme = () =>
      document.documentElement.getAttribute("data-theme") || "light";

    const start = performance.now();

    function frame(now: number) {
      const t = (now - start) / 1000;
      const theme = getTheme();

      ctx.clearRect(0, 0, w, h);

      // Subtle nebula glow (clean, not foggy)
      ctx.globalCompositeOperation = "source-over";
      const glowA = theme === "dark" ? 0.22 : 0.10;
      ctx.globalAlpha = glowA;
      const g1 = ctx.createRadialGradient(w * 0.25, h * 0.2, 0, w * 0.25, h * 0.2, Math.min(w, h) * 0.65);
      g1.addColorStop(0, theme === "dark" ? "rgba(80,150,255,0.45)" : "rgba(80,150,255,0.25)");
      g1.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      const g2 = ctx.createRadialGradient(w * 0.78, h * 0.18, 0, w * 0.78, h * 0.18, Math.min(w, h) * 0.55);
      g2.addColorStop(0, theme === "dark" ? "rgba(190,140,255,0.35)" : "rgba(190,140,255,0.20)");
      g2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      // Stars
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "lighter";

      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // drift
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < -10) s.x = w + 10;
        if (s.x > w + 10) s.x = -10;
        if (s.y < -10) s.y = h + 10;
        if (s.y > h + 10) s.y = -10;

        // twinkle
        const tw = 0.7 + 0.3 * Math.sin(s.ph + t * s.tw * 0.8);
        const alpha = clamp(s.a * tw, 0.08, 0.95);

        // small sparkle occasionally
        const sparkle = Math.sin((s.ph + t) * 3.1) > 0.999 ? 1.7 : 1;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = theme === "dark" ? "rgba(255,255,255,1)" : "rgba(20,24,34,1)";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * sparkle, 0, Math.PI * 2);
        ctx.fill();

        // faint halo
        ctx.globalAlpha = alpha * 0.35;
        const rr = s.r * 8;
        const rg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, rr);
        rg.addColorStop(0, theme === "dark" ? "rgba(255,255,255,0.65)" : "rgba(20,24,34,0.18)");
        rg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = rg;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.ph);
        ctx.globalAlpha = alpha * 0.9;

        ctx.strokeStyle = "rgba(255,255,255,1)";
        ctx.lineWidth = Math.max(0.5, s.r * 0.4);

        ctx.beginPath();
        ctx.moveTo(0, -s.r * 2.4);
        ctx.lineTo(0, s.r * 2.4);
        ctx.moveTo(-s.r * 2.4, 0);
        ctx.lineTo(s.r * 2.4, 0);
        ctx.stroke();

        ctx.restore();

        ctx.beginPath();
        ctx.arc(s.x, s.y, rr, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

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
      }}
    />
  );
}
