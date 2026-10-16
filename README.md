# My Tasks – To-Do Task Manager

React (Vite) frontend · Spring Boot 3 (Java 17) REST API · SQLite database.

## Run locally

**Backend** (needs Java 17+ and Maven)
```bash
cd backend
mvn spring-boot:run          # http://localhost:8080  (creates tasks.db automatically)
mvn test                     # runs the API tests
```

**Frontend** (needs Node 18+)
```bash
cd frontend
npm install
npm run dev                  # http://localhost:5173  (proxies /api to :8080)
```

Tasks are stored in `backend/tasks.db`, so they survive restarts.
To use MySQL, follow the comments in `backend/src/main/resources/application.properties`.

## REST API

| Method | URL | Purpose |
|--------|-----|---------|
| GET    | `/api/tasks?status=ALL\|PENDING\|COMPLETED\|OVERDUE&search=text` | List / filter / search |
| GET    | `/api/tasks/{id}` | One task |
| POST   | `/api/tasks` | Create |
| PUT    | `/api/tasks/{id}` | Update |
| PATCH  | `/api/tasks/{id}/status` | `{"status":"COMPLETED"}` or `PENDING` |
| DELETE | `/api/tasks/{id}` | Delete |

Task JSON: `{ "title", "description", "deadline": "YYYY-MM-DD", "priority": "LOW|MEDIUM|HIGH" }`. Responses also include `status`, `createdAt` and `overdue`.
An empty title returns `400 {"errors":{"title":"Title is required"}}`.

### Quick API test with curl
```bash
curl -X POST localhost:8080/api/tasks -H "Content-Type: application/json" \
     -d '{"title":"Buy milk","deadline":"2026-12-01","priority":"HIGH"}'
curl "localhost:8080/api/tasks?status=PENDING&search=milk"
curl -X PATCH localhost:8080/api/tasks/1/status -H "Content-Type: application/json" -d '{"status":"COMPLETED"}'
curl -X DELETE localhost:8080/api/tasks/1
curl -X POST localhost:8080/api/tasks -H "Content-Type: application/json" -d '{"title":""}'   # 400
```

## Deploy online (outline)
1. Backend: push `backend/` to Render / Railway as a Java web service (`mvn package`, run the jar). For hosted use, switch to MySQL/Postgres, since free-tier disks are often wiped on redeploy.
2. Frontend: `cd frontend && VITE_API_URL=https://<your-backend>/api npm run build`, then upload `dist/` to Netlify or Vercel.

## Features
Add, view, edit, delete · Pending/Completed toggle · All/Pending/Completed/Overdue filters · Search · Low/Medium/High priority · Overdue highlighting · Server and client validation.
