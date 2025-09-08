"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
describe("Image Processing Utility", () => {
    const inputPath = path_1.default.resolve("images", "test.jpg");
    const outputPath = path_1.default.resolve("images_resized", "test-100x100.jpg");
    afterAll(() => {
        // Cleanup after tests
        if (fs_1.default.existsSync(outputPath)) {
            fs_1.default.unlinkSync(outputPath);
        }
    });
    it("should resize an image to 100x100", async () => {
        await (0, sharp_1.default)(inputPath).resize(100, 100).toFile(outputPath);
        expect(fs_1.default.existsSync(outputPath)).toBeTrue();
        const metadata = await (0, sharp_1.default)(outputPath).metadata();
        expect(metadata.width).toBe(100);
        expect(metadata.height).toBe(100);
    });
});
//# sourceMappingURL=imageUtils.spec.js.map