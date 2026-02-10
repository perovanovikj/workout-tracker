import React, { useState, useEffect } from 'react';
import { userAPI } from '../services/api';

function UserList({ onSelectUser }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAll();
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users. Make sure the backend is running!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userAPI.create(formData);
      setFormData({ name: '', email: '' });
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      setError('Failed to create user');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userAPI.delete(id);
        fetchUsers();
      } catch (err) {
        setError('Failed to delete user');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="loading">Loading users...</div>;

  return (
    <div className="card">
      <div className="flex-between mb-1">
        <h2>👤 Users</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '➕ Add User'}
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
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your.email@example.com"
              required
            />
          </div>
          <button type="submit" className="btn btn-success">Create User</button>
        </form>
      )}

      {users.length === 0 ? (
        <p style={{textAlign: 'center', color: '#718096', padding: '2rem'}}>
          No users yet. Create your first user to get started!
        </p>
      ) : (
        <ul className="list">
          {users.map((user) => (
            <li key={user.id} className="list-item">
              <div>
                <strong style={{fontSize: '1.1rem', color: '#2d3748'}}>{user.name}</strong>
                <div style={{ color: '#718096', fontSize: '0.9rem', marginTop: '0.25rem' }}>{user.email}</div>
              </div>
              <div className="flex gap-1">
                {onSelectUser && (
                  <button className="btn btn-primary" onClick={() => onSelectUser(user)}>
                    Select
                  </button>
                )}
                <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
