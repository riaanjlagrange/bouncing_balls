import { useRef, useEffect } from "react";

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  return <canvas ref={canvasRef} id="canvas" className="block"></canvas>;
};

export default Canvas;
