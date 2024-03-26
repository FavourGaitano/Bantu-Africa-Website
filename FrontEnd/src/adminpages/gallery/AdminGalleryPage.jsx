import React from "react";
import AdminTable from "../../components/AdminTable/AdminTable";
import { useGetPicturesQuery } from "../../features/gallery/galleryApi";
const AdminGalleryPage = () => {
  const {
    data: allImages,
    error: allImagesError,
    isLoading: allImagesLoading,
  } = useGetPicturesQuery();

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
      {images &&
        images.map((image) => (
          <div className="admin-gallery">
            <AdminTable
              tableNumber="No."
              thead1="Image"
              thead2="Description"
              thead3="Catetegory"
              thead4="Created At"
              tbody1={""}
              tbody2=<img src={image.PictureUrl}></img> //picture Url
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
