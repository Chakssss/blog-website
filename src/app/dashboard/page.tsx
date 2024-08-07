"use client"
import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || "";

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`${api}/blogs`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="container mx-auto px-4">
      {/* Header */}
      <header className="flex justify-between items-center py-4 border-b">
        <div className="text-2xl font-bold">
          <Image
            src="https://img.genial.ly/655ebedc78911b0012896675/9dea3cfc-a906-41b4-aeb3-8dba6268b554.png"
            alt="Logo"
            width={150}
            height={100}
          />
        </div>
        <form onSubmit={handleSearch} className="flex items-center space-x-4">
          <input
            type="text"
            className="border p-2 rounded-l"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts..."
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">
            Search
          </button>
        </form>
        <button
          onClick={() => router.push(`/profile?email=${encodeURIComponent(email)}`)}
          className="bg-gray-800 text-white p-2 rounded"
        >
          Profile
        </button>
      </header>

      {/* Main */}
      <main className="mt-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="bg-white p-6 rounded shadow mb-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <h2 className="text-3xl font-extrabold mb-2">{post.title}</h2> {/* Updated font size and weight */}
              <h3 className="text-xl font-semibold text-gray-700 mb-2">by {post.author}</h3> {/* Updated font size and weight */}
              <p className="text-lg text-gray-800 mb-4">{post.description}</p> {/* Updated font size */}
              <div className="text-base text-gray-900">{post.content}</div> {/* Updated font size */}
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-4 border-t">
        Created with innovation by Chakshu and Sidharth
      </footer>
    </div>
  );
}
