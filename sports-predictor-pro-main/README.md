# Sports Predictor Pro

A powerful AI-powered application that classifies sports images into 100 different categories using Deep Learning (MobileNetV2).

## 🚀 Quick Start (Recommended)

We have created a simple **One-Click Installer & Launcher** for Windows users.

1.  **Download** or **Clone** this repository.
2.  Double-click the **`start_app.bat`** file in the main folder.
3.  That's it! 
    *   It will automatically install all necessary Python and Node.js libraries.
    *   It will start both the Backend (Flask) and Frontend (React) servers.
    *   **It will automatically open your default browser** to the application.

---

## 🛠 Manual Setup

If you prefer to run things manually or are on Mac/Linux:

### Prerequisites
*   **Python 3.8+**
*   **Node.js & npm**

### 1. Install Dependencies

**Backend (Python):**
```bash
pip install -r requirements.txt
```

**Frontend (Node.js):**
```bash
npm install
```

### 2. Run the Application

You can run both servers with a single command:
```bash
npm run dev:all
```

Or run them separately in two terminals:

**Terminal 1 (Backend):**
```bash
python app.py
```

**Terminal 2 (Frontend):**
```bash
npm run dev
```

## 🏗 Technologies Used
- **Frontend**: React, Vite, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Flask (Python)
- **AI Model**: TensorFlow/Keras (MobileNetV2)
