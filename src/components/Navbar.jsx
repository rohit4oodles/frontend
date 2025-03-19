// src/components/BlogNavbar.jsx

import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import About from '../pages/About';

const BlogNavbar = ({ islogin, setlog, user }) => {
  const navigate = useNavigate()
  const [query,setQuery]=useState("")
  const [image_url, setimage] = useState(localStorage.getItem('image_url') || "")
  console.log(user)
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('image_url');
    localStorage.removeItem('user')

    setlog(false);
    navigate("/")
  }
  const photo = async () => {
    if (islogin) {
      const token = localStorage.getItem("accessToken")
      const Responce = await fetch(`https://rohitmaurya15.pythonanywhere.com/user/profile_pic/`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }

      })
      if (Responce.status == 200) {
        const data = await Responce.json();
        console.log(data)
        setimage(data.image_url)
        localStorage.setItem('image_url', data.image_url);
      }
    }
  }
  useEffect(() => {
    photo()
  }, [islogin])
  const profile = () => {
    console.log("dfguyhijousd")
    console.log(user)
    navigate("/userprofile", { state: { user } })
  }
  const onChange=(e)=>{
    setQuery(e.target.value)
  }
  const HandleSubmit=(query)=>{
    navigate(`/search_item?query=${query}`)
  }
  console.log("quer",query)
  return (
    <nav className="bg-gray-800 p-4 m-0">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <div className=" flex items-center justify-center sm:items-center sm:justify-start">
            <div className="flex-shrink-0 text-white text-2xl font-semibold">My Blog</div>
            <div className="hidden sm:block sm:ml-6 items-center ">
              <div className="flex space-x-4">
                <a href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium">
                  Home
                </a>
                <Link to ="/about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium">
                  About
                </Link>
                <Link to="/post" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium">
                  Posts
                </Link>


                {islogin ? (<button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium" onClick={logout}>Logout</button>) : <Link to='/login' className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium">Log In</Link>}
                {islogin ? (<></>) : (<Link to='/signup' className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium">sign up</Link>)}
                {islogin && (<Link to="/AddPost" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium">
                  Add Post
                </Link>)}
                {islogin && (
                  <article
                    onClick={profile}
                    className='text-gray-300 justify-it hover:text-white px-3 py-2 rounded-md text-lg font-medium absolute top-1 right-0 gap-x-6'>
                    <img
                      alt=""
                      src={image_url}
                      className="size-10 rounded-full bg-gray-50" ></img></article>
                      )}
                <div className=" inline-block  absolute top-6 right-16 mr-10">
                  {/* Search Icon */}
                  <div className="text-gray-300 hover:text-gray-700 cursor-pointer">
                    <FaSearch />
                  </div>

                  {/* Search Input */}
                  <input
                    type="text"
                    onChange={onChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        HandleSubmit(query)
                        console.log('Enter key pressed');
                      }}}
                    placeholder="Search..."
                    className="absolute top-0 right-0 w-0 h-8 px-3 border border-gray-300 rounded-full opacity-0 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 hover:w-48 hover:opacity-100"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </nav>

  );
}

export default BlogNavbar;




