import React, { useState } from 'react'
import MarkdownPreview from '@uiw/react-markdown-preview';
import styles from './ShowJobDesc.module.css';
import '@uiw/react-markdown-preview/markdown.css';
import BackArraowBTN from '../../components/BackBtn/BackArraowBTN';
import { useNavigate, useLocation } from 'react-router-dom';
import ZustandStore from '../../Zustand/ZustandStore';
import { toast } from 'react-toastify';
import axios from 'axios'

const ShowJobDesc = () => {
  const user = ZustandStore((state) => state.user);
  const setIsLoading = ZustandStore((state) => state.setIsLoading);
  if (!user) {
    window.location.href = '/login';
  }
  const navigate = useNavigate()
  const location = useLocation();
  const [resumeBoxOpen, setResumeBoxOpen] = React.useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  //store all data from the job card
  const jobData = location.state;

  console.log("jobData", jobData);

  const handelClick = () => {
    setResumeBoxOpen(prev => !prev);
  }

  const handelSubmitForResume = async () => {

    if (!resumeFile) {
      alert("Please upload a resume file.");
      return;
    }
    
    if (resumeFile.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      return;
    }
    const formData = new FormData();
    formData.append('pdf', resumeFile);
    formData.append('userId', user._id);

    try {
      setIsLoading(true);
      // Assuming jobData contains the jobID
      const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/applyjob/${jobData.jobID}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      const response2 = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/appliedjobs/${jobData?.jobID}`, { userId: user._id }, { withCredentials: true });
      console.log("response2", response2);
      console.log("response", response);
      if (response && response2) {
        toast.success("Resume uploaded successfully!");
        setIsLoading(false);
        setResumeBoxOpen(prev => !prev)
        // Optionally, you can navigate to another page or update the state
        navigate('/home');
      } else {
        toast.error("Failed to upload resume. Please try again.");
      }

    } catch (error) {
      console.error("Error uploading resume:", error);
      toast.error("Error uploading resume. Please try again.");

    }
  }
  const pressBackArrow = () => {
    navigate('/home');
  }

  return (
    <div className={styles.showJobDesc}>
      {
        drawerOpen && (
          <div className={styles.drwerContainer}>
            <h2>Suggestions to inprove ypur resume score</h2>
            <ul>
              <li>Use keywords from the job description.</li>
              <li>Keep your resume concise and relevant.</li>
              <li>Highlight your achievements with metrics.</li>
              <li>Tailor your resume for each job application.</li>
              <li>Include relevant skills and experiences.</li>
              <li>Proofread for spelling and grammar errors.</li>
              </ul>
          </div>
        )
      }
      <div className={styles.backArrow} onClick={() => pressBackArrow()}>
        <BackArraowBTN />
      </div>
      <h2>Amazon</h2>

      <div className={styles.descWrapper}>

        <MarkdownPreview source={jobData?.jobDescription == '' ? "No Post Available" : jobData?.jobDescription}
          className={styles.MarkdownPreview} />
        <button style={(jobData?.jobDescription == '' || jobData.btnDiable) ? { display: 'none' } : {}} onClick={handelClick}>Apply</button>

      </div>

      {/*  upload resume box */}
      {
        resumeBoxOpen && (
          <div className={styles.resumeBox} >
            <p>Upload Documents</p>
            <div className={styles.inputwrapper}>
              <p>upload resume</p>
              <input
                type="file"
                accept=".pdf"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  setResumeFile(file);

                  if (!file || file.type !== "application/pdf") {
                    alert("Please upload a valid PDF.");
                    return;
                  }

                  const formData = new FormData();
                  formData.append('pdf', file);
                  formData.append('jobDescription', jobData.jobDescription); 

                  try {
                    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/ats-score`, formData, {
                      headers: { 'Content-Type': 'multipart/form-data' }
                    });

                    const { score, suggestions } = response.data;

                    if (score < 50) {
                      toast.warn(`ATS Score: ${score}% — ${suggestions}`);
                      alert("Your resume may not match this job well. Please improve it.");
                      // setResumeFile(null); 
                      setDrawerOpen(true)
                    } else {
                      toast.success(`Good ATS Score: ${score}%`);
                     setDrawerOpen(false);
                    }
                  } catch (err) {
                    console.error("ATS check failed:", err);
                    toast.error("Error checking resume. Try again.");
                  }
                }}
              />

            </div>
            <input type='number' placeholder='Enter Your Mobile Number' />
            <label htmlFor="country">Select your country:</label>
            <select id="country" name="country">
              <option value="">-- Select Country --</option>
              <option value="india">India</option>
              <option value="usa">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="canada">Canada</option>
              <option value="australia">Australia</option>
            </select>

            <label for="gender">Select your gender:</label>
            <select id="gender" name="gender">
              <option value="">-- Select Gender --</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_say">Prefer not to say</option>
            </select>
            <button className={styles.btn} onClick={handelSubmitForResume}>SUBMIT</button>

          </div>
        )
      }

    </div>
  )
}

export default ShowJobDesc