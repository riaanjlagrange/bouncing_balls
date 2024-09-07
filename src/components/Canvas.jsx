import { useRef, useEffect } from "react";
import Ball from "../classes/Ball";

const Canvas = () => {
  const canvasRef = useRef(null);
  let animationFrameIdRef = useRef(null);
  let balls = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const randomIntFromRange = (min, max) =>
      Math.floor(Math.random() * (max - min + 1) + min);
    const randomColor = () => `hsl(${Math.random() * 360}, 50%, 50%)`;

    // CREATE BALLS WITH RANDOM COLOR AND RADIUS
    const createBalls = () => {
      for (let i = 0; i < 20; i++) {
        const radius = randomIntFromRange(15, 30);
        const x = randomIntFromRange(radius, canvas.width - radius);
        const y = randomIntFromRange(radius, canvas.height - radius);
        const velocity = {
          x: randomIntFromRange(-2, 2),
          y: randomIntFromRange(-2, 2),
        };
        const color = randomColor();

        balls.push(new Ball(x, y, radius, color, velocity));
      }
    };

    createBalls();

    // MAIN ANIMATION LOOP
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      balls.forEach((ball) => ball.update(ctx, canvas));

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameIdRef.current);
  }, []);

  return (
    <canvas ref={canvasRef} id="canvas" style={{ display: "block" }}></canvas>
  );
};

export default Canvas;
