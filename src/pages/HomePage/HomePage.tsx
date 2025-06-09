import { Masonry } from 'masonic'
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'

import { usePhotos } from '../../hooks/usePhotos'
import { useColumnCount } from '../../hooks/useColumnCount'
import { usePhotoSearch } from '../../hooks/usePhotoSearch'

import PhotoCard from '../../components/PhotoCard'
import SearchInput from '../../components/SearchInput'
import SearchNoResultNotice from '../../components/SearchNoResultNotice'
import InfiniteLoaderTrigger from '../../components/InfiniteLoaderTrigger'
import LoaderNotice from '../../components/LoaderNotice'
import BackToTopButton from '../../components/BackToTopButton'

const HomePage = () => {
  const { fetchNextPage, hasNextPage, isLoading, isError, isFetchingNextPage, error } = usePhotos()

  const { keyword, handleKeywordChange, filteredPhotos } = usePhotoSearch()

  const columnCount = useColumnCount()

  // 這些情境不會觸發 載入更多
  // 1. 沒有下一頁
  // 2. 正在獲取 api 資料
  // 3. 正在獲取下一頁資料
  // 4. 搜尋列有輸入東西
  // 5. api 發生錯誤
  const disabledLoadMore =
    !hasNextPage || isLoading || isFetchingNextPage || keyword.length > 0 || isError

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
          <SearchInput keyword={keyword} onChange={handleKeywordChange} />
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* filteredPhotos 有資料才顯示相片牆，否則顯示無搜尋結果 */}
        {filteredPhotos.length > 0 ? (
          <>
            <Masonry
              key={`masonry-${keyword}`}
              itemKey={data => data.id}
              items={filteredPhotos}
              columnCount={columnCount}
              columnGutter={16}
              overscanBy={6}
              render={PhotoCard}
            />
            <InfiniteLoaderTrigger disabled={disabledLoadMore} onLoadMore={fetchNextPage}>
              <LoaderNotice
                isLoading={isLoading || isFetchingNextPage}
                onRetry={fetchNextPage}
                isDone={!hasNextPage}
                isError={isError}
                error={error}
              />
            </InfiniteLoaderTrigger>
          </>
        ) : (
          <SearchNoResultNotice keyword={keyword} onKeywordChange={handleKeywordChange} />
        )}
      </Container>

      <BackToTopButton />
    </Box>
  )
}

export default HomePage
