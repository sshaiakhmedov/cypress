# Use the official Cypress image as the base
FROM cypress/browsers:node-20.11.0-chrome-121.0.6167.184-1

# Create the work directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Run the tests
CMD ["npx", "cypress", "run"]
