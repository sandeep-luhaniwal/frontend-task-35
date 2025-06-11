import { useState, useEffect } from 'react';
import axios from 'axios';

const PostForm = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/posts', {
        title,
        content,
        user: userId
      });
      onPostCreated(response.data);
      setTitle('');
      setContent('');
      setUserId('');
      alert('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">Title</label>
          <input id="title" type="text" className="w-full p-2 border border-gray-300 rounded" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="content">Content</label>
          <textarea id="content" className="w-full p-2 border border-gray-300 rounded" value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="user">User</label>
          <select id="user" className="w-full p-2 border border-gray-300 rounded" value={userId} onChange={(e) => setUserId(e.target.value)} required>
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Create Post</button>
      </form>
    </div>
  );
};

export default PostForm;
