import React from "react";
import Viewport from "./viewport";
import InputArea from "./input-area";

export default function EditorPanel() {
  return (
    <div className="h-full w-full grid grid-rows-[auto_max-content] p-2 gap-2">
      <Viewport />
      <InputArea />
    </div>
  );
}
