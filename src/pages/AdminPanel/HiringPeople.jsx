import React, { useState, useEffect } from 'react'
import styles from './HiringPeople.module.css'
import { useNavigate } from 'react-router-dom'
import ZustandStore from '../../Zustand/ZustandStore'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FiArrowLeft, FiBriefcase, FiMapPin, FiUsers, FiFileText, FiDownload, FiChevronDown, FiChevronUp, FiMail, FiPhone, FiCalendar } from 'react-icons/fi'

const HiringPeople = () => {
    const user = ZustandStore((state) => state.user)
    const fetchself = ZustandStore((state) => state.fetchself)
    const setIsLoading = ZustandStore((state) => state.setIsLoading)
    const navigate = useNavigate()
    
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [expandedJobs, setExpandedJobs] = useState(new Set())

    const toggleJobExpansion = (jobId) => {
        setExpandedJobs(prev => {
            const newSet = new Set(prev)
            if (newSet.has(jobId)) {
                newSet.delete(jobId)
            } else {
                newSet.add(jobId)
            }
            return newSet
        })
    }

    useEffect(() => {
        let cancelled = false

        const fetchJobs = async (userId) => {
            setLoading(true)
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/mycreatedjobs/${userId}`, 
                    { withCredentials: true }
                )
                
                if (res?.data?.message === 'No jobs found for this user') {
                    setData([])
                } else {
                    setData(res?.data?.jobs || [])
                }
            } catch (error) {
                console.error("Error fetching jobs:", error)
                toast.error('Failed to load your job postings')
                setData([])
            } finally {
                setLoading(false)
            }
        }

        const init = async () => {
            let currentUser = user
            if (!currentUser) {
                currentUser = await fetchself()
            }
            if (!currentUser?._id) {
                if (!cancelled) {
                    navigate('/login')
                }
                return
            }
            if (!cancelled) {
                fetchJobs(currentUser._id)
            }
        }

        init()

        return () => {
            cancelled = true
        }
    }, [user, navigate, fetchself])

    return (
        <div className={styles.adminMainContainer}>
            {/* Back Button */}
            <button className={styles.backBTN} onClick={() => navigate('/home')}>
                <FiArrowLeft />
                <span>Back to Home</span>
            </button>

            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <FiUsers className={styles.headerIcon} />
                    <div>
                        <h1>Job Applicant Dashboard</h1>
                        <p>Manage and review applications for your posted jobs</p>
                    </div>
                </div>

                <div className={styles.statsBar}>
                    <div className={styles.statCard}>
                        <FiBriefcase className={styles.statIcon} />
                        <div>
                            <h3>{data.length}</h3>
                            <p>Active Jobs</p>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <FiUsers className={styles.statIcon} />
                        <div>
                            <h3>{data.reduce((acc, job) => acc + (job.applicationFillUp?.length || 0), 0)}</h3>
                            <p>Total Applications</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className={styles.content}>
                {loading ? (
                    <div className={styles.loadingContainer}>
                        <div className={styles.spinner}></div>
                        <p>Loading your job postings...</p>
                    </div>
                ) : data.length === 0 ? (
                    <div className={styles.emptyState}>
                        <FiBriefcase className={styles.emptyIcon} />
                        <h3>No Job Postings Yet</h3>
                        <p>You haven't created any job postings. Start by creating your first job!</p>
                        <button className={styles.createJobBtn} onClick={() => navigate('/createjob')}>
                            <FiBriefcase />
                            Create Job Post
                        </button>
                    </div>
                ) : (
                    <div className={styles.jobList}>
                        {data.map((job) => {
                            const isExpanded = expandedJobs.has(job._id)
                            const applicantCount = job.applicationFillUp?.length || 0

                            return (
                                <div className={styles.jobCard} key={job._id}>
                                    {/* Job Header */}
                                    <div className={styles.jobHeader} onClick={() => toggleJobExpansion(job._id)}>
                                        <div className={styles.jobHeaderLeft}>
                                            <div className={styles.companyLogo}>
                                                {job.companyPic ? (
                                                    <img src={job.companyPic} alt={job.companyName} />
                                                ) : (
                                                    <FiBriefcase />
                                                )}
                                            </div>
                                            <div className={styles.jobInfo}>
                                                <h3>{job.jobTitle}</h3>
                                                <p className={styles.companyName}>{job.companyName}</p>
                                                <div className={styles.jobMeta}>
                                                    <span><FiMapPin /> {job.location}</span>
                                                    <span><FiUsers /> {applicantCount} {applicantCount === 1 ? 'Applicant' : 'Applicants'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className={styles.expandBtn}>
                                            {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                                        </button>
                                    </div>

                                    {/* Applicants List */}
                                    {isExpanded && (
                                        <div className={styles.applicantsList}>
                                            {applicantCount === 0 ? (
                                                <div className={styles.noApplicants}>
                                                    <FiUsers className={styles.noApplicantsIcon} />
                                                    <p>No applications received yet</p>
                                                </div>
                                            ) : (
                                                <div className={styles.applicantsGrid}>
                                                    <div className={styles.applicantsHeader}>
                                                        <h4>
                                                            <FiUsers /> Applications Received ({applicantCount})
                                                        </h4>
                                                    </div>
                                                    {job.applicationFillUp.map((applicant, index) => (
                                                        <div className={styles.applicantCard} key={index}>
                                                            <div className={styles.applicantInfo}>
                                                                <div className={styles.applicantAvatar}>
                                                                    {index + 1}
                                                                </div>
                                                                <div className={styles.applicantDetails}>
                                                                    <h5>Applicant #{index + 1}</h5>
                                                                    <p className={styles.resumeLink}>
                                                                        <FiFileText /> Resume submitted
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <a 
                                                                href={applicant.pdf} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                className={styles.downloadBtn}
                                                            >
                                                                <FiDownload />
                                                                View Resume
                                                            </a>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default HiringPeople