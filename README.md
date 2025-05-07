# OSCE Scheduler – Take-Home Assignment

## Problem Statement

This project implements a scheduling tool for OSCE (Objective Structured Clinical Examination) scenarios.
The system accepts uploaded `.xlsx` and `.json` files and produces a structured JSON schedule mapping each examinee to:
- a track,
- its stations,
- assigned examiner, and
- standardized client.

---

## 🧠 Approach & Highlights

- Built with **Node.js + Express** as the backend API
- Used **Multer** to handle file uploads in memory
- Parsed `.xlsx` and `.json` files with the `xlsx` library
- Applied **round-robin distribution** to fairly assign examiners and clients
- Preserved and exposed all required metadata (`adminId`, `trackId`, etc.)
- Output is clean, consistent, and fully populated (no "TBD")

---

## ⚙️ How to Run Locally

### 3.1 Clone and Install

```bash
git clone https://github.com/saivivek1102/osce-scheduler.git
cd osce-scheduler/mock_app
npm install
```

### 3.2 Start Backend Server (Port 3000)

```bash
npm start
```

### 3.3 Start Frontend (Port 5500 or 5501)

**Option A: VS Code Live Server**

Right-click `index.html` → Open with Live Server  
The frontend will open at:  
```
http://127.0.0.1:5500/mock_app/index.html
```

**Option B: Python HTTP Server**

You can also serve the frontend manually:

```bash
cd osce-scheduler/mock_app
python3 -m http.server 5500
```

Then open:  
```
http://localhost:5500/index.html
```

📌 *Why use this?*  
This option is useful if Live Server is not available or you're using a lightweight editor. It serves static files without needing VS Code extensions.

---

## 📤 Upload Workflow

Upload these files from the `/sample_files/` folder in the browser interface:

- `admin_template.json`
- `examinees.xlsx`
- `examiners.xlsx`
- `standardized_clients.xlsx`

Then click the **"Generate Schedule"** button.

---

## 📊 Output Format

Each examinee is assigned:

- `adminId` (from the uploaded JSON)
- `trackId`
- A schedule of stations with assigned:
  - `examiner`
  - `client`

✅ All fields are assigned using round-robin logic — no `TBD` placeholders.

---

## 🧠 Why Explicit Backend URL

We used:

```js
$http.post("http://localhost:3000/upload", ...)
```

Because the frontend runs on port **5500** and the backend runs on **3000**, the full URL ensures correct routing — especially during local development.

---

## 📄 Why We Chose `.xlsx` over `.csv`

`.xlsx` provides:

- Support for multiple sheets (needed for `admin_template` structure)
- Cleaner formatting and data types
- Reduced risk of parsing errors (unlike `.csv` with mismatched delimiters or missing headers)

---

## ✅ Final Result

A clean, professional, and scalable scheduler with well-distributed assignments — ready to review and deploy.