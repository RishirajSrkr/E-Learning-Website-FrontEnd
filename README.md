**FEATURES**

**Core Features**

User Authentication: Sign up, login, and logout functionalities with secure token-based authentication. Role-based access for instructors and learners.

Course Management: Instructors can create, update, and delete courses. Learners can browse and enroll in courses.

Voting System: Courses can be upvoted by learners to promote quality content. Votes are cached in Redis for efficiency and persisted to the database periodically.

Review System: Learners can add ratings and reviews for courses. Reviews contribute to a course's overall rating and popularity.



**Additional Features**

Responsive Design: Fully functional across devices.

Performance Optimizations: Utilizes Redis caching for high-frequency operations.

Scalability: Modular design enables easy addition of new features.




**TECHNICAL ARCHITECTURE**

**Frontend**

Framework: React.js

Key Libraries: Axios for API communication, React-Router for navigation, Tailwind CSS for styling, React Hot Toast for notifications.


**Backend**

Framework: Spring Boot

Database: MongoDB (NoSQL for flexibility and scalability)

Caching: Redis (used for temporary vote tracking)

Security: Spring Security with JWT-based authentication

File Uploads: Integrated with a cloud storage service for profile images and course materials


**DevOps**

Environment Variables: Managed via .env files.

API Deployment: Dockerized Spring Boot application.

Frontend Hosting: Deployed on a modern platform like Vercel or Netlify.

Monitoring: Logs and scheduled tasks handled via SLF4J and Spring's scheduling framework

