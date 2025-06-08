import {useEffect, useRef, useState} from 'react'
import {Typography} from '@mui/material'

type PhotoCardProps = {
  originalWidth: number
  originalHeight: number
  imageSrc: string
  title: string
}

// TODO 之後整理到 Hooks 資料夾
const useContainerSize = (ref: React.RefObject<HTMLDivElement | null>, delay = 100) => {
  const [size, setSize] = useState({width: 0, height: 0})
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!ref.current) return

    const updateSize = () => {
      if (!ref.current) return
      const {width, height} = ref.current.getBoundingClientRect()
      setSize({width, height})
    }

    const debouncedUpdate = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(updateSize, delay)
    }

    const observer = new ResizeObserver(debouncedUpdate)
    observer.observe(ref.current)

    return () => {
      observer.disconnect()
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [ref, delay])

  return size
}

const PhotoCard = ({originalWidth, originalHeight, imageSrc, title}: PhotoCardProps) => {
  const ref = useRef<HTMLDivElement>(null)

  // 偵測容器尺寸來取得當前的寬度
  const {width: containerWidth} = useContainerSize(ref)

  // 根據容器寬度計算圖片高度
  const displayHeight = (containerWidth / originalWidth) * originalHeight

  return (
    <div ref={ref}>
      <img height={displayHeight} src={imageSrc} loading="lazy" />
      <Typography variant="body1">{title}</Typography>
    </div>
  )
}

export default PhotoCard
