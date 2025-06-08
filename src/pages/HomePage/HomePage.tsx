import {AppBar, Box, Container, Toolbar, Typography} from '@mui/material'

import {Masonry} from '@mui/lab'
import SearchInput from '../../components/SearchInput'
import PhotoCard from '../../components/PhotoCard'

const mockHights = [150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80]

const HomePage = () => {
  return (
    <Box sx={{flexGrow: 1, bgcolor: '#f5f5f5', minHeight: '100vh'}}>
      {/* Header */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{display: {xs: 'none', sm: 'block'}}}>
            瀑布式相片牆
          </Typography>
          <SearchInput />
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Container maxWidth="xl" sx={{py: 3}}>
        <Masonry columns={{xs: 2, sm: 3, md: 4, lg: 5, xl: 6}} spacing={2}>
          {mockHights.map((height, index) => (
            <PhotoCard key={index} height={height} />
          ))}
        </Masonry>
      </Container>
    </Box>
  )
}

export default HomePage
