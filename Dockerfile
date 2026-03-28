# Use the official Cypress image as the base
FROM cypress/browsers:node-22.11.0-chrome-131.0.6778.85-1-ff-132.0.2-edge-131.0.2903.70-1

# Create the work directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Run the tests
CMD ["npm", "run", "cy:run"]
