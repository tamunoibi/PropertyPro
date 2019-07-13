import { cloudinaryDelete } from '../config/cloudinaryConfig';

const validateImage = (files, error) => {
  console.log(files);
  const images = files;
  if (error) {
    images.forEach(image => cloudinaryDelete(image.public_id));
  }
  return {next()};
};

export default validateImage;
