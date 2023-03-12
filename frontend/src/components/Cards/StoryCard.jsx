import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import story_placeholder from "../../assets/logos/book.png";

const StoryCard = (props) => {
  const {
    id,
    title,
    gDocsLink,
    date,
    rating,
    genre,
    length,
    url,
    img
  } = props.story;
  return (
    <Card>
      <Card.Img
        className="p-2"
        style={{
          height: "100%",
          width: "100%",
          objectFit: "contain",
        }}
        src={img ? img : story_placeholder}
      ></Card.Img>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          Rating: {rating} <br />
          Written: {date}<br />
          Genre: {genre}<br />
          Length: {length}
        </Card.Text>
      </Card.Body>
      <Card.Footer style= {{backgroundColor: '#3d405b'}}>
        <Button
          className="btn btn-primary stretched-link"
          variant="dark"
          href={`/stories/${id}`}
        >
          More Info
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default StoryCard;
