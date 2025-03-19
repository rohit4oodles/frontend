import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Verify_mail = ({email}) => {
    const navigate=useNavigate()
    console.log(email,"8787987998798787878778/***/*/*/*/*/*/*/*/*/*/*/*/*")

    const[input,setinput]=useState({token:"",email:email});
    // setinput({...input,[email]:email});
    const handleChange = (e) => {
      console.log("hi");
      const { name, value } = e.target;
      setinput(prevInput => ({
        ...prevInput,
        [name]: value
      }));
    };
       
    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log(input)
        try{
          const responce = await fetch("https://rohitmaurya15.pythonanywhere.com/user/verify-token/",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(input)
          })
          console.log(email)
          if (responce.ok){
            const data= await responce.json();
            console.log("responce",data)
            navigate("/")
    
    
          }else{
            const data= await responce.json();
            console.log(data)
            toast.warning(data.message)
          }
        }
        catch (e) {
          console.log(e)
        }
      }

  return (
    <div>
        <form  onSubmit={handlesubmit}>
      <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md mx-auto mt-24">
    <div className="flex flex-col space-y-2 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Confirm OTP</h2>
        <p className="text-md md:text-xl">
            Enter the OTP we just sent you.
        </p>
    </div>
    <div className="flex flex-col max-w-md space-y-5">
        <input onChange={handleChange} type="text" placeholder="otp" name='token' value={input.token}
              className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" />
        <button className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white">
            Confirm
        </button>
    </div>
    
</div>
</form>
    </div>
  )
}

export default Verify_mail
