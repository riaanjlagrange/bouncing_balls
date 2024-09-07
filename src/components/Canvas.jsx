import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Ball from "../classes/Ball";
import Particle from "../classes/Particle";

const Canvas = ({ updateCount }) => {
  const canvasRef = useRef(null);
  let animationFrameIdRef = useRef(null);
  let balls = [];
  let particles = [];

  // BALL COLOR PALETTE
  const colorPalette = ["#A54657", "#582630", "#F7EE7F", "#F1A66A", "#F26157"];

  const randomIntFromRange = (min, max) => {
    let num = Math.random() * (max - min + 1) + min;
    while (num === 0) {
      num = Math.random() * (max - min + 1) + min;
    }
    return num;
  };

  const randomColor = () => {
    return colorPalette[Math.floor(Math.random() * colorPalette.length)];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();

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
      const particleAmount = 500;
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
      updateCount();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      balls.forEach((ball) => ball.update(ctx, canvas, balls));
      particles.forEach((particle) => particle.update(ctx, canvas));

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // CLICK EVENT LISTENER TO ADD NEW BALLS
    const handleCanvasClick = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const radius = randomIntFromRange(15, 30);
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
    };

    canvas.addEventListener("click", handleCanvasClick);

    // ADJUST CANVAS ON RESIZE
    const handleResize = () => {
      const oldWidth = canvas.width;
      const oldHeight = canvas.height;

      setCanvasSize();

      const widthRatio = canvas.width / oldWidth;
      const heightRatio = canvas.height / oldHeight;

      // ADJUST BALLS POSITION ON RESIZE
      balls.forEach((ball) => {
        ball.x *= widthRatio;
        ball.y *= heightRatio;
      });

      particles.forEach((particle) => {
        particle.x *= widthRatio;
        particle.y *= heightRatio;
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameIdRef.current);
      canvas.removeEventListener("click", handleCanvasClick);
      window.removeEventListener("resize", handleResize);
    };
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

Canvas.propTypes = {
  updateCount: PropTypes.func.isRequired,
};
