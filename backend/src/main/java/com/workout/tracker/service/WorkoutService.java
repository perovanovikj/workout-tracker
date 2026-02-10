package com.workout.tracker.service;

import com.workout.tracker.dto.*;
import com.workout.tracker.model.*;
import com.workout.tracker.repository.WorkoutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkoutService {
    private final WorkoutRepository workoutRepository;
    private final UserService userService;
    private final ExerciseService exerciseService;
    
    public List<Workout> getAllWorkouts() { return workoutRepository.findAll(); }
    
    public Workout getWorkoutById(Long id) {
        return workoutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout not found with id: " + id));
    }
    
    public List<Workout> getWorkoutsByUserId(Long userId) {
        return workoutRepository.findByUserIdOrderByWorkoutDateDesc(userId);
    }
    
    @Transactional
    public Workout createWorkout(WorkoutRequest request) {
        User user = userService.getUserById(request.getUserId());
        
        Workout workout = new Workout();
        workout.setName(request.getName());
        workout.setNotes(request.getNotes());
        workout.setWorkoutDate(request.getWorkoutDate());
        workout.setUser(user);
        
        workout = workoutRepository.save(workout);
        
        if (request.getExercises() != null && !request.getExercises().isEmpty()) {
            for (ExerciseInWorkoutRequest exerciseRequest : request.getExercises()) {
                ExerciseInWorkout exerciseInWorkout = createExerciseInWorkout(workout, exerciseRequest);
                workout.getExercises().add(exerciseInWorkout);
            }
        }
        
        return workoutRepository.save(workout);
    }
    
    private ExerciseInWorkout createExerciseInWorkout(Workout workout, ExerciseInWorkoutRequest request) {
        Exercise exercise = exerciseService.getExerciseById(request.getExerciseId());
        
        ExerciseInWorkout exerciseInWorkout = new ExerciseInWorkout();
        exerciseInWorkout.setWorkout(workout);
        exerciseInWorkout.setExercise(exercise);
        exerciseInWorkout.setOrder(request.getOrder());
        exerciseInWorkout.setNotes(request.getNotes());
        
        if (request.getSets() != null && !request.getSets().isEmpty()) {
            for (ExerciseSetRequest setRequest : request.getSets()) {
                ExerciseSet exerciseSet = new ExerciseSet();
                exerciseSet.setExerciseInWorkout(exerciseInWorkout);
                exerciseSet.setSetNumber(setRequest.getSetNumber());
                exerciseSet.setReps(setRequest.getReps());
                exerciseSet.setWeight(setRequest.getWeight());
                exerciseSet.setNotes(setRequest.getNotes());
                exerciseInWorkout.getSets().add(exerciseSet);
            }
        }
        
        return exerciseInWorkout;
    }
    
    @Transactional
    public Workout updateWorkout(Long id, WorkoutRequest request) {
        Workout workout = getWorkoutById(id);
        workout.setName(request.getName());
        workout.setNotes(request.getNotes());
        workout.setWorkoutDate(request.getWorkoutDate());
        workout.getExercises().clear();
        
        if (request.getExercises() != null && !request.getExercises().isEmpty()) {
            for (ExerciseInWorkoutRequest exerciseRequest : request.getExercises()) {
                ExerciseInWorkout exerciseInWorkout = createExerciseInWorkout(workout, exerciseRequest);
                workout.getExercises().add(exerciseInWorkout);
            }
        }
        
        return workoutRepository.save(workout);
    }
    
    @Transactional
    public void deleteWorkout(Long id) {
        workoutRepository.delete(getWorkoutById(id));
    }
}
