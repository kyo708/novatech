import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginApi } from '../services/auth';
import type { LoginResponseDto } from '../services/auth';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: LoginResponseDto | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<LoginResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { showToast } = useToast();

  // Nạp token từ localStorage khi khởi chạy ứng dụng
  useEffect(() => {
    const loadPersistedAuth = () => {
      try {
        const storedAuth = localStorage.getItem('novatech-auth');
        if (storedAuth) {
          setUser(JSON.parse(storedAuth));
        }
      } catch (e) {
        console.error('Không thể phân tích dữ liệu xác thực từ localStorage:', e);
        localStorage.removeItem('novatech-auth');
      } finally {
        setIsLoading(false);
      }
    };
    loadPersistedAuth();
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await loginApi(username, password);
      setUser(data);
      localStorage.setItem('novatech-auth', JSON.stringify(data));
      showToast(`Chào mừng ${data.username}! Đăng nhập hệ thống thành công.`, 'success');
    } catch (err: any) {
      showToast(err.message || 'Đăng nhập thất bại, vui lòng thử lại!', 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('novatech-auth');
    showToast('Đăng xuất thành công. Hẹn gặp lại bạn!', 'info');
  };

  const isAuthenticated = user !== null;
  const isAdmin = user !== null && user.role === 'ROLE_ADMIN';

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth phải được sử dụng bên trong AuthProvider');
  }
  return context;
};
