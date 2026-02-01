import React, { useState } from 'react'
import MarkdownPreview from '@uiw/react-markdown-preview'
import styles from './ShowJobDesc.module.css'
import '@uiw/react-markdown-preview/markdown.css'
import BackArraowBTN from '../../components/BackBtn/BackArraowBTN'
import { useNavigate, useLocation } from 'react-router-dom'
import ZustandStore from '../../Zustand/ZustandStore'
import { toast } from 'react-toastify'
import axios from 'axios'
import { FiArrowLeft, FiUpload, FiFileText, FiCheck, FiX, FiAlertCircle, FiBriefcase, FiMapPin, FiDollarSign, FiClock, FiPhone, FiGlobe, FiUser } from 'react-icons/fi'

const ShowJobDesc = () => {
  const user = ZustandStore((state) => state.user)
  const setIsLoading = ZustandStore((state) => state.setIsLoading)
  
  if (!user) {
    window.location.href = '/login'
  }
  
  const navigate = useNavigate()
  const location = useLocation()
  const [resumeBoxOpen, setResumeBoxOpen] = React.useState(false)
  const [resumeFile, setResumeFile] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [atsScore, setAtsScore] = useState(null)
  const [atsSuggestions, setAtsSuggestions] = useState('')
  
  // Form fields state
  const [formData, setFormData] = useState({
    mobileNumber: '',
    country: '',
    gender: ''
  })

  const jobData = location.state;

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handelClick = () => {
    setResumeBoxOpen(prev => !prev)
    if (!resumeBoxOpen) {
      // Reset form when opening
      setFormData({ mobileNumber: '', country: '', gender: '' })
      setResumeFile(null)
      setAtsScore(null)
      setAtsSuggestions('')
    }
  }

  const validateForm = () => {
    if (!resumeFile) {
      toast.error('Please upload your resume')
      return false
    }
    if (!formData.mobileNumber || formData.mobileNumber.length < 10) {
      toast.error('Please enter a valid mobile number')
      return false
    }
    if (!formData.country) {
      toast.error('Please select your country')
      return false
    }
    if (!formData.gender) {
      toast.error('Please select your gender')
      return false
    }
    return true
  }

  const handelSubmitForResume = async () => {
    if (!validateForm()) return
    
    const formDataToSend = new FormData()
    formDataToSend.append('pdf', resumeFile)
    formDataToSend.append('userId', user._id)
    formDataToSend.append('mobileNumber', formData.mobileNumber)
    formDataToSend.append('country', formData.country)
    formDataToSend.append('gender', formData.gender)

    try {
      setIsLoading(true)
      
      // First API call - Submit application with resume
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/applyjob/${jobData.jobID}`,
        formDataToSend,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      )
      
      // Second API call - Track applied jobs for user
      const response2 = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/appliedjobs/${jobData.jobID}`,
        { userId: user._id },
        { 
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true 
        }
      )
      
      if (response && response2) {
        toast.success('Application submitted successfully!')
        setIsLoading(false)
        setResumeBoxOpen(false)
        navigate('/home')
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      setIsLoading(false)
      
      // Better error handling with specific messages
      if (error.response) {
        const errorMsg = error.response.data?.message || 'Failed to submit application'
        
        if (errorMsg.includes('already applied')) {
          toast.error('You have already applied to this job')
        } else if (errorMsg.includes('Invalid')) {
          toast.error('Invalid request. Please try again.')
        } else if (errorMsg.includes('not found')) {
          toast.error('Job not found. It may have been removed.')
        } else {
          toast.error(errorMsg)
        }
      } else if (error.request) {
        toast.error('Network error. Please check your connection.')
      } else {
        toast.error('Error submitting application. Please try again.')
      }
    }
  }
  const pressBackArrow = () => {
    navigate('/home')
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      toast.error('Please upload a valid PDF file')
      return
    }

    setResumeFile(file)

    // ATS score check is optional - users can still submit if this fails
    const formData = new FormData()
    formData.append('pdf', file)
    formData.append('jobDescription', jobData.jobDescription)

    try {
      setIsLoading(true)
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/ats-score`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )

      const { score, suggestions } = response.data
      setAtsScore(score)
      setAtsSuggestions(suggestions)

      if (score < 50) {
        toast.warn(`ATS Score: ${score}% — You can still submit, but consider improvements`)
        setDrawerOpen(true)
      } else {
        toast.success(`Great! ATS Score: ${score}%`)
        setDrawerOpen(false)
      }
      setIsLoading(false)
    } catch (err) {
      console.error('ATS check failed:', err)
      // Don't block submission if ATS check fails
      toast.info('Resume uploaded. You can proceed with submission.')
      setAtsScore(null)
      setAtsSuggestions('')
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.showJobDesc}>
      {/* ATS Suggestions Drawer */}
      {drawerOpen && (
        <div className={styles.drawerContainer}>
          <div className={styles.drawerHeader}>
            <h3>
              <FiAlertCircle /> Resume Improvement Tips
            </h3>
            <button onClick={() => setDrawerOpen(false)} className={styles.closeDrawer}>
              <FiX />
            </button>
          </div>
          {atsScore !== null && (
            <div className={styles.scoreCard}>
              <div className={`${styles.scoreCircle} ${atsScore >= 50 ? styles.scoreGood : styles.scoreLow}`}>
                <span>{atsScore}%</span>
              </div>
              <p className={styles.scoreLabel}>ATS Match Score</p>
              <p style={{ fontSize: '0.85rem', color: 'rgba(203, 213, 225, 0.7)', marginTop: '0.5rem', textAlign: 'center' }}>
                {atsScore >= 70 ? 'Excellent match! Your resume aligns well.' : 
                 atsScore >= 50 ? 'Good match, but there\'s room for improvement.' : 
                 atsScore >= 30 ? 'Moderate match. Consider the suggestions below.' : 
                 'Low match. Please review the tips carefully.'}
              </p>
            </div>
          )}
          
          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: 'white', marginBottom: '0.8rem' }}>
              📋 What is ATS?
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'rgba(203, 213, 225, 0.8)', lineHeight: '1.6', marginBottom: '0' }}>
              Applicant Tracking Systems (ATS) scan resumes for keywords, formatting, and relevance before a human sees them. A higher score increases your chances of getting noticed.
            </p>
          </div>

          <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: 'white', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiAlertCircle style={{ color: 'var(--primary)' }} /> 
            {atsSuggestions ? 'AI-Powered Recommendations' : 'Key Improvement Areas'}
          </h4>
          
          <ul className={styles.suggestionsList}>
            {atsSuggestions ? (
              // Display dynamic suggestions from backend if available
              typeof atsSuggestions === 'string' 
                ? atsSuggestions.split('\n').filter(s => s.trim()).map((suggestion, index) => (
                    <li key={index}>
                      <FiCheck /> {suggestion.replace(/^[-•*]\s*/, '')}
                    </li>
                  ))
                : Array.isArray(atsSuggestions) 
                  ? atsSuggestions.map((suggestion, index) => (
                      <li key={index}>
                        <FiCheck /> {suggestion}
                      </li>
                    ))
                  : null
            ) : (
              // Fallback to enhanced generic suggestions
              <>
                <li>
                  <FiCheck /> <strong>Match Keywords:</strong> Include exact terms from the job description (skills, tools, technologies)
                </li>
                <li>
                  <FiCheck /> <strong>Use Standard Headings:</strong> Stick to "Work Experience", "Education", "Skills" for better parsing
                </li>
                <li>
                  <FiCheck /> <strong>Quantify Achievements:</strong> Add numbers and metrics (e.g., "Increased sales by 30%")
                </li>
                <li>
                  <FiCheck /> <strong>Simple Formatting:</strong> Avoid tables, headers/footers, images, and complex layouts
                </li>
                <li>
                  <FiCheck /> <strong>Relevant Skills Section:</strong> List technical skills and tools mentioned in the job posting
                </li>
                <li>
                  <FiCheck /> <strong>Use Action Verbs:</strong> Start bullet points with strong verbs (Developed, Managed, Improved, Led)
                </li>
                <li>
                  <FiCheck /> <strong>Tailor Your Resume:</strong> Customize your resume for each application to match job requirements
                </li>
                <li>
                  <FiCheck /> <strong>Avoid Graphics:</strong> Use plain text; avoid logos, photos, charts that ATS can't read
                </li>
                <li>
                  <FiCheck /> <strong>Standard File Format:</strong> PDF is usually best, but ensure it's text-based, not scanned
                </li>
                <li>
                  <FiCheck /> <strong>Spelling & Grammar:</strong> Proofread carefully - errors can lower your score
                </li>
              </>
            )}
          </ul>
          
          {atsScore !== null && atsScore < 50 && (
            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1rem', 
              background: 'rgba(239, 68, 68, 0.1)', 
              border: '1px solid rgba(239, 68, 68, 0.3)', 
              borderRadius: '10px'
            }}>
              <p style={{ fontSize: '0.85rem', color: '#ef4444', margin: '0', fontWeight: '600' }}>
                ⚠️ Tip: You can still submit, but improving your resume may significantly increase your chances of being shortlisted.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Back Button */}
      <button className={styles.backArrow} onClick={pressBackArrow}>
        <FiArrowLeft />
        <span>Back to Jobs</span>
      </button>

      {/* Job Header */}
      <div className={styles.jobHeader}>
        <div className={styles.companyLogo}>
          {jobData?.img ? (
            <img src={jobData.img} alt={jobData?.companyName} />
          ) : (
            <FiBriefcase />
          )}
        </div>
        <div className={styles.jobHeaderInfo}>
          <h1>{jobData?.companyName || 'Company Name'}</h1>
          <h2>{jobData?.jobTitle || 'Job Title'}</h2>
          <div className={styles.jobMeta}>
            {jobData?.location && (
              <span><FiMapPin /> {jobData.location}</span>
            )}
            {jobData?.money && (
              <span><FiDollarSign /> ₹{jobData.money} LPA</span>
            )}
            {jobData?.experienceLevel && (
              <span><FiClock /> {jobData.experienceLevel}</span>
            )}
          </div>
        </div>
      </div>

      {/* Job Description */}
      <div className={styles.descWrapper}>
        <div className={styles.descHeader}>
          <h3><FiFileText /> Job Description</h3>
        </div>
        <MarkdownPreview
          source={jobData?.jobDescription || 'No job description available'}
          className={styles.MarkdownPreview}
        />
        <button
          style={jobData?.jobDescription === '' || jobData?.btnDiable ? { display: 'none' } : {}}
          onClick={handelClick}
          className={styles.applyButton}
        >
          <FiBriefcase />
          Apply for this position
        </button>
      </div>

      {/* Application Form Modal */}
      {resumeBoxOpen && (
        <>
          <div className={styles.overlay} onClick={handelClick}></div>
          <div className={styles.resumeBox}>
            <div className={styles.modalHeader}>
              <h2><FiBriefcase /> Submit Application</h2>
              <button onClick={handelClick} className={styles.closeModal}>
                <FiX />
              </button>
            </div>

            <div className={styles.formContainer}>
              {/* Resume Upload */}
              <div className={styles.formGroup}>
                <label><FiUpload /> Upload Resume (PDF only)</label>
                <div className={styles.fileInputWrapper}>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    id="resumeInput"
                  />
                  <label htmlFor="resumeInput" className={styles.fileLabel}>
                    {resumeFile ? (
                      <>
                        <FiCheck className={styles.checkIcon} />
                        {resumeFile.name}
                      </>
                    ) : (
                      <>
                        <FiUpload />
                        Choose PDF file
                      </>
                    )}
                  </label>
                </div>
                {atsScore && (
                  <div className={`${styles.atsScoreChip} ${atsScore >= 50 ? styles.scoreGood : styles.scoreLow}`}>
                    ATS Score: {atsScore}%
                  </div>
                )}
              </div>

              {/* Mobile Number */}
              <div className={styles.formGroup}>
                <label><FiPhone /> Mobile Number</label>
                <input
                  type="tel"
                  name="mobileNumber"
                  placeholder="Enter your mobile number"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  maxLength="15"
                />
              </div>

              {/* Country */}
              <div className={styles.formGroup}>
                <label><FiGlobe /> Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  <option value="">-- Select Country --</option>
                  <option value="india">India</option>
                  <option value="usa">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="canada">Canada</option>
                  <option value="australia">Australia</option>
                  <option value="germany">Germany</option>
                  <option value="france">France</option>
                  <option value="singapore">Singapore</option>
                </select>
              </div>

              {/* Gender */}
              <div className={styles.formGroup}>
                <label><FiUser /> Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">-- Select Gender --</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_say">Prefer not to say</option>
                </select>
              </div>

              {/* Submit Button */}
              <button className={styles.submitBtn} onClick={handelSubmitForResume}>
                <FiBriefcase />
                Submit Application
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ShowJobDesc