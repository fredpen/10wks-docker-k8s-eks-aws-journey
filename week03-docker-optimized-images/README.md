````
Week 3 — Optimized Images & Multi-Stage Builds

Project: Optimize the Week 2 Node + Postgres + Redis setup

🎯 Week 3 Objectives

Understand Docker image layers and size trade-offs

Use multi-stage builds

Create a reusable custom base image

Produce a production-ready Docker image

🧩 TODOs (Step-by-Step)
🔹 1. Baseline: Measure Current Image

Build the existing Node app image from Week 2

Check image size using docker images

Inspect image layers using docker history <image>

Document:

Image size

Number of layers

Base image used

🔹 2. Introduce Multi-Stage Docker Build

Create a new Dockerfile.multi-stage

Add build stage:

Use node:18 (or similar)

Install all dependencies

Build app if needed

Add runtime stage:

Use node:18-alpine

Copy only required files from build stage

Remove dev dependencies from final image

Build image and compare size vs baseline

🔹 3. Reduce Image Size Further

Add .dockerignore:

node_modules

logs

tests

.git

Remove unnecessary OS packages

Ensure only production dependencies are installed

Verify app still runs correctly

🔹 4. Add Healthcheck to Dockerfile

Add HEALTHCHECK instruction

Create /health endpoint in Node app

Verify container health using:

docker inspect --format='{{.State.Health.Status}}'

🔹 5. Create a Custom Base Image

Create custom-base-image/ folder

Write base Dockerfile:

Alpine-based Node image

Non-root user

Common OS packages only

Build base image locally

Tag image (yourname/node-base:1.0)

Push base image to Docker Hub

🔹 6. Refactor App to Use Custom Base Image

Update multi-stage Dockerfile to use custom base image

Rebuild application image

Verify:

App starts correctly

Postgres and Redis connections still work

🔹 7. Compare Results

Document before/after image sizes

Compare:

Build time

Runtime size

Startup speed

Add table to README

Example:

Version	Image Size
Week 2	320MB
Multi-stage	95MB
Custom base	68MB
🔹 8. Cleanup & Best Practices

Ensure container runs as non-root user

Pin base image versions

Add NODE_ENV=production

Remove unused ENV variables

Run docker scan (optional)

🔹 9. Documentation

Update Week 3 README with:

What changed

Why multi-stage builds matter

Lessons learned

Add diagrams or layer screenshots (optional)

🔹 10. Git Hygiene

Commit in logical steps:

refactor(week03): convert Dockerfile to multi-stage build
perf(week03): reduce image size using alpine base
build(week03): add custom node base image
docs(week03): document optimization results


Tag repository:

git tag -a week03 -m "Week 3: Docker image optimization"

🎉 End-of-Week Definition of Done

✔ Image size reduced by 60%+
✔ Multi-stage build implemented
✔ Custom base image published
✔ Healthcheck added
✔ README clearly documents improvements




🔹 9. Documentation

Update Week 3 README with:

What changed
I started building the node image from node:slim for the build process 
Implement a multi stage docker to 
    - To optimize image size
    - Separate the build process from the running process 
    - Smaller images = less attack surface area
    - Faster deployments and cleaner systems

Why multi-stage builds matter

Lessons learned
my image went from 438.41 to 59