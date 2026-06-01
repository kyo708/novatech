import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import type { ToastItem } from '../../context/ToastContext';
import './Toast.css';

const TOAST_DURATION = 3000;

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const ToastCard: React.FC<{ toast: ToastItem }> = ({ toast }) => {
  const { removeToast } = useToast();
  const Icon = iconMap[toast.type];

  return (
    <div className={`toast-item toast-${toast.type}${toast.removing ? ' toast-exit' : ''}`}>
      <div className="toast-accent-border" />
      <div className="toast-body">
        <div className="toast-icon-wrapper">
          <Icon size={20} />
        </div>
        <p className="toast-message">{toast.message}</p>
        <button
          className="toast-close"
          onClick={() => removeToast(toast.id)}
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>
      <div className="toast-progress-track">
        <div
          className="toast-progress-bar"
          style={{ animationDuration: `${TOAST_DURATION}ms` }}
        />
      </div>
    </div>
  );
};

export const Toast: React.FC = () => {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <ToastCard key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export default Toast;
