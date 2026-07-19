"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 220;
    camera.position.y = 80;
    camera.lookAt(0, 0, 0);

    // 3. Renderer setup with transparency and anti-aliasing
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Geometry setup - Wave of points
    const numParticlesX = 55;
    const numParticlesY = 35;
    const numParticles = numParticlesX * numParticlesY;
    const gap = 12;

    const positions = new Float32Array(numParticles * 3);
    const colors = new Float32Array(numParticles * 3);

    const color1 = new THREE.Color("#00E5FF"); // Primary Cyan
    const color2 = new THREE.Color("#6C63FF"); // Secondary Indigo

    let i = 0;
    for (let ix = 0; ix < numParticlesX; ix++) {
      for (let iy = 0; iy < numParticlesY; iy++) {
        // Position centering around origin
        positions[i] = ix * gap - (numParticlesX * gap) / 2; // X
        positions[i + 1] = 0; // Y (Calculated in render loop)
        positions[i + 2] = iy * gap - (numParticlesY * gap) / 2; // Z

        // Color gradient based on X/Y position
        const ratio = (ix + iy) / (numParticlesX + numParticlesY);
        const mixedColor = color1.clone().lerp(color2, ratio);

        colors[i] = mixedColor.r;
        colors[i + 1] = mixedColor.g;
        colors[i + 2] = mixedColor.b;

        i += 3;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // 5. Shader Material for round glowy particles
    // We create a tiny canvas texture of a soft circular glow to prevent blocky squares
    const createCircleTexture = () => {
      const size = 32;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
        grad.addColorStop(0, "rgba(255, 255, 255, 1)");
        grad.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, size, size);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const material = new THREE.PointsMaterial({
      size: 4.5,
      vertexColors: true,
      map: createCircleTexture(),
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 6. Interaction tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX - window.innerWidth / 2;
      mouseY = e.clientY - window.innerHeight / 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 7. Resize event
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 8. Animation Loop
    let count = 0;
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      count += 0.04;

      // Update particle heights based on 3D Sine Wave
      const positionAttr = geometry.attributes.position;
      const posArray = positionAttr.array as Float32Array;

      let idx = 0;
      for (let ix = 0; ix < numParticlesX; ix++) {
        for (let iy = 0; iy < numParticlesY; iy++) {
          // Double sine wave overlay
          posArray[idx + 1] =
            Math.sin(ix * 0.25 + count) * 16 +
            Math.cos(iy * 0.25 + count * 0.8) * 12;
          idx += 3;
        }
      }
      positionAttr.needsUpdate = true;

      // Smooth mouse follow (easing)
      targetX = mouseX * 0.08;
      targetY = mouseY * 0.06;

      particles.rotation.y = THREE.MathUtils.lerp(particles.rotation.y, targetX * 0.0025, 0.05);
      particles.rotation.x = THREE.MathUtils.lerp(particles.rotation.x, targetY * 0.002, 0.05);

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      // Dispose resources to prevent GPU leaks
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 h-full w-full opacity-60 pointer-events-none"
    />
  );
}
