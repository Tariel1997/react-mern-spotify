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
  featuredSongs: Song[]
  madeForYouSongs: Song[]
  trendingSongs: Song[]

  fetchAlbums: () => Promise<void>
  fetchAlbumById: (_id: string) => Promise<void>
  fetchHomeData: () => Promise<void>
  fetchFeaturedSongs: () => Promise<void>
  fetchMadeForYouSongs: () => Promise<void>
  fetchTrendingSongs: () => Promise<void>
}

export const useMusicStore = create<MusicStore>((set, get) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  madeForYouSongs: [],
  featuredSongs: [],
  trendingSongs: [],

  fetchHomeData: async () => {
    const { featuredSongs, trendingSongs, madeForYouSongs } = get()

    if (
      featuredSongs.length > 0 &&
      trendingSongs.length > 0 &&
      madeForYouSongs.length > 0
    )
      return

    set({ isLoading: true, error: null })

    try {
      const [featured, madeForYou, trending] = await Promise.all([
        axiosInstance.get('/songs/featured'),
        axiosInstance.get('/songs/made-for-you'),
        axiosInstance.get('/songs/trending'),
      ])

      set({
        featuredSongs: featured.data,
        madeForYouSongs: madeForYou.data,
        trendingSongs: trending.data,
      })
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Error fetching home data' })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchAlbums: async () => {
    if (get().albums.length > 0) return
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

  fetchFeaturedSongs: async () => {
    if (get().featuredSongs.length > 0) return

    set({ isLoading: true, error: null })

    try {
      const response = await axiosInstance.get('/songs/featured')
      set({ featuredSongs: response.data })
    } catch (error: any) {
      set({ error: error.response?.data?.message })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchMadeForYouSongs: async () => {
    if (get().madeForYouSongs.length > 0) return

    set({ isLoading: true, error: null })

    try {
      const response = await axiosInstance.get('/songs/made-for-you')
      set({ madeForYouSongs: response.data })
    } catch (error: any) {
      set({ error: error.response?.data?.message })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchTrendingSongs: async () => {
    if (get().trendingSongs.length > 0) return

    set({ isLoading: true, error: null })

    try {
      const response = await axiosInstance.get('/songs/trending')
      set({ trendingSongs: response.data })
    } catch (error: any) {
      set({ error: error.response?.data?.message })
    } finally {
      set({ isLoading: false })
    }
  },
}))
