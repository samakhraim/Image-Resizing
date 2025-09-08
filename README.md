Perfect 👍 Let me give you the **full, polished README.md** you can drop straight into your project root.

---

# 🖼️ Image Resizer API

An Express API built with **TypeScript** that resizes images on demand using [Sharp](https://sharp.pixelplumbing.com/).
Includes **unit and integration tests** with Jasmine + Supertest, **linting** with ESLint, and **formatting** with Prettier.

---

## 🚀 Features

* 📐 Resize images dynamically (`width`, `height` query params)
* ⚡ Caching of resized images to avoid redundant processing
* 🛡️ Error handling for invalid/missing params
* 🟦 Built with **Express + TypeScript**
* 🧪 Tested with **Jasmine + Supertest**
* 🎯 Code quality enforced with **ESLint + Prettier**

---


## ⚙️ Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/samakhraim/Image-Resizing.git
cd image-resizer-api
npm install
```

---

## 🛠️ Scripts

| Command            | Description                               |
| ------------------ | ----------------------------------------- |
| `npm run dev`      | Run the server with `ts-node` + `nodemon` |
| `npm run build`    | Compile TypeScript into `dist/`           |
| `npm start`        | Run the compiled server (`dist/index.js`) |
| `npm test`         | Run Jasmine tests                         |
| `npm run lint`     | Run ESLint and auto-fix issues            |
| `npm run prettier` | Format code with Prettier                 |

---

## 📡 API Usage

### Resize an Image

**Endpoint:**

```
GET /api/images/resize?filename=<name>&width=<w>&height=<h>
```

**Example:**

```
http://localhost:5000/api/images/resize?filename=test.jpg&width=200&height=200
```

✅ If `test.jpg` exists in `/images`, it will return the resized image.
✅ Cached images are stored in `/images_resized` for faster responses.

---

## 📖 Example Responses

**Success (200):**
👉 The resized image is returned directly in the browser/Postman.

**Missing Params (400):**

```json
{ "error": "Missing required query params: width, height, filename" }
```

**Image Not Found (404):**

```json
{ "error": "Image not found in /images folder" }
```

**Server Error (500):**

```json
{ "error": "Something went wrong" }
```

---

## 🧪 Testing

Run all unit and integration tests:

```bash
npm test
```

* **Unit tests** → Validate Sharp-based resizing utilities
* **Integration tests** → Validate API responses using Supertest

---

## 🛡️ Error Handling

* Returns **400** if query params are missing or invalid
* Returns **404** if image is not found in `/images`
* Returns **500** if something unexpected happens during processing

---




