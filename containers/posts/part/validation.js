import * as yup from "yup";

export const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  content: yup.string().required(),
  category: yup.string().required(),
  thumbnail: yup.mixed().required('File is required'),
  source: yup.string().required(),
});
