import React, { useEffect } from "react";
import "./tailwind.css";
import config from "../pulse.config";
import { WrappedHeroUIProvider } from "./components/providers/wrapped-hero-ui-provider";
import EditorPanel from "./components/editor-panel";
import "material-icons/iconfont/material-icons.css";
import { useLoading } from "@pulse-editor/react-api";

export const Config = config;

export default function Main() {
  const { toggleLoading, isReady } = useLoading();

  useEffect(() => {
    if (isReady) {
      toggleLoading(false);
    }
  }, [isReady]);

  return (
    <WrappedHeroUIProvider>
      <EditorPanel />
    </WrappedHeroUIProvider>
  );
}
