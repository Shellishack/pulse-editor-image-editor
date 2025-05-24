import { Button, Input } from "@heroui/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Icon from "./icon";
import { useExtCommand, useImageGen } from "@pulse-editor/react-api";
import { generateImageCommandInfo } from "../lib/commands";

export default function InputArea({
  isGenerating,
  setIsGenerating,
  setImage,
}: {
  isGenerating: boolean;
  setIsGenerating: Dispatch<SetStateAction<boolean>>;
  setImage: Dispatch<SetStateAction<ArrayBuffer | undefined>>;
}) {
  const [userInput, setUserInput] = useState("");
  const { runImageGen } = useImageGen();
  const { updateHandler, isReady } = useExtCommand(generateImageCommandInfo);

  useEffect(() => {
    if (isReady) {
      updateHandler(async ({ prompt }: { prompt: string }) => {
        setUserInput(() => prompt);
        await generateImage(prompt);

        return "Generated image successfully";
      });
    }
  }, [isReady, isGenerating]);

  async function generateImage(prompt: string) {
    if (isGenerating) {
      return;
    }

    setIsGenerating(true);
    const result = await runImageGen(prompt);
    setIsGenerating(false);

    if (result) {
      setImage(result);
    } else {
      console.error("Image generation failed");
      setImage(undefined);
    }
  }

  return (
    <div className="flex h-full">
      <Input
        value={userInput}
        onValueChange={setUserInput}
        label="Text prompt"
        endContent={
          <Button
            isIconOnly
            variant="light"
            onPress={() => generateImage(userInput)}
          >
            <Icon name="send" />
          </Button>
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            generateImage(userInput);
          }
        }}
      />
    </div>
  );
}
