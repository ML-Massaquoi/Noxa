package com.noxa.backend.service;

import com.noxa.backend.entity.MenuItem;
import com.noxa.backend.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {

    @Autowired private MenuItemRepository menuItemRepository;

    public List<MenuItem> getAll() {
        return menuItemRepository.findAll();
    }

    public MenuItem getById(Long id) {
        return menuItemRepository.findById(id).orElseThrow();
    }
}