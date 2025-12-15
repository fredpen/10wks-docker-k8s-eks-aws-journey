# Use the official Node.js image as the base image
FROM node:22 AS builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
# Copying the json file prior to the application code is an optmization technique to ensure
# That steps only run when there is a change in dependencies and not just to any change in code
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files
# This is always confusing but its always <source> <destination> in docker
# When using full copy you can use docker ignore to exclude files
COPY . .

# Build the NestJS application
RUN npm run build

FROM node:lts-alpine AS runner

WORKDIR /usr/src/app

# Copy only needed files from builder
#COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/tsconfig.json ./
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/package-lock.json ./


#npm clean install without dev dependecies
RUN npm ci --omit=dev


# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]
