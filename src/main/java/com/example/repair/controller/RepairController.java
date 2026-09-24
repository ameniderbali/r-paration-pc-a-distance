package com.example.repair.controller;

import com.example.repair.model.Repair;
import com.example.repair.repository.RepairRepository;
import com.example.repair.dto.RemoteAccessDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/repairs")
@CrossOrigin(origins = "http://localhost:4200")
public class RepairController {

    @Autowired
    private RepairRepository repairRepository;

    // Récupérer toutes les réparations
    @GetMapping
    public List<Repair> getAllRepairs() {
        return repairRepository.findAll();
    }

    // Créer une nouvelle réparation
    @PostMapping
    public Repair createRepair(@RequestBody Repair repair) {
        repair.setStatus("En attente");
        return repairRepository.save(repair);
    }

    // ✅ Mettre à jour seulement le remote access
    @PutMapping("/{id}/remote")
    public Repair updateRemoteAccess(@PathVariable Long id, @RequestBody RemoteAccessDTO dto) {

        Repair repair = repairRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Réparation non trouvée"));

        repair.setTeamviewerId(dto.getTeamviewerId());
        repair.setTeamviewerPassword(dto.getTeamviewerPassword());
        repair.setStatus("En cours (remote)");

        return repairRepository.save(repair);
    }
    // 🔁 Changer le status
    @PutMapping("/{id}/status")
    public Repair updateStatus(@PathVariable Long id) {
        Repair repair = repairRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Réparation non trouvée"));

        String status = repair.getStatus();

        if (status.equals("En attente")) {
            repair.setStatus("En cours");
        }
        else if (status.equals("En cours") || status.equals("En cours (remote)")) {
            repair.setStatus("Terminé");
        }
        else if (status.equals("Terminé")) {
            repair.setStatus("En attente");
        }

        return repairRepository.save(repair);
    }

    // ❌ Supprimer une réparation
    @DeleteMapping("/{id}")
    public void deleteRepair(@PathVariable Long id) {
        repairRepository.deleteById(id);
    }

}
