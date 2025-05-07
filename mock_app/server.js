// server.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

const xlsx = require('xlsx');

global.uploadedData = {}; // Global object to store parsed files

app.post('/upload', upload.array('files'), (req, res) => {
  try {
    req.files.forEach(file => {
      const name = file.originalname.toLowerCase();
      let data;

      if (name.endsWith('.json')) {
        data = JSON.parse(file.buffer.toString('utf-8'));
      } else {
        const workbook = xlsx.read(file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      }

      const fileKey = name.replace(/\.(xlsx|csv|json)$/, '');
      global.uploadedData[fileKey] = data;
    });

    res.json({ status: "Files parsed and stored", files: Object.keys(global.uploadedData) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to parse uploaded files' });
  }
});

app.post('/generate-schedule', (req, res) => {
  try {
    const {
      examinees = [],
      examiners = [],
      standardized_clients = [],
      admin_template: templates = []
    } = global.uploadedData;

    if (!Array.isArray(templates) || templates.length === 0) {
      return res.status(400).json({ error: "admin_template is empty or invalid" });
    }

    const schedule = {};

    examinees.forEach((examinee, idx) => {
      const currentAdmin = templates[idx % templates.length];
      const track = currentAdmin.tracks[idx % currentAdmin.tracks.length];
      const stations = Array.isArray(track.stations) ? track.stations : [];

      schedule[examinee.name || examinee.id || `Examinee_${idx + 1}`] = {
        adminId: currentAdmin.adminId,
        trackId: track.trackId || `track_${idx + 1}`,
        schedule: stations.map((station, i) => {
          const examiner = examiners[(idx * stations.length + i) % examiners.length]?.Name || "TBD";
          const client = standardized_clients[(idx * stations.length + i) % standardized_clients.length]?.Name || "TBD";
          return { station, examiner, client };
        })
      };
    });

    res.json(schedule);
  } catch (err) {
    console.error("Schedule generation failed:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
