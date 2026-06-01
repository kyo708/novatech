package com.novatech.backend.service;

import com.novatech.backend.model.Product;
import com.novatech.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    /**
     * Tạo sản phẩm mới
     */
    public Product createProduct(Product product) {
        if (product.getId() == null || product.getId().trim().isEmpty()) {
            product.setId("p" + System.currentTimeMillis());
        }
        
        // Thiết lập liên kết hai chiều cho các Review nếu có
        if (product.getReviews() != null) {
            product.getReviews().forEach(r -> r.setProduct(product));
        }
        
        return productRepository.save(product);
    }

    /**
     * Cập nhật thông tin sản phẩm
     */
    public Optional<Product> updateProduct(String id, Product product) {
        return productRepository.findById(id).map(existingProduct -> {
            existingProduct.setName(product.getName());
            existingProduct.setPrice(product.getPrice());
            existingProduct.setOriginalPrice(product.getOriginalPrice());
            existingProduct.setDescription(product.getDescription());
            existingProduct.setCategory(product.getCategory());
            existingProduct.setRating(product.getRating());
            existingProduct.setReviewsCount(product.getReviewsCount());
            existingProduct.setImage(product.getImage());
            existingProduct.setInStock(product.isInStock());
            existingProduct.setStockPercentage(product.getStockPercentage());
            
            existingProduct.setFeatures(product.getFeatures());
            existingProduct.setColors(product.getColors());
            existingProduct.setTags(product.getTags());
            existingProduct.setImages(product.getImages());
            existingProduct.setSpecs(product.getSpecs());

            // Cập nhật các reviews nếu có truyền lên
            if (product.getReviews() != null) {
                existingProduct.getReviews().clear();
                product.getReviews().forEach(r -> {
                    r.setProduct(existingProduct);
                    existingProduct.getReviews().add(r);
                });
            }
            
            return productRepository.save(existingProduct);
        });
    }

    /**
     * Xóa sản phẩm theo ID
     */
    public boolean deleteProduct(String id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
