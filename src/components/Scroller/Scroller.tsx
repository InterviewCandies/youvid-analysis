import { Icon, makeStyles } from "@material-ui/core";
import { ArrowDropUp, ArrowUpward } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
const useStyles = makeStyles(() => ({
  root: {
    width: "4rem",
    height: "4rem",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    cursor: "pointer",
    backgroundColor: "#dc004e",
    color: "#fff",
  },
}));
function Scroller() {
  const [isVisible, setIsVisible] = useState(false);
  const classes = useStyles();

  // Show button when page is scorlled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div>
      {isVisible && (
        <div onClick={scrollToTop} className={classes.root}>
          <ArrowDropUp fontSize="large"></ArrowDropUp>
        </div>
      )}
    </div>
  );
}

export default Scroller;
