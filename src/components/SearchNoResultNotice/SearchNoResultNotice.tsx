import { Box, Chip, Typography } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'

type SearchNoResultNoticeProps = {
  keyword: string
  onKeywordChange: (keyword: string) => void
}

const SearchNoResultNotice = ({ keyword, onKeywordChange }: SearchNoResultNoticeProps) => {
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
