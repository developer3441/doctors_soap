import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({
  apiKey: "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",
});
export const transcript = async (req, res) => {
  try {
    console.log("Starting Transcript...");
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(req.file.path),
      model: "whisper-1",
    });

    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
    res.json(transcription.text);
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
};

export const chatCompletion = async (req, res) => {
  try {
    console.log("Hey ====>", req?.body?.message);
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: req.body.message,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    res.json(completion);
  } catch (err) {
    res.json({ error: err.message });
  }
};
