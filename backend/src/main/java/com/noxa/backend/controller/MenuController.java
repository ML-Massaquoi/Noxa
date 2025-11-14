package com.noxa.backend.controller;

import com.noxa.backend.dto.response.MenuItemResponse;
import com.noxa.backend.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/menu")
public class MenuController {

    @Autowired private MenuService menuService;

    @GetMapping
    public List<MenuItemResponse> getAll() {
        return menuService.getAll().stream()
                .map(MenuItemResponse::from)
                .collect(Collectors.toList());
    }
}