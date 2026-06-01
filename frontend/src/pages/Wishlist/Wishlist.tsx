import React from 'react';
import { Heart, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import './Wishlist.css';

export const Wishlist: React.FC = () => {
  const { wishlist, clearWishlist } = useWishlist();

  return (
    <div className="wishlist-page page-fade-in">
      {/* Hero Header */}
      <section className="wishlist-hero">
        <div className="wishlist-hero-bg">
          <div className="wishlist-hero-orb wishlist-hero-orb--1" />
          <div className="wishlist-hero-orb wishlist-hero-orb--2" />
          <div className="wishlist-hero-orb wishlist-hero-orb--3" />
        </div>
        <div className="container wishlist-hero-content">
          <div className="wishlist-hero-icon">
            <Heart size={32} fill="currentColor" />
          </div>
          <h1 className="wishlist-hero-title">Sản Phẩm Yêu Thích</h1>
          <p className="wishlist-hero-subtitle">
            {wishlist.length > 0
              ? `Bạn đang lưu trữ ${wishlist.length} sản phẩm công nghệ tuyệt vời`
              : 'Lưu các sản phẩm bạn yêu thích tại đây để xem lại bất cứ lúc nào'}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="wishlist-content container">
        {wishlist.length > 0 ? (
          <>
            {/* Toolbar */}
            <div className="wishlist-toolbar">
              <Link to="/" className="btn btn-secondary btn-sm wishlist-back-btn">
                <ArrowLeft size={16} />
                Quay lại Cửa hàng
              </Link>
              <button
                className="btn btn-sm wishlist-clear-btn"
                onClick={clearWishlist}
              >
                <Trash2 size={16} />
                Xóa tất cả sản phẩm
              </button>
            </div>

            {/* Product Grid */}
            <div className="wishlist-grid">
              {wishlist.map((product, index) => (
                <div
                  key={product.id}
                  className="wishlist-card-wrapper"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="wishlist-empty">
            <div className="wishlist-empty-icon-wrapper">
              <div className="wishlist-empty-pulse" />
              <Heart size={56} className="wishlist-empty-icon" />
            </div>
            <h2 className="wishlist-empty-title">Danh sách yêu thích đang trống</h2>
            <p className="wishlist-empty-description">
              Hãy dạo quanh cửa hàng công nghệ cao cấp của chúng tôi và nhấn nút hình trái tim trên sản phẩm để lưu lại tại đây nhé.
            </p>
            <Link to="/" className="btn btn-primary wishlist-empty-cta">
              <ShoppingBag size={18} />
              Khám phá ngay
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Wishlist;
