import React from "react";
import "./GalleryPage.scss";
import image1 from "../../assets/Images/Rooms/Dilux.jpg";
import image2 from "../../assets/Images/Rooms/Single.jpg";
import image3 from "../../assets/Restaurant/Food1.jpg";

const GalleryPage = () => {
  const images = [
    { url: image1, alt: "Description" },
    { url: image1, alt: "Description" },
    { url: image1, alt: "Description" },
    { url: image2, alt: "Description" },
    { url: image2, alt: "Description" },
    { url: image2, alt: "Description" },
    { url: image3, alt: "Description" },
    { url: image3, alt: "Description" },
    { url: image3, alt: "Description" },
  ];

  return (
    <div className="gallery-page">
      <div className="gallery">
        <div className="galleryinfo">
          <p className="gallerheader">Gallery</p>
          <p>Here is the Photo Gallery of our Bantu Hotel.</p>
        </div>
        <ul>
          <li>Rooms</li>
          <li>Restaurant</li>
          <li>Fun Activities</li>
          <li>Other Services</li>
        </ul>
        <div className="galleryimages">
          {images.map((image, index) => (
            <div key={index} className="image_card">
              <img src={image.url} alt={image.alt} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
