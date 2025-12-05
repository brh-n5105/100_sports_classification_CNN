from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import numpy as np
import cv2
import os
import base64
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
prediction_history = []

# -------------------------------------------------------
# LOAD MODEL
# -------------------------------------------------------
MODEL_PATH = "sports_mobilenet_phase1.h5"
model = None

if os.path.exists(MODEL_PATH):
    try:
        model = load_model(MODEL_PATH, compile=False)
        print("Model loaded successfully!")
    except Exception as e:
        print(f"Error loading model: {e}")
else:
    print(f"WARNING: Model file '{MODEL_PATH}' not found. Running in simulation mode.")

# -------------------------------------------------------
# CLASS LABELS
# -------------------------------------------------------
class_labels = [
    'air hockey','ampute football','archery','arm wrestling','axe throwing',
    'balance beam','barell racing','baseball','basketball','baton twirling',
    'bike polo','billiards','bmx','bobsled','bowling','boxing','bull riding',
    'bungee jumping','canoe slamon','cheerleading','chuckwagon racing','cricket',
    'croquet','curling','disc golf','fencing','field hockey','figure skating men',
    'figure skating pairs','figure skating women','fly fishing','football',
    'formula 1 racing','frisbee','gaga','giant slalom','golf','hammer throw',
    'hang gliding','harness racing','high jump','hockey','horse jumping',
    'horse racing','horseshoe pitching','hurdles','hydroplane racing','ice climbing',
    'ice yachting','jai alai','javelin','jousting','judo','lacrosse','log rolling',
    'luge','motorcycle racing','mushing','nascar racing','olympic wrestling',
    'parallel bar','pole climbing','pole dancing','pole vault','polo','pommel horse',
    'rings','rock climbing','roller derby','rollerblade racing','rowing','rugby',
    'sailboat racing','shot put','shuffleboard','sidecar racing','ski jumping',
    'sky surfing','skydiving','snow boarding','snowmobile racing','speed skating',
    'steer wrestling','sumo wrestling','surfing','swimming','table tennis','tennis',
    'track bicycle','trapeze','tug of war','ultimate','uneven bars','volleyball',
    'water cycling','water polo','weightlifting','wheelchair basketball',
    'wheelchair racing','wingsuit flying'
]

# -------------------------------------------------------
# SPORTS DESCRIPTIONS
# -------------------------------------------------------
sports_info = { label: f"A fascinating sport: {label}" for label in class_labels }

# -------------------------------------------------------
# PREPROCESSING
# -------------------------------------------------------
def preprocess_image(image_bytes):
    img = cv2.imdecode(np.frombuffer(image_bytes, np.uint8), cv2.IMREAD_COLOR)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, (224, 224))
    img = img.astype(np.float32)

    from tensorflow.keras.applications.mobilenet import preprocess_input
    img = preprocess_input(img)
    img = np.expand_dims(img, axis=0)
    return img

# -------------------------------------------------------
# PREDICT FUNCTION
# -------------------------------------------------------
def predict_image(image_bytes):
    if model is None:
        # Dummy prediction for testing without model
        import random
        top_3_idx = random.sample(range(len(class_labels)), 3)
        preds = [0] * len(class_labels)
        for i, idx in enumerate(top_3_idx):
            preds[idx] = [0.85, 0.10, 0.05][i]
        
        # Mocking the structure expected below
        class MockPreds:
            pass
        # Actually we just need the list logic below to work
        # Let's just build top_preds directly
        top_preds = []
        for i, idx in enumerate(top_3_idx):
            top_preds.append({
                "label": class_labels[idx],
                "prob": [0.85, 0.10, 0.05][i]
            })
        return top_preds

    img_array = preprocess_image(image_bytes)
    preds = model.predict(img_array)
    
    top_3_idx = np.argsort(preds[0])[-3:][::-1]

    top_preds = []
    for idx in top_3_idx:
        top_preds.append({
            "label": class_labels[idx],
            "prob": float(preds[0][idx])
        })
    
    return top_preds

# -------------------------------------------------------
# API ROUTE (FOR REACT)
# -------------------------------------------------------
@app.route("/", methods=["GET"])
def home():
    return "Sports Predictor API is running! Use the frontend to upload images."

@app.route("/api/predict", methods=["GET", "POST"])
def api_predict():
    if request.method == "GET":
        return jsonify({"status": "API is running. Send a POST request with an image to predict."})

    try:
        file = request.files.get("file")
        if file is None:
            return jsonify({"error": "No file uploaded"}), 400
        
        img_bytes = file.read()
        top_preds = predict_image(img_bytes)

        main_pred = top_preds[0]
        predicted = main_pred["label"]
        confidence = main_pred["prob"]

        description = sports_info.get(predicted, "A fascinating sport requiring skill and dedication.")

        # Convert uploaded image to base64
        img_np = cv2.imdecode(np.frombuffer(img_bytes, np.uint8), cv2.IMREAD_COLOR)
        _, buffer = cv2.imencode(".jpg", img_np)
        img_b64 = base64.b64encode(buffer).decode()

        # Add to history
        record = {
            "class": predicted,
            "confidence": f"{confidence*100:.2f}%",
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "image": img_b64
        }
        prediction_history.append(record)
        prediction_history[:] = prediction_history[-10:]  # keep last 10

        return jsonify({
            "predicted": predicted,
            "confidence": confidence,
            "top_preds": top_preds,
            "description": description,
            "image": img_b64,
            "history": list(reversed(prediction_history))
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# -------------------------------------------------------
# START SERVER
# -------------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)
