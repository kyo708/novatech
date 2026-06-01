import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import './Footer.css';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      showToast('Vui lòng nhập địa chỉ email hợp lệ.', 'error');
      return;
    }
    showToast(`🎉 Thành công! Cảm ơn bạn đã đăng ký nhận bản tin với: ${email}`, 'success');
    setEmail('');
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          
          {/* Cột 1: Giới thiệu thương hiệu */}
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-icon">N</div>
              <span>Nova<span className="text-gradient">Tech</span></span>
            </div>
            <p className="footer-desc">
              Tái định nghĩa công nghệ tiêu dùng cao cấp bằng các thiết bị tinh tế, sang trọng và bền bỉ, được chế tác để truyền cảm hứng.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Cột 2: Danh mục mua sắm */}
          <div className="footer-nav">
            <h3 className="footer-nav-title">Sản phẩm</h3>
            <ul className="footer-nav-list">
              <li><a href="*" className="footer-nav-link">Tất cả sản phẩm</a></li>
              <li><a href="" className="footer-nav-link">Máy tính xách tay</a></li>
              <li><a href="" className="footer-nav-link">Điện thoại di động</a></li>
              <li><a href="" className="footer-nav-link">Thiết bị âm thanh</a></li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ khách hàng */}
          <div className="footer-nav">
            <h3 className="footer-nav-title">Hỗ trợ</h3>
            <ul className="footer-nav-list">
              <li><a href="#" className="footer-nav-link">Liên hệ hỗ trợ</a></li>
              <li><a href="#" className="footer-nav-link">Chính sách giao hàng</a></li>
              <li><a href="#" className="footer-nav-link">Chính sách đổi trả</a></li>
              <li><a href="#" className="footer-nav-link">Câu hỏi thường gặp</a></li>
            </ul>
          </div>

          {/* Cột 4: Đăng ký bản tin */}
          <div className="footer-nav">
            <h3 className="footer-nav-title">Nhận bản tin</h3>
            <p className="footer-desc" style={{ marginBottom: '8px' }}>
              Đăng ký để cập nhật những phát hành công nghệ mới nhất và ưu đãi độc quyền từ NovaTech.
            </p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                className="form-input"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-md)'
                }}
                placeholder="Nhập địa chỉ email của bạn..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Địa chỉ email đăng ký"
                required
              />
              <button type="submit" className="btn btn-primary btn-sm">
                Đăng ký
              </button>
            </form>
          </div>

        </div>

        {/* Bản quyền */}
        <div className="footer-bottom">
          <p>&copy; 2026 NovaTech. Bản quyền thương hiệu được bảo lưu.</p>
          <p>Chính sách bảo mật &bull; Điều khoản dịch vụ</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
