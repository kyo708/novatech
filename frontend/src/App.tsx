import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CartDrawer from './components/CartDrawer/CartDrawer';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Checkout from './pages/Checkout/Checkout';
import Wishlist from './pages/Wishlist/Wishlist';
import Login from './pages/Login/Login';
import Inventory from './pages/Admin/Inventory';
import NotFound from './pages/NotFound/NotFound';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

export const App: React.FC = () => {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
            
            {/* Nút cuộn lên đầu trang */}
            <ScrollToTop />

            {/* Thanh điều hướng toàn cục */}
            <Header />

            {/* Giỏ hàng dạng trượt bên hông */}
            <CartDrawer />

            {/* Các trang định tuyến động */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>

            {/* Chân trang toàn cục */}
            <Footer />

          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </ToastProvider>
  </Router>
  );
};
export default App;

