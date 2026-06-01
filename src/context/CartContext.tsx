import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, Product, CartTotals } from '../types';
import { useToast } from './ToastContext';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, color: string, quantity: number) => void;
  removeFromCart: (productId: string, color: string) => void;
  updateQuantity: (productId: string, color: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totals: CartTotals;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'novatech_cart_react';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cart]);

  const addToCart = (product: Product, color: string, quantity: number) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => item.product.id === product.id && item.selectedColor === color
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [...prevCart, { product, quantity, selectedColor: color }];
      }
    });
    showToast(`Đã thêm ${quantity} x ${product.name} (${color}) vào giỏ hàng!`, 'success');
  };

  const removeFromCart = (productId: string, color: string) => {
    const item = cart.find(i => i.product.id === productId && i.selectedColor === color);
    setCart(prevCart =>
      prevCart.filter(item => !(item.product.id === productId && item.selectedColor === color))
    );
    if (item) {
      showToast(`Đã xóa ${item.product.name} khỏi giỏ hàng`, 'info');
    }
  };

  const updateQuantity = (productId: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, color);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.product.id === productId && item.selectedColor === color) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.1);
  
  const freeShippingThreshold = 5000000; // Ngưỡng miễn phí vận chuyển 5 triệu VND
  const shipping = subtotal > 0 && subtotal < freeShippingThreshold ? 50000 : 0; // Phí giao hàng tiêu chuẩn 50k VND
  
  const total = subtotal + tax + shipping;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const totals: CartTotals = {
    subtotal,
    tax,
    shipping,
    total,
    freeShippingThreshold,
    remainingForFreeShipping
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      totals
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

