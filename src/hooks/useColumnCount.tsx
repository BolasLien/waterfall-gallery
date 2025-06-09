import { useMediaQuery, useTheme } from '@mui/material'

// RWD 欄數（使用 MUI 斷點）
export const useColumnCount = (): number => {
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const md = useMediaQuery(theme.breakpoints.between('md', 'lg'))
  const lg = useMediaQuery(theme.breakpoints.between('lg', 'xl'))
  const xl = useMediaQuery(theme.breakpoints.up('xl'))

  if (xl) return 6
  if (lg) return 5
  if (md) return 4
  if (sm) return 3
  return 2
}
