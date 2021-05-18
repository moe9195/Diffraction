import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import Diffraction from './Components/Diffraction'
import Footer from './Components/Footer'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100vh',
    maxWidth: '100%'
  }
}))

const App = () => {
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      <Diffraction />
      <Footer />
    </Container>
  );
}

export default App;
