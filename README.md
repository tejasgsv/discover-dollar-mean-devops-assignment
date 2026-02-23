# 🚀 MEAN Stack CRUD Application – DevOps Deployment Assignment

## 📌 Overview

This project is a full-stack MEAN (MongoDB, Express, Angular 15, Node.js) application containerized and deployed using modern DevOps practices.  

The objective of this assignment was to demonstrate hands-on expertise in:

- Docker containerization  
- Docker Compose orchestration  
- CI/CD automation  
- Cloud deployment  
- Reverse proxy configuration  
- Production-ready image versioning strategy  

---

## 🌍 Live Application

**Public URL:** http://13.48.84.172  

**Cloud Platform:** AWS EC2 (Ubuntu 22.04)  
**Container Orchestration:** Docker Compose  
**Reverse Proxy:** Nginx  
**CI/CD:** GitHub Actions (auto-deploy on push to main branch)

---

## 🏗️ Architecture Overview

```
Frontend (Angular 15) → Nginx (Reverse Proxy) → Backend (Node.js/Express) → MongoDB  
```

- All services run as isolated Docker containers.
- Nginx serves static Angular files and proxies `/api` requests to backend.
- MongoDB runs as an official Docker container.
- The entire stack is exposed via port 80.

---

## 🐳 Containerization Strategy

### Backend
- Node 18 base image
- Production dependency install
- Exposes port 8080

### Frontend
- Multi-stage Docker build
- Angular build stage
- Nginx production stage
- Static assets served via Nginx

### docker-compose.yml

```yaml
services:
  mongo:
    image: mongo:latest
    container_name: mongo
    restart: always
    ports:
      - "27017:27017"

  backend:
    image: tejas018/dd-backend:${IMAGE_TAG}
    container_name: backend
    restart: always
    ports:
      - "8080:8080"
    depends_on:
      - mongo

  frontend:
    image: tejas018/dd-frontend:${IMAGE_TAG}
    container_name: frontend
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend
```

---

## 🔁 CI/CD Pipeline

CI/CD is implemented using GitHub Actions.

On every push to `main` branch:

1. Docker images are built.
2. Images are tagged using the commit SHA.
3. Images are pushed to Docker Hub.
4. EC2 server pulls the latest images.
5. Containers are restarted automatically.

### Why Commit SHA Tagging?

Instead of using `latest`, each build uses the Git commit SHA as the image tag.  
This ensures:

- Version traceability  
- Easy rollback capability  
- Production safety  
- No accidental overwrites  

**Example:**
```bash
docker pull tejas018/dd-backend:034f77e
docker pull tejas018/dd-frontend:034f77e
```

---

## ☁️ Cloud Deployment

Deployed on AWS EC2 Ubuntu 22.04 instance.

**Security group configuration:**
- Port 22 – SSH
- Port 80 – Public web access
- Port 8080 – Backend API

Docker and Docker Compose installed manually.
Application deployed using `docker compose up -d`.

**Deployment directory:**
```
~/dd-app/
  └── docker-compose.yml
```

---

## 🔐 Reverse Proxy Configuration

Nginx performs two tasks:

1. Serves Angular frontend.
2. Proxies `/api` traffic to backend container.

**nginx.conf:**
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

This eliminates:
- CORS issues
- Port exposure complexity
- Direct backend exposure

---

## 📦 Services Running

- **mongo** – MongoDB database
- **backend** – Node.js REST API  
- **frontend** – Angular app via Nginx

Verified using:
```bash
docker ps
```

---

## 🧪 Application Features

- Create tutorial
- Update tutorial
- Delete tutorial
- View all tutorials
- Search tutorial by title
- Persistent MongoDB storage

**API Endpoints:**
- `GET /api/tutorials` – Get all tutorials
- `GET /api/tutorials/:id` – Get tutorial by ID
- `POST /api/tutorials` – Create tutorial
- `PUT /api/tutorials/:id` – Update tutorial  
- `DELETE /api/tutorials/:id` – Delete tutorial
- `DELETE /api/tutorials` – Delete all tutorials
- `GET /api/tutorials?title=keyword` – Search by title

---

## 🛠️ Local Development

### Using Docker Compose (Recommended)

```bash
git clone https://github.com/tejasgsv/discover-dollar-mean-devops-assignment.git
cd discover-dollar-mean-devops-assignment
export IMAGE_TAG=latest
docker-compose up -d
```

Access at: http://localhost

### Manual Setup

**Backend:**
```bash
cd backend
npm install
node server.js
```

**Frontend:**
```bash
cd frontend
npm install
ng serve --port 8081
```

Access at: http://localhost:8081

---

## ⚠️ Operational Notes

- Docker restart policy configured for container resilience.
- Disk cleanup strategy applied to prevent image accumulation.
- EC2 instance remains available for demonstration purposes.
- GitHub Actions workflow automatically syncs docker-compose.yml to EC2.

---

## 📂 Repository Structure

```
.
├── backend/
│   ├── app/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── routes/
│   ├── server.js
│   ├── package.json
│   └── dockerfile
├── frontend/
│   ├── src/
│   ├── nginx.conf
│   ├── package.json
│   └── dockerfile
├── .github/
│   └── workflows/
│       └── deploy.yml
├── docker-compose.yml
├── screenshots/
└── README.md
```

---

## 🔍 GitHub Secrets Required

For CI/CD to work, configure these secrets in repository settings:

| Secret Name | Description |
|-------------|-------------|
| `DOCKER_USERNAME` | Docker Hub username |
| `DOCKER_PASSWORD` | Docker Hub access token |
| `EC2_HOST` | EC2 instance public IP |
| `EC2_SSH_KEY` | Private SSH key for EC2 access |

