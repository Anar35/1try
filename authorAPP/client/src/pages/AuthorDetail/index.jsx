import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthorbyID } from "../../Api/httpRequests";
import style from "./index.module.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, CircularProgress } from "@mui/material";

const AuthorDetail = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAuthorbyID(id).then((data) => {
      setAuthor(data);
      setLoading(false);
    });
  }, [setAuthor]);

  return (
    <section className={style.detail}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Card sx={{ width: 300 }}>
          <CardMedia
            component="img"
            alt={author.name}
            height="270"
            image={author.imageURL}
          />
          <CardContent>
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
                navigate(`/edit-authors/${author._id}`);
              }}
              style={{ display: "block", margin: "0 auto" }}
              color="warning"
              variant="contained"
            >
              Edit
            </Button>
          </CardActions>
        </Card>
      )}
    </section>
  );
};

export default AuthorDetail;
