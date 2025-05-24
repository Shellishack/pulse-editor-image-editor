import React, { useState } from "react";
import Viewport from "./viewport";
import InputArea from "./input-area";

export default function EditorPanel() {
  const [image, setImage] = useState<ArrayBuffer | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="h-full w-full grid grid-rows-[auto_max-content] p-2 gap-2">
      <Viewport image={image} isGenerating={isGenerating} />
      <InputArea
        setImage={setImage}
        isGenerating={isGenerating}
        setIsGenerating={setIsGenerating}
      />
    </div>
  );
}
