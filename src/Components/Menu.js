import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  TextField, MenuItem, Card, CardHeader, CardContent, Hidden, CircularProgress, Button, SwipeableDrawer, Fab, Backdrop
} from '@material-ui/core'
import { sizes, colors } from '../Options'
import SettingsIcon from '@material-ui/icons/Settings'
import Typography from '@material-ui/core/Typography'
import DrawerMenu from './DrawerMenu'

const useStyles = makeStyles((theme) => ({
  inputsDiv: {
    display: 'flex',
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(2),
    flexDirection: 'column'
  },
  inputField: {
    marginBottom: theme.spacing(3),
  },
  menu: {
    position: 'relative',
    padding: theme.spacing(2),
    width: theme.spacing(50),
  },
  titleHeader: {
    borderBottom: 'solid 1px',
    marginBottom: theme.spacing(2)
  },
  generateButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: theme.spacing(2),
    padding: theme.spacing(1.5),
    width: '50%'
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    right: '80%',
    marginTop: -12,
  },
  loading: {
    marginBottom: theme.spacing(2)
  },
  drawerButton: {
    position: 'fixed',
    bottom: '2%',
    right: '50%',
    zIndex: 1,
    marginRight: -20
  },
  backdrop: {
    [theme.breakpoints.down('sm')]: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
      flexDirection: 'column'
    }
  },
  colorItem: {
    whiteSpace: 'nowrap',
    justifyContent: 'space-between'
  },
  colorImage: {
    display: 'inline',
    padding: 0,
    marginRight: theme.spacing(5),
    marginLeft: theme.spacing(4),
  }
}))

const Menu = ({ mag, setMag, pinholes, setPinholes, iterations, setIterations, color, setColor, diffract, setDiffract, loading, setLoading }) => {
  const classes = useStyles()

  const [drawer, setDrawer] = useState(false)

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key == 'Shift')) {
      return;
    }
    setDrawer(open)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    setTimeout(() => setDiffract(diffract += 1)
    , 500)
  }

  return (
    <React.Fragment>
      <Hidden mdUp>
        <Fab
          className={classes.drawerButton}
          aria-label="settings"
          size="small"
          onClick={toggleDrawer(true)}
        >
          <SettingsIcon fontSize="small"/>
        </Fab>
        <SwipeableDrawer
          anchor="top"
          open={drawer}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <DrawerMenu
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
            setDrawer={setDrawer}
          />
        </SwipeableDrawer>
      </Hidden>
      <Hidden smDown>
        <Card className={classes.menu} elevation={0} square>
          <CardHeader className={classes.titleHeader} title={
            <div>
              <Typography variant="h6" gutterBottom>Instructions:
              <Typography variant="body1" gutterBottom>  
                <ol>
                  <li>Choose the image resolution.</li>
                  <li>Choose number of pinholes and iterations.</li>
                  <li>Choose the color map.</li>
                  <li>Click generate to generate the image.</li>
                </ol>
                </Typography>
              </Typography>
            </div>
          }>
          </CardHeader>
          <CardContent>
            <form className={classes.inputsDiv} autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                className={classes.inputField}
                id="resolution-select"
                select
                label="Resolution"
                value={mag}
                variant="outlined"
                onChange={(e) => setMag(e.target.value)}
                >
                  {sizes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                  ))}
              </TextField>
              <TextField
                className={classes.inputField}
                id="pinhole-input"
                label="Pinholes"
                type="number"
                inputProps={{ min: 1, max: 20, step: 1 }}
                value={pinholes}
                variant="outlined"
                onChange={(e) => setPinholes(e.target.value)}
              />
              <TextField
                className={classes.inputField}
                id="iterations-input"
                label="Iterations"
                type="number"
                inputProps={{ min: -100, max: 100, step: 0.01 }}
                value={iterations}
                variant="outlined"
                onChange={(e) => setIterations(e.target.value)}
              />
              <TextField
                className={classes.inputField}
                id="color-select"
                select
                label="Colors"
                value={color}
                variant="outlined"
                onChange={(e) => setColor(e.target.value)}
                >
                  {colors.map((option) => (
                  <MenuItem className={classes.colorItem} key={option.value} value={option.value}>
                      <div>{option.value}</div> <img className={classes.colorImage} src={`data:image/png;base64, ${option.image}`} align="right"/>
                  </MenuItem>
                  ))}
              </TextField>
              <Button
                className={classes.generateButton}
                type="submit"
                variant="contained"
                disabled={loading}
                >
              {loading && <CircularProgress size={24} color="inherit" className={classes.buttonProgress} />} {loading ? 'Generating' : 'Generate'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Hidden>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress size={24} color="inherit" className={classes.loading} />
        <Typography variant="p">Generating</Typography>
      </Backdrop>
    </React.Fragment>
  )
}

export default Menu;