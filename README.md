# DevConnect

DevConnect is a freelance platform that connects **developers** and **clients**. Clients can post jobs, and developers can showcase their skills and apply for opportunities. This full-stack project includes:

- Frontend: React + Vite + Tailwind CSS
- Backend: (to be implemented) – REST API with authentication and role-based access
- Database: PostgreSQL or SQLite (via SQLAlchemy)

---

## 📁 Project Structure

DevConnect/
├── public/
├── src/
│ ├── assets/
│ ├── components/
│ │ └── layout/
│ │ └── Navbar.jsx
│ ├── pages/
│ ├── App.jsx
│ └── main.jsx
├── tailwind.config.js
├── postcss.config.js
├── index.html
└── README.md

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/njoro24/DevConnect.git
cd devconnect
2. Install dependencies
bash
Copy
Edit
npm install
3. Run the app
bash
Copy
Edit
npm run dev
💻 Features
User authentication (developer/client roles)

Job postings (by clients)

Developer skill profiles

Tailwind-styled UI

Responsive design

🗃️ Database Schema
Below is the ERD (Entity Relationship Diagram) representing the core database structure:

🔗 Relationships
A User can be a Client or Developer

A Client can post many Jobs

A User can have many Skills via the user_skills table

A Skill can belong to many users

📊 Diagram
plaintext
Copy
Edit
Users
-----
id (PK)
name
email (unique)
password_hash
role ('developer' or 'client')
bio
created_at

Jobs
----
id (PK)
title
description
budget
status ('open', 'in_progress', 'completed', 'closed')
client_id (FK to Users.id)
created_at
updated_at

Skills
------
id (PK)
name (unique)
category
created_at

UserSkills
----------
id (PK)
user_id (FK to Users.id)
skill_id (FK to Skills.id)
experience_level ('Beginner', 'Intermediate', 'Advanced')
years_of_experience
created_at
(unique: user_id + skill_id)
📦 Dependencies
React

Vite

Tailwind CSS

PostCSS

Autoprefixer

📌 TODO
 Set up backend (Flask/Django/Node)

 JWT-based authentication

 Developer dashboards

 Job application functionality

 Admin/moderation features

📄 License
This project is open-source and available under the MIT License.

👨‍💻 Author
Meshack Gikonyo
Graduate Software Engineer | Full-Stack Developer in training



