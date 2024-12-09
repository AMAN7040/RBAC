# Role-Based Access Control (RBAC) Admin Dashboard

> A React-based admin dashboard for managing users, roles, and dynamic permissions with a mock backend API using `json-server`.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Setup Instructions](#setup-instructions)


---

## Project Overview

This project is a **web application** built with **React** and **Redux** for state management. It provides functionalities like **user management**, **role management**, **dynamic permissions**, and a **search feature**. The backend for this application is simulated using **MockAPI** via `json-server`.

In this application:
1. **User management** allows you to add, edit, and delete users.
2. **Role management** enables adding and editing roles dynamically, with dynamic permissions.
3. **Search functionality** allows filtering users by name, role, and other criteria.

---

## Features

### 1. User Management
- Add, edit, and delete users.
- View a list of all users with dynamic data from the backend.

### 2. Role Management
- Add and edit roles dynamically.
- Roles are linked to users, and the application adjusts content based on the user's role.
- Dynamic permissions can be set based on user roles.

### 3. Search Functionality
- Search for users by name, role, and other attributes.
- Filters can be applied to narrow down the list of users dynamically.

### 4. State Management
- Uses **Redux** to manage application state, ensuring consistent data across components.

---

## Setup Instructions

### Prerequisites
- **Node.js**: Ensure you have Node.js installed on your system. You can download it from [here](https://nodejs.org/).
- **MockAPI**: We are using `json-server` to simulate the backend. You need to run `json-server` to start the mock API server.

### Steps to Run the Project Locally

1. **Clone the repository**:
   
   git clone https://github.com/AMAN7040/RBAC.git


2. **Navigate into the project directory**:
   cd project-name

3. **Install dependencies: Run the following command to install the required dependencies**:
   npm install

4. **Run the MockAPI server: In a new terminal, run the following command to start the mock server:**
   json-server --watch db.json --port 5001

5. **Run the application: To start the React development server, run:**
   npm start

