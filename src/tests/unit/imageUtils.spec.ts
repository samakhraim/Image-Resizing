import path from "path";
import fs from "fs";
import sharp from "sharp";

describe("Image Processing Utility", () => {
  const inputPath = path.resolve("images", "test.jpg");
  const outputPath = path.resolve("images_resized", "test-100x100.jpg");

  afterAll(() => {
    // Cleanup after tests
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }
  });

  it("should resize an image to 100x100", async () => {
    await sharp(inputPath).resize(100, 100).toFile(outputPath);

    expect(fs.existsSync(outputPath)).toBeTrue();

    const metadata = await sharp(outputPath).metadata();
    expect(metadata.width).toBe(100);
    expect(metadata.height).toBe(100);
  });
});
