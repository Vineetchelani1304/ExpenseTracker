# Use official Node.js base image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy only package.json & lock file first
COPY package*.json ./

# Install dependencies (in Linux env)
RUN npm install

# Now copy rest of your app
COPY . .

# Start the app
CMD ["npm", "start"]
