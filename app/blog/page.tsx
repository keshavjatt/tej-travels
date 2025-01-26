"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Navbar from "../components/Navbar"; // Adjust the path for Navbar
import Footer from "../components/Footer"; // Adjust the path for Footer
import Head from "next/head";

// Define the Blog Interface
interface Blog {
  id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  date: string;
  comments: number;
}

const supabase = createClient(
  "https://fgcvmbrvxniokscuukvd.supabase.co", // Replace with your Supabase URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnY3ZtYnJ2eG5pb2tzY3V1a3ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0OTg2MDUsImV4cCI6MjA0MjA3NDYwNX0.5q2krAQ8lrkuiYx84tHoQs4fEqEcNKO54fDcrHEL1AQ" // Replace with your Supabase Anon Key
);

function BlogDetailsContent() {
  const searchParams = useSearchParams();
  const blogId = searchParams?.get("id") || ""; // Fetch the `id` from the URL

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!blogId) return;

      const { data, error } = await supabase
        .from("blogs") // Replace with your table name
        .select("*")
        .eq("id", blogId)
        .single();

      if (error) {
        console.error("Error fetching blog:", error.message);
      } else {
        setBlog(data as Blog); // Type assertion to Blog
      }
      setLoading(false);
    };

    fetchBlog();
  }, [blogId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading blog...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="container-blogs mx-auto p-6">
      <div className="max-w-4xl mx-auto overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
          <p className="text-sm text-gray-600 mb-6">
            Category: <span className="text-indigo-600">{blog.category}</span> |{" "}
            <time>{new Date(blog.date).toLocaleDateString()}</time>
          </p>
          <p className="text-gray-700 leading-relaxed">{blog.content}</p>
          <div className="mt-6 flex justify-between items-center text-gray-600">
            <span>{blog.comments} Comments</span>
            <a href="/blog" className="text-indigo-600 hover:underline">
              Back to Blogs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogDetailPage() {
  return (
    <>
      <Head>
        <title>Blog Details</title>
      </Head>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <BlogDetailsContent />
      </Suspense>
      <Footer />
    </>
  );
}
