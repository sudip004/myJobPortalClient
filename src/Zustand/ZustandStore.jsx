import React from 'react'
import { create } from 'zustand'


const ZustandStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    
    jobs: [],
    setJobs: (jobs) => set({ jobs }),

    jobDetails: null,
    setJobDetails: (jobDetails) => set({ jobDetails }),

    isLoading: false,
    setIsLoading: (isLoading) => set({ isLoading }),

    error: null,
    setError: (error) => set({ error }),

}))

export default ZustandStore