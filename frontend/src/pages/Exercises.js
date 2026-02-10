import React from 'react';
import ExerciseList from '../components/ExerciseList';
import MuscleGroupList from '../components/MuscleGroupList';

function Exercises() {
  return (
    <div className="container">
      <h1 style={{ marginBottom: '2rem', color: 'white', textAlign: 'center', fontSize: '2.5rem' }}>
        🏋️ Exercise Management
      </h1>
      
      <MuscleGroupList />
      
      <div style={{ marginTop: '2rem' }}>
        <ExerciseList />
      </div>
    </div>
  );
}

export default Exercises;
