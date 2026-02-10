# 💪 Workout Tracker Frontend

Beautiful React frontend for the Workout Tracker application.

## Features

- ✅ Modern, responsive UI with gradient design
- ✅ User management
- ✅ Muscle group creation
- ✅ Exercise library
- ✅ Complete workout tracking
- ✅ View workout history
- ✅ Track sets, reps, and weight

## How to Run

### Prerequisites
- Node.js 16+ installed
- Backend API running on http://localhost:8080

### Installation & Start

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at `http://localhost:3000`

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/          # Reusable components
│   │   ├── UserList.js
│   │   ├── MuscleGroupList.js
│   │   ├── ExerciseList.js
│   │   ├── WorkoutList.js
│   │   └── WorkoutForm.js
│   ├── pages/              # Page components
│   │   ├── Home.js
│   │   └── Exercises.js
│   ├── services/           # API calls
│   │   └── api.js
│   ├── App.js             # Main app
│   ├── App.css            # Styles
│   └── index.js           # Entry point
└── package.json
```

## Usage Flow

1. **Go to Exercises Page**
   - Create muscle groups (Chest, Back, Legs, etc.)
   - Create exercises and assign them to muscle groups

2. **Go to Home Page**
   - Create or select a user
   - Click "Create New Workout"
   - Add exercises to your workout
   - Add sets with weight and reps
   - Submit!

3. **View History**
   - See all your past workouts
   - Click to expand and see details

## Available Scripts

- `npm start` - Run development server
- `npm build` - Create production build
- `npm test` - Run tests

## API Configuration

The frontend expects the backend at `http://localhost:8080`

To change this, edit `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://your-api-url:8080/api';
```

## Technologies Used

- React 18
- React Router v6
- Axios
- CSS3 with Gradients
