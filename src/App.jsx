import Canvas from "./components/Canvas";
import { useState } from "react";

function App() {
  const [animationCount, setAnimationCount] = useState(0);

  const updateAnimationCount = () => {
    setAnimationCount((prev) => prev + 1);
  };

  return (
    <div className="relative">
      <h1 className="absolute top-0 right-0 text-white z-10 font-medium text-lg bg-red-500 p-4 w-80 text-center">
        Animation Count: {animationCount}
      </h1>
      <Canvas updateCount={updateAnimationCount} />
    </div>
  );
}

export default App;
