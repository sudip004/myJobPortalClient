import React, { useEffect, useState } from 'react'
import styles from './AppliedPage.module.css'
import { useNavigate } from 'react-router-dom'
import ZustandStore from '../../Zustand/ZustandStore'
import axios from 'axios'
import BackArraowBTN from '../../components/BackBtn/BackArraowBTN'


const AppliedPage = () => {
  const navigate = useNavigate()
  const user = ZustandStore((state) => state.user)
  const [jobs, setJobs] = useState([])
  const [savedJobs, setSavedJobs] = useState([])

  const handelDescBtn = async (jobDescription,jobID,companyName,Btnopen) => {
     navigate(`/jobdetails/${jobID}`, { state: {  jobDescription, companyName,btnDiable:Btnopen} });

  }

  useEffect(() => {
  if (!user) {
    navigate('/login');
    return;
  }

  const fetchAppliedJobs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/myappliedjobs/${user._id}`, {
        withCredentials: true
      });
      setJobs(res?.data?.appliedJobs || []);
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
      setJobs([]); // fallback empty
    }
  };

  const fetchSavedJobs = async () => {
    try {
      const res2 = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/mysavedjobs/${user._id}`, {
        withCredentials: true
      });
      setSavedJobs(res2?.data?.savedJobs || []);
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      setSavedJobs([]); // fallback empty
    }
  };

  fetchAppliedJobs();
  fetchSavedJobs();
}, []);


  return (
    <div className={styles.mainContainer}>
      <div className={styles.backBTN} onClick={() => navigate('/home')}>
        <BackArraowBTN  width={'2.5rem'} height={"2.5rem"}/>
      </div>
      <h1 className={styles.title}>Applied Jobs</h1>
      <p className={styles.description}>Here you can view all the jobs you have applied for.</p>
      {/* Add your job application components here */}
      <div className={styles.jobList}>
        {
          jobs?.length ===0 ? <p className={styles.noJobs}>OOP's Sorry You Can No jobs applied yet.</p> :
          // Map through the jobs and display them
          jobs?.map((job, idx) => (
            <div className={styles.jobDesc} key={idx}>
              <p>{job.companyName || "Demo"}</p>
              <p>{job.jobTitle}</p>
              <p>{job.location || "Beagaluru"}</p>
              <button className={styles.descBtn} onClick={()=>handelDescBtn(job.jobDescription,job._id,job.companyName,true)}>description</button>
            </div>
          ))
        }
      </div>
        <div className={styles.divider}></div>
      {/* Another Section */}
      <h1 className={styles.title}>Saved Jobs</h1>
      <p className={styles.description}>Here you can view all the jobs you have applied for.</p>
      <div className={styles.jobList}>
        {
          savedJobs?.length ===0 ? <p className={styles.noJobs}>OOP's Sorry You Can No jobs Saved yet.</p> :
          savedJobs?.map((job, idx) => (
            <div className={styles.jobDesc} key={idx}>
              <p>{job.companyName || "Demo"}</p>
              <p>{job.jobTitle}</p>
              <p>{job.location || "Beagaluru"}</p>
              <button className={styles.descBtn} onClick={()=>handelDescBtn(job.jobDescription,job._id,job.companyName,false)}>description</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AppliedPage