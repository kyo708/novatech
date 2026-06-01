package com.novatech.backend.controller;

import com.novatech.backend.model.*;
import com.novatech.backend.repository.CustomerRepository;
import com.novatech.backend.repository.OrderRepository;
import com.novatech.backend.repository.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    private final CustomerRepository customerRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderController(CustomerRepository customerRepository, 
                           OrderRepository orderRepository, 
                           ProductRepository productRepository) {
        this.customerRepository = customerRepository;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> placeOrder(@RequestBody OrderRequest orderRequest) {
        // Tạo mã đơn hàng ngẫu nhiên
        String orderId = "NT-" + (10000 + new Random().nextInt(90000));

        // 1. Kiểm tra xem khách hàng có email này đã tồn tại chưa
        Customer customer = customerRepository.findByEmail(orderRequest.getEmail())
                .orElseGet(() -> {
                    // Nếu chưa tồn tại, tự động tạo khách hàng mới
                    Customer newCustomer = new Customer(
                            orderRequest.getName(),
                            orderRequest.getEmail(),
                            null, // Chưa có số điện thoại
                            orderRequest.getAddress()
                    );
                    return customerRepository.save(newCustomer);
                });

        // 2. Tạo đơn hàng (Order) liên kết tới Khách hàng vừa tìm thấy/tạo mới
        Order order = new Order(
                orderId,
                customer,
                orderRequest.getName(),
                orderRequest.getEmail(),
                orderRequest.getAddress(),
                orderRequest.getPaymentMethod(),
                orderRequest.getTotalAmount()
        );

        // 3. Chuyển đổi và thiết lập chi tiết đơn hàng (OrderDetail)
        List<OrderDetail> orderDetails = new ArrayList<>();
        for (OrderRequest.CartItemDto itemDto : orderRequest.getItems()) {
            Product product = productRepository.findById(itemDto.getProductId()).orElse(null);
            
            OrderDetail detail = new OrderDetail(
                    product,
                    itemDto.getProductName(),
                    itemDto.getQuantity(),
                    itemDto.getSelectedColor(),
                    itemDto.getPrice()
            );
            detail.setOrder(order); // Liên kết ngược
            orderDetails.add(detail);
        }
        order.setItems(orderDetails);

        // 4. Lưu đơn hàng vào Database (Tự động lưu kèm các bản ghi OrderDetail nhờ CascadeType.ALL)
        orderRepository.save(order);

        // 5. In log đơn hàng trực quan ra console
        System.out.println("================================================");
        System.out.println("🎉 TIẾP NHẬN ĐƠN HÀNG (DATABASE): " + orderId);
        System.out.println("------------------------------------------------");
        System.out.println("Khách hàng ID: " + customer.getId() + " | Tên: " + customer.getFullName());
        System.out.println("Email:         " + order.getEmail());
        System.out.println("Địa chỉ giao:  " + order.getAddress());
        System.out.println("Thanh toán:    " + order.getPaymentMethod());
        System.out.println("Tổng tiền:     $" + order.getTotalAmount());
        System.out.println("Sản phẩm đặt mua:");
        for (OrderDetail item : order.getItems()) {
            System.out.println("  - [ID: " + (item.getProduct() != null ? item.getProduct().getId() : "N/A") + "] " 
                    + item.getProductName() 
                    + " | Màu: " + item.getSelectedColor() 
                    + " | SL: " + item.getQuantity() 
                    + " | Đơn giá: $" + item.getPrice());
        }
        System.out.println("================================================");

        // Trả về phản hồi cho React frontend
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Đơn hàng đã được lưu trữ thành công vào Database!");
        response.put("orderId", orderId);
        response.put("customerName", customer.getFullName());
        response.put("customerId", customer.getId());

        return ResponseEntity.ok(response);
    }
}
