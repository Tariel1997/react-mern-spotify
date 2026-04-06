import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx'
import AddAlbumDialog from '@/pages/admin/components/AddAlbumDialog.tsx'
import AlbumsTable from '@/pages/admin/components/AlbumsTable.tsx'
import { Library } from 'lucide-react'

const AlbumsTabContent = () => {
  return (
    <Card className={'bg-zinc-800/50 border-zinc-700/50'}>
      <CardHeader>
        <div className={'flex items-center justify-between'}>
          <div>
            <CardTitle className={'flex items-center gap-2'}>
              <Library className={'size-5 text-violet-500'} />
              Albums Library
            </CardTitle>
            <CardDescription>Manage your album collection</CardDescription>
          </div>
          <AddAlbumDialog />
        </div>
      </CardHeader>

      <CardContent>
        <AlbumsTable />
      </CardContent>
    </Card>
  )
}

export default AlbumsTabContent
