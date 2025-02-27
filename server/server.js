const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 🔥 API: Belirtilen kategorideki görselleri getir
app.get("/api/images/:category", (req, res) => {
    const category = req.params.category;
    const imagesDir = path.join(__dirname, "../public/imgs", category);

    // 📌 Kategori dizini var mı kontrol et
    if (!fs.existsSync(imagesDir)) {
        return res.status(404).json({ error: "Kategori bulunamadı!" });
    }

    // 📌 Klasördeki tüm görselleri oku
    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: "Dosyalar okunamadı!" });
        }

        // 🔥 Tüm resim dosyalarının URL'lerini oluştur
        const imageUrls = files.map(file => `/imgs/${category}/${file}`);
        res.json(imageUrls);
    });
});

// 📌 Public klasörünü statik olarak kullan
app.use("/imgs", express.static(path.join(__dirname, "../public/imgs")));

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
