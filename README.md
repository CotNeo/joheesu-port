
** Orginal Deploy **
url: https://hsphotography.site/
# 📸 Admin Panel - Kategori & Görsel Yönetimi

## 📌 Proje Tanımı (TR)
Bu proje, **kategori ve görsel yönetimini** sağlayan bir **React & Node.js** tabanlı admin panelidir. Kullanıcılar, **kategori ekleyebilir, silebilir** ve belirli kategorilere ait **görselleri görüntüleyebilir, ekleyebilir ve silebilir**.

---

## 🌍 Project Description (EN)
This project is a **React & Node.js** based admin panel that allows **category and image management**. Users can **add, delete categories**, and **view, add, and delete images** within specific categories.

---

## 🚀 Teknolojiler / Technologies

- **Frontend:** React, TypeScript, SCSS
- **Backend:** Node.js, Express.js
- **Database:** Local Storage (Geçici veri) veya API üzerinden
- **API:** RESTful API (Görsel ve kategori yönetimi için)

---

## 📂 Klasör Yapısı / Folder Structure

```
public/
  ├── imgs/
  │   ├── Beauty/
  │   ├── Personal Work/
  │   ├── Profile/
  │   ├── Snap/
  ├── index.html

server/
  ├── server.js
  ├── package.json
  ├── package-lock.json

src/
  ├── component/
  ├── pages/
  │   ├── AdminPanel/
  │   │   ├── AdminPage.tsx
  │   │   ├── AdminPage.module.scss
  ├── App.tsx
  ├── index.tsx
```

---

## 🔧 Kurulum & Çalıştırma / Installation & Run

### **1️⃣ Projeyi Klonlayın / Clone the Project**
```sh
git clone https://github.com/CotNeo/adminPage.git
cd proje-adi
```

### **2️⃣ Bağımlılıkları Yükleyin / Install Dependencies**
```sh
npm install
```

### **3️⃣ Sunucuyu Başlatın / Start the Server**
```sh
cd server
node server.js
```

### **4️⃣ React Uygulamasını Başlatın / Start the React App**
```sh
npm start
```

---

## 🛠 Kullanım / Usage

1️⃣ **Kategori Ekle:** Yeni kategori adını girin ve **Ekle** butonuna basın.
2️⃣ **Kategori Seç:** Listeyi kullanarak bir kategoriye tıklayın.
3️⃣ **Görsel Ekle:** URL girerek **Ekle** butonuna basın.
4️⃣ **Silme:** Kategori veya görseli silmek için **Sil** butonuna basın.

---

## 🛠 API Bitiş Noktaları / API Endpoints

### **Kategori API**
- **GET** `/api/categories` → Tüm kategorileri getirir.
- **POST** `/api/categories` → Yeni kategori ekler.
- **DELETE** `/api/categories/:name` → Belirtilen kategoriyi siler.

### **Görsel API**
- **GET** `/api/images/:category` → Belirtilen kategoriye ait görselleri getirir.
- **POST** `/api/images/:category` → Belirtilen kategoriye görsel ekler.
- **DELETE** `/api/images/:category` → Belirtilen kategorideki görseli siler.

---

## 👥 Katkıda Bulunanlar / Contributors
- **[CotNeo](https://github.com/CotNeo)** - Geliştirici

---

## 📜 Lisans / License
Bu proje **MIT Lisansı** ile lisanslanmıştır.

---

**🚀 Desteklemek için projeyi beğendiyseniz ⭐ yıldız bırakmayı unutmayın!**

