import { useInfiniteQuery } from '@tanstack/react-query'
import { getPhotos } from '../apis/photos'

const LIMIT = 20

export const usePhotos = () =>
  useInfiniteQuery({
    queryKey: ['photos'],
    queryFn: ({ pageParam = 1 }) => getPhotos(pageParam, LIMIT),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < LIMIT ? undefined : allPages.length + 1
    },
  })
