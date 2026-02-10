import React, { useState } from 'react';
import UserList from '../components/UserList';
import WorkoutList from '../components/WorkoutList';
import WorkoutForm from '../components/WorkoutForm';

function Home() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setShowWorkoutForm(false);
  };

  const handleWorkoutSuccess = () => {
    setShowWorkoutForm(false);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="container">
      <h1 style={{ marginBottom: '2rem', color: 'white', textAlign: 'center', fontSize: '2.5rem' }}>
        💪 Workout Tracker
      </h1>
      
      <UserList onSelectUser={handleUserSelect} />

      {selectedUser && (
        <div className="highlight-box">
          <h3>Selected User: {selectedUser.name}</h3>
          <p style={{margin: '0.5rem 0', color: '#5a67d8'}}>{selectedUser.email}</p>
          <button 
            className="btn btn-primary" 
            onClick={() => setShowWorkoutForm(!showWorkoutForm)}
            style={{marginTop: '1rem'}}
          >
            {showWorkoutForm ? '📊 View Workouts' : '➕ Create New Workout'}
          </button>
        </div>
      )}

      {selectedUser && showWorkoutForm ? (
        <WorkoutForm 
          userId={selectedUser.id} 
          onSuccess={handleWorkoutSuccess}
        />
      ) : (
        selectedUser && <WorkoutList key={refreshKey} userId={selectedUser.id} />
      )}
    </div>
  );
}

export default Home;
