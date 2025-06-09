import { useEffect, useRef, type JSX } from 'react'
import { Box } from '@mui/material'

type InfiniteLoaderTriggerProps = {
  disabled?: boolean // 關閉載入更多功能
  onLoadMore: () => void
  children: JSX.Element
}

const InfiniteLoaderTrigger = ({
  disabled = false,
  onLoadMore,
  children,
}: InfiniteLoaderTriggerProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (disabled || !ref.current) return
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) onLoadMore()
    })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [disabled, onLoadMore])

  return (
    <Box ref={ref} sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
      {children}
    </Box>
  )
}

export default InfiniteLoaderTrigger
