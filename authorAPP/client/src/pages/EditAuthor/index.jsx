import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./index.module.css";
import { editAuthorbyID, getAuthorbyID } from "../../Api/httpRequests";
import {
  Box,
  FormControl,
  CircularProgress,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { AuthorSchema } from "../../validation/AuthorValidation";

const EditAuthor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);

  //formik
  const formik = useFormik({
    initialValues: {
      name: "",
      birthYear: "",
      deadYear: "",
      genre: "",
      isDead: "",
      isMale: "",
      imageURL: "",
    },
    validationSchema: AuthorSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    getAuthorbyID(id).then((data) => {
      setAuthor(data);
      formik.values.name = data.name;
      formik.values.birthYear = data.birthYear;
      formik.values.deadYear = data.deadYear;
      formik.values.genre = data.genre;
      formik.values.isDead = data.isDead;
      formik.values.isMale = data.isMale;
      formik.values.imageURL = data.imageURL;
      setLoading(false);
    });
  }, [setAuthor]);

  //edit
  async function handleSubmit(values, actions) {
    await editAuthorbyID(id, values);
    Swal.fire({
      position: "bottom-end",
      icon: "success",
      title: `${author.name} updated`,
      showConfirmButton: false,
      timer: 1500,
    });
    actions.resetForm();
    navigate("/authors");
  }

  return (
    <section className={style.edit}>
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <form className={style.editForm} onSubmit={formik.handleSubmit}>
          <h1 style={{ fontSize: "35px" }}>Edit {author.name}</h1>

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
            <p style={{ color: "red", margin: "0" }}>
              {formik.errors.birthYear}
            </p>
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
              error={
                formik.errors.isDead && formik.touched.isDead ? true : false
              }
            >
              <MenuItem value="">is Dead</MenuItem>
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
            {formik.errors.isDead && formik.touched.isDead && (
              <p style={{ color: "red", margin: "0" }}>
                {formik.errors.isDead}
              </p>
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
              error={
                formik.errors.isMale && formik.touched.isMale ? true : false
              }
            >
              <MenuItem value="">Gender</MenuItem>
              <MenuItem value={true}>Male</MenuItem>
              <MenuItem value={false}>Famale</MenuItem>
            </Select>
            {formik.errors.isMale && formik.touched.isMale && (
              <p style={{ color: "red", margin: "0" }}>
                {formik.errors.isMale}
              </p>
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
            <p style={{ color: "red", margin: "0" }}>
              {formik.errors.imageURL}
            </p>
          )}

          <Button
            disabled={Object.keys(formik.errors).length !== 0 ? true : false}
            type="submit"
            style={{ width: "300px", marginTop: "20px" }}
            color="success"
            variant="contained"
          >
            Edit
          </Button>
        </form>
      )}
    </section>
  );
};

export default EditAuthor;
