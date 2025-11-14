package com.noxa.backend.dto.response;

import com.noxa.backend.entity.MenuItem;

public class MenuItemResponse {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private String category;
    private String imageUrl;

    public static MenuItemResponse from(MenuItem item) {
        MenuItemResponse res = new MenuItemResponse();
        res.id = item.getId();
        res.name = item.getName();
        res.description = item.getDescription();
        res.price = item.getPrice();
        res.category = item.getCategory();
        res.imageUrl = item.getImageUrl();
        return res;
    }

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public Double getPrice() { return price; }
    public String getCategory() { return category; }
    public String getImageUrl() { return imageUrl; }
}