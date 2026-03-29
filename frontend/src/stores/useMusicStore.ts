import { axiosInstance } from '@/lib/axios.ts'
import { Album, Song, Stats } from '@/types'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
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
  stats: Stats

  fetchAlbums: () => Promise<void>
  fetchAlbumById: (_id: string) => Promise<void>
  fetchHomeData: () => Promise<void>
  fetchFeaturedSongs: () => Promise<void>
  fetchMadeForYouSongs: () => Promise<void>
  fetchTrendingSongs: () => Promise<void>
  fetchStats: () => Promise<void>
  fetchSongs: () => Promise<void>
  deleteSong: (_id: string) => Promise<void>
  deleteAlbum: (_id: string) => Promise<void>
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
  stats: {
    totalSongs: 0,
    totalAlbums: 0,
    totalUsers: 0,
    totalArtists: 0,
  },

  deleteSong: async (id) => {
    set({ isLoading: true, error: null })

    try {
      await axiosInstance.delete(`/admin/songs/${id}`)

      set((state) => ({
        songs: state.songs.filter((song) => song._id !== id),
      }))

      toast.success('Song deleted successfully')
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        set({ error: error.response?.data?.message })
        toast.error('Error deleting song')
      }
    } finally {
      set({ isLoading: false })
    }
  },

  deleteAlbum: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await axiosInstance.delete(`/admin/albums/${id}`)
      set((state) => ({
        albums: state.albums.filter((album) => album._id !== id),
        songs: state.songs.map((song) =>
          song.albumId === id ? { ...song, album: null } : song,
        ),
      }))
      toast.success('Album deleted successfully')
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        set({ error: error.response?.data?.message })
        toast.error('Failed to delete album: ' + error.message)
      }
    } finally {
      set({ isLoading: false })
    }
  },

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
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        set({ error: error.response?.data?.message || 'Error fetching home data' })
      }
    } finally {
      set({ isLoading: false })
    }
  },

  fetchSongs: async () => {
    set({ isLoading: true, error: null })

    try {
      const response = await axiosInstance.get('/songs')
      set({ songs: response.data })
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        set({ error: error.response?.data?.message })
      }
    } finally {
      set({ isLoading: false })
    }
  },

  fetchStats: async () => {
    set({ isLoading: true, error: null })

    try {
      const response = await axiosInstance.get('/stats')
      set({ stats: response.data })
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Error fetching stats', error)
        set({ error: error.response?.data?.message })
      }
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
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        set({ error: error.response?.data?.message })
      }
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
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        set({ error: error.response?.data?.message })
      }
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
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        set({ error: error.response?.data?.message })
      }
    } finally {
      set({ isLoading: false })
    }
  },
}))
