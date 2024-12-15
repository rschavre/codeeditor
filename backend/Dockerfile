FROM node:18

# Set working directory
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# Copy the source code
COPY src/ ./src

# # Expose the application port
# EXPOSE 5000

# Start the backend server
CMD ["node", "src/main.js"]
