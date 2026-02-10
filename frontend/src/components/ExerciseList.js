import React, { useState, useEffect } from 'react';
import { exerciseAPI, muscleGroupAPI } from '../services/api';

function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    muscleGroup: { id: '' }
  });

  useEffect(() => {
    fetchExercises();
    fetchMuscleGroups();
  }, []);

  const fetchExercises = async () => {
    try {
      setLoading(true);
      const response = await exerciseAPI.getAll();
      setExercises(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch exercises');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMuscleGroups = async () => {
    try {
      const response = await muscleGroupAPI.getAll();
      setMuscleGroups(response.data);
    } catch (err) {
      console.error('Failed to fetch muscle groups', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await exerciseAPI.create(formData);
      setFormData({ name: '', description: '', muscleGroup: { id: '' } });
      setShowForm(false);
      fetchExercises();
    } catch (err) {
      setError('Failed to create exercise');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this exercise?')) {
      try {
        await exerciseAPI.delete(id);
        fetchExercises();
      } catch (err) {
        setError('Failed to delete exercise');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="loading">Loading exercises...</div>;

  return (
    <div className="card">
      <div className="flex-between mb-1">
        <h2>🏋️ Exercises</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '➕ Add Exercise'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-1">
          <div className="form-group">
            <label>Exercise Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Bench Press, Squats"
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="How to perform this exercise..."
            />
          </div>
          <div className="form-group">
            <label>Muscle Group</label>
            <select
              value={formData.muscleGroup.id}
              onChange={(e) => setFormData({ ...formData, muscleGroup: { id: e.target.value } })}
              required
            >
              <option value="">Select a muscle group</option>
              {muscleGroups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-success">Create Exercise</button>
        </form>
      )}

      {exercises.length === 0 ? (
        <p style={{textAlign: 'center', color: '#718096', padding: '2rem'}}>
          No exercises yet. Create muscle groups first, then add exercises!
        </p>
      ) : (
        <div className="grid grid-2">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="card">
              <h3>{exercise.name}</h3>
              <p style={{ color: '#718096', margin: '0.75rem 0', minHeight: '3rem' }}>
                {exercise.description || 'No description'}
              </p>
              <div style={{ 
                background: 'linear-gradient(135deg, #e0e7ff 0%, #ddd6fe 100%)',
                padding: '0.75rem', 
                borderRadius: '8px',
                marginBottom: '1rem',
                fontWeight: '600',
                color: '#5a67d8'
              }}>
                💪 {exercise.muscleGroup?.name}
              </div>
              <button className="btn btn-danger" onClick={() => handleDelete(exercise.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExerciseList;
