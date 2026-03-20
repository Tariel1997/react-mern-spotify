import { buttonVariants } from '@/components/ui/button.tsx'
import { cn } from '@/lib/utils.ts'
import { useAuthStore } from '@/stores/useAuthStore.ts'
import { Show, UserButton } from '@clerk/react'
import { LayoutDashboardIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

import SignInOAuthButtons from './SignInOAuthButtons'

const Topbar = () => {
  const { isAdmin } = useAuthStore()
  console.log({ isAdmin })

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      <div className="flex gap-2 items-center">
        <img src={'./spotify.png'} className={'size-8'} alt={'Spotify Logo'} />
        Spotify
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link to={'/admin'} className={cn(buttonVariants({ variant: 'outline' }))}>
            <LayoutDashboardIcon className="size-4  mr-2" />
            Admin Dashboard
          </Link>
        )}

        <Show when={'signed-out'}>
          <SignInOAuthButtons />
        </Show>

        <Show when={'signed-in'}>
          <UserButton />
        </Show>
      </div>
    </div>
  )
}

export default Topbar
