import React, { useState, useEffect } from 'react';
import { muscleGroupAPI } from '../services/api';

function MuscleGroupList() {
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchMuscleGroups();
  }, []);

  const fetchMuscleGroups = async () => {
    try {
      setLoading(true);
      const response = await muscleGroupAPI.getAll();
      setMuscleGroups(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch muscle groups');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await muscleGroupAPI.create(formData);
      setFormData({ name: '', description: '' });
      setShowForm(false);
      fetchMuscleGroups();
    } catch (err) {
      setError('Failed to create muscle group');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this muscle group?')) {
      try {
        await muscleGroupAPI.delete(id);
        fetchMuscleGroups();
      } catch (err) {
        setError('Failed to delete muscle group');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="loading">Loading muscle groups...</div>;

  return (
    <div className="card">
      <div className="flex-between mb-1">
        <h2>💪 Muscle Groups</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '➕ Add Muscle Group'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-1">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Chest, Back, Legs"
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe this muscle group..."
            />
          </div>
          <button type="submit" className="btn btn-success">Create Muscle Group</button>
        </form>
      )}

      {muscleGroups.length === 0 ? (
        <p style={{textAlign: 'center', color: '#718096', padding: '2rem'}}>
          No muscle groups yet. Create some to categorize your exercises!
        </p>
      ) : (
        <div className="grid grid-3">
          {muscleGroups.map((group) => (
            <div key={group.id} className="card">
              <h3>{group.name}</h3>
              <p style={{ color: '#718096', margin: '0.75rem 0', minHeight: '3rem' }}>
                {group.description || 'No description'}
              </p>
              <button className="btn btn-danger" onClick={() => handleDelete(group.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MuscleGroupList;
