# OSCE Scheduler – Take-Home Assignment

## Problem Statement

This project implements a scheduling tool for OSCE (Objective Structured Clinical Examination) scenarios.
The system accepts uploaded `.xlsx` and `.json` files and produces a structured JSON schedule mapping each examinee to:
- a track,
- its stations,
- assigned examiner, and
- standardized client.

---

##  My Approach

- Built the backend using **Node.js + Express**
- Handled file uploads in memory using **Multer**
- Parsed `.xlsx` and `.json` files using the `xlsx` library
- Applied **round-robin logic** to fairly assign examiners and clients
- Ensured that all examinees get a complete schedule with no missing assignments
- Extracted and returned `adminId`, `trackId`, `station`, `examiner`, and `client` per examinee

---

## ⚙️ How to Run Locally

### 1. Clone and Install

```bash
git clone https://github.com/saivivek1102/osce-scheduler.git
cd osce-scheduler/mock_app
npm install
```

### 2. Start Backend Server (Port 3000)

```bash
npm start
```

### 3. Start Frontend (Port 5500 or 5501)

**Option A: Using Live Server (VS Code)**  
Right-click `index.html` → Open with Live Server  
Opens at:  
```
http://127.0.0.1:5500/mock_app/index.html
```

**Option B: Using Python HTTP Server**

```bash
cd osce-scheduler/mock_app
python3 -m http.server 5500
```

Then open:  
```
http://localhost:5500/index.html
```

*Why use this?*  
This option is helpful when Live Server isn't available. It serves static files reliably in any environment.

---

## Upload Workflow

Use the UI to upload these 4 files from the `/sample_files/` folder:

- `admin_template.json`
- `examinees.xlsx`
- `examiners.xlsx`
- `standardized_clients.xlsx`

Then click the **"Generate Schedule"** button to generate a result.

---

## Sample Output (Partial)

<details>
<summary>Click to expand sample output</summary>

```json
{
  "Examinee_1": {
    "adminId": "admin_1",
    "trackId": "track_1",
    "schedule": [
      {
        "station": "station_1",
        "examiner": "Deborah Holland",
        "client": "Cody Walker"
      },
      {
        "station": "station_2",
        "examiner": "Marissa Reed",
        "client": "Marcus Castillo"
      },
      {
        "station": "station_3",
        "examiner": "Cindy Landry",
        "client": "Linda Luna"
      }
    ]
  },
  "Examinee_2": {
    "adminId": "admin_2",
    "trackId": "track_2",
    "schedule": [
      {
        "station": "station_1",
        "examiner": "Alan Brown",
        "client": "Anthony Kim"
      },
      {
        "station": "station_2",
        "examiner": "Kelly Sanford",
        "client": "Joel Mitchell"
      },
      {
        "station": "station_3",
        "examiner": "Michael Copeland",
        "client": "Michael Waters"
      }
    ]
  }
}
```

</details>

---

## Why I Used Full Backend URLs

Since the frontend runs on port `5500` and the backend on port `3000`, I used:

```js
$http.post("http://localhost:3000/upload", ...)
```

This guarantees reliable cross-port communication in a local development setup.

---

## Why I Chose `.xlsx` over `.csv`

Chosen `.xlsx` files because:

- They support multiple sheets (required for `admin_template`)
- They handle rich data types and structures cleanly
- They avoid issues like comma collisions or encoding problems common with `.csv`

---

## Result

A polished, professional OSCE scheduling tool with valid logic, complete output, and clean API integration.