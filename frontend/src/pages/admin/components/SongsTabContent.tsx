import { Button } from '@/components/ui/button.tsx'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx'
import SongsTable from '@/pages/admin/components/SongsTable.tsx'
import { Music } from 'lucide-react'

const SongsTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <div className={'flex items-center justify-between'}>
          <div>
            <CardTitle className={'flex items-center gap-2'}>
              <Music className={'size-5 text-emerald-500'} />
              Songs Library
            </CardTitle>

            <CardDescription>Manage your music tracks</CardDescription>
          </div>

          <Button>+</Button>
        </div>
      </CardHeader>

      <CardContent>
        <SongsTable />
      </CardContent>
    </Card>
  )
}

export default SongsTabContent
