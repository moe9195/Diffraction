import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import Diffraction from './Components/Diffraction'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100vh'
  }
}))

const App = () => {
  const classes = useStyles()
  return (
    <Container className={classes.root} maxWidth="100%">
      <Diffraction />
    </Container>
  );
}

export default App;
