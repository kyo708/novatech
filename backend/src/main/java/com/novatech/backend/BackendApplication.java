package com.novatech.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        List<String> activeArgs = new ArrayList<>(Arrays.asList(args));
        
        // Tìm kiếm biến môi trường chứa URL database một cách không phân biệt hoa thường và định dạng kí tự (fuzzily)
        String databaseUrl = null;
        for (String key : System.getenv().keySet()) {
            String keyNormalized = key.toLowerCase().replace("_", "").replace("-", "").replace(".", "");
            if (keyNormalized.equals("databaseurl") || keyNormalized.equals("springdatasourceurl")) {
                databaseUrl = System.getenv(key);
                if (databaseUrl != null) {
                    databaseUrl = databaseUrl.trim(); // Loại bỏ khoảng trắng thừa nếu copy-paste lỗi
                }
                break;
            }
        }

        if (databaseUrl != null && (databaseUrl.startsWith("postgres://") || databaseUrl.startsWith("postgresql://"))) {
            try {
                // Đổi postgresql:// hoặc postgres:// thành định dạng phù hợp để lấy URI
                String cleanedUrl = databaseUrl.replace("postgresql://", "postgres://");
                URI dbUri = new URI(cleanedUrl);
                
                String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + 
                               (dbUri.getPort() != -1 ? ":" + dbUri.getPort() : "") + 
                               dbUri.getPath();
                               
                if (dbUri.getQuery() != null) {
                    dbUrl += "?" + dbUri.getQuery();
                }

                // Ghi đè cấu hình Spring Boot thông qua Command Line Arguments (độ ưu tiên cao nhất, vượt qua cả OS Environment Variables)
                activeArgs.add("--spring.datasource.url=" + dbUrl);
                activeArgs.add("--spring.datasource.driver-class-name=org.postgresql.Driver");
                activeArgs.add("--spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect");

                if (dbUri.getUserInfo() != null) {
                    String username = dbUri.getUserInfo().split(":")[0];
                    String password = dbUri.getUserInfo().split(":")[1];
                    activeArgs.add("--spring.datasource.username=" + username);
                    activeArgs.add("--spring.datasource.password=" + password);
                }
                
                System.out.println("🔌 [DatabaseConfig] Tự động cấu hình ghi đè tham số kết nối PostgreSQL từ Neon/Render thành công!");
            } catch (URISyntaxException | NullPointerException | ArrayIndexOutOfBoundsException e) {
                System.err.println("❌ [DatabaseConfig] Lỗi phân tích cú pháp URL database: " + e.getMessage());
            }
        }

        SpringApplication.run(BackendApplication.class, activeArgs.toArray(new String[0]));
    }
}
