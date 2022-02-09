import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import lusca from "lusca";

// Controllers (route handlers)
import * as healthController from "./controllers/health";


// Create Express server
const app = express();
const db = require('./config/database');

const presentationController = require("./controllers/presentation");

// Express configuration
db.connect();
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

// Primary app routes
app.get("/", healthController.check);
app.post("/create", presentationController.createP);
app.put("/update", presentationController.updateP);
app.delete("/delete", presentationController.deleteP);

export default app;
