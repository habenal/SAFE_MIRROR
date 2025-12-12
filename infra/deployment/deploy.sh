#!/bin/bash

# Navigate to project root (assuming script is run from project root or deployment dir needs careful handling)
# Let's assume this script is run from the project root for simplicity, or we make it robust.

# Get the directory of the script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$DIR/../.."

echo "Deploying Safe Mirror (Production)..."
echo "Project Root: $PROJECT_ROOT"

# Run docker-compose from project root using the file paths
docker-compose -f "$PROJECT_ROOT/docker-compose.yml" -f "$DIR/docker-compose.prod.yml" up -d --build

echo "Deployment complete! Application running on http://localhost"
