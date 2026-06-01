import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { HERO_PRODUCTS } from '../../products';
import { formatPrice } from '../../utils/format';
import './Hero.css';

export const Hero: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const timerRef = useRef<number | null>(null);

  const startAutoScroll = () => {
    stopAutoScroll();
    timerRef.current = window.setInterval(() => {
      setActiveIdx(prev => (prev + 1) % HERO_PRODUCTS.length);
    }, 6000);
  };

  const stopAutoScroll = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  const handleDotClick = (idx: number) => {
    setActiveIdx(idx);
    startAutoScroll(); // Reset auto timer
  };

  // Ánh xạ tag tiếng Việt
  const getTagVietnamese = (tag: string) => {
    if (tag === 'Best Seller') return 'Bán Chạy Nhất';
    if (tag === 'New') return 'Sản Phẩm Mới';
    if (tag === 'Popular') return 'Được Yêu Thích';
    return tag;
  };

  return (
    <section className="hero-container container">
      <div className="hero-slider">
        {/* Track trượt phần cứng siêu mượt */}
        <div 
          className="hero-track"
          style={{ transform: `translateX(-${activeIdx * 100}%)` }}
        >
          {HERO_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="hero-slide"
            >
              {/* Chi tiết sản phẩm */}
              <div className="hero-content">
                <span className="hero-tag">{getTagVietnamese(product.tags[0]) || 'Sản phẩm nổi bật'}</span>
                <h2 className="hero-title">{product.name}</h2>
                <p className="hero-desc">{product.description}</p>
                <div className="hero-price">
                  {formatPrice(product.price)}
                  {product.originalPrice && (
                    <span className="hero-price-original">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>
                
                <Link to={`/product/${product.id}`} className="btn btn-primary">
                  Mua ngay
                  <ArrowRight size={18} />
                </Link>
              </div>

              {/* Hình ảnh sản phẩm */}
              <div className="hero-image-wrapper">
                <img src={product.image} alt={product.name} className="hero-image" />
              </div>
            </div>
          ))}
        </div>

        {/* Các nút chuyển slide tròn */}
        <div className="hero-controls">
          {HERO_PRODUCTS.map((_, idx) => (
            <button
              key={idx}
              className={`hero-dot ${idx === activeIdx ? 'active' : ''}`}
              onClick={() => handleDotClick(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Hero;

