package com.workout.tracker.service;

import com.workout.tracker.model.MuscleGroup;
import com.workout.tracker.repository.MuscleGroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MuscleGroupService {
    private final MuscleGroupRepository muscleGroupRepository;
    
    public List<MuscleGroup> getAllMuscleGroups() { return muscleGroupRepository.findAll(); }
    
    public MuscleGroup getMuscleGroupById(Long id) {
        return muscleGroupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Muscle group not found with id: " + id));
    }
    
    @Transactional
    public MuscleGroup createMuscleGroup(MuscleGroup muscleGroup) {
        return muscleGroupRepository.save(muscleGroup);
    }
    
    @Transactional
    public MuscleGroup updateMuscleGroup(Long id, MuscleGroup muscleGroupDetails) {
        MuscleGroup muscleGroup = getMuscleGroupById(id);
        muscleGroup.setName(muscleGroupDetails.getName());
        muscleGroup.setDescription(muscleGroupDetails.getDescription());
        return muscleGroupRepository.save(muscleGroup);
    }
    
    @Transactional
    public void deleteMuscleGroup(Long id) {
        muscleGroupRepository.delete(getMuscleGroupById(id));
    }
}
