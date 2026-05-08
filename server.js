const express = require('express');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure uploads directory exists
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Multer: disk storage, keep original extension
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOADS_DIR),
    filename:    (req, file, cb) => {
        const ext  = path.extname(file.originalname).toLowerCase() || '.jpg';
        const name = 'prod_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8) + ext;
        cb(null, name);
    }
});
const upload = multer({
    storage,
    limits: { fileSize: 8 * 1024 * 1024 }, // 8 MB max
    fileFilter: (req, file, cb) => {
        const allowed = /jpeg|jpg|png|gif|webp/;
        const ok = allowed.test(file.mimetype) && allowed.test(path.extname(file.originalname).toLowerCase());
        ok ? cb(null, true) : cb(new Error('Type de fichier non supporté'));
    }
});

app.use(cookieParser());
app.use(express.static(__dirname));

// Image upload endpoint
app.post('/api/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'Aucun fichier reçu' });
    const url = '/uploads/' + req.file.filename;
    res.json({ url });
});

app.get('/', (req, res) => {
    const session = req.cookies.slj_session;
    if (session) {
        res.sendFile(path.join(__dirname, 'index.html'));
    } else {
        res.redirect('/vitrine.html');
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Serveur SLJ Otaku Paradise lancé sur http://0.0.0.0:${PORT}`);
});
