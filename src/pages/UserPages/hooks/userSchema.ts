import * as yup from "yup";

const userFormSchema: any = yup.object().shape({
  name: yup.string().required("Name is required"),
  sector: yup.mixed().nullable().required("Sector is required"),
});

export default userFormSchema;
