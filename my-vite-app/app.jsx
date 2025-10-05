import React from "react";
import { Routes, Route, Link, Navigate, useParams } from "react-router-dom";

const posts = [
  {
    id: 1,
    title: "How to Build a Modern React App",
    author: "Divyanshi",
    date: "Oct 1, 2025",
    excerpt: "Learn how to set up a React project with routing and TailwindCSS.",
    tags: ["React", "Tailwind"],
  },
  {
    id: 2,
    title: "UI Design Basics for Developers",
    author: "A. Designer",
    date: "Sep 24, 2025",
    excerpt: "Simple ways to make your components look better with minimal CSS.",
    tags: ["UI", "Design"],
  },
  {
    id: 3,
    title: "Performance Tips for Frontend",
    author: "Team Web",
    date: "Aug 12, 2025",
    excerpt: "Small optimizations that can make a big difference in your web app.",
    tags: ["Performance"],
  },
  {
    id: 4,
    title: "Using CSS Grid with Tailwind",
    author: "Layout Guru",
    date: "Jul 3, 2025",
    excerpt: "Easily create responsive grids for your blog pages.",
    tags: ["CSS", "Layout"],
  },
];

function Navbar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg text-blue-600">MyBlog</Link>
        <nav className="space-x-4">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/blogs" className="hover:text-blue-600 font-medium">Blogs</Link>
        </nav>
      </div>
    </header>
  );
}

function Home() {
  return (
    <main className="max-w-5xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-2">Welcome to MyBlog</h1>
      <p className="text-gray-600 mb-6">A simple React + Tailwind website with routing.</p>
      <Link to="/blogs" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
        Go to Blogs →
      </Link>
    </main>
  );
}

function BlogCard({ post }) {
  return (
    <article className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition border border-gray-100">
      <div className="bg-gray-100 h-40 flex items-center justify-center text-gray-500 text-sm">Image</div>
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
        <div className="text-sm text-gray-500 mb-2">
          {post.author} · {post.date}
        </div>
        <p className="text-gray-700 text-sm mb-3">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="space-x-2">
            {post.tags.map(tag => (
              <span key={tag} className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-md">
                {tag}
              </span>
            ))}
          </div>
          <Link to={`/blogs/${post.id}`} className="text-blue-600 text-sm font-medium hover:underline">
            Read →
          </Link>
        </div>
      </div>
    </article>
  );
}

function BlogsPage() {
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Latest Blogs</h1>
      <p className="text-gray-600 mb-6">Explore the latest articles from our writers.</p>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(p => (
          <BlogCard key={p.id} post={p} />
        ))}
      </section>
    </main>
  );
}

function BlogDetail() {
  const { id } = useParams();
  const post = posts.find(p => String(p.id) === id);

  if (!post)
    return (
      <main className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-600">Post not found</h2>
      </main>
    );

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-1">{post.title}</h1>
      <div className="text-sm text-gray-500 mb-4">
        {post.author} · {post.date}
      </div>
      <p className="text-gray-700 mb-4">{post.excerpt}</p>
      <p className="text-gray-600">
        This is a demo blog post. You can replace this text with full content from your database or Markdown file.
      </p>
      <Link to="/blogs" className="inline-block mt-6 text-blue-600 hover:underline">
        ← Back to blogs
      </Link>
    </main>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

