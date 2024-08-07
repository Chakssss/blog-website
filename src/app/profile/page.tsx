// "use client"
// import { useState, FormEvent, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// export default function Profile() {
//   const [showForm, setShowForm] = useState(false);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [content, setContent] = useState("");
//   const rows = 4;
//   const router = useRouter();
  
//   // Extract query parameters
//   const searchParams = useSearchParams();
//   const email = searchParams.get('email') || "";

//   // Initialize user state
//   const [user, setUser] = useState({
//     name: "",
//     email: email,
//   });

//   useEffect(() => {
//     if (email) {
//       fetchUserByEmail(email);
//     }
//   }, [email]);

//   const fetchUserByEmail = async (email: string) => {
//     try {
//       const response = await fetch(`${api}/user_by_email?email=${encodeURIComponent(email)}`);
//       const data = await response.json();

//       if (response.ok) {
//         setUser(data);
//       } else {
//         console.error('Failed to fetch user:', data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching user:', error);
//     }
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`${api}/add_blog`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           title,
//           description,
//           content,
//           author: user.name
//         }),
//       });

//       if (response.ok) {
//         alert('Blog post added successfully');
//         setShowForm(false);
//         setTitle("");
//         setDescription("");
//         setContent("");
        
//       } else {
//         alert('Failed to add blog post');
//       }
//     } catch (error) {
//       console.error("Error adding blog post:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       {/* Profile Info */}
//       <div className="bg-gray-100 p-4 rounded mb-4">
//         <h2 className="text-xl font-bold">Profile</h2>
//         <p><strong>Name:</strong> {user.name}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//       </div>

//       {/* Add Blog Button */}
//       <button
//         onClick={() => setShowForm(!showForm)}
//         className="bg-blue-500 text-white p-2 rounded mb-4"
//       >
//         {showForm ? 'Cancel' : 'Add a Blog'}
//       </button>

//       {/* Add Blog Form */}
//       {showForm && (
//         <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded">
//           <h2 className="text-xl font-bold mb-4">Add a New Blog Post</h2>
//           <div className="mb-4">
//             <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={title}
//               onChange={(e)=> setTitle(e.target.value)}
//               className="border p-2 rounded w-full"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
//             <input
//               type="text"
//               id="description"
//               name="description"
//               value={description}
//               onChange={(e)=> setDescription(e.target.value)}
//               className="border p-2 rounded w-full"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="content" className="block text-sm font-medium mb-1">Content</label>
//             <textarea
//               id="content"
//               name="content"
//               value={content}
//               onChange={(e)=> setContent(e.target.value)}
//               className="border p-2 rounded w-full"
//               rows={rows}
//               required
//             />
//           </div>
//           <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//             Submit
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }
"use client";
import { useState, FormEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion"; // Import Framer Motion
const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function Profile() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const rows = 4;
  const router = useRouter();

  // Extract query parameters
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || "";

  // Initialize user state
  const [user, setUser] = useState({
    name: "",
    email: email,
  });

  useEffect(() => {
    if (email) {
      fetchUserByEmail(email);
    }
  }, [email]);

  const fetchUserByEmail = async (email: string) => {
    try {
      const response = await fetch(`${api}/user_by_email?email=${encodeURIComponent(email)}`);
      const data = await response.json();

      if (response.ok) {
        setUser(data);
      } else {
        console.error('Failed to fetch user:', data.message);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api}/add_blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          content,
          author: user.name
        }),
      });

      if (response.ok) {
        alert('Blog post added successfully');
        setShowForm(false);
        setTitle("");
        setDescription("");
        setContent("");
      } else {
        alert('Failed to add blog post');
      }
    } catch (error) {
      console.error("Error adding blog post:", error);
    }
  };

  // Animations
  const profileInfoVariants = {
    initial: { opacity: 0, translateY: 20 },
    animate: { opacity: 1, translateY: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, translateY: -20, transition: { duration: 0.3 } },
  };

  const addBlogButtonVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  const addBlogFormVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="container mx-auto p-4"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.7 } },
        exit: { opacity: 0, transition: { duration: 0.3 } },
      }}
    >
      {/* Profile Info */}
      <motion.div
        className="bg-gray-100 p-4 rounded mb-4"
        variants={profileInfoVariants}
      >
        <h2 className="text-xl font-bold">Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </motion.div>

      {/* Add Blog Button */}
      <motion.button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 text-white p-2 rounded mb-4"
        variants={addBlogButtonVariants}
      >
        {showForm ? 'Cancel' : 'Add a Blog'}
      </motion.button>

      {/* Add Blog Form */}
      {showForm && (
        <motion.form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-4 rounded"
          variants={addBlogFormVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <h2 className="text-xl font-bold mb-4">Add a New Blog Post</h2>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e)=> setTitle(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e)=> setDescription(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium mb-1">Content</label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e)=> setContent(e.target.value)}
              className="border p-2 rounded w-full"
              rows={rows}
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
        </motion.form>
      )}
    </motion.div>
  );
}
