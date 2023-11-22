import upload from '../middleware/multer.js';

const fieldsUpload = upload.fields([
  { name: 'main_image', maxCount: 1 },
  { name: 'images', maxCount: 4 },
]);

export default fieldsUpload;
