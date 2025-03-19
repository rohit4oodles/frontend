import React, { useEffect, useState } from 'react'

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Link, useNavigate } from 'react-router-dom';
import BlogPost from './content';
const Post = ({setpost}) => {

  const navigate=useNavigate()
  const[isempty,setempty]=useState(false);
  const [pageno ,Setpageno]=useState(1)
  const [totoalpage,settotal]=useState(1)
  const [totalblog,settotoalblog]=useState(0)
  const [loading, setLoading] = useState(true);
  const [posts,setdata] =useState([])

  const get_data=async ()=>{
    setpost(true)
    setLoading(true)
    try{
      const responce=await fetch(`https://rohitmaurya15.pythonanywhere.com/user/blog_list/?PAGE=${pageno}`,{
        method:"GET",
        headers:{
          'Content-Type':'application/json'
        },

        
      })
      if(responce.ok){
       const data=await responce.json()
       Setpageno(data.current_page)
       settotal(data.total_page)
        settotoalblog(data.totalblog)
       setdata(data['blogs'])
       setempty(data.length===0);
      

      }
    }
    catch(error){
      console.log(error)
      setempty(true);
    }
    finally{
        setLoading(false)
    }
    console.log(posts)
  }
  useEffect(()=>{
    get_data()
    setpost(true)


  },[pageno])
  console.log(pageno)
  const handlePage=(e,value)=>{
    Setpageno(value)

  }
  const Detail=(detail)=>{
    console.log(detail)
    const data=encodeURIComponent(JSON.stringify(detail))
    console.log(data)
    navigate(`/blogpost?Detail=${data}`)
    
  }

  return (
    <>
    {isempty?(<p>hello</p>):(
      
        <div className="mx-auto  max-w-7xl px-6 lg:px-8 mt-2">
         
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16  sm:mt-4 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            { posts.map((post) => (
              
              <article key={post.id} className="flex max-w-xl flex-col items-start justify-between" onClick={()=>Detail(post)}>
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.created_at} className="text-gray-500">
                    {post.created_at}
                  </time>
                  {/* <a href={post.category.}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category.title}
                  </a> */}
                  {/* <img src={post.category.image} alt={post.category.title}/> */}
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                    <a href="#">
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{post.description}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                 
                  <img alt="" src={post.author_image} className="size-10 rounded-full bg-gray-50" ></img>
                  <div className="text-sm/6">
                    <p className="font-semibold text-gray-900">
                      <a href="#">
                        <span className="absolute inset-0" />
                        {post.author}
                      </a>
                    </p>
                    {/* <p className="text-gray-600">{post.author.role}</p> */}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className='flex justify-center items-cente mt-4'>
          <Stack spacing={2}>
      
        <Pagination onChange={handlePage} count={totoalpage} page={pageno} variant="outlined" shape="rounded" />
    </Stack>
    </div>
        </div>
        
      )}
      </>
    )
    
  
}
export default Post;