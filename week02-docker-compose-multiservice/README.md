# Week 2

**📅 WEEK 2 — Project 2: Multi-Container App With Docker Compose**

**Goal:** Understand multi-service architecture using `docker-compose`.

### **Objectives**

- Learn container networking, volumes, and environment variables.
- Run multiple services together.

### **Tasks**

- Extend your API to use a database (PostgreSQL or MongoDB).
- Add Redis for caching (simple `/cache-test` route).
- Create `docker-compose.yml` with:
  - backend
  - postgres
  - redis
- Use volumes for Postgres.
- Use `.env` file for secrets.
- Test internal connections.

### **Deliverables**

- Compose file that starts all services with one command.
- API using real DB + Redis in containers.
- Documentation showing the architecture.