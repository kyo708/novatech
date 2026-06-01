import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Search, Sun, Moon, ShoppingBag, Heart, User, LogOut, Lock } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { getProducts } from '../../services/api';
import { PRODUCTS as STATIC_PRODUCTS } from '../../products';
import { formatPrice } from '../../utils/format';
import type { Product } from '../../types';
import './Header.css';

export const Header: React.FC = () => {
  const { cart, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout, isAdmin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [searchText, setSearchText] = useState(searchParams.get('search') || '');
  const [bounce, setBounce] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Sync scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Bounce badge on cart item additions
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  useEffect(() => {
    if (totalItems === 0) return;
    setBounce(true);
    const timer = setTimeout(() => setBounce(false), 350);
    return () => clearTimeout(timer);
  }, [totalItems]);

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLFormElement>(null);

  // Tải danh sách sản phẩm mẫu để gợi ý tìm kiếm khi click/gõ ô tìm kiếm
  const loadProductsForSuggestions = async () => {
    if (allProducts.length > 0) return;
    try {
      const data = await getProducts();
      setAllProducts(data);
    } catch (err) {
      console.warn('Không thể tải dữ liệu sản phẩm cho gợi ý từ backend, sử dụng dữ liệu tĩnh:', err);
      // Dự phòng sang dữ liệu tĩnh nếu API backend ngoại tuyến
      setAllProducts(STATIC_PRODUCTS);
    }
  };

  // Tự động lọc các sản phẩm gợi ý khớp từ khóa mỗi khi searchText hoặc allProducts thay đổi
  useEffect(() => {
    const query = searchText.toLowerCase().trim();
    if (!query) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const matched = allProducts.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query)
    );
    setSuggestions(matched.slice(0, 5));
    setShowSuggestions(matched.length > 0);
  }, [searchText, allProducts]);

  // Ẩn các dropdown (gợi ý tìm kiếm, menu người dùng) khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (searchText.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchText.trim())}`);
    } else {
      navigate('/shop');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchText(val);
    
    // Kích hoạt nạp dữ liệu (nếu chưa được nạp)
    loadProductsForSuggestions();
  };

  // Xử lý khi click chọn một sản phẩm gợi ý
  const handleSuggestionClick = (productId: string) => {
    setShowSuggestions(false);
    setSearchText('');
    navigate(`/product/${productId}`);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <nav className={`header-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-wrapper">
        
        {/* Brand Logo & Navigation Group */}
        <div className="logo-nav-group">
          <Link to="/" className="logo">
            <div className="logo-icon">N</div>
            <span>Nova<span className="text-gradient">Tech</span></span>
          </Link>
          <div className="nav-links">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Trang chủ
            </Link>
            <Link to="/shop" className={`nav-link ${location.pathname === '/shop' ? 'active' : ''}`}>
              Cửa hàng
            </Link>
            {isAdmin && (
              <Link to="/admin/inventory" className={`nav-link ${location.pathname.startsWith('/admin') ? 'active' : ''} admin-link-nav`}>
                Quản lý kho
              </Link>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="search-bar-container" ref={searchContainerRef}>
          <div className="search-input-wrapper">
            <Search size={18} />
            <input
              type="text"
              className="search-bar"
              placeholder="Tìm kiếm sản phẩm công nghệ cao cấp..."
              value={searchText}
              onChange={handleSearchChange}
              onFocus={loadProductsForSuggestions}
              aria-label="Tìm kiếm sản phẩm"
            />
          </div>

          {/* Bảng Dropdown gợi ý tìm kiếm */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="search-suggestions-dropdown">
              {suggestions.map((p) => (
                <div 
                  key={p.id} 
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(p.id)}
                >
                  <img src={p.image} alt={p.name} className="suggestion-img" />
                  <div className="suggestion-info">
                    <span className="suggestion-name">{p.name}</span>
                    <span className="suggestion-cat">
                      {p.category === 'Laptops' ? 'Laptop' : 
                       p.category === 'Phones' ? 'Điện thoại' : 
                       p.category === 'Audio' ? 'Âm thanh' : 
                       p.category === 'Wearables' ? 'Thiết bị đeo' : 
                       p.category === 'Accessories' ? 'Phụ kiện' : p.category}
                    </span>
                  </div>
                  <span className="suggestion-price">{formatPrice(p.price)}</span>
                </div>
              ))}
            </div>
          )}
        </form>

        {/* Actions Group */}
        <div className="header-actions">
          {/* Day / Night Toggle */}
          <button className="btn-icon" onClick={toggleTheme} aria-label="Thay đổi chủ đề">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Wishlist Link */}
          <Link to="/wishlist" className="btn-icon" aria-label="Sản phẩm yêu thích" style={{ position: 'relative' }}>
            <Heart size={20} className={wishlist.length > 0 ? 'heart-filled' : ''} fill={wishlist.length > 0 ? 'var(--color-danger)' : 'none'} stroke={wishlist.length > 0 ? 'var(--color-danger)' : 'currentColor'} />
            {wishlist.length > 0 && (
              <span className="cart-count" style={{ backgroundColor: 'var(--color-danger)' }}>{wishlist.length}</span>
            )}
          </Link>

          {/* Cart Icon Trigger */}
          <button
            className={`btn-icon ${bounce ? 'bounce-animation' : ''}`}
            onClick={() => setIsCartOpen(true)}
            aria-label="Mở giỏ hàng"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="cart-count">{totalItems}</span>
            )}
          </button>

          {/* User Profile / Login Link */}
          {isAuthenticated && user ? (
            <div className="header-user-menu-container" ref={userMenuRef}>
              <button 
                className="btn-user-avatar"
                onClick={() => setShowUserMenu(!showUserMenu)}
                aria-label="Menu tài khoản"
              >
                <div className="avatar-circle">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              </button>

              {showUserMenu && (
                <div className="user-dropdown-menu">
                  <div className="user-dropdown-info">
                    <span className="user-dropdown-name">{user.username}</span>
                    <span className="user-dropdown-email">{user.email || 'Admin Account'}</span>
                    <span className="user-dropdown-badge">
                      {user.role === 'ROLE_ADMIN' ? 'Quản trị viên' : 'Khách hàng'}
                    </span>
                  </div>
                  <div className="user-dropdown-divider"></div>
                  {isAdmin && (
                    <Link 
                      to="/admin/inventory" 
                      className="user-dropdown-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Lock size={16} />
                      <span>Quản lý kho</span>
                    </Link>
                  )}
                  <button 
                    className="user-dropdown-item btn-logout"
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                  >
                    <LogOut size={16} />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn-icon" aria-label="Đăng nhập">
              <User size={20} />
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
};
export default Header;
