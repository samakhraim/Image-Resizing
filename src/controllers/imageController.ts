import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import sharp from "sharp";

export const resizeImage = async (req: Request, res: Response) => {
  try {
    const { width, height, filename } = req.query;

    // Validate query params
    if (!width || !height || !filename) {
      return res.status(400).json({
        error: "Missing required query params: width, height, filename",
      });
    }

    const widthNum = Number(width);
    const heightNum = Number(height);

    if (isNaN(widthNum) || isNaN(heightNum) || widthNum <= 0 || heightNum <= 0) {
      return res.status(400).json({
        error: "Width and height must be positive integers",
      });
    }

    const inputPath = path.resolve("images", String(filename));

    if (!fs.existsSync(inputPath)) {
      return res.status(404).json({ error: "Image not found in /images folder" });
    }

    const outputDir = path.resolve("images_resized");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const outputPath = path.resolve(
      outputDir,
      `${path.parse(String(filename)).name}-${widthNum}x${heightNum}.jpg`
    );

    if (fs.existsSync(outputPath)) {
      console.log(`Serving cached image: ${outputPath}`);
      return res.sendFile(outputPath);
    }

    await sharp(inputPath).resize(widthNum, heightNum).toFile(outputPath);
    console.log(`Generated new resized image: ${outputPath}`);

    return res.sendFile(outputPath);
  } catch (error) {
    console.error("❌ Error in resizeImage:", error);
    res.status(500).json({
      error: "Something went wrong while processing the image",
      details: error instanceof Error ? error.message : error,
    });
  }
};
