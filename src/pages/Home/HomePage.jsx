import React, { useState } from 'react'
import './home.css'
import Navbar from '../../components/Navbar/Navbar'
import BodyHome from '../../components/Bodyhome/BodyHome'
import { useLocation, useNavigate } from 'react-router-dom'
import ZustandStore from '../../Zustand/ZustandStore'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = ZustandStore((state) => state.user);
  const jobs = ZustandStore((state) => state.jobs);
  const setJobs = ZustandStore((state) => state.setJobs);
  const setIsLoading = ZustandStore((state) => state.setIsLoading);

  const [isjobData, setIsJobData] = useState([]);

  const [filters, setFilters] = useState({
    salary: 1,
    location: '',
    experienceLevel: '',
    Role: ''
  });

  if (!user) {
    window.location.href = '/login'
  }

  //get ALL jobs
  useEffect(() => {

    if (!user) {
      navigate('/login');
      return;
    }

    const result = async () => {

      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getalljobs`, { withCredentials: true });
        if (response) {
          setJobs(response.data.jobs);
          setIsLoading(false);
        } else {
          console.error('Failed to fetch jobs:', response.data.message);
        }


      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    }
    result();
  }, [location.state?.refresh, user]);



  useEffect(() => {
    const filterForMoney = jobs.filter(job => {
      if (filters.salary !== 0) {
        return parseInt(job.money) >= parseInt(filters.salary);
      }
    })
    setIsJobData(filterForMoney);

  }, [filters.salary]);

  useEffect(() => {
    const filterForExperience = jobs.filter(job => {
      if (filters.experienceLevel !== '') {
        return job.experienceLevel === filters.experienceLevel;
      }
      return true; // If no filter is applied, include all jobs
    })
    setIsJobData(filterForExperience);

  }, [filters.experienceLevel]);
  useEffect(() => {
    const filterForLocation = jobs.filter(job => {
      if (filters.location !== '') {
        return job.location?.toLowerCase().includes(filters.location.toLowerCase());
      }
      return true; // If no filter is applied, include all jobs
    })
    setIsJobData(filterForLocation);

  }, [filters.location]);
  useEffect(() => {
    const filterForRole = jobs.filter(job => {
      if (filters.Role !== '') {
        return job.jobTitle?.toLowerCase().includes(filters.Role.toLowerCase());
      }
      return true; // If no filter is applied, include all jobs
    })
    setIsJobData(filterForRole);

  }, [filters.Role]);

  return (
    <div>
      <Navbar curUser={user} filters={filters} setFilters={setFilters} />
      <BodyHome data={isjobData.length == 0 ? jobs : isjobData} />
    </div>
  )
}

export default HomePage