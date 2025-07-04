import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setProduct(null);
      return;
    }
    const fetchProduct = async () => {
      try {
        console.log("ProductPage nhận id từ URL:", id);
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        console.log("ProductPage dữ liệu trả về:", response.data);
        setProduct(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading)
    return <p style={{ padding: 20, textAlign: "center" }}>Đang tải sản phẩm...</p>;

  if (!product || Object.keys(product).length === 0)
    return <p style={{ padding: 20, textAlign: "center" }}>Không tìm thấy sản phẩm</p>;

  return (
    <div
      key={id}
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
        borderRadius: 12,
        backgroundColor: "#fff",
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#007bff",
          fontWeight: "600",
          fontSize: 16,
        }}
      >
        &larr; Quay lại danh sách sản phẩm
      </Link>
      <div
        style={{
          display: "flex",
          marginTop: 30,
          gap: 30,
          alignItems: "flex-start",
        }}
      >
        <img
          src={product.image ?? "https://via.placeholder.com/320x320?text=No+Image"}
          alt={product.title ?? "No title"}
          style={{
            width: 320,
            height: 320,
            objectFit: "contain",
            borderRadius: 10,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        />
        <div style={{ flex: 1 }}>
          <h2 style={{ fontWeight: 700, marginBottom: 16 }}>
            {product.title ?? "Không có tiêu đề"}
          </h2>
          <p
            style={{
              fontWeight: "bold",
              fontSize: 28,
              color: "#007bff",
              marginBottom: 20,
            }}
          >
            ${typeof product.price === "number" ? product.price.toFixed(2) : "N/A"}
          </p>
          <p style={{ lineHeight: 1.6, marginBottom: 24 }}>
            {product.description?.trim().length ? product.description : "Không có mô tả"}
          </p>
          <p style={{ marginBottom: 8, fontStyle: "italic", color: "#555" }}>
            <strong>Category:</strong> {product.category ?? "N/A"}
          </p>
          <p style={{ fontStyle: "italic", color: "#555" }}>
            <strong>Rating:</strong> {product.rating?.rate ?? "N/A"} ({product.rating?.count ?? 0} reviews)
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
