import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../../products';
import { ProductCard } from '../ProductCard/ProductCard';
import './RelatedProducts.css';

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentProductId,
  category,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const relatedProducts = useMemo(() => {
    // Same-category products, excluding current
    const sameCategory = PRODUCTS.filter(
      (p) => p.category === category && p.id !== currentProductId
    );

    if (sameCategory.length >= 4) {
      return sameCategory.slice(0, 4);
    }

    // Fill remaining slots with random products from other categories
    const remaining = 4 - sameCategory.length;
    const otherProducts = PRODUCTS.filter(
      (p) => p.category !== category && p.id !== currentProductId
    );

    // Shuffle and pick
    const shuffled = [...otherProducts].sort(() => Math.random() - 0.5);
    const fillers = shuffled.slice(0, remaining);

    return [...sameCategory, ...fillers].slice(0, 4);
  }, [currentProductId, category]);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const tolerance = 2;
    setCanScrollLeft(el.scrollLeft > tolerance);
    setCanScrollRight(
      el.scrollLeft + el.clientWidth < el.scrollWidth - tolerance
    );
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = (direction: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.7;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  if (relatedProducts.length === 0) return null;

  const wrapperClasses = [
    'related-products-scroll-wrapper',
    canScrollLeft && 'can-scroll-left',
    canScrollRight && 'can-scroll-right',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className="related-products-section">
      {/* Tiêu đề */}
      <div className="related-products-header">
        <h2 className="related-products-title">Có thể bạn cũng thích</h2>
        <div className="related-products-line" />
        <div className="related-products-nav">
          <button
            className="related-nav-btn"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Cuộn sang trái"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="related-nav-btn"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Cuộn sang phải"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>


      {/* Scrollable Track */}
      <div className={wrapperClasses}>
        <div className="related-products-track" ref={trackRef}>
          {relatedProducts.map((product) => (
            <div key={product.id} className="related-product-slot">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
