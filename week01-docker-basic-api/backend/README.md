
## Objective of the week
**Containerize a Simple Backend API (Docker Basics)**

**Goal:** Learn Docker fundamentals and containerize your first application.

### **Objectives**

- Understand containers, images, Dockerfiles, layers.
- Build and run your first Dockerized application.

### **Tasks**

- Build a very simple API (Node.js/Express).
    - Routes: `/health`, `/hello`, `/users` (static JSON)
- Write a Dockerfile:
    - Use official base image
    - Install dependencies
    - Copy source code
    - Expose port
    - Add entrypoint
- Build Docker image locally.
- Run container locally.
- Use `docker logs`, `docker exec`, `docker ps`, `docker stop`.
- Push the image to Docker Hub.

### **Deliverables**

- GitHub repo with API + Dockerfile.
- Image live on Docker Hub.
- README explaining how to run your container.



## Compile and run the project

```bash
# docker - Build and tag your app
$ docker build -t week01-app .

# Run the image 
# Another confusing thing post is always host machine to container.
$ docker run -p 3000:3000 week01-app

# check logs 
$ docker logs ${container_id}

# stop container 
$ docker stop ${container_id}

# start container 
$ docker start ${container_id}



```