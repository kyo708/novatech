import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, X, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/format';
import './CartDrawer.css';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    totals
  } = useCart();
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const getColorLabelVietnamese = (colorName: string): string => {
    switch (colorName.toLowerCase()) {
      case 'silver': return 'Bạc';
      case 'space gray': return 'Xám Không Gian';
      case 'chalk white': return 'Trắng Phấn';
      case 'slate black': return 'Đen Phiến';
      case 'royal blue': return 'Xanh Hoàng Gia';
      case 'arctic white': return 'Trắng Bắc Cực';
      case 'vibrant gold': return 'Vàng Rực Rỡ';
      case 'deep slate': return 'Xám Đá Sâu';
      case 'titanium silver': return 'Bạc Titan';
      case 'deep blue': return 'Xanh Đại Dương';
      case 'sleek gold': return 'Vàng Sang Trọng';
      case 'classic black': return 'Đen Cổ Điển';
      case 'silver mist': return 'Bạc Sương Mù';
      case 'charcoal black': return 'Đen Than';
      case 'platinum silver': return 'Bạc Bạch Kim';
      case 'neon pink': return 'Hồng Neon';
      case 'mint green': return 'Xanh Bạc Hà';
      case 'active black': return 'Đen Năng Động';
      default: return colorName;
    }
  };

  const getColorHex = (colorName: string): string => {
    switch (colorName.toLowerCase()) {
      case 'silver': return '#cbd5e1';
      case 'space gray': return '#475569';
      case 'chalk white': return '#f8fafc';
      case 'slate black': return '#1e293b';
      case 'royal blue': return '#1d4ed8';
      case 'arctic white': return '#e2e8f0';
      case 'vibrant gold': return '#fbbf24';
      case 'deep slate': return '#334155';
      case 'titanium silver': return '#94a3b8';
      case 'deep blue': return '#1e3a8a';
      case 'sleek gold': return '#d97706';
      case 'classic black': return '#0f172a';
      case 'silver mist': return '#e2e8f0';
      case 'charcoal black': return '#1e293b';
      case 'platinum silver': return '#cbd5e1';
      case 'neon pink': return '#ec4899';
      case 'mint green': return '#10b981';
      case 'active black': return '#020617';
      default: return '#cccccc';
    }
  };

  return (
    <div
      className={`drawer-backdrop ${isCartOpen ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsCartOpen(false);
      }}
    >
      <aside className="drawer">
        
        {/* Drawer Header */}
        <div className="drawer-header">
          <h2 className="drawer-title">
            <ShoppingCart size={22} />
            Giỏ hàng
          </h2>
          <button
            className="btn-close-modal"
            onClick={() => setIsCartOpen(false)}
            aria-label="Đóng giỏ hàng"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <ShoppingCart size={64} strokeWidth={1.5} />
              <h3>Giỏ hàng đang trống</h3>
              <p>Khám phá bộ sưu tập của chúng tôi và chọn các thiết bị công nghệ cao cấp để thêm vào giỏ hàng.</p>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setIsCartOpen(false)}
              >
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            <>
              {/* Tiến trình miễn phí vận chuyển */}
              {totals.shipping === 0 ? (
                <div className="shipping-alert-bar">
                  <span>🎉 Bạn đã mở khóa **Miễn phí vận chuyển cao cấp**!</span>
                  <div className="shipping-progress-track">
                    <div className="shipping-progress-fill" style={{ width: '100%' }}></div>
                  </div>
                </div>
              ) : (
                <div className="shipping-alert-bar">
                  <span>
                    Mua thêm **{formatPrice(totals.remainingForFreeShipping)}** để được **Miễn phí vận chuyển**!
                  </span>
                  <div className="shipping-progress-track">
                    <div
                      className="shipping-progress-fill"
                      style={{
                        width: `${Math.min(
                          100,
                          (totals.subtotal / totals.freeShippingThreshold) * 100
                        )}%`
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Danh sách sản phẩm mua */}
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor}`} className="cart-item">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-info">
                    <h3 className="cart-item-title">{item.product.name}</h3>
                    <span className="cart-item-meta">
                      <span
                        className="color-dot-indicator"
                        style={{ backgroundColor: getColorHex(item.selectedColor) }}
                      ></span>
                      Màu: {getColorLabelVietnamese(item.selectedColor)}
                    </span>
                    <div className="qty-control">
                      <button
                        className="qty-btn"
                        onClick={() =>
                          updateQuantity(item.product.id, item.selectedColor, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span className="qty-val">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() =>
                          updateQuantity(item.product.id, item.selectedColor, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-actions">
                    <span className="cart-item-price">{formatPrice(item.product.price * item.quantity)}</span>
                    <button
                      className="btn-remove-item"
                      onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                      aria-label="Xóa sản phẩm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="summary-row">
              <span>Tạm tính</span>
              <span>{formatPrice(totals.subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Thuế ước tính (10%)</span>
              <span>{formatPrice(totals.tax)}</span>
            </div>
            <div className="summary-row">
              <span>Vận chuyển cao cấp</span>
              <span>
                {totals.shipping === 0 ? (
                  <span className="badge badge-success" style={{ padding: '2px 8px' }}>
                    MIỄN PHÍ
                  </span>
                ) : (
                  formatPrice(totals.shipping)
                )}
              </span>
            </div>
            <div className="summary-row total">
              <span>Tổng cộng</span>
              <span>{formatPrice(totals.total)}</span>
            </div>
            <button
              className="btn btn-primary"
              onClick={handleCheckoutClick}
              style={{ width: '100%', marginTop: '10px' }}
            >
              Tiến hành thanh toán
              <ArrowRight size={18} />
            </button>
          </div>
        )}

      </aside>
    </div>
  );
};

export default CartDrawer;
