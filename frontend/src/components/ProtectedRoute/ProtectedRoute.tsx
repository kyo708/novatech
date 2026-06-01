import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, ArrowLeft, LogIn } from 'lucide-react';
import './ProtectedRoute.css';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  // Đang nạp thông tin xác thực từ localStorage
  if (isLoading) {
    return (
      <div className="auth-loading-screen">
        <div className="auth-spinner"></div>
        <p>Đang xác thực quyền truy cập...</p>
      </div>
    );
  }

  // Nếu người dùng không hợp lệ hoặc không có quyền Admin, hiển thị màn hình Cấm truy cập cực đẹp
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="access-denied-container">
        <div className="access-denied-glass-card">
          <div className="lock-icon-wrapper">
            <ShieldAlert size={64} className="neon-lock-icon" />
          </div>
          
          <h1 className="access-denied-title">Truy Cập Bị Từ Chối</h1>
          <p className="access-denied-desc">
            Khu vực này yêu cầu quyền quản trị viên **(Administrator)**. Tài khoản hiện tại của bạn không có đặc quyền để truy cập trang này.
          </p>

          <div className="access-denied-actions">
            <Link to="/" className="btn-access-denied btn-home">
              <ArrowLeft size={18} />
              <span>Quay lại Trang chủ</span>
            </Link>
            
            <Link to="/login" className="btn-access-denied btn-login">
              <LogIn size={18} />
              <span>Đăng nhập Admin</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Nếu thỏa mãn quyền Admin, cho phép hiển thị các component con
  return <>{children}</>;
};

export default ProtectedRoute;
