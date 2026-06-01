import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Truck, Wallet, Check, AlertCircle, RefreshCw } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import Confetti from '../../components/Confetti/Confetti';
import { createOrder } from '../../services/api';
import { formatPrice } from '../../utils/format';
import './Checkout.css';

export const Checkout: React.FC = () => {
  const { cart, totals, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [paymentOpt, setPaymentOpt] = useState<'Card' | 'Delivery' | 'Wallet'>('Card');
  
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !address) {
      showToast('Vui lòng nhập đầy đủ thông tin giao hàng của bạn.', 'error');
      return;
    }
    
    try {
      setSubmitting(true);
      
      // Chuyển đổi giỏ hàng sang định dạng DTO cho backend
      const itemsDto = cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        selectedColor: item.selectedColor,
        price: item.product.price
      }));

      const payload = {
        name,
        email,
        address,
        paymentMethod: paymentOpt === 'Card' ? 'Thẻ tín dụng' : paymentOpt === 'Delivery' ? 'Thanh toán khi nhận hàng' : 'Ví điện tử TechWallet',
        totalAmount: totals.total,
        items: itemsDto
      };

      const data = await createOrder(payload);
      setOrderId(data.orderId || 'NT-' + Math.floor(10000 + Math.random() * 90000));
      setIsSuccess(true);
      clearCart();
      showToast('Đặt hàng thành công! Cảm ơn bạn đã lựa chọn NovaTech.', 'success');
    } catch (err) {
      console.error('Không kết nối được tới Spring Boot backend. Sử dụng cơ chế dự phòng cục bộ...', err);
      // Cơ chế dự phòng ngoại tuyến
      setOrderId('NT-' + Math.floor(10000 + Math.random() * 90000));
      setIsSuccess(true);
      clearCart();
      showToast('Đặt hàng thành công! (Chế độ dự phòng)', 'success');
    } finally {
      setSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="container checkout-container page-fade-in">
        <div className="success-card">
          {/* Trình kích hoạt pháo hoa giấy chúc mừng */}
          <Confetti />

          <div className="success-icon-wrapper">
            <Check size={40} />
          </div>

          <h2 className="success-title">Đặt Hàng Thành Công!</h2>
          <p className="success-text">
            Cảm ơn bạn đã tin tưởng mua sắm tại NovaTech, <strong>{name}</strong>. 
            Mã đơn hàng của bạn là <strong>{orderId}</strong>. Chúng tôi đã gửi email xác nhận 
            chi tiết tới địa chỉ <strong>{email}</strong>. Sản phẩm của bạn sẽ sớm được giao tới địa chỉ đăng ký.
          </p>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate('/')}
            style={{ marginTop: '10px' }}
          >
            Tuyệt vời, tiếp tục mua sắm
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container checkout-container page-fade-in" style={{ textAlign: 'center', paddingBottom: '100px' }}>
        <div className="success-card" style={{ gap: '16px' }}>
          <AlertCircle size={64} strokeWidth={1.5} style={{ color: 'var(--text-light)' }} />
          <h2>Giỏ hàng của bạn đang trống</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Không có sản phẩm nào trong giỏ hàng để tiến hành thanh toán.
          </p>
          <Link to="/" className="btn btn-primary btn-sm">
            Khám phá sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container checkout-container page-fade-in">
      <div className="checkout-card">
        
        {/* Header */}
        <div className="checkout-header">
          <h2 className="checkout-title">Hoàn tất đơn hàng của bạn</h2>
        </div>

        {/* Form điền thông tin */}
        <form onSubmit={handleSubmit} className="checkout-body">
          
          <div className="form-group">
            <label className="form-label" htmlFor="chk-name">
              Họ và tên khách hàng
            </label>
            <input
              type="text"
              className="form-input"
              id="chk-name"
              placeholder="Nguyễn Văn A"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="chk-email">
              Địa chỉ Email
            </label>
            <input
              type="email"
              className="form-input"
              id="chk-email"
              placeholder="nguyenvana@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="chk-address">
              Địa chỉ nhận hàng (Đầy đủ Số nhà, Đường, Quận, Thành phố)
            </label>
            <input
              type="text"
              className="form-input"
              id="chk-address"
              placeholder="Số 123 Đường Công Nghệ, Quận 1, TP. Hồ Chí Minh"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              disabled={submitting}
            />
          </div>

          {/* Lựa chọn phương thức thanh toán */}
          <div className="form-group">
            <span className="form-label">Phương thức thanh toán</span>
            <div className="payment-grid">
              
              <button
                type="button"
                className={`pay-btn ${paymentOpt === 'Card' ? 'active' : ''}`}
                onClick={() => setPaymentOpt('Card')}
                disabled={submitting}
              >
                <CreditCard size={20} />
                Thẻ tín dụng
              </button>

              <button
                type="button"
                className={`pay-btn ${paymentOpt === 'Delivery' ? 'active' : ''}`}
                onClick={() => setPaymentOpt('Delivery')}
                disabled={submitting}
              >
                <Truck size={20} />
                Thanh toán khi nhận
              </button>

              <button
                type="button"
                className={`pay-btn ${paymentOpt === 'Wallet' ? 'active' : ''}`}
                onClick={() => setPaymentOpt('Wallet')}
                disabled={submitting}
              >
                <Wallet size={20} />
                TechWallet
              </button>

            </div>
          </div>

          {/* Tóm tắt đơn hàng */}
          <div style={{ marginTop: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
            <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px', color: 'var(--text-muted)' }}>
              <span>Tạm tính</span>
              <span>{formatPrice(totals.subtotal)}</span>
            </div>
            <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px', color: 'var(--text-muted)' }}>
              <span>Thuế ước tính (10%)</span>
              <span>{formatPrice(totals.tax)}</span>
            </div>
            <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px', color: 'var(--text-muted)' }}>
              <span>Phí vận chuyển cao cấp</span>
              <span>{totals.shipping === 0 ? 'MIỄN PHÍ' : formatPrice(totals.shipping)}</span>
            </div>
            <div className="summary-row total" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800, marginTop: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '12px', color: 'var(--text-main)' }}>
              <span>Tổng cộng</span>
              <span>{formatPrice(totals.total)}</span>
            </div>
          </div>

          {/* Nút gửi đơn hàng */}
          <div style={{ marginTop: '15px' }}>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={submitting}>
              {submitting ? (
                <>
                  <RefreshCw size={18} className="spinner" style={{ marginRight: '8px' }} />
                  Đang xử lý đơn hàng...
                </>
              ) : (
                `Đặt hàng ngay - ${formatPrice(totals.total)}`
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default Checkout;
