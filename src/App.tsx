import React from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";

// Wrapper để dùng key=id bắt React remount lại ProductPage khi id thay đổi
function ProductPageWrapper() {
  const { id } = useParams();
  return <ProductPage key={id} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductPageWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
