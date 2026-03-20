import { axiosInstance } from '@/lib/axios.ts'
import { create } from 'zustand'

interface AuthStore {
  isAdmin: boolean
  isLoading: boolean
  isLoaded: boolean
  error: string | null

  checkAdminStatus: () => Promise<void>
  reset: () => void
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  isAdmin: false,
  isLoading: false,
  isLoaded: false,
  error: null,

  checkAdminStatus: async () => {
    if (get().isLoaded) return
    set({ isLoading: true, error: null })
    try {
      const response = await axiosInstance.get('/admin/check')
      set({ isAdmin: response.data.admin, isLoaded: true })
    } catch (error: any) {
      set({ isAdmin: false, error: error.response?.data?.message, isLoaded: true })
    } finally {
      set({ isLoading: false })
    }
  },

  reset: () => {
    set({ isAdmin: false, isLoading: false, isLoaded: false, error: null })
  },
}))
