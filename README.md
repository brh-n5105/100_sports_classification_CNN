🏆 100 Sports Image Classification using CNN (MobileNet) — End-to-End AI Project

An end-to-end deep learning project that classifies 100 different sports from images using a fine-tuned MobileNet CNN model.
This repository includes model training, preprocessing, API backend, and a user interface — making it a full production-style ML pipeline.

📌 Project Overview

This AI system can identify 100 different sports from an uploaded image by using a MobileNet-based convolutional neural network (CNN).
The project is trained on the 100 Sports Classification Dataset (Kaggle) and deployed using Flask as a backend API.

This repository demonstrates:

Computer Vision

Transfer Learning

End-to-end ML deployment

Clean frontend integration

Real-time image inference

🚀 Features

✔️ Classifies 100 unique sports
✔️ Lightweight & accurate model (MobileNet)
✔️ Trained with Transfer Learning + Fine-tuning
✔️ Real-time prediction via Flask API
✔️ Clean JSON responses for frontend
✔️ Supports image upload UI
✔️ Easy to run locally

🧠 Model Architecture

Base Model: MobileNet / MobileNetV2

Pretrained on ImageNet

Custom dense layers for 100 classes

Softmax output layer

Data augmentation (flip, rotate, brightness, zoom)

Adam optimizer + categorical cross-entropy

📊 Dataset

100 Sports Classification Dataset — Kaggle
Each sport has its own folder containing relevant images.

Due to copyright, dataset is not included in the repo.
Dataset link: https://www.kaggle.com/datasets/gpiosenka/100-sports-image-classification

📂 Project Structure
project/
│── app.py                     # Flask API backend
│── requirements.txt
│── sports_mobilenet.h5        # Trained model (or drive link if large)
│── templates/                 # HTML frontend
│── static/                    # CSS/JS/images
│── notebook/                  # Jupyter training notebook
│── src/                       # If using React or JS frontend
│── README.md


Upload an image → model returns predicted sport + probability.

🛠️ Technologies Used
Machine Learning

Python

TensorFlow / Keras

MobileNet / MobileNetV2

NumPy, Pandas

OpenCV

Scikit-Learn

Backend

Flask

JSON API

Frontend

HTML / CSS / JavaScript

Or React (if using Vite frontend)

📈 Training Process

Load & preprocess images

Apply augmentations

Build MobileNet-based classifier

Fine-tune on 100 classes

Save .h5 model

Deploy using Flask

🌟 Future Improvements

🔹 Add Grad-CAM heatmaps
🔹 Support video classification
🔹 Deploy on Streamlit Cloud
🔹 Add top-5 prediction UI
🔹 Convert model to TensorFlow Lite for mobile apps

🤝 Contributions

Contributions are welcome!
Feel free to open issues or submit pull requests.

🏷️ Hashtags (for discoverability)

#MachineLearning #DeepLearning #ComputerVision #AI #SportsAI #MobileNet #Python #Kaggle #CNN #EndToEndProject #GitHubProjects #ugave
