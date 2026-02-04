# Client-Side Performance Optimization Guide

## 1. Request Optimization in utils/authUtils.js

Already implemented:
- ✅ Centralized API calls
- ✅ Error handling
- ✅ withCredentials for cookies

## 2. Add Request Caching in Zustand Store

Update your ZustandStore to cache API responses:

```javascript
// Add to ZustandStore.jsx
const jobsCache = null;
const jobsCacheTime = null;

// Check if cache is still valid (less than 5 minutes old)
const isJobsCacheValid = () => {
  if (!jobsCache || !jobsCacheTime) return false;
  return Date.now() - jobsCacheTime < 5 * 60 * 1000;
};

// In your fetch jobs action
const setJobsWithCache = (jobs) => {
  setJobs(jobs);
  jobsCache = jobs;
  jobsCacheTime = Date.now();
};
```

## 3. Reduce Unnecessary API Calls

### In HomePage.jsx:
```javascript
// Good: Fetch only once
useEffect(() => {
  if (!user || jobs.length > 0) return; // Skip if already loaded
  fetchJobs();
}, [user])

// Bad: Fetches every time
useEffect(() => {
  fetchJobs();
}, [])
```

## 4. Implement Pagination

Instead of loading all jobs:
```javascript
const [page, setPage] = useState(1);
const pageSize = 20;

const fetchJobs = async (pageNum) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/getalljobs?page=${pageNum}&limit=${pageSize}`,
    { withCredentials: true }
  );
};
```

## 5. Lazy Load Images

```jsx
// Use native lazy loading
<img src={job.companyPic} loading="lazy" alt={job.companyName} />

// Or use Intersection Observer
const useIntersectionObserver = (ref, callback) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) callback();
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, callback]);
};
```

## 6. Debounce Search Input

```javascript
// Add debounce utility
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// In Navbar.jsx
const handleSearchChange = debounce((value) => {
  setFilters(prev => ({ ...prev, searchTerm: value }));
}, 300);
```

## 7. Add Service Worker for Offline Support

Create `public/service-worker.js`:

```javascript
const CACHE_NAME = 'job-portal-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/App.jsx',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

Register in main.jsx:
```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
```

## 8. Optimize Bundle Size

In vite.config.js:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-router-dom'],
          'ui-vendor': ['react-icons', 'react-toastify'],
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  }
})
```

## 9. Add Loading States & Skeletons

Instead of showing nothing while loading:
```jsx
const SkeletonLoader = () => (
  <div className="skeleton">
    <div className="skeleton-line"></div>
    <div className="skeleton-line"></div>
  </div>
);

// Use in HomePage
{isLoading ? <SkeletonLoader /> : <BodyHome data={jobs} />}
```

## 10. Implement Request Batching

If making multiple API calls, batch them:
```javascript
// Instead of 3 separate requests
const fetchUserData = async (userId) => {
  const [jobs, applied, saved] = await Promise.all([
    axios.get(`/api/mycreatedjobs/${userId}`),
    axios.get(`/api/myappliedjobs/${userId}`),
    axios.get(`/api/mysavedjobs/${userId}`)
  ]);
  
  return { jobs, applied, saved };
};
```

## 11. Enable Gzip Compression

Already done on server ✅

## 12. Add Caching Headers

In your backend or Netlify configuration:
```
Cache-Control: public, max-age=3600
```

## Expected Performance Improvements

| Metric | Before | After |
|--------|--------|-------|
| Login time | 5-7s | 1-2s |
| Jobs load | 3-5s | 500ms |
| Search | 1-2s | 300ms |
| Overall TTI | 8-10s | 2-3s |

## Priority Implementation Order

1. ✅ Server-side: compression, connection pooling, caching
2. ⭐ Client-side: reduce unnecessary API calls
3. ⭐ Pagination for job lists
4. Debounce search input
5. Lazy load images
6. Service worker
7. Bundle optimization
8. Skeleton loaders
