import React, { useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer, toast } from 'react-toastify';
const AddPost = ({email}) => {
  const navigate=useNavigate()
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null); 
  const [description, setDescription] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    const formet=new FormData();
    formet.append("title",title);
    formet.append("image",image);
    formet.append("description",description);
    // formet.append("author",email);

    if(token){
      
      
      if(title.length>100){
        toast.success("title should maximum of 100")
      }
      else{try{
        
        
  
        const Responce=await fetch("https://rohitmaurya15.pythonanywhere.com/user/addpost/",{
          method:"POST",
          headers:{
            "Authorization": `Bearer ${token}`,
          },  
          body:formet,
          
        });
        const responce=await Responce.json()
        const message=responce.message
        console.log(message)
        toast.success(message,{
          position: "top-right"
        })
        navigate("/")}

    catch(error){
    toast.success(error)
  }}
}
else{
  console.log("notoken")
}
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0]; 
    console.log(file)
    if (file) {
      setImage(file);
      console.log("$$$$$")
    }
  };

  return (
    <>
    <div className="max-w-lg mx-auto p-6 bg-white shadow-2xl rounded-lg m-10"> 
      <h2 className="text-2xl font-bold text-center mb-4">Add a New Post</h2>
     
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter post title"
            required="true"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">Upload Image</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
            required="true"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required="true"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter post description"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Post
        </button>
      </form>

      {image && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700">Image Preview:</h3>
          <img 
            src={URL.createObjectURL(image)} 
            alt="Post Image Preview" 
            className="mt-2 w-full h-auto rounded-md" 
          />
        </div>
      )}
      
    </div>
    
    </>
  );
};

export default AddPost;
