import { useState } from 'react'
import styles from './createjob.module.css'
import MDEditor from '@uiw/react-md-editor'
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import BackArraowBTN from '../../components/BackBtn/BackArraowBTN';
import ZustandStore from '../../Zustand/ZustandStore';
import axios from 'axios';
import { FiArrowLeft, FiBriefcase, FiImage, FiDollarSign, FiMapPin, FiFileText, FiSend, FiCheck } from 'react-icons/fi';


const CreateJob = () => {
    const navigate = useNavigate()
    const user = ZustandStore(state => state.user)
    const setIsLoading = ZustandStore(state => state.setIsLoading)
    
    if (!user) {
        navigate('/login')
    }

    const [formData, setFormData] = useState({
        companyName: '',
        role: '',
        experienceLevel: '',
        salary: '',
        location: '',
        description: '**Job Description**\n\nWrite your job description here using Markdown...'
    })
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState('')


    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile) {
            if (!selectedFile.type.startsWith('image/')) {
                toast.error('Please upload a valid image file')
                return
            }
            setFile(selectedFile)
            setFileName(selectedFile.name)
        }
    }

    const validateForm = () => {
        if (!formData.companyName.trim()) {
            toast.error("Please enter company name")
            return false
        }
        if (!formData.role.trim()) {
            toast.error("Please enter job role/title")
            return false
        }
        if (!file) {
            toast.error("Please upload company logo")
            return false
        }
        if (!formData.experienceLevel) {
            toast.error("Please select experience level")
            return false
        }
        if (!formData.salary.trim()) {
            toast.error("Please enter salary")
            return false
        }
        if (!formData.location.trim()) {
            toast.error("Please enter location")
            return false
        }
        if (!formData.description.trim() || formData.description.length < 50) {
            toast.error("Please provide a detailed job description (min 50 characters)")
            return false
        }
        return true
    }

    const handelClick = async () => {
        if (!validateForm()) return

        const formDataToSend = new FormData()
        formDataToSend.append('companyName', formData.companyName)
        formDataToSend.append('jobTitle', formData.role)
        formDataToSend.append('companyPic', file)
        formDataToSend.append('experienceLevel', formData.experienceLevel)
        formDataToSend.append('money', formData.salary)
        formDataToSend.append('location', formData.location)
        formDataToSend.append('jobDescription', formData.description)
        formDataToSend.append('creatorId', user._id)

        try {
            setIsLoading(true)
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/createjob`, 
                formDataToSend, 
                {
                    withCredentials: true,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            )
            
            if (response.data) {
                toast.success("Job post created successfully!")
                setIsLoading(false)
                navigate('/home', { state: { refresh: true } })
            }
        } catch (error) {
            console.error("Error creating job post:", error)
            setIsLoading(false)
            if (error.response) {
                toast.error(error.response.data?.message || "Failed to create job post")
            } else {
                toast.error("Network error. Please try again.")
            }
        }
    }


    // Function to handle back arrow click
    // This will navigate the user back to the home page
    const handelBackArrow = () => {
        navigate('/home')
    }

    return (
        <div className={styles.mainContainer}>
            {/* Back Button */}
            <button className={styles.backarrow} onClick={handelBackArrow}>
                <FiArrowLeft />
                <span>Back</span>
            </button>

            <div className={styles.innerContainer}>
                {/* Header */}
                <div className={styles.header}>
                    <FiBriefcase className={styles.headerIcon} />
                    <h1>Create Job Post</h1>
                    <p>Post a new job opportunity and find the perfect candidate</p>
                </div>

                <div className={styles.formContainer}>
                    {/* Row 1: Company Details */}
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label>
                                <FiBriefcase /> Company Name
                            </label>
                            <input 
                                type="text" 
                                placeholder='e.g., Google, Microsoft, Startup Inc.' 
                                value={formData.companyName}
                                onChange={(e) => handleInputChange('companyName', e.target.value)} 
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>
                                <FiBriefcase /> Job Title / Role
                            </label>
                            <input 
                                type="text" 
                                placeholder='e.g., Senior Software Engineer' 
                                value={formData.role}
                                onChange={(e) => handleInputChange('role', e.target.value)} 
                            />
                        </div>
                    </div>

                    {/* Row 2: Experience & Salary */}
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label>
                                <FiFileText /> Experience Level
                            </label>
                            <select 
                                className={styles.selectLevel}
                                value={formData.experienceLevel}
                                onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                            >
                                <option value="">-- Select Experience --</option>
                                <option value="Entry Level">Entry Level (0-2 years)</option>
                                <option value="Mid Level">Mid Level (2-5 years)</option>
                                <option value="Senior Level">Senior Level (5+ years)</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label>
                                <FiDollarSign /> Salary (LPA)
                            </label>
                            <input 
                                type="text" 
                                placeholder='e.g., 12-15 or 1000000' 
                                value={formData.salary}
                                onChange={(e) => handleInputChange('salary', e.target.value)} 
                            />
                        </div>
                    </div>

                    {/* Row 3: Location & Logo */}
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label>
                                <FiMapPin /> Location
                            </label>
                            <input 
                                type="text" 
                                placeholder='e.g., Bangalore, Remote, Hybrid' 
                                value={formData.location}
                                onChange={(e) => handleInputChange('location', e.target.value)} 
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>
                                <FiImage /> Company Logo
                            </label>
                            <div className={styles.fileInputWrapper}>
                                <input 
                                    type="file" 
                                    id="companyLogo"
                                    onChange={handleFileChange} 
                                    accept="image/*" 
                                />
                                <label htmlFor="companyLogo" className={styles.fileLabel}>
                                    {fileName ? (
                                        <>
                                            <FiCheck className={styles.checkIcon} />
                                            {fileName}
                                        </>
                                    ) : (
                                        <>
                                            <FiImage />
                                            Upload Image
                                        </>
                                    )}
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Description Editor */}
                    <div className={styles.descriptionBox}>
                        <label className={styles.descLabel}>
                            <FiFileText /> Job Description (Markdown Supported)
                        </label>
                        <div data-color-mode="dark" className={styles.mdEditorWrapper}>
                            <MDEditor 
                                value={formData.description} 
                                onChange={(val) => handleInputChange('description', val || '')}
                                height={300}
                            />
                        </div>
                        <p className={styles.charCount}>
                            {formData.description.length} characters
                        </p>
                    </div>
                </div>

                {/* Submit Button */}
                <button className={styles.createBTN} onClick={handelClick}>
                    <FiSend />
                    Create Job Post
                </button>
            </div>
        </div>
    )
}

export default CreateJob
