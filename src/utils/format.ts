/**
 * Định dạng số tiền sang chuẩn hiển thị Việt Nam Đồng (VND)http://localhost:4000/login
 * Ví dụ: 34990000 -> 34.990.000 ₫
 * 
 * @param price Số tiền cần định dạng
 * @returns Chuỗi hiển thị tiền tệ đã định dạng
 */
export const formatPrice = (price: number): string => {
  if (price === undefined || price === null || isNaN(price)) {
    return '0 ₫';
  }
  return price.toLocaleString('vi-VN') + ' ₫';
};
