package com.example.repair.controller;

import com.example.repair.dto.*;
import com.example.repair.model.Role;
import com.example.repair.model.User;
import com.example.repair.repository.UserRepository;
import com.example.repair.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (req.role() == Role.ADMIN) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Cannot self-register as ADMIN");
        }
        if (userRepository.existsByEmail(req.email())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already used");
        }
        User u = new User();
        u.setFullName(req.fullName());
        u.setEmail(req.email());
        u.setPassword(passwordEncoder.encode(req.password()));
        u.setRole(req.role() == null ? Role.CLIENT : req.role());
        userRepository.save(u);
        return ResponseEntity.status(HttpStatus.CREATED).body("Registered");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest req) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.email(), req.password()));
        User u = userRepository.findByEmail(req.email()).orElseThrow();
        return ResponseEntity.ok(new AuthResponse(
                jwtService.generateToken(u), u.getEmail(), u.getFullName(), u.getRole()));
    }
}