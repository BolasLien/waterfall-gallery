import {Card, CardMedia, CardContent, Typography, CardActionArea} from '@mui/material'

type PhotoCardProps = {
  height: number
}

const PhotoCard = ({height}: PhotoCardProps) => {
  return (
    <Card sx={{maxheight: height+100}}>
      <CardActionArea>
        <CardMedia sx={{height}} image="https://picsum.photos/id/870/200/300" title="Tower" />
        <CardContent>
          <Typography variant="h5" component="div">
            Tower
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default PhotoCard
