import express from "express";
import cors from "cors";
import config from "./pulse.config";

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
  console.log("✅ Module served on http://localhost:3001");
});
