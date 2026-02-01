import React from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const ZustandStore = create(
  persist(
    (set) => ({
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

      clearUser: () => set({ user: null }),
    }),
    {
      name: 'job-portal-store',
      getStorage: () => localStorage,
    }
  )
)

export default ZustandStore