import { axiosInstance } from '@/lib/axios.ts'
import { AxiosError } from 'axios'
import { create } from 'zustand'

interface ChatStore {
  users: any[]
  fetchUsers: () => Promise<void>
  isLoading: boolean
  error: string | null
}

export const useChatStore = create<ChatStore>((set, get) => ({
  users: [],
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    if (get().users.length > 0 || get().isLoading) return

    console.time('Network request')

    set({ isLoading: true, error: null })
    try {
      const response = await axiosInstance.get('/users')
      set({ users: response.data })
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        set({ error: error.response?.data?.message })
      }
    } finally {
      set({ isLoading: false })
    }

    console.timeEnd('Network request')
  },
}))
