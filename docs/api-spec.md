# API Specification

The Safe Mirror Backend provides a RESTful API for media analysis, reporting, and evidence management.

**Base URL**: `http://localhost:4000/api/v1`

## Endpoints

### 1. Analyze Media
Upload an image for deepfake detection.

- **URL**: `/analyze`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Body**:
    - `file`: The image file (jpg, png).
- **Response**: `200 OK`
    ```json
    {
      "id": "abc12345",
      "deepfake_score": 0.85,
      "nudity_score": 0.10,
      "report_url": "/api/v1/analyze/report/abc12345",
      "regions": [...]
    }
    ```

### 2. List Evidence
Retrieve all analyzed records stored in the secure locker.

- **URL**: `/analyze/list`
- **Method**: `GET`
- **Response**: `200 OK`
    ```json
    [
      {
        "id": "abc12345",
        "detection": { ... },
        "createdAt": "2025-12-12T10:00:00.000Z"
      },
      ...
    ]
    ```

### 3. Get Report
Download the PDF evidence report for a specific case.

- **URL**: `/analyze/report/:id`
- **Method**: `GET`
- **Response**: `application/pdf` (Binary Stream)

### 4. Erase Evidence
Permanently delete a record and its associated files.

- **URL**: `/analyze/erase/:id`
- **Method**: `POST`
- **Response**: `200 OK`
    ```json
    { "ok": true }
    ```

## Error Handling
- **400 Bad Request**: Missing file or invalid input.
- **404 Not Found**: Report ID does not exist.
- **500 Internal Server Error**: Processing failure.
