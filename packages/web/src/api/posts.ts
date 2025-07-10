const API = import.meta.env.VITE_API_BASE ?? '/api/v1';

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API}${url}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  let data;
  try {
    data = await res.json();
  } catch (err) {
    const text = await res.text();
    throw new Error(text || 'Server error');
  }

  if (!res.ok) {
    throw new Error(data?.error || 'Request failed');
  }

  return data;
}

export const postsAPI = {
  list: () => request('/posts'),
  create: (body: any) =>
    request('/posts', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  getComments: (postId: number) =>
    request(`/posts/${postId}/comments`),
  createComment: (postId: number, body: any) =>
    request(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  toggleReaction: (postId: number, type: string) =>
    request(`/posts/${postId}/reactions`, {
      method: 'POST',
      body: JSON.stringify({ type }),
    }),
  getReactions: (postId: number) =>
    request(`/posts/${postId}/reactions`),
};
