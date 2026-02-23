# MEAN Stack CRUD Application - DevOps Assignment

## 📋 Project Overview
A full-stack MEAN (MongoDB, Express, Angular 15, Node.js) application with complete CI/CD pipeline, containerization, and cloud deployment.

**Repository:** [discover-dollar-mean-devops-assignment](https://github.com/tejasgsv/discover-dollar-mean-devops-assignment)

**Live Application:** http://13.48.84.172 *(Replace with your AWS public IP)*

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│              GitHub Repository                   │
│    (Code Push triggers CI/CD Pipeline)          │
└─────────────┬───────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────┐
│           GitHub Actions CI/CD                   │
│  • Build Docker images (SHA-tagged)             │
│  • Push to Docker Hub                           │
│  • Deploy to EC2                                │
└─────────────┬───────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────┐
│         AWS EC2 Ubuntu Server                    │
│                                                  │
│  ┌──────────────────────────────────────┐      │
│  │  Nginx (Port 80) - Reverse Proxy     │      │
│  │  • Serves Angular frontend           │      │
│  │  • Proxies /api to backend:8080      │      │
│  └──────────────┬───────────────────────┘      │
│                 │                                │
│  ┌──────────────▼───────────────────────┐      │
│  │  Node.js Backend (Port 8080)         │      │
│  │  • Express REST API                  │      │
│  │  • CRUD operations                   │      │
│  └──────────────┬───────────────────────┘      │
│                 │                                │
│  ┌──────────────▼───────────────────────┐      │
│  │  MongoDB (Port 27017)                │      │
│  │  • Database container                │      │
│  └──────────────────────────────────────┘      │
└─────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | Angular 15 |
| **Backend** | Node.js + Express |
| **Database** | MongoDB |
| **Containerization** | Docker + Docker Compose |
| **CI/CD** | GitHub Actions |
| **Cloud Platform** | AWS EC2 (Ubuntu) |
| **Web Server** | Nginx (Reverse Proxy) |
| **Registry** | Docker Hub |

---

## 📁 Project Structure

```
crud-dd-task-mean-app/
├── .github/workflows/deploy.yml    # CI/CD pipeline
├── backend/
│   ├── app/
│   │   ├── config/db.config.js     # MongoDB connection
│   │   ├── controllers/tutorial.controller.js
│   │   ├── models/tutorial.model.js
│   │   └── routes/turorial.routes.js
│   ├── server.js                   # Express server
│   ├── package.json
│   └── dockerfile
├── frontend/
│   ├── src/app/
│   │   ├── components/             # Angular components
│   │   ├── services/tutorial.service.ts
│   │   └── models/tutorial.model.ts
│   ├── nginx.conf                  # Nginx reverse proxy
│   ├── package.json
│   └── dockerfile
├── docker-compose.yml
└── README.md
```

---

## 🚀 Quick Start

### Local Development with Docker Compose

```bash
# Clone repository
git clone https://github.com/tejasgsv/discover-dollar-mean-devops-assignment.git
cd discover-dollar-mean-devops-assignment

# Start all services
docker-compose up -d

# Access application
# Frontend: http://localhost
# Backend API: http://localhost:8080/api/tutorials

# Stop services
docker-compose down
```

### Traditional Development (Without Docker)

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

Navigate to `http://localhost:8081/`

---

## ☁️ Cloud Deployment (AWS EC2)

### Step 1: EC2 Instance Setup

1. **Launch Ubuntu 22.04 LTS instance**
2. **Security Group Rules:**
   - Port 22 (SSH)
   - Port 80 (HTTP)
   - Port 8080 (Backend API)

3. **Install Docker & Docker Compose:**
   ```bash
   ssh -i your-key.pem ubuntu@YOUR_EC2_IP
   
   # Install Docker
   sudo apt update && sudo apt install docker.io docker-compose -y
   sudo systemctl start docker
   sudo usermod -aG docker ubuntu
   newgrp docker
   ```

### Step 2: Deploy Application

```bash
# Create deployment directory
mkdir ~/dd-app && cd ~/dd-app

# Create docker-compose.yml (copy from repository)
nano docker-compose.yml

# Login to Docker Hub
docker login

# Deploy application
docker compose pull
docker compose up -d

# Verify containers
docker ps
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow Features

✅ **Automatic on every push to `main`**
✅ **Commit SHA-based image tagging** (production-grade)
✅ **Zero-downtime deployment**
✅ **Rollback capability**

### Required GitHub Secrets

Go to: `Settings → Secrets and variables → Actions`

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `DOCKER_USERNAME` | `tejas018` | Docker Hub username |
| `DOCKER_PASSWORD` | `your-token` | Docker Hub access token |
| `EC2_HOST` | `13.48.84.172` | AWS EC2 public IP |
| `EC2_SSH_KEY` | `-----BEGIN...` | Private SSH key content |

### Deployment Process

```yaml
1. Code pushed to GitHub main branch
   ↓
2. GitHub Actions triggers
   ↓
3. Build Docker images (tagged with commit SHA)
   ↓
4. Push images to Docker Hub
   ↓
5. SSH into EC2
   ↓
6. Pull new images and restart containers
   ↓
7. Application updated with zero downtime
```

---

## 🐳 Docker Configuration

### Images on Docker Hub

- **Backend:** `tejas018/dd-backend:<commit-sha>`
- **Frontend:** `tejas018/dd-frontend:<commit-sha>`

### Container Architecture

```yaml
services:
  mongo:
    image: mongo:latest
    ports: ["27017:27017"]
    
  backend:
    image: tejas018/dd-backend:${IMAGE_TAG:-latest}
    ports: ["8080:8080"]
    depends_on: [mongo]
    
  frontend:
    image: tejas018/dd-frontend:${IMAGE_TAG:-latest}
    ports: ["80:80"]
    depends_on: [backend]
```

---

## 🌐 Nginx Reverse Proxy Setup

**Configuration:** `frontend/nginx.conf`

```nginx
server {
    listen 80;
    
    # Serve Angular static files
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }
    
    # Proxy API requests to backend
    location /api/ {
        proxy_pass http://backend:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

**Benefits:**
- Single entry point (port 80)
- No CORS issues
- Clean URLs for API

---

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tutorials` | Get all tutorials |
| GET | `/api/tutorials/:id` | Get tutorial by ID |
| POST | `/api/tutorials` | Create new tutorial |
| PUT | `/api/tutorials/:id` | Update tutorial |
| DELETE | `/api/tutorials/:id` | Delete tutorial |
| DELETE | `/api/tutorials` | Delete all tutorials |
| GET | `/api/tutorials?title=xyz` | Search by title |

---

## 🧪 Testing

### Manual API Testing

```bash
# Create tutorial
curl -X POST http://YOUR_EC2_IP/api/tutorials \
  -H "Content-Type: application/json" \
  -d '{"title":"Docker","description":"Learn Docker","published":true}'

# Get all tutorials
curl http://YOUR_EC2_IP/api/tutorials

# Update tutorial
curl -X PUT http://YOUR_EC2_IP/api/tutorials/TUTORIAL_ID \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}'

# Delete tutorial
curl -X DELETE http://YOUR_EC2_IP/api/tutorials/TUTORIAL_ID
```

---

## 📸 Screenshots

### 1. CI/CD Pipeline
*GitHub Actions executing build and deployment*
![GitHub Actions](screenshots/github-actions.png)

### 2. Docker Hub Repository
*Images tagged with commit SHA*
![Docker Hub](screenshots/docker-hub.png)

### 3. Application UI
*Frontend displaying tutorials*
![Application](screenshots/app-ui.png)

### 4. AWS Infrastructure
*EC2 instance and security groups*
![AWS EC2](screenshots/aws-ec2.png)

### 5. Running Containers
*Docker containers on EC2*
![Docker PS](screenshots/docker-ps.png)

---

## 🔧 Troubleshooting

### Check container logs
```bash
docker logs frontend
docker logs backend
docker logs mongo
```

### Verify MongoDB connection
```bash
docker exec -it mongo mongosh
show dbs
use dd_db
db.tutorials.find()
```

### Test Nginx configuration
```bash
docker exec frontend nginx -t
```

### Restart services
```bash
docker compose restart
```

---

## 📈 Production Improvements

✅ **Commit SHA tagging** - No `latest` overwrites
✅ **Environment-based configs** - Different settings for dev/prod
✅ **Nginx reverse proxy** - Single entry point
✅ **Auto-restart policies** - Containers restart on failure
✅ **CORS configuration** - Proper cross-origin handling

---

## 🎯 Future Enhancements

- [ ] HTTPS with SSL certificates
- [ ] Custom domain mapping
- [ ] Kubernetes deployment
- [ ] Monitoring (Prometheus + Grafana)
- [ ] Auto-scaling
- [ ] Database backups

---

## 👤 Author

**Tejas GSV**
- GitHub: [@tejasgsv](https://github.com/tejasgsv)
- Docker Hub: [tejas018](https://hub.docker.com/u/tejas018)

---

## 📝 Assignment Details

**Submitted for:** Discover Dollar DevOps Internship
**Date:** February 24, 2026
**Contact:** raghunath.k@discoverdollar.com

---

**Last Updated:** February 24, 2026
