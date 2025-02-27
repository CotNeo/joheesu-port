import React, { useEffect, useState } from "react";
import styles from "./AdminPage.module.scss";

interface ImageData {
    id: string;
    url: string;
}

function AdminPage() {
    const [categories, setCategories] = useState<string[]>([]);
    const [newCategory, setNewCategory] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [images, setImages] = useState<ImageData[]>([]);
    const [newImage, setNewImage] = useState<string>("");

    // 📌 Kategorileri API veya localStorage'dan yükleme
    useEffect(() => {
        const storedCategories = localStorage.getItem("categories");
        if (storedCategories) {
            setCategories(JSON.parse(storedCategories));
        } else {
            const defaultCategories = ["Beauty", "Personal Work", "Profile", "Snap"];
            setCategories(defaultCategories);
            localStorage.setItem("categories", JSON.stringify(defaultCategories));
        }
    }, []);

    // 📌 Seçili kategoriye ait görselleri API'den çekme
    useEffect(() => {
        if (selectedCategory) {
            fetch(`http://localhost:5000/api/images/${selectedCategory}`)
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setImages(data.map(img => ({ id: img.id, url: img.url }))); // 🔥 ID ve URL
                    } else {
                        console.error("Beklenmeyen veri formatı:", data);
                    }
                })
                .catch(error => console.error("Görseller yüklenirken hata oluştu:", error));
        }
    }, [selectedCategory]);

    // 📌 Yeni kategori ekleme
    const addCategory = () => {
        if (newCategory.trim() === "" || categories.includes(newCategory)) return;
        const updatedCategories = [...categories, newCategory];
        setCategories(updatedCategories);
        setNewCategory("");

        localStorage.setItem("categories", JSON.stringify(updatedCategories));
    };

    // 📌 Kategori silme
    const deleteCategory = (categoryToDelete: string) => {
        const updatedCategories = categories.filter(cat => cat !== categoryToDelete);
        setCategories(updatedCategories);

        if (selectedCategory === categoryToDelete) {
            setSelectedCategory(updatedCategories.length > 0 ? updatedCategories[0] : null);
        }

        localStorage.setItem("categories", JSON.stringify(updatedCategories));
    };

    // 📌 Görsel ekleme (Kategoriye yeni görsel ekleme)
    const addImage = () => {
        if (!selectedCategory || newImage.trim() === "") return;

        fetch(`http://localhost:5000/api/images/${selectedCategory}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageUrl: newImage })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setImages([...images, { id: data.imageId, url: newImage }]); // 🔥 ID ile ekle
                setNewImage("");
            }
        })
        .catch(error => console.error("Görsel eklenirken hata oluştu:", error));
    };

    // 📌 Görsel silme
    const deleteImage = (imageId: string) => {
        fetch(`http://localhost:5000/api/images/${selectedCategory}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: imageId }) // 🔥 Görsel ID gönder
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setImages(images.filter(img => img.id !== imageId));
            }
        })
        .catch(error => console.error("Görsel silinirken hata oluştu:", error));
    };

    return (
        <div className={styles.adminPanel}>
            <h2>Admin Panel - Kategori & Görsel Yönetimi</h2>

            {/* 📌 Yeni Kategori Ekleme */}
            <div className={styles.addCategory}>
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Yeni Kategori Adı"
                />
                <button onClick={addCategory}>Ekle</button>
            </div>

            {/* 📌 Kategori Listesi */}
            <ul className={styles.categoryList}>
                {categories.map((category, index) => (
                    <li key={index} className={styles.categoryItem}>
                        <button
                            onClick={() => setSelectedCategory(category)}
                            className={selectedCategory === category ? styles.active : ""}
                        >
                            {category}
                        </button>
                        <button onClick={() => deleteCategory(category)} className={styles.deleteButton}>
                            Sil
                        </button>
                    </li>
                ))}
            </ul>

            {/* 📌 Seçili Kategorinin Görselleri */}
            {selectedCategory && (
                <div className={styles.imageManager}>
                    <h3>{selectedCategory} Kategorisi - Görseller</h3>

                    {/* 📌 Görsel Ekleme */}
                    <div className={styles.addImage}>
                        <input
                            type="text"
                            value={newImage}
                            onChange={(e) => setNewImage(e.target.value)}
                            placeholder="Görsel URL Ekle"
                        />
                        <button onClick={addImage}>Ekle</button>
                    </div>

                    {/* 📌 Görsel Listesi */}
                    {images.length === 0 ? (
                        <p>Bu kategoride henüz görsel bulunmuyor.</p>
                    ) : (
                        <div className={styles.imageContainer}>
                            {images.map((image, index) => (
                                <div key={image.id || index} className={styles.imageItem}>
                                    <img src={image.url} alt="Kategori Görseli" className={styles.imagePreview} />
                                    <button onClick={() => deleteImage(image.id)} className={styles.deleteButton}>
                                        Sil
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default AdminPage;
