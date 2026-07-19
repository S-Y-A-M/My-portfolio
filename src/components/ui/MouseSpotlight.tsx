"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MouseSpotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const lightX = useSpring(mouseX, springConfig);
  const lightY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half the width of the spotlight (350px) to center it
      mouseX.set(e.clientX - 350);
      mouseY.set(e.clientY - 350);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Background Animated Grid Gridmorphism */}
      <div className="pointer-events-none fixed inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
        <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/90 to-background/50" />
      </div>

      {/* Futuristic Spotlight Glow */}
      <motion.div
        className="pointer-events-none fixed z-0 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.04)_0%,rgba(108,99,255,0.02)_50%,transparent_100%)] blur-[40px]"
        style={{
          left: lightX,
          top: lightY,
        }}
      />
    </>
  );
}
