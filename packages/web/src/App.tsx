import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import FeedPage from './pages/FeedPage';

function Protected({children}:{children:JSX.Element}){
  const {user,loading}=useAuth();
  if(loading) return <div className="flex items-center justify-center min-h-screen"><div className="text-xl">Loading...</div></div>;
  return user ? children : <Navigate to="/login"/>;
}

export default function App(){
  return(
    <>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/" element={
          <Protected>
            <FeedPage />
          </Protected>}
        />
      </Routes>
      <Toaster position="top-right" />
    </>
  );
}
