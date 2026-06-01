import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import './NotFound.css';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="notfound">
      {/* Animated background shapes */}
      <div className="notfound__bg-shapes" aria-hidden="true">
        <span className="notfound__bg-blob notfound__bg-blob--1" />
        <span className="notfound__bg-blob notfound__bg-blob--2" />
        <span className="notfound__bg-blob notfound__bg-blob--3" />
      </div>

      <div className="notfound__content">
        {/* Orbiting illustration */}
        <div className="notfound__illustration" aria-hidden="true">
          <span className="notfound__ring notfound__ring--outer" />
          <span className="notfound__ring notfound__ring--middle" />
          <span className="notfound__ring notfound__ring--inner" />
          <span className="notfound__dot notfound__dot--1" />
          <span className="notfound__dot notfound__dot--2" />
          <span className="notfound__dot notfound__dot--3" />
          <span className="notfound__dot notfound__dot--4" />
          <span className="notfound__core" />
        </div>

        {/* Big 404 number */}
        <h1 className="notfound__code">404</h1>

        <h2 className="notfound__title">Không Tìm Thấy Trang</h2>
        <p className="notfound__desc">
          Rất tiếc! Trang bạn đang tìm kiếm không tồn tại hoặc đã được chuyển sang địa chỉ khác.
          Hãy quay lại trang chủ hoặc tìm kiếm sản phẩm bạn cần dưới đây.
        </p>

        {/* Search bar */}
        <form className="notfound__search" onSubmit={handleSearch}>
          <div className="notfound__search-wrapper">
            <Search size={18} />
            <input
              type="text"
              className="notfound__search-input"
              placeholder="Tìm kiếm sản phẩm..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Tìm kiếm sản phẩm"
            />
          </div>
          <button type="submit" className="btn btn-primary notfound__search-btn">
            Tìm kiếm
          </button>
        </form>

        {/* Back to home */}
        <Link to="/" className="btn btn-secondary notfound__home-btn">
          <Home size={18} />
          Quay lại Trang chủ
        </Link>
      </div>
    </section>
  );
};
export default NotFound;

