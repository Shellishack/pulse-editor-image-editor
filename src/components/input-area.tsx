import { Button, Input } from "@heroui/react";
import React, { useState } from "react";
import Icon from "./icon";

export default function InputArea() {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="flex h-full">
      <Input
        value={prompt}
        onValueChange={setPrompt}
        label="Text prompt"
        endContent={
          <Button isIconOnly variant="light">
            <Icon name="send" />
          </Button>
        }
      />
    </div>
  );
}
