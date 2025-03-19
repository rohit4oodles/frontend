import React, { useState } from "react";
import { FiShare2 } from "react-icons/fi";
import { FaMailBulk ,FaStar, FaRegStar } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import CommentSection from "./comment";
import { toast } from "react-toastify";
import {   FaEdit } from "react-icons/fa";


const Edit =({id,setEditMode,Detail,setupdate})=>{  
  const [data, setData] = useState({
    title: Detail.title || "",
    description: Detail.description || ""
  });
  const HandleChange=(e)=>{
    const{name ,value}=e.target;
    setData({...data,[name]:value})
  }
  
  const updatedFields={};
  updatedFields.id=id
  if(data.title){
    updatedFields.title=data.title;
  }
  if(data.description){
    updatedFields.description=data.description
  }

  const HandleSubmit=async(e)=>{
    e.preventDefault();
    const token=localStorage.getItem("accessToken")
    const Responce=await fetch("https://rohitmaurya15.pythonanywhere.com/user/addpost/",{
      method:"PUT",
      headers:{
        "Content-Type":'application/json',
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify(updatedFields)

    })
    if (Responce.status == 201) {

      toast.success("detail updated successfully")
      setupdate(true)
      setEditMode(false)
      

    }
  } 

  return(
<div className="">
  <div className="w-full bg-white rounded-xl shadow-lg p-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Profile</h2>

    <form className="space-y-4" onSubmit={HandleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          name="title"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          placeholder={Detail.title}
          onChange={HandleChange}
          value={data.title}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          placeholder={Detail.description}
          onChange={HandleChange}
          value={data.description}
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
        SUBMIT
      </button>
    </form>
  </div>
</div>


  
  )
}



const BlogPost = ({user}) => {
  if (!user){
    user=localStorage.getItem('user')
  }

  const[isupdated,setupdate]=useState(false)

    
    const [rating, setRating] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const location = useLocation();
    const search=new URLSearchParams(location.search)
    const serialData=search.get('Detail')
    
    const Detail=JSON.parse(decodeURIComponent(serialData))
    console.log(user,"45678")
    const toggleEditMode = () => {
      setEditMode((prevState) => !prevState);  
  };
     
  const handleRating = (index) => {
    setRating(index + 1);
  };
const author_image=localStorage.getItem("image_url")



  return (
    <div className={`min-h-screen `}>
      <div className="max-w-4xl mx-auto px-4 py-8">

        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
            {Detail.title}
          </h1>

          
          <div className="flex items-center space-x-4">
            <img
              src={Detail.author_image||author_image}
              alt={Detail.author}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              
              <h3 className="font-medium dark:text-white">{Detail.author}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {Detail.created_at} 
              </p>
            </div>
        <div className="flex-1 text-center md:text-left">
        <div class="flex items-end justify-end md:justify-between mb-2">

          </div>
          </div>  
          </div>
        </header>

        <div className="relative mb-8">
          <img
            src={Detail.image||Detail.image_url}
            alt="Featured"
            className="w-full h-[400px] object-cover rounded-lg"
            loading="lazy"
          />
        </div>

       
        <article className="prose lg:prose-xl dark:prose-invert max-w-none mb-8">
          {Detail.description}
        </article>

        <div className="flex items-center space-x-2">
     
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleRating(index)}
          className="cursor-pointer"
        >
          {index < rating ? (
            <FaStar size={24} className="text-yellow-500" />
          ) : (
            <FaRegStar size={24} className="text-gray-400" />
          )}
        </span>
      ))}
                <div className="flex items-end justify-end md:justify-between mb-2">
            
            {(Detail.author==user)?(<button  onClick={toggleEditMode} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2">
              <FaEdit /> Edit Post
            </button>):(<></>)}
          </div>
     
    </div>
       
      <span className="ml-2 text-sm text-gray-600">Rating: {rating} / 5</span>
       
        <div className="flex items-center space-x-4 mb-8">
          <span className="text-gray-600 dark:text-gray-300 flex items-center">
            <FiShare2 className="mr-2" /> Share:
          </span>
          <button className="text-blue-400 hover:text-blue-600">
          <a href={`mailto:${Detail.author}`}> <FaMailBulk size={20} /></a>
         
          </button>
        </div>
        
        {editMode?(<Edit id={Detail.id} setupdate={setupdate} setEditMode={setEditMode} Detail={Detail}/>):(<CommentSection id={Detail.id} user={user}/>)}
        
      </div>
      
    </div>
  );
};

export default BlogPost;