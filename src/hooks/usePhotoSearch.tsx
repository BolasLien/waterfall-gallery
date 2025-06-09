import { useMemo, useState } from 'react'
import { usePhotos } from './usePhotos'

/**
 * usePhotoSearch：根據作者關鍵字搜尋照片。
 *
 * 此 Hook 提供 keyword 狀態與更新函式，
 * 並回傳經過作者關鍵字（不分大小寫）過濾後的照片清單。
 * 會將分頁的照片資料攤平成一個陣列後再進行搜尋。
 *
 * @returns 回傳內容包含：
 *   - `keyword`：目前的搜尋關鍵字
 *   - `handleKeywordChange`：更新搜尋關鍵字的函式
 *   - `filteredPhotos`：經關鍵字過濾後的照片陣列
 */
export const usePhotoSearch = () => {
  const { data } = usePhotos()
  const [keyword, setKeyword] = useState('')

  const handleKeywordChange = (value: string) => setKeyword(value)

  // 把 Photos 的資料攤平
  const allPhotos = useMemo(() => data?.pages.flat() ?? [], [data])

  // 搜尋過濾 Photos
  const filteredPhotos = useMemo(() => {
    const lowerKeyword = keyword.toLowerCase()
    const filtered = allPhotos.filter(photo => photo.author.toLowerCase().includes(lowerKeyword))
    return filtered
  }, [allPhotos, keyword])

  return {
    keyword,
    handleKeywordChange,
    filteredPhotos,
  }
}
