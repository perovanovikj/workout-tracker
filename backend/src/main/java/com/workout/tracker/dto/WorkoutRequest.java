package com.workout.tracker.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class WorkoutRequest {
    private String name;
    private String notes;
    private LocalDateTime workoutDate;
    private Long userId;
    private List<ExerciseInWorkoutRequest> exercises;
}
