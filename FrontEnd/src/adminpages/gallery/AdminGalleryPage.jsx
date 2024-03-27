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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const sortedImages = allImages
    .slice()
    .sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt));

  return (
    <div className="admin-table-body">
      <div className="admin-cart">
        <h1>Image Gallery</h1>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Description</th>
              <th>Category</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedImages.map((image, index) => (
              <tr key={image.PictureId}>
                <td className="admin-td-custom">{index + 1}</td>
                <td>
                  <img
                    src={image.PictureUrl}
                    alt={image.Description}
                    style={{ width: "100px", height: "auto" }}
                  />
                </td>
                <td>{image.Description}</td>
                <td>{image.Category}</td>
                <td>{formatDate(image.CreatedAt)}</td>
                <td>
                  <button className="action-btn">Delete</button>
                  &nbsp;
                  <button className="action-btn0">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminGalleryPage;
