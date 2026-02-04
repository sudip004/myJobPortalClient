import axios from 'axios'

export const verifyToken = async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/me`,
      { withCredentials: true }
    )
    return data.user || null
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

export const loginUser = async (email, password) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/login`,
      { email, password },
      { withCredentials: true }
    )
    return { success: true, user: data.user }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Login failed'
    }
  }
}

export const registerUser = async (formData) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/register`,
      formData,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    )
    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Registration failed'
    }
  }
}

export const logoutUser = async () => {
  try {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/logout`,
      {},
      { withCredentials: true }
    )
    return { success: true }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Logout failed'
    }
  }
}
