import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Plus, Heart } from 'lucide-react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice } from '../../utils/format';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Không kích hoạt chuyển trang của thẻ Link
    const defaultColor = product.colors[0] || 'Standard';
    addToCart(product, defaultColor, 1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Không kích hoạt chuyển trang của thẻ Link
    toggleWishlist(product);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} size={14} fill="currentColor" />);
      } else if (i === fullStars + 1 && halfStar) {
        stars.push(
          <div key={i} style={{ position: 'relative', display: 'inline-block' }}>
            <Star size={14} fill="none" />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', overflow: 'hidden' }}>
              <Star size={14} fill="currentColor" stroke="none" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} size={14} fill="none" />);
      }
    }
    return <div className="stars">{stars}</div>;
  };

  // Ánh xạ tên danh mục tiếng Việt
  const getCategoryVietnamese = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'laptops': return 'Laptop';
      case 'phones': return 'Điện thoại';
      case 'audio': return 'Âm thanh';
      case 'wearables': return 'Thiết bị đeo';
      case 'accessories': return 'Phụ kiện';
      default: return cat;
    }
  };

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`}>
        
        {/* Phần đầu: Ảnh & Nhãn & Nút Wishlist */}
        <div className="card-image-wrapper">
          <div className="card-badge-container">
            {product.tags.map((tag, idx) => (
              <span
                key={idx}
                className={`badge ${
                  tag.startsWith('-')
                    ? 'badge-danger'
                    : tag === 'Mới' || tag === 'New'
                    ? 'badge-primary'
                    : 'badge-accent'
                }`}
              >
                {tag === 'New' ? 'Mới' : tag === 'Best Seller' ? 'Bán chạy' : tag === 'Popular' ? 'Phổ biến' : tag}
              </span>
            ))}
          </div>

          {/* Nút Wishlist yêu thích ở góc */}
          <button 
            className={`card-btn-wishlist ${isWishlisted ? 'active' : ''}`}
            onClick={handleWishlistToggle}
            aria-label="Thêm vào yêu thích"
          >
            <Heart size={16} fill={isWishlisted ? 'var(--color-danger)' : 'none'} stroke={isWishlisted ? 'var(--color-danger)' : 'currentColor'} />
          </button>

          <img src={product.image} alt={product.name} className="card-image" loading="lazy" />
          <div className="quick-view-overlay">
            <span className="btn btn-secondary btn-sm">Xem chi tiết</span>
          </div>
        </div>

        {/* Nội dung thông tin sản phẩm */}
        <div className="card-content">
          <span className="card-category">{getCategoryVietnamese(product.category)}</span>
          <h3 className="card-title">{product.name}</h3>
          
          <div className="card-rating">
            {renderStars(product.rating)}
            <span className="reviews-count">({product.reviewsCount})</span>
          </div>
          
          <div className="card-footer">
            <div className="card-price-group">
              <span className="card-price">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="card-price-original">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            
            {product.inStock ? (
              <button
                className="card-btn-add"
                onClick={handleQuickAdd}
                aria-label="Thêm vào giỏ hàng"
              >
                <Plus size={20} />
              </button>
            ) : (
              <span className="out-of-stock-label">Hết hàng</span>
            )}
          </div>
        </div>

      </Link>
    </article>
  );
};
export default ProductCard;

