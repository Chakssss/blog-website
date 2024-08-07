"use client"
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    
    try {
      const res = await fetch(`${api}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "An error occurred");
      }

      setSuccessMessage(data.message);
      
      // Redirect to dashboard with email query parameter
      router.push(`/dashboard?email=${encodeURIComponent(email)}`);
      
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center animate-fade-in" style={{ backgroundImage: "url('https://www.applocum.com/wp-content/uploads/2020/12/blog-700x571.png')", backgroundSize: 'contain' }}>
      <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-50 rounded-lg shadow-lg backdrop-blur-md animate-slide-in">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >
              LOGIN
            </button>
          </div>
          <div>
            <a href="/signup" className="ml-40">Signup</a>
          </div>
        </form>
      </div>
    </div>
  );
}
