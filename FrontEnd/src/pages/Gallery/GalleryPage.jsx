import React from "react";
import "./GalleryPage.scss";
import { useGetPicturesQuery } from "../../features/gallery/galleryApi";

import image1 from "../../assets/Images/Rooms/Dilux.jpg";

const GalleryPage = () => {
  const { data: images, error, isLoading } = useGetPicturesQuery();
  console.log(images);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading images.</div>;
  }

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
          {images &&
            Array.isArray(images) &&
            images.map((image, index) => (
              <div key={index} className="image_card">
                <img src={image.PictureUrl} alt={image.alt} />
                <div className="text">
                  <p>{image.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
