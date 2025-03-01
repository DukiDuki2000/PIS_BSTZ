# 📚 Library Management System

## 🎯 Project Goal
The project aims to learn Spring Boot and Apache Kafka by implementing a library management system. The system allows managing users, books, and loans.

## 🏗 Architecture
The system consists of multiple microservices communicating via REST API and Apache Kafka. The technologies used include:

- **Spring Boot** – the main framework for building microservices.
- **React** – the frontend for the user interface.
- **PostgreSQL** – database for users, books, and loans.
- **MongoDB** – database for system logs.
- **Elasticsearch** – indexing and searching data.
- **Apache Kafka** – asynchronous communication between microservices.

## 📌 System Components

### 🖥 Frontend
- **React** – the user interface for library management.

### 🏗 Backend

#### 1. **Spring API-Gateway Auth**
   - Handles user authentication and authorization.
   - Communicates with the user database (**User DB** - PostgreSQL).
   
#### 2. **Spring Book-Service**
   - Manages book-related operations.
   - Communicates with the book database (**Book DB** - PostgreSQL).
   - Sends data to **Elasticsearch** for indexing and searching.

#### 3. **Spring Loan-Service**
   - Handles book loans.
   - Communicates with the loan database (**Loan DB** - PostgreSQL).
   
#### 4. **Kafka**
   - Facilitates asynchronous messaging between microservices.

#### 5. **System Logs**
   - Log data is stored in **MongoDB**.
   - Logs are analyzed and searched using **Elasticsearch**.



