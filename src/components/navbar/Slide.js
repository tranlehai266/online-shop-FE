import React, { useState } from "react";
import Slider from "react-slick";
import background1 from "../../images/background1.jpeg";
import background2 from "../../images/background2.jpeg";
import background3 from "../../images/background3.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slide.css";
function Slide() {
  const [activeSlide, setActiveSlide] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    afterChange: (current) => setActiveSlide(current),
  };

  const slides = [
    {
      image: background1,
      title: "New Collection",
      subtitle: "Summer 2024",
    },
    {
      image: background2,
      title: "Big Sale",
      subtitle: "Up to 50% Off",
    },
    {
      image: background3,
      title: "Exclusive Products",
      subtitle: "Only at our store",
    },
  ];
  return (
    <div>
      <Slider {...settings} style={{ position: "relative", zIndex: 1 }}>
        {slides.map((slide, index) => (
          <div key={index} className="slide-item">
            <img
              src={slide.image}
              className="slider-image"
              alt={`Background ${index + 1}`}
            />
            {activeSlide === index && (
              <div className="slide-content">
                <h2 className="slide-title">{slide.title}</h2>
                <p className="slide-subtitle">{slide.subtitle}</p>
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Slide;
