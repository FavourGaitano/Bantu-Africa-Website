import {
  sendNotFound,
  sendServerError,
  sendCreated,
  paginate,
  orderData,
} from "../helper/helperFunctions.js";
import { v4 } from "uuid";
import {
  deletePictureService,
  getGalleryService,
  getPicturebyCategoryService,
  getonepictureService,
  updateGalleryService,
  uploadPictureService,
} from "../services/galleryService.js";
import { galleryValidator } from "../validators/GalleryValidators/galleryValidator.js";

export const getGallery = async (req, res) => {
  try {
    const gallery = await getGalleryService();
    if (gallery.length === 0) {
      sendNotFound(res, "No Pictures found");
    } else {
      return res.status(200).json(gallery);
    }
  } catch (error) {
    sendServerError(res, error);
  }
};

export const uploadPicture = async (req, res) => {
  try {
    const { Description, Category, PictureUrl } = req.body;
    const { error } = galleryValidator(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    } else {
      const PictureId = v4();
      console.log("The galleryPicture ID: ", PictureId);
      const newGalleryPicture = {
        PictureId,
        Description,
        Category,
        PictureUrl,
      };

      let response = await uploadPictureService(newGalleryPicture);
      if (response.message) {
        sendServerError(res, response.message);
      } else {
        sendCreated(res, "Picture Uploaded successfully");
      }
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getonepicture = async (req, res) => {
  const { PictureId } = req.params;

  try {
    const galleryPicture = await getonepictureService(PictureId);
    console.log("Get one Picture:", galleryPicture);

    if (!galleryPicture) {
      // Assuming sendNotFound is correctly implemented to send a 404 response.
      return res.status(404).jsfon({ message: "Not Found" });
    } else {
      return res.status(200).json({ galleryPicture });
    }
  } catch (error) {
    console.log(error); // Log the error before sending a response.
    // Assuming sendServerError is correctly implemented to send a 500 response.
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getPictureByCategory = async (req, res) => {
  const { Category } = req.params;
  try {
    const result = await getPicturebyCategoryService(Category);
    if (!result) {
      sendNotFound(res, "No pictures found");
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    sendServerError(res, error);
  }
};

export const deletePicture = async (req, res) => {
  const { PictureId } = req.params;
  try {
    const existingPicture = await getonepictureService(PictureId);
    if (!existingPicture) {
      return res.status(404).json({ message: "Picture not found" });
    }

    await deletePictureService(PictureId);
    return res.status(200).json({ message: "Picture deleted successfully" });
  } catch (error) {
    console.error(`Error deleting Picture with ID ${PictureId}:`, error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateGalleryController = async (req, res) => {
  try {
    const { PictureId } = req.params;
    const { Description, Category, PictureUrl } = req.body;

    const { error } = galleryValidator({ Description, Category, PictureUrl });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const response = await updateGalleryService(PictureId, {
      Description,
      Category,
      PictureUrl,
    });
    if (response) {
      return res.status(200).json({ message: "Picture updated successfully" });
    } else {
      // Consider adding a specific message for update failure if appropriate
      return res.status(500).json({ message: "Failed to update the picture" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
