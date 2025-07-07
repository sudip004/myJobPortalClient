import React, { useEffect, useState } from 'react'
import './Card.css'
import { IoBookmarkOutline } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ZustandStore from '../../Zustand/ZustandStore';
import { toast } from 'react-toastify';


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
        <div className="cardContainer">
            <div className="innerContainer" style={{ background: color }}>
                <div className="datecardcontain">
                    <div className="cardcontaindatelist">
                        {new Date(date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </div>
                    <div className='cardicon' >{isSaved ? <FaBookmark className='iconEdit' onClick={handelUnSavedJob} /> : <IoBookmarkOutline className='iconEdit' onClick={handelSavedJob} />}</div>
                </div>
                <div className="cardHeadingContain">
                    <p>{companyName}</p>
                    <div className='CardConatinImg'>
                        <h2>{jobTitle}</h2>
                        <img src={img} alt="" className='CardImage' />
                    </div>
                </div>
                <div className="cardOptions">
                    <div className={experienceLevel == 'Entry Level' ? 'implementExprence' : ''}>Entry Level</div>
                    <div className={experienceLevel == 'Mid Level' ? 'implementExprence' : ''}>Mid Level</div>
                    <div className={experienceLevel == 'Senior Level' ? 'implementExprence' : ''}>Senior Level</div>
                    <div >Project Work</div>
                </div>
            </div>
            <div className="outerContainerCard">
                <div>{money}</div>
                <button onClick={handelClick}>Details</button>
            </div>
        </div>
    )
}

export default Card