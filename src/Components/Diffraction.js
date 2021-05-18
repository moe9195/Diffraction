import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Menu from './Menu'
import Canvas from './Canvas'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(2),
    },
  },
  paper: {
    display: 'flex',
  },
}))

const Diffraction = () => {
  const classes = useStyles()

  const [mag, setMag] = useState(6)
  const [pinholes, setPinholes] = useState(4)
  const [iterations, setIterations] = useState(10)
  const [diffract, setDiffract] = useState(0)
  const [loading, setLoading] = useState(false)
  const [color, setColor] = useState('greys')

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} variant="outlined" square>
        <Canvas
          mag={mag}
          pinholes={pinholes}
          iterations={iterations}
          color={color}
          diffract={diffract}
          loading={loading}
          setLoading={setLoading}
        />
        <Menu
          mag={mag}
          setMag={setMag}
          pinholes={pinholes}
          setPinholes={setPinholes}
          iterations={iterations}
          setIterations={setIterations}
          color={color}
          setColor={setColor}
          diffract={diffract}
          setDiffract={setDiffract}
          loading={loading}
          setLoading={setLoading}
        />
      </Paper>
    </div>

  )
}


export default Diffraction