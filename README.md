# eatEazy - Food Ordering & Delivery Platform

**eatEazy** is a scalable and cloud-native food delivery application inspired by services like **PickMe Food** and **UberEats**. The system is built using Microservices architecture and orchestrated with Docker and Kubernetes, with a user-friendly asynchronous web client.

---

## 📌 Project Overview

**Title:** Building a Cloud-Native Food Ordering & Delivery System using Microservices  

eatEazy allows customers to browse restaurants, place orders, and track deliveries in real-time. Restaurant admins can manage menus and handle orders, while delivery personnel can accept and fulfill delivery requests.

---

## 🔧 Technologies & Tools

- **Frontend:** React.js (Asynchronous web client)
- **Backend:** Node.js + Express (RESTful APIs)
- **API Gateway:** NGINX / Spring Cloud Gateway / Express Gateway (choose based on your stack)
- **Microservices:** Deployed via Docker containers
- **Container Orchestration:** Kubernetes
- **Database:** MongoDB / PostgreSQL (depending on microservice)
- **Authentication:** JWT-based Role Authentication
- **Payment Integration:** PayHere (Sandbox)
- **Notifications:** Twilio (SMS) & Nodemailer (Email)
- **Version Control:** GitHub

---

## 🧩 System Architecture

### Microservices

| Service                  | Description                                                                 |
|--------------------------|-----------------------------------------------------------------------------|
| **User Service**         | Manages authentication, user roles (Customer, Restaurant Admin, Delivery). |
| **Restaurant Service**   | Restaurant CRUD, menu item management, restaurant availability.             |
| **Order Service**        | Order creation, modification, tracking, and status updates.                 |
| **Delivery Service**     | Assigns drivers based on availability and location.                         |
| **Payment Service**      | Handles secure payment transactions.                                       |
| **Notification Service** | Sends SMS & Email notifications on order updates.                          |

All services are integrated through an **API Gateway** to centralize communication and routing.

---

## 👥 User Roles

- **Customer**
  - Register/Login
  - Browse restaurants and menus
  - Add to cart and place orders
  - Track deliveries

- **Restaurant Admin**
  - Add/update/delete menu items
  - Manage incoming orders
  - Set restaurant availability
  - Handle payments

- **Delivery Personnel**
  - View available deliveries
  - Accept and complete orders
  - Update delivery status

---

## 🔐 Authentication & Authorization

- Secure login and JWT-based authentication
- Role-based access control (RBAC)
- Tokens validated via API Gateway before accessing any protected endpoint

---

## 💰 Payment Gateway Integration

Integrated with Sri Lankan and global payment services:

- [x] PayHere (Sri Lanka)

---

## 📲 Notification System

- Real-time notifications via:
  - **SMS** 
  - **Email** 
- Order status updates
- Delivery assignments

---

## 🚀 Setup & Deployment

> Prerequisites: Docker, Kubernetes, Node.js, React

```bash
# Clone the repository
git clone https://github.com/your-username/eateazy.git
cd eateazy

# Start Docker containers for services
docker-compose up --build

# Deploy to Kubernetes (sample)
kubectl apply -f k8s/

# Run React frontend
cd client
npm install
npm start
