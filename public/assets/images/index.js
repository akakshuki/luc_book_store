import React, { useState, useEffect, useRef } from 'react';
import { Carousel } from 'antd';

import './style.scss';

const Slider = ({
  items = [],
  Template,
  initialSlide = 0,
  showArrow = false,
  centerMode = true,
  focusOnSelect = false,
  slidesToShow = 1,
  slidesPerRow = 1,
  draggable = true,
  responsive = [],
  autoplaySpeed = 5000,
  dots = false,
  autoplay = false,
  lazyLoad = true,
  infinite = false,
}) => {
  const [initSlide, setInitSlide] = useState(initialSlide);
  const slideRef = useRef();

  useEffect(() => {
    setInitSlide(initialSlide);
    slideRef.current.slick.innerSlider.slickGoTo(initialSlide);
  }, []);

  const settings = {
    dots,
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesPerRow,
    centerMode,
    focusOnSelect,
    draggable,
    autoplay,
    centerPadding: '60px',
    initialSlide: initSlide,
    autoplaySpeed,
    arrows: !!showArrow,
    responsive,
    infinite,
    lazyLoad,
    nextArrow: <img src="/static/images/next.svg" alt="slider next arrow" />,
    prevArrow: (
      <img src="/static/images/previous.svg" alt="slider previous arrow" />
    ),
  };

  const handleOnClick = idx => {
    if (focusOnSelect) {
      slideRef.current.slick.innerSlider.slickGoTo(idx);
    }
  };

  return (
    <Carousel
      {...settings}
      // onClick={e => console.log('carousel click', e)}
      ref={slideRef}
      className="carouselWrapped"
    >
      {items?.map((item, idx) => (
        <Template
          onClick={() => handleOnClick(idx)}
          key={idx}
          idx={idx}
          {...item}
        />
      ))}
    </Carousel>
  );
};

export default Slider;
