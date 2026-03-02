# 📌 Overview

This project implements a **cloud-native Library Management System** using a microservices architecture.

The system demonstrates:

- Microservices architecture
- API Gateway pattern (Nginx)
- Inter-service REST communication
- Docker containerization
- Docker Compose orchestration
- Cloud integration (Firebase Hosting)

All external traffic is routed through a single exposed port: **8080**.

---

# 🏗 Architecture

The system consists of three independent services:

| Service | Port (Internal) | Responsibility |
|----------|----------------|----------------|
| Book Service | 3001 | Manage books |
| Member Service | 3002 | Manage members |
| Loan Service | 3003 | Handle loan creation and validation |

An **API Gateway (Nginx)** acts as the single entry point.

```
Client → API Gateway (8080) → Internal Services
```

Internal communication occurs inside a **Docker bridge network**.

---

# 🐳 Setup Instructions

## 1️⃣ Requirements

Make sure you have:

- Node.js (v18+)
- Docker Desktop
- Docker Compose

## 2️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/chahid-library-cnad.git
cd chahid-library-cnad
```

## 3️⃣ Start the System

From the project root:

```bash
docker compose up --build
```

All services will start automatically.

---

# 🌐 API Access

All routes must be accessed through:

```
http://localhost:8080
```

❗ **Do NOT use ports 3001, 3002, or 3003 directly.**

---

# 📚 Available Endpoints

## 📘 Book Service

- `GET /books` - Get all books
- `GET /books/:id` - Get book by ID
- `POST /books` - Create new book
- `GET /books/health` - Health check

**Example:**
```
http://localhost:8080/books
```

## 👤 Member Service

- `GET /members` - Get all members
- `GET /members/:id` - Get member by ID
- `POST /members` - Create new member
- `GET /members/health` - Health check

## 📕 Loan Service

- `GET /loans` - Get all loans
- `POST /loans` - Create new loan
- `GET /loans/health` - Health check

**Example Loan Request:**
```json
{
  "bookId": 1,
  "memberId": 1
}
```

---

# ⚙️ Environment Configuration

Environment variables are defined in `docker-compose.yml`.

### Loan Service
```
BOOK_SERVICE_URL=http://book-service:3001
MEMBER_SERVICE_URL=http://member-service:3002
PORT=3003
```

### Book Service
```
PORT=3001
```

### Member Service
```
PORT=3002
```

---

# ☁️ Cloud Integration

API documentation is deployed using Firebase Hosting.

**🔗 Live URL:** https://chahid-library-cnad.web.app

---

# 🩺 Health Endpoints

- `/gateway/health` - API Gateway health
- `/books/health` - Book Service health
- `/members/health` - Member Service health
- `/loans/health` - Loan Service health

---

# 🧪 Testing

A Postman collection is included: `postman-collection.json`

Import it into Postman and test all routes via port 8080.

---

# 🗂 Project Structure

```
chahid-library-cnad/
├── api-gateway/
│   └── nginx.conf
├── book-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   ├── middleware/
│   │   └── logger.js
│   └── routes/
│       └── books.js
├── member-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   ├── middleware/
│   │   └── logger.js
│   └── routes/
│       └── members.js
├── loan-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   ├── middleware/
│   │   └── logger.js
│   └── routes/
│       └── loans.js
├── public/
│   ├── index.html
│   └── 404.html
├── docker-compose.yml
├── firebase.json
├── postman-collection.json
└── README.md
```

---

# 🚀 How to Stop the System

```bash
docker compose down
```

---

# 📄 Author

**Mostafa**

Cloud Native Application Development – Midterm Project