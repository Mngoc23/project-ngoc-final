import { Routes, Route } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CategoryPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
    </Routes>
  );
};

export default AppRoutes;