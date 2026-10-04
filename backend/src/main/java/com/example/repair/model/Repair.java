package com.example.repair.model;

import jakarta.persistence.*;

@Entity
@Table(name = "repairs")
public class Repair {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false, length = 1000)
    private String problem;

    @Column(nullable = false)
    private String status = "En attente";

    // ✅ Champs pour Remote Access
    private String teamviewerId;
    private String teamviewerPassword;

    // Constructeurs
    public Repair() {}

    public Repair(String name, String email, String phone, String problem,String teamviewerId ,String teamviewerPassword) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.problem = problem;
        this.status = "En attente";
        this.teamviewerId= teamviewerId;
        this.teamviewerPassword= teamviewerPassword;
    }

    // Getters et setters
    public Long getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getProblem() { return problem; }
    public void setProblem(String problem) { this.problem = problem; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getTeamviewerId() { return teamviewerId; }
    public void setTeamviewerId(String teamviewerId) { this.teamviewerId = teamviewerId; }

    public String getTeamviewerPassword() { return teamviewerPassword; }
    public void setTeamviewerPassword(String teamviewerPassword) { this.teamviewerPassword = teamviewerPassword; }
}
