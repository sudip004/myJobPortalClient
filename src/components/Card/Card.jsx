import React, { useEffect, useState } from 'react'
import './Card.css'
import { IoBookmarkOutline, IoLocationOutline, IoTimeOutline } from "react-icons/io5"
import { FaBookmark } from "react-icons/fa6"
import { FiBriefcase, FiDollarSign, FiClock } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ZustandStore from '../../Zustand/ZustandStore'
import { toast } from 'react-toastify'


const Card = ({ color, img, creatorId, companyName, jobTitle,
    money, experienceLevel, jobDescription, jobID, date, isSaved }) => {

    const navigate = useNavigate();
    const user = ZustandStore((state) => state.user);
    const setUser = ZustandStore((state) => state.setUser);

    if (!user) {
        navigate('/login');
    }
    const handelClick = () => {
        navigate(`/jobdetails/${jobID}`, { state: { creatorId, companyName, jobTitle, money, experienceLevel, jobDescription, img, date, jobID, btnDiable: false } });
    }


    const handelSavedJob = async () => {
        if (!user) return navigate("/login");

        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_BACKEND_URL}/savejob/${jobID}`,
                { userId: user._id },
                { withCredentials: true }
            );

            if (response?.data) {
                const { saved, message } = response.data;
                // Update internal state
                setUser({
                    ...user,
                    savedPosts: [...user.savedPosts, jobID]
                });
                toast.success(message);
            }
        } catch (error) {
            console.error("Error saving/unsaving job:", error);
            toast.error("Failed to update saved job.");
        }
    };
    const handelUnSavedJob = async () => {
        if (!user) return navigate("/login");

        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/savejob/${jobID}`,
                {
                    data: { userId: user._id }, // ✅ SEND userId INSIDE `data`
                    withCredentials: true
                }
            );

            if (response?.data) {
                const { saved, message } = response.data;
                // Update internal state
                setUser({
                    ...user,
                    savedPosts: user.savedPosts.filter(id => id !== jobID)
                });
                toast.success(message);
            }
        } catch (error) {
            console.error("Error saving/unsaving job:", error);
            toast.error("Failed to update saved job.");
        }
    };


    return (
        <div className="cardContainer" onClick={handelClick}>
            <div className="cardGlassOverlay"></div>
            
            <div className="cardHeader">
                <div className="companyInfo">
                    <div className="companyLogo">
                        <img src={img} alt={companyName} />
                    </div>
                    <div className="companyDetails">
                        <p className="companyName">{companyName}</p>
                        <h3 className="jobTitle">{jobTitle}</h3>
                    </div>
                </div>
                <div className='cardBookmark' onClick={(e) => e.stopPropagation()}>
                    {isSaved ? 
                        <FaBookmark className='bookmarkIcon saved' onClick={handelUnSavedJob} /> : 
                        <IoBookmarkOutline className='bookmarkIcon' onClick={handelSavedJob} />
                    }
                </div>
            </div>

            <div className="cardBody">
                <div className="cardMeta">
                    <div className="metaItem">
                        <FiDollarSign />
                        <span className="salary">₹{money} LPA</span>
                    </div>
                    <div className="metaItem">
                        <FiBriefcase />
                        <span>{experienceLevel}</span>
                    </div>
                    <div className="metaItem">
                        <IoTimeOutline />
                        <span className="date">
                            {new Date(date).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short'
                            })}
                        </span>
                    </div>
                </div>

                <div className="cardDescription">
                    <p>{jobDescription?.substring(0, 100)}{jobDescription?.length > 100 ? '...' : ''}</p>
                </div>
            </div>

            <div className="cardFooter">
                <div className="experienceTags">
                    <span className={experienceLevel === 'Entry Level' ? 'tag active' : 'tag'}>Entry</span>
                    <span className={experienceLevel === 'Mid Level' ? 'tag active' : 'tag'}>Mid</span>
                    <span className={experienceLevel === 'Senior Level' ? 'tag active' : 'tag'}>Senior</span>
                </div>
                <button className="detailsBtn" onClick={handelClick}>
                    View Details
                    <FiBriefcase />
                </button>
            </div>
        </div>
    )
}

export default Card