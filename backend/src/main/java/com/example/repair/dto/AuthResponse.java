package com.example.repair.dto;

import com.example.repair.model.Role;

public record AuthResponse(String token, String email, String fullName, Role role) {}