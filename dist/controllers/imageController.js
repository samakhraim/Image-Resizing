"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const resizeImage = async (req, res) => {
    try {
        const { width, height, filename } = req.query;
        if (!width || !height || !filename) {
            return res.status(400).json({
                error: "Missing required query params: width, height, filename",
            });
        }
        const inputPath = path_1.default.resolve("images", String(filename));
        const outputDir = path_1.default.resolve("images_resized");
        const outputPath = path_1.default.resolve(outputDir, `${path_1.default.parse(String(filename)).name}-${width}x${height}.jpg`);
        // Make sure original exists
        if (!fs_1.default.existsSync(inputPath)) {
            return res.status(404).json({ error: "Image not found in /images folder" });
        }
        // Ensure output dir exists
        if (!fs_1.default.existsSync(outputDir)) {
            fs_1.default.mkdirSync(outputDir);
        }
        // Create resized image if it doesn’t exist
        if (!fs_1.default.existsSync(outputPath)) {
            await (0, sharp_1.default)(inputPath)
                .resize(Number(width), Number(height))
                .toFile(outputPath);
            console.log(`Generated new resized image: ${outputPath}`);
        }
        else {
            console.log(`Serving cached image: ${outputPath}`);
        }
        // 👇 Send actual image to browser
        res.sendFile(outputPath);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong", details: error });
    }
};
exports.resizeImage = resizeImage;
//# sourceMappingURL=imageController.js.map