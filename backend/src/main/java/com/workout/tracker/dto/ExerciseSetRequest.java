package com.workout.tracker.dto;

import lombok.Data;

@Data
public class ExerciseSetRequest {
    private Integer setNumber;
    private Integer reps;
    private Double weight;
    private String notes;
}
