import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "react-bootstrap/Button";
import { ExternalLink } from "react-external-link";
import Spinner from "react-bootstrap/Spinner";
import story_placeholder from "../assets/logos/book.png";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";

const client = axios.create({
  baseURL: "http://Writingdbapi-env.eba-vtybcddb.us-east-1.elasticbeanstalk.com",
});

const Story = () => {
  let { id } = useParams();
  const [story, setStory] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchStory = async () => {
      if (story === undefined) {
        await client
          .get(`stories/${id}`)
          .then((response) => {
            setStory(response.data["data"]);
          })
          .catch((err) => console.log(err));
      }
      setLoaded(true);
    };
    fetchStory();
  }, [story]);

  return (

    <Container>
      <Typography
        gutterBottom
        className="modelTitle"
        variant="h2"
        sx={{ textAlign: "center" }}
      >
        Story
      </Typography>
      {loaded ? (
        <Paper
          sx={{
            p: 13,
            margin: "auto",
            maxWidth: 1000,
            flexGrow: 4,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff",
          }}
        >
          <Grid container spacing={2}>
            <Grid item></Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {story.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rating: {story.rating}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Written: {story.date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Genre: {story.genre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Length: {story.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <div>
                      <iframe src={story.gDocsLink} style={story.gDocsLink ? { width: 1000, height:800 } : {}}>
                      </iframe>
                    </div>
                  </Typography>
                  <Typography variant="body">
                  <Button
                      className="btn btn-primary"
                      variant="dark"
                      style={{
                        marginTop: 20,
                        backgroundColor: "lightgrey",
                      }}
                      href={story.url}
                    >
                      <ExternalLink href={story.url}>
                        <span>Story URL</span>
                      </ExternalLink>
                    </Button>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Spinner animation="grow" />
      )}
    </Container>
  );
};

export default Story;
