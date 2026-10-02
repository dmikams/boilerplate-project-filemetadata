require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

// Configure Multer memory storage (no need to save files to disk)
const upload = multer({ storage: multer.memoryStorage() });

// Middleware setup
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));

// Serve HTML homepage
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// POST endpoint: Handle single file upload matching field name "upfile"
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.json({ error: 'Please upload a file' });
  }

  // Return required JSON structure with file metadata
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// Start listening
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});