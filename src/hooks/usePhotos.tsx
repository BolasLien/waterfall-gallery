import { useInfiniteQuery } from '@tanstack/react-query'
import { getPhotos } from '../apis/photos'

const LIMIT = 20 // 每頁幾筆
const START_PAGE = 1 // 起始頁

/**
 * 自訂 Hook：用於分頁獲取照片資料，並支援無限滾動加載。
 *
 * @returns 返回 React Query 的 useInfiniteQuery 結果物件，包含照片資料、分頁狀態與加載方法。
 *
 * @example
 * const { data, fetchNextPage, hasNextPage } = usePhotos();
 *
 * @remarks
 * - 當上一頁資料數量小於預設 LIMIT 時，視為已載入所有資料，不再請求下一頁。
 * - 不會自動重試失敗的請求（retry: false）。
 */
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
