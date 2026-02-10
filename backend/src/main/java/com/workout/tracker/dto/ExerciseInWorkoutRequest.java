package com.workout.tracker.dto;

import lombok.Data;
import java.util.List;

@Data
public class ExerciseInWorkoutRequest {
    private Long exerciseId;
    private Integer order;
    private String notes;
    private List<ExerciseSetRequest> sets;
}
