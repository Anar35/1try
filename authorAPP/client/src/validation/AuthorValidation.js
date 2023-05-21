import * as yup from "yup";

const NAME_RULES = /^[a-zA-Z]+(\s{1}[a-zA-Z]+)*$/;

export const AuthorSchema = yup.object().shape({
  name: yup
    .string("Name can always be a string!")
    .min(5, "Name must be at least 5 characters!")
    .matches(NAME_RULES, "Name can always be a string!")
    .required("Name is required!"),
  birthYear: yup
    .number("Birth year can always be a number!")
    .positive("Birth year cannot be negative or 0!")
    .integer("Birth year must be an integer!")
    .required("Birth year is required!"),
  genre: yup
    .string("Genre can always be a string!")
    .min(3, "Genre must be at least 5 characters!")
    .matches(NAME_RULES, "Name can always be a string!")
    .required("Genre is required!"),
  isDead: yup.boolean().required("Is Dead is required!"),
  isMale: yup.boolean().required("Gender is required!"),
  imageURL: yup
    .string("ImageURL can always be a string!")
    .url("Enter url")
    .required("ImageURL is required!"),
});
