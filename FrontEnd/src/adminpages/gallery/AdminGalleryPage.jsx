import React, { useState } from "react";
import "./AdminGalery.scss";
import {
  useGetPicturesQuery,
  useAddPictureMutation,
  useUpdatePictureMutation,
  useDeletePictureMutation,
} from "../../features/gallery/galleryApi.js";

const AdminGalleryPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [currentPicture, setCurrentPicture] = useState(null);

  const [addPicture] = useAddPictureMutation();
  const [updatePicture] = useUpdatePictureMutation();
  const [deletePicture] = useDeletePictureMutation();

  const {
    data: allImages,
    error: allImagesError,
    isLoading: allImagesLoading,
  } = useGetPicturesQuery();

  if (allImagesLoading) return <div>Loading...</div>;
  if (allImagesError) return <div>Error loading images.</div>;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const sortedImages =
    allImages
      ?.slice()
      .sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt)) || [];

  const handleUploadClick = () => {
    setShowModal(true);
    setCurrentPicture(null);
    setDescription("");
    setCategory("");
    setPictureUrl("");
  };

  const handleUpdateClick = (picture) => {
    setCurrentPicture(picture);
    setDescription(picture.Description);
    setCategory(picture.Category);
    setPictureUrl(picture.PictureUrl);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pictureData = {
      Description: description,
      Category: category,
      PictureUrl: pictureUrl,
    };

    try {
      if (currentPicture) {
        await updatePicture({
          ...pictureData,
          PictureId: currentPicture.PictureId,
        }).unwrap();
      } else {
        await addPicture(pictureData).unwrap();
      }
      setShowModal(false);
      setDescription("");
      setCategory("");
      setPictureUrl("");
      setCurrentPicture(null);
    } catch (error) {
      console.error("Failed to save the picture:", error);
    }
  };

  const handleDelete = async (PictureId) => {
    console.log("Deleting PictureId:", PictureId);
    try {
      await deletePicture(PictureId).unwrap();
    } catch (error) {
      console.error("Failed to delete the picture:", error);
    }
  };

  return (
    <div className="admin-table-body">
      <div className="admin-cart">
        <div className="tableheaders">
          <h1>Image Gallery</h1>
          <button
            onClick={handleUploadClick}
            className="admin-other-service-btn"
          >
            Upload Picture
          </button>
        </div>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>
                &times;
              </span>
              <h3>Upload a new Image </h3>

              <form onSubmit={handleSubmit}>
                <label>Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <label>Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
                <label>Picture URL</label>
                <input
                  type="text"
                  value={pictureUrl}
                  onChange={(e) => setPictureUrl(e.target.value)}
                  required
                />
                <button type="submit">Save</button>
              </form>
            </div>
          </div>
        )}

        <div className="scrollable-table-container">
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
                  <td>{index + 1}</td>
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
                    <button
                      className="action-btn"
                      style={{ backgroundColor: "green" }}
                      onClick={() => handleUpdateClick(image)}
                    >
                      Update
                    </button>
                    &nbsp;
                    <button
                      className="action-btn"
                      onClick={() => handleDelete(image.PictureId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminGalleryPage;
