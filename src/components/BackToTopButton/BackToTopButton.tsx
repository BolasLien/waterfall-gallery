import { Fab } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const BackToTopButton = () => (
  <Fab
    color="primary"
    onClick={scrollToTop}
    sx={{
      position: 'fixed',
      bottom: 32,
      right: 32,
      zIndex: 1000,
    }}
  >
    <ArrowUpwardIcon />
  </Fab>
)

export default BackToTopButton
