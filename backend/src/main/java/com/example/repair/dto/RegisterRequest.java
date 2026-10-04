package com.example.repair.dto;

import com.example.repair.model.Role;

public record RegisterRequest(String fullName, String email, String password, Role role) {}