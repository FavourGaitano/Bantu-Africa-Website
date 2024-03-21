import React from "react";
import "./GalleryPage.scss";
import image1 from "../../assets/Images/Rooms/Dilux.jpg";
import image2 from "../../assets/Images/Rooms/Single.jpg";
import image3 from "../../assets/Restaurant/Food1.jpg";
import Navbar from "../../components/shared/Navbar";

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
    <div>
      <Navbar />
      <div className="gallery">
        <div className="galleryinfo">
          <p className="header">Gallery</p>
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
