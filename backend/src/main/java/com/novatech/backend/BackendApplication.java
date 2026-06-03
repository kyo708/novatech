package com.novatech.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.net.URI;
import java.net.URISyntaxException;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        // Tự động kiểm tra và cấu hình biến môi trường kết nối PostgreSQL từ Neon/Render/Railway
        String databaseUrl = System.getenv("DATABASE_URL");
        if (databaseUrl == null) {
            databaseUrl = System.getenv("SPRING_DATASOURCE_URL");
        }

        if (databaseUrl != null && (databaseUrl.startsWith("postgres://") || databaseUrl.startsWith("postgresql://"))) {
            try {
                // Đổi postgresql:// hoặc postgres:// thành định dạng phù hợp để lấy URI
                String cleanedUrl = databaseUrl.replace("postgresql://", "postgres://");
                URI dbUri = new URI(cleanedUrl);
                
                if (dbUri.getUserInfo() != null) {
                    String username = dbUri.getUserInfo().split(":")[0];
                    String password = dbUri.getUserInfo().split(":")[1];
                    System.setProperty("spring.datasource.username", username);
                    System.setProperty("spring.datasource.password", password);
                }
                
                String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + 
                               (dbUri.getPort() != -1 ? ":" + dbUri.getPort() : "") + 
                               dbUri.getPath();
                               
                if (dbUri.getQuery() != null) {
                    dbUrl += "?" + dbUri.getQuery();
                }

                // Thiết lập động các thuộc tính cấu hình cho Spring Boot
                System.setProperty("spring.datasource.url", dbUrl);
                System.setProperty("spring.datasource.driver-class-name", "org.postgresql.Driver");
                System.setProperty("spring.jpa.database-platform", "org.hibernate.dialect.PostgreSQLDialect");
                
                System.out.println("🔌 [DatabaseConfig] Tự động phát hiện và cấu hình kết nối PostgreSQL từ Neon/Render thành công!");
            } catch (URISyntaxException | NullPointerException | ArrayIndexOutOfBoundsException e) {
                System.err.println("❌ [DatabaseConfig] Lỗi phân tích cú pháp URL database: " + e.getMessage());
            }
        }

        SpringApplication.run(BackendApplication.class, args);
    }
}
