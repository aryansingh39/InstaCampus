import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { postsAPI } from '../api/posts';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

type Post = {
  id: number;
  content: string;
  tags: string[];
  createdAt: string;
  author: { id: number; name: string };
};

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm<{content: string; tags: string}>();
  const { user, logout } = useAuth();

  const loadPosts = async () => {
    try {
      const data: any = await postsAPI.list();
      setPosts(data);
    } catch (error) {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadPosts(); }, []);

  const onSubmit = async (data: any) => {
    try {
      const tags = data.tags.split(',').map((t: string) => t.trim()).filter(Boolean);
      await postsAPI.create({ content: data.content, tags });
      toast.success('Post created!');
      reset();
      loadPosts(); // Refresh feed
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading feed...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">🎓 InstaCampus</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Hello, {user?.name}!</span>
            <button 
              onClick={logout}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Create Post Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Share something with campus!</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <textarea
              {...register('content', { required: true })}
              placeholder="What's happening on campus today?"
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={3}
            />
            <input
              {...register('tags')}
              placeholder="Tags (comma separated): study, food, events"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Post to Campus
            </button>
          </form>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Campus Feed</h2>
          
          {posts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <div className="text-4xl mb-4">📱</div>
              <p className="text-gray-500">No posts yet. Be the first to share!</p>
            </div>
          ) : (
            posts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-sm p-6">
                {/* Post Header */}
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {post.author.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">{post.author.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()} at{' '}
                      {new Date(post.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-gray-800 mb-4 whitespace-pre-wrap">{post.content}</p>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
