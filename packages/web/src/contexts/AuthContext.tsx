import React, { createContext, useContext, useEffect, useState } from 'react';
import { authAPI } from '../api/auth';
import toast from 'react-hot-toast';

type User = { id: number; name: string; email: string; role: 'ADMIN'|'STUDENT' };

interface Ctx {
  user: User|null;
  loading: boolean;
  login:  (e:string,p:string)=>Promise<void>;
  logout: ()=>Promise<void>;
  register:(d: any)=>Promise<void>;
}

const AuthCtx = createContext<Ctx>({} as Ctx);
export const useAuth = ()=> useContext(AuthCtx);

export function AuthProvider({children}:{children:React.ReactNode}) {
  const [user,setUser]   = useState<User|null>(null);
  const [loading,setL]   = useState(true);

  useEffect(()=>{ 
    authAPI.me()
      .then((r: any)=>setUser(r.user))  // ← Added: any
      .catch(()=>{})
      .finally(()=>setL(false)); 
  },[]);

  const login = async (email:string,password:string)=>{
    const r: any = await authAPI.login({email,password});  // ← Added: any
    setUser(r.user);
    toast.success('Logged in!');
  };

  const register = async (data:any)=>{
    const r: any = await authAPI.register(data);  // ← Added: any
    setUser(r.user);
    toast.success('Account created!');
  };

  const logout = async ()=>{
    await fetch('/api/v1/auth/logout',{method:'POST',credentials:'include'});
    setUser(null);
  };

  return (
    <AuthCtx.Provider value={{user,loading,login,logout,register}}>
      {children}
    </AuthCtx.Provider>
  );
}
