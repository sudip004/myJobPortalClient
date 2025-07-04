import React from 'react'
import styles from './HiringPeople.module.css'
import { FaChevronDown } from "react-icons/fa";
import { useState } from 'react';
import { useEffect } from 'react';
import ZustandStore from '../../Zustand/ZustandStore';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import BackArraowBTN from '../../components/BackBtn/BackArraowBTN';

const HiringPeople = () => {
    const user = ZustandStore((state) => state.user);
    const navigate = useNavigate()
    const [drwerOpen, setDrwerOpen] = useState(true)
    const [data, setData] = useState([])

    const handelDrwer = () => {
        setDrwerOpen(pre => !pre);
    }

    useEffect(() => {
        try {
            const response = async () => {
                if (!user) {
                    window.location.href = '/login';
                }
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/mycreatedjobs/${user._id}`, { withCredentials: true });
                if (res?.data?.message === 'No jobs found for this user') {
                    toast.info('No jobs found for this user');
                    // You can set this data to a state variable if needed
                } else {
                    console.log('Jobs fetched successfully:', res.data.jobs);
                    // You can set this data to a state variable if needed
                    setData(res?.data?.jobs || []);
                }
            }
            response();
        } catch (error) {
            console.error("Error in HiringPeople component:", error);

        }
    },[user]);

    return (
        <div className={styles.adminMainContainer}>
            <div className={styles.backBTN} onClick={() =>navigate('/home')}>
                <BackArraowBTN width={'2.5rem'} height={"2.5rem"} />
            </div>
            <h1>Hiring People</h1>
            <p>This Section can help to Requiret talented people who can Fill Your Job From</p>
            {/* You can add more content or components here as needed */}
            <div className={styles.divider}></div>

            <div className={styles.list}>
                {
                    data?.map((item, idx) => (
                        <div className={`${styles.wrapperCon} ${drwerOpen ? styles.wrapperConExpanded : ''}`}>
                            <div className={styles.wrapper}>
                                <h3>Name : {item.companyName || "Demo"}</h3>
                                <p>Job Title : {item.jobTitle}</p>
                                <p>Location : {item.location || "Bengaluru"}</p>

                                <FaChevronDown className={!drwerOpen ? styles.downArrow : styles.downArrowUP} onClick={handelDrwer} />
                            </div>

                            <div className={`${styles.dropdownContent} ${drwerOpen ? styles.dropdownOpen : ''}`}>
                                {
                                    item?.applicationFillUp.map((applicant, index) => (
                                        <div key={index}>
                                            <Link to={`${applicant.pdf}`}>{applicant.pdf}</Link>
                                            <div className={styles.divider}></div>
                                        </div>
                                    ))
                                }


                            </div>
                        </div>
                    ))
                }
            </div>



        </div>
    )
}

export default HiringPeople