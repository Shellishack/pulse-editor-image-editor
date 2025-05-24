import { ExtensionCommandInfo } from "@pulse-editor/shared-utils";

export const generateImageCommandInfo: ExtensionCommandInfo = {
  name: "generateImage",
  description: "Generate an image from a text prompt",
  parameters: {
    prompt: {
      name: "prompt",
      type: "string",
      description:
        "The diffusion model text prompt to generate the image. Make sure the prompt is for diffusion models.",
    },
  },
};
