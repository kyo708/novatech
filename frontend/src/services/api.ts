import type { Product } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

/**
 * Helper lấy JWT token từ localStorage và cấu hình headers xác thực
 */
const getAuthHeaders = (): HeadersInit => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  
  try {
    const storedAuth = localStorage.getItem('novatech-auth');
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      if (authData && authData.token) {
        headers['Authorization'] = `Bearer ${authData.token}`;
      }
    }
  } catch (e) {
    console.error('Lỗi khi trích xuất token JWT:', e);
  }
  
  return headers;
};

/**
 * Định nghĩa cấu trúc DTO cho chi tiết sản phẩm trong đơn hàng
 */
export interface OrderItemDto {
  productId: string;
  productName: string;
  quantity: number;
  selectedColor: string;
  price: number;
}

/**
 * Định nghĩa cấu trúc DTO cho Đơn đặt hàng gửi lên backend
 */
export interface OrderPayload {
  name: string;
  email: string;
  address: string;
  paymentMethod: string;
  totalAmount: number;
  items: OrderItemDto[];
}

/**
 * Phản hồi trả về từ API tạo đơn hàng
 */
export interface OrderResponse {
  orderId: string;
  message?: string;
}

/**
 * Lấy danh sách toàn bộ sản phẩm từ Backend
 */
export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) {
    throw new Error(`Lỗi khi lấy danh sách sản phẩm: ${response.statusText}`);
  }
  return response.json();
};

/**
 * Lấy thông tin chi tiết một sản phẩm theo ID từ Backend
 */
export const getProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error(`Lỗi khi lấy thông tin sản phẩm có ID ${id}: ${response.statusText}`);
  }
  return response.json();
};

/**
 * Gửi thông tin đơn hàng thanh toán (Checkout) lên Backend
 */
export const createOrder = async (payload: OrderPayload): Promise<OrderResponse> => {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  
  if (!response.ok) {
    throw new Error(`Lỗi khi tạo đơn hàng mới: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * Thêm sản phẩm mới (Admin)
 */
export const createProduct = async (product: Omit<Product, 'reviews'>): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(product)
  });
  
  if (!response.ok) {
    const errorMsg = await response.text();
    throw new Error(errorMsg || `Lỗi khi tạo sản phẩm: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * Cập nhật thông tin sản phẩm (Admin)
 */
export const updateProduct = async (id: string, product: Omit<Product, 'reviews'>): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(product)
  });
  
  if (!response.ok) {
    const errorMsg = await response.text();
    throw new Error(errorMsg || `Lỗi khi cập nhật sản phẩm: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * Xóa sản phẩm theo ID (Admin)
 */
export const deleteProduct = async (id: string): Promise<string> => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    const errorMsg = await response.text();
    throw new Error(errorMsg || `Lỗi khi xóa sản phẩm: ${response.statusText}`);
  }
  
  return response.text();
};

