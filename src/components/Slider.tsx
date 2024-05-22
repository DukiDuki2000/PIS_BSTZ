import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

const SlideShow: React.FC = () => {
  return (
    <AwesomeSlider>
      <div data-src="images/About_us/GL_1.jpg" />
      <div data-src="images/About_us/GL_2.jpg" />
      <div data-src="images/About_us/GL_3.jpg" />
      <div data-src="images/About_us/GL_4.jpg" />
      <div data-src="images/About_us/GL_5.jpg" />
      <div data-src="images/About_us/GL_6.jpg" />
      <div data-src="images/About_us/GL_7.jpg" />
      <div data-src="images/About_us/GL_8.jpg" />
      <div data-src="images/About_us/GL_9.jpg" />
    </AwesomeSlider>
  );
};

export default SlideShow;
