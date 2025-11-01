import React, { useEffect, useState } from 'react'
import dp from "../assets/dp.webp"
import { FiPlusCircle } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';

function StoryDp({ ProfileImage, userName, story }) {
  const navigate = useNavigate()
  const { userData } = useSelector(state => state.user)
  const { storyData, storyList } = useSelector(state => state.story)
  const [viewed, setViewed] = useState(false)

  // helper to extract an id string from various shapes (string | object | number)
  const getId = (item) => {
    if (!item && item !== 0) return null
    if (typeof item === "string" || typeof item === "number") return String(item)
    if (typeof item === "object") {
      // try typical fields
      if (item._id) return String(item._id)
      if (item.id) return String(item.id)
      if (item.toString) return String(item.toString())
    }
    return null
  }

  useEffect(() => {
    if (!story) {
      setViewed(false)
      return
    }

    const authorId = getId(story.author)
    const currentUserId = getId(userData?._id)

    const viewerIds = (story.viewers || [])
      .map(v => getId(v))
      .filter(Boolean)

    const filteredViewerIds = authorId
      ? viewerIds.filter(vId => vId !== authorId)
      : viewerIds

    // set viewed true if current user is present in filtered viewers
    const hasViewed = currentUserId ? filteredViewerIds.includes(currentUserId) : false
    setViewed(Boolean(hasViewed))
  }, [story, userData, storyData, storyList])

  // Only call backend to add a viewer when:
  // - there is a story
  // - current user is not the author
  // - current user is not already listed as a viewer
  const handleViewers = async () => {
    if (!story) return

    const authorId = getId(story.author)
    const currentUserId = getId(userData?._id)
    if (!currentUserId) return

    // don't call API if current user is author
    if (authorId && authorId === currentUserId) return

    // if already in viewers (after filtering author out), don't call again
    const viewerIds = (story.viewers || []).map(v => getId(v)).filter(Boolean)
    const filteredViewerIds = authorId ? viewerIds.filter(vId => vId !== authorId) : viewerIds
    if (filteredViewerIds.includes(currentUserId)) return

    try {
      await axios.get(`${serverUrl}/api/story/view/${story._id}`, { withCredentials: true })
      // optional: you may want to optimistically update local state/store here
    } catch (error) {
      console.error("Failed to add viewer:", error)
    }
  }

  const handleClick = () => {
    // if there's no story and this is "Your Story" - go to upload
    if (!story && userName === "Your Story") {
      navigate("/upload")
      return
    }

    // if it's the user's own story - open it but don't call handleViewers (don't add self)
    if (story && userName === "Your Story") {
      navigate(`/story/${userData?.userName}`)
      return
    }

    handleViewers()
    navigate(`/story/${userName}`)
  }

  return (
    <div className='flex flex-col w-[80px]'>
      <div
        className={`w-[80px] h-[80px] ${!story ? null : !viewed ? "bg-gradient-to-b  from-blue-500 to-blue-950" : "bg-gradient-to-r from-gray-500 to-black-800"}  rounded-full flex items-center justify-center relative`}
        onClick={handleClick}
      >
        <div className='w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden '>
          <img src={ProfileImage || dp} alt="" className='w-full object-cover' />
          {!story && userName === "Your Story" && (
            <div>
              <FiPlusCircle className='text-black absolute bottom-[8px] bg-white  right-[10px] rounded-full w-[22px] h-[22px]' />
            </div>
          )}
        </div>
      </div>
      <div className='text-[14px] text-center truncate w-full text-white'>{userName}</div>
    </div>
  )
}

export default StoryDp

