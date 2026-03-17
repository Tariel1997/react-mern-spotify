export interface Song {
  _id: string
  title: string
  artist: string
  albumId: string | null
  imageUrl: string
  audioUrl: string
  duration: number
  created_at: Date
  updated_at: Date
}

export interface Album {
  _id: string
  title: string
  artist: string
  imageUrl: string
  releaseYear: number
  songs: Song[]
}
