import { memo, useState } from 'react'
import { Box, Card, CardContent, CardMedia, Skeleton, Typography } from '@mui/material'
import type { ImageItem } from '../../apis/photos'
import type { RenderComponentProps } from 'masonic'

type PhotoCardProps = RenderComponentProps<ImageItem>

const PhotoCard = memo(({ data }: PhotoCardProps) => {
  const { id, width, height, author } = data
  const [loaded, setLoaded] = useState(false)

  return (
    <Card>
      <Box sx={{ position: 'relative', aspectRatio: `${width} / ${height}`, px: 1, pt: 2 }}>
        {/* Skeleton 背景 */}
        {!loaded && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            sx={{ position: 'absolute', inset: 0 }}
          />
        )}
        {/* 圖片淡入 */}
        <CardMedia
          component="img"
          image={`https://picsum.photos/id/${id}/300`}
          alt={author}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        />
      </Box>
      <CardContent>
        <Typography
          variant="body2"
          textAlign="center"
          lineHeight="1.2"
          sx={{ color: 'text.secondary' }}
        >
          {!loaded ? <Skeleton variant="rectangular" width="100%" /> : author}
        </Typography>
      </CardContent>
    </Card>
  )
})

export default PhotoCard
