import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Start from './pages/Start/Start';
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Categories from './pages/Categories/Categories';
import Search from './pages/Search/Search';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminProductsNew from './pages/Admin/AdminProductsNew';
import AdminCategories from './pages/Admin/AdminCategories';
import AdminCategoriesNew from './pages/Admin/AdminCategoriesNew';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path="/products/:name" element={<ProductDetail />} />
        <Route path="/categories/:category" element={<Categories />} />
        <Route path="/search" element={<Search />} />

        {/* Admin */}
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/products/new" element={<AdminProductsNew />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/categories/new" element={<AdminCategoriesNew />} />
      </Routes>
    </Router>
  );
}

export default App;
