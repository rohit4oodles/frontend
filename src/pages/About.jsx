// src/pages/About.js
import React, { useEffect } from 'react';

const About = () => {

  return (
    <div className="max-w-3xl mx-auto p-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">About Our Blog</h1>
      </header>

      <section className="space-y-6 text-gray-700">
        <p>
          Welcome to our blog! This platform is a space where we share our thoughts,
          ideas, and insights on various topics, ranging from technology and lifestyle
          to business and personal development.
        </p>
        <p>
          Whether you're a casual reader or an avid blogger, we hope you find content
          that resonates with you. Our mission is to create a community of like-minded
          individuals who are passionate about learning, growing, and sharing knowledge.
        </p>
        <p>
          This blog is created by a team of passionate individuals who are committed
          to providing useful and engaging content for our readers. We update the blog
          regularly, so make sure to check back for the latest posts.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">Our Team</h2>
        <ul className="list-disc pl-6">
          <li>Rohit Maurya - Founder & Writer</li>
          <li>Rohit - Editor</li>
          <li>Rohit- Content Creator</li>
        </ul>
      </section>

      <footer className="text-center mt-12">
        <p className="text-sm text-gray-500">&copy; 2025 BlogApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
