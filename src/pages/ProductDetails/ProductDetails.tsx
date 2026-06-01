import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Plus, Minus, ArrowLeft, CheckCircle, Shield, Truck, RotateCcw, RefreshCw } from 'lucide-react';
import { PRODUCTS as STATIC_PRODUCTS } from '../../products';
import { useCart } from '../../context/CartContext';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import RelatedProducts from '../../components/RelatedProducts/RelatedProducts';
import { getProductById } from '../../services/api';
import { formatPrice } from '../../utils/format';
import './ProductDetails.css';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, setIsCartOpen } = useCart();

  const [product, setProduct] = useState(() => STATIC_PRODUCTS.find((p) => p.id === id));
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product ? product.image : '');

  // Cuộn lên đầu trang khi tải trang hoặc đổi id sản phẩm
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Fetch thông tin chi tiết sản phẩm từ Spring Boot Backend API
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error('Lỗi kết nối backend Spring Boot khi lấy chi tiết sản phẩm:', err);
        const staticProd = STATIC_PRODUCTS.find((p) => p.id === id);
        setProduct(staticProd);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Thiết lập màu sắc mặc định, số lượng và hình ảnh lớn hiển thị chính khi sản phẩm thay đổi
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0] || 'Tiêu chuẩn');
      setQuantity(1);
      setActiveImage(product.image);
    }
  }, [product]);

  if (loading) {
    return (
      <div className="container" style={{ marginTop: '140px', paddingBottom: '100px', textAlign: 'center' }}>
        <RefreshCw size={40} className="spinner" style={{ margin: '0 auto 16px' }} />
        <p style={{ color: 'var(--text-muted)' }}>Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container page-fade-in" style={{ marginTop: '140px', paddingBottom: '100px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>Không Tìm Thấy Sản Phẩm</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa khỏi hệ thống.
        </p>
        <Link to="/" className="btn btn-primary">
          Quay lại Cửa hàng
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedColor, quantity);
    // Mở giỏ hàng dạng trượt êm ái
    setTimeout(() => {
      setIsCartOpen(true);
    }, 200);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} size={16} fill="currentColor" stroke="none" />);
      } else if (i === fullStars + 1 && halfStar) {
        stars.push(
          <div key={i} style={{ position: 'relative', display: 'inline-block', color: '#fbbf24' }}>
            <Star size={16} fill="none" />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', overflow: 'hidden' }}>
              <Star size={16} fill="currentColor" stroke="none" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} size={16} fill="none" />);
      }
    }
    return <div className="stars" style={{ color: '#fbbf24', display: 'flex', gap: '2px' }}>{stars}</div>;
  };

  const getColorHex = (colorName: string): string => {
    switch (colorName.toLowerCase()) {
      case 'silver':
      case 'bạc (silver)':
      case 'bạc': return '#cbd5e1';
      case 'space gray':
      case 'xám không gian (space gray)':
      case 'xám': return '#475569';
      case 'chalk white':
      case 'trắng phấn (chalk white)':
      case 'trắng': return '#f8fafc';
      case 'slate black':
      case 'đen phiến (slate black)':
      case 'đen': return '#1e293b';
      case 'royal blue':
      case 'xanh hoàng gia (royal blue)':
      case 'xanh': return '#1d4ed8';
      case 'arctic white':
      case 'trắng bắc cực (arctic white)': return '#e2e8f0';
      case 'vibrant gold':
      case 'vàng rực rỡ (vibrant gold)': return '#fbbf24';
      case 'deep slate':
      case 'xám đá sâu (deep slate)': return '#334155';
      case 'titanium silver':
      case 'bạc titan (titanium silver)': return '#94a3b8';
      case 'deep blue':
      case 'xanh đại dương (deep blue)': return '#1e3a8a';
      case 'sleek gold':
      case 'vàng sang trọng (sleek gold)': return '#d97706';
      case 'classic black':
      case 'đen cổ điển (classic black)': return '#0f172a';
      case 'silver mist':
      case 'bạc sương mù (silver mist)': return '#e2e8f0';
      case 'charcoal black':
      case 'đen than (charcoal black)': return '#1e293b';
      case 'platinum silver':
      case 'bạc bạch kim (platinum silver)': return '#cbd5e1';
      case 'neon pink':
      case 'hồng neon (neon pink)': return '#ec4899';
      case 'mint green':
      case 'xanh bạc hà (mint green)': return '#10b981';
      case 'active black':
      case 'đen năng động (active black)': return '#020617';
      default: return '#cccccc';
    }
  };

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

  // Cấu hình breadcrumbs
  const breadcrumbItems = [
    { label: 'Trang chủ', to: '/' },
    { label: getCategoryVietnamese(product.category), to: `/?category=${encodeURIComponent(product.category)}` },
    { label: product.name }
  ];

  return (
    <div className="container details-container page-fade-in">
      
      {/* Breadcrumbs điều hướng */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Nút Quay Lại */}
      <Link to="/" className="details-back-btn">
        <ArrowLeft size={18} />
        Quay lại Cửa hàng
      </Link>

      <div className="details-grid">
        
        {/* Cột Trái: Ảnh Sản Phẩm & Bộ sưu tập ảnh thu nhỏ */}
        <div className="details-image-panel">
          <div className="details-active-image-wrapper">
            <img src={activeImage} alt={product.name} className="details-img" />
          </div>
          
          {/* Lưới các hình ảnh nhỏ phụ (Thumbnails Grid) */}
          {product.images && product.images.length > 0 && (
            <div className="details-thumbnails-grid">
              {product.images.map((imgUrl, idx) => (
                <div 
                  key={idx} 
                  className={`thumbnail-card ${activeImage === imgUrl ? 'active' : ''}`}
                  onClick={() => setActiveImage(imgUrl)}
                  onMouseEnter={() => setActiveImage(imgUrl)} // Chuyển nhanh khi hover
                >
                  <img src={imgUrl} alt={`${product.name} góc chụp ${idx + 1}`} className="thumbnail-img" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cột Phải: Bảng thông tin chi tiết */}
        <div className="details-info-panel">
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span className="badge badge-primary" style={{ width: 'fit-content' }}>
              {getCategoryVietnamese(product.category)}
            </span>
            <h1 className="det-title">{product.name}</h1>
          </div>

          <div className="det-rating">
            {renderStars(product.rating)}
            <span className="reviews-count">
              <strong>{product.rating}</strong> &bull; ({product.reviewsCount} đánh giá từ khách mua thực tế)
            </span>
          </div>

          <div className="det-price-group">
            <span className="det-price">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="det-price-original">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          <p className="det-desc">{product.description}</p>

          {/* Các Tính Năng Nổi Bật */}
          <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>
            {product.features.map((feat, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={16} style={{ color: 'var(--color-primary)', minWidth: '16px' }} />
                {feat}
              </li>
            ))}
          </ul>

          {/* Chọn Màu Sắc Swatch */}
          <div className="det-color-selectors">
            <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Chọn màu sắc
            </span>
            <div className="det-swatches">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`swatch-chip ${selectedColor === color ? 'active' : ''}`}
                  onClick={() => setSelectedColor(color)}
                >
                  <span
                    className="swatch-color-dot"
                    style={{ backgroundColor: getColorHex(color) }}
                  ></span>
                  {color === 'Silver' ? 'Bạc' : color === 'Space Gray' ? 'Xám Không Gian' : color === 'Chalk White' ? 'Trắng Phấn' : color === 'Slate Black' ? 'Đen Phiến' : color === 'Royal Blue' ? 'Xanh Hoàng Gia' : color === 'Arctic White' ? 'Trắng Bắc Cực' : color === 'Vibrant Gold' ? 'Vàng Rực Rỡ' : color === 'Deep Slate' ? 'Xám Đá Sâu' : color === 'Titanium Silver' ? 'Bạc Titan' : color === 'Deep Blue' ? 'Xanh Đại Dương' : color === 'Sleek Gold' ? 'Vàng Sang Trọng' : color === 'Classic Black' ? 'Đen Cổ Điển' : color === 'Silver Mist' ? 'Bạc Sương Mù' : color === 'Charcoal Black' ? 'Đen Than' : color === 'Platinum Silver' ? 'Bạc Bạch Kim' : color === 'Neon Pink' ? 'Hồng Neon' : color === 'Mint Green' ? 'Xanh Bạc Hà' : color === 'Active Black' ? 'Đen Năng Động' : color}
                </button>
              ))}
            </div>
          </div>

          {/* Thanh Tiến Trình Tồn Kho */}
          <div className="det-stock-status">
            <div className="det-stock-text">
              <span>Trạng thái hàng</span>
              <span>
                {product.inStock ? (
                  <strong>Còn {product.stockPercentage}% sản phẩm trong kho</strong>
                ) : (
                  <span className="badge badge-danger">Tạm hết hàng</span>
                )}
              </span>
            </div>
            <div className="det-stock-track">
              <div className="det-stock-fill" style={{ width: `${product.stockPercentage}%` }}></div>
            </div>
          </div>

          {/* Chọn số lượng & Nút mua hàng */}
          {product.inStock ? (
            <div className="det-actions">
              <div className="det-qty-selector">
                <button
                  className="det-qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Giảm số lượng"
                >
                  <Minus size={16} />
                </button>
                <span className="det-qty-val">{quantity}</span>
                <button
                  className="det-qty-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Tăng số lượng"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button className="btn btn-primary" onClick={handleAddToCart} style={{ flexGrow: 1 }}>
                Thêm vào giỏ hàng - {formatPrice(product.price * quantity)}
              </button>
            </div>
          ) : (
            <button className="btn btn-secondary" style={{ width: '100%', cursor: 'not-allowed' }} disabled>
              Tạm hết hàng
            </button>
          )}

          {/* Cam Kết Bảo Hành & Vận Chuyển */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '24px', fontSize: '13px', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', textAlign: 'center' }}>
              <Shield size={18} style={{ color: 'var(--color-primary)' }} />
              <strong>Bảo hành 1 năm</strong>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', textAlign: 'center' }}>
              <Truck size={18} style={{ color: 'var(--color-primary)' }} />
              <strong>Giao hàng nhanh</strong>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', textAlign: 'center' }}>
              <RotateCcw size={18} style={{ color: 'var(--color-primary)' }} />
              <strong>30 ngày đổi trả</strong>
            </div>
          </div>

          {/* Thông Số Kỹ Thuật */}
          <div className="det-specs-box">
            <h3 className="det-specs-title">Thông số kỹ thuật chi tiết</h3>
            <div className="det-specs-grid">
              {Object.entries(product.specs).map(([key, val]) => (
                <span key={key} className="det-spec-item">
                  <strong>{key}:</strong> {val}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Đề xuất sản phẩm tương tự */}
      <RelatedProducts currentProductId={product.id} category={product.category} />

      {/* Đánh Giá từ Khách Hàng */}
      <div className="reviews-section">
        <h2 className="reviews-title">Nhận xét từ khách hàng ({product.reviews.length})</h2>
        {product.reviews.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>Chưa có đánh giá nào cho sản phẩm này. Hãy là khách hàng đầu tiên đánh giá sản phẩm!</p>
        ) : (
          <div className="review-list">
            {product.reviews.map((rev) => (
              <div key={rev.id} className="review-card">
                <div className="review-header">
                  <span className="review-author">{rev.author}</span>
                  <span className="review-date">{rev.date}</span>
                </div>
                <div style={{ marginBottom: '8px' }}>{renderStars(rev.rating)}</div>
                <p className="review-comment">{rev.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default ProductDetails;
