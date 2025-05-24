import { ExtensionConfig, ExtensionTypeEnum } from "@pulse-editor/shared-utils";
import packageJson from "./package.json" with { type: "json" };
import { generateImageCommandInfo } from "./src/lib/commands";

/**
 * Pulse Editor Extension Config
 *
 */
const config: ExtensionConfig = {
  // Do not use hyphen character '-' in the id. 
  // The id should be the same as the package name in package.json.
  id: packageJson.name,
  displayName: packageJson.displayName,
  description: packageJson.description,
  version: packageJson.version,
  extensionType: ExtensionTypeEnum.FileView,
  fileTypes: ["peie.image"],
  commandsInfoList: [
    generateImageCommandInfo
  ]
};

export default config;
