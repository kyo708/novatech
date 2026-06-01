import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AlertCircle, RefreshCw } from 'lucide-react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { PRODUCTS as STATIC_PRODUCTS, CATEGORIES, SORT_OPTIONS } from '../../products';
import { getProducts } from '../../services/api';
import './Shop.css';

export const Shop: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [products, setProducts] = useState(STATIC_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [sortBy, setSortBy] = useState('featured');

  // Fetch sản phẩm từ Spring Boot Backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error('Không thể kết nối tới backend Spring Boot. Sử dụng dữ liệu tĩnh dự phòng:', err);
        setProducts(STATIC_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Đồng bộ hóa danh mục 'All' tiếng Anh sang 'Tất cả' tiếng Việt
  const getCategoryMatch = (productCat: string, activeCat: string) => {
    if (activeCat === 'Tất cả') return true;
    
    // Ánh xạ danh mục trong trường hợp dữ liệu backend gửi dạng tiếng Anh
    const catMap: Record<string, string> = {
      'laptops': 'laptops',
      'laptop': 'laptops',
      'phones': 'phones',
      'điện thoại': 'phones',
      'audio': 'audio',
      'âm thanh': 'audio',
      'wearables': 'wearables',
      'thiết bị đeo': 'wearables',
      'accessories': 'accessories',
      'phụ kiện': 'accessories'
    };

    const mappedActive = catMap[activeCat.toLowerCase()] || activeCat.toLowerCase();
    const mappedProduct = catMap[productCat.toLowerCase()] || productCat.toLowerCase();
    
    return mappedActive === mappedProduct;
  };

  // Lọc sản phẩm
  const filteredProducts = products.filter((product) => {
    const matchesCategory = getCategoryMatch(product.category, activeCategory);
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sắp xếp sản phẩm
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // 'featured' giữ nguyên
  });

  const resetFilters = () => {
    setActiveCategory('Tất cả');
    setSortBy('featured');
  };

  // Bản dịch tên danh mục trên giao diện
  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'All': return 'Tất cả';
      case 'Laptops': return 'Laptop';
      case 'Phones': return 'Điện thoại';
      case 'Audio': return 'Âm thanh';
      case 'Wearables': return 'Thiết bị đeo';
      case 'Accessories': return 'Phụ kiện';
      default: return cat;
    }
  };

  return (
    <div className="page-fade-in container">
      {/* Tiêu đề cửa hàng dạng nhẹ nhàng cao cấp */}
      <div className="shop-banner" style={{
        padding: '60px 40px 40px',
        textAlign: 'center',
        background: 'var(--grad-primary)',
        borderRadius: 'var(--radius-lg)',
        color: '#ffffff',
        marginTop: '100px',
        marginBottom: '30px',
        boxShadow: 'var(--shadow-md)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-30%',
          width: '80%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 60%)',
          pointerEvents: 'none'
        }} />
        <h1 style={{ fontSize: '36px', fontWeight: 850, marginBottom: '12px' }}>Cửa Hàng Công Nghệ NovaTech</h1>
        <p style={{ opacity: 0.9, fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
          Khám phá các sản phẩm công nghệ cao cấp chính hãng từ laptop sáng tạo đến thiết bị âm thanh đỉnh cao.
        </p>
      </div>

      {/* Danh mục sản phẩm */}
      <section className="store-section" id="shop-catalog">
        
        {/* Tiêu đề phần */}
        <div className="section-header">
          <div className="section-title-group">
            <h2 className="section-title">Danh Mục Sản Phẩm</h2>
            <p className="section-subtitle">Lọc và tìm kiếm các thiết bị phù hợp với phong cách của bạn</p>
          </div>
        </div>

        {/* Bộ lọc và Sắp xếp */}
        <div className="filters-wrapper">
          <nav className="categories-list" aria-label="Danh mục sản phẩm">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                className={`category-chip ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {getCategoryLabel(category)}
              </button>
            ))}
          </nav>

          <div className="sort-container">
            <label className="sort-label" htmlFor="sort-select">
              Sắp xếp theo
            </label>
            <select
              className="sort-select"
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.value === 'featured' ? 'Sản phẩm nổi bật' :
                   opt.value === 'price-low' ? 'Giá: Thấp đến Cao' :
                   opt.value === 'price-high' ? 'Giá: Cao đến Thấp' :
                   opt.value === 'rating' ? 'Đánh giá hàng đầu' : opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Trạng thái tải dữ liệu */}
        {loading ? (
          <div className="products-loading">
            <RefreshCw size={40} className="spinner" />
            <p>Đang tải dữ liệu sản phẩm từ hệ thống...</p>
          </div>
        ) : sortedProducts.length === 0 ? (
          /* Trạng thái trống */
          <div className="no-results">
            <AlertCircle size={64} strokeWidth={1.5} />
            <h3>Không Tìm Thấy Sản Phẩm</h3>
            <p>
              Chúng tôi không tìm thấy sản phẩm nào khớp với từ khóa "{searchQuery}".
              Hãy thử tìm kiếm từ khóa khác hoặc xóa bộ lọc.
            </p>
            <button className="btn btn-secondary btn-sm" onClick={resetFilters}>
              Đặt lại tất cả bộ lọc
            </button>
          </div>
        ) : (
          /* Lưới sản phẩm */
          <div className="product-grid">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </section>
    </div>
  );
};

export default Shop;
