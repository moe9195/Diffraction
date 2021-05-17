import React, { useRef, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { generatePattern } from '../Functions/diffraction.js'
import Fab from '@material-ui/core/Fab'
import GetApp from '@material-ui/icons/GetApp'

const useStyles = makeStyles((theme) => ({
  centered: {
    display: 'flex',
  },
  canvas: {
    [theme.breakpoints.up('xs')]: {
      height: theme.spacing(100),
    },
    [theme.breakpoints.down('xs')]: {
      height: '90vh'
    },
  },
  hidden: {
    display: 'none'
  },
  download: {
    position: 'fixed',
    margin: theme.spacing(1)
  }
}))

const Canvas = ({ mag, pinholes, iterations, diffuse, setLoading }) => {
  const classes = useStyles()

  const [rendered, setRendered] = useState(false)

  const width = 2 * (2 ** mag)
  const height = 4 * (2 ** mag)
  const scaleFactor = 2 ** (2 * (8 - mag))
  const scaleSize = 2**(8 - mag)
  const canvasRef = useRef(null)
  const canvasRefResized = useRef(1)

  const download = (e) => {
    const canvas = document.getElementById("canvas");
    const url = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.download = 'diffraction.png';
    link.href = url;
    link.click();
  }
  

  useEffect(() => {

    const canvasResized = canvasRefResized.current
    const ctxResized = canvasResized.getContext('2d')

    if (diffuse === 0) {
      ctxResized.fillRect(0, 0, scaleFactor * width, scaleFactor * height)
    }
    else {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      let imgArr = generatePattern(pinholes, iterations, mag).flat();
      const imgData = ctx.createImageData(width, height)
      const data = imgData.data;
  
      let idx = 0
      for (let i = 0, len = width * height * 4; i < len; i += 4) {
        data[i + 0] = imgArr[idx]
        data[i + 1] = imgArr[idx]
        data[i + 2] = imgArr[idx]
        data[i + 3] = 255
        idx += 1
      }
  
      ctx.putImageData(imgData, 0, 0)
      ctxResized.drawImage(canvas, 0, 0, scaleSize * width, scaleSize * height, 0, 0, scaleFactor * width, scaleFactor * height)
      ctx.clearRect(0, 0, width, height)
      setLoading(false)
      setRendered(true)
    }

  }, [diffuse])


  return (
    <div className={classes.centered}>
      <canvas className={classes.hidden} ref={canvasRef} width={width} height={height} />
      <canvas id="canvas" className={classes.canvas} ref={canvasRefResized} width={scaleSize * width} height={scaleSize * height} />
      {rendered &&
        <Fab className={classes.download} size="small" aria-label="download image" component="span" onClick={(e) => download(e)}>
          <GetApp fontSize="small"/>
        </Fab>
      }
    </div>

  )
}


export default Canvas;