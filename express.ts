import express from "express";
import cors from "cors";
import { networkInterfaces } from "os";
import config from "./pulse.config";

function getLocalNetworkIP() {
  const interfaces = networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    if (!iface) continue;
    for (const config of iface) {
      if (config.family === "IPv4" && !config.internal) {
        return config.address; // Returns the first non-internal IPv4 address
      }
    }
  }
  return "localhost"; // Fallback
}

const origin = getLocalNetworkIP();

const app = express();

app.use(cors());

// Log each request to the console
app.use((req, res, next) => {
  console.log(`✅ [${req.method}] Received: ${req.url}`);
  return next();
});

app.use(`/${config.id}/${config.version}`, express.static("dist"));

// Start the server
app.listen(3001, () => {
  console.log(
    `
🎉 Your Pulse extension \x1b[1m${config.displayName}\x1b[0m is LIVE! 

⚡️ Local: http://localhost:3001/${config.id}/${config.version}/
⚡️ Network: http://${origin}:3001/${config.id}/${config.version}/

✨ Try it out in the Pulse Editor and let the magic happen! 🚀
`
  );
});
