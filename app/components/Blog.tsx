"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5"; // Import Ionicons from react-icons

const supabase = createClient(
  "https://fgcvmbrvxniokscuukvd.supabase.co", // Replace with your Supabase URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnY3ZtYnJ2eG5pb2tzY3V1a3ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0OTg2MDUsImV4cCI6MjA0MjA3NDYwNX0.5q2krAQ8lrkuiYx84tHoQs4fEqEcNKO54fDcrHEL1AQ" // Replace with your Supabase Anon Key
);

interface Blog {
  id: number;
  title: string;
  image: string;
  category: string;
  date: string;
  comments: number;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from("blogs") // The name of your table in Supabase
        .select("*")
        .order("date", { ascending: false }); // Sort by the latest blogs

      if (error) {
        console.error("Error fetching blogs:", error.message);
      } else {
        setBlogs(data as Blog[]);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    const scrollContainer = document.querySelector(".blog-list");
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    console.log("Scroll Width:", scrollWidth);  // Debugging

    let scrollInterval = setInterval(() => {
      // Scroll the container by 1px to the right
      if (scrollContainer.scrollLeft >= scrollWidth) {
        scrollContainer.scrollLeft = 0; // Reset to the beginning when it reaches the end
      } else {
        scrollContainer.scrollLeft += 1; // Move 1px at a time
      }
    }, 30); // Adjust the interval for faster/slower scrolling

    // Clear the interval when the component unmounts
    return () => clearInterval(scrollInterval);
  }, []);

  if (loading) {
    return (
      <section className="section blog" id="blog">
        <div className="container">
          <h2 className="h2 section-title text-center mb-10">Our Blogs</h2>
          <p className="text-center text-gray-600">Loading blogs...</p>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return (
      <section className="section blog" id="blog">
        <div className="container">
          <h2 className="h2 section-title text-center mb-10">Our Blog</h2>
          <p className="text-center text-gray-600">No blogs available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section blog" id="blog">
      <div className="container">
        <h2 className="h2 section-title text-center mb-10">Our Blog</h2>
        <ul className="blog-list has-scrollbar flex gap-6 overflow-x-auto">
          {blogs.map((blog) => (
            <li
              key={blog.id}
              className="blog-card flex-shrink-0 w-80 bg-white shadow-md rounded-lg overflow-hidden"
            >
              <figure className="card-banner relative">
                <a href={`/blog?id=${blog.id}`}>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                </a>
                <a
                  href="#"
                  className="btn card-badge absolute bottom-4 left-4 bg-indigo-600 text-white px-2 py-1 rounded-md text-xs"
                >
                  {blog.category}
                </a>
              </figure>
              <div className="card-content p-6">
                <h3 className="h3 card-title text-lg font-bold text-gray-800 mb-4">
                  <a href="#">{blog.title}</a>
                </h3>
                <div className="card-meta flex justify-between text-gray-600 text-sm">
                  <time>{blog.date}</time>
                  <div className="flex items-center gap-2">
                    {/* Use react-icons Ionicon */}
                    <IoChatbubbleEllipsesOutline style={{ fontSize: "1.2rem", color: "gray" }} />
                    <span>{blog.comments}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
