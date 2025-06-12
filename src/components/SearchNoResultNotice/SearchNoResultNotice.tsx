import { Box, Chip, Typography } from '@mui/material'
import {
  Search as SearchIcon,
  AddPhotoAlternate as AddPhotoAlternateIcon,
  Dangerous as DangerousIcon,
} from '@mui/icons-material'
import type { JSX } from 'react'
import { getErrorMessage } from '../../utils/getErrorMessage'

type NoResultProps = {
  icon: JSX.Element
  title: string
  message: string
  children?: JSX.Element
}

const NoResult = ({ icon, title, message, children }: NoResultProps) => {
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
      {/* <SearchIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} /> */}
      {icon}
      <Typography variant="h5" mb={1} color="textPrimary" fontWeight={600}>
        {title}
      </Typography>
      <Typography variant="body1" mb={3} px={2} textAlign="center" color="textSecondary">
        {message}
      </Typography>
      {children && (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', px: 2 }}>
          {children}
        </Box>
      )}
    </Box>
  )
}

type SearchNoResultNoticeProps = {
  isError: boolean
  error: unknown
  onRetry: () => void
  isLoading: boolean
  keyword: string
  onKeywordChange: (keyword: string) => void
}

const SearchNoResultNotice = ({
  isError,
  error,
  onRetry,
  isLoading,
  keyword,
  onKeywordChange,
}: SearchNoResultNoticeProps) => {
  // 頁面載入時還沒有拿到 api 的資料，先用載入效果代替畫面顯示
  if (isError) {
    return (
      <NoResult
        icon={<DangerousIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />}
        title="伺服器打了個噴嚏 🤧"
        message={getErrorMessage(error)}
      >
        <Chip label="重新載入" onClick={onRetry} color="primary" />
      </NoResult>
    )
  }

  if (isLoading)
    return (
      <NoResult
        icon={<AddPhotoAlternateIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />}
        title="努力搬運中 🏃‍♂️"
        message="圖片正在排隊進場，請給它們一點時間！"
      />
    )

  return (
    <NoResult
      icon={<SearchIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />}
      title="這個作者好像躲起來了？"
      message={`我們找不到 "${keyword}" 的資料。不然你試試別人看看？`}
    >
      <>
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
      </>
    </NoResult>
  )
}

export default SearchNoResultNotice
