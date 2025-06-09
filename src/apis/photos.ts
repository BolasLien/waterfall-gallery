import axios from 'axios'

export type ImageItem = {
  id: string
  author: string
  width: number
  height: number
  url: string
  download_url: string
}

export const getPhotos = async (page = 1, limit = 20): Promise<ImageItem[]> => {
  // ✅ 模擬最後一頁（回傳空陣列）
  // if (page >= 6) {
  //   return []
  // }

  try {
    const res = await axios.get<ImageItem[]>(
      `https://picsum.photos/v2/list?page=${page}&limit=${limit}`,
      { timeout: 20000 } // ✅ 模擬 timeout 可以改成極短的時間 (目前設定 20 秒)
    )
    return res.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
      console.warn('請求逾時')
    }
    throw error
  }
}
