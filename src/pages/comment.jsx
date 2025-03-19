import { useState, useCallback, memo, useEffect } from "react";
import { FaHeart, FaReply, FaUserCircle ,FaTrash} from "react-icons/fa";
import { format } from "date-fns";
import { toast } from "react-toastify";

const CommentCard = memo(({ comment, user,setComments }) => {
  console.log("id",comment)
if(!user){
  user=localStorage.getItem("user")
}
const token=localStorage.getItem('accessToken')
const delet=async()=>{
  const Responce=await fetch(`https://rohitmaurya15.pythonanywhere.com/user/delete/comments/${comment.id}/`,{
    method:"DELETE",
    headers:{
      'content-Type':'application/json',
      'Authorization':`Bearer ${token}`
    },
    redirect: 'manual'
  })
  if (Responce){
    try{
      const data=await Responce.json()
      toast.success(data.message)
      setComments((prevComments) => prevComments.filter((c) => c.id !== comment.id));
    }
    catch{

    }
  }
  else{
  
  }
};
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start space-x-4">
        {comment.author_image ? (
          
          <img
            src={comment.author_image}
            alt={`${comment.author}'s avatar`}
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde";
            }}
          />
        ) : (
          <FaUserCircle className="w-10 h-10 text-gray-400" />
        )}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">{comment.author}</h3>
            <span className="text-sm text-gray-500">
              {format(new Date(comment.created_at), "MMM d, yyyy 'at' h:mm a")}
            </span>
          </div>
          <p className="mt-2 text-gray-600">{comment.content}</p>
          <div className="mt-3 flex items-center space-x-4">

      {(comment.author==user)?(<button onClick={delet}  >
        <FaTrash /> 
      </button>):(<></>)}
          </div>
        </div>
      </div>
    </div>
  );
});

const CommentSection = ({id,user}) => {
  const [comments, setComments] = useState([]);
  const get_comment=async ()=>{
    const Responce=await fetch(`https://rohitmaurya15.pythonanywhere.com/user/posts/${id}/comments`,{
        method:"GET",
        headers:{
            'Content-Type':'application/json'
        }
    })
    if(Responce){
        const data=await Responce.json()
       
        setComments(data)
    }
    else{
        console.log("no comments")
    }
  }
 
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (newComment.length > 100) {
        setError("Comment must be less than 500 characters");
        return;
      }
      const token=localStorage.getItem("accessToken")
      if(token){
        try{
            const responce =await fetch(`https://rohitmaurya15.pythonanywhere.com/user/posts/${id}/comments`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    "Authorization": `Bearer ${token}`,
                },
                body:JSON.stringify({content:newComment})

            })
            if(responce){
                toast.success("comment added")
            }
        }
        catch(e){
            console.log(e)
        }

    }
    else{
        toast.success("please login")
    }


    
      
      setNewComment("");
      setError("");
    },
    [newComment]
  );
  useEffect(()=>{
    get_comment();

  },[newComment])

 

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-50 rounded-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments</h2>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="relative">
          <textarea
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
              if (error) setError("");
            }}
            placeholder="Write a comment..."
            className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="3"
            maxLength="500"
            aria-label="Comment input"
          />
          <div className="absolute bottom-3 right-3 text-sm text-gray-500">
            {newComment.length}/500
          </div>
        </div>
        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="mt-3 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Post Comment
        </button>
       </form>

      <div className="space-y-4 max-h-[600px] overflow-y-auto" role="log" aria-label="Comments list">
        {comments.length>0?(comments.map((comment) => (
          <CommentCard key={comment.blog} comment={comment} user={user} setComments={setComments} />
        ))):(<></>)}
      </div>
     </div>
  );
};

export default CommentSection;