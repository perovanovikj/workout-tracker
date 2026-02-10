#!/bin/bash

echo "🏋️  Workout Tracker API Test Script"
echo "===================================="
echo ""

API_URL="http://localhost:8080/api"

echo "1️⃣  Creating a user..."
USER_RESPONSE=$(curl -s -X POST $API_URL/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}')
USER_ID=$(echo $USER_RESPONSE | grep -o '"id":[0-9]*' | grep -o '[0-9]*' | head -1)
echo "✅ User created with ID: $USER_ID"
echo ""

echo "2️⃣  Creating muscle groups..."
curl -s -X POST $API_URL/muscle-groups \
  -H "Content-Type: application/json" \
  -d '{"name": "Chest", "description": "Chest muscles"}' > /dev/null
echo "✅ Created: Chest"

curl -s -X POST $API_URL/muscle-groups \
  -H "Content-Type: application/json" \
  -d '{"name": "Back", "description": "Back muscles"}' > /dev/null
echo "✅ Created: Back"

curl -s -X POST $API_URL/muscle-groups \
  -H "Content-Type: application/json" \
  -d '{"name": "Legs", "description": "Leg muscles"}' > /dev/null
echo "✅ Created: Legs"
echo ""

echo "3️⃣  Creating exercises..."
curl -s -X POST $API_URL/exercises \
  -H "Content-Type: application/json" \
  -d '{"name": "Bench Press", "description": "Barbell bench press", "muscleGroup": {"id": 1}}' > /dev/null
echo "✅ Created: Bench Press"

curl -s -X POST $API_URL/exercises \
  -H "Content-Type: application/json" \
  -d '{"name": "Pull-ups", "description": "Wide grip pull-ups", "muscleGroup": {"id": 2}}' > /dev/null
echo "✅ Created: Pull-ups"

curl -s -X POST $API_URL/exercises \
  -H "Content-Type: application/json" \
  -d '{"name": "Squats", "description": "Barbell back squats", "muscleGroup": {"id": 3}}' > /dev/null
echo "✅ Created: Squats"
echo ""

echo "4️⃣  Creating a workout..."
WORKOUT_DATA='{
  "name": "Full Body Workout",
  "notes": "Feeling strong today!",
  "workoutDate": "2025-02-01T10:00:00",
  "userId": '$USER_ID',
  "exercises": [
    {
      "exerciseId": 1,
      "order": 1,
      "notes": "Good form on all sets",
      "sets": [
        {"setNumber": 1, "reps": 10, "weight": 60, "notes": "Warm up"},
        {"setNumber": 2, "reps": 8, "weight": 80, "notes": ""},
        {"setNumber": 3, "reps": 6, "weight": 90, "notes": "PR!"}
      ]
    },
    {
      "exerciseId": 2,
      "order": 2,
      "notes": "Struggled a bit",
      "sets": [
        {"setNumber": 1, "reps": 8, "weight": 0, "notes": "Bodyweight"},
        {"setNumber": 2, "reps": 6, "weight": 0, "notes": "Bodyweight"}
      ]
    }
  ]
}'

curl -s -X POST $API_URL/workouts \
  -H "Content-Type: application/json" \
  -d "$WORKOUT_DATA" > /dev/null
echo "✅ Workout created!"
echo ""

echo "5️⃣  Fetching user's workouts..."
WORKOUTS=$(curl -s $API_URL/workouts/user/$USER_ID)
echo "$WORKOUTS" | python3 -m json.tool 2>/dev/null || echo "$WORKOUTS"
echo ""

echo "✅ Test Complete!"
echo ""
echo "📊 Summary:"
echo "  - API URL: $API_URL"
echo "  - User ID: $USER_ID"
echo "  - Muscle Groups: 3"
echo "  - Exercises: 3"
echo "  - Workouts: 1"
echo ""
echo "Try these commands:"
echo "  curl $API_URL/users"
echo "  curl $API_URL/muscle-groups"
echo "  curl $API_URL/exercises"
echo "  curl $API_URL/workouts/user/$USER_ID"
