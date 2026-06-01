# 🌌 NovaTech - Hệ Thống Quản Lý Kho Hàng & Thiết Bị Công Nghệ Fullstack

[![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot%203.2-green?style=for-the-badge&logo=springboot)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/Frontend-React%2018%20%2B%20TypeScript-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Database](https://img.shields.io/badge/Database-H2%20File%20Persisted-yellow?style=for-the-badge&logo=databricks)](https://www.h2database.com/)
[![Security](https://img.shields.io/badge/Security-Spring%20Security%20%2B%20JWT-red?style=for-the-badge&logo=jsonwebtokens)](https://jwt.io/)

**NovaTech** là một ứng dụng Fullstack quản lý kho hàng và giới thiệu sản phẩm thiết bị công nghệ hiện đại. Dự án được thiết kế với giao diện **Light Theme** trắng tinh khôi, chữ tối độ tương phản cao, tích hợp hệ thống bảo mật phân quyền Admin nâng cao sử dụng mã hóa mật khẩu BCrypt và xác thực token JWT (JSON Web Token) an toàn.

---

## 📂 Cấu Trúc Dự Án Song Song (Parallel Fullstack)

Dự án được phân tách rõ ràng thành hai phần độc lập hoàn toàn giúp lập trình viên dễ dàng bảo trì và phát triển:

*   **`frontend/`**: Mã nguồn giao diện phía người dùng (Vite + React 18 + TypeScript + Vanilla CSS).
*   **`backend/`**: Mã nguồn máy chủ và cơ sở dữ liệu (Spring Boot 3.2 + Spring Security + Spring Data JPA + CSDL H2 lưu trữ File).
*   **`.gitignore`**: Tệp chặn các thư mục build (`dist/`, `target/`), thư viện (`node_modules/`), và database cục bộ khỏi Git.

---

## ✨ Các Tính Năng Nổi Bật

### ☀️ 1. Giao Diện Ultra-Modern Light Theme
*   Thiết kế tông màu sáng (trắng tinh khiết `#ffffff` và xám sáng `#f1f5f9`) cực kỳ trang nhã và dễ chịu cho mắt.
*   Bóng đổ mềm mại, viền siêu mảnh, hiệu ứng kính mờ (Glassmorphism) thời thượng.
*   Đầy đủ pháo hoa confetti khi đăng nhập thành công và hiệu ứng micro-animations sống động.

### 📦 2. Nghiệp Vụ Quản Lý Kho Thực Tế (Inventory & Metrics)
*   Quản lý hàng hóa dựa trên **số lượng chiếc vật lý cụ thể** (`[X] chiếc`) thay vì phần trăm mơ hồ.
*   Cảnh báo thông minh: Tự động đổi trạng thái **"Sắp hết hàng"** (màu cam) khi số lượng tồn kho $\le 10$ chiếc.
*   Ước tính giá trị kho hàng tự động dựa trên công thức chuẩn: `Số lượng thực tế * Đơn giá sản phẩm`.
*   Bộ đếm Dashboard theo dõi trực quan: Tổng số sản phẩm, số lượng sắp hết hàng, tổng định giá kho hàng.

### 🔐 3. Bảo Mật Phân Quyền Nâng Cao (Spring Security + JWT)
*   Mật khẩu được mã hóa an toàn bằng thuật toán **BCrypt Password Encoder**.
*   Đăng nhập sinh token JWT, lưu trữ an toàn ở Frontend và tự động đính kèm vào header `Authorization: Bearer <token>` trên mỗi yêu cầu API.
*   Chỉ tài khoản có quyền `ROLE_ADMIN` mới được phép truy cập Dashboard Quản lý kho hàng và thực hiện các hành động CRUD (Thêm, Sửa, Xóa sản phẩm).
*   Bọc định tuyến Frontend bằng bộ lọc `ProtectedRoute` thông minh để ngăn người dùng thông thường truy cập trái phép.

---

## 🛠️ Hướng Dẫn Cài Đặt & Chạy Cục Bộ (Local Installation & Startup)

### 📋 Yêu Cầu Hệ Thống
*   Java JDK 17 trở lên.
*   Apache Maven 3.6 trở lên.
*   Node.js (phiên bản LTS) và npm.

---

### 🟢 Bước 1: Chạy Backend (Spring Boot)
1. Mở terminal tại thư mục root và di chuyển vào thư mục `backend`:
   ```bash
   cd backend
   ```
2. Chạy ứng dụng bằng Maven:
   ```bash
   mvn spring-boot:run
   ```
   *Máy chủ Backend sẽ lắng nghe tại cổng **`8080`**.*
   *Cơ sở dữ liệu H2 Console có thể được xem trực tiếp tại **`http://localhost:8080/h2-console`** (JDBC URL: `jdbc:h2:file:./data/novatechdb`, Username: `sa`, Password để trống).*

---

### 🔵 Bước 2: Chạy Frontend (React + Vite)
1. Mở một cửa sổ terminal mới tại thư mục root và di chuyển vào thư mục `frontend`:
   ```bash
   cd frontend
   ```
2. Chạy máy chủ phát triển Frontend:
   ```bash
   npm run dev
   ```
   *Giao diện Frontend sẽ hoạt động tại địa chỉ **`http://localhost:5173`**.*

---

## 🔑 Tài Khoản Quản Trị Mặc Định (Default Credentials)

Hệ thống tự động khởi tạo (seed) tài khoản Admin mặc định khi database trống để bạn trải nghiệm ngay lập tức:

*   **Tài khoản:** `admin`
*   **Mật khẩu:** `admin123`
*   **Vai trò:** `ROLE_ADMIN`

*Dữ liệu sản phẩm mock cũng được nạp tự động từ tệp `products-seed.json` trong lần khởi chạy đầu tiên và được bảo toàn hoàn hảo (không bị reset) khi bạn khởi động lại máy chủ những lần sau.*
