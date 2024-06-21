# Plant, Disease, and Soil Prediction API

This API allows users to upload images to predict plant types, diseases, and soil types using machine learning models.

## Endpoints

### 1. Predict Plant Type

**URL:** `/predict/plant`

**Method:** `POST`

**Description:** This endpoint predicts the type of plant based on the uploaded image.

**Request:**

- **Content-Type:** `multipart/form-data`
- **Parameters:**
  - `image`: The image file of the plant.

**Response:**

- **Success (200):**

  ```json
  {
    "message": "Prediksi tanaman berhasil.",
    "data": {
      "hasil": "APPLE",
      "skorKepercayaan": 95.0,
      "isAboveThreshold": true,
      "Family": "Rosaceae",
      "Description": "Buah manis yang dapat dimakan yang dihasilkan oleh pohon apel.",
      "Benefit": [
        "1. Tinggi serat",
        "2. Kaya akan vitamin C",
        "3. Membantu mengatur gula darah"
      ]
    }
  }
