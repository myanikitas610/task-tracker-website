import React, { useRef, useEffect, useState } from "react";

function ConfettiCanvas({ trigger, resetTrigger }) {
  const canvasRef = useRef(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (trigger) {
      triggerConfetti();
      resetTrigger();
    }
  }, [trigger]);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const newParticles = [];
    for (let i = 0; i < 500; i++) {
      newParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speedX: Math.random() * 5 - 2.5,
        speedY: Math.random() * 5 + 2,
        size: Math.random() * 5 + 2,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      });
    }
    setParticles(newParticles);
    requestAnimationFrame(animateConfetti);
  };

  const animateConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.size *= 0.99;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    });

    setParticles(particles.filter((p) => p.size > 0.5));
    if (particles.length > 0) requestAnimationFrame(animateConfetti);
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 10,
      }}
    ></canvas>
  );
}

export default ConfettiCanvas;
