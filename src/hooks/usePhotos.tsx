import { useInfiniteQuery } from '@tanstack/react-query'
import { getPhotos } from '../apis/photos'

const LIMIT = 20
const START_PAGE = 1

export const usePhotos = () =>
  useInfiniteQuery({
    queryKey: ['photos'],
    queryFn: ({ pageParam }) => getPhotos(pageParam, LIMIT),
    initialPageParam: START_PAGE,
    getNextPageParam: (lastPage, allPages) => {
      // 假設上一頁的資料數量比預期的 LIMIT 少，代表已經到底了，不要再載下一頁了
      if (allPages.length < 1 || lastPage.length < LIMIT) return undefined
      return allPages.length + START_PAGE
    },
    retry: false,
  })
