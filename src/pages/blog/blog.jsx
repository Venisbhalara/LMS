import React from "react";
import { FaLightbulb, FaCode, FaPencilRuler } from "react-icons/fa";
import "./Blog.css";

const posts = [
  {
    title: "Top Skills to Learn in 2026",
    description:
      "Discover the most in-demand skills for 2026 and how you can prepare yourself.",
    date: "Jan 5, 2026",
    image: "",
    icon: <FaLightbulb />,
  },
  {
    title: "How to Become a Web Developer",
    description:
      "Step-by-step guide to becoming a successful web developer from scratch.",
    date: "Dec 28, 2025",
    image: "",
    icon: <FaCode />,
  },
  {
    title: "UI/UX Trends You Should Know",
    description:
      "Stay ahead in design with the latest UI/UX trends shaping the industry.",
    date: "Jan 1, 2026",
    image: "",
    icon: <FaPencilRuler />,
  },
];

const categories = ["Learning Tips", "Career Guides", "Tech Insights", "UI/UX", "Web Development"];
const recentPosts = ["Top Skills to Learn in 2026", "UI/UX Trends You Should Know", "How to Become a Web Developer"];

const Blog = () => {
  return (
    <div className="blog-page">
      {/* HERO */}
      <section className="blog-hero">
        <div className="hero-content">
          <h1>EduMaster Blog</h1>
          <p>Learning tips, career guides & tech insights</p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="blog-section">
        <div className="posts-grid">
          {posts.map((post, index) => (
            <div className="blog-card" key={index}>
              {post.image ? (
                <img src={post.image} alt={post.title} className="blog-img" />
              ) : (
                <div className="blog-icon">{post.icon}</div>
              )}
              <div className="blog-card-content">
                <h3>{post.title}</h3>
                <p className="blog-desc">{post.description}</p>
                <span className="blog-date">{post.date}</span>
                <button className="blog-btn">Read More</button>
              </div>
            </div>
          ))}
        </div>

        {/* CATEGORIES BELOW CARDS */}
        <section className="categories-section">
          <h3>Categories</h3>
          <div className="categories-grid">
            {categories.map((cat, idx) => (
              <span key={idx} className="category-pill">
                {cat}
              </span>
            ))}
          </div>
        </section>

        {/* RECENT POSTS BELOW CARDS */}
        <section className="recent-posts-section">
          <h3>Recent Posts</h3>
          <ul>
            {recentPosts.map((post, idx) => (
              <li key={idx}>{post}</li>
            ))}
          </ul>
        </section>
      </section>
    </div>
  );
};

export default Blog;
