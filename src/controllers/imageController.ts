import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import sharp from "sharp";

export const resizeImage = async (req: Request, res: Response) => {
  try {
    const { width, height, filename } = req.query;

    if (!width || !height || !filename) {
      return res.status(400).json({
        error: "Missing required query params: width, height, filename",
      });
    }

    const inputPath = path.resolve("images", String(filename));
    const outputDir = path.resolve("images_resized");
    const outputPath = path.resolve(
      outputDir,
      `${path.parse(String(filename)).name}-${width}x${height}.jpg`
    );

    // Make sure original exists
    if (!fs.existsSync(inputPath)) {
      return res.status(404).json({ error: "Image not found in /images folder" });
    }

    // Ensure output dir exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // Create resized image if it doesn’t exist
    if (!fs.existsSync(outputPath)) {
      await sharp(inputPath)
        .resize(Number(width), Number(height))
        .toFile(outputPath);
      console.log(`Generated new resized image: ${outputPath}`);
    } else {
      console.log(`Serving cached image: ${outputPath}`);
    }

    res.sendFile(outputPath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong", details: error });
  }
};
