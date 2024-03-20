import React from "react";
import "./GalleryPage.scss";
import image1 from "../../assets/Images/Rooms/Dilux.jpg";

const GaleryPage = () => {
  const images = [
    { url: image1, alt: "Description" },
    { url: image1, alt: "Description" },
    { url: image1, alt: "Description" },
    { url: image1, alt: "Description" },
    { url: image1, alt: "Description" },
    { url: image1, alt: "Description" },
  ];

  return (
    <div className="gallery">
      <div className="galleryinfo">
        <h2>Gallery</h2>
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
        {/* <div className="image_card">hhh</div> */}
      </div>
    </div>
  );
};

export default GaleryPage;
