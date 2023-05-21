import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./index.module.css";
import { addAuthor } from "../../Api/httpRequests";
import {
  FormControl,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { AuthorSchema } from "../../validation/AuthorValidation";

const AddAuthor = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      birthYear: "",
      genre: "",
      isDead: "",
      isMale: "",
      imageURL: "",
    },
    validationSchema: AuthorSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values, actions) {
    actions.resetForm();
    await addAuthor(values);
    Swal.fire({
      position: "bottom-end",
      icon: "success",
      title: `${values.name} added`,
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/authors");
  }

  return (
    <section className={style.add}>
      <form className={style.addForm} onSubmit={formik.handleSubmit}>
        <h1 style={{ fontSize: "35px" }}>Add Author</h1>

        <TextField
          style={{ width: "300px", marginTop: "20px" }}
          id="standard-basic"
          label="Name"
          variant="standard"
          type="text"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          required
          error={formik.errors.name && formik.touched.name ? true : false}
        />
        {formik.errors.name && formik.touched.name && (
          <p style={{ color: "red", margin: "0" }}>{formik.errors.name}</p>
        )}

        <TextField
          style={{ width: "300px", marginTop: "20px" }}
          id="standard-basic"
          label="Birth Year"
          variant="standard"
          type="number"
          name="birthYear"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.birthYear}
          required
          error={
            formik.errors.birthYear && formik.touched.birthYear ? true : false
          }
        />
        {formik.errors.birthYear && formik.touched.birthYear && (
          <p style={{ color: "red", margin: "0" }}>{formik.errors.birthYear}</p>
        )}

        <TextField
          style={{ width: "300px", marginTop: "20px" }}
          id="standard-basic"
          label="Genre"
          variant="standard"
          type="text"
          name="genre"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.genre}
          required
          error={formik.errors.genre && formik.touched.genre ? true : false}
        />
        {formik.errors.genre && formik.touched.genre && (
          <p style={{ color: "red", margin: "0" }}>{formik.errors.genre}</p>
        )}

        <FormControl fullWidth style={{ width: "300px", marginTop: "20px" }}>
          <InputLabel id="demo-simple-select-label">is Dead</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="isDead"
            name="isDead"
            value={formik.values.isDead}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            error={formik.errors.isDead && formik.touched.isDead ? true : false}
          >
            <MenuItem value="">is Dead</MenuItem>
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
          {formik.errors.isDead && formik.touched.isDead && (
            <p style={{ color: "red", margin: "0" }}>{formik.errors.isDead}</p>
          )}
        </FormControl>

        {formik.values.isDead ? (
          <TextField
            style={{ width: "300px", marginTop: "20px" }}
            id="standard-basic"
            label="Dead Year"
            variant="standard"
            type="number"
            name="deadYear"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.deadYear}
            required
          />
        ) : (
          ""
        )}

        <FormControl fullWidth style={{ width: "300px", marginTop: "20px" }}>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="isMale"
            name="isMale"
            value={formik.values.isMale}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            error={formik.errors.isMale && formik.touched.isMale ? true : false}
          >
            <MenuItem value="">Gender</MenuItem>
            <MenuItem value={true}>Male</MenuItem>
            <MenuItem value={false}>Famale</MenuItem>
          </Select>
          {formik.errors.isMale && formik.touched.isMale && (
            <p style={{ color: "red", margin: "0" }}>{formik.errors.isMale}</p>
          )}
        </FormControl>

        <TextField
          style={{ width: "300px", marginTop: "20px" }}
          id="standard-basic"
          label="ImageURL"
          variant="standard"
          type="text"
          name="imageURL"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.imageURL}
          required
          error={
            formik.errors.imageURL && formik.touched.imageURL ? true : false
          }
        />
        {formik.errors.imageURL && formik.touched.imageURL && (
          <p style={{ color: "red", margin: "0" }}>{formik.errors.imageURL}</p>
        )}

        <Button
          disabled={Object.keys(formik.errors).length !== 0 ? true : false}
          type="submit"
          style={{ width: "300px", marginTop: "20px" }}
          color="success"
          variant="contained"
        >
          Add
        </Button>
      </form>
    </section>
  );
};

export default AddAuthor;
