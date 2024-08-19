import React, { useEffect, useState } from "react";
import "./ImageCarousel.css";
import right from "./right-arrow.png";
import left from "./left-arrow.png";

const images = [
  {
    src: "https://picsum.photos/id/600/600/400",
    alt: "Forest",
  },
  {
    src: "https://picsum.photos/id/100/600/400",
    alt: "Beach",
  },
  {
    src: "https://picsum.photos/id/200/600/400",
    alt: "Yak",
  },
  {
    src: "https://picsum.photos/id/300/600/400",
    alt: "Hay",
  },
  {
    src: "https://picsum.photos/id/400/600/400",
    alt: "Plants",
  },
  {
    src: "https://picsum.photos/id/500/600/400",
    alt: "Building",
  },
];

const ImageCarousel = () => {
  const [currIndex, setCurrIndex] = useState(0);

  //preloading images so image wont load everytime
  function preloadImages(images) {
    images.forEach((image) => {
      const img = new Image();
      img.src = image.src;
    });
  }

  useEffect(() => {
    preloadImages(images);
  }, []);

  function handleLeft() {
    setCurrIndex((prev) => {
      if (prev === 0) {
        return images.length - 1;
      }
      return prev - 1;
    });
  }

  function handleRight() {
    setCurrIndex((prev) => {
      if (prev === images.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  }

  return (
    <div>
      <div className="display-image-container">
        <img
          className="display-image"
          src={images[currIndex].src}
          alt={images[currIndex].alt}
        />
        <div className="arrows">
          <img onClick={handleLeft} src={left} alt="left-arrow" />
          <img onClick={handleRight} src={right} alt="right-arrow" />
        </div>

        <div className="dots-container">
          <div className="dots-dummy-wrapper">
            {images.map((_, i) => (
              <p
                onClick={() => setCurrIndex(i)}
                style={{
                  backgroundColor: `${i === currIndex ? "white" : "gray"}`,
                }}
                key={i}
                className="dot"
              ></p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
