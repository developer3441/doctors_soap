import express from "express";
import { chatCompletion, transcript } from "../controllers/transcription.js";

const Router = express.Router();

Router.post("/audio", transcript);

Router.post("/chat", chatCompletion);

export default Router;
