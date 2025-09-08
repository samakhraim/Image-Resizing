"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
describe("Image Resizer API Integration Tests", () => {
    const resizedPath = path_1.default.resolve("images_resized", "test-50x50.jpg");
    afterAll(() => {
        // Clean up resized file
        if (fs_1.default.existsSync(resizedPath)) {
            fs_1.default.unlinkSync(resizedPath);
        }
    });
    it("should resize an image and return status 200", async () => {
        const response = await (0, supertest_1.default)(index_1.default)
            .get("/api/images/resize")
            .query({ filename: "test.jpg", width: 50, height: 50 });
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/image/);
    });
    it("should return 400 if parameters are missing", async () => {
        const response = await (0, supertest_1.default)(index_1.default).get("/api/images/resize");
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Missing required query params: width, height, filename");
    });
    it("should return 404 if image is not found", async () => {
        const response = await (0, supertest_1.default)(index_1.default)
            .get("/api/images/resize")
            .query({ filename: "doesnotexist.jpg", width: 100, height: 100 });
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Image not found in /images folder");
    });
});
//# sourceMappingURL=imageRoutes.spec.js.map