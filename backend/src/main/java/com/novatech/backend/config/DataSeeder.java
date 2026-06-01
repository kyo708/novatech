package com.novatech.backend.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.novatech.backend.model.Product;
import com.novatech.backend.model.Review;
import com.novatech.backend.model.User;
import com.novatech.backend.repository.ProductRepository;
import com.novatech.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@Component
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ObjectMapper objectMapper;

    public DataSeeder(ProductRepository productRepository, UserRepository userRepository,
                      PasswordEncoder passwordEncoder, ObjectMapper objectMapper) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        // Khởi tạo tài khoản Admin mặc định nếu chưa tồn tại
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User(
                "admin",
                passwordEncoder.encode("admin123"),
                "admin@novatech.com",
                "ROLE_ADMIN"
            );
            userRepository.save(admin);
            System.out.println("👑 Tài khoản Admin mặc định đã được khởi tạo thành công: admin / admin123");
        }

        System.out.println("🌱 Bắt đầu kiểm tra và đồng bộ hóa dữ liệu từ products-seed.json...");

        try {
            // Đọc file products-seed.json từ classpath resources
            ClassPathResource resource = new ClassPathResource("products-seed.json");
            InputStream inputStream = resource.getInputStream();

            // Giải tuần tự hóa danh sách sản phẩm bằng Jackson
            List<Product> seedProducts = objectMapper.readValue(inputStream, new TypeReference<List<Product>>() {});

            // Duyệt qua từng sản phẩm hạt giống để tạo mới hoặc đồng bộ hóa cập nhật vào CSDL
            for (Product p : seedProducts) {
                // Thiết lập quan hệ hai chiều cho Review
                if (p.getReviews() != null) {
                    for (Review r : p.getReviews()) {
                        r.setProduct(p);
                    }
                }

                Optional<Product> existingProductOpt = productRepository.findById(p.getId());
                if (existingProductOpt.isPresent()) {
                    // Nếu sản phẩm đã tồn tại trong DB, thực hiện cập nhật thông tin mới nhất từ file JSON
                    Product existingProduct = existingProductOpt.get();
                    existingProduct.setName(p.getName());
                    existingProduct.setPrice(p.getPrice());
                    existingProduct.setOriginalPrice(p.getOriginalPrice());
                    existingProduct.setDescription(p.getDescription());
                    existingProduct.setCategory(p.getCategory());
                    existingProduct.setRating(p.getRating());
                    existingProduct.setReviewsCount(p.getReviewsCount());
                    existingProduct.setImage(p.getImage()); // Cập nhật URL ảnh mới nhất (Khắc phục lỗi ảnh hỏng!)
                    existingProduct.setInStock(p.isInStock());
                    existingProduct.setStockPercentage(p.getStockPercentage());
                    
                    // Cập nhật các bảng con/thuộc tính liên kết
                    existingProduct.setFeatures(p.getFeatures());
                    existingProduct.setColors(p.getColors()); // Giúp tránh vấn đề Hibernate Collection references nếu cần, nhưng gán trực tiếp cũng rất tốt
                    existingProduct.setTags(p.getTags());
                    existingProduct.setImages(p.getImages()); // Đồng bộ hóa mảng ảnh chi tiết mới
                    existingProduct.setSpecs(p.getSpecs());

                    // Cập nhật reviews
                    existingProduct.getReviews().clear();
                    if (p.getReviews() != null) {
                        for (Review r : p.getReviews()) {
                            existingProduct.getReviews().add(r);
                        }
                    }
                    
                    productRepository.save(existingProduct);
                } else {
                    // Nếu sản phẩm chưa tồn tại, lưu mới vào CSDL
                    productRepository.save(p);
                }
            }

            System.out.println("🎉 ĐỒNG BỘ DỮ LIỆU THÀNH CÔNG! Toàn bộ sản phẩm đã được đồng bộ hóa từ JSON vào Database.");
        } catch (Exception e) {
            System.err.println("❌ LỖI KHI ĐỒNG BỘ HÓA DỮ LIỆU HẠT GIỐNG: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
