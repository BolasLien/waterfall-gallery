import { useEffect, useRef } from 'react'
import { AppBar, Box, CircularProgress, Container, Fade, Toolbar, Typography } from '@mui/material'
import { Masonry } from '@mui/lab'

import SearchInput from '../../components/SearchInput'
import PhotoCard from '../../components/PhotoCard'
import { usePhotos } from '../../hooks/usePhotos'

const HomePage = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = usePhotos()

  const loaderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!hasNextPage || !loaderRef.current) return

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    })

    observer.observe(loaderRef.current)

    return () => observer.disconnect()
  }, [hasNextPage, fetchNextPage])

  if (isLoading) return <p>載入中...</p>
  if (isError) return <p>圖片載入發生錯誤</p>

  // 把 Photos 的資料攤平
  const allPhotos = data?.pages.flat() ?? []

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            瀑布式相片牆
          </Typography>
          <SearchInput />
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Masonry columns={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }} spacing={2}>
          {allPhotos.map(({ height, width, download_url, author }, index) => (
            <PhotoCard
              key={index}
              originalHeight={height}
              originalWidth={width}
              imageSrc={download_url}
              title={author}
            />
          ))}
        </Masonry>

        {/* 載入更多效果 */}
        <Fade in={isFetchingNextPage} unmountOnExit>
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        </Fade>
      </Container>

      {/* 觸發載入更多 */}
      <div ref={loaderRef} style={{ height: 20 }} />
    </Box>
  )
}

export default HomePage
