import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Category.module.scss';

interface CategoryType {
  id: string;
  name: string;
  images: string[]; // Her kategoriye ait görselleri içeren array
}

function Category({ selectedCategory }: { selectedCategory: string }) {
  const navigate = useNavigate();
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      try {
        const parsedCategories: CategoryType[] = JSON.parse(storedCategories);
        if (parsedCategories.length > 0) {
          setCategories(parsedCategories);
        } else {
          resetDefaultCategories();
        }
      } catch (error) {
        console.error("Kategori verisi bozulmuş!", error);
        resetDefaultCategories();
      }
    } else {
      resetDefaultCategories();
    }
  }, []);

  const resetDefaultCategories = () => {
    const defaultCategories: CategoryType[] = [
      { id: "1", name: "All", images: [] },
      { id: "2", name: "Beauty", images: [] },
      { id: "3", name: "Personal Work", images: [] },
      { id: "4", name: "Profile", images: [] },
      { id: "5", name: "Snap", images: [] },
      { id: "6", name: "Log", images: [] },
    ];
    setCategories(defaultCategories);
    localStorage.setItem("categories", JSON.stringify(defaultCategories));
  };

  const toggleCategory = () => {
    setCategoryOpen((prevCategoryOpen) => !prevCategoryOpen);
  };

  const closeCategory = (category: string) => {
    setCategoryOpen(false);
    navigate(`/list?category=${category}`);
  };

  return (
    <>
      <p className={styles.categoryButton} onClick={toggleCategory}>
        {selectedCategory === 'All' ? 'Category' : selectedCategory}
      </p>

      <div className={`${styles.categoryContainer} ${categoryOpen ? styles.open : ''}`}>
        <p className={styles.closeButton} onClick={toggleCategory}>&#10005;</p>
        {categories.map((category) => (
          <p
            key={category.id}
            className={`${selectedCategory === category.name ? styles.active : ''}`}
            onClick={() => closeCategory(category.name)}
          >
            {category.name} {/* ✅ Nesneyi değil, string'i yazdırıyoruz. */}
          </p>
        ))}
      </div>

      <div className={styles.nav}>
        {categories.map((category) => (
          <p
            key={category.id}
            className={`${selectedCategory === category.name ? styles.active : ''}`}
            onClick={() => navigate(`/list?category=${category.name}`)}
          >
            {category.name} {/* ✅ Burada da düzelttik. */}
          </p>
        ))}
      </div>
    </>
  );
}

export default Category;
