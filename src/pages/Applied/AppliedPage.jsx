import React, { useEffect, useState } from 'react'
import styles from './AppliedPage.module.css'
import { useNavigate } from 'react-router-dom'
import ZustandStore from '../../Zustand/ZustandStore'
import axios from 'axios'
import { FiArrowLeft, FiBriefcase, FiMapPin, FiDollarSign, FiClock, FiBookmark, FiFileText, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { toast } from 'react-toastify'


const AppliedPage = () => {
  const navigate = useNavigate()
  const user = ZustandStore((state) => state.user)
  const setIsLoading = ZustandStore((state) => state.setIsLoading)
  
  const [jobs, setJobs] = useState([])
  const [savedJobs, setSavedJobs] = useState([])
  const [activeTab, setActiveTab] = useState('applied')
  const [loading, setLoading] = useState(true)

  const handelDescBtn = async (jobDescription,jobID,companyName,Btnopen) => {
     navigate(`/jobdetails/${jobID}`, { state: {  jobDescription, companyName,btnDiable:Btnopen} });

  }

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    const fetchData = async () => {
      setLoading(true)
      try {
        const [appliedRes, savedRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/myappliedjobs/${user._id}`, {
            withCredentials: true
          }),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/mysavedjobs/${user._id}`, {
            withCredentials: true
          })
        ])
        
        setJobs(appliedRes?.data?.appliedJobs || [])
        setSavedJobs(savedRes?.data?.savedJobs || [])
      } catch (error) {
        console.error('Error fetching jobs:', error)
        // Don't show error toast if it's just empty results (404)
        if (error.response?.status !== 404) {
          toast.error('Failed to load jobs')
        }
        setJobs([])
        setSavedJobs([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user, navigate])


  const renderJobCard = (job, isApplied = false) => (
    <div className={styles.jobCard} key={job._id}>
      <div className={styles.cardHeader}>
        <div className={styles.companyLogo}>
          {job.companyPic ? (
            <img src={job.companyPic} alt={job.companyName} />
          ) : (
            <FiBriefcase />
          )}
        </div>
        <div className={styles.cardHeaderInfo}>
          <h3>{job.jobTitle}</h3>
          <p className={styles.companyName}>{job.companyName}</p>
        </div>
        {isApplied && (
          <div className={styles.appliedBadge}>
            <FiCheckCircle /> Applied
          </div>
        )}
      </div>

      <div className={styles.cardMeta}>
        {job.location && (
          <span>
            <FiMapPin /> {job.location}
          </span>
        )}
        {job.money && (
          <span>
            <FiDollarSign /> ₹{job.money} LPA
          </span>
        )}
        {job.experienceLevel && (
          <span>
            <FiClock /> {job.experienceLevel}
          </span>
        )}
      </div>

      <button 
        className={styles.viewDetailsBtn} 
        onClick={() => handelDescBtn(job.jobDescription, job._id, job.companyName, isApplied)}
      >
        <FiFileText />
        View Details
      </button>
    </div>
  )

  return (
    <div className={styles.mainContainer}>
      {/* Back Button */}
      <button className={styles.backBTN} onClick={() => navigate('/home')}>
        <FiArrowLeft />
        <span>Back to Jobs</span>
      </button>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <FiBriefcase className={styles.headerIcon} />
          <div>
            <h1>My Job Applications</h1>
            <p>Track your applied and saved job opportunities</p>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'applied' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('applied')}
          >
            <FiCheckCircle />
            Applied Jobs
            <span className={styles.badge}>{jobs.length}</span>
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'saved' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            <FiBookmark />
            Saved Jobs
            <span className={styles.badge}>{savedJobs.length}</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Loading jobs...</p>
          </div>
        ) : activeTab === 'applied' ? (
          <div className={styles.jobGrid}>
            {jobs.length === 0 ? (
              <div className={styles.emptyState}>
                <FiAlertCircle className={styles.emptyIcon} />
                <h3>No Applications Yet</h3>
                <p>You haven't applied to any jobs yet. Start exploring opportunities!</p>
                <button className={styles.browseBtn} onClick={() => navigate('/home')}>
                  <FiBriefcase />
                  Browse Jobs
                </button>
              </div>
            ) : (
              jobs.map((job) => renderJobCard(job, true))
            )}
          </div>
        ) : (
          <div className={styles.jobGrid}>
            {savedJobs.length === 0 ? (
              <div className={styles.emptyState}>
                <FiBookmark className={styles.emptyIcon} />
                <h3>No Saved Jobs</h3>
                <p>You haven't saved any jobs yet. Save jobs to apply later!</p>
                <button className={styles.browseBtn} onClick={() => navigate('/home')}>
                  <FiBriefcase />
                  Browse Jobs
                </button>
              </div>
            ) : (
              savedJobs.map((job) => renderJobCard(job, false))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AppliedPage