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
        src={story_placeholder}
      ></Card.Img>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>Rating: {rating}</Card.Subtitle>
        <Card.Text>
          Written: {date}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
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
