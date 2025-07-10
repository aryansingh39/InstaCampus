import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { postsAPI } from '../api/posts';
import toast from 'react-hot-toast';

type Comment = {
  id: number;
  content: string;
  createdAt: string;
  author: { id: number; name: string };
};

export default function CommentsSection({ postId }: { postId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm<{content: string}>();

  const loadComments = async () => {
    try {
      const data: any = await postsAPI.getComments(postId);
      setComments(data);
    } catch (error) {
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadComments(); }, [postId]);

  const onSubmit = async (data: any) => {
    try {
      await postsAPI.createComment(postId, { content: data.content });
      toast.success('Comment added!');
      reset();
      loadComments();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) return <div className="text-sm text-gray-500 mt-3">Loading comments...</div>;

  return (
    <div className="mt-4 border-t pt-4">
      {/* Add Comment Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <div className="flex gap-2">
          <input
            {...register('content', { required: true })}
            placeholder="Write a comment..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-300 transition"
          />
          <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm hover:bg-indigo-600 transition">
            Post
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-3">
        {comments.length === 0 ? (
          <p className="text-gray-400 text-sm">No comments yet. Be the first!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {comment.author.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="bg-gray-50 rounded-lg px-3 py-2">
                  <div className="font-semibold text-sm">{comment.author.name}</div>
                  <p className="text-sm text-gray-800">{comment.content}</p>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(comment.createdAt).toLocaleDateString()} at{' '}
                  {new Date(comment.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
