import { usePlayerStore } from '@/stores/usePlayerStore.ts'
import { useEffect, useRef } from 'react'

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const prevSongRef = useRef<string | null>(null)

  const { currentSong, isPlaying, playNext } = usePlayerStore()

  // Handle song ends
  useEffect(() => {
    const audio = audioRef.current
    const handleEnded = () => playNext()
    audio?.addEventListener('ended', handleEnded)
    return () => audio?.removeEventListener('ended', handleEnded)
  }, [playNext])

  // Handle song play/pause logic
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handlePlay = async () => {
      try {
        if (isPlaying && audio.paused) {
          await audio.play()
        } else if (!isPlaying && !audio.paused) {
          audio.pause()
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.name !== 'AbortError') {
            console.error('Playback error:', error.message)
          }
        } else {
          console.error('An unknown error occurred:', error)
        }
      }
    }

    const isSongChange = prevSongRef.current !== currentSong?.audioUrl

    if (isSongChange && currentSong) {
      audio.pause()
      audio.src = currentSong.audioUrl
      audio.currentTime = 0
      prevSongRef.current = currentSong.audioUrl
    }

    void handlePlay()
  }, [currentSong, isPlaying])

  return <audio ref={audioRef} />
}

export default AudioPlayer
