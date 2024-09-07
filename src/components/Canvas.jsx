import { useRef, useEffect, useState } from "react";
import Ball from "../classes/Ball";
import Particle from "../classes/Particle";

const Canvas = () => {
  const [animationCount, setAnimationCount] = useState(0);
  const canvasRef = useRef(null);
  let animationFrameIdRef = useRef(null);
  let balls = [];
  let particles = [];

  // BALL COLOR PALETTE
  const colorPalette = ["#A54657", "#582630", "#F7EE7F", "#F1A66A", "#F26157"];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const randomIntFromRange = (min, max) => {
      let num = Math.random() * (max - min + 1) + min;
      while (num === 0) {
        num = Math.random() * (max - min + 1) + min;
      }
      return num;
    };
    const randomColor = () => {
      console.log(
        colorPalette[Math.floor(Math.random() * (colorPalette.length - 1))]
      );
      return colorPalette[Math.floor(Math.random() * colorPalette.length - 1)];
    };

    // CREATE BALLS
    const createBalls = () => {
      const ballAmount = 20;
      for (let i = 0; i < ballAmount; i++) {
        const radius = randomIntFromRange(15, 30);
        const x = randomIntFromRange(radius, canvas.width - radius);
        const y = randomIntFromRange(radius, canvas.height - radius);
        const velocity = {
          x: randomIntFromRange(-2, 2),
          y: randomIntFromRange(-2, 2),
        };
        const acceleration = {
          x: (Math.random() - 0.5) * 0.1,
          y: (Math.random() - 0.5) * 0.1,
        };
        const color = randomColor();

        balls.push(new Ball(x, y, radius, color, velocity, acceleration));
      }
    };

    createBalls();

    // CREATE PARTICLES
    const createParticles = () => {
      const particleAmount = 50;
      for (let i = 0; i < particleAmount; i++) {
        const radius = randomIntFromRange(1, 5);
        const x = randomIntFromRange(radius, canvas.width - radius);
        const y = randomIntFromRange(radius, canvas.height - radius);
        const velocity = {
          x: randomIntFromRange(-1, 1),
          y: randomIntFromRange(-1, 1),
        };
        const color = randomColor();

        particles.push(new Particle(x, y, radius, color, velocity));
      }
    };

    createParticles();

    // MAIN ANIMATION LOOP
    const animate = () => {
      setAnimationCount((prev) => prev + 1);
      console.log(animationCount);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      balls.forEach((ball) => ball.update(ctx, canvas, balls));
      particles.forEach((particle) => particle.update(ctx, canvas));

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameIdRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      className="bg-black block absolute"
    ></canvas>
  );
};

export default Canvas;
