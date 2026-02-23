# MEAN Stack CRUD Application - DevOps Assignment

## About this project

This is a full-stack MEAN application (MongoDB, Express, Angular 15, Node.js) that I've containerized and deployed with CI/CD pipeline for the Discover Dollar internship assignment.

**Live URL:** http://13.48.84.172

**GitHub Repo:** https://github.com/tejasgsv/discover-dollar-mean-devops-assignment

## What it does

Simple tutorial management app where you can:
- Create new tutorials
- View all tutorials
- Edit existing tutorials
- Delete tutorials
- Search tutorials by title

## Tech Stack

- Frontend: Angular 15
- Backend: Node.js with Express
- Database: MongoDB
- Deployment: Docker containers on AWS EC2
- CI/CD: GitHub Actions
- Web Server: Nginx as reverse proxy

## Project Structure

```
.
├── backend/
│   ├── app/
│   │   ├── config/        - database config
│   │   ├── controllers/   - business logic
│   │   ├── models/        - mongoose models
│   │   └── routes/        - API endpoints
│   ├── server.js
│   ├── package.json
│   └── dockerfile
├── frontend/
│   ├── src/app/
│   │   ├── components/    - Angular components
│   │   ├── services/      - HTTP services
│   │   └── models/
│   ├── nginx.conf
│   ├── package.json
│   └── dockerfile
├── .github/workflows/
│   └── deploy.yml         - CI/CD pipeline
├── docker-compose.yml
└── README.md
```

## How to run locally

### Option 1: Using Docker Compose (recommended)

```bash
git clone https://github.com/tejasgsv/discover-dollar-mean-devops-assignment.git
cd discover-dollar-mean-devops-assignment
docker-compose up -d
```

Then open http://localhost in your browser.

### Option 2: Running manually

Backend:
```bash
cd backend
npm install
node server.js
```

Frontend:
```bash
cd frontend
npm install
ng serve --port 8081
```

Open http://localhost:8081

## AWS Deployment

I deployed this on AWS EC2 Ubuntu instance. Here's how I did it:

### Setting up EC2

1. Created Ubuntu 22.04 LTS instance on AWS
2. Configured security group to allow:
   - Port 22 for SSH
   - Port 80 for web access
   - Port 8080 for backend API

3. SSH into the server and install Docker:
```bash
ssh -i your-key.pem ubuntu@YOUR_EC2_IP

sudo apt update
sudo apt install docker.io docker-compose -y
sudo systemctl start docker
sudo usermod -aG docker ubuntu
```

### Deploying the app

```bash
# Create a directory for the app
mkdir ~/dd-app
cd ~/dd-app

# Copy docker-compose.yml to the server
# You can use scp or just create it with nano

# Pull images from Docker Hub
docker login
docker compose pull

# Start everything
docker compose up -d

# Check if containers are running
docker ps
```

You should see 3 containers running: mongo, backend, and frontend.

## CI/CD with GitHub Actions

I set up automatic deployment using GitHub Actions. Whenever I push code to the main branch, it automatically:
1. Builds new Docker images
2. Pushes them to Docker Hub
3. Deploys to EC2

### GitHub Secrets needed

You need to add these secrets in your GitHub repo settings (Settings > Secrets and variables > Actions):

- DOCKER_USERNAME - your Docker Hub username
- DOCKER_PASSWORD - your Docker Hub password or access token
- EC2_HOST - your EC2 instance public IP
- EC2_SSH_KEY - the private SSH key to access EC2

### How it works

The workflow file is in `.github/workflows/deploy.yml`. 

Key thing I did here: instead of using "latest" tag for Docker images, I'm using the commit SHA. This means every commit gets its own image tag, making it easy to rollback if needed.

## Docker Setup

### Dockerfiles

**Backend Dockerfile:**
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
```

**Frontend Dockerfile:**
```dockerfile
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/angular-15-crud /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### docker-compose.yml

The docker-compose file uses environment variable for image tags:
```yaml
services:
  backend:
    image: tejas018/dd-backend:${IMAGE_TAG:-latest}
  frontend:
    image: tejas018/dd-frontend:${IMAGE_TAG:-latest}
```

This way, in production the IMAGE_TAG is set to commit SHA, but locally it defaults to "latest".

## Nginx Configuration

I set up Nginx as a reverse proxy in the frontend container. It does two things:
1. Serves the Angular app
2. Forwards /api requests to the backend container

This way everything is accessible on port 80 and there are no CORS issues.

The nginx.conf file:
```nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }
    
    location /api/ {
        proxy_pass http://backend:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## API Endpoints

The backend exposes these REST APIs:

- GET /api/tutorials - get all tutorials
- GET /api/tutorials/:id - get one tutorial
- POST /api/tutorials - create tutorial
- PUT /api/tutorials/:id - update tutorial  
- DELETE /api/tutorials/:id - delete tutorial
- DELETE /api/tutorials - delete all
- GET /api/tutorials?title=keyword - search by title

## Testing

You can test the API with curl:

```bash
# Create a tutorial
curl -X POST http://YOUR_IP/api/tutorials \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Testing","published":true}'

# Get all tutorials
curl http://YOUR_IP/api/tutorials
```

Or just use the web interface at http://YOUR_IP

## Troubleshooting

If something's not working:

Check container logs:
```bash
docker logs frontend
docker logs backend
docker logs mongo
```

Check if all containers are running:
```bash
docker ps
```

Restart containers:
```bash
docker compose restart
```

## Screenshots

See the screenshots folder for images showing:
- GitHub Actions CI/CD pipeline execution
- Docker Hub with tagged images
- Application running on AWS
- EC2 instance configuration
- Running Docker containers

## Notes

This was a good learning experience. Some challenges I faced:
- Getting the nginx proxy to work correctly with the backend
- Making sure the frontend could talk to the backend in containers
- Setting up the CI/CD to use commit SHA instead of latest tags

The commit SHA tagging was especially important - it means I can rollback to any previous version if something breaks.

---

**Project submitted for Discover Dollar DevOps Internship Assignment**

Author: Tejas  
Date: February 24, 2026  
GitHub: https://github.com/tejasgsv  
Docker Hub: https://hub.docker.com/u/tejas018
