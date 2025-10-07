// import React, { useState } from 'react'
// import logo from "../assets/logo2.png"
// import logo1 from "../assets/logo.png"
// import { IoIosEye } from "react-icons/io";
// import { IoIosEyeOff } from "react-icons/io";
// import axios from "axios"
// import { serverUrl } from '../App';
// import { ClipLoader } from "react-spinners";
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setUserData } from '../redux/userSlice';
// function SignUp() {
// const [inputClicked,setInputClicked]=useState({
//     name:false,
//     userName:false,
//     email:false,
//     password:false
// })
// const [showPassword,setShowPassword]=useState(false)
// const [loading,setLoading]=useState(false)
// const [name,setName]=useState("")
// const [userName,setUserName]=useState("")
// const [err,setErr]=useState("")
// const [email,setEmail]=useState("")
// const [password,setPassword]=useState("")
// const navigate=useNavigate()
// const dispatch=useDispatch()
// const handleSignUp=async ()=>{
//   setLoading(true)
//   setErr("")

//   try {
//     const result=await axios.post(`${serverUrl}/api/auth/signup`,{name,userName,email,password},{withCredentials:true})
//     dispatch(setUserData(result.data))
//     setLoading(false)
//   } catch (error) {
//     setErr(error.response?.data?.message)
//     console.log(error)
//     setLoading(false)
//   }
// }


//   return (
//     <div className='w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center'>
//       <div className='w-[90%] lg:max-w-[60%]  h-[600px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23]'>
// <div className='w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-[10px] gap-[20px]'>

// <div className='flex gap-[10px] items-center text-[20px] font-semibold mt-[40px]'>
//     <span>Sign Up to </span>
//     <img src={logo} alt="" className='w-[70px]'/>
// </div>

// <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] border-2 border-black' onClick={()=>setInputClicked({...inputClicked,name:true})}>
//     <label htmlFor='name' className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.name?"top-[-15px]":""}`}> Enter Your Name</label>
//         <input type="text" id='name' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required onChange={(e)=>setName(e.target.value)} value={name}/>
    
// </div>
// <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black' onClick={()=>setInputClicked({...inputClicked,userName:true})}>
//     <label htmlFor='userName' className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.userName?"top-[-15px]":""}`}> Enter Username</label>
//         <input type="text" id='userName' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required onChange={(e)=>setUserName(e.target.value)} value={userName}/>
    
// </div>
// <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black' onClick={()=>setInputClicked({...inputClicked,email:true})}>
//     <label htmlFor='email' className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.email?"top-[-15px]":""}`}> Enter Email</label>
//         <input type="email" id='email' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required onChange={(e)=>setEmail(e.target.value)} value={email}/>
    
// </div>
// <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black' onClick={()=>setInputClicked({...inputClicked,password:true})}>
//     <label htmlFor='password' className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.password?"top-[-15px]":""}`}> Enter password</label>
//         <input type={showPassword?"text":"password"} id='password' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required onChange={(e)=>setPassword(e.target.value)} value={password}/>
//         {!showPassword?<IoIosEye className='absolute cursor-pointer right-[20px] w-[25px] h-[25px]' onClick={()=>setShowPassword(true)}/>:<IoIosEyeOff className='absolute cursor-pointer right-[20px] w-[25px] h-[25px]' onClick={()=>setShowPassword(false)}/>} 
// </div>
// {err && <p className='text-red-500'>{err}</p>}


// <button className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]' onClick={handleSignUp} disabled={loading}>{loading?<ClipLoader size={30} color='white'/>:"Sign Up"}</button>
// <p className='cursor-pointer text-gray-800' onClick={()=>navigate("/signin")}>Already Have An Account ? <span className='border-b-2 border-b-black pb-[3px] text-black'>Sign In</span></p>
// </div>
// <div className='md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#000000] flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black'>

// <img src={logo1} alt="" className='w-[40%]'/>
// <p >Not Just A Platform , It's A VYBE</p>
// </div>
//       </div>
//     </div>
//   )
// }

