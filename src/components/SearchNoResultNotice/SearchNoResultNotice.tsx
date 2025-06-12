import { Box, Chip, Typography } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { Masonry } from 'masonic'
import { useColumnCount } from '../../hooks/useColumnCount'
import PhotoCard from '../PhotoCard'

type SearchNoResultNoticeProps = {
  isLoading: boolean
  keyword: string
  onKeywordChange: (keyword: string) => void
}

const SearchNoResultNotice = ({
  isLoading,
  keyword,
  onKeywordChange,
}: SearchNoResultNoticeProps) => {
  const columnCount = useColumnCount()

  //  Skeleton Photos
  const skeletonItems = Array.from({ length: 20 }, (_, i) => ({
    id: `skeleton-${i}`,
    width: 300,
    height: 200,
    author: '',
    url: '',
    download_url: '',
    showSkeleton: true,
  }))

  // 頁面載入時還沒有拿到 api 的資料，先用載入效果代替畫面顯示
  if (isLoading)
    return (
      <Masonry
        key={`masonry-${keyword}`}
        itemKey={data => data.id}
        items={skeletonItems}
        columnCount={columnCount}
        columnGutter={16}
        render={PhotoCard}
      />
    )

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
      }}
    >
      <SearchIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
      <Typography variant="h5" mb={1} color="textPrimary" fontWeight={600}>
        No photos found
      </Typography>
      <Typography variant="body1" mb={3} px={2} textAlign="center" color="textSecondary">
        我們找不到 "{keyword}" 的資料。請再試試看搜尋別的作者。
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', px: 2 }}>
        <Chip label="清除重來" onClick={() => onKeywordChange('')} color="primary" />
        <Chip
          label="Alejandro"
          onClick={() => onKeywordChange('Alejandro')}
          variant="outlined"
          color="info"
        />
        <Chip
          label="Jarvis"
          onClick={() => onKeywordChange('Jarvis')}
          variant="outlined"
          color="info"
        />
        <Chip
          label="Tyler"
          onClick={() => onKeywordChange('Tyler')}
          variant="outlined"
          color="info"
        />
      </Box>
    </Box>
  )
}

export default SearchNoResultNotice
