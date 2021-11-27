import React, { useState } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { BannerData } from "./BannerData";

const useStyles = makeStyles(({
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#F9FAF9',
  },
  banner: {
    maxWidth: '1040px',
    maxHeight: '304px',
  },
  arrowLeft: {
    paddingRight: '1.5%',

    width: '24px',
    height: '24px',
    cursor: 'pointer',
  },
  arrowRight: {
    paddingLeft: '1.5%',

    width: '24px',
    height: '24px',
    cursor: 'pointer',
  },
  activeSlide: {
    opacity: '1',
    transitionDuration: '1s',
  },
  notActiveSlide: {
    opacity: '0',
    transitionDuration: '1s ease',
    transform: 'scale(0.92)'
  },
}));

function Banner ({ bannerdata }) {
  const classes = useStyles();
  const [curr, setCurr] = useState(0);
  const len = bannerdata.length;

  const nextSlide = () => {
    setCurr(curr === len- 1 ? 0 : curr + 1);
  }

  const prevSlide = () => {
    setCurr(curr === 0 ? len - 1 : curr - 1);
  }

  if (!Array.isArray(bannerdata) || bannerdata.length <= 0) {
    return null;
  }
  

  return (
    <div className={classes.root}>
      <ArrowBackIosIcon className={classes.arrowLeft} onClick={prevSlide} />
      <div style={{ width:'1040px', height: '304px' }}>
        {BannerData.map((slide, index) => {
          return (
            <div
              className={index === curr ? classes.activeSlide : classes.notActiveSlide}
              key={index}
            >
              {index === curr && (
                <img src={slide.image} alt='promo' className={classes.banner} />
              )}
            </div>
          )
        })}
      </div>
      <ArrowForwardIosIcon className={classes.arrowRight} onClick={nextSlide} />
    </div>
  )
}

Banner.propTypes = {
  bannerdata: PropTypes.array,
}

export default Banner;