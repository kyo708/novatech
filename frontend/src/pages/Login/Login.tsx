import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogIn, KeyRound, User, Eye, EyeOff } from 'lucide-react';
import './Login.css';

export const Login: React.FC = () => {
  const { login, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Nếu đã đăng nhập và là Admin, tự chuyển hướng về trang Inventory
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate('/admin/inventory');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg('Vui lòng điền đầy đủ tên đăng nhập và mật khẩu!');
      return;
    }

    setIsSubmitting(true);

    try {
      // Gọi context login
      await login(username.trim(), password);
      
      // Đăng nhập thành công -> Chuyển hướng trực tiếp tới trang quản lý
      navigate('/admin/inventory');
    } catch (err: any) {
      setErrorMsg(err.message || 'Đăng nhập thất bại, vui lòng kiểm tra lại tài khoản!');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-glass-card">
        <div className="login-header-group">
          <div className="login-logo-badge">N</div>
          <h1 className="login-title">Hệ Thống Quản Trị</h1>
          <p className="login-subtitle">Đăng nhập tài khoản Admin của NovaTech</p>
        </div>

        {errorMsg && (
          <div className="login-error-alert">
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group-modern">
            <label className="input-label-modern" htmlFor="username">Tên đăng nhập</label>
            <div className="input-field-wrapper">
              <User size={18} className="input-icon-left" />
              <input
                id="username"
                type="text"
                className="input-text-modern"
                placeholder="Nhập tài khoản admin..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isSubmitting}
                autoComplete="username"
              />
            </div>
          </div>

          <div className="input-group-modern">
            <label className="input-label-modern" htmlFor="password">Mật khẩu</label>
            <div className="input-field-wrapper">
              <KeyRound size={18} className="input-icon-left" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="input-text-modern"
                placeholder="Nhập mật khẩu..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="btn-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`btn-login-submit ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="btn-spinner"></div>
                <span>Đang xác thực thông tin...</span>
              </>
            ) : (
              <>
                <LogIn size={20} />
                <span>Đăng nhập hệ thống</span>
              </>
            )}
          </button>
        </form>

        <div className="login-footer-hint">
          <p>Tài khoản dùng thử mặc định:</p>
          <code>Tài khoản: admin / Mật khẩu: admin123</code>
        </div>
      </div>
    </div>
  );
};

export default Login;
