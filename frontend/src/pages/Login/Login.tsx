import React, { useState, useEffect, useRef } from 'react';
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
  const [celebrate, setCelebrate] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Nếu đã đăng nhập và là Admin, tự chuyển hướng về trang Inventory
  useEffect(() => {
    if (isAuthenticated && isAdmin && !celebrate) {
      navigate('/admin/inventory');
    }
  }, [isAuthenticated, isAdmin, navigate, celebrate]);

  // Bộ sinh hạt Pháo hoa giấy (Confetti Particle System) viết bằng Canvas thuần
  useEffect(() => {
    if (!celebrate || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
    }

    const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];
    const particles: Particle[] = [];

    // Tạo các hạt bắn từ 2 góc dưới màn hình
    for (let i = 0; i < 150; i++) {
      const isLeft = Math.random() > 0.5;
      particles.push({
        x: isLeft ? 0 : canvas.width,
        y: canvas.height * 0.8,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (isLeft ? Math.random() * 15 + 10 : -Math.random() * 15 - 10),
        speedY: -Math.random() * 20 - 15,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let active = false;
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += 0.5; // Trọng lực rơi
        p.speedX *= 0.98; // Kháng lực không khí
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();

        if (p.y < canvas.height + 50) {
          active = true;
        }
      });

      if (active) {
        animationId = requestAnimationFrame(animate);
      } else {
        setCelebrate(false);
      }
    };

    animate();

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [celebrate]);

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
      
      // Đăng nhập thành công -> Kích hoạt pháo confetti ăn mừng
      setCelebrate(true);
      
      // Đợi hiệu ứng pháo hoa bay lộng lẫy 2 giây rồi mới chuyển trang
      setTimeout(() => {
        navigate('/admin/inventory');
      }, 2200);

    } catch (err: any) {
      setErrorMsg(err.message || 'Đăng nhập thất bại, vui lòng kiểm tra lại tài khoản!');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page-container">
      {/* Canvas phục vụ bắn pháo giấy chúc mừng */}
      {celebrate && <canvas ref={canvasRef} className="confetti-canvas" />}

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
