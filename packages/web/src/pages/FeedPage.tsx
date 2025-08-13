import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { postsAPI } from '../api/posts';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import CommentsSection from '../components/CommentsSection';

type Post = {
  id: number;
  content: string;
  tags: string[];
  createdAt: string;
  author: { id: number; name: string };
  reactionCounts: { UPVOTE?: number; DOWNVOTE?: number; LIKE?: number };
  commentCount: number;
};

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedPosts, setExpandedPosts] = useState<number[]>([]);
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

  const toggleComments = (postId: number) => {
    setExpandedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };
  const handleReaction = async (postId: number, type: string) => {
  try {
    await postsAPI.toggleReaction(postId, type);
    loadPosts(); // Refresh to get updated counts
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
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-slate-50 to-indigo-50">
      {/* Main header */}
      <header className="bg-white shadow sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="text-2xl text-indigo-600 font-bold"> InstaCampus</div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-700">Hello, {user?.name}!</span>
            <button onClick={logout} className="text-xs text-white bg-red-400 px-3 py-1 rounded hover:bg-red-600 transition">Logout</button>
          </div>
        </div>
      </header>

      {/* Flex row for sidebar + feed */}
      <div className="max-w-5xl mx-auto px-2 py-5 flex gap-5">
        {/* SIDEBAR - hidden on mobile */}
        <aside className="hidden md:block w-64 sticky top-24 self-start">
          {/* Trending tags */}
          <div className="bg-white border border-slate-100 rounded-xl shadow-md p-5 mb-6 animate-fade-in">
            <div className="font-bold text-indigo-700 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 8c0 2.21-1.79 4-4 4s-4-1.79-4-4M12 16v6m0 0c-3.31 0-6-2.69-6-6h12c0 3.31-2.69 6-6 6z"/></svg>
              Trending Tags
            </div>
            <div className="flex flex-wrap gap-2">
              {["fest", "food", "placements", "exams", "hostel", "sports"].map(tag =>
                <span key={tag} className="bg-orange-100 animate-pop text-orange-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm cursor-pointer hover:bg-orange-200 transition">{tag}</span>
              )}
            </div>
          </div>
          {/* Campus Links */}
<div className="bg-white border border-slate-100 rounded-xl shadow-md p-5 animate-fade-in">
  <div className="font-bold mb-2 text-indigo-700">Campus Links</div>
  <a href="https://www.nitw.ac.in/" target="_blank" rel="noopener noreferrer" className="block text-indigo-400 hover:text-indigo-700 transition">Official Website</a>
  <a href="https://erp.nitw.ac.in/erp/login" target="_blank" rel="noopener noreferrer" className="block text-indigo-400 hover:text-indigo-700 transition">SMILE Portal</a>
</div>

        </aside>
        {/* MAIN FEED */}
        <div className="flex-1 min-w-0">
          {/* Create Post Card */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-slate-100 animate-fade-in">
            <h2 className="text-lg font-semibold mb-2 text-indigo-700">Share with your campus</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <textarea
                {...register('content', { required: true })}
                placeholder="What's new on campus? 📢"
                className="w-full p-3 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-300 transition"
                rows={3}
              />
              <input
                {...register('tags')}
                placeholder="#tags (comma separated) - e.g. fest,events"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-300 transition"
              />
              <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-blue-400 text-white font-semibold py-2 rounded-lg shadow hover:from-indigo-600 hover:to-blue-500 transition">
                Post
              </button>
            </form>
          </div>
          {/* Feed */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Campus Feed</h2>
            <div className="space-y-7">
              {posts.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow animate-fade-in">
                  <div className="text-4xl mb-3">🦅</div>
                  <p className="text-gray-400">No posts yet. Be the first to post!</p>
                </div>
              ) : (
                posts.map(post => (
                  <div key={post.id} className="bg-white border border-slate-100 rounded-xl shadow hover:shadow-2xl animate-fade-in transition p-6">
                    {/* Post header */}
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {post.author.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <div className="font-semibold">{post.author.name}</div>
                        <div className="text-xs text-slate-400">
                          {new Date(post.createdAt).toLocaleDateString()} &nbsp;•&nbsp;
                          {new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                    {/* Post content */}
                    <p className="text-slate-800 mb-3 whitespace-pre-line">{post.content}</p>
                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {post.tags.map(tag =>
                          <span key={tag} className="bg-indigo-50 text-indigo-500 px-2 py-1 rounded-full text-xs font-semibold">#{tag}</span>
                        )}
                      </div>
                    )}
                    {/* Like/Comment buttons */}
<div className="flex space-x-4 mt-5 text-slate-400 text-sm border-t pt-3">
  <button 
    onClick={() => handleReaction(post.id, 'UPVOTE')}
    className="hover:text-indigo-500 transition flex items-center space-x-1"
  >
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"/></svg>
    <span>Upvote {post.reactionCounts.UPVOTE || 0}</span>
  </button>
  <button 
    onClick={() => handleReaction(post.id, 'DOWNVOTE')}
    className="hover:text-red-500 transition flex items-center space-x-1"
  >
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
    <span>Downvote {post.reactionCounts.DOWNVOTE || 0}</span>
  </button>
  <button 
    onClick={() => toggleComments(post.id)}
    className="hover:text-pink-500 transition flex items-center space-x-1"
  >
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h12a2 2 0 012-2z"/></svg>
    <span>Comment {post.commentCount || 0}</span>
  </button>
</div>

                    {/* Comments Section */}
                    {expandedPosts.includes(post.id) && (
                      <CommentsSection postId={post.id} />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
