# .gitpod.Dockerfile

# Use the official Node.js image
FROM mcr.microsoft.com/playwright:v1.41.0-jammy

# Set working directory
WORKDIR /workspace

# Copy package.json and package-lock.json to the workspace
COPY package*.json ./

# Install project dependencies
RUN npx playwright install
RUN npm install

# Expose the necessary ports (if applicable)
# EXPOSE 3000

# Set the default command to run your tests
# CMD ["npm", "test"]
