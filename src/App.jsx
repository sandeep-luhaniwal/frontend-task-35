import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Optional if you have custom styles

const API = 'http://localhost:5000';

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [formUser, setFormUser] = useState({ name: '', email: '' });
  const [formPost, setFormPost] = useState({ title: '', content: '', userId: '' });
  const [userSuccess, setUserSuccess] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get(`${API}/users`);
    setUsers(res.data);
  };

  const fetchPosts = async () => {
    const res = await axios.get(`${API}/posts`);
    setPosts(res.data);
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/users`, formUser);
      setFormUser({ name: '', email: '' });
      fetchUsers();
      setUserSuccess(true);
      setTimeout(() => setUserSuccess(false), 3000);
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/posts`, {
        title: formPost.title,
        content: formPost.content,
        user: formPost.userId,
      });
      setFormPost({ title: '', content: '', userId: '' });
      fetchPosts();
    } catch (err) {
      console.error('Error adding post:', err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-center">User & Post Demo</h1>

      {/* ✅ Success Message */}
      {userSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-center">
          User added successfully!
        </div>
      )}

      {/* User Form */}
      <form onSubmit={handleUserSubmit} className="space-y-4 border p-4 rounded shadow">
        <h2 className="text-xl font-semibold">Add User</h2>
        <input
          className="border p-2 w-full rounded"
          placeholder="Name"
          value={formUser.name}
          onChange={(e) => setFormUser({ ...formUser, name: e.target.value })}
        />
        <input
          className="border p-2 w-full rounded"
          placeholder="Email"
          value={formUser.email}
          onChange={(e) => setFormUser({ ...formUser, email: e.target.value })}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="submit">
          Add User
        </button>
      </form>

      {/* Post Form */}
      <form onSubmit={handlePostSubmit} className="space-y-4 border p-4 rounded shadow">
        <h2 className="text-xl font-semibold">Add Post</h2>
        <input
          className="border p-2 w-full rounded"
          placeholder="Title"
          value={formPost.title}
          onChange={(e) => setFormPost({ ...formPost, title: e.target.value })}
        />
        <textarea
          className="border p-2 w-full rounded"
          placeholder="Content"
          value={formPost.content}
          onChange={(e) => setFormPost({ ...formPost, content: e.target.value })}
        />
        <select
          className="border p-2 w-full rounded"
          value={formPost.userId}
          onChange={(e) => setFormPost({ ...formPost, userId: e.target.value })}
        >
          <option value="">Select User</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>{u.name}</option>
          ))}
        </select>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" type="submit">
          Add Post
        </button>
      </form>

      {/* Display Posts */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Posts</h2>
        {posts.map((post) => (
          <div key={post._id} className="p-4 border rounded shadow-sm">
            <h3 className="text-lg font-bold">{post.title}</h3>
            <p>{post.content}</p>
            <p className="text-sm text-gray-600 mt-1">Author: {post.user?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
