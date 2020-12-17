// Here goes the schema for the form
import * as yup from "yup";

export default yup.object().shape({
  username: yup
    .string()
    .required("username is required")
    .min(3, "username must be 3 chars long"),
  email: yup
  .string()
  .email("must be an email")
  .required("email is required"),
  password: yup
    .string()
    .required("password is required")
    .min(8, "password musst be 8 chars long"),
   
//   civil: yup
//     .string()
//     .oneOf(["single", "married"], "please select your civil status"),
  // we're done with checkboxes
  terms: yup.boolean(),
});