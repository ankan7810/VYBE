import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const PasswordField = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/;

  // Function to generate a strong password
  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let pwd = "";

    do {
      const length = Math.floor(Math.random() * 6) + 8; // 8-13 chars
      pwd = "";
      for (let i = 0; i < length; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    } while (!passwordRegex.test(pwd));

    return pwd;
  };

  const handleUseSuggested = () => {
    const newPassword = generatePassword();
    onChange(newPassword);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          className="relative flex items-center justify-start w-[100%] h-[50px] rounded-2xl border-2 border-black"
          // style={{ border: `2px solid black ` }}
          placeholder="    Enter Password"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        <button
          type="button"
          className="absolute right-4 top-4 text-gray-900 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {/* {showPassword ? <FaRegEye /> : <FaRegEyeSlash />} */}
           {!showPassword?<IoIosEye className='absolute cursor-pointer right-[20px] w-[25px] h-[22px]' onClick={()=>setShowPassword(true)}/>:<IoIosEyeOff className='absolute cursor-pointer right-[20px] w-[25px] h-[22px]' onClick={()=>setShowPassword(false)}/>} 
        </button>
      </div>

      <button
        type="button"
        className="w-40 pb-[8px] text-white bg-[#281e1e] py-2 rounded-lg  text-center"
        onClick={handleUseSuggested} // now generates a new password every click
      >
        Genarate Password
      </button>
    </div>
  );
};

export default PasswordField;
