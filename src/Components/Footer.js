import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      position: "fixed",
      bottom: 0,
      right: 0,
      margin: theme.spacing(0),
    },
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "center",
      alignSelf: "flex-end",
      margin: theme.spacing(2),
    },
  },
  linkTypography: {
    [theme.breakpoints.up("md")]: {
      marginRight: theme.spacing(1),
    },
  },
  link: {
    color: "#ffffff",
    opacity: 0.35,
  },
}));

const links = [
  {
    label: "©2021",
    src: "",
  },
  {
    label: "@moerahmeh95",
    src: "https://mrahmeh.netlify.app/",
  },
  {
    label: "github",
    src: "https://github.com/moe9195",
  },
];

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {links.map((link) => (
        <Typography className={classes.linkTypography} key={link.label}>
          <Link className={classes.link} href={link.src} target="_blank">
            {link.label}
          </Link>
        </Typography>
      ))}
    </div>
  );
};

export default Footer;
