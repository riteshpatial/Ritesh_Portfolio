import React, { useEffect, useRef } from "react";
import "./Hyperspeed.css";

const Hyperspeed = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width - canvas.width / 2,
      y: Math.random() * canvas.height - canvas.height / 2,
      z: Math.random() * canvas.width,
    }));

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.z -= 5;
        if (star.z <= 0) star.z = canvas.width;

        const k = 128.0 / star.z;
        const px = star.x * k + canvas.width / 2;
        const py = star.y * k + canvas.height / 2;

        if (px >= 0 && px < canvas.width && py >= 0 && py < canvas.height) {
          const size = (1 - star.z / canvas.width) * 3;
          ctx.beginPath();
          ctx.fillStyle = `rgba(170, 0, 255, ${1 - star.z / canvas.width})`;
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      requestAnimationFrame(draw);
    };

    draw();

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return <canvas ref={canvasRef} className="hyperspeed-background"></canvas>;
};

export default Hyperspeed;
