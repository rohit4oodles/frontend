import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({ setlog ,setuser}) => {
  const navigate = useNavigate();

  const [Detail, SetDetail] = useState({ email: "", password: "" });

  const HandleChange = (e) => {
    const { name, value } = e.target;
    SetDetail({ ...Detail, [name]: value });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://rohitmaurya15.pythonanywhere.com/user/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Detail),
      });
      const data = await response.json();
      if (response.ok && response.status === 200) {
        toast.success("login successful")
        setuser(Detail.email)
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        localStorage.setItem('user',Detail.email);
        setlog(true);
        navigate("/")
       
      } 

      else {
        toast.success(data.message)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>

          <form className="space-y-4" onSubmit={HandleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                required="true"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="your@email.com"
                onChange={HandleChange}
                value={Detail.email}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="••••••••"
                required="true"
                onChange={HandleChange}
                value={Detail.password}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link to='/forget' className="text-sm text-indigo-600 hover:text-indigo-500">Forgot password</Link>
            </div>

            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?
            <Link to="/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">Sign up</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
