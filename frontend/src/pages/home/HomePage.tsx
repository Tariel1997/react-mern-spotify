import Topbar from '@/components/Topbar'
import { useMusicStore } from '@/stores/useMusicStore.ts'
import { useEffect } from 'react'

const HomePage = () => {
  const { fetchHomeData, isLoading, madeForYouSongs, featuredSongs, trendingSongs } =
    useMusicStore()

  useEffect(() => {
    fetchHomeData()
  }, [fetchHomeData])

  console.log({ isLoading, featuredSongs, madeForYouSongs, trendingSongs })

  return (
    <div className={'rounded-md overflow-hidden'}>
      <Topbar />
    </div>
  )
}

export default HomePage
