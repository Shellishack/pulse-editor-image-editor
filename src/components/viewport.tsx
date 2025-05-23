import { Skeleton } from "@heroui/react";
import React from "react";

export default function Viewport() {
  return (
    <div className="w-full h-full rounded-xl bg-content1 overflow-hidden">
      <Skeleton className="w-full h-full">
        <div className="w-full h-full"></div>
      </Skeleton>
    </div>
  );
}
