import React, { use, useEffect,useState } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'; // Import BrowserRouter, Route, and Routes
import BlogNavbar from './components/Navbar';
import Blog from './components/Blog';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Login from './pages/login';
import { useNavigate } from 'react-router-dom';
import Forget from './pages/forget';
import Reset_password from './pages/reset_password';
import AddPost from './components/AddPost';
import Post from './pages/feed';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogPost from './pages/content';
import UserProfile from './pages/profile';
import Search_item from './pages/search';
import Error from './pages/error';
import About from './pages/About';
import Team from './pages/Team';
function App() {
  const [islogin, setisLogin] = useState(false);
  const [user,setuser]=useState("");
  const navigate = useNavigate();
  const [post ,setpost]=useState(false);

 
  const get_data = async () => {

      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const response = await fetch("https://rohitmaurya15.pythonanywhere.com/user/login/", {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${token}`,  
              'Content-Type': 'application/json',
            }
          });
          if (response.ok && response.status==200) {
            setisLogin(true);
            navigate('/');
            
          }
        } catch (e) {
          console.error(e);
        }
      }
    };

  useEffect(() => {
     get_data();
  },[] ); 
  console.log(user)
  const token=localStorage.getItem("accessToken")

 
  return (
    
      <div className="App">
        
        
        <BlogNavbar islogin={islogin} setlog={setisLogin} user={user}/>
        {/* <Blog /> */}
        <Routes>
        <Route path="/" element={<Blog/>}/>
        <Route path="/post" element={<Post setpost={setpost} />} />
        <Route path='/search_item' element={<Search_item/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path='/login'element={<Login setlog={setisLogin} setuser={setuser}/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/team' element={<Team />}/>
        <Route path='/reset_password' element={token?<Reset_password/>:<Error/>}/>
        <Route path='/forget' element={<Forget />} />
        <Route path='/AddPost'element={token?<AddPost email={user}/>:<Error/>}/>
        <Route path='/blogpost' element={<BlogPost user={user} />}  />
        <Route path='/userprofile' element={token?<UserProfile />:<Error/>}/>
        {/* <Route path='/verify' element={<Verify_mail/>} /> */}
        
        </Routes>
        {post?(<></>):<Footer/>}
        {console.log(islogin)}
        {console.log(user)}
        <ToastContainer />
      </div>
  );
}

export default App;
