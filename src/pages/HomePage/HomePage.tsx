import {AppBar, Box, Container, Toolbar, Typography} from '@mui/material'

import {Masonry} from '@mui/lab'
import SearchInput from '../../components/SearchInput'
import PhotoCard from '../../components/PhotoCard'
import {useEffect, useState} from 'react'
import {getPhotos} from '../../apis/photos'
import type {ImageItem} from '../../apis/photos'

const HomePage = () => {
  const [photos, setPhotos] = useState<ImageItem[]>([])

  useEffect(() => {
    // TODO 之後要改成可換頁、搜尋作者
    getPhotos()
      .then(list => {
        setPhotos(list)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])
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
          {photos.map(({height, width, download_url, author}, index) => (
            <PhotoCard
              key={index}
              originalHeight={height}
              originalWidth={width}
              imageSrc={download_url}
              title={author}
            />
          ))}
        </Masonry>
      </Container>
    </Box>
  )
}

export default HomePage
