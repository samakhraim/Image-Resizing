import request from "supertest";
import app from "../../index";
import fs from "fs";
import path from "path";


describe("Image Resizer API Integration Tests", () => {
  const resizedPath = path.resolve("images_resized", "test-50x50.jpg");

  afterAll(() => {
    // Clean up resized file
    if (fs.existsSync(resizedPath)) {
      fs.unlinkSync(resizedPath);
    }
  });

  it("should resize an image and return status 200", async () => {
    const response = await request(app)
      .get("/api/images/resize")
      .query({ filename: "test.jpg", width: 50, height: 50 });

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/image/);
  });

  it("should return 400 if parameters are missing", async () => {
    const response = await request(app).get("/api/images/resize");
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Missing required query params: width, height, filename");
  });

  it("should return 404 if image is not found", async () => {
    const response = await request(app)
      .get("/api/images/resize")
      .query({ filename: "doesnotexist.jpg", width: 100, height: 100 });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Image not found in /images folder");
  });
});
