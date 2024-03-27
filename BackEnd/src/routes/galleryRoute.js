import { Router } from "express";
import {
  deletePicture,
  getGallery,
  getPictureByCategory,
  getonepicture,
  updateGalleryController,
  uploadPicture,
} from "../controllers/galleryController.js";

const galleryRouter = Router();

galleryRouter.get("/gallery", getGallery);
galleryRouter.post("/gallery", uploadPicture);
galleryRouter.get("/gallery/onePicture/:PictureId", getonepicture);
galleryRouter.get("/gallery/category/:Category", getPictureByCategory);
galleryRouter.delete("/gallery/:PictureId", deletePicture);
galleryRouter.put("/gallery/:PictureId", updateGalleryController);

export default galleryRouter;
