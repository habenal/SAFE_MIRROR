from flask import Flask, request, jsonify
from PIL import Image
import hashlib
import io
import random

app = Flask(__name__)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok"})

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        # Read image to ensure it's valid
        image_bytes = file.read()
        image = Image.open(io.BytesIO(image_bytes))
        
        # Mock Inference Logic:
        # Use simple hash to be deterministic but variable per image
        image_hash = hashlib.sha256(image_bytes).hexdigest()
        
        # Derive scores from hash
        # score between 0.00 and 1.00
        score_val = (int(image_hash[:6], 16) % 100) / 100.0
        
        # Mock logic: if high hex value -> high probability
        deepfake_score = score_val
        nudity_score = float("{:.2f}".format(1.0 - score_val))

        response = {
            "deepfake_score": deepfake_score,
            "nudity_score": nudity_score,
            "regions": [
                {
                    "x": 50, "y": 50, 
                    "w": 100, "h": 100, 
                    "reason": "Model detection region"
                }
            ]
        }
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)