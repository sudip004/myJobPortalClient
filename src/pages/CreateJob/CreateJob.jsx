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


const CreateJob = () => {
    const navigate = useNavigate()
    const user = ZustandStore(state => state.user)
    if (!user) {
        navigate('/login')
    }

    const [companyName, setCompanyName] = useState('')
    const [role, setRole] = useState('')
    const [file, setFile] = useState('')
    const [experienceLevel, setExperienceLevel] = useState('')
    const [salary, setSalary] = useState('')
    const [location, setLocation] = useState('')
    const [value, setValue] = useState('')


    const handelClick = () => {

        if (!companyName || !role || !file || !experienceLevel || !salary || !location || !value) {
            toast.error("Please fill all fields")
            return;
        }
        toast.info("Please Wait for Creating job post...");
        const formData = new FormData();
        formData.append('companyName', companyName);
        formData.append('jobTitle', role);
        formData.append('companyPic', file);
        formData.append('experienceLevel', experienceLevel);
        formData.append('money', salary);
        formData.append('location', location);
        formData.append('jobDescription', value);
        formData.append('creatorId', user._id);

        const result = async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/createjob`, formData, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data', // Important for file uploads
                    },
                });
                if (response.data) {
                    console.log("Job post created successfully:", response.data);
                    toast.success("Job post created successfully!");
                    navigate('/home', { state: { refresh: true } }); // Redirect to home page after successful job post creation
                }

            } catch (error) {
                console.error("Error creating job post:", error);
                toast.error("Failed to create job post. Please try again.");
            }
        }
        result();

        console.log(experienceLevel);
        

    }


    // Function to handle back arrow click
    // This will navigate the user back to the home page
    const handelBackArrow = () => {
        navigate('/home')
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.backarrow} onClick={handelBackArrow}>
                <BackArraowBTN />
            </div>
            <div className={styles.InnnerContainer}>
                <h1>CREATE JOB POST</h1>
                <div className={styles.formContainer}>
                    <div className={styles.conpanyDetails}>
                        <input type="text" placeholder='Enter Company Name' onChange={(e) => setCompanyName(e.target.value)} />
                        <input type="text" placeholder='Which Role You Hire' onChange={(e) => setRole(e.target.value)} />
                        <input type="file" name="compantimg" id=""
                            onChange={(e) => setFile(e.target.files[0])} accept="image/*" placeholder='Upload your profile picture' />
                    </div>
                    <div className={styles.conpanyDetails}>
                        <select className={styles.selectLevel}
                            onChange={(e) => setExperienceLevel(e.target.value)}>
                            <option value="">Select Experience Level</option>
                            <option value="Entry Level">Entry Level</option>
                            <option value="Mid Level">Mid Level</option>
                            <option value="Senior Level">Senior Level</option>
                        </select>
                        <input type="text" placeholder='Enter approximate Salary' onChange={(e) => setSalary(e.target.value)} />
                        <input type="text" placeholder='Enter your Location' onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    <div className={styles.descriptionBox}>
                        <p>Description Type here</p>
                        <div data-color-mode="light" className={styles.mdEditorWrapper}>
                            <MDEditor value={value} onChange={setValue} />
                        </div>
                    </div>
                </div>
                <button className={styles.createBTN} onClick={handelClick}>CREATE POST</button>
            </div>
        </div>
    )
}

export default CreateJob
