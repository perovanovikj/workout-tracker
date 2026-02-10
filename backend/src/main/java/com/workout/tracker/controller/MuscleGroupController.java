package com.workout.tracker.controller;

import com.workout.tracker.model.MuscleGroup;
import com.workout.tracker.service.MuscleGroupService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/muscle-groups")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MuscleGroupController {
    private final MuscleGroupService muscleGroupService;
    
    @GetMapping
    public ResponseEntity<List<MuscleGroup>> getAllMuscleGroups() {
        return ResponseEntity.ok(muscleGroupService.getAllMuscleGroups());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<MuscleGroup> getMuscleGroupById(@PathVariable Long id) {
        return ResponseEntity.ok(muscleGroupService.getMuscleGroupById(id));
    }
    
    @PostMapping
    public ResponseEntity<MuscleGroup> createMuscleGroup(@Valid @RequestBody MuscleGroup muscleGroup) {
        return ResponseEntity.status(HttpStatus.CREATED).body(muscleGroupService.createMuscleGroup(muscleGroup));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<MuscleGroup> updateMuscleGroup(@PathVariable Long id, @Valid @RequestBody MuscleGroup muscleGroup) {
        return ResponseEntity.ok(muscleGroupService.updateMuscleGroup(id, muscleGroup));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMuscleGroup(@PathVariable Long id) {
        muscleGroupService.deleteMuscleGroup(id);
        return ResponseEntity.noContent().build();
    }
}
