import React, { useEffect, useRef, useState } from 'react'
import dp from "../assets/dp.webp"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import VideoPlayer from './VideoPlayer';
import { FaEye, FaPause, FaPlay, FaTrash } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from '../App';

function StoryCard({ storyData }) {
  const { userData } = useSelector(state => state.user)
  const [showViewers, setShowViewers] = useState(false)
  const navigate = useNavigate({ storyData })
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef(null)

  // Story progress
  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(intervalRef.current)
            navigate("/")
            return 100
          }
          return prev + 1
        })
      }, 150)
    }
    return () => clearInterval(intervalRef.current)
  }, [paused, navigate])

  const togglePause = () => setPaused(prev => !prev)

  // Delete story handler
  const handleDeleteStory = async () => {
    if (window.confirm("Are you sure you want to delete this story?")) {
      try {
        await axios.delete(`${serverUrl}/api/story/delete/${storyData._id}`, { withCredentials: true })
        navigate("/") // go back to home after deletion
      } catch (error) {
        console.log("Failed to delete story", error)
        alert("Failed to delete story. Try again.")
      }
    }
  }

  
  return (
    <div className='w-full max-w-[500px] h-[100vh] border-x-2 border-gray-800 pt-[10px] relative flex flex-col justify-center'>

      {/* Header with back, profile, pause & delete */}
      <div className='flex items-center justify-between absolute top-[30px] w-full px-[10px]'>
        <div className='flex items-center gap-[10px]'>
          <MdOutlineKeyboardBackspace
            className='text-white cursor-pointer w-[25px] h-[25px]'
            onClick={() => navigate(`/`)}
          />
          <div className='w-[30px] h-[30px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
            <img src={storyData?.author?.profileImage || dp} alt="" className='w-full object-cover' />
          </div>
          <div className='w-[120px] font-semibold truncate text-white '>{storyData?.author?.userName}</div>
        </div>

        {/* Pause & Delete buttons */}
        {/* Pause & Delete buttons */}
        <div className="flex gap-2">
          <button
            onClick={togglePause}
            className='text-white bg-black/60 p-2 rounded-full hover:bg-black/80 cursor-pointer'
          >
            {paused ? <FaPlay /> : <FaPause />}
          </button>

          {/* Delete story button (only visible to story owner) */}
          {storyData?.author?.userName === userData?.userName && (
            <button
              onClick={handleDeleteStory}
              className='text-white bg-black/60 p-2 rounded-full hover:bg-black/80 cursor-pointer'
            >
              <FaTrash />
            </button>
          )}
        </div>



      </div>

      {/* Progress bar */}
      <div className='absolute top-[10px] w-full h-[5px] bg-gray-900'>
        <div
          className='h-full bg-white transition-all duration-200 ease-linear'
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Media content */}
      {!showViewers && (
        <div className='w-full h-[90vh] flex items-center justify-center'>
          {storyData?.mediaType === "image" && (
            <div className='w-[90%] flex items-center justify-center'>
              <img src={storyData?.media} alt="" className='w-[80%] rounded-2xl object-cover' />
            </div>
          )}
          {storyData?.mediaType === "video" && (
            <div className='w-[80%] flex flex-col items-center justify-center'>
              <VideoPlayer media={storyData?.media} />
            </div>
          )}
        </div>
      )}

      {/* Viewers count for story owner */}
      {storyData?.author?.userName === userData?.userName && !showViewers && (
        <div
          className='absolute w-full flex items-center gap-[10px] text-white h-[70px] bottom-0 p-2 left-0 cursor-pointer'
          onClick={() => setShowViewers(true)}
        >
          <div className='text-white flex items-center gap-[5px]'>
            <FaEye />{storyData.viewers.length}
          </div>
          <div className='flex relative'>
            {storyData?.viewers?.slice(0, 3).map((viewer, index) => (
              <div
                key={index}
                className={`w-[30px] h-[30px] border-2 border-black rounded-full cursor-pointer overflow-hidden ${index > 0 ? `absolute left-[${index * 10}px]` : ""}`}
              >
                <img src={viewer?.profileImage || dp} alt="" className='w-full object-cover' />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Viewers list */}
      {showViewers && (
        <>
          <div
            className='w-full h-[30%] flex items-center justify-center mt-[100px] cursor-pointer py-[30px] overflow-hidden'
            onClick={() => setShowViewers(false)}
          >
            {storyData?.mediaType === "image" && (
              <div className='h-full flex items-center justify-center'>
                <img src={storyData?.media} alt="" className='h-full rounded-2xl object-cover' />
              </div>
            )}
            {storyData?.mediaType === "video" && (
              <div className='h-full flex flex-col items-center justify-center'>
                <VideoPlayer media={storyData?.media} />
              </div>
            )}
          </div>

          <div className='w-full h-[70%] border-t-2 border-t-gray-800 p-[20px]'>
            <div className='text-white flex items-center gap-[10px]'>
              <FaEye /><span>{storyData?.viewers?.length}</span><span>Viewers</span>
            </div>
            <div className='w-full max-h-full flex flex-col gap-[10px] overflow-auto pt-[20px]'>
              {storyData?.viewers?.map((viewer, index) => (
                <div key={index} className='w-full flex items-center gap-[20px]'>
                  <div className='w-[30px] h-[30px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
                    <img src={viewer?.profileImage || dp} alt="" className='w-full object-cover' />
                  </div>
                  <div className='w-[120px] font-semibold truncate text-white'>{viewer?.userName}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default StoryCard

