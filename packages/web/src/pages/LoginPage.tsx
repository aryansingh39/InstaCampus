import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function LoginPage(){
  const { register, handleSubmit } = useForm<{email:string;password:string}>();
  const { login } = useAuth();
  const nav = useNavigate();

  const onSubmit = async (d:any)=>{
    try{ await login(d.email,d.password); nav('/'); }
    catch(e:any){ toast.error(e.message); }
  };
  return(
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register('email',{required:true})}  placeholder="Email"
                 className="input w-full"/>
          <input {...register('password',{required:true})} type="password" placeholder="Password"
                 className="input w-full"/>
          <button className="btn-primary w-full">Sign In</button>
        </form>
        <p className="text-center text-sm mt-4 text-gray-600">
          No account? <Link to="/signup" className="text-indigo-600">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
