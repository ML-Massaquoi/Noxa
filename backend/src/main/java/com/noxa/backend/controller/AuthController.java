package com.noxa.backend.controller;

import com.noxa.backend.dto.request.LoginRequest;
import com.noxa.backend.dto.request.RegisterRequest;
import com.noxa.backend.dto.response.JwtResponse;
import com.noxa.backend.entity.User;
import com.noxa.backend.security.JwtService;
import com.noxa.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private AuthService authService;
    @Autowired private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequest req) {
        User user = new User();
        user.setEmail(req.getEmail());
        user.setPassword(req.getPassword());
        user.setFullName(req.getFullName());
        user.setPhone(req.getPhone());
        return ResponseEntity.ok(authService.register(user));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest req) {
        User user = authService.authenticate(req.getEmail(), req.getPassword());
        String token = jwtService.generateToken(user);
        return ResponseEntity.ok(new JwtResponse(token));
    }
}