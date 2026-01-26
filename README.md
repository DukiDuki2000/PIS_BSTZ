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
## 🔄 CI/CD Pipeline
The project includes a complete **Continuous Integration and Continuous Deployment (CI/CD) pipeline** to automate builds, tests, deployments, and monitoring. The pipeline consists of:

### 🔹 Infrastructure
- **Docker** – All services are containerized, including MongoDB, Elasticsearch, PostgreSQL, and additional tools.
- **Ngrok** – Used to establish a secure tunnel between the internal Jenkins server and GitHub for webhook triggering.
- **DbGate** – Database management tool.
- **Jira** – Issue tracking system for error handling.
- **Sonatype Nexus** – Repository manager for storing versioned builds.

### 🔹 Jenkins Automation
- **Jenkins** is responsible for building, testing, and deploying the application.
- **GitHub Webhooks** trigger Jenkins jobs automatically upon new commits or pull requests.
- **Automated Testing** – Jenkins runs unit tests and integration tests to ensure application stability.
- **Deployment** – Jenkins launches the application after successful builds.
- **Error Handling** – If an error occurs, Jenkins automatically creates an issue in Jira for tracking.
- **Versioning** – All application versions are stored in **Sonatype Nexus** to ensure proper version management and rollback capabilities.

![frag](https://github.com/DukiDuki2000/PIS_BSTZ/blob/PIS02-59-back-end/dock/frag.png)
![fragment](https://github.com/DukiDuki2000/PIS_BSTZ/blob/PIS02-59-back-end/dock/fragment%20pis.png)
![schem](https://github.com/DukiDuki2000/PIS_BSTZ/blob/PIS02-59-back-end/dock/schamet.png)


## Contributors
- [@TokareG](https://github.com/TokareG)
- [@DukiDuki](https://github.com/DukiDuki2000)
- [@VaioStar](https://github.com/VaioStar)