const API = import.meta.env.VITE_API_BASE ?? '/api/v1';

async function request<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API}${url}`, {
    credentials: 'include',           // send / receive cookies
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? 'Request failed');
  return data;
}

export const authAPI = {
  register: (body: any) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login:    (body: any) => request('/auth/login',    { method: 'POST', body: JSON.stringify(body) }),
  me:       ()          => request('/auth/me'),
};
