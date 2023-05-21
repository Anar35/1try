import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAuthorsContext } from "../../context/AuthorsContext";
import { deleteAuthorbyID, getAllAuthors } from "../../Api/httpRequests";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Authors = () => {
  const [authors, setAuthors] = useAuthorsContext();
  const [authorsCopy, setAuthorsCopy] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllAuthors().then((data) => {
      setAuthors(data);
      setAuthorsCopy(data);
      setLoading(false);
    });
  }, [setAuthors]);

  //search
  function handleSearch(e) {
    getAllAuthors(e.target.value).then((data) => {
      setAuthors(data);
    });
  }

  //sort
  const [gender, setGender] = React.useState("");

  const handleChange = (event) => {
    setGender(event.target.value);
  };
  useEffect(() => {
    if (gender == "male") {
      setAuthors(authorsCopy.filter((x) => x.isMale));
    } else if (gender == "famale") {
      setAuthors(authorsCopy.filter((x) => !x.isMale));
    } else {
      setAuthors(authorsCopy);
    }
  }, [gender]);

  return (
    <section style={{ width: "80%", margin: "90px auto 20px" }}>
      <TextField
        onChange={(e) => handleSearch(e)}
        style={{ margin: "0 10px 20px 20px", display: "inline-block" }}
        id="outlined-basic"
        label="Search Author"
        variant="outlined"
      />
      <Box
        sx={{
          width: 120,
          display: "inline-block",
          margin: "0px 20px 20px 20px",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={gender}
            label="Gender"
            onChange={handleChange}
          >
            <MenuItem value="">Gender</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="famale">Famale</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {authors &&
              authors.map((author) => {
                return (
                  <Grid key={author._id} item lg={3} md={4} sm={6}>
                    <Card sx={{ maxWidth: 345, minWidth: 240 }}>
                      <CardMedia
                        component="img"
                        alt={author.name}
                        height="240"
                        sx={{ width: 270 }}
                        style={{ objectFit: "cover" }}
                        image={author.imageURL}
                      />
                      <CardContent>
                        <Link to={`/authors/${author._id}`}>
                          <Typography
                            style={{
                              color: `${author.isDead ? "red" : "black"}`,
                            }}
                            gutterBottom
                            variant="h5"
                            component="div"
                          >
                            {author.name}
                          </Typography>
                        </Link>

                        <Typography gutterBottom variant="p" component="div">
                          {author.isDead
                            ? author.deadYear - author.birthYear
                            : new Date().getFullYear() - author.birthYear}{" "}
                          years old
                        </Typography>
                        <Typography gutterBottom variant="p" component="div">
                          Genre: {author.genre}
                        </Typography>
                        <Typography gutterBottom variant="p" component="div">
                          Gender: {author.isMale ? "Male" : "Female"}
                        </Typography>
                      </CardContent>
                      <CardActions style={{ paddingTop: "0" }}>
                        <Button
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure to delete?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                deleteAuthorbyID(author._id);
                                setAuthors(
                                  authors.filter((x) => x._id != author._id)
                                );
                                Swal.fire(
                                  "Deleted!",
                                  "Author has been deleted.",
                                  "success"
                                );
                              }
                            });
                          }}
                          style={{ display: "block", margin: "0 auto 10px" }}
                          color="error"
                          variant="contained"
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      )}
    </section>
  );
};

export default Authors;
