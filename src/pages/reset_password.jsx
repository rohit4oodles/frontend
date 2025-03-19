import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const Reset_password = () => {
  const navigate = useNavigate();
  const passwordValidation = new RegExp(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
    );
  const [password ,setpassword]=useState({password:""});
  const [Confirmpass,setConfirmpass]=useState({password:""});

  const pass = (e) => {
    const { name, value } = e.target;
    setpassword({ ...password, [name]: value });
  };
  const cnfmpasss = (e) => {
    const { name, value } = e.target;
    setConfirmpass({ ...Confirmpass, [name]: value });
  };

  const HandleSubmit = async (e) => {
    const token = localStorage.getItem("accessToken");
    e.preventDefault();
    if (!passwordValidation.test(password.password)){
          toast.warning("password sohuld be 8 digit long and contain numeric alphabet and a special symbol")    }
    else{
    if(password.password===Confirmpass.password){
    try {
      const response = await fetch("https://rohitmaurya15.pythonanywhere.com/user/reset_passward/", {
        method: "PUT",
        headers: { 'Authorization': `Bearer ${token}`, 
        "Content-Type": "application/json" },
        body: JSON.stringify(password),
      });
      const data = await response.json();
      if (response.ok && response.status === 200) {
        toast.success("password Changed")
        navigate("/")
      } 
      
    } 
    catch (error) {
      console.error(error);
    }}
    else{
        alert("password didnot matched")
    }
  }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Set Password</h2>

          <form className="space-y-4" onSubmit={HandleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="password"
                onChange={pass}
                value={password.password}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="password"
                onChange={cnfmpasss}
                value={Confirmpass.password}
              />
            </div>

            <div className="flex items-center justify-between">
              
            </div>

            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
                submit
            </button>
          </form>

          
        </div>
      </div>
    </>
  );
};

export default Reset_password;
