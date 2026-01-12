# 🚖 Ride‑Hailing Application  
A backend + frontend learning project demonstrating **REST**, **SOAP**, **GraphQL**, **Sequelize ORM**, and **UI consumption**.

---

## 📌 Project Overview

This project simulates a simple **Ride‑Hailing system** (like Uber).  
It includes:

- User registration & login  
- Driver vehicle registration  
- Ride lifecycle management  
- Payment recording  
- Rating system  
- Multiple API styles (REST, SOAP, GraphQL)  
- Frontend consumption through HTML/JS and Angular

---

## 📂 Repository Structure

```
/repo
│
├── /backend
│    │
│    ├── /rest
│    │     ├── controllers/
│    │     ├── routes/
│    │     ├── models/
│    │     ├── database/
│    │     └── server.js
│    │
│    ├── /soap
│    │     ├── rating-service.wsdl
│    │     └── rating-soap.js      ← mock Rating SOAP service
│    │
│    ├── /graphql
│          ├── schema.js
│          ├── payment-resolver.js
│          ├── ride-resolver.js
│          └── server.js
│
├── /frontend
│    │
│    ├── /html-js-css
│    │     ├── login.html
│    │     ├── request-ride.html
│    │     ├── driver-rides.html
│    │     └── scripts.js
│    │
│    ├── /angular
│          ├── app/
│          ├── components/
│          └── services/
│
└── README.md
```

---

# 🧠 Architecture Summary

This project follows a **3‑layer architecture**:

### **UI Layer**
- HTML/JS frontend (simple pages)
- Angular conceptual structure

### **Service Layer**
- REST API (main backend)
- SOAP API (rating example)
- GraphQL API (payment + ride example)

### **Data Layer**
- MySQL database (Sequelize ORM)
- Tables: Users, Vehicles, Rides, Payments, Ratings
- Relationships are handled in `models/index.js`

---

# 🛠 Technologies Used

### Backend
- Node.js  
- Express.js  
- Sequelize ORM  
- MySQL  
- GraphQL  
- SOAP (mock)

### Frontend
- HTML  
- CSS  
- JavaScript  
- Angular 

---

# ⚙️ Setup Instructions

### **1. Clone Repo**
```
git clone https://github.com/<username>/ride-hailing.git
cd ride-hailing/repo/backend/rest
```

### **2. Install Dependencies**
```
npm install
```

### **3. Configure DB**
Edit:
```
backend/rest/database/config.js
```

### **4. Start Server**
```
npm start
```

Server URL:

```
http://localhost:5000
```

---

# 🚕 Ride Workflow (Key Logic)

The ride moves through these stages:

1. Rider requests ride  
2. Driver sees available rides  
3. Driver accepts ride  
4. Driver starts ride  
5. Driver completes ride  
6. Payment is recorded  
7. Rating is submitted  

Each stage updates specific fields using PATCH APIs.

---

# 🔌 REST API Endpoints (Main Backend)

### **Users**
- POST `/users/register`
- POST `/users/login`

### **Vehicles**
- POST `/vehicles`
- GET `/vehicles/:driver_id`

### **Rides**
- POST `/rides/request`
- GET `/rides`
- PATCH `/rides/:id/accept`
- PATCH `/rides/:id/start`
- PATCH `/rides/:id/complete`
- PATCH `/rides/:id/cancel`

### **Payments**
- POST `/payments`

### **Ratings**
- POST `/ratings`

---

# 🧼 SOAP Example (Rating Service)

Folder: `/backend/soap`

Includes:

- `rating-service.wsdl`
- `rating-soap.js`

SOAP exposes a simple:

```
submitRating(ratingInput)
```

operation.

---

# 🧬 GraphQL Example

Folder: `/backend/graphql`

Two sample resolvers:

- Ride resolver  
- Payment resolver  

Example Query:
```graphql
query {
  payment(id: 1) {
    amount
    method
    status
  }
}
```

Example Mutation:
```graphql
mutation {
  createRide(rider_id: 2, pickup: "CP", drop: "Airport") {
    ride_id
    status
  }
}
```

---

# 🎨 Frontend Integration

### **Simple HTML/JS Frontend**
Located under `/frontend/html-js-css`

- login page  
- request ride page  
- driver ride list  
- JS using `fetch()` to call backend APIs  

### **Angular Frontend**
Conceptual example showing:
- Components  
- Services  
- API calls  
