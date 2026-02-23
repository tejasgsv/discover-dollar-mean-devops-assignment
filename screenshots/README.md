# Screenshots Guide

## Required Screenshots for Assignment Submission

### 1. GitHub Actions CI/CD Pipeline
**File:** `github-actions.png`
**What to capture:**
- Go to: https://github.com/tejasgsv/discover-dollar-mean-devops-assignment/actions
- Click on latest workflow run
- Screenshot showing:
  - ✅ All steps completed successfully
  - Build and Push Backend Image
  - Build and Push Frontend Image
  - Deploy to EC2
  - Execution time

### 2. Docker Hub Images
**File:** `docker-hub.png`
**What to capture:**
- Go to: https://hub.docker.com/u/tejas018
- Show both repositories:
  - dd-backend with SHA-tagged images
  - dd-frontend with SHA-tagged images
- Screenshot showing:
  - Image names
  - Tags (commit SHA)
  - Last pushed timestamp
  - Size

### 3. Application UI - Homepage
**File:** `app-ui.png`
**What to capture:**
- Open: http://YOUR_EC2_IP
- Screenshot showing:
  - Tutorial list
  - Search functionality
  - Add Tutorial button
  - Working Angular frontend

### 4. Application UI - Add Tutorial
**File:** `add-tutorial.png`
**What to capture:**
- Click "Add" button
- Fill in form fields
- Screenshot showing:
  - Title input
  - Description input
  - Submit button

### 5. Application UI - Tutorial Details
**File:** `tutorial-details.png`
**What to capture:**
- Click on a tutorial from list
- Screenshot showing:
  - Tutorial details
  - Edit functionality
  - Delete button
  - Published status toggle

### 6. AWS EC2 Instance
**File:** `aws-ec2.png`
**What to capture:**
- AWS Console → EC2 → Instances
- Screenshot showing:
  - Instance ID
  - Instance state (running)
  - Public IPv4 address
  - Instance type
  - Security group name

### 7. AWS Security Groups
**File:** `security-groups.png`
**What to capture:**
- AWS Console → EC2 → Security Groups
- Screenshot showing inbound rules:
  - Port 22 (SSH)
  - Port 80 (HTTP)
  - Port 8080 (Backend API)
  - Source IPs

### 8. Docker Containers Running
**File:** `docker-ps.png`
**What to capture:**
- SSH into EC2
- Run: `docker ps`
- Screenshot showing:
  - All 3 containers (mongo, backend, frontend)
  - Container IDs
  - Status (Up)
  - Ports mapping
  - Names

### 9. Docker Images on EC2
**File:** `docker-images.png`
**What to capture:**
- Run: `docker images`
- Screenshot showing:
  - tejas018/dd-backend with SHA tag
  - tejas018/dd-frontend with SHA tag
  - mongo:latest
  - nginx:alpine

### 10. Application Logs
**File:** `docker-logs.png`
**What to capture:**
- Run: `docker logs backend`
- Screenshot showing:
  - "Server is running on port 8080"
  - "Connected to the database!"
  - No errors

## How to Take Screenshots

### Windows
- Press `Win + Shift + S` to use Snipping Tool
- Or press `PrtScn` and paste in Paint

### Mac
- Press `Cmd + Shift + 4` then select area
- Or `Cmd + Shift + 3` for full screen

### Linux
- Press `PrtScn` or use Screenshot tool
- Or use `gnome-screenshot`

## Tips for Good Screenshots

✅ **Full screen context** - Show browser URL bar
✅ **High resolution** - Make text readable
✅ **No sensitive data** - Hide passwords, keys
✅ **Timestamp visible** - Shows recent work
✅ **Clear labels** - Highlight important parts

## After Taking Screenshots

1. Save all screenshots in this `screenshots/` folder
2. Name them exactly as listed above
3. Commit to GitHub:
   ```bash
   git add screenshots/
   git commit -m "docs: Add assignment screenshots"
   git push origin main
   ```

---

**Quick Capture Checklist:**

- [ ] GitHub Actions workflow run
- [ ] Docker Hub repositories
- [ ] Application homepage
- [ ] Add tutorial form
- [ ] Tutorial details page
- [ ] AWS EC2 instance details
- [ ] Security group rules
- [ ] Docker ps output
- [ ] Docker images output
- [ ] Backend logs

Once all screenshots are added, your assignment is complete! ✅
