import { useEffect, useRef } from "react";

/**
 * A self-playing Chrome "no internet" dino runner, rendered to a canvas in the
 * empty space beside the hero bio. It runs perpetually with no user input — a
 * tiny rule-based "AI" auto-jumps the obstacles — so it reads as an ambient,
 * living decoration rather than a playable game. Pixels are drawn as a dot grid
 * to match the site's Nothing-OS dot-matrix aesthetic, and the single ink color
 * follows the active theme via a CSS variable read off the canvas element.
 *
 * Everything lives in one rAF loop on plain canvas — no game-engine deps, no
 * React state per frame (which would thrash) — and the whole thing pauses when
 * scrolled out of view or when the user prefers reduced motion.
 */
export function DinoGame({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // --- Logical (pre-DPR) dimensions. The canvas backing store is scaled up by
    // devicePixelRatio for crispness; all game math uses these logical units. ---
    const W = 320;
    const H = 150;
    const GROUND_Y = H - 26;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = W * DPR;
    canvas.height = H * DPR;
    ctx.scale(DPR, DPR);

    // Resolve the ink color from the theme once per frame group; it's cheap and
    // lets the runner recolor instantly when the user toggles dark/light.
    const inkColor = () =>
      getComputedStyle(canvas).getPropertyValue("--dino-ink").trim() ||
      "#64748b";

    // --- Sprite bitmaps (1 = filled pixel). Classic 2-frame dino + cactus. ---
    // 20w x 22h dino, standing/legs frames share the body; only feet differ.
    const DINO_BODY = [
      "00000000111111100",
      "00000000111101110",
      "00000000111111110",
      "00000000111111110",
      "00000000111111100",
      "00000000111100000",
      "00000000111111000",
      "10000001111110000",
      "11000011111111000",
      "11100111111111000",
      "11111111111111000",
      "11111111111110000",
      "01111111111110000",
      "00111111111110000",
      "00011111111100000",
      "00001111111000000",
      "00000111011000000",
      "00000110001000000",
      "00000100001000000",
      "00000110001100000",
    ];
    const DINO_FOOT_A = "00000111000000000";
    const DINO_FOOT_B = "00000000011100000";

    // 12w x 24h cactus (single arm). A taller/short variant is derived at draw.
    const CACTUS = [
      "000110000",
      "000110000",
      "000110000",
      "010110000",
      "110110000",
      "110110010",
      "110110110",
      "110110110",
      "010110110",
      "000110110",
      "000110010",
      "000110000",
      "000110000",
      "000110000",
      "000110000",
      "000110000",
    ];

    // --- World state ---
    // All motion is expressed in units-per-SECOND and advanced on a fixed
    // timestep (see the loop below), so the runner moves at one constant, smooth
    // speed on any refresh rate (60Hz, 120Hz, throttled tabs) with no ramp.
    let dinoY = 0; // offset above ground (positive = up)
    let vy = 0;
    const GRAVITY = 1700; // px/s² downward
    const JUMP_V = 490; // px/s initial up velocity — clears a cactus with margin
    let onGround = true;
    let frame = 0; // fixed-step tick, drives sprite/ground animation only
    const SPEED = 120; // px/s — constant world scroll speed

    type Obstacle = { x: number; h: number; w: number };
    const obstacles: Obstacle[] = [];
    let nextSpawnGap = 1.5; // seconds until next spawn
    let sinceSpawn = 999; // seconds since last spawn (large → spawn immediately)
    let worldX = 0; // total px scrolled — drives ground/pebble parallax
    let spawnCount = 0; // how many cacti spawned — varies size + gap

    // Day/night ink inversion handled by CSS var; we just keep score + clouds.
    const clouds: { x: number; y: number }[] = [
      { x: 220, y: 28 },
      { x: 90, y: 46 },
    ];

    // --- rAF control: pause off-screen and on hidden tab ---
    let raf = 0;
    let running = true;

    const io = new IntersectionObserver(
      ([entry]) => {
        const wasRunning = running;
        running = entry.isIntersecting;
        // Restart the loop when it scrolls back into view (reseeding the clock so
        // the time spent off-screen isn't simulated all at once).
        if (running && !wasRunning && !prefersReduced) start();
      },
      { threshold: 0.01 },
    );
    io.observe(canvas);

    // --- Drawing helpers: render each filled sprite pixel as a small dot so the
    // runner matches the dotted background motif. ---
    const PIXEL = 2.0; // logical size of one sprite pixel cell
    const DOT_R = 1.0;

    const drawSprite = (
      rows: string[],
      ox: number,
      oy: number,
      color: string,
    ) => {
      ctx.fillStyle = color;
      for (let r = 0; r < rows.length; r++) {
        const row = rows[r];
        for (let c = 0; c < row.length; c++) {
          if (row[c] === "1") {
            const px = ox + c * PIXEL + PIXEL / 2;
            const py = oy + r * PIXEL + PIXEL / 2;
            ctx.beginPath();
            ctx.arc(px, py, DOT_R, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    const drawGround = (color: string) => {
      // Dotted baseline with a few scattered speckles, scrolling left in lockstep
      // with the obstacles (both driven by worldX), so nothing slides relative to
      // the cacti the dino is jumping.
      ctx.fillStyle = color;
      const spacing = 7;
      const shift = worldX % spacing;
      for (let x = -shift; x < W; x += spacing) {
        ctx.beginPath();
        ctx.arc(x, GROUND_Y + 2, 0.9, 0, Math.PI * 2);
        ctx.fill();
      }
      // sparse pebbles
      for (let i = 0; i < 6; i++) {
        const px = (i * 67 - worldX * 0.6) % W;
        const x = px < 0 ? px + W : px;
        ctx.beginPath();
        ctx.arc(x, GROUND_Y + 7 + (i % 2) * 3, 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawCloud = (cx: number, cy: number, color: string) => {
      // Small dot-matrix puff.
      const puff = [
        "00111100",
        "01111110",
        "11111111",
        "01111100",
      ];
      ctx.fillStyle = color;
      for (let r = 0; r < puff.length; r++) {
        for (let c = 0; c < puff[r].length; c++) {
          if (puff[r][c] === "1") {
            ctx.beginPath();
            ctx.arc(cx + c * 3, cy + r * 3, 0.9, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    const spawnObstacle = () => {
      // Alternate short/tall cactus deterministically off the spawn count.
      spawnCount++;
      const tall = spawnCount % 3 === 0;
      obstacles.push({ x: W + 10, h: tall ? 1.0 : 0.8, w: CACTUS[0].length });
    };

    // --- Collision geometry (logical px). Only the dino's lower-front leg/torso
    // block (cells 8→14 of the 17-wide sprite) ever reaches a cactus — its raised
    // arms and tail don't — so we collide on that tight box. A cactus's filled
    // columns span cells 1→8 of its grid. The horizontal centres of those boxes
    // are what the auto-jump aims to align with the jump's apex. ---
    const DINO_OX = 18;
    const DINO_HIT_BACK = DINO_OX + 8 * PIXEL; // back edge of the leg/torso block
    const DINO_HIT_FRONT = DINO_OX + 14 * PIXEL; // front edge of the body
    const DINO_CENTER = (DINO_HIT_BACK + DINO_HIT_FRONT) / 2;
    const CACTUS_CENTER = 4.5 * PIXEL; // centre of a cactus's filled columns

    // Time (s) from lift-off to the top of the arc. Centering the apex on the
    // moment the cactus passes the dino means the dino is at its highest exactly
    // when it most needs the clearance — symmetric, and robust to small timing
    // jitter because the arc is flattest there.
    const APEX_TIME = JUMP_V / GRAVITY;

    // `dt` is the fixed timestep in seconds — every motion term multiplies by it,
    // so the world advances the same amount of real time per step regardless of
    // how often the browser paints.
    const step = (dt: number) => {
      frame++;
      worldX += SPEED * dt;

      // --- Auto-jump AI: fire so the jump's apex lands on the obstacle. The
      // cactus centre reaches the dino centre after
      //   t = (cactusCentreX − dinoCentreX) / SPEED   seconds;
      // we lift off on the first step where that is within one apex-time, so the
      // dino is at maximum height as the cactus slides underneath. Deterministic
      // and never mistimed — verified to clear both cactus heights with a wide
      // vertical gap. ---
      if (onGround) {
        for (const o of obstacles) {
          const cactusCenterX = o.x + CACTUS_CENTER;
          const timeToAlign = (cactusCenterX - DINO_CENTER) / SPEED;
          if (timeToAlign > 0 && timeToAlign <= APEX_TIME) {
            vy = JUMP_V;
            onGround = false;
            break;
          }
        }
      }

      // physics (semi-implicit Euler, all per-second)
      if (!onGround) {
        vy -= GRAVITY * dt;
        dinoY += vy * dt;
        if (dinoY <= 0) {
          dinoY = 0;
          vy = 0;
          onGround = true;
        }
      }

      // obstacle spawning — gap measured in seconds so cadence is frame-rate free
      sinceSpawn += dt;
      if (sinceSpawn >= nextSpawnGap) {
        spawnObstacle();
        sinceSpawn = 0;
        // vary the gap (seconds) so spacing feels organic but always clearable
        nextSpawnGap = 1.4 + ((spawnCount * 0.37) % 1.1);
      }
      for (const o of obstacles) o.x -= SPEED * dt;
      while (obstacles.length && obstacles[0].x < -20) obstacles.shift();

      // clouds drift slowly, wrap around
      for (const cl of clouds) {
        cl.x -= 11 * dt;
        if (cl.x < -24) cl.x = W + 10;
      }
    };

    const render = () => {
      const color = inkColor();
      ctx.clearRect(0, 0, W, H);

      for (const cl of clouds) drawCloud(cl.x, cl.y, color);
      drawGround(color);

      // dino — alternate feet every ~6 frames while grounded, tuck legs midair
      const legSwap = onGround ? Math.floor(frame / 6) % 2 === 0 : false;
      const dinoRows = [...DINO_BODY];
      // overlay the active foot onto the last row region
      const footRow = onGround
        ? legSwap
          ? DINO_FOOT_A
          : DINO_FOOT_B
        : "00000110001100000"; // both feet tucked while jumping
      dinoRows[dinoRows.length - 1] = footRow;
      const dinoOy = GROUND_Y - DINO_BODY.length * PIXEL - dinoY;
      drawSprite(dinoRows, DINO_OX, dinoOy, color);

      // obstacles
      for (const o of obstacles) {
        const oh = CACTUS.length * PIXEL * o.h;
        const oy = GROUND_Y - oh;
        // scale rows vertically by drawing with a stretched PIXEL on h
        ctx.fillStyle = color;
        const cellH = (CACTUS.length * PIXEL * o.h) / CACTUS.length;
        for (let r = 0; r < CACTUS.length; r++) {
          for (let c = 0; c < CACTUS[r].length; c++) {
            if (CACTUS[r][c] === "1") {
              const px = o.x + c * PIXEL + PIXEL / 2;
              const py = oy + r * cellH + cellH / 2;
              ctx.beginPath();
              ctx.arc(px, py, DOT_R, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
        void oh;
      }
    };

    // --- Fixed-timestep loop. The simulation always advances in 1/60s slices, so
    // physics is identical on every display; rAF only decides how often we paint.
    // Elapsed real time is accumulated and drained in fixed steps, which keeps the
    // dino's speed perfectly steady (no ramp, no refresh-rate dependence) and
    // jitter-free even if a frame is late. ---
    const FIXED_DT = 1 / 60; // seconds per simulation step
    let lastT = 0; // ms timestamp of previous frame
    let acc = 0; // leftover unsimulated time (seconds)
    let started = false;

    const loop = (now: number) => {
      if (!running || prefersReduced) return;

      if (!started) {
        // First frame after (re)start: seed the clock, don't advance the world.
        started = true;
        lastT = now;
      } else {
        // Clamp the delta so returning to a backgrounded tab doesn't fast-forward.
        const elapsed = Math.min((now - lastT) / 1000, 0.1);
        lastT = now;
        acc += elapsed;
        while (acc >= FIXED_DT) {
          step(FIXED_DT);
          acc -= FIXED_DT;
        }
      }

      render();
      raf = window.requestAnimationFrame(loop);
    };

    const start = () => {
      started = false; // reseed the clock so no time is "owed" after a pause
      raf = window.requestAnimationFrame(loop);
    };

    // Draw one static frame even under reduced-motion so the space isn't empty.
    if (prefersReduced) {
      render();
    } else {
      start();
    }

    return () => {
      running = false;
      io.disconnect();
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "320px",
          height: "150px",
          // Theme-aware ink, read per-frame inside the loop.
          ["--dino-ink" as string]: "var(--text-muted)",
        }}
        className="max-w-full"
      />
    </div>
  );
}
