import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function SignupPage(){
  const {register:rf,handleSubmit} = useForm<{name:string;email:string;password:string}>();
  const {register} = useAuth();
  const nav = useNavigate();

  const onSubmit=async(d:any)=>{
    try{ await register(d); nav('/'); }
    catch(e:any){ toast.error(e.message); }
  };

  return(
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-pink-200">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...rf('name',{required:true})}  placeholder="Name"     className="input w-full"/>
          <input {...rf('email',{required:true})} placeholder="Email"    className="input w-full"/>
          <input {...rf('password',{required:true})} type="password" placeholder="Password" className="input w-full"/>
          <button className="btn-primary w-full bg-pink-600 hover:bg-pink-700">Create Account</button>
        </form>
        <p className="text-center text-sm mt-4 text-gray-600">
          Already registered? <Link to="/login" className="text-pink-600">Login</Link>
        </p>
      </div>
    </div>
  );
}
