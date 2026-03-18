import { axiosInstance } from '@/lib/axios.ts'
import { Album, Song } from '@/types'
import { AxiosError } from 'axios'
import { create } from 'zustand'

interface MusicStore {
  songs: Song[]
  albums: Album[]
  isLoading: boolean
  error: string | null
  currentAlbum: Album | null

  fetchAlbums: () => Promise<void>
  fetchAlbumById: (_id: string) => Promise<void>
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,

  fetchAlbums: async () => {
    set({ isLoading: true, error: null })

    try {
      const response = await axiosInstance.get('/albums')

      set({ albums: response.data })
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        set({ error: error.response?.data?.message })
      }
    } finally {
      set({ isLoading: false })
    }
  },

  fetchAlbumById: async (id) => {
    set({ isLoading: true, error: null })

    try {
      const response = await axiosInstance.get(`/albums/${id}`)
      set({ currentAlbum: response.data })
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        set({ error: error.response?.data?.message })
      }
    } finally {
      set({ isLoading: false })
    }
  },
}))
