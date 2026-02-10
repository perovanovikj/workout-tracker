# 🏋️ Workout Tracker - Backend API

A Spring Boot REST API for tracking workouts with PostgreSQL database.

## 📋 Features

- **User Management**: Create and manage users
- **Muscle Groups**: Categorize exercises by muscle groups
- **Exercises**: Define exercises with descriptions
- **Workouts**: Create complete workouts with:
  - Multiple exercises per workout
  - Multiple sets per exercise
  - Track weight and reps for each set
  - Notes at workout, exercise, and set levels

## 🚀 Quick Start with Docker

### Prerequisites
- Docker Desktop installed and running
- 4GB RAM available for Docker

### Run the Application

1. **Clone or extract this project**

2. **Navigate to the project directory**:
   ```bash
   cd workout-tracker
   ```

3. **Start both backend and database with one command**:
   ```bash
   docker-compose up --build
   ```

4. **Wait for the application to start** (you'll see "Started WorkoutTrackerApplication")

5. **Test the API**:
   ```bash
   curl http://localhost:8080/api/users
   ```

The API is now running at `http://localhost:8080`

### Stop the Application
```bash
docker-compose down
```

### Clean Everything (including database data)
```bash
docker-compose down -v
```

## 📊 Database Schema

```
User (1) ───< Workout (N)
               │
               └───< ExerciseInWorkout (N) ──< ExerciseSet (N)
                              │
                              └──> Exercise (1) ──> MuscleGroup (1)
```

## 🔌 API Endpoints

### Users
- `GET    /api/users` - Get all users
- `GET    /api/users/{id}` - Get user by ID
- `POST   /api/users` - Create user
- `PUT    /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Muscle Groups
- `GET    /api/muscle-groups` - Get all muscle groups
- `GET    /api/muscle-groups/{id}` - Get muscle group by ID
- `POST   /api/muscle-groups` - Create muscle group
- `PUT    /api/muscle-groups/{id}` - Update muscle group
- `DELETE /api/muscle-groups/{id}` - Delete muscle group

### Exercises
- `GET    /api/exercises` - Get all exercises
- `GET    /api/exercises/{id}` - Get exercise by ID
- `GET    /api/exercises/muscle-group/{id}` - Get exercises by muscle group
- `POST   /api/exercises` - Create exercise
- `PUT    /api/exercises/{id}` - Update exercise
- `DELETE /api/exercises/{id}` - Delete exercise

### Workouts
- `GET    /api/workouts` - Get all workouts
- `GET    /api/workouts/{id}` - Get workout by ID
- `GET    /api/workouts/user/{userId}` - Get user's workouts
- `POST   /api/workouts` - Create workout
- `PUT    /api/workouts/{id}` - Update workout
- `DELETE /api/workouts/{id}` - Delete workout

## 📝 Example API Calls

### 1. Create a User
```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
  }'
```

### 2. Create a Muscle Group
```bash
curl -X POST http://localhost:8080/api/muscle-groups \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Chest",
    "description": "Chest muscles"
  }'
```

### 3. Create an Exercise
```bash
curl -X POST http://localhost:8080/api/exercises \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bench Press",
    "description": "Barbell bench press",
    "muscleGroup": {"id": 1}
  }'
```

### 4. Create a Workout
```bash
curl -X POST http://localhost:8080/api/workouts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Chest Day",
    "notes": "Feeling strong!",
    "workoutDate": "2025-02-01T10:00:00",
    "userId": 1,
    "exercises": [
      {
        "exerciseId": 1,
        "order": 1,
        "notes": "Good form",
        "sets": [
          {"setNumber": 1, "reps": 10, "weight": 60, "notes": "Warm up"},
          {"setNumber": 2, "reps": 8, "weight": 80, "notes": ""},
          {"setNumber": 3, "reps": 6, "weight": 90, "notes": "PR!"}
        ]
      }
    ]
  }'
```

## 🛠️ Development Setup (without Docker)

### Prerequisites
- Java 17+
- Maven 3.6+
- PostgreSQL 15+

### Setup Database
```sql
CREATE DATABASE workoutdb;
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE workoutdb TO postgres;
```

### Run Locally
```bash
cd backend
mvn spring-boot:run
```

## 🐳 Docker Details

### Services
- **postgres**: PostgreSQL 15 Alpine - Database
- **backend**: Spring Boot 3.2.1 - REST API

### Ports
- **5432**: PostgreSQL database
- **8080**: Backend API

### Volumes
- **postgres_data**: Persists database data

### Networks
- **workout-network**: Bridge network for service communication

## 📂 Project Structure

```
workout-tracker/
├── backend/
│   ├── src/main/java/com/workout/tracker/
│   │   ├── model/              # JPA entities
│   │   ├── repository/         # Data access layer
│   │   ├── service/            # Business logic
│   │   ├── controller/         # REST controllers
│   │   ├── dto/                # Data transfer objects
│   │   └── WorkoutTrackerApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── Dockerfile
│   └── pom.xml
└── docker-compose.yml
```

## 🔧 Configuration

Environment variables (already set in docker-compose.yml):
- `DB_HOST`: Database host (default: localhost)
- `DB_PORT`: Database port (default: 5432)
- `DB_NAME`: Database name (default: workoutdb)
- `DB_USERNAME`: Database user (default: postgres)
- `DB_PASSWORD`: Database password (default: postgres)

## 🧪 Testing the API

Use the provided test script:

```bash
# Create test data
./test-api.sh
```

Or use tools like:
- **curl** (command line)
- **Postman** (GUI)
- **httpie** (command line)
- **Thunder Client** (VS Code extension)

## 📊 Database Access

Connect to the PostgreSQL database:
```bash
docker exec -it workout-postgres psql -U postgres -d workoutdb
```

View tables:
```sql
\dt
```

## 🚨 Troubleshooting

### Port Already in Use
If port 8080 or 5432 is already in use:

**Option 1**: Stop the conflicting service

**Option 2**: Change ports in `docker-compose.yml`:
```yaml
ports:
  - "8081:8080"  # Change 8080 to 8081
```

### Application Won't Start
1. Check Docker is running: `docker ps`
2. View logs: `docker-compose logs backend`
3. Check database: `docker-compose logs postgres`

### Database Connection Failed
```bash
# Restart just the database
docker-compose restart postgres

# Wait 10 seconds, then restart backend
docker-compose restart backend
```

### Clean Restart
```bash
docker-compose down -v
docker-compose up --build
```

## 📦 Next Steps

1. ✅ Backend with Docker - **DONE**
2. 🔄 Create React frontend
3. 🔄 Add frontend to Docker Compose
4. 🔄 Set up GitHub Actions CI/CD
5. 🔄 Deploy to AWS
6. 🔄 Create Kubernetes manifests

## 📄 License

This project is for educational purposes (CI/CD course).

---

**Need help?** Check the logs: `docker-compose logs -f`
