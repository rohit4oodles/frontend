

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Reset_password from './reset_password';

const Forget = ({ setlog }) => {
  
  const navigate = useNavigate();
  const [step, setStep] = useState(true);
    const [isauth,setisauth]=useState(false)

  const [Detail, SetDetail] = useState({ email: "" });
  const [data, setData] = useState({ email: Detail.email, token: "" });

 
  const HandleChange = (e) => {
    const { name, value } = e.target;
    SetDetail({ ...Detail, [name]: value });
  };

  
  const otpSubmit = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

 
  const emailSubmit = async (e) => {
    e.preventDefault();
    console.log("email");

    try {
      const response = await fetch("https://rohitmaurya15.pythonanywhere.com/user/forgot-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: Detail.email }), 
      });

      if (response.status === 200) {
        console.log("OTP sent");
        setStep(false); 
        setData({ ...data, email: Detail.email }); 
        alert("OTP sent");
      } else {
        console.log("User not exist");
        alert("User not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle OTP");
    console.log(data)
    try {
      const response = await fetch("https://rohitmaurya15.pythonanywhere.com/user/verify-token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);

      if (response.status == 200) {
       
        localStorage.setItem('accessToken', result.access);
        localStorage.setItem('refreshToken', result.refresh);
        console.log("Tokens saved");
        setisauth(true)
        
        navigate('/reset_password');
      } else {
        console.log("Invalid OTP");
        alert("Invalid OTP");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>{isauth?(<Reset_password email={Detail.email}></Reset_password>):
      (<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Forget Password</h2>

          <form className="space-y-4" onSubmit={step ? emailSubmit : handleSubmit}>
            
            {step && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="your@email.com"
                  onChange={HandleChange}
                  value={Detail.email}
                />
              </div>
            )}

            
            {!step && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
                <input
                  type="password"
                  name="token"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="••••••••"
                  onChange={otpSubmit}
                  value={data.token}
                />
              </div>
            )}


            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
              {step ? "Send OTP" : "Verify OTP"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account? 
            <Link to="/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">Sign up</Link>
          </div>
        </div>
      </div>)}
    </>
  );
};

export default Forget;

