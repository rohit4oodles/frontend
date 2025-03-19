
import React, { use, useEffect, useState } from "react";
import {  FaCalendarAlt, FaEdit, FaHeart, FaComment, FaShare, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = ({ userData, setedit }) => {

  const email = userData.email || localStorage.getItem('user')

  const splitemail = email.split("@")



  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={userData.user_profile_image}
          alt={userData.first_name}
          className="w-32 h-32 rounded-full object-cover"
        />

        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-between mb-2">
            <h1 className="text-3xl font-bold">{splitemail[0]}</h1>
            <button onClick={() => { setedit(true) }} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2">
              <FaEdit /> Edit Profile
            </button>

          </div>
          <p className="text-gray-600 mb-2">{userData.first_name} {userData.last_name}</p>

          <p className="text-gray-600 mb-2">{userData.user_bio}</p>
          <div className="flex items-center justify-center md:justify-start gap-4 text-gray-500 mb-4">
            {/* <span className="flex items-center gap-1"><FaMapMarkerAlt />{userData.location}</span> */}
            <span className="flex items-center gap-1"><FaCalendarAlt />Joined {userData.created_at}</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-6">
            {/* <div className="text-center">
              <div className="font-bold">{userData.followers.toLocaleString()}</div>
              <div className="text-gray-500">Followers</div>
            </div> */}
            {/* <div className="text-center">
              <div className="font-bold">{userData.following.toLocaleString()}</div>
              <div className="text-gray-500">Following</div>
            </div> */}
            <div className="flex gap-4 text-gray-400">
              <a href="#" className="hover:text-blue-400"><FaTwitter size={24} /></a>
              <a href="#" className="hover:text-blue-700"><FaLinkedin size={24} /></a>
              <a href="#" className="hover:text-pink-600"><FaInstagram size={24} /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// It should log the correct image URL (like a path in the build directory).

const BlogPosts = ({ posts }) => {
  const navigate = useNavigate()
  const Detail = (detail) => {
    console.log(detail)
    const data = encodeURIComponent(JSON.stringify(detail))
    navigate(`/blogpost?Detail=${data}`)

  }


  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.length > 0 ? (
        posts.map(post => (
          <article
            key={post.id} onClick={() => Detail(post)}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition"

          >

            <img
              src={post.image_url }
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{post.description}</p>
              <div className="flex items-center justify-between text-gray-500">
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1"><FaHeart className="text-red-500" /> {post.likes}</span>
                  <span className="flex items-center gap-1"><FaComment className="text-blue-500" /> {post.comments}</span>
                </div>
              </div>
            </div>
          </article>
        ))
      ) : (
        <div className="col-span-full text-center py-8 text-gray-500">
          you have not uploded the blogs
        </div>
      )}
    </div>
  );
};

const Edit = ({ setedit }) => {
  const [Detail, SetDetail] = useState({ first_name: "", last_name: "", user_bio: "" });
  const HandleChange = (e) => {
    const { name, value } = e.target;
    SetDetail({ ...Detail, [name]: value });
  };
  const updatedFields = {};

  if (Detail.first_name) {
    updatedFields.first_name = Detail.first_name;
  }
  if (Detail.last_name) {
    updatedFields.last_name = Detail.last_name;
  }
  if (Detail.user_bio) {
    updatedFields.user_bio = Detail.user_bio;
  }

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken")
    if (token) {
      try {
        const response = await fetch("https://rohitmaurya15.pythonanywhere.com/user/profile/", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(
            updatedFields
),
        });

        if (response.status == 201) {

          toast.success("detail updated successfully")
          setedit(false)

        }

        else {

          setedit(false)
        }
      } catch (error) {
        console.error(error);
      }
    }
    else {
      setedit(false)
    }
  };

  return (

    <>      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Profile</h2>

        <form className="space-y-4" onSubmit={HandleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">first_name</label>
            <input
              type="text"
              name="first_name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              onChange={HandleChange}
              value={Detail.first_name}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              name="last_name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"

              onChange={HandleChange}
              value={Detail.last_name}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <input
              type="text"
              name="user_bio"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"

              onChange={HandleChange}
              value={Detail.user_bio}
            />
          </div>



          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
            SUBMIT
          </button>
        </form>


      </div>
    </div></>

  )
};

const UserProfile = () => {
  const navigate = useNavigate()
  const loc = useLocation();
  const user = loc.state.user || localStorage.getItem("user");
  const [edit, setedit] = useState(false);
  const [userData, Setuser] = useState([])
  const [posts, setpost] = useState([])

  const data = async (user) => {
    console.log("in")
    const token = localStorage.getItem("accessToken")
    if (token) {
      try {
        const Responce = await fetch(`https://rohitmaurya15.pythonanywhere.com/user/profile/?user=${user}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        })
        if (Responce.status == 200) {
          const Data = await Responce.json();
          console.log("555555555555555555555")
          console.log(Data)
          Setuser(Data)

        }
      }
      catch {

      }
    }
  }

  const blogs = async (user) => {
    const token = localStorage.getItem("accessToken")
    console.log(token)
    if (token) {
      try {
        console.log("222222222222222")
        const Responce = await fetch(`https://rohitmaurya15.pythonanywhere.com/user/user_post/`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        if (Responce.status == 200) {
          const data = await Responce.json()
          setpost(data)
          console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
          console.log(data)
        }
      }
      catch (e) {
        console.log(e)
      }
    }
    else {

    }
  }
  useEffect(() => {
    if (user) {
      data(user);

    }
    console.log("*");
  }, [user]);
  useEffect(() => {
    if (user) {
      blogs(user)

    }

  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {edit ? (
        <Edit setedit={setedit} />
      ) : (
        <>
          <Profile userData={userData} setedit={setedit} />
          <BlogPosts posts={posts} />
        </>
      )}


    </div>
  );
};

export default UserProfile;