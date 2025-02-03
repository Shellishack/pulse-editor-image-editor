import React, { useState } from "react";
import "./tailwind.css";
import { ExtensionConfig, ExtensionTypeEnum } from "@pulse-editor/types";

/**
 * Pulse Editor Extension Config
 *
 */
export const Config: ExtensionConfig = {
  // Do not use hyphen character '-' in the name
  id: "pulse_extension_template",
  displayName: "Pulse Extension Template",
  description: "Pulse extension template",
  version: "v0.0.1",
  extensionType: ExtensionTypeEnum.FileView,
  fileTypes: ["txt", "json", "py", "cpp", "c", "tsx", "ts", "js", "jsx"],
};

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
