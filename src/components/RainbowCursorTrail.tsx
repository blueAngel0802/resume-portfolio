import { useEffect, useRef } from "react";

type Point = { x: number; y: number; t: number };

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export function RainbowCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const ptsRef = useRef<Point[]>([]);
  const lastRef = useRef<Point | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = clamp(window.devicePixelRatio || 1, 1, 2);

    const prefersReduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    function resize() {
      w = Math.floor(window.innerWidth);
      h = Math.floor(window.innerHeight);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function onMove(e: PointerEvent) {
      const now = performance.now();
      const p = { x: e.clientX, y: e.clientY, t: now };
      const last = lastRef.current;

      // sample spacing to avoid too many points
      if (!last || Math.hypot(p.x - last.x, p.y - last.y) > 6) {
        ptsRef.current.push(p);
        lastRef.current = p;
        // cap points
        if (ptsRef.current.length > 90) ptsRef.current.splice(0, ptsRef.current.length - 90);
      }
    }

    const start = performance.now();

    function frame(now: number) {
      const pts = ptsRef.current;
      ctx.clearRect(0, 0, w, h);

      // keep last ~800ms
      const life = 2000;
      while (pts.length && now - pts[0].t > life) pts.shift();

      if (pts.length > 1) {
        ctx.globalCompositeOperation = "lighter";
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        for (let i = 1; i < pts.length; i++) {
          const a = pts[i - 1];
          const b = pts[i];
          const age = now - b.t; // 0..life
          const fade = 1 - clamp(age / life, 0, 1);

          const hue = ( (now - start) * 0.05 + i * 10 ) % 360;
          const width = 30 * fade + 2;

          // gradient along segment for a “rainbow” look
          const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          g.addColorStop(0, `hsla(${hue}, 98%, 63%, ${0.1 * fade})`);
          g.addColorStop(1, `hsla(${(hue + 35) % 360}, 90%, 60%, ${0.10 * fade})`);

          ctx.strokeStyle = g;
          ctx.lineWidth = width;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }

        // soft glow blob at head
        const head = pts[pts.length - 1];
        const hue = ((now - start) * 0.06) % 360;
        const r = 28;
        const rg = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, r);
        rg.addColorStop(0, `hsla(${hue}, 90%, 65%, 0.14)`);
        rg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = rg;
        ctx.beginPath();
        ctx.arc(head.x, head.y, r, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalCompositeOperation = "source-over";
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
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
        zIndex: 1, // above stars, below content (.app z-index 2)
        pointerEvents: "none",
      }}
    />
  );
}
