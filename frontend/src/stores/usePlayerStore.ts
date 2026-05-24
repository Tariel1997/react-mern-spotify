import { useChatStore } from '@/stores/useChatStore.ts'
import { Song } from '@/types'
import { create } from 'zustand'

interface PlayerStore {
  currentSong: Song | null
  isPlaying: boolean
  queue: Song[]
  currentIndex: number

  initializeQueue: (_songs: Song[]) => void
  playAlbum: (_songs: Song[], _startIndex?: number) => void
  setCurrentSong: (_song: Song | null) => void
  togglePlay: () => void
  playNext: () => void
  playPrevious: () => void
}

interface SocketAuth {
  userId: string
}

const updateActivity = (activity: string) => {
  const socket = useChatStore.getState().socket
  const auth = socket?.auth as SocketAuth | undefined

  if (auth?.userId) {
    socket?.emit('update_activity', {
      userId: auth.userId,
      activity: activity,
    })
  }
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,

  initializeQueue: (songs: Song[]) => {
    set({
      queue: songs,
      currentSong: get().currentSong || songs[0],
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
    })
  },

  playAlbum: (songs: Song[], startIndex = 0) => {
    if (songs.length === 0) return

    const song = songs[startIndex]

    updateActivity(`Playing ${song.title} by ${song.artist}`)

    set({
      queue: songs,
      currentSong: song,
      currentIndex: startIndex,
      isPlaying: true,
    })
  },

  setCurrentSong: (song: Song | null) => {
    if (!song) return

    updateActivity(`Playing ${song.title} by ${song.artist}`)

    const songIndex = get().queue.findIndex((s) => s._id === song._id)

    set({
      currentSong: song,
      isPlaying: true,
      currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
    })
  },

  togglePlay: () => {
    const willStartPlaying = !get().isPlaying
    const currentSong = get().currentSong

    updateActivity(
      willStartPlaying && currentSong
        ? `Playing ${currentSong.title} by ${currentSong.artist}`
        : 'Idle',
    )

    set({ isPlaying: willStartPlaying })
  },

  playNext: () => {
    const { currentIndex, queue } = get()
    const nextIndex = currentIndex + 1

    if (nextIndex < queue.length) {
      const nextSong = queue[nextIndex]

      set({
        currentSong: nextSong,
        currentIndex: nextIndex,
        isPlaying: true,
      })

      updateActivity(`Playing ${nextSong.title} by ${nextSong.artist}`)
    } else {
      set({ isPlaying: false })
      updateActivity('Idle')
    }
  },

  playPrevious: () => {
    const { currentIndex, queue } = get()
    const prevIndex = currentIndex - 1

    if (prevIndex >= 0) {
      const prevSong = queue[prevIndex]

      set({
        currentSong: prevSong,
        currentIndex: prevIndex,
        isPlaying: true,
      })

      updateActivity(`Playing ${prevSong.title} by ${prevSong.artist}`)
    } else {
      set({ isPlaying: false })
      updateActivity('Idle')
    }
  },
}))
