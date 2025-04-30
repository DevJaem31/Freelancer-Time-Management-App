import axios from 'axios'
import { toast } from 'react-hot-toast'

const apiUrl =
  import.meta.env.VITE_NODE_ENV === 'production'
    ? import.meta.env.VITE_PRODUCTION_API_URL
    : import.meta.env.VITE_DEVELOPMENT_API_URL

export const fetchTasksStats = async () => {
  try {
    const response = await axios.get(`${apiUrl}dashboard-stats`, {
      withCredentials: true,
    })

    return response.data
  } catch (error) {
    console.error('Error fetching task stats:', error)
    toast.error('Failed to load dashboard stats')
    return null
  }
}
