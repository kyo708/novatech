const BASE_URL = 'http://localhost:8080/api/auth';

export interface LoginResponseDto {
  token: string;
  username: string;
  email: string;
  role: string;
}

/**
 * Gọi API Backend để đăng nhập người dùng
 * @param username Tên tài khoản
 * @param password Mật khẩu
 * @returns Thông tin phản hồi gồm JWT Token và thông tin user
 */
export const loginApi = async (username: string, password: string): Promise<LoginResponseDto> => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Đăng nhập thất bại!');
  }

  return response.json();
};
