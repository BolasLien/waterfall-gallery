import { Alert, Button, CircularProgress } from '@mui/material'
import { Check as CheckIcon } from '@mui/icons-material'
import { getErrorMessage } from '../../utils/getErrorMessage'



type LoaderNoticeProps = {
  isDone?: boolean
  isLoading?: boolean
  isError?: boolean
  error: unknown
  onRetry?: () => void
}

const LoaderNotice = ({ isDone, isLoading, isError, error, onRetry }: LoaderNoticeProps) => {
  if (isLoading) return <CircularProgress />

  // 載入中遇到 api 錯誤
  if (isError) {
    return (
      <Alert
        sx={{ position: 'relative', zIndex: 2 }}
        severity="error"
        action={
          <Button color="inherit" variant="outlined" size="small" onClick={onRetry}>
            重試
          </Button>
        }
      >
        {getErrorMessage(error)}
      </Alert>
    )
  }

  // 當沒有下一頁時顯示
  if (isDone) {
    return (
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        已經是全部的相片了，沒有更多囉！
      </Alert>
    )
  }

  return null
}

export default LoaderNotice
