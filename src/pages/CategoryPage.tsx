import { useEffect, useState } from "react";
import CategoryMenu from "../components/categoryMenu";
import axios from "../utils/axios";
import { Link } from "react-router-dom";

const PRODUCTS_PER_PAGE = 4;

function CategoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "";
        if (selectedCategory) {
          url = `/products/category?type=${encodeURIComponent(selectedCategory)}&page=${currentPage}&limit=${PRODUCTS_PER_PAGE}`;
        } else {
          url = `/products?page=${currentPage}&limit=${PRODUCTS_PER_PAGE}`;
        }
        const response = await axios.get(url);
        console.log("API products trả về:", response.data);
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          setProducts([]);
          console.warn("API products không trả về mảng");
        }
        setTotalProducts(20); // giả lập tổng sản phẩm do API chưa hỗ trợ phân trang thật
      } catch (error) {
        console.error("Lỗi khi fetch sản phẩm:", error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, [selectedCategory, currentPage]);

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <CategoryMenu
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentPage(1);
        }}
      />

      <main style={{ flex: 1, padding: 20, overflowY: "auto" }}>
        <h2 style={{ textTransform: "capitalize" }}>
          {selectedCategory || "Tất cả sản phẩm"}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
            marginTop: 20,
          }}
        >
          {products.length === 0 ? (
            <p>Không có sản phẩm để hiển thị</p>
          ) : (
            products.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  padding: 15,
                  textDecoration: "none",
                  color: "inherit",
                  boxShadow: "0 2px 8px rgb(0 0 0 / 0.1)",
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ width: "100%", height: 180, objectFit: "contain" }}
                />
                <h3 style={{ fontSize: 18, margin: "10px 0" }}>{product.title}</h3>
                <p style={{ fontWeight: "bold", color: "#007bff", marginBottom: 10 }}>
                  ${product.price.toFixed(2)}
                </p>
                <p style={{ fontSize: 14, color: "#555" }}>
                  {product.description.length > 100
                    ? product.description.slice(0, 100) + "..."
                    : product.description}
                </p>
              </Link>
            ))
          )}
        </div>

        <div
          style={{
            marginTop: 30,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 15,
          }}
        >
          <button
            onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
            disabled={currentPage === 1}
            style={{ padding: "8px 16px", cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
          >
            Trang trước
          </button>

          <span>
            Trang {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            style={{
              padding: "8px 16px",
              cursor: currentPage === totalPages || totalPages === 0 ? "not-allowed" : "pointer",
            }}
          >
            Trang sau
          </button>
        </div>
      </main>
    </div>
  );
}

export default CategoryPage;
