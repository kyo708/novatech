# ==========================================================
# NovaTech Backend - Multi-stage Production Dockerfile
# ==========================================================

# --- Stage 1: Build Phase ---
# Dùng Alpine Maven + JDK 17 để biên dịch dự án nhanh và nhẹ
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app

# Sao chép file pom.xml để tải trước các dependencies và cache lại (Tối ưu hóa tốc độ build)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Sao chép thư mục source và tiến hành build đóng gói tệp .jar
COPY src ./src
RUN mvn clean package -DskipTests -B

# --- Stage 2: Run Phase ---
# Sử dụng JRE 17 
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Sao chép tệp .jar đã được biên dịch từ Stage 1 sang Stage 2
COPY --from=build /app/target/*.jar app.jar

# Tạo thư mục lưu trữ CSDL H2 File để bảo toàn dữ liệu trên Render
RUN mkdir -p data

# Khai báo cổng chạy ứng dụng (Mặc định của Spring Boot)
EXPOSE 8080

# Biến môi trường mặc định (Chạy mặc định với H2 db ở profile dev)
ENV SPRING_PROFILES_ACTIVE=dev
ENV PORT=8080

# Chạy ứng dụng Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]
