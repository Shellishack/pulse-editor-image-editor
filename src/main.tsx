import React, { useState } from "react";
import "./tailwind.css";
import config from "../pulse.config";

export const Config = config;

export default function Main() {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <button
        className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setCount(count + 1)}
      >
        Click me
      </button>
      <p className="text-blue-400">{count}</p>
    </div>
  );
}
