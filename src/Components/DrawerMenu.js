import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  MenuItem,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";
import { sizes, colors } from "../Options";

const useStyles = makeStyles((theme) => ({
  inputsDiv: {
    display: "flex",
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(2),
    flexDirection: "column",
  },
  inputField: {
    marginBottom: theme.spacing(3),
  },
  drawerMenu: {
    position: "relative",
    padding: theme.spacing(2),
  },
  generateButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  drawerButton: {
    position: "fixed",
    bottom: "2%",
    right: "50%",
    zIndex: 1,
    marginRight: -20,
  },
}));

const DrawerMenu = ({
  mag,
  setMag,
  pinholes,
  setPinholes,
  iterations,
  color,
  setColor,
  setIterations,
  setLoading,
  diffract,
  setDiffract,
  setDrawer,
}) => {
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    setDrawer(false);
    setLoading(true);
    setTimeout(() => setDiffract((diffract += 1)), 500);
  };

  return (
    <Card className={classes.drawerMenu} elevation={0} square>
      <CardContent>
        <form
          className={classes.inputsDiv}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
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
              <MenuItem
                className={classes.colorItem}
                key={option.value}
                value={option.value}
              >
                <div>{option.value}</div>{" "}
                <img
                  className={classes.colorImage}
                  src={`data:image/png;base64, ${option.image}`}
                  align="right"
                  alt="colormap"
                />
              </MenuItem>
            ))}
          </TextField>
          <Button
            className={classes.generateButton}
            type="submit"
            variant="contained"
          >
            Generate
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DrawerMenu;
