import React, { useState, useEffect } from 'react';
import { workoutAPI } from '../services/api';

function WorkoutList({ userId }) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedWorkout, setExpandedWorkout] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchWorkouts();
    }
  }, [userId]);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const response = await workoutAPI.getByUser(userId);
      setWorkouts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch workouts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        await workoutAPI.delete(id);
        fetchWorkouts();
      } catch (err) {
        setError('Failed to delete workout');
        console.error(err);
      }
    }
  };

  const toggleExpand = (workoutId) => {
    setExpandedWorkout(expandedWorkout === workoutId ? null : workoutId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!userId) {
    return (
      <div className="card">
        <h2>📊 Your Workouts</h2>
        <p style={{textAlign: 'center', color: '#718096', padding: '2rem'}}>
          Please select a user to view their workouts.
        </p>
      </div>
    );
  }

  if (loading) return <div className="loading">Loading workouts...</div>;

  return (
    <div className="card">
      <h2>📊 Your Workouts</h2>
      {error && <div className="error">{error}</div>}

      {workouts.length === 0 ? (
        <p style={{textAlign: 'center', color: '#718096', padding: '2rem'}}>
          No workouts yet. Create your first workout to start tracking your progress!
        </p>
      ) : (
        <div>
          {workouts.map((workout) => (
            <div key={workout.id} className="workout-card card" style={{ marginBottom: '1rem' }}>
              <div className="flex-between" onClick={() => toggleExpand(workout.id)} style={{ cursor: 'pointer' }}>
                <div>
                  <h3>{workout.name}</h3>
                  <p style={{ color: '#718096', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                    📅 {formatDate(workout.workoutDate)}
                  </p>
                </div>
                <div className="flex gap-1" style={{alignItems: 'center'}}>
                  <button 
                    className="btn btn-danger" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(workout.id);
                    }}
                  >
                    Delete
                  </button>
                  <span style={{ fontSize: '1.5rem', marginLeft: '0.5rem' }}>
                    {expandedWorkout === workout.id ? '▼' : '▶'}
                  </span>
                </div>
              </div>

              {workout.notes && (
                <p style={{ marginTop: '1rem', fontStyle: 'italic', color: '#4a5568' }}>
                  📝 {workout.notes}
                </p>
              )}

              {expandedWorkout === workout.id && workout.exercises && workout.exercises.length > 0 && (
                <div className="exercise-list">
                  <h4 style={{marginBottom: '1rem', color: '#2d3748'}}>Exercises:</h4>
                  {workout.exercises.map((exerciseInWorkout) => (
                    <div key={exerciseInWorkout.id} className="exercise-item">
                      <h4>🏋️ {exerciseInWorkout.exercise.name}</h4>
                      {exerciseInWorkout.notes && (
                        <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#718096', marginTop: '0.5rem' }}>
                          {exerciseInWorkout.notes}
                        </p>
                      )}
                      
                      {exerciseInWorkout.sets && exerciseInWorkout.sets.length > 0 && (
                        <div className="sets-container">
                          {exerciseInWorkout.sets.map((set) => (
                            <div key={set.id} className="set-row">
                              <div className="set-info">
                                <span>Set {set.setNumber}</span>
                                <span>{set.reps} reps</span>
                                <span>{set.weight} kg</span>
                                {set.notes && <span style={{ fontStyle: 'italic' }}>- {set.notes}</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkoutList;
