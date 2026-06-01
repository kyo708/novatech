package com.novatech.backend.model;

import java.util.List;

public class OrderRequest {
    private String name;
    private String email;
    private String address;
    private String paymentMethod;
    private double totalAmount;
    private List<CartItemDto> items;

    public static class CartItemDto {
        private String productId;
        private String productName;
        private int quantity;
        private String selectedColor;
        private double price;

        // Constructors
        public CartItemDto() {}

        public CartItemDto(String productId, String productName, int quantity, String selectedColor, double price) {
            this.productId = productId;
            this.productName = productName;
            this.quantity = quantity;
            this.selectedColor = selectedColor;
            this.price = price;
        }

        // Getters and Setters
        public String getProductId() {
            return productId;
        }

        public void setProductId(String productId) {
            this.productId = productId;
        }

        public String getProductName() {
            return productName;
        }

        public void setProductName(String productName) {
            this.productName = productName;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }

        public String getSelectedColor() {
            return selectedColor;
        }

        public void setSelectedColor(String selectedColor) {
            this.selectedColor = selectedColor;
        }

        public double getPrice() {
            return price;
        }

        public void setPrice(double price) {
            this.price = price;
        }
    }

    // Constructors
    public OrderRequest() {}

    public OrderRequest(String name, String email, String address, String paymentMethod, double totalAmount, List<CartItemDto> items) {
        this.name = name;
        this.email = email;
        this.address = address;
        this.paymentMethod = paymentMethod;
        this.totalAmount = totalAmount;
        this.items = items;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public List<CartItemDto> getItems() {
        return items;
    }

    public void setItems(List<CartItemDto> items) {
        this.items = items;
    }
}
