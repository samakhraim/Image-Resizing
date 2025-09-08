import sharp from "sharp";

(async () => {
  const info = await sharp({
    create: {
      width: 50,
      height: 50,
      channels: 3,
      background: { r: 255, g: 0, b: 0 }
    }
  })
    .png()
    .toBuffer();

  console.log("✅ Sharp works, buffer length:", info.length);
})();
