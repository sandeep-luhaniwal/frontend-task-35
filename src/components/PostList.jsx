import { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Posts</h2>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post._id} className="border-b pb-4">
              <h3 className="text-lg font-medium">{post.title}</h3>
              <p className="text-gray-600 mb-2">{post.content}</p>
              <div className="text-sm text-gray-500">
                Posted by: {post.user?.name} ({post.user?.email})
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;
