package com.workout.tracker.service;

import com.workout.tracker.model.Exercise;
import com.workout.tracker.model.MuscleGroup;
import com.workout.tracker.repository.ExerciseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExerciseService {
    private final ExerciseRepository exerciseRepository;
    private final MuscleGroupService muscleGroupService;
    
    public List<Exercise> getAllExercises() { return exerciseRepository.findAll(); }
    
    public Exercise getExerciseById(Long id) {
        return exerciseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercise not found with id: " + id));
    }
    
    public List<Exercise> getExercisesByMuscleGroup(Long muscleGroupId) {
        return exerciseRepository.findByMuscleGroupId(muscleGroupId);
    }
    
    @Transactional
    public Exercise createExercise(Exercise exercise) {
        if (exercise.getMuscleGroup() != null && exercise.getMuscleGroup().getId() != null) {
            MuscleGroup muscleGroup = muscleGroupService.getMuscleGroupById(exercise.getMuscleGroup().getId());
            exercise.setMuscleGroup(muscleGroup);
        }
        return exerciseRepository.save(exercise);
    }
    
    @Transactional
    public Exercise updateExercise(Long id, Exercise exerciseDetails) {
        Exercise exercise = getExerciseById(id);
        exercise.setName(exerciseDetails.getName());
        exercise.setDescription(exerciseDetails.getDescription());
        if (exerciseDetails.getMuscleGroup() != null && exerciseDetails.getMuscleGroup().getId() != null) {
            MuscleGroup muscleGroup = muscleGroupService.getMuscleGroupById(exerciseDetails.getMuscleGroup().getId());
            exercise.setMuscleGroup(muscleGroup);
        }
        return exerciseRepository.save(exercise);
    }
    
    @Transactional
    public void deleteExercise(Long id) {
        exerciseRepository.delete(getExerciseById(id));
    }
}
