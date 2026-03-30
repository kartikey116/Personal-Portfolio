"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function OmIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Phase timeline: fade-in (1.2s) → hold (1.8s) → fade-out (1.2s)
    const t1 = setTimeout(() => setPhase("hold"), 1200);
    const t2 = setTimeout(() => setPhase("out"), 3000);
    const t3 = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  // 8 sacred geometry petals
  const petals = Array.from({ length: 8 }, (_, i) => i);
  // 3 concentric glowing rings
  const rings = [
    { size: 260, opacity: 0.18, dur: 18, delay: 0 },
    { size: 360, opacity: 0.10, dur: 24, delay: 0.4 },
    { size: 480, opacity: 0.06, dur: 30, delay: 0.8 },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "out" ? 0 : 1 }}
          transition={{ duration: phase === "out" ? 1.2 : 0.9, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: "radial-gradient(ellipse at center, #080c1a 0%, #030712 70%)" }}
        >
          {/* ── Star field ── */}
          {Array.from({ length: 55 }, (_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 2.5 + 0.5,
                height: Math.random() * 2.5 + 0.5,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background: ["#22d3ee", "#a78bfa", "#f9fafb", "#818cf8"][Math.floor(Math.random() * 4)],
              }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* ── Outer radial gradient pulse ── */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 700,
              height: 700,
              background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* ── Concentric spinning rings — centered at exact 50%/50% ── */}
          {rings.map((ring, i) => (
            <motion.div
              key={`ring-${i}`}
              className="absolute rounded-full border"
              style={{
                width: ring.size,
                height: ring.size,
                top: "50%",
                left: "50%",
                // Framer Motion x/y compose with rotate — no conflict
                x: "-50%",
                y: "-50%",
                borderColor: `rgba(168,85,247,${ring.opacity})`,
                boxShadow: `0 0 12px rgba(168,85,247,${ring.opacity * 1.5})`,
              }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: ring.dur, repeat: Infinity, ease: "linear", delay: ring.delay }}
            />
          ))}

          {/* ── Sacred geometry: 8-petal lotus mandala — square + centered ── */}
          <div
            className="absolute"
            style={{
              width: 220,
              height: 220,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {petals.map((p) => (
              <motion.div
                key={`petal-${p}`}
                className="absolute inset-0 flex items-center justify-center"
                style={{ rotate: `${p * 45}deg` }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 1, delay: 0.1 * p, ease: "easeOut" }}
              >
                <div
                  style={{
                    width: 60,
                    height: 110,
                    borderRadius: "50% 50% 0 0",
                    background: "linear-gradient(180deg, rgba(167,139,250,0.4) 0%, transparent 100%)",
                    transformOrigin: "bottom center",
                    marginBottom: 10,
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* ── Orbiting light dots ── */}
          {[
            { size: 8, orbit: 150, dur: 5, color: "#22d3ee" },
            { size: 6, orbit: 190, dur: 8, color: "#a78bfa" },
            { size: 5, orbit: 230, dur: 11, color: "#f472b6" },
          ].map((dot, i) => (
            <motion.div
              key={`orbit-${i}`}
              className="absolute top-1/2 left-1/2"
              animate={{ rotate: 360 }}
              transition={{ duration: dot.dur, repeat: Infinity, ease: "linear" }}
              style={{ width: 0, height: 0 }}
            >
              <motion.div
                style={{
                  width: dot.size,
                  height: dot.size,
                  borderRadius: "50%",
                  position: "absolute",
                  top: -dot.size / 2,
                  left: dot.orbit - dot.size / 2,
                  background: dot.color,
                  boxShadow: `0 0 ${dot.size * 2}px ${dot.color}`,
                }}
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: dot.dur / 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          ))}

          {/* ── Main Om Symbol — pinned at exact viewport 50%/50% ── */}
          {/* Outer wrapper: plain CSS centers Om glyph at screen center */}
          <div
            className="absolute z-10"
            style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          >
            <motion.div
              className="relative flex items-center justify-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: phase === "out" ? 1.15 : 1,
                opacity: phase === "in" ? 1 : phase === "hold" ? 1 : 0,
              }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Glow ring — centered on Om via absolute inset centering */}
              <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 180,
                  height: 180,
                  top: "50%",
                  left: "50%",
                  x: "-50%",
                  y: "-50%",
                  background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)",
                }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* The Om ॐ character */}
              <motion.span
                className="relative z-10 select-none block"
                style={{
                  fontSize: "clamp(90px, 16vw, 140px)",
                  lineHeight: 1,
                  fontFamily: "serif",
                  background: "linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 30%, #a78bfa 60%, #7c3aed 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 15px rgba(167,139,250,0.7))",
                }}
                animate={{
                  filter: [
                    "drop-shadow(0 0 10px rgba(167,139,250,0.5))",
                    "drop-shadow(0 0 25px rgba(167,139,250,0.8))",
                    "drop-shadow(0 0 10px rgba(167,139,250,0.5))",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                ॐ
              </motion.span>
            </motion.div>
          </div>

          {/* ── Subtitle — separate absolutely-positioned element below Om center ── */}
          <motion.div
            className="absolute z-10 flex flex-col items-center gap-1"
            style={{ top: "calc(50% + 90px)", left: "50%", x: "-50%" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: phase === "out" ? 0 : 1,
              y: phase === "out" ? 10 : 0,
            }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <span
              className="text-sm tracking-[0.2em] uppercase font-light whitespace-nowrap"
              style={{ color: "rgba(196,181,253,0.7)", fontFamily: "serif" }}
            >
              UNITY . CREATION . INNOVATION
            </span>
            <div
              className="w-24 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.6), transparent)" }}
            />
          </motion.div>

          {/* ── Ripple wave on enter ── */}
          {phase !== "out" && [0, 0.4, 0.8].map((delay, i) => (
            <motion.div
              key={`ripple-${i}`}
              className="absolute rounded-full border border-purple-400/20 pointer-events-none"
              style={{ width: 100, height: 100 }}
              animate={{ scale: [1, 5], opacity: [0.5, 0] }}
              transition={{ duration: 3, delay, repeat: Infinity, ease: "easeOut" }}
            />
          ))}

          {/* ── Bottom "loading" dot trail ── */}
          <motion.div
            className="absolute bottom-12 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            {[0, 0.2, 0.4].map((delay, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-purple-400"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
                transition={{ duration: 1, delay, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
