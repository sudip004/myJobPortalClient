import { create } from 'zustand'

const ZustandStore = create((set) => ({
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

  fetchself: async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/me`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      const user = data?.user || null;
      set({ user, isAuthenticated: !!user });
      return user;
    } catch (error) {
      console.error('Error fetching user data:', error);
      set({ user: null, isAuthenticated: false });
      return null;
    }
  }

}))

export default ZustandStore