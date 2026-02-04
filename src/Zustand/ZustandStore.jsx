import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const ZustandStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      jobs: [],
      setJobs: (jobs) => set({ jobs }),

      jobDetails: null,
      setJobDetails: (jobDetails) => set({ jobDetails }),

      isLoading: false,
      setIsLoading: (isLoading) => set({ isLoading }),

      error: null,
      setError: (error) => set({ error }),

      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

      clearUser: () => set({ user: null, isAuthenticated: false, jobs: [], jobDetails: null }),
      
      logout: () => set({ user: null, isAuthenticated: false, jobs: [], jobDetails: null }),
    }),
    {
      name: 'job-portal-store',
      getStorage: () => localStorage,
    }
  )
)

export default ZustandStore