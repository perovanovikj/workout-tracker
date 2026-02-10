import React, { useState, useEffect } from 'react';
import { workoutAPI, exerciseAPI } from '../services/api';

function WorkoutForm({ userId, onSuccess }) {
  const [exercises, setExercises] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    notes: '',
    workoutDate: new Date().toISOString().slice(0, 16),
    userId: userId,
    exercises: []
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchExercises();
  }, []);

  useEffect(() => {
    setFormData(prev => ({ ...prev, userId }));
  }, [userId]);

  const fetchExercises = async () => {
    try {
      const response = await exerciseAPI.getAll();
      setExercises(response.data);
    } catch (err) {
      console.error('Failed to fetch exercises', err);
    }
  };

  const addExercise = () => {
    setFormData({
      ...formData,
      exercises: [
        ...formData.exercises,
        {
          exerciseId: '',
          order: formData.exercises.length + 1,
          notes: '',
          sets: []
        }
      ]
    });
  };

  const removeExercise = (index) => {
    const newExercises = formData.exercises.filter((_, i) => i !== index);
    setFormData({ ...formData, exercises: newExercises });
  };

  const updateExercise = (index, field, value) => {
    const newExercises = [...formData.exercises];
    newExercises[index] = { ...newExercises[index], [field]: value };
    setFormData({ ...formData, exercises: newExercises });
  };

  const addSet = (exerciseIndex) => {
    const newExercises = [...formData.exercises];
    if (!newExercises[exerciseIndex].sets) {
      newExercises[exerciseIndex].sets = [];
    }
    newExercises[exerciseIndex].sets.push({
      setNumber: newExercises[exerciseIndex].sets.length + 1,
      reps: 10,
      weight: 0,
      notes: ''
    });
    setFormData({ ...formData, exercises: newExercises });
  };

  const removeSet = (exerciseIndex, setIndex) => {
    const newExercises = [...formData.exercises];
    newExercises[exerciseIndex].sets = newExercises[exerciseIndex].sets.filter((_, i) => i !== setIndex);
    newExercises[exerciseIndex].sets.forEach((set, i) => {
      set.setNumber = i + 1;
    });
    setFormData({ ...formData, exercises: newExercises });
  };

  const updateSet = (exerciseIndex, setIndex, field, value) => {
    const newExercises = [...formData.exercises];
    newExercises[exerciseIndex].sets[setIndex] = {
      ...newExercises[exerciseIndex].sets[setIndex],
      [field]: field === 'reps' || field === 'weight' ? Number(value) : value
    };
    setFormData({ ...formData, exercises: newExercises });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userId) {
      setError('Please select a user first');
      return;
    }

    if (formData.exercises.length === 0) {
      setError('Please add at least one exercise');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await workoutAPI.create(formData);
      
      setFormData({
        name: '',
        notes: '',
        workoutDate: new Date().toISOString().slice(0, 16),
        userId: userId,
        exercises: []
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError('Failed to create workout: ' + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>➕ Create New Workout</h2>
      
      {error && <div className="error">{error}</div>}
      
      {!userId && (
        <div className="error">Please select a user first to create a workout</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Workout Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Monday Chest Day, Full Body"
            required
            disabled={!userId}
          />
        </div>

        <div className="form-group">
          <label>Date & Time</label>
          <input
            type="datetime-local"
            value={formData.workoutDate}
            onChange={(e) => setFormData({ ...formData, workoutDate: e.target.value })}
            disabled={!userId}
          />
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="How did the workout go? Any observations..."
            disabled={!userId}
          />
        </div>

        <div className="form-group">
          <div className="flex-between mb-1">
            <h3>Exercises</h3>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={addExercise}
              disabled={!userId}
            >
              ➕ Add Exercise
            </button>
          </div>

          {formData.exercises.map((exercise, exerciseIndex) => (
            <div key={exerciseIndex} className="card" style={{ marginBottom: '1rem', background: '#f7fafc' }}>
              <div className="flex-between mb-1">
                <h4>Exercise {exerciseIndex + 1}</h4>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={() => removeExercise(exerciseIndex)}
                >
                  ✕ Remove
                </button>
              </div>

              <div className="form-group">
                <label>Exercise *</label>
                <select
                  value={exercise.exerciseId}
                  onChange={(e) => updateExercise(exerciseIndex, 'exerciseId', e.target.value)}
                  required
                >
                  <option value="">Select an exercise</option>
                  {exercises.map((ex) => (
                    <option key={ex.id} value={ex.id}>
                      {ex.name} ({ex.muscleGroup?.name})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Notes</label>
                <input
                  type="text"
                  value={exercise.notes}
                  onChange={(e) => updateExercise(exerciseIndex, 'notes', e.target.value)}
                  placeholder="Exercise-specific notes..."
                />
              </div>

              <div className="flex-between mb-1">
                <h5>Sets</h5>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => addSet(exerciseIndex)}
                >
                  ➕ Add Set
                </button>
              </div>

              {exercise.sets && exercise.sets.map((set, setIndex) => (
                <div key={setIndex} className="set-row" style={{ background: 'white' }}>
                  <span style={{ fontWeight: 'bold', minWidth: '60px' }}>Set {set.setNumber}</span>
                  <input
                    type="number"
                    placeholder="Reps"
                    value={set.reps}
                    onChange={(e) => updateSet(exerciseIndex, setIndex, 'reps', e.target.value)}
                    style={{ width: '80px' }}
                    required
                  />
                  <input
                    type="number"
                    step="0.5"
                    placeholder="Weight (kg)"
                    value={set.weight}
                    onChange={(e) => updateSet(exerciseIndex, setIndex, 'weight', e.target.value)}
                    style={{ width: '120px' }}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Notes"
                    value={set.notes}
                    onChange={(e) => updateSet(exerciseIndex, setIndex, 'notes', e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <button 
                    type="button" 
                    className="btn btn-danger" 
                    onClick={() => removeSet(exerciseIndex, setIndex)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-success" disabled={loading || !userId} style={{width: '100%', padding: '1.25rem'}}>
          {loading ? 'Creating Workout...' : '✅ Create Workout'}
        </button>
      </form>
    </div>
  );
}

export default WorkoutForm;
