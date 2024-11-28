import React from 'react';

const Documentation = () => {
  return (
    <div className="py-32 bg-bgOne text-white p-6">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold text-center mb-12">
          E-Learning Platform Documentation
        </h1>
        <p className="text-lg mb-6">
          Welcome to the official documentation for our E-Learning Platform.
          This document provides a detailed overview of the platform's features,
          architecture, and usage. It is intended for contributors, users, and
          developers looking to understand or extend the platform.
        </p>

        <h2 className="text-3xl font-semibold mb-4">Overview</h2>
        <p className="mb-6">
          Our E-Learning Platform empowers learners and instructors by providing
          a seamless environment for course creation, enrollment, voting, and
          reviews. Built with a robust backend and an intuitive frontend, the
          platform ensures a modern and scalable user experience.
        </p>

        <h2 className="text-3xl font-semibold mb-4">Features</h2>
        <h3 className="text-2xl font-semibold mb-3">Core Features</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>User Authentication:</strong> Sign up, login, and logout
            functionalities with secure token-based authentication. Role-based
            access for instructors and learners.
          </li>
          <li>
            <strong>Course Management:</strong> Instructors can create, update,
            and delete courses. Learners can browse and enroll in courses.
          </li>
          <li>
            <strong>Voting System:</strong> Courses can be upvoted by learners
            to promote quality content. Votes are cached in Redis for efficiency
            and persisted to the database periodically.
          </li>
          <li>
            <strong>Review System:</strong> Learners can add ratings and reviews
            for courses. Reviews contribute to a course's overall rating and
            popularity.
          </li>
        </ul>

        <h3 className="text-2xl font-semibold mt-6 mb-3">Additional Features</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Responsive Design:</strong> Fully functional across devices.
          </li>
          <li>
            <strong>Performance Optimizations:</strong> Utilizes Redis caching
            for high-frequency operations.
          </li>
          <li>
            <strong>Scalability:</strong> Modular design enables easy addition of
            new features.
          </li>
        </ul>

        <h2 className="text-3xl font-semibold mt-6 mb-4">Technical Architecture</h2>
        <h3 className="text-2xl font-semibold mb-3">Frontend</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Framework:</strong> React.js
          </li>
          <li>
            <strong>Key Libraries:</strong> Axios for API communication,
            React-Router for navigation, Tailwind CSS for styling, React Hot
            Toast for notifications.
          </li>
        </ul>

        <h3 className="text-2xl font-semibold mt-6 mb-3">Backend</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Framework:</strong> Spring Boot
          </li>
          <li>
            <strong>Database:</strong> MongoDB (NoSQL for flexibility and
            scalability)
          </li>
          <li>
            <strong>Caching:</strong> Redis (used for temporary vote tracking)
          </li>
          <li>
            <strong>Security:</strong> Spring Security with JWT-based
            authentication
          </li>
          <li>
            <strong>File Uploads:</strong> Integrated with a cloud storage
            service for profile images and course materials
          </li>
        </ul>

        <h3 className="text-2xl font-semibold mt-6 mb-3">DevOps</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Environment Variables:</strong> Managed via .env files.
          </li>
          <li>
            <strong>API Deployment:</strong> Dockerized Spring Boot application.
          </li>
          <li>
            <strong>Frontend Hosting:</strong> Deployed on a modern platform like
            Vercel or Netlify.
          </li>
          <li>
            <strong>Monitoring:</strong> Logs and scheduled tasks handled via
            SLF4J and Spring's scheduling framework.
          </li>
        </ul>

      </div>
    </div>
  );
};

export default Documentation;
