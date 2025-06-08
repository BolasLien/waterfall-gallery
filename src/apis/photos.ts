// src/apis/photos.ts
import axios from 'axios'

export type ImageItem = {
  id: string
  author: string
  width: number
  height: number
  url: string
  download_url: string
}

export async function getPhotos(page = 1, limit = 100): Promise<ImageItem[]> {
  const res = await axios.get<ImageItem[]>(
    `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
  )
  return res.data
}
