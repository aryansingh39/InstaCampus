const API = '/api/v1';

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API}${url}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? 'Request failed');
  return data;
}

export const postsAPI = {
  list: () => request('/posts'),
  create: (body: any) => request('/posts', { 
    method: 'POST', 
    body: JSON.stringify(body) 
  }),
};