---

## 📸 Deployment Evidence Checklist

### 1. GitHub Actions CI/CD Pipeline
**Evidence of:** Automated deployment workflow  
**Details:** 
- ✅ Automated deployment on every push to main branch  
- ✅ Commit SHA tagging for version control
- ✅ Images pushed to Docker Hub automatically
- ✅ EC2 deployment triggered via GitHub Actions

**To verify:** Visit [GitHub Actions](https://github.com/tejasgsv/discover-dollar-mean-devops-assignment/actions)

### 2. Docker Hub Repository
**Evidence of:** Container image versioning  
**Details:**
- ✅ Backend Images: `tejas018/dd-backend:<commit-sha>`  
- ✅ Frontend Images: `tejas018/dd-frontend:<commit-sha>`  
- ✅ All images versioned with commit SHA for easy rollback
- ✅ Production-ready image management

**To verify:** Visit [Docker Hub](https://hub.docker.com/u/tejas018)

### 3. Application Frontend - Tutorial List
**Evidence of:** Working Angular application  
**Details:**
- ✅ Angular app running on Nginx  
- ✅ URL: http://13.48.84.172  
- ✅ Features: View tutorials, search, create new

### 4. Application - Add Tutorial Form
**Evidence of:** Frontend functionality  
**Details:**
- ✅ Create new tutorial form working  
- ✅ Fields: Title, Description, Published status toggle
- ✅ Form validation and submission working

### 5. Application - Tutorial Details & Update
**Evidence of:** CRUD operations  
**Details:**
- ✅ Individual tutorial view working  
- ✅ Actions: Edit, delete, mark as published/unpublished
- ✅ Data persistence with MongoDB

### 6. AWS EC2 Instance Configuration
**Evidence of:** Cloud infrastructure  
**Details:**
- ✅ Instance Type: t2.micro or larger  
- ✅ OS: Ubuntu 22.04 LTS  
- ✅ Status: Running and accessible via public IP (13.48.84.172)

### 7. AWS Security Groups
**Evidence of:** Network security  
**Details:**
- ✅ Inbound Rules configured:
  - Port 22 (SSH) - for remote access
  - Port 80 (HTTP) - public web access  
  - Port 8080 (Backend API) - direct backend access

### 8. Docker Containers Status
**Evidence of:** Container orchestration  
**Details:**
- ✅ Containers Running:
  - mongo (MongoDB database)
  - backend (Node.js REST API)
  - frontend (Angular + Nginx)
- ✅ All containers restart automatically on failure

### 9. Docker Hub Images with SHA Tags
**Evidence of:** Version control  
**Details:**
- ✅ Backend Image: tejas018/dd-backend with multiple SHA tags  
- ✅ Frontend Image: tejas018/dd-frontend with multiple SHA tags  
- ✅ Latest deployment: Using commit SHA for traceability

### 10. Backend API Response
**Evidence of:** API functionality  
**Details:**
- ✅ Endpoint: GET /api/tutorials  
- ✅ Response: List of all tutorials in JSON format  
- ✅ Backend successfully processing requests

---

## ✅ Deployment Verification

### Manual Testing Command
```bash
# Get all tutorials
curl http://13.48.84.172/api/tutorials

# Create a new tutorial
curl -X POST http://13.48.84.172/api/tutorials \
  -H "Content-Type: application/json" \
  -d '{"title":"DevOps Guide","description":"Complete DevOps setup","published":true}'

# Update tutorial
curl -X PUT http://13.48.84.172/api/tutorials/TUTORIAL_ID \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title","published":true}'

# Delete tutorial
curl -X DELETE http://13.48.84.172/api/tutorials/TUTORIAL_ID
```

### EC2 Deployment Status
```bash
# Check all services running
docker ps

# View recent logs
docker logs frontend
docker logs backend
docker logs mongo

# Verify docker-compose sync
cat ~/dd-app/docker-compose.yml

# Check deployed image tags
docker images | grep tejas018
```

---

## 🐛 Troubleshooting

**Check container logs:**
```bash
docker logs frontend
docker logs backend
docker logs mongo
```

**Verify all containers are running:**
```bash
docker ps
```

**Restart services:**
```bash
cd ~/dd-app
docker compose restart
```

**Check MongoDB data:**
```bash
docker exec -it mongo mongosh
show dbs
use dd_db
db.tutorials.find()
```

**View deployment script logs:**
```bash
docker compose logs -f
```

---

## 📋 Assignment Completion Checklist

✅ **Repository Setup** - Complete with all code and configuration  
✅ **Docker Containerization** - Both frontend and backend containerized  
✅ **Docker Compose** - Multi-container orchestration working  
✅ **Docker Hub** - Images pushed with commit SHA tagging  
✅ **CI/CD Pipeline** - GitHub Actions auto-deploys on push  
✅ **AWS EC2 Deployment** - Application live and accessible  
✅ **Nginx Reverse Proxy** - Properly configured for API routing  
✅ **MongoDB** - Running in container, persisting data  
✅ **Screenshots** - Evidence of deployment and functionality  
✅ **Documentation** - Professional README with complete details  

---

## 👨‍💻 Author

**Tejas Goswami**  
GitHub: https://github.com/tejasgsv  
Docker Hub: https://hub.docker.com/u/tejas018  

---

## 🎯 Assignment Submitted For

**DevOps Engineer Internship – Discover Dollar**  
Submission Date: February 24, 2026  
Contact: raghunath.k@discoverdollar.com  
Repository: https://github.com/tejasgsv/discover-dollar-mean-devops-assignment