// export default SignUp







import React, { useState } from 'react'
import logo from "../assets/logo2.png"
import logo1 from "../assets/logo.png"
import axios from "axios"
import { serverUrl } from '../App';
import { ClipLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import PasswordField from './PasswordField';

function SignUp() {
    const [name, setName] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const [inputClicked, setInputClicked] = useState({
        name: false,
        userName: false,
        email: false,
        password: false
    })

    const handleSignUp = async () => {
        setLoading(true)
        setErr("")
        try {
            const result = await axios.post(
                `${serverUrl}/api/auth/signup`,
                { name, userName, email, password },
                { withCredentials: true }
            )
            dispatch(setUserData(result.data))
            setLoading(false)
            navigate("/") // optional: redirect after signup
        } catch (error) {
            setErr(error.response?.data?.message)
            console.log(error)
            setLoading(false)
        }
    }

    const handleFocus = (field) => {
        setInputClicked(prev => ({ ...prev, [field]: true }))
    }

    const handleBlur = (field) => {
        setInputClicked(prev => ({ ...prev, [field]: false }))
    }

    return (
        <div className='w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center'>
            <div className='w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23]'>

                {/* Left Side Form */}
                <div className='w-full lg:w-[50%] h-full flex flex-col items-center p-[20px] gap-[20px]'>

                    {/* Logo */}
                    <div className='flex gap-[10px] items-center text-[20px] font-semibold mt-[20px]'>
                        <span>Sign Up to </span>
                        <img src={logo} alt="" className='w-[70px]' />
                    </div>

                    {/* Name */}
                    <input
                        type="text"
                        placeholder="Enter Your Name"
                        className={`w-[90%] h-[50px] rounded-2xl px-[20px] border-2 border-black outline-none transition-all ${inputClicked.name ? "top-[-15px]" : ""}`}
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        onFocus={() => handleFocus("name")}
                        onBlur={() => handleBlur("name")}
                    />

                    {/* Username */}
                    <input
                        type="text"
                        placeholder="Enter Username"
                        className={`w-[90%] h-[50px] rounded-2xl px-[20px] border-2 border-black outline-none transition-all ${inputClicked.userName ? "top-[-15px]" : ""}`}
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                        onFocus={() => handleFocus("userName")}
                        onBlur={() => handleBlur("userName")}
                    />

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Enter Email"
                        className={`w-[90%] h-[50px] rounded-2xl px-[20px] border-2 border-black outline-none transition-all ${inputClicked.email ? "top-[-15px]" : ""}`}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        onFocus={() => handleFocus("email")}
                        onBlur={() => handleBlur("email")}
                    />
    
                    {/* Password Field Component */}
                    <div className={`w-[90%] relative flex items-start justify-start ${inputClicked.password?"top-[-15px]":""}`}>
                        <PasswordField
                            value={password}
                            onChange={setPassword}
                            onFocus={() => handleFocus("password")}
                            onBlur={() => handleBlur("password")}
                            className={`${inputClicked.password ? "top-[-15px]" : ""} transition-all`}
                        />
                    </div>

                    {err && <p className='text-red-500'>{err}</p>}

                    {/* Sign Up */}
                    <button
                        className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[10px]'
                        onClick={handleSignUp}
                        disabled={loading}
                    >
                        {loading ? <ClipLoader size={30} color='white' /> : "Sign Up"}
                    </button>

                    <p className='cursor-pointer text-gray-800' onClick={() => navigate("/signin")}>
                        Already Have An Account ? <span className='border-b-2 border-b-black pb-[3px] text-black'>Sign In</span>
                    </p>
                </div>

                {/* Right Info */}
                <div className='md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#000000] flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black'>
                    <img src={logo1} alt="" className='w-[40%]' />
                    <p>Not Just A Platform , It's A VYBE</p>
                </div>

            </div>
        </div>
    )
}

export default SignUp
