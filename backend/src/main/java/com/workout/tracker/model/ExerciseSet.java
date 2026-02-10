package com.workout.tracker.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "exercise_sets")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseSet {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_in_workout_id", nullable = false)
    @JsonIgnore
    private ExerciseInWorkout exerciseInWorkout;
    
    @Column(name = "set_number", nullable = false)
    private Integer setNumber;
    
    @Column(nullable = false)
    private Integer reps;
    
    @Column(nullable = false)
    private Double weight;
    
    private String notes;
}
