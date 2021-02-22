import * as yup from "yup";

export default yup.object().shape({
  name: yup
    .string()
    .required("Please enter your name")
    .min(2, "Entered name should be at least 2 characters"),
  sizeofPizza: yup
    .string()
    .oneOf(["small", "medium", "large", "extra large"], "Choose size of your pizza"),
  spinach: yup.boolean(),
  olive: yup.boolean(),
  bacon: yup.boolean(),
  onion: yup.boolean(),
  instructions: yup.string()
});