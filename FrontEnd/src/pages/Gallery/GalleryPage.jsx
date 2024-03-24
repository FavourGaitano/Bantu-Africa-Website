import React, { useState } from "react";
import "./GalleryPage.scss";
import {
  useGetPicturesQuery,
  useGetPictureByCategoryQuery,
} from "../../features/gallery/galleryApi";

const GalleryPage = () => {
  // State to manage selected category. Initially, no category is selected ('null' means all images are shown).
  const [selectedCategory, setSelectedCategory] = useState(null);

  const {
    data: allImages,
    error: allImagesError,
    isLoading: allImagesLoading,
  } = useGetPicturesQuery();

  const {
    data: categoryImages,
    error: categoryImagesError,
    isLoading: categoryImagesLoading,
  } = useGetPictureByCategoryQuery(selectedCategory, {
    skip: !selectedCategory,
  });

  // Determine the current state and data based on category selection
  const isLoading = selectedCategory ? categoryImagesLoading : allImagesLoading;
  const error = selectedCategory ? categoryImagesError : allImagesError;
  const images = selectedCategory ? categoryImages : allImages;

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
          <p className="galleryheader">Gallery</p>
          <p>Here is the Photo Gallery of our Bantu Hotel.</p>
        </div>
        <ul>
          <li onClick={() => setSelectedCategory(null)}>All</li>
          <li onClick={() => setSelectedCategory("accommodation")}>Rooms</li>
          <li onClick={() => setSelectedCategory("Restaurant")}>Restaurant</li>
          <li onClick={() => setSelectedCategory("FunActivities")}>
            Fun Activities
          </li>
          <li onClick={() => setSelectedCategory("Conferences")}>
            Conferences
          </li>
          <li onClick={() => setSelectedCategory("Other Services")}>
            Other Services
          </li>
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
