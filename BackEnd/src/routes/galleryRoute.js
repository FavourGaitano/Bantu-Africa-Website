import { Router } from "express";
import {
  deletePicture,
  getGallery,
  getPictureByCategory,
  getonepicture,

  updateGalleryController,

  uploadPicture,
} from "../controllers/galleryController.js";

const gallery = Router();

gallery.get("/gallery", getGallery);
gallery.post("/gallery", uploadPicture);
gallery.get("/gallery/:PictureId", getonepicture);
gallery.get("/gallery/category/:Category", getPictureByCategory);
gallery.delete("/gallery/:PictureId", deletePicture);
gallery.put("/gallery/:PictureId", updateGalleryController);

export default gallery;
