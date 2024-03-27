import React from "react";
import AdminTable from "../../components/AdminTable/AdminTable";
import { useGetPicturesQuery } from "../../features/gallery/galleryApi";
const AdminGalleryPage = () => {
  const {
    data: allImages,
    error: allImagesError,
    isLoading: allImagesLoading,
  } = useGetPicturesQuery();
  console.log(allImages);

  const isLoading = allImagesLoading;
  const error = allImagesError;
  const images = allImages;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading images.</div>;
  }

  return (
    <div>
      <h2>This is Admin Gallery Page</h2>
      {allImages &&
        allImages.map((image, index) => (
          <div className="admin-gallery" key={image.PictureId}>
            <AdminTable
              tableNumber={index + 1 + "."}
              thead1="Image"
              thead2="Description"
              thead3="Category"
              thead4="Created At"
              tbody1={index + 1}
              tbody2={
                <img
                  src={image.PictureUrl}
                  alt={image.Description}
                  style={{ width: "12vw", height: "auto" }}
                />
              }
              tbody3={image.Description}
              tbody4={image.Category}
              tbody5={image.CreatedAt}
            />
          </div>
        ))}
    </div>
  );
};

export default AdminGalleryPage;
