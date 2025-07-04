import { useEffect, useState } from "react";
import "../styles/categoryMenu.css";

interface CategoryMenuProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

function CategoryMenu({ selectedCategory, onSelectCategory }: CategoryMenuProps) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.in/api/products/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
        else setCategories([]);
      })
      .catch(() => setCategories([]));
  }, []);

  return (
    <nav className="category-menu">
      <h3>Danh mục sản phẩm</h3>
      <ul>
        <li
          onClick={() => onSelectCategory(null)}
          className={selectedCategory === null ? "active" : ""}
        >
          Tất cả sản phẩm
        </li>
        {categories.length > 0 ? (
          categories.map((cat) => (
            <li
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={selectedCategory === cat ? "active" : ""}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </li>
          ))
        ) : (
          <li>Không có danh mục</li>
        )}
      </ul>
    </nav>
  );
}

export default CategoryMenu;
