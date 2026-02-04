import React, { useState, useEffect, useMemo } from 'react'
import styles from './home.module.css'
import Navbar from '../../components/Navbar/Navbar'
import BodyHome from '../../components/Bodyhome/BodyHome'
import { useLocation, useNavigate } from 'react-router-dom'
import ZustandStore from '../../Zustand/ZustandStore'
import axios from 'axios'
import { toast } from 'react-toastify'

const HomePage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = ZustandStore((state) => state.user)
  const jobs = ZustandStore((state) => state.jobs)
  const setJobs = ZustandStore((state) => state.setJobs)
  const isLoading = ZustandStore((state) => state.isLoading)
  const setIsLoading = ZustandStore((state) => state.setIsLoading)
const fetchself = ZustandStore((state) => state.fetchself);

  const [filters, setFilters] = useState({
    salary: 1,
    location: '',
    experienceLevel: '',
    role: '',
    searchTerm: '',
    jobType: []
  })

  useEffect(() => {
    if (!user) {
      fetchself().then((res) => {
        if (!res) {
          navigate('/login');
        }
      })
    }
  }, [user, navigate, fetchself])

  // Fetch all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/getalljobs`,
          { withCredentials: true }
        )
        if (response?.data?.jobs) {
          setJobs(response.data.jobs)
         // toast.success(`Loaded ${response.data.jobs.length} jobs`)
        }
      } catch (error) {
        console.error('Error fetching jobs:', error)
        toast.error('Failed to load jobs. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [location.state?.refresh, user, setJobs, setIsLoading])

  // Memoized filtered jobs with combined logic
  const filteredJobs = useMemo(() => {
    if (!jobs || jobs.length === 0) return []

    return jobs.filter(job => {
      // Salary filter
      if (filters.salary > 1 && parseInt(job.money) < parseInt(filters.salary)) {
        return false
      }

      // Experience level filter
      if (filters.experienceLevel && job.experienceLevel !== filters.experienceLevel) {
        return false
      }

      // Location filter
      if (filters.location && !job.location?.toLowerCase().includes(filters.location.toLowerCase())) {
        return false
      }

      // Role filter
      if (filters.role && !job.jobTitle?.toLowerCase().includes(filters.role.toLowerCase())) {
        return false
      }

      // Search term filter (searches in title, description, company name)
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase()
        const matchesSearch = 
          job.jobTitle?.toLowerCase().includes(searchLower) ||
          job.jobDescription?.toLowerCase().includes(searchLower) ||
          job.companyName?.toLowerCase().includes(searchLower)
        
        if (!matchesSearch) return false
      }

      // Job type filter
      if (filters.jobType.length > 0 && !filters.jobType.includes(job.jobType)) {
        return false
      }

      return true
    })
  }, [jobs, filters])

  // Reset filters function
  const resetFilters = () => {
    setFilters({
      salary: 1,
      location: '',
      experienceLevel: '',
      role: '',
      searchTerm: '',
      jobType: []
    })
  }

  if (!user) {
    return null
  }

  return (
    <div className={styles.homePageContainer}>
      <Navbar 
        curUser={user} 
        filters={filters} 
        setFilters={setFilters}
        resetFilters={resetFilters}
        totalJobs={jobs?.length || 0}
        filteredCount={filteredJobs.length}
      />
      <BodyHome 
        data={filteredJobs} 
        isLoading={isLoading}
        filters={filters}
        setFilters={setFilters}
        totalJobs={jobs?.length || 0}
      />
    </div>
  )
}

export default HomePage