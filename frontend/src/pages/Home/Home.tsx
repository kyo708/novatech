import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, ShieldCheck, Truck, RefreshCw, Headphones, Laptop, Phone, Keyboard, Award } from 'lucide-react';
import Hero from '../../components/Hero/Hero';
import ProductCard from '../../components/ProductCard/ProductCard';
import { PRODUCTS as STATIC_PRODUCTS } from '../../products';
import { getProducts } from '../../services/api';
import './Home.css';

export const Home: React.FC = () => {
  const [products, setProducts] = useState(STATIC_PRODUCTS);

  // Bộ đếm thời gian Flash Sale (Đếm ngược 24h)
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 }; // Reset đếm ngược mới
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch sản phẩm từ Spring Boot Backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error('Không thể kết nối tới backend. Sử dụng dữ liệu tĩnh:', err);
        setProducts(STATIC_PRODUCTS);
      }
    };

    fetchProducts();
  }, []);

  // 1. Lọc sản phẩm đang Hot Sale (Giảm giá mạnh: originalPrice > price)
  const hotSaleProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 4);

  // 2. Phân tách sản phẩm theo danh mục nổi bật
  const laptops = products.filter(p => p.category.toLowerCase() === 'laptops').slice(0, 2);
  const phones = products.filter(p => p.category.toLowerCase() === 'phones').slice(0, 2);
  const audio = products.filter(p => p.category.toLowerCase() === 'audio').slice(0, 2);
  const accessories = products.filter(p => 
    p.category.toLowerCase() === 'accessories' || p.category.toLowerCase() === 'wearables'
  ).slice(0, 2);

  // Định dạng số có 2 chữ số (e.g. 05)
  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="page-fade-in landing-page-wrapper">
      {/* 1. HERO SLIDER */}
      <Hero />

      {/* 2. BRAND TRUST INDICATORS */}
      <section className="container trust-indicators-section">
        <div className="trust-grid">
          <div className="trust-card">
            <div className="trust-icon-wrapper">
              <Truck size={28} />
            </div>
            <div className="trust-info">
              <h3>Vận Chuyển Toàn Quốc</h3>
              <p>Miễn phí vận chuyển cho mọi đơn hàng giá trị cao</p>
            </div>
          </div>
          
          <div className="trust-card">
            <div className="trust-icon-wrapper">
              <ShieldCheck size={28} />
            </div>
            <div className="trust-info">
              <h3>Bảo Hành Chính Hãng</h3>
              <p>Cam kết 100% chính hãng, bảo hành 12 tháng</p>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon-wrapper">
              <RefreshCw size={28} />
            </div>
            <div className="trust-info">
              <h3>Đổi Trả Dễ Dàng</h3>
              <p>Hỗ trợ đổi trả miễn phí trong vòng 7 ngày đầu</p>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon-wrapper">
              <Headphones size={28} />
            </div>
            <div className="trust-info">
              <h3>Hỗ Trợ Kỹ Thuật 24/7</h3>
              <p>Đội ngũ chuyên gia luôn sẵn sàng giải đáp</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FLASH SALE SECTION */}
      <section className="container flash-sale-section">
        <div className="flash-sale-header">
          <div className="flash-title-group">
            <Flame className="flame-icon animate-pulse" size={32} />
            <h2>FLASH SALE GIỜ VÀNG</h2>
            <div className="countdown-timer">
              <span className="time-block">{formatTime(timeLeft.hours)}</span>
              <span className="time-separator">:</span>
              <span className="time-block">{formatTime(timeLeft.minutes)}</span>
              <span className="time-separator">:</span>
              <span className="time-block">{formatTime(timeLeft.seconds)}</span>
            </div>
          </div>
          <Link to="/shop" className="view-all-link">
            Xem tất cả Hot Sale <ArrowRight size={16} />
          </Link>
        </div>

        <div className="flash-sale-grid">
          {hotSaleProducts.map(product => {
            // Tính số lượng tồn kho hiển thị thanh tiến trình
            const leftStock = product.stockPercentage || 75;
            const progressColor = leftStock < 35 ? 'var(--color-danger)' : 'var(--color-accent)';
            
            return (
              <div key={product.id} className="flash-card-container">
                <ProductCard product={product} />
                <div className="flash-sale-progress">
                  <div className="progress-labels">
                    <span>Đã bán: {100 - leftStock}%</span>
                    <span>Còn lại: {product.inStock ? `${leftStock} sản phẩm` : 'Hết hàng'}</span>
                  </div>
                  <div className="progress-bar-track">
                    <div 
                      className="progress-bar-fill" 
                      style={{ 
                        width: `${leftStock}%`, 
                        backgroundColor: progressColor 
                      }} 
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. SPLIT CATEGORIES SHOWCASE */}
      <section className="container categories-showcase-section">
        <div className="showcase-header">
          <Award size={32} className="text-gradient" />
          <h2>DANH MỤC NỔI BẬT</h2>
          <p>Trải nghiệm tinh hoa công nghệ hàng đầu thế giới</p>
        </div>

        {/* Cửa hàng Laptops */}
        {laptops.length > 0 && (
          <div className="showcase-row split-row-laptop">
            <div className="showcase-spotlight bg-laptop-gradient">
              <div className="spotlight-content">
                <Laptop size={48} />
                <h3>Dòng Sản Phẩm Laptops</h3>
                <p>Hiệu năng hủy diệt, màn hình siêu sắc nét, khơi nguồn sáng tạo không giới hạn của bạn.</p>
                <Link to="/shop" className="btn btn-white btn-sm">
                  Khám phá Laptop <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="showcase-grid">
              {laptops.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}

        {/* Cửa hàng Điện thoại */}
        {phones.length > 0 && (
          <div className="showcase-row split-row-phone">
            <div className="showcase-spotlight bg-phone-gradient">
              <div className="spotlight-content">
                <Phone size={48} />
                <h3>NovaPhone Series</h3>
                <p>Khung Titan chuẩn vũ trụ bền bỉ, camera điện ảnh và hiệu năng chip Fusion tiên tiến hàng đầu.</p>
                <Link to="/shop" className="btn btn-white btn-sm">
                  Khám phá Điện thoại <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="showcase-grid">
              {phones.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}

        {/* Cửa hàng Âm thanh */}
        {audio.length > 0 && (
          <div className="showcase-row split-row-audio">
            <div className="showcase-spotlight bg-audio-gradient">
              <div className="spotlight-content">
                <Headphones size={48} />
                <h3>Âm Thanh Đỉnh Cao</h3>
                <p>Không gian âm nhạc phòng thu thuần khiết, công nghệ chống ồn lai cao cấp và âm trầm nội lực.</p>
                <Link to="/shop" className="btn btn-white btn-sm">
                  Khám phá Âm thanh <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="showcase-grid">
              {audio.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}

        {/* Cửa hàng Phụ kiện & Vòng đeo đeo */}
        {accessories.length > 0 && (
          <div className="showcase-row split-row-acc">
            <div className="showcase-spotlight bg-acc-gradient">
              <div className="spotlight-content">
                <Keyboard size={48} />
                <h3>Thiết Bị Đeo & Phụ Kiện</h3>
                <p>Nâng tầm góc làm việc nghệ thuật và theo dõi thể trạng với các phụ kiện bền bỉ, cao cấp nhất.</p>
                <Link to="/shop" className="btn btn-white btn-sm">
                  Khám phá Phụ kiện <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="showcase-grid">
              {accessories.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </section>

      {/* 5. CALL TO ACTION DISCOVER BANNER */}
      <section className="container cta-discover-section">
        <div className="cta-banner-wrapper">
          <div className="cta-shapes">
            <div className="shape-blur shape-1" />
            <div className="shape-blur shape-2" />
          </div>
          <div className="cta-glass-card">
            <h2>BẮT ĐẦU HÀNH TRÌNH CÔNG NGHỆ CỦA BẠN</h2>
            <p>
              Hàng trăm sản phẩm cao cấp, chính hãng với chính sách trả góp 0%, ưu đãi độc quyền 
              và bảo hành toàn diện đang chờ đợi bạn tại Cửa hàng NovaTech.
            </p>
            <Link to="/shop" className="btn btn-primary btn-lg btn-glow">
              Khám Phá Cửa Hàng Ngay
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
